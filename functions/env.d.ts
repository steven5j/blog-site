declare type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

/** Chat / search message for AI Search Workers binding. */
interface AiSearchMessage {
  role: 'system' | 'developer' | 'user' | 'assistant' | 'tool';
  content: string;
}

interface AiSearchRetrievalOptions {
  retrieval_type?: 'vector' | 'keyword' | 'hybrid';
  match_threshold?: number;
  max_num_results?: number;
  filters?: Record<string, unknown>;
  context_expansion?: number;
  fusion_method?: 'rrf' | 'max';
  keyword_match_mode?: 'and' | 'or';
}

interface AiSearchOptions {
  retrieval?: AiSearchRetrievalOptions;
  query_rewrite?: {
    enabled?: boolean;
    model?: string;
    rewrite_prompt?: string;
  };
  reranking?: {
    enabled?: boolean;
    model?: string;
    match_threshold?: number;
  };
  cache?: {
    enabled?: boolean;
    cache_threshold?: string;
  };
}

interface AiSearchChunk {
  id?: string;
  type?: string;
  score?: number;
  text?: string;
  item?: {
    key?: string;
    timestamp?: number;
    metadata?: Record<string, unknown>;
  };
  scoring_details?: Record<string, unknown>;
}

interface AiSearchChatCompletionResult {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices?: Array<{
    index?: number;
    message?: { role?: string; content?: string };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  chunks?: AiSearchChunk[];
  search_query?: string;
}

interface AiSearchInstance {
  search(params: {
    messages?: AiSearchMessage[];
    query?: string;
    ai_search_options?: AiSearchOptions;
  }): Promise<{ search_query?: string; chunks?: AiSearchChunk[] }>;
  chatCompletions(params: {
    messages: AiSearchMessage[];
    model?: string;
    stream?: false;
    ai_search_options?: AiSearchOptions;
  }): Promise<AiSearchChatCompletionResult>;
  chatCompletions(params: {
    messages: AiSearchMessage[];
    model?: string;
    stream: true;
    ai_search_options?: AiSearchOptions;
  }): Promise<ReadableStream | Response>;
  chatCompletions(params: {
    messages: AiSearchMessage[];
    model?: string;
    stream?: boolean;
    ai_search_options?: AiSearchOptions;
  }): Promise<AiSearchChatCompletionResult | ReadableStream | Response>;
}

/** Legacy AutoRAG / AI Search via Workers AI (`env.AI.autorag()`). */
interface AutoRagAiSearchParams {
  query: string;
  model?: string;
  system_prompt?: string;
  rewrite_query?: boolean;
  max_num_results?: number;
  ranking_options?: { score_threshold?: number };
  reranking?: { enabled?: boolean; model?: string };
  filters?: Record<string, unknown>;
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
  ): Promise<ReadableStream | Response | AutoRagAiSearchResult>;
  aiSearch(
    params: AutoRagAiSearchParams,
  ): Promise<AutoRagAiSearchResult | ReadableStream | Response>;
}

interface Ai {
  autorag(instanceName: string): AutoRagInstance;
}
