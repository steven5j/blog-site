---
title: JavaScript-發送HTTP請求 XMLHttpRequest  jQuery方式 AJAX
description: "繼上一篇 [JavaScript-發送HTTP請求 XMLHttpRequest] 延續，這一篇是主要紀錄使用 [&hellip;]"
pubDate: 2020-12-23
topic: software
series: javascript
heroImage: /public/uploads/wp/5334.jpg
wpId: 5334
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/23/javascript-%e7%99%bc%e9%80%81http%e8%ab%8b%e6%b1%82-xmlhttprequest-jquery%e6%96%b9%e5%bc%8f-ajax/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/jQuery方式-AJAX-1024x576.jpg)

繼上一篇 [[JavaScript-發送HTTP請求 XMLHttpRequest]](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/20/javsscript-xmlhttprequest-%e7%99%bc%e9%80%81-http-%e8%ab%8b%e6%b1%82/) 延續，這一篇是主要紀錄使用jQuery Ajax方式去發送HTTP請求。

將使用到的幾項技術

[JavaScript(ES6) – Promise](https://wcc723.github.io/development/2020/02/16/all-new-promise/)✅

[jQuery – Deferred Object](https://ithelp.ithome.com.tw/articles/10090605)✅

使用目標

以jQuery AJAX方式，呼叫[https://steven5j.github.io/Blog/Data/Godzilla_Monster.json](https://steven5j.github.io/Blog/Data/Godzilla_Monster.json)，
送出 GET 請求，回應的 影像 URI，添加至頁面

Get請求方式

一、使用jQuery.get()

$.get(url, [data])方法，參 網址URI，

◦url參數，傳送請求的URL地址
◦[data]參數，要傳送給伺服器的資料(如沒有就空)
其後伴隨著 done() 方法，設置回應後載入成功時的回調函式 (callback) 

```
    // jQuery.get 方法 回傳實作 Promise 的 jQuery XMLHttpRequest 物件
    $.get("網址URL")
```

※「$」是 jQuery 全域函式的捷徑符號

※jQuery AJAX就是把 XMLHttpRequest (XHR) 再包一層 !並處理許多麻煩的事情 (e.g., 請求生命週期、回應解析)。

二、使用jQuery的Deferred 物件

JavaScript(ES6) 的 [Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises) 在 jQuery 中的實作者即 [Deferred 物件 (Deferred Object)](https://api.jquery.com/category/deferred-object/)

![](https://cdn.rawgit.com/Vectaio/a76330b025baf9bcdf07cb46e5a9ef9e/raw/26c4213a93dee1c39611dcd0ec12625811b20a26/js-promise.svg)

方法鏈

標準的 Promise 共有三種狀態 :

- pending：等待中，為初始之狀態，即不是 fulfilled 也不是 rejected。

- fulfilled：已完成，表示操作完成，又稱 resolved。

- rejected：已拒絕，表示操作失敗。

- … (請參考 [官方文件](https://api.jquery.com/category/deferred-object/))

※穩定 (settled) 代表：Promise 只會 完成(fulfilled) 或 拒絕(rejected) 一次，且不會再改變。

※了解使用Promise 可參考 ：[使用 Promise – MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)

jQuery 常用的 Deferred 物件:

done(x) — 當 jQuery.XMLHttpRequest狀態為 Resolved 才執行 x，並回傳新的 Resovled jQuery.XMLHttpRequest。
fail(x) — 當 jQuery.XMLHttpRequest 狀態為 Rejected 才執行 x，並回傳新的 Rejected jQuery.XMLHttpRequest。
always(x) — 總是執行 x，並回傳新的 Resovled jQuery.XMLHttpRequest。

```
    $.get("https://steven5j.github.io/Blog/Data/Godzilla_Monster.json")
            .done(res => {
                jsonHandler(res) ;console.log("success!");
            })
            .fail(function(){console.error("error")})
            .always(function(){console.log("Finish!")});
```

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

![](https://lh3.googleusercontent.com/pw/ACtC-3eNalPNV-wrQYGCYXyozDNPwClcADlXm-aR0ljZHT9vD7cX-ovfDF7LPyI7m7aeaBwLyEdRjtdoU-pPGgSgWmfUSXgKdaA8HlvlG0SVYGW9ZkBVg68IjQXDhNVRdjLHWj9oypLT8rDNjXT-CEFP5WXSDQ=w1920-h902-no?authuser=0)

POST 請求方式

$.post()方法，第一個參數放置的是 目標 URI，第二個參數放欲發送的 資料酬載 (payload)：

※使用 W3schools網站來學習與嘗試使用。

```
$.post("demo_test_post.asp", {name: "Steven", city: "Taipei"})
    .done(function (data) {
        console.log("success");
        document.body.innerHTML = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      	console.log(jqXHR);
    	console.log(textStatus);
        console.error(errorThrown);
    })
    .always(function () {
        console.log("finished");
    });
```

※fail()的部分可傳入三個參數。

可至 [W3schools](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_ajax_post) 嘗試。

AJAX() 方法

jQuery.Get() 或 jQuery.post()..等 快捷方法中，都是呼叫jQuery.ajax()方法

```
$.ajax({
url: "url", 		//請求的url地址
contentType: "application/json", //返回格式為 dataType: "json", 	
async: true,	 	//請求是否非同步，預設為非同步，這也是ajax重要特性
data: JSON.stringify({ id : "value" }), //引數值
method: "PUT"		//請求方式  type: "PUT", 
})
  .done(function (data, textStatus, jqXHR) {
        console.log("success");
        console.log(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    })
    .always(function () {
        console.log("finished");
    });
```

※使用 jQuery 1.9.0 以前的版本，需將 method 以 type 屬性替換，

※可參閱 [官方文件](https://api.jquery.com/jQuery.ajax/)。

範例網址目錄

[Demo範例](https://steven5j.github.io/Blog/JavaScript-%E7%99%BC%E9%80%81HTTP%E8%AB%8B%E6%B1%82%20XMLHttpRequest%20%20jQuery%E6%96%B9%E5%BC%8F%20AJAX/jquery_get.html)

[GitHub目錄](https://github.com/steven5j/Blog/tree/main/JavaScript-%E7%99%BC%E9%80%81HTTP%E8%AB%8B%E6%B1%82%20XMLHttpRequest%20%20jQuery%E6%96%B9%E5%BC%8F%20AJAX)

[JavaScript學習筆記目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-%e9%96%8b%e7%99%bc%e7%b3%bb%e5%88%97/)

參考引用資料：

jQuery Ajax — JavaScript 發送 HTTP 請求 (II)：[https://notfalse.net/30/jquery-ajax](https://notfalse.net/30/jquery-ajax)

Category: Deferred Object：[https://api.jquery.com/category/deferred-object/](https://api.jquery.com/category/deferred-object/)

談談jQuery Ajax用法詳解：[https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/272853/](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/272853/)
