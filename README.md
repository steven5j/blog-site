# Steven JHu — 個人部落格

[stevenjhu.com](https://stevenjhu.com) 的繁體中文個人網站，以 Astro 靜態輸出建構。

## 技術棧

- Astro (static) + TypeScript
- Tailwind CSS（定制 design tokens）
- Markdown / MDX Content Collections
- React islands：GSAP ScrollTrigger、Lottie
- View Transitions
- SEO：sitemap、JSON-LD、`llms.txt`
- 部署：Cloudflare Pages

## 本機開發

需求：Node.js 22（見 `.nvmrc`）

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

輸出目錄：`dist/`

## Cloudflare Pages

| 設定 | 值 |
|------|-----|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` |

使用 Wrangler 做遠端操作前，需先以 Cloudflare 帳號登入（瀏覽器 OAuth，完成後會顯示 `Successfully logged in.`）：

```bash
npx wrangler login
npx wrangler whoami    # 可選：確認目前登入身分
```

未登入時，`pages deploy`、`sync:rag:upload`（R2 `--remote`）、以及 `preview:cf`（`wrangler.toml` 的 AI／AI Search binding 為 `remote = true`）都會失敗。本機 `npm run dev` 不需登入。

部署：

```bash
npx wrangler pages deploy dist
```

`wrangler.toml` 已設定 `pages_build_output_dir = "dist"`。

### 密碼保護內容（Cloudflare Pages Function）

機密內容放在 `protected-content/*.md`，**不會**輸出到 `dist/`。建置時 `scripts/prepare-protected.mjs` 會產生 `functions/_data/manifest.json` 供 API 使用。

文章 frontmatter：

```yaml
protectedSlug: report-data-fix-detail   # 公開文：文末嵌入解鎖區
protectedOnly: true                     # 獨立機密頁：僅顯示密碼門
```

部署時在 Cloudflare Pages 設定環境變數：

| 變數 | 說明 |
|------|------|
| `PROTECTED_POST_PASSWORD` | 解鎖密碼（必填） |
| `PROTECTED_COOKIE_SECRET` | Cookie 簽章用（選填，預設同密碼） |

本機測試解鎖 API：

```bash
cp .dev.vars.example .dev.vars   # 編輯密碼
npm run dev                      # Astro dev，已內建 /api/unlock（讀 .dev.vars）
npx wrangler login               # preview:cf 會打遠端 Workers AI，需先登入
npm run preview:cf               # 完整模擬 Cloudflare Pages（需先 npm install）
```

API：`POST /api/unlock`（`{ slug, password }`）、`GET /api/unlock?slug=...`（檢查 Cookie）。

## 內容

- 文章：`src/content/blog/`（frontmatter：`topic`、`series?`、`pubDate`）
- 系列 Hub：`src/content/series/`
- 專案／證照：`src/content/projects/`
- 單篇 permalink：`/YYYY/MM/DD/{slug}`（`slug` 為 ASCII；舊 WordPress 中文網址經 `_redirects` 301）
- `draft: true` 可於正式建置中隱藏

### 從 WordPress 遷移

```bash
# 預覽前 5 篇對應結果（需 Node 可驗證系統 CA）
npm run migrate:wp:dry

# 匯入全部文章與特色圖片到 public/uploads/wp/
npm run migrate:wp

# 更新 Cloudflare _redirects（build 前也會自動跑）
npm run redirects

# 為非 ASCII 檔名的文章補上 slug: frontmatter（遷移後執行一次）
npm run assign:slugs
```

分類對照見 `scripts/wp-category-map.json`。若本機 TLS 驗證失敗，腳本已使用 `node --use-system-ca`。

## 站內搜尋

公開頁面以 [Pagefind](https://pagefind.app/) 在建置時產生全文索引（`dist/pagefind/`），瀏覽器端搜尋標題與正文。密碼保護內容、草稿、列表頁不會進入索引。

```bash
npm run build          # astro build 之後會自動跑 pagefind
npm run index:search   # 只重建搜尋索引（需已有 dist/）
```

開發時若要試搜尋，先建置一次，`astro dev` 會從 `dist/pagefind/` 提供索引。快捷鍵：`Ctrl/Cmd + K` 或 `/`。

## AI Search（RAG）

公開內容匯出到 `.rag/`（Modular 分區），再上傳至 R2 bucket `stevenjhu-r2` 供 AI Search 索引。上傳為遠端操作，**必須先 `npx wrangler login`**。

```bash
npx wrangler login          # 尚未登入或出現 CLOUDFLARE_API_TOKEN 錯誤時
npx wrangler whoami         # 確認已登入
npm run sync:rag            # 只寫入 .rag/
npm run sync:rag:upload     # 寫入、put，並刪除舊版根目錄 key／上次上傳多餘 key
```

若 upload 仍要求 `CLOUDFLARE_API_TOKEN`，在同一終端機重新 `npx wrangler login`，或到 Cloudflare Dashboard 建立 API Token（需 R2 寫入權限）後設環境變數再跑。

`.rag/` 佈局：

| 路徑 | 用途 |
|------|------|
| `about/` | 作者 profile、站內 FAQ |
| `projects/` | 各作品／證照正文 + `index.md` 短清單 |
| `faq/projects.md` | 跨專案清單與消歧義（不逐項複誦） |
| `catalog/` | 短地圖（site / projects / blog / series） |
| `blog/`、`series/` | 文章與系列 |

略過草稿與密碼保護文章，不會讀取 `protected-content/`。

Ask AI：`POST /api/ask` 優先使用 `[[ai_search]]` binding（`ASK_SEARCH` → `stevenjhu-ai-search`）；若 Pages 尚未套用該繫結，會自動 fallback 到既有的 Workers AI `AI.autorag()`。

此專案 **Bindings 由 `wrangler.toml` 管理**（Dashboard 顯示「透過 wrangler.toml 進行管理」時無法在 UI 新增）。改 binding 後必須 **commit + 重新部署**；部署後到 Settings → Bindings 確認是否出現 `ASK_SEARCH`。若只有 `AI`，Ask AI 仍可經 fallback 運作。

### 黃金評估集

檢入的評估資料集：`eval-golden-questions.json`（約 30 題，JSON 格式）。

涵蓋範圍：
- **身分與關於**：作者是誰、性別、專長、聯絡方式（應從 `about/` 檢索）
- **作品集清單**：有哪些作品或證照（應返回 `faq/` 或 `projects/`，連結 `/projects`）
- **單一專案細節**：送報件系統升級、送報件資料修正、Vitawile、租管、發信 API、Astro 重構
- **易混淆陷阱**：送報件系統升級 vs 送報件資料修正（兩者絕不可混淆；升級是 Cobol→C#，資料修正是輔助工具）
- **證照查詢**：AZ-104、AWS SAA、AZ-900
- **系列與文章**：C# 系列、房地產系列、職涯系列、依賴注入文章
- **低相關性拒絕**：離題問題（天氣、不存在的專案、捏造經歷）應拒絕並建議站內入口
- **對話跟進**：「那這個專案用了什麼技術？」需前文 messages
- **錯字容忍**：「難的還是女的」應理解為「男的還是女的」
- **密碼保護內容**：應拒絕回答並說明需解鎖

每題包含：
- `question`：主要問法（繁體中文）
- `variants`：自然變體與口語問法
- `expectedIntent`：意圖標籤
- `expectedSources`：期望檢索到的 `.rag/` 資料夾或檔案
- `mustInclude` / `mustNotInclude`：答案文字要求（避免捏造、混淆）
- `notes`：驗收重點與陷阱說明

**使用方式**：
1. 測試時依序問每個 `question`（或抽樣變體）
2. 驗證 API 返回的 `sources[].key` 是否符合 `expectedSources`（檢查路徑前綴，不只看答案文案）
3. 檢查答案是否包含 `mustInclude`、不包含 `mustNotInclude`
4. 確認引用連結格式正確（Markdown `[文字](路徑)`，非裸露「來源：」附錄）
5. 低相關性問題應觸發拒絕，並提供站內入口連結（`/`、`/blog`、`/projects`、`/series`、`/about`）

**快速驗收題（看 sources 的 key，不只看答案文案）**：

| 問題 | 期望來源 | 關鍵檢查 |
|------|----------|----------|
| 作者是誰／專長是什麼？ | `about/` | 軟體工程師，不是 AI 專家 |
| 有哪些作品或證照？ | `faq/projects.md` 或 `projects/index.md` | 連結 `/projects`，不是 `/about/works` |
| 送報件系統升級專案做了什麼？ | `projects/report-system-upgrade.md` | Cobol→C#、20 餘險種；不混淆資料修正 |
| 送報件資料修正輔助系統做了什麼？ | `projects/report-data-fix.md` | 千萬筆修正預覽；不混淆系統升級 |
| 追問「擔任什麼角色？」 | 需對話 messages | 應對應前一輪提到的專案 |
| 明天天氣如何？ | 應拒絕 | 找不到站內內容，建議入口連結 |
