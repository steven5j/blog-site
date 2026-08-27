/**
 * Export public site content for Cloudflare AI Search (R2: stevenjhu-r2).
 *
 *   node scripts/sync-rag.mjs            # write .rag/
 *   node scripts/sync-rag.mjs --upload   # write + wrangler r2 object put --remote
 *                                        # --upload 需先 npx wrangler login
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
性別：男性（西元 93 年次魔羯男；對外以「他」稱呼）
語言：繁體中文
關於頁：${SITE}/about

這是 Steven玄 的整合性個人網站，整理技術履歷、生意經驗與房地產筆記。
2009 年左右撰寫 Blogspot 生活經歷；2019 年初轉職工程師後，把經驗、履歷與技術筆記集中在此站。

## 專長（請依此回答，不要改成資料科學或人工智慧研究員）

- 專案管理與顧問、行銷策劃、商務開發、程式語言、投資規劃
- 軟體工程：前端、後端、資料庫（主要 MSSQL、C# .NET、HTML／CSS／JavaScript）
- 不是資料科學家，不是機器學習／AI 研究員；本站 Ask AI 只是網站功能，不代表作者職稱為 AI 專家

## 經歷摘要

- 國立高雄海洋科技大學（現高雄科技大學）海洋環境工程系畢業
- 軟體公司「前、後、資料庫軟體工程師」（2019 年 11 月至今，科技資訊公司工程師）
- 資產公司「千萬業務員」；地產顧問、資產管理顧問主管
- 傳銷公司百萬收入領導兼講師（曾三星鑽領導）
- 投資與合夥：外匯、股權、債權、私募、數字貨幣、美股台股、不動產；黃金貿易、房產隔套、交易所代理

## 網站主題

- 自我成長：品牌建立、生活瑣事
- 技術履歷：程式語言、科技
- 生意經驗：賺錢、被動收入、投資理財、行銷策略
- 房地產：房屋租賃、收租屋規劃

## 聯絡

- GitHub：https://github.com/steven5j
- Facebook：https://www.facebook.com/shang.ju.5/
- CakeResume：https://www.cakeresume.com/stevenjhu5j

## 主要路徑

- / 首頁（https://stevenjhu.com/）
- /blog 文章列表
- /projects 作品集與證照（沒有 /about/works 或 /about/certifications）
- /series 系列
- /about 關於作者
`,
  );

  writeDoc(
    'faq.md',
    `---
title: 網站常見問題 FAQ
url: /about
type: faq
---

# stevenjhu.com 常見問題

問：這個網站的作者是誰？
答：作者是 Steven玄（Steven J. Hu）。個人網站為 https://stevenjhu.com，關於頁在 /about。

問：作者是男的還是女的？男性還是女性？難的還是女的？
答：男性。關於頁寫「西元 93 年次的魔羯男」。稱呼用「他」。

問：作者專長是什麼？做什麼工作？
答：現職是軟體工程師（前、後、資料庫），主要 MSSQL、C# .NET、前端。自述專長還包括專案管理與顧問、行銷策劃、商務開發、投資規劃。另有業務、傳銷講師與房地產收租經驗。不是資料科學家，也不是人工智慧或機器學習研究員。

問：作者在哪裡看作品或證照？
答：一律看 /projects。沒有 /about/works 或 /about/certifications。證照例如 AWS SAA、Azure AZ-900、Azure AZ-104。

問：怎麼聯絡作者？
答：GitHub https://github.com/steven5j、Facebook https://www.facebook.com/shang.ju.5/、CakeResume https://www.cakeresume.com/stevenjhu5j，或先看 /about。

問：密碼保護的文章能不能講內容？
答：不能。只說明該篇有鎖、請到原頁解鎖；不要複述機密內文。
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
  const wranglerJs = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        wranglerJs,
        'r2',
        'object',
        'put',
        dest,
        '--file',
        local,
        '--remote',
        '-y',
        '--content-type',
        'text/markdown',
      ],
      { cwd: root, windowsHide: true },
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

作者：Steven玄（Steven J. Hu），男性。詳見 /about 與站內 FAQ。

${catalog.join('\n')}
`,
);

const total = walkFiles(outDir).length;
console.log(
  `Wrote ${total} files to .rag/ (blog ${blogCount}, projects ${projectCount}, series ${seriesCount}, plus about/faq/catalog)`,
);

if (shouldUpload) {
  console.log(`Uploading to R2 bucket ${BUCKET} ...`);
  await uploadAll();
  console.log('Upload complete. In Cloudflare Dashboard → AI Search → stevenjhu-ai-search, wait for indexing to finish.');
}
