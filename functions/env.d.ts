declare type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

/** Legacy AutoRAG / AI Search via Workers AI (`env.AI.autorag()`). */
interface AutoRagAiSearchParams {
  query: string;
  model?: string;
  system_prompt?: string;
  rewrite_query?: boolean;
  max_num_results?: number;
  ranking_options?: { score_threshold?: number };
  reranking?: { enabled?: boolean; model?: string };
  stream?: boolean;
}

interface AutoRagSource {
  file_id?: string;
  filename?: string;
  score?: number;
  attributes?: Record<string, unknown>;
  content?: Array<{ id?: string; type?: string; text?: string }>;
}

interface AutoRagAiSearchResult {
  object?: string;
  search_query?: string;
  response?: string;
  data?: AutoRagSource[];
  has_more?: boolean;
  choices?: Array<{
    index?: number;
    message?: { role?: string; content?: string };
    finish_reason?: string;
  }>;
}

interface AutoRagInstance {
  aiSearch(
    params: AutoRagAiSearchParams & { stream?: false },
  ): Promise<AutoRagAiSearchResult>;
  aiSearch(
    params: AutoRagAiSearchParams & { stream: true },
  ): Promise<ReadableStream>;
  aiSearch(
    params: AutoRagAiSearchParams,
  ): Promise<AutoRagAiSearchResult | ReadableStream>;
}

interface Ai {
  autorag(instanceName: string): AutoRagInstance;
}
