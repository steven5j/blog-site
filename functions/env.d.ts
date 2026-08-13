declare type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

/** Minimal AI Search instance binding (see Cloudflare AI Search Workers binding). */
interface AiSearchMessage {
  role: 'system' | 'developer' | 'user' | 'assistant' | 'tool';
  content: string;
}

interface AiSearchChunk {
  id: string;
  type: string;
  score: number;
  text: string;
  item?: {
    key?: string;
    timestamp?: number;
    metadata?: Record<string, unknown>;
  };
}

interface AiSearchChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index?: number;
    message: { role: string; content: string };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  chunks?: AiSearchChunk[];
}

interface AiSearchInstance {
  search(params: {
    messages?: AiSearchMessage[];
    query?: string;
    ai_search_options?: Record<string, unknown>;
  }): Promise<{ chunks: AiSearchChunk[] }>;

  chatCompletions(params: {
    messages: AiSearchMessage[];
    model?: string;
    stream?: boolean;
    ai_search_options?: Record<string, unknown>;
  }): Promise<AiSearchChatCompletion | ReadableStream>;
}
