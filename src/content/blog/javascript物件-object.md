---
title: "[JavaScript]物件 Object"
description: "JavaScript 是物件導向語言，代表物件是這種語言最基本的類型，JavaScript 與其他物件導向語言 [&hellip;]"
pubDate: 2021-06-07
topic: software
series: javascript
heroImage: /public/uploads/wp/6169.jpg
wpId: 6169
slug: javascript-object-6169
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/06/07/javascript%e7%89%a9%e4%bb%b6-object/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/06/JavaScript物件-Object-1024x576.jpg)

JavaScript 是物件導向語言，代表物件是這種語言最基本的類型，JavaScript 與其他物件導向語言的區別是：不用定義類別，然後使用這些類別建立物件，代替做法是，JavaScript 的物件從 prototype（模型物件）繼承而來，所以物件的使用更加容易。
物件是由屬性（也稱特性（attribute））和方法（也就是函數）組成。

參考 MSDN Object 物件：[https://msdn.microsoft.com/library/kb6te8d3(v=vs.94).aspx](https://msdn.microsoft.com/library/kb6te8d3(v=vs.94).aspx)

建立物件

建立物件前，先熟知屬性建立的方法：

建立屬性

屬性名稱　:　值　,（逗號分隔屬性）（最後一個屬性後面不要加多餘的逗號，有些瀏覽器會造成錯誤）
屬性名稱命名方式：

- 通常只使用字母（絕對必要情況下可以混用數字）

- 不能有空格和標點符號

- 不能是 JavaScript 關鍵字

- 不需加引號

※屬性值不限於簡單類型，甚至可以是物件或陣列，若為字串需加引號！

建立物件有兩種方法：

1. 物件語法（new 運算子）

var　變數名稱　=：賦值運算子　new：建立運算子　Object()
與建立新陣列類似，使用 `new` 運算子，為物件增加屬性，要在括號裡面加入屬性。

```
var obj = new Object();                                         //建立空物件
var obj = new Object(num: 6, title: 'Complex Variable Types');  //建立多個屬性
```

2. 文字語法

var　變數名稱　=：賦值運算子　{ }
建立賦值的簡單類型變數一樣，使用文字（Literal）語法，並以大括號作為物件屬性標記，此作法較為常用，注意在右大括號之後加上分號結束該語句。

```
var obj = {};                                            //建立空物件
var obj = {num: 6, title: 'Complex Variable Types'};     //建立多個屬性
var obj = {                                              //分行寫法使定義更清楚
  num: 6,
  title: 'Complex Variable Types'
};

var obj = {
  num: 4,
  name: 'May',
  car:{
      brand: 'Honda',
      model: 'Fit',
      year: 2008
  },
  favoriteColor: ['Black', 'Blue', 'Red']               //屬性不限簡單類型，甚至可以是物件或陣列
};
```

陣列與物件的比較

與其他語言相比，JavaScript 的陣列相當獨特，它只是特定類型的物件，就像 JavaScript 裡的布林值、數值、字串、函數都是物件。
而應該使用哪種物件類型？何時使用？是個邏輯問題：

- 如果只呈現單一值──布林值、數值或字串，建議使用簡單類型及文字語法：
var option = true; 而非 var option = new Boolean(true);

- 如果需要表是日期和時間，就利用 Date 物件，而非普通物件。

與陣列相比，較適合使用物件的特性有：

- 物件是無序的屬性集合，無法有意義排序物件值，若要排序就改用陣列

- 除了必須為值配上有意義標籤情況下，應改用物件取代

- 不同於陣列，物件沒有 length 屬性，無法得知屬性的數量

- 物件呈現與一種事物相關的不同資訊，例如：員工、書中的章節

- 陣列表現許多事物的相同資訊，例如：級別、姓名清單

參考 MSDN 建立物件：[https://msdn.microsoft.com/zh-tw/library/202863ha(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/202863ha(v=vs.94).aspx)

存取單一物件屬性

一旦建立物件，必須知道如何存取其屬性，用來單獨存取物件屬性的標記法有兩種：

1. 物件標記法

物件變數 . 屬性名稱　=：賦值運算子　值

```
var obj = {
  name: 'May',
  age: 24,
  car:{
      brand: 'Honda',
      model: 'Fit',
      year: 2008
  },
  favoriteColor: ['Black', 'Blue', 'Red']
};

obj.age;
obj.car;                          //取得 car 屬性的物件
obj.car.model;                    //取得 car 屬性中的 model 屬性
obj.favoriteColor;                //取得 favoriteColor 屬性中的陣列
obj.favoriteColor[2];             //取得陣列中的第 2 個元素

obj.age = 18;                     //更改 age 屬性
obj.favoriteColor[2] = 'Pink';    //更改陣列中第 2 個元素的屬性
obj.sex = 'Female';               //新增屬性
```

2. 陣列標記法

物件變數　[‘屬性名稱’]　=　值

```
//此寫法與上述物件標記法相同
var obj = {
  name: 'May',
  age: 24,
  car:{
      brand: 'Honda',
      model: 'Fit',
      year: 2008
  },
  favoriteColor: ['Black', 'Blue', 'Red']
};

obj['name'];
obj['car'];
obj['car']['brand'];
obj['favoriteColor'];
obj['favoriteColor'][2];

obj['age'] = 18;
obj['favoriteColor'][2] = 'Pink';
obj['sex'] = 'Female';
```

為什麼會有陣列標記法？

在有些情況下無法使用物件標記法，可以使用陣列標記法，因其允許以「運算式代替文字值」，以便動態找尋屬性。
如果存在 obj 物件，假設一個字串代表屬性名稱： var prop = ‘title’;
若使用 obj.prop 會找到 obj 裡的 prop 屬性，但使用 obj[prop] 會找到 obj 下的 title 屬性

確認屬性存在

有三種方式可以確認物件是否有此屬性：

使用`objName.propertyName`，但可能因為屬性質是 false、空字串、0，而被當作不存在。

```
if( obj.prop ){
  ...
}
```

用 `in` 運算子，語法為 `'propertyName' in objName`，找到屬性就返回 true。

```
if( 'prop' in obj ){
  ...
}
```

用 `typeof` 運算子，前提是已知屬性的類型。

```
if( typeof obj.prop == 'number' ){
  ...
}
```

參考 MSDN typeof 運算子：[https://msdn.microsoft.com/zh-tw/library/259s7zc1(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/259s7zc1(v=vs.94).aspx)

存取所有物件屬性

物件標記法不要求知道物件存在哪些屬性，可以使用 for-in 迴圈存取所有物件屬性，使用 for-in 迴圈有幾點要注意：

- 屬性不會以任何特定順序返回，甚至不會以建立物件時的順序回傳

- 根據物件不同，可能最終看到並未建立的屬性（此情況與 JavaScript 原型繼承（prototypes）有關）

- 必須以「陣列標記法」尋找每個屬性值

- for-in 迴圈是較慢的結構，應該只出現在沒有其他迴圈可用的時候

for(var 屬性變數 in 物件變數 ){ … }

```
for(var prop in obj){
  ...
}
```

可建立一個物件檢查器 `console.log`，提供物件屬性回饋的極佳偵錯工具
迴圈內可以使用 `typeof` 運算子區分物件的屬性（變數）和方法(函數)：

```
if( typeof obj[prop] == 'function' ){
  ...
}
```

```
var obj = {
  name: 'Lisa',
  age: 24,
  weight: 55,
  height: 160,
  BMI: function(){                                     //方法，計算 BMI
  	return (obj.weight/Math.pow(obj.height, 2)).toPrecision(4)*10000;
  },
  favoriteFood: ['Salad', 'Bread', 'spaghetti']
};

for(var prop in obj){                                  //用 for-in 迴圈輸出並檢查是方法或屬性
  if(typeof obj[prop] == 'function'){
    document.write(prop + '(方法): ' + obj[prop]() + '<br>');
  }else{
    document.write(prop + '(屬性): ' + obj[prop] + '<br>');
  }
}
```

JavaSciprt 中不可變和可變的物件

在 JavaScript 中幾乎一切都是物件或作為物件處理，例如下列程式建立字串
var name = ‘Domo’;
但之後呼叫該變數的方法時，仍是一個字串物件：name.toLowerCase()
簡單類型和複雜類型實際上的區別是：複雜類型（Data、Array、Object）是易變的，內容值隨時可變。
當在修改簡單類型的值，JavaScript 在背景建立一個新的變數並摧毀舊的，這些方法並不修改原來的值，而是返回修改後的值。

參考 MSDN in 運算子：[https://msdn.microsoft.com/zh-tw/library/9k25hbz2(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/9k25hbz2(v=vs.94).aspx)

刪除物件屬性

刪除物件屬性唯一的方法是使用 `delete` 運算子：

- delete 物件名稱 . 屬性名稱： 直接使用物件標記法刪除元素

```
var obj = {
  name: 'May',
  age: 24,
  car:{
      brand: 'Honda',
      model: 'Fit',
      year: 2008
  },
  favoriteColor: ['Black', 'Blue', 'Red']
};

delete obj.name;

delete obj.car;
```

參考 MSDN delete 運算子：[https://msdn.microsoft.com/zh-tw/library/2b2z052x(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/2b2z052x(v=vs.94).aspx)

參考或引用資料：

物件 Object：[http://test.domojyun.net/MEMO/JavaScript/5_object.html](http://test.domojyun.net/MEMO/JavaScript/5_object.html)

本文整理內容參考《[JavaScript 設計與開發 透視新技術關鍵+完全實力養成](http://www.drmaster.com.tw/Bookinfo.asp?BookID=PG21344)》此書，純屬個人學習整理分享，非商業用途
本書作者：[LarryUllman](http://www.larryullman.com/)

以上內容純屬個人學習整理分享，學術使用，非商業用途，如有任何侵權 ，請告知，立即刪除。
