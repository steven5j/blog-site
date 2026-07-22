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

文章位於 `src/content/blog/`。在 frontmatter 設定 `draft: true` 可於正式建置中隱藏。
