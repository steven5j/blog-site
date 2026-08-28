/**
 * ASCII URL slug helpers for blog posts (shared by assign + redirects + sync-rag).
 */

/** Matches Cloudflare-safe path segments and content entry ids. */
export const ASCII_SLUG_RE = /^[a-zA-Z0-9._~-]+$/;

export function isAsciiSlug(value) {
  return typeof value === 'string' && ASCII_SLUG_RE.test(value);
}

export function pad2(n) {
  return String(n).padStart(2, '0');
}

export function datePartsFromPubDate(pubDate) {
  const m = String(pubDate).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return { year: m[1], month: m[2], day: m[3] };
  const d = new Date(pubDate);
  return {
    year: String(d.getUTCFullYear()),
    month: pad2(d.getUTCMonth() + 1),
    day: pad2(d.getUTCDate()),
  };
}

/**
 * Derive a stable ASCII slug from a content file id (may contain CJK).
 * Appends wpId when present for uniqueness.
 */
export function slugifyId(id, wpId) {
  let base = id
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '-')
    .replace(/[^a-zA-Z0-9._~-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-._~]+|[-._~]+$/g, '')
    .toLowerCase();

  if (!base || base.length < 2) {
    base = wpId ? `post` : 'post';
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

/**
 * Resolve the public URL slug for a post from frontmatter + file id.
 */
export function urlSlugFromEntry(id, meta = {}) {
  if (meta.slug) {
    if (!isAsciiSlug(meta.slug)) {
      throw new Error(`Invalid slug for ${id}: must be ASCII [a-zA-Z0-9._~-]+`);
    }
    return meta.slug;
  }
  if (isAsciiSlug(id)) return id;
  const wpId = meta.wpId ? Number(meta.wpId) : undefined;
  return slugifyId(id, wpId);
}

export function postHrefFromParts(pubDate, urlSlug) {
  const { year, month, day } = datePartsFromPubDate(pubDate);
  return `/${year}/${month}/${day}/${urlSlug}`;
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { yaml: '', meta: {}, body: '' };
  const yaml = match[1];
  const body = raw.slice(match[0].length);
  const meta = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[m[1]] = value;
  }
  return { yaml, meta, body };
}
