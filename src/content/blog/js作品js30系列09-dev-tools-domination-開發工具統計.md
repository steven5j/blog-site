---
title: "[JS作品]JS30系列09 &#8211; Dev Tools Domination 開發工具統計"
description: "作品網址： 主題目標 開發工具 Console 的運用說明。介紹 l [&hellip;]"
pubDate: 2020-03-15
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3917.gif
wpId: 3917
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/15/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9709-dev-tools-domination-%e9%96%8b%e7%99%bc%e5%b7%a5%e5%85%b7%e7%b5%b1%e8%a8%88/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_15_20_25_24_21.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/09%20-%20Dev%20Tools%20Domination/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

 開發工具 Console 的運用說明。介紹 log 、 warn 、 error 、 info 、 assert 、 clear 、 dir 、groupCollapsed 、 groupEnd 、 count 、 time 、 timeEnd 等指令運用。 

 

 

需求思考分析

- 依照題目要求 完成相關網頁處理。

 

 

處理步驟

步驟 1.

[console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) 基本運用，利用 `log(string)` 裡面輸出字串。
進階運用是透過字符的替換

- ％s：字串

- ％f：浮點數

- ％o：物件

- ％d：整數

- ％c：設定輸出的樣式，在之後的文字將按照第二個參數里的設置進行顯示

```
`console.log("I am a string: %s ", "log"); //log
console.log("I am a float number: %f ", 1.23); //1.23
console.log("I am a object: %o ", {name:"allen"}); // {name:"allen"}
console.log("I am a int number: %d ", 1); //1
console.log("%c other style", "color: #00fdff; font-size: 2em;");`
```

[![](https://lh3.googleusercontent.com/RdbTaZpW-wy0r6_INOomhBQrtJB0SpOVqjSBmniPZUO8mChY4jYTg5z76AXwKQ2lCT6HyKqnrelxsPXc8x0xfomvvxxRLRCvdPydrCrlQ2H8O_u73_eCh5hiOaeksaZ_zVH3bHslkMbcCnWLh35y282Mw9LaIR2eivWA0DvwHhv8BCm_ZTnzkwmNDyTN8zN2HAdFnIOPTZKCPCyE-MbyqGXfRjDg68-0ndduo3cw9qO5HAk0X7_yoc7eztJi2Nbwazu5zJkwrfHDgp_ps8cX5tDBJVw0LHGScrB9B6JBphq6kk2lpNzcXiWbhrZm-zssyW90B6kJtm0lwv3NGBNcYplD37ZP1lITd6vE7PPgckUWD9l4YjgQBU8aQkWuHJwWgTvfzQzYQJTM-f5C8oocccW3ngsWcs1k-Gnj1mDOiunQuJDdocsi9lTa8nJDOnFT3g6fuYmtUgx9TvPBpcFTl5-C4AMr3tAmXI6MkQ_IoyJicvrxGas-IquV0eFvCgnfOjV0oH6y99hSWvW7-knINLvTqmmbDjO_ws11bgExsrRvQ5v5pbpvknjc3t43ehftJxmbief58Z5cs9lD3BCsdnibkq0TYcnsXy32NGNgbiIvCS5wQpDz6IhetTUMGg-vir9S9_tZLKbD9Ox5CSJXu7ikQSqomhtQ=w348-h183-no)](https://lh3.googleusercontent.com/RdbTaZpW-wy0r6_INOomhBQrtJB0SpOVqjSBmniPZUO8mChY4jYTg5z76AXwKQ2lCT6HyKqnrelxsPXc8x0xfomvvxxRLRCvdPydrCrlQ2H8O_u73_eCh5hiOaeksaZ_zVH3bHslkMbcCnWLh35y282Mw9LaIR2eivWA0DvwHhv8BCm_ZTnzkwmNDyTN8zN2HAdFnIOPTZKCPCyE-MbyqGXfRjDg68-0ndduo3cw9qO5HAk0X7_yoc7eztJi2Nbwazu5zJkwrfHDgp_ps8cX5tDBJVw0LHGScrB9B6JBphq6kk2lpNzcXiWbhrZm-zssyW90B6kJtm0lwv3NGBNcYplD37ZP1lITd6vE7PPgckUWD9l4YjgQBU8aQkWuHJwWgTvfzQzYQJTM-f5C8oocccW3ngsWcs1k-Gnj1mDOiunQuJDdocsi9lTa8nJDOnFT3g6fuYmtUgx9TvPBpcFTl5-C4AMr3tAmXI6MkQ_IoyJicvrxGas-IquV0eFvCgnfOjV0oH6y99hSWvW7-knINLvTqmmbDjO_ws11bgExsrRvQ5v5pbpvknjc3t43ehftJxmbief58Z5cs9lD3BCsdnibkq0TYcnsXy32NGNgbiIvCS5wQpDz6IhetTUMGg-vir9S9_tZLKbD9Ox5CSJXu7ikQSqomhtQ=w348-h183-no)

步驟 2.

各式不同的訊息類型

- [warning](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn) 訊息前出現此符號 

- [Error](https://developer.mozilla.org/en-US/docs/Web/API/Console/error) 訊息前出現此符號 

- [Info](https://developer.mozilla.org/en-US/docs/Web/API/Console/info) 單純只有訊息

步驟 3.

[![](https://lh3.googleusercontent.com/l1WJvLdmnfjG297z3rYc7aErScp3vfUuxp9TbEmwSbC2fQ-tmrvEXzq3r4TqrdZxl3kAxAdJ-ZV_hhUxwFMkovdERhwrmYGJfDSayL0EcdRF6ZCU722---HkXHn8OrYcDSTJ3MHMU1blChpVK_5_KsIY4gu_Sz2jwE0rrY48gWJhrnQ9CaF0IO9AwGYRedLc3JcQMhexbYLPCOH-f-PokZhQMMzM0KhINy2jk-c4znfm4eTHFY8Sw-UnMvnvdWL40g7julFMEZ-IezD8Q6RnWYzuesQSamd_GGAaLd5zKlAR9W5m3A3MoH54vkXlffxs600XO-o9beRFolH4nJLTLPg-i2mdrDlLu6T67QJtG8Oph8S1VNqO8CCpXpDNa7LtAiU88jMkPvukiUWV-Ni-EeTEOj9nTcVx34VPKKGqSapwDUR9NPM8KxmDamaVbTxbPT2w9U4mMcIvswKkY45O-PN2_1hBZr_5e1-8Fi8XIK5XwRBfDy6bLdxQIsJqKMjQy-RwO1aDdUkQVLbod6WhmUXXLrmG1OcSpB6v0oPE1WUEsp-gEchEnHUYy4KN90RCz8zL-l9VBUye_0BoWxOf-WKZZ0SY-S175GpXfYoEbzHo9TwqFcUZWCEXbK7dBBqYS_PiBI0jLcAMLowTZxSdGAVOONe04JcI=w557-h213-no)](https://lh3.googleusercontent.com/l1WJvLdmnfjG297z3rYc7aErScp3vfUuxp9TbEmwSbC2fQ-tmrvEXzq3r4TqrdZxl3kAxAdJ-ZV_hhUxwFMkovdERhwrmYGJfDSayL0EcdRF6ZCU722---HkXHn8OrYcDSTJ3MHMU1blChpVK_5_KsIY4gu_Sz2jwE0rrY48gWJhrnQ9CaF0IO9AwGYRedLc3JcQMhexbYLPCOH-f-PokZhQMMzM0KhINy2jk-c4znfm4eTHFY8Sw-UnMvnvdWL40g7julFMEZ-IezD8Q6RnWYzuesQSamd_GGAaLd5zKlAR9W5m3A3MoH54vkXlffxs600XO-o9beRFolH4nJLTLPg-i2mdrDlLu6T67QJtG8Oph8S1VNqO8CCpXpDNa7LtAiU88jMkPvukiUWV-Ni-EeTEOj9nTcVx34VPKKGqSapwDUR9NPM8KxmDamaVbTxbPT2w9U4mMcIvswKkY45O-PN2_1hBZr_5e1-8Fi8XIK5XwRBfDy6bLdxQIsJqKMjQy-RwO1aDdUkQVLbod6WhmUXXLrmG1OcSpB6v0oPE1WUEsp-gEchEnHUYy4KN90RCz8zL-l9VBUye_0BoWxOf-WKZZ0SY-S175GpXfYoEbzHo9TwqFcUZWCEXbK7dBBqYS_PiBI0jLcAMLowTZxSdGAVOONe04JcI=w557-h213-no)

測試使用的 [assert](https://developer.mozilla.org/en-US/docs/Web/API/console/assert) 與清除 [console](https://developer.mozilla.org/en-US/docs/Web/API/Console) 的方法 [clear](https://developer.mozilla.org/en-US/docs/Web/API/Console/clear)。
使用 chrome 的時候，看一下有沒有設定 Preserve log ，這個選項勾選的話， [clear](https://developer.mozilla.org/en-US/docs/Web/API/Console/clear) 會無法清除 console 喔

查看 DOM 元素，分別使用基本方式 [log()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) 與 [dir()](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)

- [log()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log) 假如是物件的話，會直接輸出物件內容；假如是 DOM 則會輸出 HTML 標籤

- [dir()](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir) 以樹狀結構呈現結果
[](https://lh3.googleusercontent.com/txNg02YwGWecETLELIdw6UvBoHzKirQjppBhDszFfxjc3z6A_VVTcsgECXnfDvr97axUBmsNLp9W_KuUM55mWEjTRIJvHX2oa5uEE15yNs2mXSESLABE__LkjTPFORmzSs-XjTXnuqxzm-LX4pe_1Qh7Y9-dfNRN5H9qVTYK58uuj4bg5DOZwK70-wb-nmd-YEkz2tIHCRrDKZv4sNP8G7q0dOrj8c8J4khZ7Eag_ycad_694l2FSelJVj6Ofvh6QD08VZgHozOk051CuCZ2yCEuNx1p8j6f6heOBaIdM_xAFtmLzlsUjQmZuSvt-nXOBtFlrjxZVYrmn_lbm5hzWh1l-ba09L_LczkJ8rqzBrEU6JlxO1E9d0e1o1CWMIMrSK2CoqlDfT-Xva7OhmPWYxosCQOd7FnRAAGdRtFcq5cYxfzJWHXEzBnYo0ukiIZ3JS59JJ5rtmOhrxkm8uiyQUf6Q9POqr0WrNX78g6TLdLghc2mwv4p8c4diPt0vE-Mx0A0KSt3r7ozpdVivdMrVWPwvOjiH2tkoS1x607wph-1U3fZwQcCq3RcJgCbyMdvF05SI8OHNnTPyKezt_1yx1HvsZC-k1_1UXGiuTxaxTGPxi_kjHDDzfZ0tD5ExmodOHr_-zv7t1Z4NasIFALAb44hGJHSCuyr=w440-h79-no)

步驟 4.

進行分組、統計計算與時間計算等。分別運用 `groupCollapsed` 、 `count` 與 `time`

 

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[console](https://developer.mozilla.org/zh-TW/docs/Web/API/Console)

此篇主題都是 Console 的運用，可以參考 MDN 上的說明來學習。

[Element.classList](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)

`Element.classList` 唯讀屬性代表了該元素所擁有之類別屬性（`Class` [Attribute](https://developer.mozilla.org/en-US/docs/Glossary/Attribute)）的即時更新集－[`DOMTokenList`](https://developer.mozilla.org/zh-TW/docs/Web/API/DOMTokenList)。 

[Console.assert()](https://developer.mozilla.org/en-US/docs/Web/API/console/assert)

測試使用，當判斷的條件式成立，不會有任何反應，當條件式不成立，則會提供錯訊息，然後訊息顯示自訂的訊息部分

```
`console.assert(1===1, 'this is wrong');  
console.assert(1===2, 'this is wrong');  // Assertion failed: this is wrong`
```

[Console.count()](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)

輸出 count() 被調用的次數。此函數接受一個可選參數 label
如果有 label ，此函數輸出為那個指定的 label 和 count()被調用的次數。
如果 label 被忽略，此函數輸出 count() 在其所處位置上被調用的次數。

```
`var user = "";

function greetEmpty() {
  console.count();
}
function greet() {
  console.count(user);
  return "hi " + user;
}
greetEmpty();       // 1
greetEmpty();       // 2
greetEmpty();       // 3
console.count();    // 1

user = "bob";
greet();                // "bob: 1"
user = "alice";
greet();                // "alice: 1"
greet();                // "alice: 2"
console.count("alice"); // "alice: 3"
﻿`
```

[Console.dir()](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)

在控制台中顯示指定JavaScript對象的屬性，並通過類似文件樹樣式的交互列表顯示。

[groupCollapsed()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed) 與 [groupEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)

console .groupCollapsed

在Web控制台上創建一個新的分組.隨後輸出到控制台上的內容都會被添加一個縮進,表示該內容屬於當前分組,直到調用 [console.groupEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd) 之後,當前分組結束。和 console.group() 方法的不同點是,新建的分組默認是折疊的。用戶必須點擊一個按鈕才能將折疊的內容打開.

說明上這兩個方法都是無參數，但是範例中，是可以輸入參數的，輸入的參數則是顯示的分組標題文字。

```
`const dogs = [{ name: "Snickers", age: 2 }, { name: "hugo", age: 8 }];
dogs.forEach(dog => {
  // 此是分組標題
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd();
});
﻿`
```

[time()](https://developer.mozilla.org/en-US/docs/Web/API/Console/time) 與 [timeEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd)

console.time

你可以啟動一個計時器（timer）來跟踪某一個操作的佔用時長。每一個計時器必須擁有唯一的名字，頁面中最多能同時運行 10,000 個計時器。當以此計時器名字為參數調用 [console.timeEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd) 時，瀏覽器將以毫秒為單位，輸出對應計時器所經過的時間.

計算出來的時間以毫秒顯示

 

 

參考資料：

JS30紀錄 09-Dev Tools Domination： [https://shunnien.github.io/2017/12/26/Javascript30days-9/](https://shunnien.github.io/2017/12/26/Javascript30days-9/) 

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
