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

亦可使用 Wrangler：

```bash
npx wrangler pages deploy dist
```

`wrangler.toml` 已設定 `pages_build_output_dir = "dist"`。

## 內容

- 文章：`src/content/blog/`（frontmatter：`topic`、`series?`、`pubDate`）
- 系列 Hub：`src/content/series/`
- 專案／證照：`src/content/projects/`
- 單篇 permalink：`/YYYY/MM/DD/{slug}`（與舊 WordPress 日期網址對齊）
- `draft: true` 可於正式建置中隱藏

### 從 WordPress 遷移

```bash
# 預覽前 5 篇對應結果（需 Node 可驗證系統 CA）
npm run migrate:wp:dry

# 匯入全部文章與特色圖片到 public/uploads/wp/
npm run migrate:wp

# 更新 Cloudflare _redirects（build 前也會自動跑）
npm run redirects
```

分類對照見 `scripts/wp-category-map.json`。若本機 TLS 驗證失敗，腳本已使用 `node --use-system-ca`。
