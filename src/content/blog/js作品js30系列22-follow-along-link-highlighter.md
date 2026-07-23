---
title: "[JS作品]JS30系列22 &#8211; Follow Along Link Highlighter"
description: "主題目標 當鼠標移動至某個對應標籤上時，為標籤添加一個白色的背景框，高亮表示該標籤被選中，當鼠標 [&hellip;]"
pubDate: 2020-07-30
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
wpId: 4417
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/07/30/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9722-follow-along-link-highlighter/"
---

![](https://lh3.googleusercontent.com/pw/ACtC-3cpZIvuuts8NQIUeEw1ROKbAWYGioNgufwHUancPjAUvPn7DJI8QOAInCxgMCeMfM3K0xtRUNTMZGnd2xxR3qANQFGpXS64YaQMqY512hJyD1CQ0xJP5XjGo2lC3O7HVi5cUevcDoA_7-3enp4xge-xKw=w1605-h903-no?authuser=0)

 

主題目標

當鼠標移動至某個對應標籤上時，為標籤添加一個白色的背景框，高亮表示該標籤被選中，當鼠標移動至其他標籤後，白色背景框不消失，而是直接跟隨鼠標平移至新的標籤，實現效果見下圖展示。

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/22 - Follow Along Link Highlighter/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

步驟 1.

取得所有超連結    

```
 // 取得所有超連結 a 同時class是.a的
    const triggers = document.querySelectorAll('a.a');
```

建立 highlight 元素

```
 	const hightlight = document.createElement('span');
	// 設定 CSS
    hightlight.classList.add('highlight');
    // 加入到 body
    document.body.appendChild(hightlight);
```

步驟 2.

用陣列的方式，讓每個超連結的元素，綁定 mouseenter 事件

```
//創建highlightLink 方法
function highlightLink() {
}

// 對所有超連結綁定事件
triggers.forEach(a => a.addEventListener("mouseenter", highlightLink));
```

步驟 3.

highlightLink 方法 的內容撰寫，主要是設定 highlight 大小與位置，利用 getBoundingClientRect 取得目前元素大小與位置。

```
 //創建highlightLink 方法
    function highlightLink(){
      // 取得元素的大小與位置
      const linkCoords = this.getBoundingClientRect();
      console.dir(linkCoords);
      //用json的方式，一次宣告好幾個值
      const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top:linkCoords.top + window.scrollY,
        left:linkCoords.left +window.scrollX
      }
      // 設定 highlight 寬度等於目前元素寬度
      highlight.style.width = `${coords.width}px`;
      // 設定 highlight 高度等於目前元素高度
      highlight.style.height = `${coords.height}px`;
        
      console.log([window.scrollX,window.scrollY,coords.left,coords.top]);
      // 移動 highlight 元素到目前元素位置，考量因為有 scroll bar
      highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    
    }
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/getBoundingClientRect)

返回元素的大小及其相對於視口的位置。

[Element: mouseenter event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event)

當定點設備（通常指鼠標）移動到元素上時就會觸發 mouseenter 事件

參考資料：

JS30紀錄 22-Follow Along Link Highlighter：[https://shunnien.github.io/2018/01/17/Javascript30days-22/](https://shunnien.github.io/2018/01/17/Javascript30days-22/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
