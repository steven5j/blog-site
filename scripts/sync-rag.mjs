/**
 * Export public site content for Cloudflare AI Search (R2: stevenjhu-r2).
 *
 *   node scripts/sync-rag.mjs            # write .rag/
 *   node scripts/sync-rag.mjs --upload   # write + wrangler r2 object put --remote
 *
 * Skips drafts and protected-only posts. Does not read protected-content/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, '.rag');
const BUCKET = 'stevenjhu-r2';
const SITE = 'https://stevenjhu.com';

const shouldUpload = process.argv.includes('--upload');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { yaml: '', meta: {}, body: raw };
  const yaml = match[1];
  const body = match[2] ?? '';
  const meta = {};
  for (const line of yaml.split('\n')) {
    const trimmed = line.replace(/\r$/, '');
    const m = trimmed.match(/^(\w+):\s*(.*)$/);
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

function isTruthy(value) {
  return value === 'true' || value === true;
}

function permalinkFromMeta(meta, slug) {
  const raw = meta.pubDate;
  if (!raw) return `/blog/${slug}`;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return `/blog/${slug}`;
  return `/${d.getUTCFullYear()}/${pad2(d.getUTCMonth() + 1)}/${pad2(d.getUTCDate())}/${slug}`;
}

function withUrlYaml(yaml, url, extraLines = []) {
  const extras = [`url: ${url}`, ...extraLines].join('\n');
  return yaml ? `${extras}\n${yaml}` : extras;
}

function writeDoc(relPath, contents) {
  const full = path.join(outDir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  return relPath;
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => path.join(dir, f));
}

function collectBlog(catalog) {
  const files = listMarkdown(path.join(root, 'src/content/blog'));
  let count = 0;
  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { yaml, meta, body } = parseFrontmatter(raw);
    if (isTruthy(meta.draft) || isTruthy(meta.protectedOnly)) continue;
    const url = permalinkFromMeta(meta, slug);
    const title = meta.title || slug;
    catalog.push(`- [${title}](${url})`);
    writeDoc(
      `blog/${slug}.md`,
      `---\n${withUrlYaml(yaml, url, ['type: blog'])}\n---\n\n${body.trim()}\n`,
    );
    count += 1;
  }
  return count;
}

function collectProjects(catalog) {
  const files = listMarkdown(path.join(root, 'src/content/projects'));
  let count = 0;
  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { yaml, meta, body } = parseFrontmatter(raw);
    const url = `/projects#${slug}`;
    const title = meta.title || slug;
    catalog.push(`- [${title}](/projects)（作品／證照）`);
    writeDoc(
      `projects/${slug}.md`,
      `---\n${withUrlYaml(yaml, url, ['type: project'])}\n---\n\n${body.trim()}\n`,
    );
    count += 1;
  }
  return count;
}

function collectSeries(catalog) {
  const files = listMarkdown(path.join(root, 'src/content/series'));
  let count = 0;
  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { yaml, meta, body } = parseFrontmatter(raw);
    const url = `/series/${slug}`;
    const title = meta.title || slug;
    catalog.push(`- [${title}](${url})（系列）`);
    writeDoc(
      `series/${slug}.md`,
      `---\n${withUrlYaml(yaml, url, ['type: series'])}\n---\n\n${body.trim()}\n`,
    );
    count += 1;
  }
  return count;
}

function writeSiteProfile() {
  writeDoc(
    'about.md',
    `---
title: 關於 Steven玄
url: /about
type: about
---

# 關於 Steven玄

網站：${SITE}
作者：Steven玄（Steven J. Hu）
語言：繁體中文

這是 Steven玄 的整合性個人網站，整理技術履歷、生意經驗與房地產筆記。

## 專長與經歷

- 國立高雄科大 海洋環境工程系 畢業
- 軟體公司「前、後、資料庫軟體工程師」
- 資產公司「千萬業務員」
- 傳銷公司百萬收入領導兼講師
- 2019 年初轉職工程師，長期發展軟體工程

## 網站主題

- 自我成長：品牌建立、生活瑣事
- 技術履歷：程式語言、科技
- 生意經驗：賺錢、被動收入、投資理財、行銷策略
- 房地產：房屋租賃、收租屋規劃

## 主要路徑

- / 首頁
- /blog 文章
- /projects 作品與證照
- /series 系列
- /about 關於
`,
  );
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function putObject(relPosix) {
  const local = path.join(outDir, relPosix);
  const dest = `${BUCKET}/${relPosix.replaceAll('\\', '/')}`;
  return new Promise((resolve, reject) => {
    const child = spawn(
      'npx',
      [
        'wrangler',
        'r2',
        'object',
        'put',
        dest,
        '--file',
        local,
        '--remote',
        '-y',
        '--content-type',
        'text/markdown; charset=utf-8',
      ],
      { cwd: root, shell: true, windowsHide: true },
    );
    let stderr = '';
    child.stderr.on('data', (d) => {
      stderr += d.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${dest} failed (${code}): ${stderr.trim()}`));
    });
  });
}

async function uploadAll() {
  const files = walkFiles(outDir).map((full) => path.relative(outDir, full));
  const concurrency = 4;
  let done = 0;
  let index = 0;
  async function worker() {
    while (index < files.length) {
      const i = index;
      index += 1;
      await putObject(files[i]);
      done += 1;
      if (done % 20 === 0 || done === files.length) {
        console.log(`Uploaded ${done}/${files.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const catalog = [];
const blogCount = collectBlog(catalog);
const projectCount = collectProjects(catalog);
const seriesCount = collectSeries(catalog);
writeSiteProfile();
writeDoc(
  'catalog.md',
  `---
title: 網站內容目錄
url: /
type: catalog
---

# stevenjhu.com 公開內容目錄

作者：Steven玄（Steven J. Hu）

${catalog.join('\n')}
`,
);

const total = walkFiles(outDir).length;
console.log(
  `Wrote ${total} files to .rag/ (blog ${blogCount}, projects ${projectCount}, series ${seriesCount}, plus about/catalog)`,
);

if (shouldUpload) {
  console.log(`Uploading to R2 bucket ${BUCKET} ...`);
  await uploadAll();
  console.log('Upload complete. In Cloudflare Dashboard → AI Search → stevenjhu-ai-search, wait for indexing to finish.');
}
