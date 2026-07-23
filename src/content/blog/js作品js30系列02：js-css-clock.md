---
title: "[JS作品]JS30系列02：JS + CSS Clock"
description: "作品網址 思考需求分析 1.能抓取時間點。 2.區分時針、分針、秒針。 3.時間數值可以轉換成旋轉的角度。 4 [&hellip;]"
pubDate: 2019-12-01
topic: software
series: javascript
heroImage: /public/uploads/wp/3703.gif
wpId: 3703
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/12/01/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9702%ef%bc%9ajs-css-clock/"
---

![](https://lh3.googleusercontent.com/aDKBAYtl5q_hPvZTVzMW7DeQPVh9LjRnb7tII5_ot1govOuYqW65i0t6PYn8wlSQnYrTVVod_KbKjjhMpkrjAXKB2SFlNNVf97FjVH5b1p8hZFIAcb8bs63eAMvAvgLMbAzsfzwyJ9PCF5RnzNg9B1IBel-NIijZMy5q5qKd6LmLVRhqUQ_khQC3egjcXBxgCdVtfKbDfQfupK5IUejjSXIky8nfSB4e5-LR6bVziPh7L22sDdZXe9I0SMmAtRWlPJ4Azoz2SHkHq0Q0_baxukEkAl0vSaOTNWUTxlyj8miV4zHp3Cj1qjJcZNdVlZrodsWqeS0C6Ac87VFF_08neU86iPscfqKlp73XjM8aPG8OePnkkI557MtEMoBpajM__-RVFqKVMjHaupCDbJJZC9rU7F88kgxH9zOfnWO5gwMdCJegqXmXaRpkBYQcpVKxPkcdzAmDmP94dz2XMWyPRXyRlyyWQwTGZDPGN_U4nA-V3QrNxfQRQgXy0DAX_QkKemBMtllNBYMoxMrFmVuvS9TWtHqxdm31wsformttJ3aa754YgKaM2ksMIQy9MpirvZ4VMhTwz_RIY7SbvWbo3iTdJa7OWJeqrXd3gobuQB7b3DUqspevwLYNFTn4vzdcRrQgEVZIxEROS5DJUc463R8mhu9RRY2ZqcYp7fjRC-GxkFMJW2qTLQ8fjHSxjyVo5MH3nZIVLfFZLscjnXgxlStOHZa0UXmbHwawc4K9k0fnIf-Q=w655-h346-no)

作品網址

[Demo作品連結](https://steven5j.github.io/JavaScript30day/02%20-%20JS%20and%20CSS%20Clock/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

思考需求分析

1.能抓取時間點。

2.區分時針、分針、秒針。

3.時間數值可以轉換成旋轉的角度。

4.每秒都會重新跑一次時間。

5.秒針會有彈跳的動態感覺。

特別技術、函式

<HTML>

<CSS>

[transition(過渡、轉場)](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

transition-property：定義哪些 CSS properties 會被轉場效果影響。除了這些被你特別指出的 property 名單，其他的轉場一如以往的會在瞬間完成。

transition-duration：定義轉場所花費的時間。你可以只定義一個時間給所有 property 使用，也可以給定多組不同時間。 

transition-timing-function：設定轉場時所依據的貝茲曲線。 

transition-delay：定義多久之後開始發生轉場。

<JavaScript>

[JavaScript Date 物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date)

附註： JavaScript Date 物件只能由以 Date 作為建構子來產生，如果把 Date 作為一般的函數來呼叫（省略掉 new 運算子）將會得到一個字串而非 Date 物件；與其它 JavaScript 物件不同，它並沒有物件實體語法（例如：以中刮號 [ ] 表示陣列的宣告方式）。

Date.getHours()：回傳本地時間的小時（0-23）。

Date.getSeconds()：回傳本地時間的秒數（0-59)。

Date.getMinutes()：回傳本地時間的分鐘數（0-59）。

參考資料

Day2 JS + CSS Clock：[https://ithelp.ithome.com.tw/articles/10192498](https://ithelp.ithome.com.tw/articles/10192498)

「JS30紀錄＆心得」02 – JS and CSS Clock：[https://guahsu.io/2017/05/JavaScript30-02-JS-and-CSS-Clock/](https://guahsu.io/2017/05/JavaScript30-02-JS-and-CSS-Clock/)
