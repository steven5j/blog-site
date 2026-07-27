/**
 * Bundles protected-content/*.md into functions/_data/manifest.json
 * for Cloudflare Pages Function unlock API (not copied to dist/).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'protected-content');
const outDir = path.join(root, 'functions', '_data');
const outFile = path.join(outDir, 'manifest.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw };
  }
  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { meta, body: match[2].trim() };
}

function buildManifest() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify({}), 'utf8');
    console.log('No protected-content/ directory; wrote empty manifest.');
    return;
  }

  const manifest = {};
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const slug = path.basename(file, '.md');
    const raw = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    manifest[slug] = {
      title: meta.title ?? slug,
      html: `<div class="prose-blog protected-body">${body}</div>`,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(
    `Wrote ${Object.keys(manifest).length} protected entries to functions/_data/manifest.json`,
  );
}

buildManifest();
