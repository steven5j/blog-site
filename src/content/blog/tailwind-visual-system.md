---
title: Tailwind 定制視覺，而不是套組件庫
description: 用 design tokens 建立品牌感，避開預設 UI kit 的千篇一律。
pubDate: 2026-07-15
tags:
  - 設計
  - Tailwind
---

很多個人站一開始就裝完整元件庫，結果品牌訊號被按鈕樣式蓋過。

## 先定色票與字體

這個站用深夜墨藍底與冷青強調色，顯示字用 Fraunces，內文用 Noto Sans TC。變數集中在 `global.css`，之後改主題不必翻遍元件。

## 第一視口只做一件事

首頁只放品牌、一句定位、一組 CTA，以及一塊全寬氣氛視覺。統計列、行程卡、貼紙徽章一律留給後面區塊——或乾脆不要。

## 動效服務層級

進場用 CSS + IntersectionObserver；需要敘事張力才上 GSAP。`prefers-reduced-motion` 一律提供靜態後備。
