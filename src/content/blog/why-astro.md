---
title: 為什麼選擇 Astro 做個人站
description: 靜態優先、islands 按需載入，剛好適合內容站與少數動畫頁。
pubDate: 2026-07-10
topic: software
series: architecture
tags:
  - Astro
  - 架構
---

個人網站最怕兩件事：載入慢，以及為了少數互動把整站變成 SPA。

## 靜態輸出為預設

Astro 預設產出 HTML，文章頁幾乎零 JS。對 SEO、首屏、Hosting 成本都友善，部署到 Cloudflare Pages 也很直接。

## Islands 守住互動邊界

旗艦頁需要 GSAP、首頁想放 Lottie 時，才用 React island 局部 hydrate。其餘版面維持 Astro 元件即可。

## 內容用 Collection 管

Markdown frontmatter 加上 Zod schema，列表與草稿過濾變得可預期。之後若要加 RSS 或搜尋索引，資料來源也一致。

> 少即是多：動畫集中在少數頁，閱讀體驗反而更乾淨。
