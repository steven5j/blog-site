---
title: "[JS作品]JS30系列28 &#8211; Video Speed Controller"
description: "主題目標 使用 div 來製作一個速度條，來調整影片播放速度。需要實現的效果是當鼠標拖動滑塊時，實時改變視頻播 [&hellip;]"
pubDate: 2020-12-10
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5222.gif
wpId: 5222
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/10/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9728-video-speed-controller/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3c1XX4SHwCw0CZ1cPTknnQryWOYic-5G58j-5PQtyxDcule4uWkI40p6CJre7o_cxTZZas9q1jhzI4LzRckBOJVaRFOSHZAnNqniC9hfg7IbqgUB1sKLlPq7Te5YMTBBABIABhVHfjR2mpF5sQMwBWdwA=w1614-h909-no?authuser=0)

主題目標

使用 div 來製作一個速度條，來調整影片播放速度。需要實現的效果是當鼠標拖動滑塊時，實時改變視頻播放的速度。?

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/28 - Video Speed Controller/index.html)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

不使用 input ，改使用 div ，透過滑鼠位置與 div 大小來計算播放速度

步驟一

取得速度元素的 DOM ，然後建立 mousemove 滑鼠移動事件的觸發

```
  // 取得 speed div
  const speed = document.querySelector('.speed');
  // 取得 speed bar div
  const bar = document.querySelector('.speed-bar');
  // 滑鼠移動
  function handleMove (e){

  }

  //設定監聽
  speed.addEventListener('mousemove',handleMove);
```

步驟二

計算滑鼠在速度條上的位置，利用相對位置與速度條的大小計算比例；然後依照該比例去計算播放速度

```
// 速度條上滑鼠移動
  function handleMove (e){
      // 取得滑鼠在速度條上的位置
      const y = e.pageY - this.offsetTop;
      // 計算移動的速度條百分比
      const percent = y / this.offsetHeight;
      // 速度條的最小倍速與最大倍速
      const min = 0.4 ,max = 4;
      // 播放速度計算
      const playSpeed = percent * (max - min) + min;
      
  }
```

步驟三

更換速度條的樣式與內容文字，以及播放器的播放速度

```
   // 取得播放器 DOM
  const video = document.querySelector("video");
// 速度條上滑鼠移動
  function handleMove (e){
      // 取得滑鼠在速度條上的位置
      const y = e.pageY - this.offsetTop;
      // 計算移動的速度條百分比
      const percent = y / this.offsetHeight;
      // 速度條的最小倍速與最大倍速
      const min = 0.4, max = 4;
      // 播放速度計算
      const playSpeed = percent * (max - min) + min;
      //------------------
      // 速度條的樣式
      bar.style.height = `＄{Math.round(percent * 100)}%`;
      // 速度條的內容文字更新
      bar.textContent = `＄{playSpeed.toFixed(2)}x`;
      // 調整播放速度
      video.playbackRate = playSpeed;
  }
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[toFixed()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

方法會使用定點小數表示法（fixed-point notation）來格式化數字。格式化數字，設定顯示小數位，最多到 20 位數

[MouseEvent.pageY](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageY)

滑鼠返回觸發事件的位置相對於整個 document 的 Y 坐標值。

參考資料：

JS30紀錄 28-Video Speed Controller：[https://shunnien.github.io/2018/02/01/Javascript30days-28/](https://shunnien.github.io/2018/02/01/Javascript30days-28/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
