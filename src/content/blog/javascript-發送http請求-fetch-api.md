---
title: JavaScript-發送HTTP請求 Fetch API
description: "繼上一篇 [JavaScript-發送HTTP請求 XMLHttpRequest jQuery方式 AJAX] [&hellip;]"
pubDate: 2020-12-27
topic: software
series: javascript
heroImage: /public/uploads/wp/5396.jpg
wpId: 5396
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/27/javascript-%e7%99%bc%e9%80%81http%e8%ab%8b%e6%b1%82-fetch-api/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/JavaScript-發送HTTP請求-Fetch-API-1024x576.jpg)

繼上一篇 [[JavaScript-發送HTTP請求 XMLHttpRequest jQuery方式 AJAX]](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/23/javascript-%e7%99%bc%e9%80%81http%e8%ab%8b%e6%b1%82-xmlhttprequest-jquery%e6%96%b9%e5%bc%8f-ajax/) 延續，這一篇是主要紀錄使用Fetch API方式去發送HTTP請求。

使用目標

以Fetch方式，呼叫[https://steven5j.github.io/Blog/Data/Godzilla_Monster.json](https://steven5j.github.io/Blog/Data/Godzilla_Monster.json)，
送出 GET 請求，回應的 影像 URI，添加至頁面

Polyfill

Fetch API 是標準的 Web API，一般來說能夠直接使用。

但是因為是新項目技術不一定每個遊覽器都有支援，所以可以使用 自動補完函式庫 (polyfill) 解決

```
<head>
    
</head>
```

※自動補完函式庫 (polyfill)：

基本使用

fetch()的語法結構完全是Promise的語法：

```
fetch('網址', {method: 'get'})
.then(function(response) {
    //處理 response
}).catch(function(err) {
    // Error :(
})
```

fetch 會使用 ES6 的 Promise 作回應
then 作為下一步
catch 作為錯誤回應 (404, 500…)
回傳的為 ReadableStream 物件，需要使用不同資料類型使用對應方法，才能正確取得資料物件。

Get請求方式

一、呼叫全域的 fetch

呼叫全域的 fetch 方法，參數放置的是 目標 URI :

```
    fetch('https://steven5j.github.io/Blog/Data/Godzilla_Monster.json')
```

※還有其他實例方式 — — 可選參數、多載函式…，[全域Fetch-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

※預設為GET 的連線方式

二、回傳Promise，解析後使用then

fetch() 函式會回傳一個 Promise，並在解析/完成 (resolve) 後，回傳 Response 物件，

因此能直接以 .then(onFulfilled, onRejected) 串接解析 完成 或 拒絕 的回調函式，
且能使用 Response 的物件 提供的 json() 方法，將回應解析為 JSON 物件 !

```
    fetch('https://steven5j.github.io/Blog/Data/Godzilla_Monster.json', {method: 'get'})
    .then(function (res) {
        console.log(res);
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        jsonHandler(data);
    });
```

建立處理狀態的funtion

```
    function processStatus(response) {
    // 狀態 "0" 是處理本地檔案 (例如Cordova/Phonegap等等)
    if (response.status === 200 || response.status === 0) {
        console.log(response.status);
        document.write("HTTP連線狀態碼:" + response.status);
        return Promise.resolve(response)
    } else {
        console.log(response.status);
        document.write("HTTP連線狀態碼:" + response.status);
        return Promise.reject(new Error(response.statusText))
    }
    }
```

處理狀態的程序加進，並將回應包裝為不同的Promise

先用另一個處理狀態碼的函式，使用Promise.resolve與Promise.reject將回應的情況包裝為回傳不同狀態的Promise物件，然後再下個then和catch方法再處理:

```
    fetch('https://steven5j.github.io/Blog/Data/Godzilla_Monster.json', {method: 'get'})
    .then(processStatus)
    .then(function (res) {
        console.log(res);
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        jsonHandler(data);
    })
    .catch(function(err) {
        console.log(err);
    // Error :(
    });
```

※當出現連線錯誤的時候，會跳到Catch

三、輸出結果

看原本預計要怎麼輸出，可以使用簡單的方式，這裡就很簡單的載入圖片的方式。

```
        // 簡易處理 JSON 回應處理 輸出格式
        function jsonHandler(response) {
        let data = response.results;
        // 建立緩衝的文件片段 docFrag
        let docFrag = document.createDocumentFragment();
        for (var i = 0, l = data.length; i < l; i++) {
            var url = data[i].url;
            var img = document.createElement("img");
            img.src = url;
            img.width = 300;
            // 將 img 添加至 docFrag
            docFrag.appendChild(img);
        }
        // 將含有多個 img 的 docFrag
        // 一次新增至 HTML 的 body 中
        document.body.appendChild(docFrag);
    }
```

![](https://lh3.googleusercontent.com/pw/ACtC-3epRKnmLq4yZ0gqPgAgICrQU8m8BU1JzuvnWW07K8it-0YHW-ler-l18u_O21tsAGwaAumXWTqVFavxPiuqxubwErAJMy4Ja6dLMOvdEZTC6AKZmDjaI2paf0fK635h0Vxeqq_T9Dds0OEOIwQimPDcBQ=w1920-h900-no?authuser=0)

Post請求方法

headers屬性：設置表頭
body屬性：將欲送出編碼後的資料酬載 置於訊息主體 (Message Body) 中

以下簡單的Post請求方法範例

```
let url = '網址';
fetch(url, {
  method: 'POST',
  // headers 加入 json 格式
  headers: {
    'Content-Type': 'application/json'
  },
  // body 將 json 轉純字串送出
  body: JSON.stringify({
    email: 'aaaaa@school.com',
    password: '12345678'
  })
}).then((response) => {
    return response.json(); 
  }).then((jsonData) => {
    console.log(jsonData);
  }).catch((err) => {
    console.log('錯誤:', err);
})
```

※body 所送出的資料必須先轉純字串後才能送出

關注點分離(Separation of Concerns)

Fetch API 擁有良好的 關注點分離 (Separation of Concerns, SOC)

Fetch相關介面說明

fetch的核心由GlobalFetch、Request、Response與Headers四個介面(物件)與一個Body(Mixin混合)。概略的內容說明如下:

- [GlobalFetch](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch): 提供全域的fetch方法

- [Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) ：要求，其中包含method、url、headers、context、body等等屬性與clone方法

- [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)：回應，其中包含headers、ok、status、statusText、type、body等等屬性與clone方法

- [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers): 執行Request與Response中所包含的headers的各種動作，例如取回、增加、移除、檢查等等。設計這個介面的原因有一部份是為了安全性。

- [Body](https://developer.mozilla.org/zh-CN/docs/Web/API/Body) ：同時在Request與Response中均有實作，裡面有包含主體內容的資料，是一種ReadableStream(可讀取串流)的物件

與XHR有很大的明顯不同，每個XHR物件都是一個獨立的物件，麻煩的是每次作不同的Request(要求)或要處理不同的Response(回應)時，就得再重新實體化一個新的XHR物件，然後再設定一次。而fetch中則是可以明確地設定不同的Request(要求)或Response(回應)物件，提供了更多細部設定的彈性，而且這些設定過的物件都可以重覆再使用。Request(要求)物件可以直接作為fetch方法的傳入參數，例如下面的這個範例:

※可參考[網址](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html#fetch%E7%9B%B8%E9%97%9C%E4%BB%8B%E9%9D%A2%E8%AA%AA%E6%98%8E)

↓建立Request物件範例

```
const req = new Request(URL, {method: 'GET', cache: 'reload'})

fetch(req).then(function(response) {
  //處理 response
}).catch(function(err) {
    // Error :(
})
```

可以用原有的Request(要求)物件，當作其他要新增的Request(要求)物件的基本樣版，像下面範例中的新的postReq即是把原有的req物件的method改為’POST’而已

```
const postReq = new Request(req, {method: 'POST'})
```

範例網址目錄

[Demo範例](https://steven5j.github.io/Blog/JavaScript-發送HTTP請求 Fetch API/Fetch_Get.html)

[GitHub目錄](https://github.com/steven5j/Blog/tree/main/JavaScript-發送HTTP請求 Fetch API)

[JavaScript學習筆記目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-%e9%96%8b%e7%99%bc%e7%b3%bb%e5%88%97/)

參考引用資料：

Fetch API — JavaScript 發送 HTTP 請求 (III)：[https://notfalse.net/31/fetch-api](https://notfalse.net/31/fetch-api)

AJAX與Fetch API：[https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html)

Fetch API：[https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)

JavaScript Fetch API Tutorial：[https://www.freecodecamp.org/news/javascript-fetch-api-tutorial-with-js-fetch-post-and-header-examples/](https://www.freecodecamp.org/news/javascript-fetch-api-tutorial-with-js-fetch-post-and-header-examples/)

鐵人賽：ES6 原生 Fetch 遠端資料方法：[https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/](https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/)
