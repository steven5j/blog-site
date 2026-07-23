---
title: "[JS作品]JS30系列20-Speech Detection"
description: "本次的挑戰任務，是利用瀏覽器內置Web speech API,將自己所說的話輸出在頁面上,僅chrome瀏覽器 [&hellip;]"
pubDate: 2020-07-27
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
wpId: 4402
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/07/27/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9720-speech-detection/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3cvlY_K8G7_5bBYCBibkHF_R2-XZWlL79ys0_AT4GxfkKIGioGQoG8iKm53SKgfQy354gbgPPgw23imPxrJgtKkUtjMnOVA4h9glzz13SMWMLA_D_UWZqMQuz8euJ0SizYIgXQIxkFuxuGWA2zjQYQqvw=w1605-h903-no?authuser=0)

本次的挑戰任務，是利用瀏覽器內置`Web speech API`,將自己所說的話輸出在頁面上,僅chrome瀏覽器支持。
說明：由於只有chrome瀏覽器實現了該接口，而語音識別需要將捕捉到的信息發送至google服務器進行處理。

 

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/20%20-%20Speech%20Detection/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟 1.

啟動語音，由於目前只有chrome瀏覽器實現了此功能，故直接使用帶有前綴的構造函數來構建一個語音識別對象。

步驟 2.

產生識別結果後，將文字呈現在 p tag 內容中，識別結果為 SpeechRecognitionResultList 取得 transcript 屬性，就是辨識文字

監聽收到結果事件，將語音識別結果輸出在DOM元素上。

步驟 3.

當辨識文字出現特定文字的時候，可以使用 replace 取代呈現。

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[SpeechRecognition()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition)

語音識別，目前還在實驗階段。

[SpeechRecognition.interimResults()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults)

此屬性為布林值，控制是否取得即時辨識結果，預設為 false

[SpeechRecognition.start()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start)

啟動語音識別服務

[SpeechRecognition Events 觸發事件
Web Speech API 事件](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

[SpeechRecognition: result event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event)

語音辨識結束返回結果的時候觸發。

[SpeechRecognition: end event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event)

語音辨識服務結束時觸發。

參考資料：

JS30紀錄 20-Speech Detection：[https://shunnien.github.io/2018/01/12/Javascript30days-20/](https://shunnien.github.io/2018/01/12/Javascript30days-20/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)

[ Alex 宅幹嘛 ] ?‍? 深入淺出 Javascript30 快速導覽 | Day 20：Speech Detection：[https://youtu.be/TUgz-m-EMKg](https://youtu.be/TUgz-m-EMKg)
