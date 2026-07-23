---
title: "[JS作品]JS30系列12 &#8211; Key Sequence Detection 鍵盤輸入序列的驗證指南"
description: "作品網址： 主題目標 要對照 Console 才能觀看，主要是偵測輸入按鍵，一開始 [&hellip;]"
pubDate: 2020-03-29
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3986.gif
wpId: 3986
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/29/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9712-key-sequence-detection-%e9%8d%b5%e7%9b%a4%e8%bc%b8%e5%85%a5%e5%ba%8f%e5%88%97%e7%9a%84%e9%a9%97%e8%ad%89%e6%8c%87%e5%8d%97/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_29_19_54_36_883.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/12%20-%20Key%20Sequence%20Detection/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

- 要對照 Console 才能觀看，主要是偵測輸入按鍵，一開始設定一組密碼，例如: wesbos ，當輸入的內容符合到 wesbos 就顯示提示。

- 初始文檔裡僅僅提供了一個script標籤，供我們從[Cornify.com](https://www.cornify.com/)加載一個JS文件，調用其中的cornify_add()方法時，會在頁面中追加p標籤，並在DOM中插入一個圖標。Cornify的具體效果可以到官網首頁去體驗。

 

 

需求思考分析

- 指定可激發特效的字符串

-  監聽並獲取輸入的字符

-  處理輸入，在符合條件時，調用cornify

 

 

處理步驟

步驟1

聲明一個空數組，用於存放的輸入字符，同時聲明“暗號”

步驟2

- 添加鍵盤的keyup事件監聽，用箭頭函數的參數來接收事件。

- 注意此處的keyup事件是針對頁面的，所以在調試時單擊頁面後時焦點在頁面中才生效，在Console面板中是不會觸發的。

步驟3

- 驗證輸入的字符。

- 此處方法是將每一個輸入的字符存入pressed數組，然後處理數組，使其呈現隊列的性質，也就是輸入一個字符時，會擠出原有的的字符，保證其最大長度始終為secretCode的長度。

- 這樣做的目的是為了便於驗證暗號，只有完整無誤的輸入一次暗號時，才會觸發相應的效果。當然這只是其中一種處理辦法，也還有其他辦法。

 

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Array.prototype.splice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

splice() 方法可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容。

```
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]
months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

```

[Array.prototype.shift()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

shift() 方法會移除並回傳陣列的第一個元素。此方法會改變陣列的長度。

```
const array1 = [1, 2, 3];
const firstElement = array1.shift();
console.log(array1);
// expected output: Array [2, 3]
console.log(firstElement);
// expected output: 1

```

[Array.prototype.join()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

join() 方法會將陣列（或一個類陣列（array-like）物件）中所有的元素連接、合併成一個字串，並回傳此字串。

```
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
// expected output: "Fire,Air,Water"
console.log(elements.join(''));
// expected output: "FireAirWater"
console.log(elements.join('-'));
// expected output: "Fire-Air-Water"

```

 

參考資料：

JS30紀錄 12-Key Sequence Detection： [https://shunnien.github.io/2017/12/30/Javascript30days-12/](https://shunnien.github.io/2017/12/27/Javascript30days-10/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
