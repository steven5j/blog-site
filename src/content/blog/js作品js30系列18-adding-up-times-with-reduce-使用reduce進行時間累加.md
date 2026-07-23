---
title: "[JS作品]JS30系列18-Adding Up Times With Reduce 使用reduce進行時間累加"
description: "作品網址： 主題目標 初始文件index-start.html中提供 [&hellip;]"
pubDate: 2020-04-05
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4044.gif
wpId: 4044
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/04/05/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9718-adding-up-times-with-reduce-%e4%bd%bf%e7%94%a8reduce%e9%80%b2%e8%a1%8c%e6%99%82%e9%96%93%e7%b4%af%e5%8a%a0/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/04/錄製_2020_05_27_00_39_05_272.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/18%20-%20Adding%20Up%20Times%20with%20Reduce/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

初始文件index-start.html中提供了一個包含多個列表項的無序列表元素，每一個列表項均添加了data-time屬性，該屬性用分和秒錶示了時間。要求將所有的時間累加在一起，並用时:分:秒來表示計算的結果。

 

處理步驟

步驟 1.

一開始取得所有 data-time 的 DOM，並注意轉換為 Array

querySelectorAll 取出來的資料是類似 Array 而已，所以加上 Array.from 轉換為 Array

```
const timeNodes = Array.from(document.querySelectorAll("[data-time]"));
```

步驟 2.

- 利用 map 來取得 dataset 資料

```
const seconds = timeNodes
.map(node => node.dataset.time)
```

- 繼續利用 map 將分與秒轉換為秒數

```
const seconds = timeNodes
.map(node => node.dataset.time)
.map(timeCode => {
const [mins, secs] = timeCode.split(":").map(parseFloat);
return mins * 60 + secs;
console.log(mins, secs);
})
```

- 透過 reduce 來加總資料

```
const seconds = timeNodes
.map(node => node.dataset.time)
.map(timeCode => {
const [mins, secs] = timeCode.split(":").map(parseFloat);
return mins * 60 + secs;
console.log(mins, secs);
})
.reduce((total, vidSeconds) => total + vidSeconds);
```

步驟 3.

總秒數取出來後，劃分時、分、秒的數值，利用 [Math.floor](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 與 % 取得餘數的方式

```
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
// 取得餘數
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours,mins,secondsLeft);
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Math.floor()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

類似無條件捨去，直接取整數，需要注意的是負數的運用。

```
console.log(Math.floor(5.95));
// expected output: 5

console.log(Math.floor(5.05));
// expected output: 5

console.log(Math.floor(5));
// expected output: 5

console.log(Math.floor(-5.05));
// expected output: -6

```

[Array.prototype.reduce()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。

```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

```

[parseInt 和 parseFloat 函數](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E9%A0%90%E5%85%88%E5%AE%9A%E7%BE%A9%E7%9A%84%E5%87%BD%E6%95%B8/parseInt_%E5%92%8C_parseFloat_%E5%87%BD%E6%95%B8)

這兩個〝分析〞函數，parseInt 和 parseFloat，會在給與字串作為參數時返回數值。

參考資料：

JS30紀錄 18-Adding Up Times With Reduce：[https://shunnien.github.io/2018/01/07/Javascript30days-18/](https://shunnien.github.io/2018/01/07/Javascript30days-18/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
