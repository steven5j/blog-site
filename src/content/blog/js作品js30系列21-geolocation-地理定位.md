---
title: "[JS作品]JS30系列21 &#8211; Geolocation 地理定位"
description: "主題目標 利用瀏覽器內置Web Geolocation API,將獲取到的地理位置 [&hellip;]"
pubDate: 2020-07-29
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
wpId: 4411
slug: js-js30-21-geolocation-4411
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/07/29/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9721-geolocation-%e5%9c%b0%e7%90%86%e5%ae%9a%e4%bd%8d/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/07/錄製_2020_07_29_00_07_03_320-1024x576.gif)

 

主題目標

利用瀏覽器內置Web Geolocation API,將獲取到的地理位置及相關坐標，與index-start.html中的可視化指南針連接在一起。

備註：由於電腦一般不帶速度及方向傳感器，從結果中可以看到返回值中heading及speed鍵值均為null,為演示可視化效果，代碼中採用手動賦值的方式進行演示。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/21%20-%20Geolocation/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟 1.

取得方向和速度 DOM。

步驟 2.

改變顯示資料，但是因為瀏覽器支援因素，目前電腦的測試 speed 與 heading 皆是 null，因為沒有傳感器。

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[地理位置定位 (Geolocation)](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/Using_geolocation)

Web Apps 若需要使用者的位置，可透過 Geolocation API 取得相關資訊。而基於隱私權的考量，這些 Web Apps 均必須取得使用者的許可之後，才能發佈位置資訊。

[Geolocation.watchPosition()](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/watchPosition)

Geolocation.watchPosition() 這個方法是用來註冊一個處理的函式，當使用者的裝置位置更新時，這個函式所傳入的回呼函式(callback function) 就會自動被呼叫。你也可以選擇性的定義錯誤時哪些錯誤回呼函式(error callback function) 需要被呼叫。

[Coordinates](https://developer.mozilla.org/zh-TW/docs/Web/API/GeolocationCoordinates)

Coordinates 這個介面用來存取裝置的經緯度，速度以及這些數值的準確度。

參考資料：

JS30紀錄 21-Geolocation：[https://shunnien.github.io/2018/01/15/Javascript30days-21/](https://shunnien.github.io/2018/01/15/Javascript30days-21/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)

[ Alex 宅幹嘛 ] ?‍? 深入淺出 Javascript30 快速導覽 | Day 21：Geolocation：[https://youtu.be/Sm-HY8VyaH4](https://youtu.be/Sm-HY8VyaH4)
