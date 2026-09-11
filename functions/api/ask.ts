/**
 * POST /api/ask — site Q&A via Cloudflare AI Search.
 *
 * Prefer `env.ASK_SEARCH.chatCompletions` (wrangler.toml [[ai_search]]).
 * If Pages has not applied that binding yet, fall back to legacy
 * `env.AI.autorag("stevenjhu-ai-search").aiSearch` (Workers AI binding).
 *
 * Body: { query?: string, messages?: {role,content}[], stream?: boolean }
 * - Prefer messages (recent turns); query alone still works.
 * - stream=false (default): JSON { answer, sources }
 * - stream=true: text/event-stream
 *
 * Bindings are managed via wrangler.toml (Dashboard cannot edit them).
 * Redeploy after changing [[ai_search]] / [ai].
 */

interface Env {
  ASK_SEARCH?: AiSearchInstance;
  AI?: Ai;
}

const AI_SEARCH_INSTANCE = 'stevenjhu-ai-search';
const MAX_QUERY_LENGTH = 1000;
const MAX_MESSAGES = 12;
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

const SYSTEM_PROMPT = [
  '你是 stevenjhu.com（Steven玄）的繁體中文助理。',
  '只根據檢索到的站內內容回答；找不到就直說不知道，不要捏造經歷、文章或網址。',
  '問作者、性別、專長、經歷、聯絡方式時，優先採用 about/ 或 type: about／faq 的內容，不要用單篇技術文概括他的職業。',
  '可用同義改寫已寫明的事實（例如「魔羯男」= 男性、用「他」稱呼）。使用者明顯錯字時依語意理解（例如「難的還是女的」=「男的還是女的」）。',
  '作者專長是軟體工程（C#／.NET、前後端、資料庫）、專案管理、商務與行銷、投資與房地產；不是資料科學家，也不是 AI／機器學習研究員。不要把個人網站作者說成 AI 專家。',
  '單一專案或證照細節以 projects/ 文件為準；清單／易混淆問題可用 faq/projects.md。',
  '用完整句子說明，條列時每項加一句簡短說明，不要只丟兩個詞。',
  '站內固定入口：/ 首頁、/blog 文章、/projects 作品與證照、/series 系列、/about 關於。',
  '作品集、專案、證照一律連到 /projects，不要使用 /about/works 或 /about/certifications。',
  '若要給連結，寫成 Markdown：[關於作者](/about)、[作品](/projects)，禁止「網站路徑：」「來源：/foo」這類附錄。',
  '只能使用檢索內容或上述固定入口的路徑；沒有把握就不要給 URL。',
].join('\n');

const REWRITE_PROMPT = [
  'Rewrite the user question for site search on stevenjhu.com.',
  'Keep proper nouns (Steven玄, 送報件, AZ-104, AWS SAA, MSSQL, C#, Cobol).',
  'Distinguish 送報件系統升級改版 vs 送報件資料修正輔助系統.',
  'Author / gender / specialty / contact questions should target about profile and FAQ.',
  'Portfolio / cert list questions should target projects and faq/projects.',
  'Output one short search query in Traditional Chinese or mixed terms; no explanation.',
].join(' ');

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function folderPrefixFilter(prefix: string): Record<string, unknown> {
  return { folder: { $gte: prefix, $lt: `${prefix.slice(0, -1)}0` } };
}

function retrievalFiltersFor(query: string): Record<string, unknown> | undefined {
  const q = query.trim();
  if (!q) return undefined;

  const about =
    /作者|是誰|專長|性別|男的|女的|男性|女性|魔羯|聯絡|聯繫|github|facebook|cakeresume|關於你|你是誰|做什麼工作|職稱/i.test(
      q,
    );
  const portfolioList =
    /有哪些作品|有哪些證照|作品集|證照有哪些|portfolio|看作品|看證照|作品在哪|證照在哪/i.test(q);

  const specificProject =
    /送報件|升級|資料修正|vitawile|菲塔薇樂|租管|發信|email\s*api|astro|az-?900|az-?104|aws\s*saa|做了什麼|成效|角色/i.test(
      q,
    );

  if (about && !specificProject && !portfolioList) {
    return folderPrefixFilter('about/');
  }

  if (portfolioList && !specificProject) {
    return { folder: { $in: ['faq/', 'projects/'] } };
  }

  return undefined;
}

/** Legacy AutoRAG filter shape (eq / or). */
function legacyFiltersFor(query: string): Record<string, unknown> | undefined {
  const modern = retrievalFiltersFor(query);
  if (!modern) return undefined;

  const folder = modern.folder as Record<string, unknown> | string | undefined;
  if (typeof folder === 'string') {
    return { type: 'eq', key: 'folder', value: folder };
  }
  if (folder && typeof folder === 'object' && Array.isArray(folder.$in)) {
    return {
      type: 'or',
      filters: (folder.$in as string[]).map((value) => ({
        type: 'eq',
        key: 'folder',
        value,
      })),
    };
  }
  if (folder && typeof folder === 'object' && typeof folder.$gte === 'string') {
    // about/ prefix → exact folder about/ (files live directly there)
    const prefix = String(folder.$gte);
    return { type: 'eq', key: 'folder', value: prefix };
  }
  return undefined;
}

function inferSourceUrl(key: string | null | undefined, text: string): string | null {
  const yamlUrl = text.match(/^url:\s+(\/\S+)/m);
  if (yamlUrl) return yamlUrl[1];

  const k = (key ?? '').replace(/\\/g, '/');
  if (/(^|\/)about(\/|\.md$)/i.test(k)) return '/about';
  if (/(^|\/)faq(\/|\.md$)/i.test(k)) return '/projects';
  if (/(^|\/)catalog\/site\.md$/i.test(k) || /(^|\/)catalog\.md$/i.test(k)) return '/';
  if (/(^|\/)catalog\/projects\.md$/i.test(k) || /(^|\/)projects\//i.test(k)) return '/projects';
  if (/(^|\/)catalog\/blog\.md$/i.test(k)) return '/blog';
  if (/(^|\/)catalog\/series\.md$/i.test(k)) return '/series';
  const series = k.match(/(?:^|\/)series\/([^/]+)\.mdx?$/i);
  if (series) return `/series/${series[1]}`;
  return null;
}

function mapChunkSources(chunks: AiSearchChunk[] | undefined) {
  if (!chunks?.length) return [];
  return chunks.map((item) => {
    const key = item.item?.key ?? null;
    const text = item.text ?? '';
    const url = inferSourceUrl(key, text);
    return {
      id: item.id ?? null,
      score: item.score ?? null,
      text,
      key: url ?? key,
      metadata: {
        ...(item.item?.metadata ?? {}),
        ...(url ? { url } : {}),
        ...(key ? { filename: key } : {}),
      },
    };
  });
}

function mapLegacySources(data: AutoRagSource[] | undefined) {
  if (!data?.length) return [];
  return data.map((item) => {
    const text = item.content?.map((c) => c.text ?? '').join('\n') ?? '';
    const key = item.filename ?? null;
    const attrUrl = item.attributes?.url;
    const url =
      typeof attrUrl === 'string' && attrUrl.startsWith('/')
        ? attrUrl
        : inferSourceUrl(key, text);
    return {
      id: item.file_id ?? item.content?.[0]?.id ?? null,
      score: item.score ?? null,
      text: item.content?.[0]?.text ?? text,
      key: url ?? key,
      metadata: {
        ...(item.attributes ?? {}),
        ...(url ? { url } : {}),
        ...(key ? { filename: key } : {}),
      },
    };
  });
}

function isReadableStream(value: unknown): value is ReadableStream {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ReadableStream).getReader === 'function'
  );
}

function isResponseLike(value: unknown): value is Response {
  return (
    value instanceof Response ||
    (typeof value === 'object' &&
      value !== null &&
      typeof (value as Response).body !== 'undefined' &&
      typeof (value as Response).headers?.get === 'function')
  );
}

function normalizeMessages(
  body: { query?: unknown; messages?: unknown },
): { messages: AiSearchMessage[]; lastUserQuery: string } | { error: string } {
  const out: AiSearchMessage[] = [];

  if (Array.isArray(body.messages)) {
    for (const raw of body.messages) {
      if (!raw || typeof raw !== 'object') continue;
      const role = (raw as { role?: unknown }).role;
      const content = (raw as { content?: unknown }).content;
      if (role !== 'user' && role !== 'assistant') continue;
      if (typeof content !== 'string') continue;
      const text = content.trim();
      if (!text) continue;
      out.push({ role, content: text.slice(0, MAX_QUERY_LENGTH) });
    }
  }

  const query = typeof body.query === 'string' ? body.query.trim() : '';
  if (query) {
    if (query.length > MAX_QUERY_LENGTH) {
      return { error: `query must be at most ${MAX_QUERY_LENGTH} characters.` };
    }
    const last = out[out.length - 1];
    if (!(last?.role === 'user' && last.content === query)) {
      out.push({ role: 'user', content: query });
    }
  }

  if (!out.length) {
    return { error: 'query or messages is required.' };
  }

  let trimmed = out.slice(-MAX_MESSAGES);
  while (trimmed.length && trimmed[trimmed.length - 1].role !== 'user') {
    trimmed = trimmed.slice(0, -1);
  }
  if (!trimmed.length) {
    return { error: 'messages must end with a user turn.' };
  }

  const lastUserQuery = trimmed[trimmed.length - 1].content;
  return {
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
    lastUserQuery,
  };
}

/** Compact dialogue for legacy AutoRAG single-query rewrite. */
function legacySearchQuery(messages: AiSearchMessage[], lastUserQuery: string): string {
  const turns = messages.filter((m) => m.role === 'user' || m.role === 'assistant').slice(-4);
  if (turns.length <= 1) return lastUserQuery;
  return turns.map((m) => `${m.role === 'user' ? '使用者' : '助理'}：${m.content}`).join('\n');
}

function buildAiSearchOptions(lastUserQuery: string): AiSearchOptions {
  const filters = retrievalFiltersFor(lastUserQuery);
  return {
    retrieval: {
      retrieval_type: 'hybrid',
      fusion_method: 'rrf',
      match_threshold: 0.3,
      max_num_results: 6,
      context_expansion: 1,
      keyword_match_mode: 'or',
      ...(filters ? { filters } : {}),
    },
    query_rewrite: {
      enabled: true,
      rewrite_prompt: REWRITE_PROMPT,
    },
    reranking: {
      enabled: true,
      model: '@cf/baai/bge-reranker-base',
      match_threshold: 0.3,
    },
  };
}

function toAskJsonFromChat(result: AiSearchChatCompletionResult) {
  return json({
    answer: result.choices?.[0]?.message?.content ?? '',
    sources: mapChunkSources(result.chunks),
    search_query: result.search_query ?? null,
    mode: 'ai_search',
  });
}

function toAskJsonFromLegacy(result: AutoRagAiSearchResult) {
  return json({
    answer: result.response ?? result.choices?.[0]?.message?.content ?? '',
    sources: mapLegacySources(result.data),
    search_query: result.search_query ?? null,
    mode: 'autorag',
  });
}

function streamResponse(sse: Response | ReadableStream): Response {
  if (isResponseLike(sse)) {
    const headers = new Headers(sse.headers);
    if (!headers.get('content-type')?.includes('event-stream')) {
      headers.set('Content-Type', 'text/event-stream; charset=utf-8');
    }
    headers.set('Cache-Control', 'no-cache');
    return new Response(sse.body, { status: sse.status, headers });
  }
  return new Response(sse, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

async function viaAskSearch(
  ask: AiSearchInstance,
  messages: AiSearchMessage[],
  lastUserQuery: string,
  stream: boolean,
): Promise<Response> {
  const params = {
    messages,
    model: MODEL,
    ai_search_options: buildAiSearchOptions(lastUserQuery),
  };

  if (stream) {
    const sse = await ask.chatCompletions({ ...params, stream: true });
    if (isResponseLike(sse) || isReadableStream(sse)) return streamResponse(sse);
    return toAskJsonFromChat(sse as AiSearchChatCompletionResult);
  }

  const result = await ask.chatCompletions({ ...params, stream: false });
  if (isResponseLike(result)) return result;
  return toAskJsonFromChat(result);
}

async function viaAutoRag(
  ai: Ai,
  messages: AiSearchMessage[],
  lastUserQuery: string,
  stream: boolean,
): Promise<Response> {
  const rag = ai.autorag(AI_SEARCH_INSTANCE);
  const filters = legacyFiltersFor(lastUserQuery);
  const params = {
    query: legacySearchQuery(messages, lastUserQuery),
    system_prompt: SYSTEM_PROMPT,
    model: MODEL,
    rewrite_query: true,
    max_num_results: 6,
    ranking_options: { score_threshold: 0.3 },
    reranking: {
      enabled: true,
      model: '@cf/baai/bge-reranker-base',
    },
    ...(filters ? { filters } : {}),
  };

  if (stream) {
    const sse = await rag.aiSearch({ ...params, stream: true });
    if (isResponseLike(sse) || isReadableStream(sse)) return streamResponse(sse);
    return toAskJsonFromLegacy(sse as AutoRagAiSearchResult);
  }

  const result = await rag.aiSearch({ ...params, stream: false });
  if (isResponseLike(result)) return result;
  return toAskJsonFromLegacy(result);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { ASK_SEARCH, AI } = context.env;
  const hasAskSearch = Boolean(ASK_SEARCH?.chatCompletions);
  const hasAutoRag = Boolean(AI?.autorag);

  if (!hasAskSearch && !hasAutoRag) {
    return json(
      {
        error:
          'Ask AI binding is not configured. wrangler.toml needs [[ai_search]] ASK_SEARCH and/or [ai] AI; redeploy Pages.',
      },
      500,
    );
  }

  let body: { query?: unknown; messages?: unknown; stream?: unknown };
  try {
    body = (await context.request.json()) as {
      query?: unknown;
      messages?: unknown;
      stream?: unknown;
    };
  } catch {
    return json(
      { error: 'Invalid JSON body. Expected { query?: string, messages?: array, stream?: boolean }.' },
      400,
    );
  }

  const normalized = normalizeMessages(body);
  if ('error' in normalized) {
    return json({ error: normalized.error }, 400);
  }

  const stream = body.stream === true;

  try {
    if (hasAskSearch && ASK_SEARCH) {
      return await viaAskSearch(
        ASK_SEARCH,
        normalized.messages,
        normalized.lastUserQuery,
        stream,
      );
    }
    return await viaAutoRag(AI!, normalized.messages, normalized.lastUserQuery, stream);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI Search request failed.';
    console.error('[api/ask]', message);
    // If new binding exists but fails oddly, try legacy once
    if (hasAskSearch && hasAutoRag && AI) {
      try {
        console.warn('[api/ask] ASK_SEARCH failed; falling back to AI.autorag');
        return await viaAutoRag(AI, normalized.messages, normalized.lastUserQuery, stream);
      } catch (err2) {
        const message2 = err2 instanceof Error ? err2.message : message;
        console.error('[api/ask] fallback', message2);
        return json({ error: message2 }, 502);
      }
    }
    return json({ error: message }, 502);
  }
};

export const onRequestGet: PagesFunction = async () =>
  json({ error: 'Method not allowed. Use POST { query?, messages?, stream? }.' }, 405);
