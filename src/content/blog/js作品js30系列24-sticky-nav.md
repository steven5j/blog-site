---
title: "[JS作品]JS30系列24-Sticky Nav"
description: "主題目標 利用 CSS 來讓製作網站的置頂選單 作品網址： 處理步驟 利用 CSS 的 posi [&hellip;]"
pubDate: 2020-11-29
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4488.gif
wpId: 4488
slug: js-js30-24-sticky-nav-4488
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/29/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9724-sticky-nav/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/24-Sticky-Nav-1024x576.gif)

主題目標

利用 CSS 來讓製作網站的置頂選單

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/24%20-%20Sticky%20Nav/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

處理步驟

利用 CSS 的 position 固定後，再使用 transform 來強調凸顯內容，撰寫一部分 JS ，調整內容的位置。

步驟 1.

獲取導航欄相對於整個文檔的位置，將其記錄為切換點

```
  // 設定選單
  const nav = document.querySelector("#main");
  // 取得選單 offsetTop距離頂部的長度PX
  let topOfNav = nav.offsetTop;

  //修正選單
  function fixNav(){

  }
  //建立卷軸移動事件
  window.addEventListener("scroll",fixNav);
```

步驟 2.

建立固定標題列的 CSS

```
/* 固定標題 */
body.fixed-nav nav{
  position: fixed;
  box-shadow: 0 5px 0 rgba(0,0,0,0.1);
}
```

在 fixNav 中，判斷卷軸移動位置，動態增加樣式

```
  //修正選單
  function fixNav(){
    if(window.scrollY >= offsetTop){
      //增加樣式 CLASS
      document.body.classList.add('fixed-nav');
    }else{
      //移除樣式 CLASS
      document.body.classList.remove('fixed-nav');
    }
  }
```

步驟 3.

增加標題列的 logo 樣式，在置頂的時候顯示

```
/* 顯示標題 logo */
.fixed-nav li.logo {
  max-width:500px;
}

/* 內容比例調整為原本文字大小 */
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```

增加內文 padding ，主要避免內文因為凍結標題列而被遮蔽

```
  //修正選單
  function fixNav(){
    if(window.scrollY >= topOfNav){
      // 增加內文 padding 避免內文因為凍結標題列而被遮蔽
      document.body.style.paddingTop = nav.offsetTop + 'px';
      //增加樣式 CLASS
      document.body.classList.add('fixed-nav');
    }else{
      //移除樣式 CLASS
      document.body.classList.remove('fixed-nav');
      // 移除內文 padding 避免內文因為凍結標題列而被遮蔽
      document.body.style.paddingTop = 0;
    }
  }
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

參考資料：

JS30紀錄 24-Sticky Nav：[https://shunnien.github.io/2018/01/25/Javascript30days-24/](https://shunnien.github.io/2018/01/25/Javascript30days-24/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
