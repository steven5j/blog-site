---
title: "[JS作品]JS30系列27 &#8211; Click and Drag"
description: "主題目標 拖拉畫面的時候等於移動卷軸，以達到移動的目的。 作品網址： 處理步驟 步驟一： 滑鼠點擊的時候，有樣 [&hellip;]"
pubDate: 2020-12-09
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5168.gif
wpId: 5168
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/09/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9727-click-and-drag/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3fPyoMj-oDfJ6PcHhcX5P08tkq6Fd_y2ckP8dOHYKd9JEBnQz-GlgJeh0nNt6sHgOwDhWdwi0J4phnR589ToBIjZWGr4cqbEbn0RFQqyJllxFYWhxh3dD671kNIw5mA8BOWzE2Qz-Ye4L0lw3USlJKPsw=w1614-h909-no?authuser=0)

主題目標

拖拉畫面的時候等於移動卷軸，以達到移動的目的。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/27 - Click and Drag/index.html)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟一：

滑鼠點擊的時候，有樣式變換，離開畫面或是按鍵放開就樣式還原，建立 mousedown 、 mouseup 、 mouseleave 等事件，並切換樣式。

```
  // 宣告
  const slider = document.querySelector(".items");
  
  /**
 * 移除樣式
 */
function handleRemoveActive() {
  slider.classList.remove("active");
}
/**
 * 滑鼠按鍵按下
 * @param {*} e
 */
function handleMouseDown(e) {
  slider.classList.add("active");
}
  //滑鼠按下
  slider.addEventListener('mousedown',handleMouseDown);
  //滑鼠離開
  slider.addEventListener('mouseleave',handleRemoveActive);
  //滑鼠鬆開
  slider.addEventListener('mouseup',handleRemoveActive);
```

步驟二：

建立滑鼠移動的事件，並判斷滑鼠左鍵未點選時返回。

```
  /**
 * 移動事件
 * @param {*} e window.event
 */
function handleMove(e){
  // 判斷滑鼠左鍵點選，未點選直接返回停止
  if(e.buttons !== 1) return;
}
  //滑鼠移動
  slider.addEventListener('mousemove',handleMove);
```

步驟三：

宣告變數 startX 紀錄滑鼠目前的 X 軸位置，以及 scrollLeft 卷軸目前的位置；接著計算移動距離與設定

```
  // 宣告 紀錄滑鼠點擊的起始位置
  let startX;
  // 宣告 紀錄卷軸左邊位置
  let scrollLeft;

/**
 * 滑鼠按鍵按下
 * @param {*} e
 */
function handleMouseDown(e) {
  slider.classList.add("active");
  //設定起始位置
  startX = e.pageX - slider.offsetLeft;
  //記錄卷軸目前位置
  scrollLeft = slider.scrollLeft;
}

  /**
 * 移動事件
 * @param {*} e window.event
 */
function handleMove(e){
  // 判斷滑鼠左鍵點選，未點選直接返回停止
  if(e.buttons !== 1) return;
  // 移動距離 剪掉相對距離 和初始距離
  walk = e.pageX - slider.offsetLeft - startX;
  // 卷軸設定位置
  slider.scrollLeft = scrollLeft -walk;
}
```

特別技術、函式

<HTML>

<CSS>

[perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

CSS 屬性 perspective指定了觀察者與 z=0 平面的距離，使具有三維位置變換的元素產生透視效果。 z>0 的三維元素比正常大，而 z<0 時則比正常小，大小程度由該屬性的值決定。

[user-select](https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select)

實驗性功能，控制是否能被選取；CSS 属性 user-select 控制用户能否选中文本。除了文本框内，它对被载入为 chrome 的内容没有影响。

<JavaScript>

[HTMLElement.offsetLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetLeft)

取得元素的左邊界的相對值

[MouseEvent.pageX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX)

由滑鼠事件取得目前游標在畫面上的 X 座標

參考資料：

JS30紀錄 27-Click and Drag：[https://shunnien.github.io/2018/01/31/Javascript30days-27/](https://shunnien.github.io/2018/01/31/Javascript30days-27/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
