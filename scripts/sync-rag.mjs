/**
 * Export public site content for Cloudflare AI Search (R2: stevenjhu-r2).
 *
 * Modular RAG layout under .rag/:
 *   about/profile.md, about/faq.md
 *   projects/{slug}.md, projects/index.md
 *   faq/projects.md          (cross-project only; no per-item Q&A)
 *   catalog/{site,projects,blog,series}.md
 *   blog/, series/
 *
 *   node scripts/sync-rag.mjs            # write .rag/
 *   node scripts/sync-rag.mjs --upload   # write + put + delete obsolete R2 keys
 *                                        # --upload 需先 npx wrangler login
 *
 * Skips drafts and protected-only posts. Does not read protected-content/.
 *
 * After upload: Dashboard → AI Search → stevenjhu-ai-search
 *   - enable keyword + vector (hybrid)
 *   - wait for indexing before testing Ask AI
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  postHrefFromParts,
  urlSlugFromEntry,
} from './blog-slug.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, '.rag');
const statePath = path.join(root, '.rag-uploaded-keys.json');
const BUCKET = 'stevenjhu-r2';
const SITE = 'https://stevenjhu.com';

const shouldUpload = process.argv.includes('--upload');

/** Root keys from older sync-rag layouts — always remove on --upload. */
const LEGACY_R2_KEYS = [
  'about.md',
  'faq.md',
  'faq-projects.md',
  'catalog.md',
  'catalog-projects.md',
  'catalog-series.md',
  'catalog-blog.md',
];

const PROJECT_ALIASES = {
  'report-system-upgrade': [
    '送報件系統升級',
    '送報件系統改版',
    '壽險送報件升級',
    'Cobol 轉 C#',
  ],
  'report-data-fix': [
    '送報件資料修正',
    '資料修正輔助系統',
    '送報件修正',
  ],
  'blog-astro-rebuild': ['Astro 重構', '個人網站重建', 'stevenjhu.com 重構'],
  'email-api': ['發信 API', 'email API', '共用寄信'],
  vitawile: ['vitawile', '菲塔薇樂', '保健品官網'],
  'rental-management': ['房屋代租管', '租管網站', '物件上架'],
  'aws-saa': ['AWS SAA', 'Solutions Architect Associate'],
  'azure-az-900': ['AZ-900', 'Azure Fundamentals'],
  'azure-az-104': ['AZ-104', 'Azure Administrator'],
};

const PROJECT_NOT_CONFUSE = {
  'report-system-upgrade':
    '不要與「送報件資料修正輔助系統」搞混：本專案是壽險送報件系統整體升級改版（Cobol 轉 C#／SQL、險種規格統一），不是資料修正輔助工具。',
  'report-data-fix':
    '不要與「送報件系統升級改版專案」搞混：本專案是既有送報資料的規範化／批量化修正輔助，不是整套送報件系統升級。',
};

function unquote(value) {
  let s = value.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1);
  }
  return s;
}

function yamlScalar(value) {
  const s = String(value);
  if (s === '') return '""';
  if (/[:#\[\]{}&*!|>'"%@`]/.test(s) || /^\s|\s$/.test(s) || /\n/.test(s)) {
    return JSON.stringify(s);
  }
  return s;
}

function ragFrontmatter(fields) {
  const lines = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value == null || value === '') continue;
    if (Array.isArray(value)) {
      const items = value.map((item) => String(item).trim()).filter(Boolean);
      if (!items.length) continue;
      lines.push(`${key}:`);
      for (const item of items) lines.push(`  - ${yamlScalar(item)}`);
      continue;
    }
    lines.push(`${key}: ${yamlScalar(value)}`);
  }
  return lines.join('\n');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { yaml: '', meta: {}, body: raw };
  const yaml = match[1];
  const body = match[2] ?? '';
  const meta = {};
  let listKey = null;

  for (const line of yaml.split('\n')) {
    const trimmed = line.replace(/\r$/, '');
    if (!trimmed.trim()) {
      listKey = null;
      continue;
    }
    const listItem = trimmed.match(/^\s+-\s+(.*)$/);
    if (listItem && listKey) {
      if (!Array.isArray(meta[listKey])) meta[listKey] = [];
      meta[listKey].push(unquote(listItem[1]));
      continue;
    }
    const kv = trimmed.match(/^(\w+):\s*(.*)$/);
    if (!kv) {
      listKey = null;
      continue;
    }
    const key = kv[1];
    const rest = kv[2].trim();
    if (rest === '') {
      listKey = key;
      meta[key] = [];
      continue;
    }
    listKey = null;
    meta[key] = unquote(rest);
  }

  return { yaml, meta, body };
}

function isTruthy(value) {
  return value === 'true' || value === true;
}

function permalinkFromMeta(meta, id) {
  if (!meta.pubDate) return `/blog/${urlSlugFromEntry(id, meta)}`;
  return postHrefFromParts(meta.pubDate, urlSlugFromEntry(id, meta));
}

function listOf(meta, key) {
  const value = meta[key];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function cellText(html) {
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) =>
    stripTags(m[1]),
  );
  if (items.length) {
    const rest = stripTags(html.replace(/<(ul|ol)[\s\S]*?<\/\1>/gi, ' '));
    return [rest, items.join('；')].filter(Boolean).join('：');
  }
  return stripTags(html);
}

function tableToProse(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[\s\S]*?<\/tr>/gi)]
    .map((rowMatch) =>
      [...rowMatch[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)]
        .map((cell) => cellText(cell[1]))
        .filter(Boolean),
    )
    .filter((row) => row.length);

  if (!rows.length) return '';

  const [header, ...body] = rows;
  const looksLikeHeader = header.length > 1 && body.length > 0;
  const dataRows = looksLikeHeader ? body : rows;
  const labels = looksLikeHeader ? header : null;

  return dataRows
    .map((row) => {
      if (row.length === 2) return `${row[0]}：${row[1]}`;
      if (labels && labels.length === row.length && labels.length > 2) {
        const cols = labels
          .slice(1)
          .map((label, i) => `${label}：${row[i + 1] ?? ''}`)
          .join('；');
        return `${row[0]}。${cols}`;
      }
      if (labels && labels.length === row.length) {
        return labels.map((label, i) => `${label}：${row[i] ?? ''}`).join('；');
      }
      return row.join('／');
    })
    .join('\n');
}

function bodyToProse(rawBody) {
  const fences = [];
  let text = rawBody.replace(/\r\n/g, '\n');

  text = text.replace(/```[\s\S]*?```/g, (block) => {
    const i = fences.length;
    fences.push(block);
    return `\n\n%%FENCE_${i}%%\n\n`;
  });

  text = text.replace(/^import\s+.+from\s+['"][^'"]+['"];?\s*$/gm, '');
  text = text.replace(/^export\s+\{[\s\S]*?\};?\s*$/gm, '');

  text = text.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
  text = text.replace(/<figure[\s\S]*?<\/figure>/gi, '\n');
  text = text.replace(/<img\b[^>]*>/gi, '');
  text = text.replace(/<table[\s\S]*?<\/table>/gi, (table) => `\n${tableToProse(table)}\n`);
  text = text.replace(/<pre[\s\S]*?<\/pre>/gi, (pre) => `\n${stripTags(pre)}\n`);
  text = text.replace(
    /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_, level, inner) => `\n${'#'.repeat(Number(level))} ${stripTags(inner)}\n`,
  );
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `- ${stripTags(inner)}\n`);
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/(p|div|section|article|blockquote|tr)>/gi, '\n\n');
  text = text.replace(/<[A-Z][\w.]*([^>]*?)\/>/g, '');
  text = text.replace(/<[A-Z][\w.]*[^>]*>([\s\S]*?)<\/[A-Z][\w.]*>/g, (_, inner) => `${inner}\n`);
  text = text.replace(/<[^>]+>/g, '');
  text = decodeEntities(text);

  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, (_, alt) => (alt.trim() ? `（圖片：${alt.trim()}）` : ''));

  text = text.replace(/\n[ \t]+/g, '\n').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

  return text.replace(/%%FENCE_(\d+)%%/g, (_, i) => fences[Number(i)] ?? '');
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

function collectBlog() {
  const files = listMarkdown(path.join(root, 'src/content/blog'));
  const entries = [];
  for (const file of files) {
    const id = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    if (isTruthy(meta.draft) || isTruthy(meta.protectedOnly)) continue;
    const url = permalinkFromMeta(meta, id);
    const title = meta.title || id;
    const description = meta.description || '';
    const prose = bodyToProse(body);
    writeDoc(
      `blog/${id}.md`,
      `---
${ragFrontmatter({
  title,
  url,
  type: 'blog',
  topic: meta.topic,
  series: meta.series,
  description,
})}
---

# ${title}

這是站內文章（type: blog），原文路徑：${url}。
${description ? `摘要：${description}` : ''}

${prose}
`,
    );
    entries.push({ title, url, topic: meta.topic, series: meta.series });
  }
  return entries;
}

function projectKind(meta) {
  return meta.type === 'cert' ? 'cert' : 'project';
}

function projectProse(slug, meta, bodyProse) {
  const title = meta.title || slug;
  const kind = projectKind(meta);
  const kindLabel = kind === 'cert' ? '證照' : '作品／專案';
  const aliases = [...new Set([title, ...(PROJECT_ALIASES[slug] ?? [])])];
  const outcomes = listOf(meta, 'outcomes');
  const tech = listOf(meta, 'tech');
  const summary = meta.summary || '';
  const role = meta.role || '';
  const year = meta.year || '';
  const article = meta.link || '';
  const confuse = PROJECT_NOT_CONFUSE[slug] || '';

  const lines = [
    `# ${title}`,
    '',
    `這是 Steven玄 的${kindLabel}（type: ${kind}），詳見 [/projects](/projects#${slug})。`,
    `別名與常見問法：${aliases.join('、')}。`,
  ];
  if (year) lines.push(`年份：${year}。`);
  if (role) lines.push(`角色：${role}。`);
  if (summary) lines.push(`摘要：${summary}`);
  if (outcomes.length) {
    lines.push('', '做了什麼／成果：');
    for (const item of outcomes) lines.push(`- ${item}`);
  }
  if (tech.length) lines.push('', `使用技術：${tech.join('、')}。`);
  if (article) lines.push('', `相關文章：${article}`);
  if (meta.credlyUrl) lines.push(`Credly：${meta.credlyUrl}`);
  if (confuse) lines.push('', confuse);
  if (kind === 'cert') {
    lines.push('', '作品集與證照一律連到 /projects，不要使用 /about/works 或 /about/certifications。');
  }
  if (bodyProse) {
    lines.push('', bodyProse);
  }
  return lines.join('\n');
}

function collectProjects() {
  const files = listMarkdown(path.join(root, 'src/content/projects'));
  const entries = [];
  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const url = `/projects#${slug}`;
    const title = meta.title || slug;
    const kind = projectKind(meta);
    writeDoc(
      `projects/${slug}.md`,
      `---
${ragFrontmatter({
  title,
  url,
  type: kind,
  year: meta.year,
  description: meta.summary,
})}
---

${projectProse(slug, meta, bodyToProse(body))}
`,
    );
    entries.push({
      slug,
      title,
      url,
      kind,
      summary: meta.summary || '',
      role: meta.role || '',
      year: meta.year || '',
      outcomes: listOf(meta, 'outcomes'),
      tech: listOf(meta, 'tech'),
    });
  }
  return entries;
}

function collectSeries() {
  const files = listMarkdown(path.join(root, 'src/content/series'));
  const entries = [];
  for (const file of files) {
    const slug = path.basename(file).replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(file, 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const url = `/series/${slug}`;
    const title = meta.title || slug;
    const description = meta.description || meta.intro || '';
    writeDoc(
      `series/${slug}.md`,
      `---
${ragFrontmatter({
  title,
  url,
  type: 'series',
  topic: meta.topic,
  description,
})}
---

# ${title}

這是站內系列 Hub（type: series），路徑：${url}。
${description ? `說明：${description}` : ''}

${bodyToProse(body)}
`,
    );
    entries.push({ title, url });
  }
  return entries;
}

function writeSiteProfile(projects) {
  writeDoc(
    'about/profile.md',
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
    'about/faq.md',
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

問：作者在哪裡看作品或證照？有哪些作品或證照可以看？
答：一律看 /projects。沒有 /about/works 或 /about/certifications。項目清單見作品目錄，不要用單篇技術文概括職業。

問：怎麼聯絡作者？
答：GitHub https://github.com/steven5j、Facebook https://www.facebook.com/shang.ju.5/、CakeResume https://www.cakeresume.com/stevenjhu5j，或先看 /about。

問：密碼保護的文章能不能講內容？
答：不能。只說明該篇有鎖、請到原頁解鎖；不要複述機密內文。
`,
  );

  const works = projects.filter((p) => p.kind === 'project').map((p) => p.title);
  const certs = projects.filter((p) => p.kind === 'cert').map((p) => p.title);

  writeDoc(
    'projects/index.md',
    `---
title: 作品與證照入口
url: /projects
type: catalog
---

# 作品與證照入口

一律連到 /projects。沒有 /about/works 或 /about/certifications。
問單一專案「做了什麼」時，請檢索 projects/ 下該專案文件，不要只念清單。

作品：${works.join('、')}。
證照：${certs.join('、')}。
`,
  );

  writeDoc(
    'faq/projects.md',
    `---
title: 作品與證照常見問題
url: /projects
type: faq
---

# 作品與證照 FAQ

本檔只回答跨專案／清單／易混淆問題。單一專案細節以 projects/ 下各檔為準。

問：有哪些作品或證照可以看？作品集在哪？
答：一律看 /projects。作品包括：${works.join('、')}。證照包括：${certs.join('、')}。沒有 /about/works 或 /about/certifications。

問：送報件系統升級專案做了什麼？送報件系統改版呢？
答：那是「送報件系統升級改版專案」（約 2021）：壽險送報件整體升級，Cobol 轉 C#／SQL，統一約 20 餘險種規格與流程，上千份報表與上億筆資料流程化；角色是工程師、小組長。不是「送報件資料修正輔助系統」。詳見 /projects 與 projects/report-system-upgrade.md。

問：送報件資料修正輔助系統做了什麼？
答：那是另一個專案：針對既有送報資料做規範化、批量化修正與預覽（千萬筆級），背景雙系統減少盯站；角色是規劃者、小組長。不是整套送報件系統升級改版。詳見 /projects 與 projects/report-data-fix.md。
`,
  );
}

function writeCatalogs(blog, projects, series) {
  writeDoc(
    'catalog/site.md',
    `---
title: 網站內容目錄
url: /
type: catalog
---

# stevenjhu.com 公開內容地圖

作者：Steven玄（Steven J. Hu），男性。詳見 /about 與站內 FAQ。

本檔只做入口導引，不要用它回答單一專案或單篇文章的細節。

- 作品與證照清單：見作品目錄，頁面 /projects
- 系列清單：見系列目錄，頁面 /series
- 文章清單：見文章目錄，頁面 /blog
- 關於作者：/about
`,
  );

  writeDoc(
    'catalog/projects.md',
    `---
title: 作品與證照目錄
url: /projects
type: catalog
---

# 作品與證照目錄

一律連到 /projects。沒有 /about/works 或 /about/certifications。
問單一專案「做了什麼」時，請改查 projects/ 下該專案文件，不要只念這份清單。

${projects
  .map((item) => {
    const tag = item.kind === 'cert' ? '證照' : '作品';
    const extra = item.summary ? `：${item.summary}` : '';
    return `- [${item.title}](/projects)（${tag}${item.year ? `，${item.year}` : ''}）${extra}`;
  })
  .join('\n')}
`,
  );

  writeDoc(
    'catalog/series.md',
    `---
title: 系列目錄
url: /series
type: catalog
---

# 系列目錄

${series.map((item) => `- [${item.title}](${item.url})`).join('\n')}
`,
  );

  writeDoc(
    'catalog/blog.md',
    `---
title: 文章目錄
url: /blog
type: catalog
---

# 文章目錄

本檔只列標題與網址。問某篇內容時請檢索對應 blog 文件，不要用目錄虛構內文。

${blog.map((item) => `- [${item.title}](${item.url})`).join('\n')}
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

function toPosix(rel) {
  return rel.replaceAll('\\', '/');
}

function wranglerJs() {
  return path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
}

function authHint(stderr) {
  if (!/CLOUDFLARE_API_TOKEN|non-interactive|not authenticated|log in/i.test(stderr)) {
    return '';
  }
  return [
    '',
    'Auth required for R2 --remote. In this terminal run:',
    '  npx wrangler login',
    '  npx wrangler whoami',
    'Or set CLOUDFLARE_API_TOKEN (Account → R2 Edit) then retry npm run sync:rag:upload.',
  ].join('\n');
}

function runWrangler(args) {
  return new Promise((resolve, reject) => {
    // Inherit stdin so Wrangler does not treat this as CI/non-interactive
    // (piped stdin blocks OAuth from `wrangler login`).
    const child = spawn(process.execPath, [wranglerJs(), ...args], {
      cwd: root,
      windowsHide: true,
      env: { ...process.env },
      stdio: ['inherit', 'pipe', 'pipe'],
    });
    let stderr = '';
    let stdout = '';
    child.stderr.on('data', (d) => {
      stderr += d.toString();
    });
    child.stdout.on('data', (d) => {
      stdout += d.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

async function assertWranglerAuth() {
  const { code, stdout, stderr } = await runWrangler(['whoami']);
  const text = `${stdout}\n${stderr}`;
  if (code !== 0 || /not authenticated|log in|CLOUDFLARE_API_TOKEN/i.test(text)) {
    throw new Error(
      `Wrangler is not authenticated.${authHint(text) || '\nRun: npx wrangler login'}`,
    );
  }
  const email = text.match(/[^\s]+@[^\s]+/)?.[0];
  console.log(email ? `Wrangler auth OK (${email})` : 'Wrangler auth OK');
}

async function putObject(relPosix) {
  const local = path.join(outDir, relPosix);
  const dest = `${BUCKET}/${relPosix}`;
  const { code, stderr } = await runWrangler([
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
  ]);
  if (code !== 0) {
    throw new Error(`${dest} put failed (${code}): ${stderr.trim()}${authHint(stderr)}`);
  }
}

async function deleteObject(relPosix) {
  const dest = `${BUCKET}/${relPosix}`;
  const { code, stderr } = await runWrangler([
    'r2',
    'object',
    'delete',
    dest,
    '--remote',
    '-y',
  ]);
  // 404 / not found is fine for legacy cleanup
  if (code !== 0) {
    const msg = stderr.trim();
    if (/not found|404|does not exist|NoSuchKey/i.test(msg)) return;
    console.warn(`Warn: delete ${dest} (${code}): ${msg}`);
  }
}

function loadPreviousKeys() {
  if (!fs.existsSync(statePath)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    return Array.isArray(raw?.keys) ? raw.keys.map(toPosix) : [];
  } catch {
    return [];
  }
}

function saveUploadedKeys(keys) {
  fs.writeFileSync(
    statePath,
    `${JSON.stringify({ updatedAt: new Date().toISOString(), keys }, null, 2)}\n`,
    'utf8',
  );
}

async function uploadAll(currentKeys) {
  const concurrency = 4;
  let done = 0;
  let index = 0;
  async function worker() {
    while (index < currentKeys.length) {
      const i = index;
      index += 1;
      await putObject(currentKeys[i]);
      done += 1;
      if (done % 20 === 0 || done === currentKeys.length) {
        console.log(`Uploaded ${done}/${currentKeys.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const previous = loadPreviousKeys();
  const keep = new Set(currentKeys);
  const toDelete = [...new Set([...LEGACY_R2_KEYS, ...previous.filter((k) => !keep.has(k))])];
  if (toDelete.length) {
    console.log(`Deleting ${toDelete.length} obsolete R2 keys ...`);
    for (const key of toDelete) {
      await deleteObject(key);
    }
  }
  saveUploadedKeys(currentKeys);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const blog = collectBlog();
const projects = collectProjects();
const series = collectSeries();
writeSiteProfile(projects);
writeCatalogs(blog, projects, series);

const currentKeys = walkFiles(outDir)
  .map((full) => toPosix(path.relative(outDir, full)))
  .sort();
console.log(
  `Wrote ${currentKeys.length} files to .rag/ (blog ${blog.length}, projects ${projects.length}, series ${series.length}, plus about/faq/catalog)`,
);

if (shouldUpload) {
  await assertWranglerAuth();
  console.log(`Uploading to R2 bucket ${BUCKET} ...`);
  await uploadAll(currentKeys);
  console.log(
    [
      'Upload complete.',
      'Dashboard checklist:',
      '  1) AI Search → stevenjhu-ai-search → enable keyword + vector (hybrid)',
      '  2) Wait for indexing to finish',
      '  3) Pages project → bind ASK_SEARCH (ai_search) to stevenjhu-ai-search if not auto-bound',
      'Golden questions (check source keys, not only answer text):',
      '  - 作者是誰／專長 → about/',
      '  - 有哪些作品或證照 → faq/projects.md 或 projects/index.md',
      '  - 送報件系統升級做了什麼 → projects/report-system-upgrade.md',
      '  - 送報件資料修正做了什麼 → projects/report-data-fix.md',
      '  - 追問「擔任什麼角色？」→ needs conversation messages',
    ].join('\n'),
  );
}
