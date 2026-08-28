---
title: "[JS作品]JS30系列15 &#8211; LocalStorage"
description: "作品網址： 主題目標 讓使用者可以自行記錄該小吃的項目，並確認是否選 [&hellip;]"
pubDate: 2020-04-03
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4007.gif
wpId: 4007
slug: js-js30-15-localstorage-4007
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/04/03/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9715-localstorage/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/04/錄製_2020_04_03_15_55_28_640.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/15%20-%20LocalStorage/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

-  讓使用者可以自行記錄該小吃的項目，並確認是否選擇，只要使用同電腦同瀏覽器，前一次輸入資料將會保留(不主動清除的話)；此篇主題為使用 LocalStorage ，所以除了看畫面之外，可以搭配 Console 來觀看。

 

 

處理步驟

步驟 1.

- 讓變數讀取 localStorage 的資料，沒有的話給予空陣列

- 設定按鈕事件，並讓事件停止冒泡

- 停止冒泡資訊可參考「[[筆記][JavaScript]所謂的「停止事件」到底是怎麼一回事？](https://ithelp.ithome.com.tw/articles/10198999)」

步驟 2.

- 取得輸入框的輸入值

- 將輸入資料增加到陣列變數

- 將陣列資料回存至 localStorage

步驟 3.

- 使用 JS 來動態增加 html tag ，此處範例直接使用 [Template literals](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals)

- 將方法分解至單筆資料新增的 populateItem function

- 利用 Array.prototype.map() 來完成

步驟 4.

- 進行選單勾選的事件

- 勾選後更新 items 變數與更新 localStorage

特別技術、函式

<HTML>

[在HTML 內容中應用SVG 效果](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Applying_SVG_effects_to_HTML_content)

可縮放向量圖形 (Scalable Vector Graphics，SVG) 是用於描述二維向量圖形的 XML 標記語言。基本上，SVG 用於圖形，而 XHTML 用於文字。
SVG 類似 Adobe 專有的 Flash 技術，SVG 與 Flash 兩者最大的分別在於 SVG 為 W3C 所推薦 (即標準)，並以 XML 為基礎，而非封閉的二進制格式。SVG 設計為與其他 W3C 標準 (如 CSS、DOM 及 SMIL) 一同運作。

[HTML 標籤的for 屬性](https://www.w3school.com.cn/tags/att_label_for.asp)

與<label>元素一起使用時，for屬性指定標籤綁定到的表單元素。

與<output>元素一起使用時，for屬性指定計算結果與計算中使用的元素之間的關係。

<CSS>

<JavaScript>

[Window.localStorage](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)

`localStorage` 這個唯讀屬性允許你讀取 [`Storage`](https://developer.mozilla.org/zh-TW/docs/Web/API/Storage) object for the [`Document`](https://developer.mozilla.org/zh-TW/docs/Web/API/Document)‘s origin; 被儲存的資料被存在 across browser sessions. `localStorage` 跟 [`sessionStorage`](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/sessionStorage)大致上相似，除了儲存在 `localStorage` 內的資料沒有逾期時間外，當頁面session結束時，存在 `sessionStorage` 內的資料就會被清空 — 也就是當頁面被關閉的時候。

資料暫存在瀏覽器上，並且不會自動刪除，除非自行清除瀏覽資料；使用無痕瀏覽的話，關閉視窗等於清除掉。

[Document.createElement()](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/createElement)

於 HTML 文件中，Document.createElement() 方法可以依指定的標籤名稱（tagName）建立 HTML 元素，或是在未定義標籤名稱下建立一個 HTMLUnknownElement。在 XUL 文件中，Document.createElement() 將會建立指定的 XUL 元素。而在其它文件，則會建立一個 namespace URI 為 null 的元素。

[event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

Event接口的preventDefault()方法，告訴user agent：如果此事件沒有被顯式處理，它默認的動作也不應該照常執行。此事件還是繼續傳播，除非碰到事件偵聽器調用stopPropagation()或stopImmediatePropagation()，才停止傳播。

可以參考了解[[筆記][JavaScript]所謂的「停止事件」到底是怎麼一回事？](https://ithelp.ithome.com.tw/articles/10198999)

[Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。

```
const array1 = [1, 4, 9, 16];
// pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// expected output: Array [2, 8, 18, 32]

```

參考資料：

JS30紀錄 15-LocalStorage：  [https://shunnien.github.io/2018/01/04/Javascript30days-15/](https://shunnien.github.io/2018/01/04/Javascript30days-15/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
