---
title: JavsScript-發送HTTP請求 XMLHttpRequest
description: "XMLHttpRequest (XHR)，是最常見的 JavaScript HTTP Client，支援IE， [&hellip;]"
pubDate: 2020-12-20
topic: software
series: javascript
heroImage: /public/uploads/wp/4933.jpg
wpId: 4933
slug: javsscript-xmlhttprequest-http-4933
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/20/javsscript-xmlhttprequest-%e7%99%bc%e9%80%81-http-%e8%ab%8b%e6%b1%82/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/XMLHttpRequest-1024x576.jpg)

XMLHttpRequest (XHR)，是最常見的 JavaScript HTTP Client，支援IE，擷取資料的同時，卻 不需 進行 頁面重載 (page reload)！對於理解 其他 API的方式、舊系統體系的網頁開發、維護舊系統 皆能有所幫助。

使用目標

以 XMLHttpRequest (XHR) 對 [https://steven5j.github.io/Blog/Data/Godzilla_Monster.json](https://steven5j.github.io/Blog/Data/Godzilla_Monster.json)，
送出 GET 請求，回應的 影像 URI，添加至頁面

一、實例物件

```
var xhr = new XMLHttpRequest();
```

可使用XMLHttpRequest.readyState() 特性的數值用以判斷目前讀取資料的狀態。

值狀態說明

0UNSENT客戶端已被建立，但 open() 方法尚未被呼叫。

1OPENEDopen() 方法已被呼叫。

2HEADERS_RECEIVEDsend() 方法已被呼叫，而且可取得 header 與狀態。

3LOADING回應資料下載中，此時 responseText 會擁有部分資料。

4DONE完成下載操作。

二、設定請求

```
/*
 * {string} 請求方法 (method)
 * {string} 目標 url
 * {boolean} 非同步 [async] -- 可選
 * {string} 使用者 [user] -- 可選
 * {string} 密碼 [password] -- 可選
 */
xhr.open("GET", "網址");
```

使用 XMLHttpRequest.open()，設定請求，

請求方法(method) ：一般是GET，除此之外還有POST、PUT、DELETE、HEAD、OPTIONS..等，詳細可查看->[HTTP 請求方法](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods)

非同步/異步(async)：預設是 true 非同步，詳細可查看->[簡單理解 JavaScript Async 和 Await](http://oxxostudio.tw/articles/201908/js-async-await.html)

※可使用 setRequestHeader() 方法，設置請求訊息的表頭欄位

三、監聽事件

使用 非同步，需監聽 XMLHttpRequest.onload()事件，

讓 回應完成時 能執行相對應的函式 — 回調函式 (callback):

```
// 非同步取得回應
xhr.onload = function () {
    .............
    ...處理回應...
    .............
    ............
    .............
};
```

※監聽事件：onload以外，也有如 load、onerror、onprogress 等，詳細查看->[XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest)

四、發送請求

XMLHttpRequest.send ()方法中的參數，是請求訊息的 酬載 (payload) 內容，
預設使用的 GET 方法，不得 送出 酬載，因此設為空值:

```
xhr.send(null);
```

五、處理回應

在 onload 事件內做處理回應的函式，

- (1)判斷HTTP 連線是否正常 

- (2)判斷收到的文本格式。

(1)判斷[HTTP連線狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)

XMLHttpRequest.status() 判斷HTTP狀態碼

- 資訊回應 (Informational responses, 100–199),

- 成功回應 (Successful responses, 200–299),

- 重定向 (Redirects, 300–399),

- 用戶端錯誤 (Client errors, 400–499),

- 伺服器端錯誤 (Server errors, 500–599).

```
	console.log("HTTP連線狀態碼:" + xhr.status);
            if( 200 <= xhr.status && xhr.status <= 299){ // (成功回應)
                document.write("HTTP連線狀態碼:" + xhr.status);
                // 使用簡易的 正規表達式，判斷媒體類型
                if (type.match(/^application\/json/)) {
                    handler = new Handler(jsonHandler, JSON.parse(xhr.responseText));
                } else if (type.match(/^application\/xml/)) {
                    handler = new Handler(textHandler, xhr.responseXML);
                } else {
                    handler = new Handler(textHandler, xhr.responseText);
                }
            }
            else if (300 <= xhr.status && xhr.status <= 399){ // (重定向)
                 document.write("HTTP連線狀態碼:" + xhr.status);
                 document.location.href("https://wordpress-1652732-6572997.cloudwaysapps.com/");
            }
            else if (400 <= xhr.status && xhr.status <= 499){ //用戶端錯誤
                document.write("HTTP連線狀態碼:" + xhr.status);
            }
            else if (500 <= xhr.status && xhr.status <= 599){ //用戶端錯誤
                document.write("HTTP連線狀態碼:" + xhr.status);
            }
```

(2)判斷[收到的文本格式](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader)

XMLHttpRequest.getResponseHeader() 函式取得回應的資料型態，也就是下面程式提到的”Content-Type”

回應 Text，透過 XMLHttpRequest.responseText 屬性，
回應 XML 或 XHTML，則使用 XMLHttpRequest.responseXML 屬性，
回應 JSON，則可以使用 JSON.parse() 方法，解析 XMLHttpRequest.responseText 屬性

```
            // 取得回應的 Content-Type 表頭欄位
            // 以決定如何處理回應
            var type = xhr.getResponseHeader("Content-Type");

            // 建構元 (strategy, response)
            var handler;

            // 使用簡易的 正規表達式，判斷媒體類型
            if (type.match(/^application\/json/)) {
                handler = new Handler(jsonHandler, JSON.parse(xhr.responseText));
            } else if (type.match(/^application\/xml/)) {
                handler = new Handler(textHandler, xhr.responseXML);
            } else {
                handler = new Handler(textHandler, xhr.responseText);
            }

            handler.handleResponse();
```

六、輸出結果

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

步驟回顧

1.實例物件，建立一個 XMLHttpRequest 物件
2.設定請求，open() 方法 傳送到伺服器要資料
3.監聽事件，設定onload 或其他監聽事件，回傳資料到自己的瀏覽器時的監聽事件。
4.發送請求，send() 方法送出資料。
5.處理回應，在 onload 事件內做處理回應的函式，(1)status()方法判斷HTTP 連線狀態碼是否正常 (2)getResponseHeader()判斷收到的文本格式。
6.輸出結果

POST、PUT..等HTTP連線請求

將 請求方法 換成 POST，並於 send() 方法 置入資料酬載(payload)。如果沒有資料的話，也可以直接使用POST。

伺服器端(Sever端)要設定POST連線方式，在前端(Client端)才可以用POST方法讀取。

```
xhr.open("POST", "網址");
```

```
xhr.send(資料酬載);
```

使用其他 HTTP 請求方法 (e.g., PUT、DELETE、HEAD、OPTIONS) 也是一樣，
但必須注意，該方法是否允許發送 資料酬載(payload)。

範例網址目錄

[Demo範例](https://steven5j.github.io/Blog/JavsScript-發送HTTP請求 XMLHttpRequest/)

[範例目錄](https://github.com/steven5j/Blog/tree/main/JavsScript-%E7%99%BC%E9%80%81HTTP%E8%AB%8B%E6%B1%82%20XMLHttpRequest)

[JavaScript學習筆記目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-%e9%96%8b%e7%99%bc%e7%b3%bb%e5%88%97/)

參考資料：

AJAX JavaScript 與 jQuery 教學範例 for PHP[https://www.footmark.info/programming-language/php/ajax-javascript-jquery-example-php/](https://www.footmark.info/programming-language/php/ajax-javascript-jquery-example-php/)

AJAX與Fetch API：[https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html)

AJAX簡介：[https://www.w3schools.com/xml/ajax_intro.asp](https://www.w3schools.com/xml/ajax_intro.asp)

XMLHttpRequest — JavaScript 發送 HTTP 請求 (I)：[https://notfalse.net/29/xmlhttprequest](https://notfalse.net/29/xmlhttprequest)

XMLHttpRequest：[https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest)

JavaScript 初心者筆記: AJAX – 從遠端即時撈取資料：[https://ithelp.ithome.com.tw/articles/10222165](https://ithelp.ithome.com.tw/articles/10222165)
