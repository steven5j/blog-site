import type { CollectionEntry } from 'astro:content';

/** Zero-pad to 2 digits (month/day). */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Matches Cloudflare-safe path segments. */
export const ASCII_SLUG_RE = /^[a-zA-Z0-9._~-]+$/;

export function isAsciiSlug(value: string): boolean {
  return ASCII_SLUG_RE.test(value);
}

/**
 * Parts of a date permalink path from a publication date.
 * Uses UTC so YAML date-only values (`2024-06-01`) stay stable across timezones.
 */
export function datePathParts(pubDate: Date): {
  year: string;
  month: string;
  day: string;
} {
  return {
    year: String(pubDate.getUTCFullYear()),
    month: pad2(pubDate.getUTCMonth() + 1),
    day: pad2(pubDate.getUTCDate()),
  };
}

/** Derive ASCII slug from a non-ASCII content id (mirrors scripts/blog-slug.mjs). */
export function slugifyId(id: string, wpId?: number): string {
  let base = id
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '-')
    .replace(/[^a-zA-Z0-9._~-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-._~]+|[-._~]+$/g, '')
    .toLowerCase();

  if (!base || base.length < 2) {
    base = 'post';
  }

  if (base.length > 48) {
    base = base.slice(0, 48).replace(/-+$/, '');
  }

  if (wpId) {
    const suffix = `-${wpId}`;
    const maxBase = 80 - suffix.length;
    if (base.length > maxBase) {
      base = base.slice(0, maxBase).replace(/-+$/, '');
    }
    return `${base}${suffix}`;
  }

  return base.slice(0, 80);
}

type BlogEntry = CollectionEntry<'blog'>;

/** Public URL slug — always ASCII. Uses frontmatter `slug` when set. */
export function postUrlSlug(post: BlogEntry): string {
  const { slug: explicit, wpId } = post.data;
  if (explicit) {
    if (!isAsciiSlug(explicit)) {
      throw new Error(
        `Post "${post.id}" has invalid slug "${explicit}" — must match [a-zA-Z0-9._~-]+`,
      );
    }
    return explicit;
  }
  if (isAsciiSlug(post.id)) return post.id;
  return slugifyId(post.id, wpId);
}

/**
 * WordPress-style date permalink: `/YYYY/MM/DD/{urlSlug}`
 * `urlSlug` is ASCII-safe for Cloudflare static asset serving.
 */
export function postHref(post: BlogEntry): string {
  const { year, month, day } = datePathParts(post.data.pubDate);
  return `/${year}/${month}/${day}/${postUrlSlug(post)}`;
}

/** @deprecated Use postHref(post) — kept for scripts that pass raw parts. */
export function postPermalink(pubDate: Date, urlSlug: string): string {
  const { year, month, day } = datePathParts(pubDate);
  return `/${year}/${month}/${day}/${urlSlug}`;
}

/** Legacy path using the content file id (may contain non-ASCII). */
export function legacyPostPath(post: BlogEntry): string | null {
  if (post.id === postUrlSlug(post)) return null;
  return postPermalink(post.data.pubDate, post.id);
}

/** Normalize content `heroImage` to a site-root path (`/uploads/...`). */
export function siteAssetPath(src?: string): string | undefined {
  if (!src) return undefined;
  const trimmed = src.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withoutPublic = trimmed.replace(/^\/?public\//, '');
  return withoutPublic.startsWith('/') ? withoutPublic : `/${withoutPublic}`;
}

export const TOPICS = ['software', 'business', 'life'] as const;
export type Topic = (typeof TOPICS)[number];

export const TOPIC_LABELS: Record<Topic, string> = {
  software: '軟體工程筆記',
  business: '商業經驗',
  life: '生活心得體驗分享',
};

export const TOPIC_DESCRIPTIONS: Record<Topic, string> = {
  software:
    '我從 2019 年正式踏入程式語言與軟體科技產業的發展，並列為本人長期發展領域之一。此記錄我的筆記和發展技術與成果作品。',
  business:
    '各產業經銷、代理、顧問與現場經營的經驗筆記；亦含投資理財、職涯成長與房地產操作。',
  life: '從高中起參與聚會與社團，認識朋友、學習成長，分享筆記與生活體驗。',
};

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}
