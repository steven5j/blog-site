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
  '你是 stevenjhu.com（Steven玄）個人網站的繁體中文助理。',
  '只根據檢索到的站內內容回答；找不到就明確說不知道，不要捏造。',
  '回覆簡潔、可用條列；若有對應文章請在文末用網站路徑標明來源。',
].join('');

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function mapSources(data: AutoRagSource[] | undefined) {
  if (!data?.length) return [];
  return data.map((item) => ({
    id: item.file_id ?? item.content?.[0]?.id ?? null,
    score: item.score ?? null,
    text: item.content?.[0]?.text ?? '',
    key: item.filename ?? null,
    metadata: item.attributes ?? null,
  }));
}

function isReadableStream(value: unknown): value is ReadableStream {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ReadableStream).getReader === 'function'
  );
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
      if (!isReadableStream(sse)) {
        const result = sse as AutoRagAiSearchResult;
        return json({
          answer: result.response ?? '',
          sources: mapSources(result.data),
        });
      }

      return new Response(sse, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const result = await rag.aiSearch({ ...params, stream: false });
    return json({
      answer: result.response ?? '',
      sources: mapSources(result.data),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI Search request failed.';
    console.error('[api/ask]', message);
    return json({ error: message }, 502);
  }
};

export const onRequestGet: PagesFunction = async () =>
  json({ error: 'Method not allowed. Use POST { query, stream? }.' }, 405);
