/**
 * POST /api/ask — site Q&A via Cloudflare AI Search.
 *
 * Pages Functions use the Workers AI binding (`env.AI`), then
 * `env.AI.autorag("stevenjhu-ai-search")` (legacy AutoRAG API).
 *
 * Body: { query: string, stream?: boolean }
 * - stream=false (default): JSON { answer, sources }
 * - stream=true: text/event-stream
 */

interface Env {
  AI: Ai;
}

const AI_SEARCH_INSTANCE = 'stevenjhu-ai-search';
const MAX_QUERY_LENGTH = 1000;
const SYSTEM_PROMPT = [
  '你是 stevenjhu.com（Steven玄）的繁體中文助理。',
  '只根據檢索到的站內內容回答；找不到就直說不知道，不要捏造經歷、文章或網址。',
  '問作者、性別、專長、經歷、聯絡方式時，優先採用 type: about 或 type: faq 的內容，不要用單篇技術文概括他的職業。',
  '可用同義改寫已寫明的事實（例如「魔羯男」= 男性、用「他」稱呼）。使用者明顯錯字時依語意理解（例如「難的還是女的」=「男的還是女的」）。',
  '作者專長是軟體工程（C#／.NET、前後端、資料庫）、專案管理、商務與行銷、投資與房地產；不是資料科學家，也不是 AI／機器學習研究員。不要把個人網站作者說成 AI 專家。',
  '用完整句子說明，條列時每項加一句簡短說明，不要只丟兩個詞。',
  '站內固定入口：/ 首頁、/blog 文章、/projects 作品與證照、/series 系列、/about 關於。',
  '作品集、專案、證照一律連到 /projects，不要使用 /about/works 或 /about/certifications。',
  '若要給連結，寫成 Markdown：[關於作者](/about)、[作品](/projects)，禁止「網站路徑：」「來源：/foo」這類附錄。',
  '只能使用檢索內容或上述固定入口的路徑；沒有把握就不要給 URL。',
].join('\n');

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function inferSourceUrl(item: AutoRagSource): string | null {
  const attrUrl = item.attributes?.url;
  if (typeof attrUrl === 'string' && attrUrl.startsWith('/')) return attrUrl;

  const text = item.content?.map((c) => c.text ?? '').join('\n') ?? '';
  const yamlUrl = text.match(/^url:\s+(\/\S+)/m);
  if (yamlUrl) return yamlUrl[1];

  const key = (item.filename ?? '').replace(/\\/g, '/');
  if (/(^|\/)(about|faq)\.md$/i.test(key) || /(^|\/)catalog\.md$/i.test(key)) return '/about';
  if (/(^|\/)projects\//.test(key)) return '/projects';
  const series = key.match(/(?:^|\/)series\/([^/]+)\.mdx?$/i);
  if (series) return `/series/${series[1]}`;
  return null;
}

function mapSources(data: AutoRagSource[] | undefined) {
  if (!data?.length) return [];
  return data.map((item) => {
    const url = inferSourceUrl(item);
    return {
      id: item.file_id ?? item.content?.[0]?.id ?? null,
      score: item.score ?? null,
      text: item.content?.[0]?.text ?? '',
      key: url ?? item.filename ?? null,
      metadata: {
        ...(item.attributes ?? {}),
        ...(url ? { url } : {}),
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

function toAskJson(result: AutoRagAiSearchResult) {
  return json({
    answer: result.response ?? result.choices?.[0]?.message?.content ?? '',
    sources: mapSources(result.data),
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { AI } = context.env;
  if (!AI?.autorag) {
    return json(
      { error: 'AI binding is not configured. Check wrangler.toml [ai] and redeploy.' },
      500,
    );
  }

  let body: { query?: unknown; stream?: unknown };
  try {
    body = (await context.request.json()) as { query?: unknown; stream?: unknown };
  } catch {
    return json({ error: 'Invalid JSON body. Expected { query: string, stream?: boolean }.' }, 400);
  }

  const query = typeof body.query === 'string' ? body.query.trim() : '';
  if (!query) {
    return json({ error: 'query is required.' }, 400);
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return json({ error: `query must be at most ${MAX_QUERY_LENGTH} characters.` }, 400);
  }

  const stream = body.stream === true;
  const rag = AI.autorag(AI_SEARCH_INSTANCE);
  const params = {
    query,
    system_prompt: SYSTEM_PROMPT,
    model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
    rewrite_query: true,
    max_num_results: 8,
    ranking_options: { score_threshold: 0 },
    reranking: {
      enabled: true,
      model: '@cf/baai/bge-reranker-base',
    },
  };

  try {
    if (stream) {
      const sse = await rag.aiSearch({ ...params, stream: true });
      if (isResponseLike(sse)) {
        const headers = new Headers(sse.headers);
        if (!headers.get('content-type')?.includes('event-stream')) {
          headers.set('Content-Type', 'text/event-stream; charset=utf-8');
        }
        headers.set('Cache-Control', 'no-cache');
        return new Response(sse.body, { status: sse.status, headers });
      }
      if (isReadableStream(sse)) {
        return new Response(sse, {
          headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      }
      return toAskJson(sse as AutoRagAiSearchResult);
    }

    const result = await rag.aiSearch({ ...params, stream: false });
    if (isResponseLike(result)) {
      return result;
    }
    return toAskJson(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI Search request failed.';
    console.error('[api/ask]', message);
    return json({ error: message }, 502);
  }
};

export const onRequestGet: PagesFunction = async () =>
  json({ error: 'Method not allowed. Use POST { query, stream? }.' }, 405);
