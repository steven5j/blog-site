---
title: "[JavaScript]Date 物件"
description: "Date 物件為複雜類型之一，僅限於「時間」用途，仍為常用物件，Date 物件能夠表示 1970/01/01 [&hellip;]"
pubDate: 2021-04-21
topic: software
series: javascript
heroImage: /public/uploads/wp/6074.jpg
wpId: 6074
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/21/javascriptdate-%e7%89%a9%e4%bb%b6/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/JavaScriptDate-物件-1024x576.jpg)

Date 物件為複雜類型之一，僅限於「時間」用途，仍為常用物件，Date 物件能夠表示 1970/01/01 子夜前後 1 億天之內的任何日期與時間（1970/01/01 是電腦常用的一個參考點，被稱為「紀元（Epoch）」或者「UNIX 時間戳記（UNIX Epoch）」）。
參考 MSDN Date 物件：[https://msdn.microsoft.com/zh-tw/library/cd9w2te4(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/cd9w2te4(v=vs.94).aspx)

建立 Date 物件

var　變數名稱　=　new：建立運算子　Date()
使用 new 運算子建立物件，產生目前的日期與時間（當 JavaScript 執行於客戶端，是以客戶端機器時間為主）。

```
var today = new Date();
```

建立特定日期和時間有三種方式：

1. 使用原子日期值

new Date( year, month, day, hour, minute, second, milliseconds )：年、月、日、時、分、秒、毫秒的原子值

- 年：XXXX [4 位數]

- 月：0-11 [1 或 2 位數]

- 日：1-31 [1 或 2 位數]，可選值，預設為 1

- 小時：0-23 [24 小時制]，可選值，未提供值將被設為 00:00:00:（0 毫秒），代表子夜

```
var someday = new Date(2015, 11, 15, 13, 30);
```

可單獨提供年、月、日，日期值可有可無，預設為 1，時間值可選，如果指定就可用來設定當天時間。

2. 使用時間戳記

new Date( milliseconds )：時間戳記 ─ UNIX時間戳記前後的秒數或毫秒數

```
var someday = new Date(86400000 * 10);
```

從 UNIX 時間戳記開始的毫秒數，由於一天有 86400000 毫秒，可用乘天數方式計算

3. 使用字串

new Date( ‘date string’ )：時間字串，如 July 5,2012

```
var someday = new Date('03/01/2015 13:30');
```

字串需為正式的 RFC822/IETF 格式有：
[ July 5,2012 ] [ Jul 5,2012 ] [ 5 July 2012 ] [ 07/05/2012 ] [ 07/05/2012 13:30 ] [ Thu, 05 Jul 2012 13:30:00 GMT-0500 ]
若語法不正確，得到結果會是無效日期或 UNIX 時間戳記（取決於瀏覽器）參考 w3.org RFC822：[https://www.w3.org/Protocols/rfc822/](https://www.w3.org/Protocols/rfc822/)

```
var today = new Date();

var day1 = new Date(2015, 0, 3);
var day2 = new Date(2015, 11, 15, 13, 30);

var day3 = new Date(86400000 * 10);
var day4 = new Date(86400000 * 16425);

var day5 = new Date('03/01/2015 13:30');
var day6 = new Date('Janurary 3,2015');
var day7 = new Date('Mon, 16 May 2016 13:30:00 GMT-0800');
```

抓取 Date 方法

建立 Date 物件之後可以採多種方法「讀取日期和時間」，回應值皆為數字：

- .getFullYear()： 返回年份[4 位數]

- .getMonth()： 返回月份[0-11]

- .getDate()： 返回日期[1-31]

- .getDay()： 返回星期[0-6]

- .getHours()： 返回小時[0-23]

- .getMinutes()： 返回分鐘[0-59]

- .getSeconds()： 返回秒數[0-59]

- .getMilliseconds()： 返回毫秒數[0-999]

- .getTime()： 返回時間（UNIX 時間戳記算起的毫秒數）

可簡寫為 `var getTodayTime = (new Date()).getTime;`

```
var today = new Date();
today.getFullYear();
today.getMonth();
today.getDate();
today.getDay();
today.getHours();
today.getMinutes();
today.getSeconds();
today.getMilliseconds();
today.getTime();
```

輸出字串格式

名稱中帶有「local」的方法按照環境中地區的設定（Locale），回傳格式化的日期和時間。
地區設定是語言、國家和習慣的組合，此一組合影響日期的寫法和數值的格式等，大部分使用者地區設定的特徵由電腦決定，其他特徵則取決於不同瀏覽器。
以下方法返回不同日期和時間格式的字串：

- .toString()： 傳回日期時間的字串值，字串格式取決於地區設定

- .toDateString()： 傳回日期的字串值，字串格式取決於地區設定

- .toTimeString()： 傳回時間的字串值，字串格式取決於地區設定

- .toLocaleString()： 傳回的日期時間字串值，配合主機環境目前的地區設定或指定的地區設定（Locale）

- .toLocaleDateString()： 傳回的日期字串值，配合主機環境目前的地區設定或指定的地區設定（Locale）

- .toLocaleTimeString()： 傳回的時間字串值，配合主機環境目前的地區設定或指定的地區設定（Locale）

- .toGMTString()： 傳回使用格林威治標準時間（GMT）轉換為字串的日期（此方法不再使用）

- .toISOString()： 傳回日期的 ISO 格式字串值

- .toJSON()： 由 JSON.stringify 方法用來轉換物件的資料，以便進行 JavaScript 物件標記法（JSON）序列化

這些方法並非適用所有瀏覽器，像是 `.toISOString()` 和 `.toJSON()` 這兩個是 ECMAScript5 新推出的方法，建議採用：

```
if(today.toJSON){
  //當瀏覽器支援方可使用
}else{
  //不支援時，使用其他方法
}
```

```
var today = new Date();
today.toString();             //與 Date() 預設一樣
today.toDateString();
today.toTimeString();
today.toLocaleString();
today.toLocaleDateString();
today.toLocaleTimeString();
today.toGMTString();
today.toISOString();
today.toJSON();
```

使用時區（UTC）

某些情況下（例如設定拍賣時間）最好使用「中立」的日期時間──在所有客戶端保持一致的日期時間，避免時區不同會造成時間錯誤的狀況，此時會使用標準時區 UTC（Coordinated Universal Time，通用世界時間），和 GMT（Greenwich Mean Time，格林威治時間）相同時區，但目前 UTC 比 GMT 更常使用。

有兩種方式可以建立 UTC：

1. 採用與 UTC 對應的時間戳記

例如拍賣網內容來自資料庫，資料庫資訊使用 UTC，該伺服器便可提供 UTC 時間戳記給 JavaScript，只要 JavaScript 在發送給客戶端之前由伺服端技術（PHP）處理過就有效。

```
var ending = new Date(<?php echo $timestamp; ?>);
```

2. 採用字串格式建立日期與時間

此法也可指定時區，擷取本地日期和時間，從原來的 UTC 時間調整為使用者時區的時間。

```
var ending = new Date('05 Jul 2012 13:30:00 UTC');
```

```
var ending = new Date('01 Jul 2020 13:30:00 UTC');
ending.toString();                  //將標準時間轉成當地時間
```

也可反向從本地端日期時間求得等同於 UTC 的時間：

- .toUTCString()： 傳回利用全球定位時間（UTC）轉換為字串的日期

- .getUTCFullYear()： 利用全球定位時間（UTC）取得年份[4 位數]

- .getUTCMonth()： 使用全球定位時間（UTC）取得月份[0-11]

- .getUTCDate()： 利用全球定位時間（UTC）取得日期[0-11]

- .getUTCDay()： 利用全球定位時間（UTC）取得當週的日次[0-6]

- .getUTCHours()： 使用全球定位時間（UTC）取得小時[0-23]

- .getUTCMinutes()： 使用全球定位時間（UTC）取得分鐘[0-59]

- .getUTCSeconds()： 使用全球定位時間（UTC）取得秒數[0-59]

- .getUTCMilliseconds()： 使用全球定位時間（UTC）取得毫秒數[0-999]

- .getTimezoneOffset()： 取得本機電腦時間與全球定位時間（UTC）之間的分鐘差

```
var today = new Date();
today.toUTCString();
today.getUTCFullYear();
today.getUTCMonth();
today.getUTCDate();
today.getUTCDay();
today.getUTCHours();
today.getUTCMinutes();
today.getUTCSeconds();
today.getUTCMilliseconds();
today.getTimezoneOffset();      //依照台灣 +0800 時區，與標準時區相差 8 小時
```

更改日期

修改 Date 物件表示時間，適用於日期的運算組合，有多種方法可以利用：

- .setFullYear( 值 )： 利用本地時間設定年份[4 位數]

- .setMonth( 值 )： 利用本地時間設定月份[0-11]

- .setDate( 值 )： 利用本地時間設定日期[1-31]

- .setHours( 值 )： 利用本地時間設定小時[0-23]

- .setMinutes( 值 )： 利用本地時間設定分鐘[0-59]

- .setSeconds( 值 )： 利用本地時間設定秒數[0-59]

- .setMilliseconds( 值 )： 利用本地時間設定毫秒數[0-999]

- .setTime( 值 )： 設定 Date 物件中的時間（UNIX 時間戳記算起的毫秒數）

- .setUTCFullYear( 值 )： 使用全球定位時間（UTC）設定年份[4 位數]

- .setUTCMonth( 值 )： 使用全球定位時間（UTC）設定月份[0-11]

- .setUTCDate( 值 )： 使用全球定位時間（UTC）設定日期[1-31]

- .setUTCHours( 值 )： 使用全球定位時間（UTC）設定小時[0-23]

- .setUTCMinutes( 值 )： 使用全球定位時間（UTC）設定分鐘[0-59]

- .setUTCSeconds( 值 )： 使用全球定位時間（UTC）設定秒數[0-59]

- .setUTCMilliseconds( 值 )： 利用全球定位時間（UTC）設定毫秒數[0-999]

```
var date = new Date(2000, 0, 1, 00, 00);
date.setFullYear(2015);
date.setMonth(4, 10);
date.setDate(20);
date.setHours(20);
date.setMinutes(20)
date.setSeconds(35,825);
date.setMilliseconds(192);
date.setTime(1332403882588);

var date2 = new Date(2000, 0, 1, 00, 00);
date2.setUTCFullYear(2015);
date2.setUTCMonth(4, 10);
date2.setUTCDate(20);
date2.setUTCHours(20);
date2.setUTCMinutes(20);
date2.setUTCSeconds(35,825);
date2.setUTCMilliseconds(192);
```

日期運算

雖然日期沒有乘除運算，但在 JavaScript 裡可以加減運算，有三種方法：

- 時間戳記計算：計算兩個日期或時間之間的間隔

- 使用 set…() 和 get…()：從一個日期加上或減去某段日期或時間

- 計算時間間隔：計算從兩個日期之間所花費的時間

※如果只計算間隔（分鐘、小時、日、年），可用 2.，若較為複雜的日期，1. 較為適用

1. 時間戳記計算

有兩種方法抓取時間戳記，再進行計算：

- 先建立 Date 物件，取得 .getTime() 的時間戳記

- 利用 .now 函數直接取得現在的時間戳記

.now() 是 ECMASript5 出現的新功能，等同於 Date 物件的 .getTime() 方法，但卻是直接來自 Date 物件本身，如想在舊版瀏覽器使用：

```
if(Date.now){
    var now = Date.now();
}else{
    var now = (new Date()).getTime();
}
```

例如計算兩週後的日期時間，時間戳記應為 1000（毫秒）*60（秒）*60（分）*24（時）*14（天）：

```
if(Date.now){
    var now = Date.now();
}else{
    var now = (new Date()).getTime();
}
var interval = 1000*60*60*24*14;        //兩週的時間戳記
var twoWeeks = now + interval;          //兩週後的時間戳記
(new Date(twoWeeks));                   //轉成字串
```

2. 使用 set…() 和 get…()

透過 get…() 先取得日期／時間，再由 set..() 為日期／時間加上或減去某個時間間隔，慣用語法如下：

```
var oneday = new Date();
oneday.setDate(oneday.getDate() + 7);           //將目前日期設為一週（7 天）之後
oneday.setHours(oneday.getHours() + 6);         //將目前時間設為 6 小時之後
oneday.setFullYear(oneday.getFullYear() - 1);   //將目前年份設為前 1 年
```

3. 計算時間間隔

若想求取兩個日期之間的時間間隔（例如拍賣時間減去目前時間的「剩餘時間」），可用日期 1 減日期 2，結果以毫秒表示，不管哪個物件較大，始終為正數。

```
var dayUnit = 1000 * 60 * 60 * 24;                    //以毫秒作時間單位
var now = new Date();
var someday = new Date('4/6/2015 1:00');

//1. 看現在時間與某天時間還要大或小，要為正數，所以大要減小
if(now > someday){
  var period = Math.round((now - someday)/dayUnit);
}else{
  var period = Math.round((someday - now)/dayUnit);
}

//2. 利用 Math 物件的絕對值
var period2 = Math.abs(Math.round((someday - now)/dayUnit));
```

參考或引用資料：

Date 物件：[http://test.domojyun.net/MEMO/JavaScript/3_date.html](http://test.domojyun.net/MEMO/JavaScript/3_date.html)

本文整理內容參考《[JavaScript 設計與開發 透視新技術關鍵+完全實力養成](http://www.drmaster.com.tw/Bookinfo.asp?BookID=PG21344)》此書，純屬個人學習整理分享，非商業用途
本書作者：[LarryUllman](http://www.larryullman.com/)

以上內容純屬個人學習整理分享，學術使用，非商業用途，如有任何侵權 ，請告知，立即刪除。
