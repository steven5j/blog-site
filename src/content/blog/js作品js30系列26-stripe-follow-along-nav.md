---
title: "[JS作品]JS30系列26-Stripe Follow Along Nav"
description: "主題目標 本次的編程任務需要實現的效果是當鼠標懸停於導航按鈕時，顯示對應下拉菜單的內容。 （說明：下拉菜單內容 [&hellip;]"
pubDate: 2020-12-05
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/5165.jpg
wpId: 5165
slug: js-js30-26-stripe-follow-along-nav-5165
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/05/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9726-stripe-follow-along-nav/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/26-Stripe-Follow-Along-Nav-1024x576.jpg)

主題目標

本次的編程任務需要實現的效果是當鼠標懸停於導航按鈕時，顯示對應下拉菜單的內容。 （說明：下拉菜單內容及白色背景已寫好，只需要根據需要改變其CSS屬性使元素顯示出來或改變其位置即可）。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/26%20-%20Stripe%20Follow%20Along%20Nav/index.html)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

先製作強調的外框 DOM 與下拉選單的內容，利用 CSS 中的 opacity 與 display 來隱藏，之後透過 JS 在移動至選單標題時，進行外框大小的變化與 CSS 的顯示

步驟一

取的所有標題元素，並建立移動到元素上與離開的觸發事件

```
  // 取的所有標題元素
  const triggers =document.querySelectorAll('.cool > li');

  /**
 * 移動到元素上的觸發事件
 */
function handleEnter(){

}
 /**
 * 離開元素的觸發事件
 */
 function handleLeave(){

 }

// 移動到元素上的觸發事件
 triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
// 移動到元素上的觸發事件
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```

步驟二

透過增加 CSS 操作 open與移除open

```
  // 取的dropdownBackground元素
  const background =document.querySelector('.dropdownBackground');

  /**
 * 移動到元素上的觸發事件
 */
function handleEnter(){
  // 添加CSS class
this.classList.add('trigger-enter');
background.classList.add('open');

// 內容最後顯示
this.classList.add('trigger-enter-active');
}
 /**
 * 離開元素的觸發事件
 */
 function handleLeave(){
  //移除CSS class
  this.classList.remove('trigger-enter');
  background.classList.remove('open');
 }
```

步驟三

調整箭頭指向框位置與大小，使其符合下拉選單的內容

```
 // 取得指向框的位置
  const nav = document.querySelector('.top');

  /**
 * 移動到元素上的觸發事件
 */
function handleEnter(){
// 添加CSS class
this.classList.add('trigger-enter');
background.classList.add('open');
// 內容最後顯示
this.classList.add('trigger-enter-active');

// 取得下拉選單內容 DOM
const dropdown =this.querySelector('.dropdown');
// 取得位置資料
const dropdownCoords =dropdown.getBoundingClientRect();
// 取得nav位置資料
const navCoords = nav.getBoundingClientRect();

// 設定指向框大小為下拉選單大小 setProperty
background.style.setProperty('width', `${dropdownCoords.width}px`);
// 設定指向框大小為下拉選單大小 一般方式
background.style.height =`${dropdownCoords.height}px`;
// 移動指向框
background.style.setProperty('transform', `translate(${dropdownCoords.left - navCoords.left}px,${dropdownCoords.top - navCoords.top}px)`);

}
```

步驟四

內容顯示放最後，設定顯示時間，讓內容晚點出來，不會造成內容提早出來

```
// 內容最後顯示
//讓顯示相關文字時間往後推一點，避免資料先行出來，背景未跟到
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```

特別技術、函式

<HTML>

<CSS>

[will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

為web開發者提供了一種告知瀏覽器該元素會有哪些變化的方法，這樣瀏覽器可以在元素屬性真正發生變化之前提前做好對應的優化準備工作。這種優化可以將一部分複雜的計算工作提前準備好，使頁面的反應更為快速靈敏。

<JavaScript>

[mouseenter](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event)

當定點設備（通常指鼠標）移動到元素上時就會觸發 mouseenter 事件 類似 mouseover，它們兩者之間的差別是 mouseenter 不會冒泡（bubble），也就是說當指針從它的子層物理空間移到它的物理空間上時不會觸發。

[mouseleave](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseleave_event)

指點設備（通常是鼠標）的指針移出某個元素時，會觸發mouseleave事件。 mouseleave  和 mouseout 是相似的，但是兩者的不同在於mouseleave 不會冒泡而mouseout 會冒泡。

 這意味著當指針離開元素及其所有後代時，會觸發mouseleave，而當指針離開元素或離開元素的後代（即使指針仍在元素內）時，會觸發mouseout。

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

取得元素的位置各項資料

[CSSStyleDeclaration.setProperty()](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

方法接口為一個聲明了CSS樣式的對象設置一個新的值 。設定 CSS 樣式。

參考資料：

JS30紀錄 26-Stripe Follow Along Nav：[https://shunnien.github.io/2018/01/30/Javascript30days-26/](https://shunnien.github.io/2018/01/30/Javascript30days-26/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
