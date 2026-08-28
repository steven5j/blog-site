---
title: "[JS作品]JS30系列29 &#8211; Countdown Timer"
description: "主題目標 製作一個倒數計時器，頁面上已經有固定秒數的選項，也有 form 的自訂時間的倒數。 作品網址： 處理 [&hellip;]"
pubDate: 2020-12-11
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5224.gif
wpId: 5224
slug: js-js30-29-countdown-timer-5224
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/11/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9729-countdown-timer/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/29-Countdown-Timer-1024x576.gif)

主題目標

製作一個倒數計時器，頁面上已經有固定秒數的選項，也有 form 的自訂時間的倒數。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/29 - Countdown Timer/index.html)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

要製作一個倒數計時器，就要使用到 setInterval ，練習的範本上已經有幾個固定秒數按鈕，所以先把顯示文字呈現出來，最後在處理計時器

步驟一

顯示文字的部分有兩個，一個是倒數計時，一個是時間截止的時間，另外還要變更網頁標題(頁籤上的標題文字)

```
// 取得所有 buttons //data-time 是所有需要使用的button
const buttons = document.querySelectorAll('[data-time]');
// 倒數計時的標題
const timeDisplay = document.querySelector('.display__time-left');
// 結束時間的顯示元素
const endTime = document.querySelector('.display__end-time');

//顯示倒數計時
function displayTimeLeft(seconds){
    // 計算幾分鐘
    const minutes = Math.floor(seconds/60);
    // 計算剩餘秒數
    const remainderSeconds = seconds % 60;
    // 組合顯示文字(剩餘時間)
    const display = `＄{minutes}：＄{remainderSeconds < 10 ? '0':''}＄{remainderSeconds}`;
    // 變更網頁的標題
    document.title = display;
    // 顯示倒數計時的區塊
    timeDisplay.textContent = display;
}

//顯示結束時刻
function displayEndTime(timestamp){
    //轉換為時間
    const end =   new Date(timestamp);
    //顯示結束時間
    endTime.textContent = `Be Back At ＄{end.getHours()}：＄{end.getMinutes()}：＄{end.getSeconds()}`;
}
```

步驟二

各按鈕事件與計時器撰寫，利用 setInterval 來顯示上一步驟的時間。由於 setInterval 設定為每秒鐘進行，所以顯示時間直接根據秒數去扣除顯示。

```
// 建立計時器
let countdown;

//按鈕事件，啟動計時器
function startTimer () {
    //data 轉換
    const seconds = parseInt(this.dataset.time); //dataset.time就是抓取自定義屬性data-time
    //執行倒數計時器
    timer(seconds);
}

function timer(seconds){
    // 先清除其他計時器，避免相互影響
    clearInterval(countdown);
    // 計算倒數計時完成的時刻(使用毫秒)
    const then = Date.now() + seconds * 1000;
    // 顯示倒數計時
    displayTimeLeft(seconds);
    // 顯示完成時刻
    displayEndTime(then);
    
    //計時器迴圈
    countdown = setInterval(()=>{
    // 每秒鐘執行，所以直接每次減 1 就好
    seconds--;
    // 小於 0 時，清除計時器 並跳出迴圈
    if(seconds < 0 ){
        clearInterval(countdown);
        return;
    }
    //顯示到計時器的地方
    displayTimeLeft(seconds);
    },1000);//每1000毫秒迴圈跑一次
}
//設置事件，每個button按鈕，只要點選，即開始計時器
buttons.forEach(button => button.addEventListener("click",startTimer));
```

步驟三

表單的自訂時間功能，同樣呼叫上一步驟的計時器；並將顯示時間的文字進行調整；

注意表單送出的時候需要取消預設功能，避免頁面重整。

```
//顯示結束時刻
function displayEndTime(timestamp){
    //轉換為時間
    const end =   new Date(timestamp);
    const minutes = end.getMinutes();
    const seconds = end .getSeconds();
    //顯示結束時間
    endTime.textContent = `Be Back At ${end.getHours()}：${minutes<10 ? '0':''}${minutes}：${seconds < 10 ? '0':''}${seconds}`;
}

//輸入時間的功能部分
document.customForm.addEventListener('submit',function(e){ //文件中name名稱為customForm的物件增加事件
    //取消預設功能**重要
    e.preventDefault();
    const mins = this.minutes.value; //表單內neme為minutes的值
    timer(mins * 60);//開始計時 分鐘*60
    //表單清空
    this.reset();
})
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Date.now()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now)

方法回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數。

參考資料：

JS30紀錄 29-Countdown Timer：[https://shunnien.github.io/2018/02/03/Javascript30days-29/](https://shunnien.github.io/2018/02/03/Javascript30days-29/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
