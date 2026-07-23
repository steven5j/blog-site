---
title: "[JavaScript]陣列 Array(數組)"
description: "陣列有別於簡單變數類型（數值、字串和布林值），每次只能代表一個值，陣列為複雜變數類型之一，常用在需要同時儲存多 [&hellip;]"
pubDate: 2021-04-22
topic: software
heroImage: /public/uploads/wp/6091.jpg
wpId: 6091
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/22/javascript%e9%99%a3%e5%88%97-array%e6%95%b8%e7%b5%84/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/JavaScript陣列-Array數組-1024x576.jpg)

陣列有別於簡單變數類型（數值、字串和布林值），每次只能代表一個值，陣列為複雜變數類型之一，常用在需要同時儲存多種值時，實際應用時則複雜一些，可將陣列看作一堆值的清單，除此之外，一般常以陣列來操作表單資料，或者處理由請求伺服器返回的資料。
參考 MSDN 陣列：[https://msdn.microsoft.com/zh-tw/library/5kh4af6c(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/5kh4af6c(v=vs.94).aspx)

建立陣列

陣列命名規則和一般變數相同，建立和存取方法和簡單變數類型有顯著差異。
建立陣列有兩種方法：

1. 物件語法（new 運算子）

與建立新 Date 物件的方法 `var today = new Date();`、簡單類型宣告型別的方法 `var vNum = new Number(2);` 類似，使用 `new` 運算子。
var　變數名稱　=：賦值運算子　new：建立運算子　Array()

```
var arr = new Array();                                  //清單中未定義任何值為「空陣列」
var arr = new Array(3);                                 //只寫一個數值為陣列的「元素數量」
var arr = new Array(1, 2, 3);                           //兩個數值以上為「元素值」
var arr = new Array(true, false);
var arr = new Array('Fred', 'Peter', 'Andy', 'David');  //元素值中字串需加引號
```

2. 文字語法

類似建立賦值的簡單類型變數 `var vNum = -1.234;` 一樣，使用文字（Literal）語法，並以中括號作為陣列標記，此法較為常見，且程式人員通常偏愛用文字語法產生任意的標準變數類型（Date 物件是例外，它沒有同等的文字語法）。
var　變數名稱　=：賦值運算子　[ ]

```
var arr = [];                                          //清單中未定義任何值為「空陣列」
var arr = [1, 2, 3];                                   //兩個數值以上為「元素值」
var arr = ['Fred', 'Peter', 'Andy', 'David'];          //元素值中字串需加引號
var arr = [true, false];
var arr = [1, 'Fred', 'Peter', 'Andy', 2, 'David'];    //也可以混合儲存的型別
```

常用屬性 .lenght

一旦建立陣列後，就可以檢查陣列的 length 屬性，瞭解陣列內項目的數量。

- .length： 抓取陣列項目的數量

※字串的 length 屬性反應字串中字元的個數，而與陣列的 length 不同，有時不能準確表示陣列項目的數量，原因和陣列項目存放及存取方式有關。

```
var arr = [1, 'Fred', 'Andy', 2, 'David'];
arr.length;
```

適合使用陣列的情況

與物件相比，以下情況較適合用陣列，其他情況都應使用物件：

- 值的儲存順序很重要

- 值可以是數值型索引

- 可能需要很快知道儲存了多少值

- 物件呈現與一種事物相關的不同資訊，例如：員工、書中的章節

- 陣列表現許多事物的相同資訊，例如：級別、姓名清單

存取單一陣列元素

當存取單一陣列元素時，透過中括號存取項目，陣列元素索引值從 0 開始，在此可讀取、修改、新增單一元素。
※使用 `alert()` 或 `console.log()` 輸出陣列，會自動印出所有元素，每個元素以逗號隔開（在控制台中，陣列以建立時的文字語法顯示）。

```
var colors = ['red', 'blue', 'yellow', 'green'];
colors[0];                             //讀取元素
colors[2] = 'pink';                    //修改元素
colors[4] = 'gray';                    //新增元素（知道元素數量）

colors[10] = 'purple';                 //賦值給排序較後面的元素，中間的元素皆為空值

colors.length;
colors[colors.length] = 'black';       //新增元素（不知元素數量）
```

舉例，宣告一個月份陣列，使用中括號讀取當日月份；另外也可利用 `.indexOf()` 尋找陣列內的元素字串：

```
//列好對應月份的名稱
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var now = new Date();
var thisMonth = months[now.getMonth()];   //印出對應今天月份的名稱

months.indexOf('April');                  //可搜尋陣列，返回索引值
months.indexOf('march');                  //搜尋不到，返回 -1
```

存取所有陣列元素

在不需要知道具體索引之下可以使用「迴圈」取出所有元素，索引從 0 開始，最大索引是陣列的 length-1。
※機於性能因素，更好的做法是將陣列的 length 屬性指派給另一個變數，避免每次都要再尋找一次 length 屬性。

```
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

for(var i=0; i < months.length; i ++){                //使用 for loop 取出所有元素
  document.write(months[i]);
}

var index = 0;
while(index < months.length){                         //使用 while loop 取出所有元素
  document.write(months[index]);
  index ++;
}

var order = [1, undefined, 3,  , 5];
//最好的作法是在迴圈第一個子句將陣列的 length 屬性指派給另一個變數
for(var i=0, count = order.length; i < count; i ++){

  //使用文字語法抓取元素，當元素不全等於 undefined 時返回真
  if(order[i] !== undefined){
      document.write(order[i] + ' exit');
  }else{
      document.write(order[i] + ' no exit');
  }

  //使用 in 運算子，當索引存在於陣列時返回真，但 undefined 在此會返回真
  if(i in order){
      document.write(order[i] + ' exit');
  }else{
      document.write(order[i] + ' no exit');
  }
}
```

稀疏陣列

「稀疏陣列」為陣列裡的漏洞，由以下情況會產生：

- 刪除一個元素

- 使用大於 length 的數值作為新增元素的索引位置

- 建立陣列時跳過一些值

- 建立陣列時跳過陣列值，建議未定義的值不要空白，而是填上 undefined 例如：var array = [1, , 3, , 5]; 應改成 var array = [1, undefined, 3, undefined, 5];

不要在最後一個元素的位置使用空的逗號，JavaScript 將忽略它（舊型瀏覽器會因此而阻塞）。

參考 MSDN in 運算子：[https://msdn.microsoft.com/zh-tw/library/9k25hbz2(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/9k25hbz2(v=vs.94).aspx)

刪除陣列元素

透過 `delete` 運算子可以從陣列中刪除一個元素，刪除的元素的索引值仍然存在，只是變為 `undefined`（也可說是陣列在這裡有個「漏洞」了）。

- delete 陣列變數 [ 索引值 ]： 使用中括號和索引值刪除元素

※刪除特定陣列元素不會改變陣列的 length 值。

```
var order = [1, 2, 3, 4, 5];
delete order[0];
```

參考 MSDN delete 運算子：[https://msdn.microsoft.com/zh-tw/library/2b2z052x(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/2b2z052x(v=vs.94).aspx)

陣列方法

除了上述存取的方法之外，JavaScript 還提供內建的陣列方法。

新增/刪除陣列元素

- .push( 值 1 , 值 2 …)： 新增最後一個元素並返回，這種方法比 `array[array.length]` 常用且更討喜，如果新增的值是陣列，就會原封不動新增到陣列中，變成所謂的多維陣列。

- .pop()： 刪除最後一個元素並返回，可利用此特性「將值賦予變數或作其他用途」。

- .unshift( 值 1 , 值 2 …)： 強制新增的項目在陣列開頭，並將現有元素往後推，因此執行速度較 `.push()` 慢。

- .shift()： 刪除陣列的第一個元素並返回，因此執行速度較 `.pop()` 慢。

- .concat( 值 1 , 值 2 …)： 目的是連接陣列，若是放入陣列，會把陣列展開成單獨元素，再增加元素到陣列中，可利用這點作「多維陣列平面化為一維陣列」。

```
var arr = [];                                     //一開始為空陣列
arr.push(1);                                      //新增一個元素
arr.push(2, 3, 4);                                //在最後新增 3 個元素
arr.push(5, 6, ['7_1', '7_2', '7_3']);            //在最後新增 3 個元素
arr.unshift(8, 9);                                //在開頭新增 2 個元素
arr.unshift(10, ['11_1', '11_2']);                //在開頭新增 2 個元素

var concatArr = arr.concat(12,['a', 'b', 'c']);   //在最後新增 2 個元素並多維陣列平面化給 concatArr 陣列

var pop = arr.pop();                              //在最後刪除 1 個元素，並賦值給 pop 變數
concatArr.pop();                                  //在 concatArr 陣列最後刪除 1 個元素
concatArr.shift();                                //在 concatArr 陣列開頭刪除 1 個元素
```

堆疊 vs 佇列

push() 和 pop() 會比 unshift() 和 shift() 還快，全取決於陣列用途：

- push() 和 pop() 是堆疊式後進先出（LIFO）的資料型態，陣列會被當作堆疊（Stack）看待

- unshift() 和 shift() 是佇列式先進先出（FIFO）的資料型態，陣列會被當作佇列（Queue）處理

參考 MSDN push 方法：[https://msdn.microsoft.com/zh-tw/library/6d0cbb1w(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/6d0cbb1w(v=vs.94).aspx)
參考 MSDN pop 方法：[https://msdn.microsoft.com/zh-tw/library/hx9fbx10(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/hx9fbx10(v=vs.94).aspx)
參考 MSDN unshift 方法：[https://msdn.microsoft.com/zh-tw/library/ezk94dwt(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/ezk94dwt(v=vs.94).aspx)
參考 MSDN shift 方法：[https://msdn.microsoft.com/zh-tw/library/9e7b4w20(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/9e7b4w20(v=vs.94).aspx)
參考 MSDN concat 方法：[https://msdn.microsoft.com/zh-tw/library/2e06zxh0(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/2e06zxh0(v=vs.94).aspx)

插入／剪切陣列元素

- .splice( 起始索引值 , 刪除的元素量, (插入的新值), (插入的新值), …)： 從中改變陣列元素，並返回「刪除的元素陣列」。

- .slice( 起始索引值 , (結束索引值 [預設為最後一個元素]) )： 返回對應元素，只做回應，不影響原始陣列，即使只有一個元素，也是返回一陣列。

```
var arr = [1, 2, 3, 4, 5, 6];
var spliceValue = arr.splice(0, 2);     //從 0 開始刪除 2 個元素，並賦值給 spliceValue 變數
arr.splice(2, 0, 7, 8, 9);              //從 2 開始刪除 0 個元素，並在後面新增 3 個元素
arr.splice(-2, 1);                      //從 -2 開始刪除 1 個元素（負數為從字尾倒數的索引值）

var sliceValue1 = arr.slice(0);         //返回從 0 到最後的陣列
var sliceValue2 = arr.slice(1, 4);      //返回從 1 到 4 的陣列
var sliceValue3 = arr.slice(-2);        //返回從 -2 到最後的陣列（負數為從字尾倒數的索引值）
var sliceValue4 = arr.slice(-4, -1);    //返回從 -4 到 -1 的陣列
```

參考 MSDN splice 方法： [https://msdn.microsoft.com/zh-tw/library/wctc5k7s(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/wctc5k7s(v=vs.94).aspx)
參考 MSDN slice 方法： [https://msdn.microsoft.com/zh-tw/library/tkcsy6fe(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/tkcsy6fe(v=vs.94).aspx)

字串與陣列轉換

程式碼經常要進行陣列和字串之間的轉換，便可利用以下方法：

- .join( (‘分隔元素間的文字’ [預設為 ,]) )： 將陣列用符號連結，並轉為字串

- .split( (‘分隔元素間的文字’) )： 將字串分割，可存取成陣列來讀取

※實際上，JavaScript 在每次連接時都會建立一個新字串（拋棄舊的陣列），因此造成效能不佳，所以許多開發人員會寧願建立一個字串陣列，然後連接陣列的各部份，以便建立最終的字串，最後再呼叫 split() 分解字串或字元。

```
var arr = ['one', 'two', 'three', 'four', 'five'];
var joinArray = arr.join('-');                        //連結符號「,」改成 「-」

var arrayList = '';
arrayList += '<ol><li>';
arrayList += arr.join('</li><li>');
arrayList += '</li></ol>';

var strMessage = 'one,two,three,four,five';
var arrMessage = strMessage.split(',');               //分隔後，存給一個陣列
for(i in arrMessage)
  document.write(i + '. ' +arrMessage[i] + '<br>');
```

參考 MSDN join 方法： [https://msdn.microsoft.com/zh-tw/library/59x7k999(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/59x7k999(v=vs.94).aspx)
參考 MSDN split 方法： [https://msdn.microsoft.com/zh-tw/library/system.string.split(v=vs.110).aspx](https://msdn.microsoft.com/zh-tw/library/system.string.split(v=vs.110).aspx)

參考或引用資料：

陣列 Array：[http://test.domojyun.net/MEMO/JavaScript/4_array.html](http://test.domojyun.net/MEMO/JavaScript/3_date.html)

本文整理內容參考《[JavaScript 設計與開發 透視新技術關鍵+完全實力養成](http://www.drmaster.com.tw/Bookinfo.asp?BookID=PG21344)》此書，純屬個人學習整理分享，非商業用途
本書作者：[LarryUllman](http://www.larryullman.com/)
