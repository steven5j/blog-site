---
title: "[JS作品]JS30系列01：JavaScript Drum Kit監聽按鍵事件及撥放音效"
description: "JS30系列：監聽按鍵事件及撥放音效 作品網址 需求思考分析 瀏覽器能夠辨認使用者在鍵盤上所按下的按鍵 當鍵盤 [&hellip;]"
pubDate: 2019-11-22
topic: software
series: javascript
heroImage: /public/uploads/wp/3689.gif
wpId: 3689
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/11/22/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9701%ef%bc%9ajavascript-drum-kit%e7%9b%a3%e8%81%bd%e6%8c%89%e9%8d%b5%e4%ba%8b%e4%bb%b6%e5%8f%8a%e6%92%a5%e6%94%be%e9%9f%b3%e6%95%88/"
---

![](https://lh3.googleusercontent.com/mEXaSzKWU0v4st1dF2998Mlx-8BzI7_mX6gNFNN8nMWuIpYZm4Nm8HzV1CIRi4YkA4xg8Fod3-XD_o12dS1HG3kqvVfkDNDYOE9KbrGB_Ck1uGPLGpTTqUF7FQnb8-HuwO7lY9W_zdRSb8luzUaEaPFbD21bECx_bYwE_yNhSpR6-JEVliunszHrbmv8L5q55BZN_lcyrJurb9qoT0_BfoAsRJdmseNSTHb_iqN2yfL5wbdU4MwHaT3WCeNaYQ4eFC5DC3Mqs62Wkkx-oUyKNFskIBtJ7sljWaA3JnTCk4DV-eE49HcoibUXxRP12Wa807f7C69OI2koWwVMtYHH1C_00qV2Z9q9wPDagC3NFpSJu4UFy8SSpIkw4ViBugBmJmkyMj7ztzYo8GrXi06xZpsMUvAEncWWJ0bTowU6NdGEifx4Xi9u4Z8eYqQFfNR0xp5ftTJldRJFN0IdXcYMytI6BONNy-7SBl_N4IXW_ugK5tBxp-2BdqaI7lpiIl4rAbzB8HI1dWrtLBUycBaH0bhvtkRiz1O2Ff5nJBRcNRN9meT3mBTZvAnOG1r4Nx8lSmgC9AuY4cxWez9cdcm2oTR586B4CN0Xij98EIoee9ckSoJI95uI726prUzaoR7wrQ0xYuyA4Af5wrK9RZT4UfCxT1IJQ1H4R0Xnczcvu9aeZRciGL0BjPmH9Tw7sgo2km6K57wtldpr57H_0Gclg2XdrAIS5igCiFqnWmvqj6YmGwzH=w705-h377-no)

JS30系列：監聽按鍵事件及撥放音效

作品網址

[Demo作品連結](https://steven5j.github.io/JavaScript30day/01%20-%20JavaScript%20Drum%20Kit/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

需求思考分析

- 瀏覽器能夠辨認使用者在鍵盤上所按下的按鍵

- 當鍵盤按下指定的按鍵後能夠觸發音效

- 當鍵盤按下指定的按鍵後能夠觸發網頁上的元件產生動畫

- 網頁上元件的變化要能夠回覆成原本的狀態

- 播放的音效撥放完會停止

特別技術、函式

<HTML>

[data-* attribute](https://www.w3schools.com/tags/att_data-.asp)：有時我們會需要使用到某些自定義的屬性，但是為了要避免大家在 HTML 中隨意的添加屬性，於是在 HTML5 中就多了 data-* attribte 這個屬性，其中的 * 就是一個可以自定義的名稱。

 [<kbd> </kbd> ](https://www.w3schools.com/tags/tag_kbd.asp)：短語標籤。它定義鍵盤輸入​​。

<CSS>

<JavaScript>

 JS Arrays(陣列、數組)：

[Array.from()](https://www.oxxostudio.tw/articles/201908/js-array.html#array_from)：會將「類陣列物件」或是「可迭代的物件」轉換成陣列，

[Array. forEach()](https://www.oxxostudio.tw/articles/201908/js-array.html#array_foreach)：會將陣列中每個元素套用到指定的函式裡進行運算。

JS Objects：

 [Properties(屬性)](https://www.w3schools.com/js/js_object_properties.asp) ： Properties 是JavaScript  Objects 關聯的值。

[propertyName](https://www.w3schools.com/jsref/event_transition_propertyName.asp)：當transitionEvent發生時，propertyName屬性返回與該 transition (過渡)關聯的CSS屬性的名稱。

JS Event：

[KeyboardEvent.keyCode](https://developer.mozilla.org/zh-TW/docs/Web/API/KeyboardEvent/keyCode)：keycode是指當鍵盤下時產生鍵盤的對應值。

查詢鍵盤值keyCode： [https://keycode.info/](https://keycode.info/) 

參考資料：

 JavaScript Array 陣列操作方法大全 ( 含 ES6 ) ： [https://www.oxxostudio.tw/articles/201908/js-array.html](https://www.oxxostudio.tw/articles/201908/js-array.html) 

WESBOS：[wesbos.com](http://wesbos.com)

該來理解 JavaScript 的原型鍊了： [https://blog.techbridge.cc/2017/04/22/javascript-prototype/](https://blog.techbridge.cc/2017/04/22/javascript-prototype/) 

[筆記] JS30系列：監聽按鍵事件及撥放音效（Day1）：[https://pjchender.blogspot.com/2017/01/js30day1.html](https://pjchender.blogspot.com/2017/01/js30day1.html)
