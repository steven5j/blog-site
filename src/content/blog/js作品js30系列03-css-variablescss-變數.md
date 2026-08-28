---
title: "[JS作品]JS30系列03 &#8211; CSS Variables(CSS 變數)"
description: "作品網址： ↓每次進去圖片都會不一樣↓ 思考需求分析 1.spacing對應到下方圖片的邊框寬。 [&hellip;]"
pubDate: 2019-12-06
topic: software
series: javascript
wpId: 3718
slug: js-js30-03-css-variablescss-3718
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/12/06/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9703-css-variablescss-%e8%ae%8a%e6%95%b8/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2019/12/錄製_2019_12_05_21_16_39_883-1024x541.gif)

作品網址：

↓每次進去圖片都會不一樣↓

[Demo作品連結](https://steven5j.github.io/JavaScript30day/03%20-%20CSS%20Variables/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

思考需求分析

1.spacing對應到下方圖片的邊框寬。

2. blur 會對應到下方圖片整體的模糊度。

3.color點下去會跳出顏色選擇框，然後可調整顏色。

4.color調整顏色後，標題JS 和圖片外框顏色會變化。

5.當滑鼠移動 spacing 和blur的範圍調整器的時候，下方圖片會監聽這個動作並產生相應的狀態。

特別技術、函式

<HTML>

[<input type=”color”>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/color)：是input元素中的一個特定種類，用來創建一個允許用戶使用顏色選擇器，或輸入兼容CSS語法的顏色代碼的區域。（不支持Alpha通道）此元素的外觀會因瀏覽器不同而不同，可能是簡單的驗證顏色輸入格式的文本框，也可能使用平台原生或自定義樣式的顏色選擇器。

<CSS>

 [CSS 原生變數（Variables）](https://mnya.tw/cc/word/1340.html)：– 宣告變數、var() 呼叫變數

[:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)：代表文檔樹的根元素，在聲明全局CSS變量時很有用。

<JavaScript>

[dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)： 當我們要取得 data-* attribute 的屬性值時，我們可以簡單利用 JavaScript 中的 dataset 物件，就可以取得了 

 [documentElement](https://www.runoob.com/jsref/prop-document-documentelement.html)：屬性以一個元素對象返回一個文檔的文檔元素。 

參考資料

SASS, LESS 退散，原生 CSS 可以使用變數啦！：[https://muki.tw/tech/native-css-variables/](https://muki.tw/tech/native-css-variables/)

CSS3 :root 选择器： [https://www.w3school.com.cn/cssref/selector_root.asp](https://www.w3school.com.cn/cssref/selector_root.asp) 

filter： [https://developer.mozilla.org/en-US/docs/Web/CSS/filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) 

JS 30 – 03 – CSS Variables：[https://ithelp.ithome.com.tw/articles/10202668](https://ithelp.ithome.com.tw/articles/10202668)

[技術分享] 什麼是 HTML 5 中的資料屬性（data-* attribute）： [https://pjchender.blogspot.com/2017/01/html-5-data-attribute.html](https://pjchender.blogspot.com/2017/01/html-5-data-attribute.html)
