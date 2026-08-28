---
title: "[JS作品]JS30系列06 :  Type Ahead 關鍵字建議提示訊息"
description: "作品網址： 主題目標 製作一個關鍵字建議提示訊息的功能 需求思考分析 [&hellip;]"
pubDate: 2020-03-08
topic: software
series: javascript
heroImage: /public/uploads/wp/3839.gif
wpId: 3839
slug: js-js30-06-type-ahead-3839
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/08/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9706-type-ahead-%e9%97%9c%e9%8d%b5%e5%ad%97%e5%bb%ba%e8%ad%b0%e6%8f%90%e7%a4%ba%e8%a8%8a%e6%81%af/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_08_11_22_26_295.gif)

作品網址： 

[Demo作品連結](https://steven5j.github.io/JavaScript30day/06%20-%20Type%20Ahead/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

製作一個關鍵字建議提示訊息的功能

需求思考分析

- 抓取城市和洲的資料

- 每次key文字的時候會有顯示關鍵字的街道或城市出來

處理步驟

步驟 1

 使用 Fetch 取得 json
 將 json 資料存入 cities Array

步驟 2.

 建立 function displayMatches
 關鍵字輸入框綁定 change 與 keyup 事件

步驟 3. 

function displayMatches 中，透過 filter 篩選 cities
 然後在其中利用 RegExp 來尋找 city 與 state 的屬性中含有關鍵字的資料

步驟 4.

將上一步驟篩選結束的陣列進行 map 尋覽，利用文字範本組合 html 內容
 map 後的結果使用 join 來結合
 放入 .suggestions 建議資料列表中 

步驟 5.

將關鍵字強調顯示，並將數字使用逗號分隔；修改上一步驟中文字範本的組合 html 內容。
利用 RegExp 與 replace 來針對關鍵字強調
 同上述的方式，針對 population 數字進行格式化

特別技術、函式

<HTML>

<CSS>

[list-style](https://developer.mozilla.org/zh-TW/docs/Web/CSS/list-style)：列表的樣式設定。CSS list-style 屬性是設置 list-style-type, list-style-image 和 list-style-position 的簡寫屬性。

<JavaScript>

[ Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)[ ](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)：提供了一個能獲取包含跨網路資源在的資源介面。它有點像我們所熟悉的 XMLHttpRequest ，但這個新的 API 提供了更強更彈性的功能。

[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)：提供了工具使操作 http pipeline 更加容易, 像是日常會用到的發送和接送資料都可以使用。並且有 global 的 fetch() 可以直接呼叫, 使開發能夠用更簡潔的語法取得非同步資料。

[RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)：RegExp 建構函數創建了一個正則表達式物件，用於將文本與一個模式匹配。
 有關正則表達式的介紹，請閱讀 JavaScript 指南中的[正則表達式章節][4]

[Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)：正規表達式是被用來匹配字串中字元組合的模式。在 JavaScript 中，正規表達式也是物件，這些模式在 [RegExp][3] 的 [exec][5] 和 [test][6] 方法中，以及 String 的 [match][7]、[replace][8]、[search][9]、[split][10] 等方法中被運用。這一章節將解說 JavaScript 中的正規表達式。

[String.prototype.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)：當一個字符串與一個正則表達式匹配時， match()方法檢索匹配項。

[String.prototype.replace()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/replace)：replace() 方法會傳回一個新字串，此新字串是透過將原字串與 pattern 比對，以 replacement 取代吻合處而生成。pattern 可以是字串或 RegExp，而 replacement 可以是字串或函式（會在每一次匹配時被呼叫）。
 [replace()](https://www.w3school.com.cn/jsref/jsref_replace.asp) 方法用於在字符串中用一些字符替換另一些字符，或替換一個與正則表達式匹配的子串。

[Body.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)：The json() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON.

[join() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/join)：會將陣列（或一個類陣列（array-like）物件）中所有的元素連接、合併成一個字串，並回傳此字串。

 

完整程式碼

 

JS30紀錄 06-Type Ahead： [https://shunnien.github.io/2017/12/19/Javascript30days-6/](https://shunnien.github.io/2017/12/19/Javascript30days-6/) 

正規表達式： [https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)
