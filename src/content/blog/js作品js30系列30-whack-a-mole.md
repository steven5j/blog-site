---
title: "[JS作品]JS30系列30 &#8211; Whack A Mole"
description: "主題目標 製作一個打地鼠小遊戲 作品網址： 處理步驟 步驟一： 地鼠是隨機出現在 6 個地洞中，而且出現時間也 [&hellip;]"
pubDate: 2020-12-12
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5227.gif
wpId: 5227
slug: js-js30-30-whack-a-mole-5227
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/12/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9730-whack-a-mole/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3c3JZ7TZ_IgvBq2sNJtJVu2XQyR3jkZSNE0hKXGxjaXURBK2ckFIHtXn5ezEFwGY8X1DsZzW8dVJez9B5chopgUdg7PJcpA4mmpJGNXAvg05UZEhzDSt33vkfWdsOGNO-8FZGXB76k-ewQwB8QKo43usw=w1614-h909-no?authuser=0)

主題目標

製作一個打地鼠小遊戲

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/30 - Whack A Mole/index.html)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟一：

地鼠是隨機出現在 6 個地洞中，而且出現時間也是隨機的長度

```
  //地鼠隨機出現的時間
  function randomTime(min,max){
    return Math.round(Math.random() * (max-min) + min);
  }
```

步驟二：

建立隨機出現地鼠的地洞 function ，並且由於隨機的數值可能重複，利用遞迴 與變數 lastHole 來排除

```
    //所有的洞
  const holes = document.querySelectorAll('.hole');
//紀錄最後的隨機的地洞
  let lastHole;
  //隨機出現地鼠的地洞
  function randomHole(holes){
     // holes 是陣列，由 0 開始，所以利用 random 直接設定 random 範圍 ;Math.floor是無條件捨去
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    // 隨機有可能重複的地洞，所以建立變數排除重複
    if(hole===lastHole){
      console.log("地鼠跑到一個同樣的洞，所以換洞跑");
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }
```

步驟三：

地鼠出現的樣式與呼叫前幾個步驟的 function ，並建立 timeUp 標註遊戲時間是否到達

```
// 遊戲時間是否已經到達
 let timeUp = false;
//地鼠出現的樣式
function peep(){
    // 地鼠出現的隨機時間
    const time = randomTime(200,1000);
    // 地鼠出現的隨機地洞
    const hole = randomHole(holes);
    // 變更該地洞的地鼠樣式，讓其顯示
    hole.classList.add('up');
    // 地鼠出現的時間
    setTimeout(()=>{
      hole.classList.remove('up');
      // 讓地鼠出現連續，遊戲時間到則停止
      if(!timeUp) peep();
    },time);
}
```

步驟四：

建立開始遊戲按鈕的功能，宣告分數變數 score ； setTimeout 的時間是毫秒。

```
// 遊戲得分
 let score = 0;
//遊戲開始
function startGame(){
  // 初始分數版歸 0
  scoreBoard.textContent = 0;
  // 遊戲時間標示
  timeUp = false;
  // 遊戲得分歸 0
  score = 0;
  // 地鼠開始出現
  peep();
  // 遊戲截止時間
  setTimeout(() =>  timeUp = true
  , 30000);
}
```

步驟五：

打擊地鼠後計算得分，並移除地鼠樣式(可以考慮替換成地鼠挨打樣式)，並使用 isTrusted 判斷是否使用程式碼作弊

```
//打擊地鼠後得分
function bonk(e){
  // 判斷是否真的使用者點擊
  if(!e.isTrusted) return;// cheater!
  // 分數 + 1
  score++;
  //移除地鼠顯示
  this.parentNode.classList.remove('up');//用滑鼠按地鼠圖片 up的class是在hold標籤,hold 是 mole的父(上層)標籤，所以要取消上層標籤的up Class
  // 顯示得分
  scoreBoard.textContent = score;
}
//每個洞都增加事件監聽
moles.forEach(mole => mole.addEventListener('click',bonk));
```

特別技術、函式

<HTML>

<CSS>

[cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)

此 cursor CSS 屬性可以指定當滑鼠指標指向哪個物件時，顯示不同的游標。

<JavaScript>

[Event.isTrusted](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/isTrusted)

Event 介面的 isTrusted 唯讀屬性為一個布林值，若事件物件是由使用者操作而產生，則 isTrusted 值為 true。若事件物件是由程式碼所建立、修改，或是透過 EventTarget.dispatchEvent() 來觸發，則 isTrusted 值為 false。

[window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)

是在延遲了某段時間 (單位為毫秒) 之後，才去執行「一次」指定的程式碼，並且會回傳一個獨立的 timer ID：

[setInterval()](https://developer.mozilla.org/zh-TW/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

固定延遲了某段時間之後，才去執行對應的程式碼，然後「不斷循環」。

參考資料：

JS30紀錄 30-Whack a Mole：[https://shunnien.github.io/2018/02/05/Javascript30days-30/](https://shunnien.github.io/2018/02/05/Javascript30days-30/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
