---
title: "[JS作品]JS30系列08 :  Fun with HTML5 Canvas  HTML5 Canvas的樂趣"
description: "作品網址： 主題目標 做出繪圖畫板。 需求思考分析 滑鼠點下去會開始 [&hellip;]"
pubDate: 2020-03-15
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3906.gif
wpId: 3906
slug: js-js30-08-fun-with-html5-canvas-html5-canvas-3906
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/15/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9708-fun-with-html5-canvas-html5-canvas%e7%9a%84%e6%a8%82%e8%b6%a3/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_13_23_18_29_482.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/08%20-%20Fun%20with%20HTML5%20Canvas/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

做出繪圖畫板。

 

 

需求思考分析

- 滑鼠點下去會開始可以繪圖。

- 滑鼠點著移動會可以繪圖。

- 滑鼠放開 移動不會繼續繪圖。

- 顏色會隨移動變動。

- 線條寬度也會隨移動後變寬和粗。

 

 

處理步驟

步驟 1.

取得 [canvas](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial) DOM ，並將該 DOM 設定為 window 的大小，與畫筆的初始樣式設定。

- 取得 canvas 的 context

- 設定 strokeStyle 畫筆顏色

- 設定線條連結樣式 `lineJoin`

- 設定線條兩端端點樣式 `lineCap`

- 設定線條寬度 `lineWidth`

步驟 2.

- 設定滑鼠 `mousedown` 時，取得目前滑鼠位置為繪製起始點

- 設定滑鼠 `mousemove` 時，設定繪製路徑

- 設定滑鼠 `mouseup` 時，才開始繪製

步驟 3.

修正上一步驟的繪製過程，讓線條在滑鼠移動時也跟著繪製，因此建立 isDrawing flag 標註現在是否繪製，另外建立標註現在起始點的變數。

- 添加 isDrawing 變數，標註現在是否繪製

- 添加 startPoint 變數，設定起始

步驟 4.

增加畫筆變色與樣式變換

- 修正 startPoint 變數為 X,Y 分開變數

- 增加 hue 與 direction 變數

- 利用 hue 變換畫筆顏色

- 利用 direction 變化畫筆粗細

- 增加 mouseout 事件，當滑鼠移出畫布時，此次作畫結束

 

特別技術、函式

<HTML>

[Canvas 教學文件](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)

 [`canvas`](https://developer.mozilla.org/en-US/docs/HTML/Canvas)是一個 [HTML](https://developer.mozilla.org/en-US/docs/HTML) 元素，我們可以利用程式腳本在這個元素上繪圖（通常是用 [JavaScript](https://developer.mozilla.org/en-US/docs/JavaScript)）。除了繪圖，我們還可以合成圖片或做一些簡單（或是[不那麼簡單](https://developer.mozilla.org/en-US/docs/HTML/Canvas/A_Basic_RayCaster)）的動畫。 例如，可以用來繪圖、合成圖照片、建立動畫、甚至處理即時的影片播放。

<CSS>

[hsl()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)

在 CSS3 中新增了 HSL 及 HSLA 等兩種跟顏色有關的屬性。
其中 H 為 hue(色相)、S 為 saturation(飽合度)、L 為 lightness(亮度)。HSLA 就跟 RGBA 一樣，都是在原本的屬性中多加入了不透明度的設定而已。

<JavaScript>

[Window.innerWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth)

 瀏覽器視口（viewport）寬度（單位：像素），如果存在垂直滾動條則包括它。 

[Window.innerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight)

瀏覽器窗口的視口（viewport）高度（以像素為單位）；如果有水平滾動條，也包括滾動條高度。

[CanvasRenderingContext2D.beginPath()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)

是 Canvas 2D API 通過清空子路徑列表開始一個新路徑的方法。當你想創建一個新的路徑時，調用此方法。

  畫線段時，使用此方法，表示以下開始繪製新的線段。 

[OffscreenCanvas.getContext()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext)

取得 canvas 的畫布內容，必須指定內容類型，有 2d 、 webgl 、 webgl2 、 bitmaprenderer 幾種。

[CanvasRenderingContext2D.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)

`CanvasRenderingContext2D.strokeStyle` 是 Canvas 2D API 描述畫筆（繪製圖形）顏色或者樣式的屬性。默認值是 `#000`(black)。

 就是畫筆顏色。 

[CanvasRenderingContext2D.lineJoin](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)

`CanvasRenderingContext2D.lineJoin` 是 Canvas 2D API 用來設置 2 個長度不為 0 的相連部分（線段，圓弧，曲線）如何連接在一起的屬性（長度為 0 的變形部分，其指定的末端和控制點在同一位置，會被忽略）。 

線條與線條的連接樣式。 

![](https://mdn.mozillademos.org/files/237/Canvas_linejoin.png)

[CanvasRenderingContext2D.lineCap](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)

CanvasRenderingContext2D.lineCap 是 Canvas 2D API 指定如何繪製每一條線段末端的屬性。有 3 個可能的值，分別是：`butt`, `round` 與 `square`。默認值是 `butt`。

簡而言之，就是設定線條兩端端點的樣式。

[CanvasRenderingContext2D.lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)

`CanvasRenderingContext2D.lineWidth` 為 Canvas 2D API 設定線段粗細的屬性。可藉此屬性取得目前的線段粗細值（預設為 1.0）。設定此屬性時，零、負數、Infinity 以及 NaN 都會被忽略，而其他正確的值將會被設定成屬性值。

[CanvasRenderingContext2D.moveTo()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo)

繪製路徑的設定，由畫筆落點移動到 (x,y) 座標。

可以用來設定起始點之類。

[CanvasRenderingContext2D.lineTo()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo)

CanvasRenderingContext2D.lineTo() 是Canvas 2D API 使用直線連接子路徑的終點到x，y坐標的方法（並不會真正地繪製）

[CanvasRenderingContext2D.stroke()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke)

CanvasRenderingContext2D.stroke() 是Canvas 2D API 使用非零環繞規則，根據當前的畫線樣式，繪製當前或已經存在的路徑的方法。

 就是開始繪製，將設定的路徑繪製出來。 

[MouseEvent.offsetX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX)

[`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)接口的只讀屬性offsetX規定了事件對象與目標節點的內填充邊（padding edge）在X軸方向上的偏移量。 

[MouseEvent.offsetY](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetY)

 MouseEvent 接口的只读属性 offsetY 规定了事件对象与目标节点的内填充边（padding edge）在 Y 轴方向上的偏移量。 

 

 

參考資料：

JS30紀錄 08-Fun With HTML5 Canvas：[https://shunnien.github.io/2017/12/25/Javascript30days-8/](https://shunnien.github.io/2017/12/25/Javascript30days-8/)
