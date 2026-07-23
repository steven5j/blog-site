---
title: "[JS作品]JS30系列10-Hold Shift and Check Checkboxes 選單多重選取功能"
description: "作品網址： 主題目標 類似 Gmail 信箱的 checkbox 多選功能，當選取 [&hellip;]"
pubDate: 2020-03-21
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3930.gif
wpId: 3930
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/21/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9710-hold-shift-and-check-checkboxes-%e9%81%b8%e5%96%ae%e5%a4%9a%e9%87%8d%e9%81%b8%e5%8f%96%e5%8a%9f%e8%83%bd/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/03/錄製_2020_03_21_18_19_47_66.gif)

 

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

類似 Gmail 信箱的 checkbox 多選功能，當選取一個 checkbox 後，按住 shift 不放，在選取另一 checkbox ，此兩個 checkbox 中間的 checkbox 皆會選取。

 

 

需求思考分析

- 點選會打勾。

- 按住shift點選兩個檢查框，會把中間的全部一起打勾

 

 

處理步驟

這一段題目 幾乎每個人使用的方式都不太一樣。依照個人喜好去做使用為主

步驟 1.

取得所有的 checkbox DOM 並綁定 click 事件，建立的 handleCheck function 中可以利用 console 查看一下 e 的物件，為 MouseEvent

 因為 querySelectorAll 取得的結果不是 Array ，所以先轉換 為數組

```
`  const checkbox = document.querySelectorAll(".inbox input[type='checkbox']");
  console.log(checkbox);
  //轉換Nodelist 為數組
  const checkboxArr = Array.from(checkbox);
  console.log(checkboxArr);
  //checkbox全部加上點擊時的狀況
  checkboxArr.map(checkbox=>checkbox.addEventListener('click', handleCheck) )

function handleCheck(e) {
    // e is MouseEvent
    console.log(e);
}`
```

步驟 2.

開始針對 handleCheck function 撰寫判斷， 加入判斷式，決定要變更 checkbox 選取狀態的變更。 

```
`    function handleCheck(e) {
// e is MouseEvent
      console.log(e);
      //標記A值
      if ( ! lastChecked) lastChecked =  this ;
      //確定選中or 取消選中
      onOff =  lastChecked.checked  ?  true  :  false ;
      lastChecked =  this ;
    }`
```

步驟 3.

針對shift 鍵按下並選取該 checkbox 時，進行選取間格中索引的選取設定

```
`    const checkbox = document.querySelectorAll(".inbox input[type='checkbox']");
    console.log(checkbox);
    //轉換Nodelist 為數組
    const checkboxArr = Array.from(checkbox);
    console.log(checkboxArr);
    //checkbox全部加上點擊時的狀況
    checkboxArr.map(checkbox => checkbox.addEventListener('click', handleCheck))
    //宣告選取變數
    let lastChecked=false;
    let onOff = false;

    function handleCheck(e) {
      // e is MouseEvent
      console.log(e);
      //標記A值
      if ( ! lastChecked) lastChecked =  this ;
      //確定選中or 取消選中
      onOff =  lastChecked.checked  ?  true  :  false ;
      //shift按下的時候
      if (e.shiftKey && this.checked) {
        console.info("this is shift & checked");
        //針對按下了Shift 鍵的情況，獲取A 和 B 範圍
        let checkstart = checkboxArr.indexOf(this);
        let checkend = checkboxArr.indexOf(lastChecked);
        //截取該範圍內的數組元素，並改變選中狀態
        checkboxArr.slice(Math.min(checkstart, checkend), Math.max(checkstart, checkend)).forEach(input => input.checked = onOff)
        console.log(checkstart + " + " + checkend);
      }
      lastChecked =  this ;
    }`
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[NodeList](https://developer.mozilla.org/zh-TW/docs/Web/API/NodeList)

NodeList 物件是節點的集合，可藉由 Node.childNodes 屬性以及 document.querySelectorAll() 方法取得。

雖然 NodeList 不是 Array，但仍可以使用 forEach() 方法來進行迭代。一些老舊瀏覽器並未實作此方法。

 [Array.prototype.slice() ](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

slice() 方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。

[Math.min()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)

Math.min() 返回零個或更多個數值中的最小值。

[Math.max()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

Math.max() 函數返回一組數中的最大值。

 

 

參考資料：

JS30紀錄 10-Hold Shift and Check Checkboxes：  [https://shunnien.github.io/2017/12/27/Javascript30days-10/](https://shunnien.github.io/2017/12/27/Javascript30days-10/) 

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
