import { tokenizeSearchQuery } from '@/utils/search-query';

export const SEARCH_INDEX_MISSING = 'INDEX_MISSING';

export type SearchKind = 'article' | 'series' | 'project' | 'about';

export type SearchFilters = {
  kind?: SearchKind;
  topic?: 'software' | 'business' | 'life';
};

export type SearchHit = {
  url: string;
  title: string;
  excerpt: string;
  kind: SearchKind | string;
  topic?: string;
  date?: string;
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindHitData>;
};

type PagefindHitData = {
  url: string;
  excerpt?: string;
  meta?: Record<string, string | undefined>;
  filters?: Record<string, string[] | undefined>;
};

type PagefindApi = {
  options: (opts: Record<string, unknown>) => Promise<void>;
  init: () => Promise<void>;
  preload: (term: string, opts?: Record<string, unknown>) => Promise<void>;
  search: (
    term: string,
    opts?: Record<string, unknown>,
  ) => Promise<{ results: PagefindResult[] }>;
  debouncedSearch: (
    term: string,
    opts?: Record<string, unknown>,
    debounceMs?: number,
  ) => Promise<{ results: PagefindResult[] } | null>;
};

const KIND_LABELS: Record<string, string> = {
  article: '文章',
  series: '系列',
  project: '作品',
  about: '關於',
};

const TOPIC_LABELS: Record<string, string> = {
  software: '軟體工程',
  business: '商業經驗',
  life: '生活',
};

let pagefindPromise: Promise<PagefindApi> | null = null;

function pagefindOptions(filters: SearchFilters) {
  const out: Record<string, string | string[]> = {};
  if (filters.kind) out.kind = filters.kind;
  if (filters.topic) out.topic = filters.topic;
  return Object.keys(out).length ? { filters: out } : undefined;
}

export function kindLabel(kind: string): string {
  return KIND_LABELS[kind] ?? kind;
}

export function topicLabel(topic: string): string {
  return TOPIC_LABELS[topic] ?? topic;
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function normalizeSearchPath(raw: string): string {
  let path = raw.trim();
  try {
    const url = new URL(path, window.location.origin);
    path = url.pathname;
  } catch {
    // keep path
  }
  if (!path.startsWith('/')) return '';
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

export async function loadPagefind(): Promise<PagefindApi> {
  if (!pagefindPromise) {
    pagefindPromise = (async () => {
      try {
        const url = new URL('/pagefind/pagefind.js', window.location.href).href;
        const mod = (await import(/* @vite-ignore */ url)) as PagefindApi & {
          default?: PagefindApi;
        };
        const api = (mod.default ?? mod) as PagefindApi;
        await api.options({
          excerptLength: 24,
        });
        await api.init();
        return api;
      } catch (err) {
        pagefindPromise = null;
        const error = new Error(SEARCH_INDEX_MISSING);
        error.cause = err;
        throw error;
      }
    })();
  }
  return pagefindPromise;
}

function preparedQuery(term: string): string {
  return tokenizeSearchQuery(term) || term;
}

export async function preloadSearch(term: string, filters: SearchFilters = {}) {
  const q = term.trim();
  if (!q) return;
  try {
    const api = await loadPagefind();
    await api.preload(preparedQuery(q), pagefindOptions(filters));
  } catch {
    // ignore until the user actually searches
  }
}

function hitFromData(data: PagefindHitData): SearchHit {
  const url = normalizeSearchPath(data.url);
  const meta = data.meta ?? {};
  const filters = data.filters ?? {};
  const kind =
    meta.kind ||
    filters.kind?.[0] ||
    inferKind(url);
  const topic = meta.topic || filters.topic?.[0];
  return {
    url,
    title: (meta.title ?? url).trim() || url,
    excerpt: data.excerpt ?? '',
    kind,
    topic,
    date: meta.date,
  };
}

function inferKind(url: string): SearchKind | string {
  if (url === '/about') return 'about';
  if (url === '/projects' || url.startsWith('/projects/')) return 'project';
  if (url.startsWith('/series/')) return 'series';
  return 'article';
}

export async function searchSite(
  term: string,
  filters: SearchFilters = {},
  limit = 8,
): Promise<{ hits: SearchHit[]; total: number } | null> {
  const q = term.trim();
  if (!q) return { hits: [], total: 0 };

  const api = await loadPagefind();
  const result = await api.debouncedSearch(preparedQuery(q), pagefindOptions(filters), 200);
  if (result === null) return null;

  const total = result.results.length;
  const slice = result.results.slice(0, limit);
  const hits = (await Promise.all(slice.map((item) => item.data()))).map(hitFromData);
  return { hits, total };
}

export function resultItemHtml(hit: SearchHit, extraClass = ''): string {
  const href = escapeHtml(hit.url);
  const title = escapeHtml(hit.title);
  const kind = escapeHtml(kindLabel(hit.kind));
  const topic = hit.topic
    ? `<span>${escapeHtml(topicLabel(hit.topic))}</span>`
    : '';
  const date = hit.date ? `<span>${escapeHtml(hit.date)}</span>` : '';
  const excerpt = hit.excerpt
    ? `<p class="site-search-excerpt">${hit.excerpt}</p>`
    : '';

  return `<li class="site-search-item ${extraClass}">
    <a href="${href}" class="site-search-link" data-astro-prefetch>
      <span class="site-search-meta">
        <span>${kind}</span>
        ${topic}
        ${date}
      </span>
      <span class="site-search-title">${title}</span>
      ${excerpt}
    </a>
  </li>`;
}
