/**
 * Assign stable ASCII `slug:` frontmatter to blog posts whose file id is non-ASCII.
 *
 * Usage:
 *   node scripts/assign-blog-slugs.mjs          # write slugs
 *   node scripts/assign-blog-slugs.mjs --dry-run
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isAsciiSlug,
  parseFrontmatter,
  slugifyId,
  urlSlugFromEntry,
} from './blog-slug.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'src/content/blog');
const dryRun = process.argv.includes('--dry-run');

function insertSlugLine(yaml, slug) {
  const lines = yaml.split(/\r?\n/);
  const wpIdx = lines.findIndex((l) => l.startsWith('wpId:'));
  const slugLine = `slug: ${slug}`;
  if (wpIdx >= 0) {
    lines.splice(wpIdx + 1, 0, slugLine);
  } else {
    const pubIdx = lines.findIndex((l) => l.startsWith('pubDate:'));
    const at = pubIdx >= 0 ? pubIdx + 1 : 0;
    lines.splice(at, 0, slugLine);
  }
  return lines.join('\n');
}

function main() {
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  const used = new Set();
  let added = 0;
  let skipped = 0;
  let validated = 0;

  for (const file of files) {
    const id = file.replace(/\.(md|mdx)$/, '');
    const filePath = path.join(blogDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { yaml, meta, body } = parseFrontmatter(raw);

    if (isAsciiSlug(id) && !meta.slug) {
      used.add(id);
      skipped += 1;
      continue;
    }

    if (meta.slug) {
      const slug = urlSlugFromEntry(id, meta);
      if (used.has(slug)) {
        throw new Error(`Duplicate slug "${slug}" in ${file}`);
      }
      used.add(slug);
      validated += 1;
      continue;
    }

    const wpId = meta.wpId ? Number(meta.wpId) : undefined;
    let slug = slugifyId(id, wpId);
    if (used.has(slug)) {
      slug = wpId ? `${slugifyId(id)}-${wpId}` : `${slug}-${used.size}`;
    }
    used.add(slug);

    if (dryRun) {
      console.log(`[dry] ${id} → slug: ${slug}`);
      added += 1;
      continue;
    }

    const newYaml = insertSlugLine(yaml, slug);
    fs.writeFileSync(filePath, `---\n${newYaml}\n---${body}`, 'utf8');
    console.log(`+ ${id} → slug: ${slug}`);
    added += 1;
  }

  console.log(
    dryRun
      ? `Dry run: would add ${added} slugs, ${skipped} ASCII ids skipped, ${validated} existing validated`
      : `Done: added ${added} slugs, ${skipped} ASCII ids skipped, ${validated} existing validated`,
  );
}

main();
