---
title: "[JS作品]JS30系列19-Webcam Fun"
description: "這一關的挑戰，應該會是難度最高的，看了很多線上其他挑戰者的筆記分享，也都是說這關相較於其他關比較 [&hellip;]"
pubDate: 2020-07-26
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
wpId: 4370
slug: js-js30-19-webcam-fun-4370
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/07/26/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9719-webcam-fun/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3dg6YAySQeh1gxierHvWG_DPGQi9L-Nv5KKgK12B7OdjFxuVIjXDNdcxzXD82cMDZIPgE546rFWsyeYa3OTnTgfpafX3VyIa0bsrHOd6NWXWlQrhdqEKlWGfWgncOfbij46u1RE7u7fqIybNhHqkf1zVA=w1605-h903-no?authuser=0)

這一關的挑戰，應該會是難度最高的，看了很多線上其他挑戰者的筆記分享，也都是說這關相較於其他關比較難一點，如果沒有其他跳戰者的筆記，這關真的會比較沒辦法靠自己看破通關^_^

看了一些網路上的文章教學，但是還是不是很熟悉，也看得不是很懂，最後是看[[ Alex 宅幹嘛 ] ?‍? 深入淺出 Javascript30 快速導覽 | Day 19：Webcam Fun](https://youtu.be/1oOxMR_LPb0) 的youtube影片，才知道並熟悉一步一步製作完成。???

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/19%20-%20Webcam%20Fun/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

在index-start.html中提供了一個名為Take Photo的按鈕，該按鈕的點擊事件會觸發takePhoto()函數，並提供了一組標有RGBmin/max標記的range類型input元素，一個canvas元素，一個video元素，以及帶有strip類名的空div元素。
本次的編程任務：
1.通過編寫javascript代碼，請求調用用戶的網絡攝像頭;
2.在頁面上展示來自webcam的數據流信息;
3.並允許用戶保存展示的照片;
4.及使用滑塊來改變圖像的色彩。

 

處理步驟

步驟 1.

申請調用WebCam

步驟 2.

添加畫面與色彩分離功能

步驟 3.

拍照截圖按鍵觸發功能

步驟 4.

添加紅色濾鏡功能

步驟 5.

綠幕功能效果

特別技術、函式

<HTML>

[HTMLMediaElement.srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)：

srcObject 屬性HTMLMediaElement設置或返回用作與關聯的媒體源的對象。

<CSS>

<JavaScript>

[Navigator.mediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/mediaDevices)：

mediaDevices是Navigator只讀屬性，返回一個MediaDevices對象，該對象可提供對相機和麥克風等媒體輸入設備的連接訪問，也包括屏幕共享。

[MediaDevices.getUserMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)：

會提示用戶給予使用媒體輸入的許可，媒體輸入會產生一個MediaStream，裡麵包含了請求的媒體類型的軌道。此流可以包含一個視頻軌道（來自硬件或者虛擬視頻源，比如相機、視頻採集設備和屏幕共享服務等等）、一個音頻軌道（同樣來自硬件或虛擬音頻源，比如麥克風、A/D轉換器等等），也可能是其它軌道類型。

[URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)：

靜態方法 URL.createObjectURL() 用於建立一個帶有URL的 DOMString 以代表參數中所傳入的物件. 該URL的生命週期與創造它的window中的 document一致. 這個新的物件URL 代表了所指定的 File 物件 或是 Blob 物件.

[canplay](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event)(可播放事件)：

canplay當用戶代理可以播放媒體時會觸發該事件。

[CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)：

Canvas 2D API 的方法提供了將圖像繪製到畫布上的不同方法。

[CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)：

返回一個ImageData對象，用來描述canvas區域隱含的像素數據，這個區域通過矩形表示，起始點為(sx, sy)、寬為sw、高為sh。

[CanvasRenderingContext2D.putImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData)：

是Canvas 2D API將數據從已有的 ImageData對象繪製到位圖的方法。如果提供了一個繪製過的矩形，則只繪製該矩形的像素。此方法不受畫布轉換矩陣的影響。

[Node.insertBefore()](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)：

在目前元素 ( DOM ) 中的子節點中插入一個子元素。

[setInterval()](https://developer.mozilla.org/zh-TW/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)：

此函式作用為重複地執行一個函式呼叫或一個程式碼片斷, 每一次執行間隔固定的延遲時間. 此函式呼叫時將傳回一個間隔代碼(Interval ID)用以識別該間隔程序, 因此後續您可以呼叫 clearInterval() 函式移除該間隔程序

[CanvasRenderingContext2D.globalAlpha](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha)：

是Canvas 2D API 用來描述在canvas上繪圖之前，設置圖形和圖片透明度的屬性。數值的範圍從0.0 （完全透明）到1.0 （完全不透明）。

其他衍伸

[OpenCV演算法](https://opencv.org/)：

OpenCV的全稱是Open Source Computer Vision Library，是一個跨平台的電腦視覺庫。OpenCV是由英特爾公司發起並參與開發，以BSD授權條款授權發行，可以在商業和研究領域中免費使用。OpenCV可用於開發即時的圖像處理、電腦視覺以及圖型識別程式。

參考資料：

JS30紀錄 19-Webcam Fun：[https://shunnien.github.io/2018/01/09/Javascript30days-19/](https://shunnien.github.io/2018/01/09/Javascript30days-19/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)

[ Alex 宅幹嘛 ] ?‍? 深入淺出 Javascript30 快速導覽 | Day 19：Webcam Fun：[https://youtu.be/1oOxMR_LPb0](https://youtu.be/1oOxMR_LPb0)
