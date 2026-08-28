---
title: "[JS作品]JS30系列23 &#8211; Speech Synthesis"
description: "主題目標 初始文檔index-start.html提供了一個閱讀器，您需要完成如下編程任務：1. [&hellip;]"
pubDate: 2020-11-26
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4424.jpg
wpId: 4424
slug: js-js30-23-speech-synthesis-4424
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/26/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9723-speech-synthesis/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/js23-Speech-Synthesis-1024x576.jpg)

 

主題目標

初始文檔index-start.html提供了一個閱讀器，您需要完成如下編程任務：
1.使用相應的WebAPI接口獲取瀏覽器支持的語言種類列表，並填充到頁面的拖放菜單中，選擇中文；
2.在文本域中輸入對應語言的文字，點擊speak按鈕後瀏覽器會閱讀輸入的文字；
3.在瀏覽器閱讀時，點擊stop按鈕，瀏覽器會停止閱讀；
4.可以rate和pitch滑塊可改變閱讀速度和音高。

本次編程任務使用相應接口的最基本功能即可實現，編程中根據挑戰任務中的說明逐步實現即可

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/23%20-%20Speech%20Synthesis/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟 1.

設定合成語音 API 物件，並取得畫面文字為語音內容

```
msg.text = document.querySelector('[name="text"]').value;
```

步驟 2.

合成語音的下拉選單填充，並設定選單變更事

- 先填充選單內容

```
  //填充選單內容
   function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice=>voice.lang.includes('')).map(voice =>`<option value="${voice.name}">${voice.name} (${voice.lang}) </option>`).join('');
   };
```

- 選單變更事件

```
  // 設定語音
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
  };
  //當語音進行 填充選單內容
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  // 語音下拉選單變更
  voicesDropdown.addEventListener('change', setVoice);
```

步驟 3.

設定播放速度、文字與聲道

```
  // 設定播放速度、文字、聲道
  function setOption(){
    console.log(this.name,this.value);
    msg[this.name] =this.value;
  }
```

步驟4.

設定播放與停止按鍵功能

```
  // 播放與停止
  function toggle(startOver = true){
    speechSynthesis.cancel();
    if(startOver){
      speechSynthesis.speak(msg);
    }
  }
  // 播放
  speakButton.addEventListener('click',toggle);
  // 停止播放
  stopButton.addEventListener('click',() => toggle(startOver=false));
  //每個選項只要被選擇後就進行設定撥放速度文字
  options.forEach(option => option.addEventListener('change', setOption));
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[SpeechSynthesisUtterance](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance)

在SpeechSynthesisUtterance該界面的Web Speech API的代表發言請求。它包含語音服務應閱讀的內容以及有關如何閱讀的信息（例如語言，音調和音量）。

[SpeechSynthesis](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance)

在SpeechSynthesis該界面的Web語音API是語音業務的控制器接口; 它可用於檢索有關設備上可用的合成語音，開始和暫停語音以及其他命令的信息。

語音 API 的服務介面；此次範例使用的屬性說明

- pitch 獲取並設置說話時的音調。

- text 獲取並設置在說出語音時將要合成的文本。

- rate 獲取並設置發聲的速度。

參考資料：

JS30紀錄 23-Speech Synthesis：[https://shunnien.github.io/2018/01/17/Javascript30days-23/](https://shunnien.github.io/2018/01/17/Javascript30days-23/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
