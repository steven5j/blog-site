/**
 * POST /api/ask — site Q&A via Cloudflare AI Search (stevenjhu-ai-search).
 *
 * Body: { query: string, stream?: boolean }
 * - stream=false (default): JSON { answer, sources, model, usage }
 * - stream=true: text/event-stream (chunks event + OpenAI-style deltas)
 */

interface Env {
  AI_SEARCH: AiSearchInstance;
}

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

function mapSources(chunks: AiSearchChunk[] | undefined) {
  if (!chunks?.length) return [];
  return chunks.map((chunk) => ({
    id: chunk.id,
    score: chunk.score,
    text: chunk.text,
    key: chunk.item?.key ?? null,
    metadata: chunk.item?.metadata ?? null,
  }));
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { AI_SEARCH } = context.env;
  if (!AI_SEARCH) {
    return json(
      { error: 'AI_SEARCH binding is not configured. Check wrangler.toml [[ai_search]].' },
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
  const messages: AiSearchMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: query },
  ];

  const chatParams = {
    messages,
    model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
    stream,
    ai_search_options: {
      retrieval: {
        max_num_results: 5,
        match_threshold: 0.3,
      },
      query_rewrite: { enabled: true },
      reranking: {
        enabled: true,
        model: '@cf/baai/bge-reranker-base',
      },
    },
  };

  try {
    if (stream) {
      const sse = (await AI_SEARCH.chatCompletions({
        ...chatParams,
        stream: true,
      })) as ReadableStream;

      return new Response(sse, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const result = (await AI_SEARCH.chatCompletions({
      ...chatParams,
      stream: false,
    })) as AiSearchChatCompletion;

    return json({
      answer: result.choices?.[0]?.message?.content ?? '',
      sources: mapSources(result.chunks),
      model: result.model,
      usage: result.usage ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI Search request failed.';
    console.error('[api/ask]', message);
    return json({ error: message }, 502);
  }
};

export const onRequestGet: PagesFunction = async () =>
  json({ error: 'Method not allowed. Use POST { query, stream? }.' }, 405);
