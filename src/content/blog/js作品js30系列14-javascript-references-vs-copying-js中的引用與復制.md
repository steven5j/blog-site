---
title: "[JS作品]JS30系列14 &#8211; JavaScript References vs Copying JS中的引用與復制"
description: "作品網址： 主題目標 隨著卷軸移動到中央，讓圖片動態顯示。 需求思考 [&hellip;]"
pubDate: 2020-04-03
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/4003.gif
wpId: 4003
slug: js-js30-14-javascript-references-vs-copying-js-4003
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/04/03/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9714-javascript-references-vs-copying-js%e4%b8%ad%e7%9a%84%e5%bc%95%e7%94%a8%e8%88%87%e5%be%a9%e5%88%b6/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/04/錄製_2020_04_03_01_18_12_822-2.gif)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/14%20-%20JavaScript%20References%20VS%20Copying/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

主題目標

-  隨著卷軸移動到中央，讓圖片動態顯示。 

 

需求思考分析

- 獲取頁面中的所有圖片元素

- 滾動事件監聽

- 尺寸獲取及處理

- 滾動至指定區域的條件判斷

 

處理步驟

步驟 1. 比較普通變數

字串、整數或布林變數的參照，只要宣告一變數複製，兩者即為不同；這幾個類型類似實值型別的參照

```
let age = 100;
let age2 = age;
console.log(age, age2); // 100,100
age = 200;
console.log(age, age2); // 200,100
let name = "Wes";
let name2 = name;
console.log(name, name2); // Wes,Wes
name = "wesley";
console.log(name, name2); // wesley,Wes
```

步驟 2. 比較陣列

陣列物件的複製就類似參照型別了，所以可以透過一些函式回傳新的陣列，有以下幾種方式

- [slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

- [[].concat](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

- [Spread](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_operator)

- Array.from

步驟 3. 比較物件

物件的複製也是類似參照型別，所以跟陣列類似，有以下幾個方式處理：

- [Object.assign](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

- [Spread syntax](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_operator)

但是物件裡面尚有巢狀物件的情形需要考慮，陣列其實也是有巢狀的情形，所以可以利用 JSON 來處理

```
const wes = {
name: "Wes",
age: 100,
social: {
twitter: "@wesbos",
facebook: "wesbos.developer"
}
};
const dev2 = JSON.parse(JSON.stringify(wes));
dev2.social.twitter = "@coolman";
console.log(dev2.social, wes.social);
```

特別技術、函式

<HTML>

<CSS>

<JavaScript>

[Spread syntax](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

展開語法(Spread syntax), 可以在函數調用/數組構造時,將數組表達式或者string在語法層面展開；還可以在構造字面量對象時,將對象表達式按key-value的方式展開。( 譯者註 :字面量一般指[1, 2, 3] 或者{name: “mdn”} 這種簡潔的構造方式)

ES 6 出現的快速語法，針對 function 、 array 、 object ，皆可以使用，用來結合物件或陣列等。

```
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// expected output: 6
console.log(sum.apply(null, numbers));
// expected output: 6

```

[Array.prototype.concat()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

`concat()` 方法被用來合併兩個或多個陣列。此方法不會改變現有的陣列，回傳一個包含呼叫者陣列本身的值，作為代替的是回傳一個新陣列。

```
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

```

[Object.assign()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Object.assign()被用來複製一個或多個物件自身所有可數的屬性到另一個目標物件。回傳的值為該目標物件。

```
Object.assign(target, ...sources)
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

[Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

slice() 方法返回一個新的數組對象，這一對像是一個由 begin和end決定的原數組的淺拷貝（包括begin，不包括end）。原始數組不會被改變。

```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

```

[JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

JSON.stringify() 方法將一個JavaScript 值（對像或者數組）轉換為一個JSON 字符串，如果指定了replacer 是一個函數，則可以選擇性地替換值，或者如果指定了replacer 是一個數組，則可選擇性地僅包含數組指定的屬性。

[JSON.parse()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

JSON.parse() 方法把會把一個JSON字串轉換成 JavaScript的數值或是物件。另外也可選擇使用reviver函數讓這些數值或是物件在被回傳之前做轉換。

```
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);
console.log(obj.count);
// expected output: 42
console.log(obj.result);
// expected output: true

```

參考資料：

JS30紀錄 14-JavaScript References vs Copying：  [https://shunnien.github.io/2018/01/03/Javascript30days-14/](https://shunnien.github.io/2018/01/03/Javascript30days-14/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
