---
title: "[JS作品]JS30系列04：Array Cardio Day 1 陣列的有氧運動"
description: "作品網址 需求思考分析 各陣列函式回傳值不同，reduce回傳是一個 [&hellip;]"
pubDate: 2019-12-22
topic: software
series: javascript
heroImage: /public/uploads/wp/3729.gif
wpId: 3729
slug: js-js30-04-array-cardio-day-1-3729
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/12/22/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9704%ef%bc%9aarray-cardio-day-1-%e9%99%a3%e5%88%97%e7%9a%84%e6%9c%89%e6%b0%a7%e9%81%8b%e5%8b%95/"
---

![](https://lh3.googleusercontent.com/Ii8Gss77-Xo4beGSKdiw2jOFuCcdi-rQcr8AjTFT5vVHhnXEEpE17hqXMOWTQIbT7-HDsjzJA_GopJsblEPglnvL-tXjdXDm8EiuZJx0XNEwdkwqoFvMzMfCOYSbk7qDu6eb_uMxwqdyLdkojOYA4NAs_kb2e2uvFbbRuk9J-RK1SgVoE-GtTUAxCBiidogRC-YEiLNOqeNcFwgcJElLAdgdGOX9BheRsPAfhICL089sVosQqKUs6Mohp29zVQg9uSe9RF_Cb7G6uj6YKup2XQCY0-2-rg6rTUq_lSv7V_VVMsxEaja5bpWxkMMqDLfxWieimsmBTAJQWRHVA0mteT0F4S95NXZWgcIpoWpLK9CEXZoCU_HhnaA6LsH53ZB3ZRN3b1Sa_NMvdUtqPGXRa13DqqwJ6Y1WsKAQI1o9T2G8kEgUowHe4O2pQZrG62PlaJNd8cFoc_ai6mZMVyAGwlhC1UBs7H5ypYWhmoaQjGlw4H5jcPjTRy6NfRadJEAZq7Pj3qqgeY6xSFK15xs35pE5RSgz1Sc4Wt3GRDYwBie6MHBw-JQ0m4BWtqrmTVbo6mJ8OFM5EM2chcjz_91I46mfowNqdUGhxZdpNoSs9YKNeqhpaBDHwvn7tQhvv9boBRYj7a0mx2RVlyDbt7_2VwXV44_Iu41sEhC0sUmscy7KL64qRHtTd4AocPOa2MdZsJ5yyCagITdIN3YIfRLmdG1Ki-2NpoSVXNxiQ1E4wCw2To7v=w907-h427-no)

作品網址 

[Demo作品連結](https://steven5j.github.io/JavaScript30day/04%20-%20Array%20Cardio%20Day%201/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

需求思考分析

-  各陣列函式回傳值不同，reduce回傳是一個值，filter、map、sort是回傳陣列。

特別技術、函式

<HTML>

 

<CSS>

 

 

<JavaScript>

[Array.filter()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)：方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列。白話的說就是他會把陣列過濾，留下我要的，並做成一個新陣列!

[Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)： 會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。 白話說就是建立一個新陣列，將一個一個陣列數值陸續讀出。

[Array.prototype.sort()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)：會依照給的內容，兩兩比對，接著排序，預設是根據字串的 Unicode 碼排序，要注意的是sort()不會回傳一個新陣列，而是直接修改原陣列。白話說就是會直接修改原陣列做排序動作。

`arr.sort([compareFunction])`
compareFunction(a, b) < 0
回傳值小於0，b的index高於a，a在b前面
 compareFunction(a, b) = 0
回傳值等於0，a, b位置不變 
 compareFunction(a, b) > 0
回傳值大於0，b的index低於a，b在a前面 

上面這塊很重要，是由這樣衍生出來的

[Array.prototype.reduce()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)： 將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。 

reduce(function(){})會有2個參數： callback 函式和 initialValue

callback函式

callback函式會有4個引入值

accumulator、currentValue、currentIndex、array

initialValue則是設定accumulator的初始值

[String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)：使用指定的分隔符字符串將一個String對象分割成子字符串數組，以一個指定的分割字串來決定每個拆分的位置。

 

參考資料：

JS 30 – 04 – Array Cardio Part I： [https://ithelp.ithome.com.tw/articles/10202734](https://ithelp.ithome.com.tw/articles/10202734) 

「JS30紀錄＆心得」04 – Array Cardio Day 1： [https://guahsu.io/2017/05/JavaScript30-04-Array-Cardio-Day-1/](https://guahsu.io/2017/05/JavaScript30-04-Array-Cardio-Day-1/)
