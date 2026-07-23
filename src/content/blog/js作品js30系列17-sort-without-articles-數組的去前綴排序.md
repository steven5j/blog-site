---
title: "[JS作品]JS30系列17-Sort Without Articles 數組的去前綴排序"
description: "作品網址： 主題目標 初始文件index-start.html中提供了一個無序列表 [&hellip;]"
pubDate: 2020-04-05
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4041.gif
wpId: 4041
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/04/05/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9717-sort-without-articles-%e6%95%b8%e7%b5%84%e7%9a%84%e5%8e%bb%e5%89%8d%e7%b6%b4%e6%8e%92%e5%ba%8f/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/04/錄製_2020_05_25_01_41_48_207.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/17%20-%20Sort%20Without%20Articles/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

初始文件index-start.html中提供了一個無序列表元素，並在script標籤中提供了一個字符串數組。請為這些字符串排序，要求去除字符串中的The，A以及An的前綴後再進行排序，並把排序後的結果作為列表項展示在無序列表中。

 

處理步驟

步驟 1.

聲明去絕對函數，使用String.replace()函數實現，第一參數使用字面量正則表達式。

步驟 2.

使用Array.sort()對片段進行排序，將分成中逐項使用delPrefix()去掉前綴後再進行對比。

步驟 3.

使用選擇器排序列表#bands，將排序後的多個作為列表項插入其中。

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[sort()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

會原地（in place）對一個陣列的所有元素進行排序，並回傳此陣列。排序不一定是穩定的（stable）。預設的排序順序是根據字串的 Unicode 編碼位置（code points）而定。

參考資料：

JS30紀錄 17-Sort Without Articles：[https://shunnien.github.io/2018/01/07/Javascript30days-17/](https://shunnien.github.io/2018/01/07/Javascript30days-17/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
