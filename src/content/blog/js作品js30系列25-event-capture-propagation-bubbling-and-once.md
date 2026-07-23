---
title: "[JS作品]JS30系列25-Event Capture, Propagation, Bubbling and Once"
description: "主題目標 初始文檔index-start.html提供了3個尺寸不一的元素，本次挑戰是一次學習任務，主要了解學 [&hellip;]"
pubDate: 2020-12-02
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5088.gif
wpId: 5088
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/02/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9725-event-capture-propagation-bubbling-and-once/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/錄製_2020_12_02_23_14_16_532-1024x576.gif)

主題目標

初始文檔index-start.html提供了3個尺寸不一的元素，本次挑戰是一次學習任務，主要了解學習DOM的事件機制，包括事件捕獲，事件冒泡，單次觸發等。先捕獲，再冒泡觀察，搭配 Console 觀看。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/25%20-%20Event%20Capture,%20Propagation,%20Bubbling%20and%20Once/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

首先觀察one two three之層級關係

```
  <div class="one">
    <div class="two">
      <div class="three">
      </div>
    </div>
  </div>
```

步驟1

建立三組 Div ，以及 click 觸發，觀察觸發順序

```
const divs =document.querySelectorAll('div');

/**
 * 顯示目前觸發的 DOM 
 * 
 * @param {any} e 
 */
function logText(e){
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click',logText));
```

其結果會是 three > two > one

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/錄製_2020_12_02_23_14_16_532-1024x576.gif)

步驟2

變更為”捕獲“動作

```
const divs =document.querySelectorAll('div');

/**
 * 顯示目前觸發的 DOM 
 * 
 * @param {any} e 
 */
function logText(e){
  console.log(this.classList.value);
}

// 變更為捕獲
divs.forEach(div => div.addEventListener('click',logText,{capture:true}));
```

其結果會是 one > two > three

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/錄製_2020_12_02_23_18_25_687-1024x576.gif)

步驟3

其後增加使用 once 參數，此參數將使觸發進行一次

```
//使用 once 參數
const button = document.querySelector('button');
button.addEventListener('click', () => {
    console.log('Click!!!');
  }, {
    once: true
  });
```

只能點選觸發一次

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/錄製_2020_12_02_23_31_30_224-1024x576.gif)

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[EventTarget.addEventListener()](https://shunnien.github.io/2018/01/27/Javascript30days-25/)

EventTarget.addEventListener() 方法将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象 (比如 XMLHttpRequest)。

參考資料：

JS30紀錄 25-Event Capture, Propagation, Bubbling and Once：[https://shunnien.github.io/2018/01/27/Javascript30days-25/](https://shunnien.github.io/2018/01/25/Javascript30days-24/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
