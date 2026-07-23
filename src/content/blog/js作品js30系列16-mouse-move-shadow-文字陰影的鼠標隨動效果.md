---
title: "[JS作品]JS30系列16-Mouse Move Shadow 文字陰影的鼠標隨動效果"
description: "作品網址： 主題目標 初始文件index-start.html中提供 [&hellip;]"
pubDate: 2020-04-05
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4034.gif
wpId: 4034
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/04/05/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9716-mouse-move-shadow-%e6%96%87%e5%ad%97%e9%99%b0%e5%bd%b1%e7%9a%84%e9%bc%a0%e6%a8%99%e9%9a%a8%e5%8b%95%e6%95%88%e6%9e%9c/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/04/錄製_2020_04_05_20_33_11_304.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/16%20-%20Mouse%20Move%20Shadow/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

初始文件index-start.html中提供了一個包含了h1元素的div元素，h1元素已經設置了text-Shadow的樣式。本次編程挑戰中需要完成的效果是根據用戶當前的鼠標位置來操縱文字陰影的位置。

 

處理步驟

步驟 1.

- 取得 .hero 的 DOM

- 建立 mousemove 事件與綁定 shadow

步驟 2.

利用 offset 來計算，因為事件綁定是 mousemove 所以在移動到文字上時，所取得的 offset 值會變成該文字 DOM 內的資料，所以需要進行判斷式，來針對數值調整

- 設定變數 walk 為陰影移動固定值

- shadow 內，取得 hero 的長寬，利用 offsetWidth 與 offsetHeight

- shadow 內，利用 e 取得目前滑鼠在畫面中的 offsetX 與 offsetY

- 當 e.target 為文字 DOM 時，讓數值添加 offsetLeft 或是 offsetTop

步驟 3.

- 使用 [Math.round()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round) 來取整數近似值

- 為了使陰影移動到文字的上邊與左邊，計算出來的值扣除 walk 的一半

- 添加多組陰影

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)

全局屬性 contenteditable 是一個枚舉屬性，表示元素是否可被用戶編輯。如果可以，瀏覽器會修改元素的部件以允許編輯。

[Math.round()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

Math.round() 函數回傳四捨五入後的近似值.

[MouseEvent.offsetX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX) 與 [MouseEvent.offsetY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetY)

滑鼠移動點與事件對象在 X 軸或是 Y 軸的偏移量值。

[HTMLElement.offsetLeft](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft) 與 [HTMLElement.offsetTop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)

offsetLeft 返回當前元素左上角相對於 HTMLElement.offsetParent 節點的左邊界偏移的像素值。

offsetTop 返回當前元素相對於 offsetParent 元素頂部的偏移值。

[HTMLElement.offsetWidth](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/offsetWidth) 與 [HTMLElement.offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)

![](https://developer.mozilla.org/@api/deki/files/186/=Dimensions-offset.png)

參考資料：

JS30紀錄 16-Mouse Move Shadow：[https://shunnien.github.io/2018/01/05/Javascript30days-16/](https://shunnien.github.io/2018/01/05/Javascript30days-16/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
