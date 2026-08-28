---
title: "[JS作品]JS30系列13 &#8211; Slide in on Scroll 圖片隨屏幕滾動而滑入滑出的效果指南"
description: "作品網址： 主題目標 隨著卷軸移動到中央，讓圖片動態顯示。 需求思考 [&hellip;]"
pubDate: 2020-03-30
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3998.gif
wpId: 3998
slug: js-js30-13-slide-in-on-scroll-3998
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/30/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9713-slide-in-on-scroll-%e5%9c%96%e7%89%87%e9%9a%a8%e5%b1%8f%e5%b9%95%e6%bb%be%e5%8b%95%e8%80%8c%e6%bb%91%e5%85%a5%e6%bb%91%e5%87%ba%e7%9a%84%e6%95%88/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_30_22_16_09_270.gif)

 

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/13%20-%20Slide%20in%20on%20Scroll/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

-  隨著卷軸移動到中央，讓圖片動態顯示。 

 

需求思考分析

- 獲取頁面中的所有圖片元素

- 滾動事件監聽

- 尺寸獲取及處理

- 滾動至指定區域的條件判斷

 

處理步驟

步驟 1.

- 首先取得所有圖片 HTML ，並建立空的 Function checkSlide 與綁定 scroll 捲軸移動事件。

步驟 2.

- 因為 scroll 每次觸發頻率過高，所以呼叫 debounce 來降低呼叫頻率，避免效能損耗

- 針對所有圖片 HTML 進行 foreach 迴圈

- 取得目前畫面所在的高度

- 取得圖片所在的高度

步驟 3.

- 依照上一步驟取得的高度位置，進行判斷，然後添加 active class驗證輸入的字符。

- 此處方法是將每一個輸入的字符存入pressed數組，然後處理數組，使其呈現隊列的性質，也就是輸入一個字符時，會擠出原有的的字符，保證其最大長度始終為secretCode的長度。

- 這樣做的目的是為了便於驗證暗號，只有完整無誤的輸入一次暗號時，才會觸發相應的效果。當然這只是其中一種處理辦法，也還有其他辦法。

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[WindowOrWorkerGlobalScope.clearTimeout()](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowTimers/clearTimeout)

清除 setTimeout 設定。

[window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)

`setTimeout()`方法設置一個定時器，該定時器在定時器到期後執行一個函數或指定的一段代碼。 

[Function.prototype.apply()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

 apply() 方法會呼叫一個以 this 的代表值和一個陣列形式的值組(或是一個 array-like object )為參數的函式。

[throttle() 與debounce()](https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html)

1. 去抖動 debounce

模仿電器開關處理的方法，把多個訊號合併成一個訊號。讓一個函式在連續觸發時只執行一次。一個常見的用法是使用者連續輸入基本資訊後，才觸發事件處理器進行格式確認。

2. 函數節流 throttle

 函數節流讓一個函數不要執行得太頻繁，也就是控制函數最高呼叫頻率，減少一些過快的呼叫來節流。一個常見的用法是減少 scroll 的觸發頻率，因為 scroll 常常綁定一些消耗資源的 render 的事件。 

 

參考資料：

JS30紀錄 13-Slide in on Scroll：  [https://shunnien.github.io/2017/12/31/Javascript30days-13/](https://shunnien.github.io/2017/12/31/Javascript30days-13/) 

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
