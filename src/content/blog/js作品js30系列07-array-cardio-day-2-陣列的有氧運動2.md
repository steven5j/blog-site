---
title: "[JS作品]JS30系列07 :  Array Cardio Day 2 陣列的有氧運動2"
description: "作品網址： 主題目標 提出幾個陣列的題目，用提示的函式把答案呈現出來 [&hellip;]"
pubDate: 2020-03-09
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3892.jpg
wpId: 3892
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/09/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9707-array-cardio-day-2-%e9%99%a3%e5%88%97%e7%9a%84%e6%9c%89%e6%b0%a7%e9%81%8b%e5%8b%952/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/small6-1.jpg)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/07%20-%20Array%20Cardio%20Day%202/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

提出幾個陣列的題目，用提示的函式把答案呈現出來。

 

 

需求思考分析

- people 題目 -> some()函式處理people是否有19歲以上的人 && every() 函式處理 People是否每個人都19歲以上

- comments題目 -> find() 中找到id是823423的資料 &&  findIndex() & slice() & spared 找到id是823423的資料索引值, 並透過索引值刪除這筆資料

 

 

處理步驟

步驟 1.

 操作 people 陣列，利用 some 與 every 檢查是否符合大於等於 19 歲的元素。

步驟 2.

操作 comment 陣列, find 類似 filter ，只是 find 只會回傳一個找尋到的元素。
 而 findIndex 會回傳找到元素的索引。

步驟 3.

針對 comment 刪除指定元素，因為此次指定使用 slice ，不然可以採用 splice 更好處理。
建立一個新陣列
 利用 slice 取出陣列
 利用 … 語法糖連結陣列

 

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Array.prototype.some() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some)：some() 方法會透過給定函式、測試陣列中是否至少有一個元素，通過該函式所實作的測試。這方法回傳的是布林值。

用來判斷是否有元素符合所設定的條件

只會回傳 true 或 false

[Array.prototype.every() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/every)：every() 方法會測試陣列中的所有元素是否都通過了由給定之函式所實作的測試。

陣列中的所有元素，都必須符合設定的條件

全部符合條件回傳 true ，只要有一元素不符合就回傳 false

[Array.prototype.find() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find)：find() 方法會回傳第一個滿足所提供之測試函式的元素值。否則回傳 undefined。

[Array.prototype.findIndex() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)：findIndex() 方法將依據提供的測試函式，尋找陣列中符合的元素，並返回其 index（索引）。如果沒有符合的對象，將返回 -1 。

[Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) ：方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。

[Array.prototype.splice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)：splice() 方法可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容。

 

 

 

 

參考資料：

JS30紀錄 07-Array Cardio：[https://shunnien.github.io/2017/12/21/Javascript30days-7/](https://shunnien.github.io/2017/12/21/Javascript30days-7/)
