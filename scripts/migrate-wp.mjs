/**
 * Migrate WordPress posts → src/content/blog/*.md
 *
 * Usage:
 *   node scripts/migrate-wp.mjs
 *   node scripts/migrate-wp.mjs --limit=10
 *   node scripts/migrate-wp.mjs --dry-run
 *
 * Env:
 *   WP_API_BASE  (default: Cloudways staging URL)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'src/content/blog');
const mediaDir = path.join(root, 'public/uploads');
const map = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'wp-category-map.json'), 'utf8'),
);

const WP_API_BASE =
  process.env.WP_API_BASE ||
  'https://wordpress-1652732-6572997.cloudwaysapps.com';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

function decodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '![]($1)')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function yamlEscape(s) {
  const str = String(s);
  if (/[:#\[\]{}&*!|>'"%@`]/.test(str) || /^\s|\s$/.test(str)) {
    return JSON.stringify(str);
  }
  return str;
}

/** Prefer date embedded in WP permalink path for exact SEO match. */
function pubDateFromLink(link, fallbackIso) {
  const m = String(link).match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  const d = new Date(fallbackIso);
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

function mapCategories(categoryIds, categoryById) {
  let topic = map.defaultTopic;
  let series;
  const cats = categoryIds
    .map((id) => categoryById.get(id))
    .filter(Boolean);

  const hits = [];
  for (const cat of cats) {
    const decoded = decodeSlug(cat.slug);
    const hit = map.bySlug[cat.slug] || map.bySlug[decoded];
    if (hit) hits.push({ hit, parent: cat.parent || 0 });
  }

  // Prefer mapped rows that include a series; then deeper categories
  hits.sort((a, b) => {
    const seriesScore = (b.hit.series ? 1 : 0) - (a.hit.series ? 1 : 0);
    if (seriesScore !== 0) return seriesScore;
    return b.parent - a.parent;
  });

  if (hits[0]) {
    topic = hits[0].hit.topic || topic;
    series = hits[0].hit.series;
  }
  return { topic, series };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { json: await res.json(), headers: res.headers };
}

async function fetchAllCategories() {
  const { json } = await fetchJson(
    `${WP_API_BASE}/wp-json/wp/v2/categories?per_page=100`,
  );
  const byId = new Map();
  for (const c of json) byId.set(c.id, c);
  return byId;
}

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  while (posts.length < limit) {
    const perPage = Math.min(100, limit - posts.length);
    const url = `${WP_API_BASE}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    posts.push(...batch);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || 1);
    if (page >= totalPages) break;
    page += 1;
  }
  return posts.slice(0, limit === Infinity ? undefined : limit);
}

async function downloadMedia(url, destRel) {
  const dest = path.join(root, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) return `/${destRel.replace(/^public\//, '').replace(/\\/g, '/')}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return `/${destRel.replace(/^public\//, '').replace(/\\/g, '/')}`;
}

function buildMarkdown(post, topic, series, heroImage) {
  const slug = decodeSlug(post.slug);
  const pubDate = pubDateFromLink(post.link, post.date_gmt || post.date);
  const title = (post.title?.rendered || '').replace(/<[^>]+>/g, '').trim();
  const description = stripHtml(post.excerpt?.rendered || '')
    .replace(/\s+/g, ' ')
    .slice(0, 180);
  const body = stripHtml(post.content?.rendered || '');
  const tags = (post._embedded?.['wp:term'] || [])
    .flat()
    .filter((t) => t.taxonomy === 'post_tag')
    .map((t) => t.name);

  const fm = [
    '---',
    `title: ${yamlEscape(title)}`,
    `description: ${yamlEscape(description || title)}`,
    `pubDate: ${pubDate}`,
    `topic: ${topic}`,
  ];
  if (series) fm.push(`series: ${series}`);
  if (tags.length) {
    fm.push('tags:');
    for (const t of tags) fm.push(`  - ${yamlEscape(t)}`);
  }
  if (heroImage) fm.push(`heroImage: ${yamlEscape(heroImage)}`);
  fm.push(`wpId: ${post.id}`);
  fm.push(`legacyUrl: ${yamlEscape(post.link)}`);
  fm.push('---', '', body, '');
  return { slug, content: fm.join('\n') };
}

async function main() {
  console.log(`WP_API_BASE=${WP_API_BASE}`);
  console.log(dryRun ? 'Dry run — no files written' : 'Writing markdown + media');

  const categoryById = await fetchAllCategories();
  const posts = await fetchAllPosts();
  console.log(`Fetched ${posts.length} posts, ${categoryById.size} categories`);

  fs.mkdirSync(blogDir, { recursive: true });
  fs.mkdirSync(mediaDir, { recursive: true });

  let written = 0;
  for (const post of posts) {
    const { topic, series } = mapCategories(post.categories || [], categoryById);
    let heroImage;
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    const src = media?.source_url;
    if (src && !dryRun) {
      const ext = path.extname(new URL(src).pathname) || '.jpg';
      const rel = path.join('public', 'uploads', 'wp', `${post.id}${ext}`);
      heroImage = await downloadMedia(src, rel);
    } else if (src) {
      heroImage = src;
    }

    const { slug, content } = buildMarkdown(post, topic, series, heroImage);
    const outFile = path.join(blogDir, `${slug}.md`);
    if (dryRun) {
      console.log(`[dry] ${slug} → topic=${topic} series=${series || '-'}`);
    } else {
      fs.writeFileSync(outFile, content, 'utf8');
      written += 1;
    }
  }

  console.log(dryRun ? 'Done (dry run).' : `Wrote ${written} files to src/content/blog/`);
  console.log('Next: node scripts/generate-redirects.mjs');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
