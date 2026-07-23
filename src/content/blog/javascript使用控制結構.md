---
title: "[JavaScript]使用控制結構"
description: "JavaScript 具有大部分程式語言提供的標準條件敘述，其語法來自 Java 和 C，這些敘述都是分支敘述 [&hellip;]"
pubDate: 2021-04-16
topic: software
series: javascript
heroImage: /public/uploads/wp/6053.jpg
wpId: 6053
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/16/javascript%e4%bd%bf%e7%94%a8%e6%8e%a7%e5%88%b6%e7%b5%90%e6%a7%8b/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/JavaScript使用控制結構-1024x576.jpg)

JavaScript 具有大部分程式語言提供的標準條件敘述，其語法來自 Java 和 C，這些敘述都是分支敘述，根據情況將導向不同路徑。
特別注意 Javascript 區分大小寫，條件敘述不能自行改成大寫。

參考程式流程圖繪製：[http://www2.lssh.tp.edu.tw/~hlf/class-1/lang-c/flow/flow-chat.htm](http://www2.lssh.tp.edu.tw/~hlf/class-1/lang-c/flow/flow-chat.htm)

1.if-else & if-else if 條件敘述

若條件成立所執行的程式碼只有一行，JavaScript 允許省略大括號。
單行時，要與 if 同行還是放在下一行，一直都有爭議性，所以有括弧比較易讀，且較不容易出現 bug，若要一行建議都在同一行上，比較清楚

if 條件敘述

如果條件為真（true）就執行大括弧中的敘述；倘若為假（false）則忽略其內的敘述。
if( 條件敘述 ){ … }

```
if( score > 60 ){
  ...
}

if( score > 60 )
  ...

if( score > 60 )  ...
```

```
什麼為真？為準確使用任何類型的控制結構，必須完全掌握語言中的「真」條件，只要知道什麼是假（false），就能知道什麼是真（true），非假即真的道理，除了以下敘述為假，其他為真：false0空字串（""或者''）NaN（非數字）nullundefined
```

if-else 條件敘述

最好將 else 敘述作為預設情況：除非符合特定條件，否則就發生敘述所表達的情況。
if( 條件敘述 ){ … }
else{ … }

```
if( score > 60 ){
    ...
}else{
    ...
}
```

```
if( score > 60 ){
    if( score > 80 ){
        ...
    }else{
        ...
    }
}else{
    ...
}
```

if-else if 條件敘述

多重條件下才使用，基於性能考量，建議從最可能為真的條件開始排序，將求值條件減到最少。
if( 條件敘述一 ){ … }
else if( 條件敘述二 ){ … }
else{ … }

```
if( score > 80 ){
    ...
}else if( score > 60 ){
    ...
}else{
    ...
}
```

```
var score = 65;
if(score > 60){
  document.write('if(score > 60) => true');
}

if(score > 60){
  document.write('if(score > 60) => true');
}else{
  document.write('else => false');
}

if(score > 80){
  document.write('if(score > 80) => true');
}else if(score > 60){
  document.write('else if(score > 60) => true');
}else{
  document.write('else => false');
}
```

```
巢狀結構巢狀結構設計應注意：
縮排下層結構，從視覺上呈現邏輯架構
完整建立一組控制結構，加上所有大括號和小括號，增加巢狀結構
使用註解說明控制結構結束位置，避免解析錯誤
```

參考 MSDN if…else 陳述式：[https://msdn.microsoft.com/zh-tw/library/85yyde5c(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/85yyde5c(v=vs.94).aspx)

2.switch 條件敘述

switch 方案比 if-else if 來得更簡潔易讀，JavaScript 按照順序檢查各條件，直到發生一致性比對：

- case 值 :： 小括號內的運算式將與各種情況（case）比較，運算式就是一個變數，字串一樣要加引號，布林和數字不需要！

- break;： JavaSciprt 會執行後續敘述，直到 break 敘述停止，意指如果未使用 break，switch 剩下的敘述都會被執行。
另外「穿越（Fall through）」讓多種情況有相同結果的敘述，可以不需在每種情況上加 break 敘述。

- default:： default（預設）是可選的條件，一般列在最後，非必要，僅在沒有其他相符情況才執行。
雖沒有必要在最後一種情況加上 break，但是這樣構成平行結構和一致性，有利程式設計品質。

```
switch (x) {
  case 1:
    ...
    break;
  case 2:
    ...
    break;
  case 3:
    ...
    break;
  default:
    ...
}
```

```
var date = new Date();
var day = date.getDay();
switch (day) {
  case 1:
    document.write('Monday');
    break;
  case 2:
    document.write('Tuesday');
    break;
  case 3:
    document.write('Wednesday');
    break;
  case 4:
    document.write('Thursday');
    break;
  case 5:
    document.write('Friday');
    break;
  case 6:
  case 0:
    document.write('Holiday!');
    break;
  default:
    document.write('Hey, no day!');
}
```

參考 MSDN switch 陳述式：[https://msdn.microsoft.com/zh-tw/library/hzc6t81t(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/hzc6t81t(v=vs.94).aspx)

3.隱密型條件敘述

標準 if-else 有兩種變型，語法更隱密而不明顯：

- ( 條件式 ) ? return_if_true : return_if_false： 條件運算子，在其他語言稱三重或三元運算子（有三個部分）
條件運算子根據條件真假返回兩個值中的一個，因只返回一值，通常用來賦值給變數。

```
var even = (n % 2 === 0) ? true : false;

/* 上述等同以下 */
var even;
if((n % 2) === 0){
  even = true;
}else{
  even = false;
}
```

var 變數 = 條件式 || 值： 利用 and 和 or 邏輯運算子求值
不一定返回布林值，也可能是某個運算元的值。

- or 條件中，如果第一個值為真，則總是返回該值。

- and 條件中，如果第一個值為假，則總是返回該值，因為整個條件為假。

```
var x = y || 1;

/* 上述等同以下 */
var x;
if(y){
  x = y;
}else{
  x = 1;
}
```

```
var n = 2;
var statement = (n % 2 == 0) ? '偶數' : '奇數';

var y = 6;
var x = y || 1;

var y = 6;
var z = (y < 10) || (1 + y);

var b = 1;
var a = (b - 1) && (b - 10);

var b = 1;
var c = (b + 1) && (b - 10);
```

參考 MSDN 條件 (三元) 運算子：[https://msdn.microsoft.com/zh-tw/library/be21c7hw(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/be21c7hw(v=vs.94).aspx)

4.條件運算子

比較運算子

- 值 > 值： 大於

- 值 < 值： 小於

- 值 >= 值： 大於等於

- 值 <= 值： 小於等於

- 值 == 值： 等於

- 值  != 值： 不等於

- 值 === 值： 全等（也稱「嚴格相等」：值和型別都相等）

- 值 !== 值： 不全等

```
var x = 20;
if(x > 10)
if(x < 10)
if(x >= 10)
if(x <= 10)
if(x == true)
if(x != true)
if(x === true)
if(x !== true)

if(null === undefined)
if(null == undefined)
if(NaN === '')
if(1 === true)
if(1 !== true)
if(1 == true)
```

兩個相等／全等值之間的差別

```
var n = 0;
if(n){...}
```

雖 n 在條件敘述前才剛賦值，但數值 0 被當作假值，當只使用一個變數作為條件時，JavaScript 將在背景轉換成布林值，所以 n 等同 false，以上該條件應為假，當處理這種情況可採用「嚴格相等」代替，下列條件都為假：

- null === undefined

- ” === NaN

- 1 === true

相反地，以下都為真：

- null == undefined

- null !== undefined

- 1 == true

- 1 !== true

謹守一個原則：若希望確認變數值為 undefined、null、false，而不是類假值（0、null、空字串、undefined）時，應進行全等比較。
另要注意，已經宣告但未賦值的變數，其初始值為 undefined，即使變數的值為 false、0、空字串、null，都不會全等於 undefined。

參考 MSDN 邏輯運算子：[https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx)
參考 MSDN 運算子優先順序：[https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx)

邏輯運算子

條件敘述通常會使用三種邏輯運算子：

- 條件式 && 條件式： 與（and），子條件均為真時才為真

- 條件式 || 條件式： 或（or），至少有一個子條件為真就為真

- ! 條件式： 非（not），對假值進行非運算將為真

一般來說 and 和 or 的優先順序比大部分的運算子低，因此可不用加括號，但 not 的優先順序高於比較運算子，所以使用 not 的時候要有括號的習慣，使用 and 和 or 時， 要另外考慮短路評估（Short circuit evaluation），有效求取條件值，例如 and 條件式中，第一個條件為假，便忽略第二個條件，因已確定條件為假；而在 or 條件式中，第一個條件為真，就不求第二個條件，因已確定條件為真。

```
var x = 20;
if( (x > 10) && (x > 5) )
if( (x < 10) && (x > 5) )
if( (x < 22) || (x > 25) )
if( (x < 10) || (x < 11) )
if( !(x == 20) )
if( !(x < 10) )
if( !(false) )
```

參考 MSDN 邏輯運算子：[https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx)
參考 MSDN 運算子優先順序：[https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx)

處理複雜條件敘述的技巧

數字 Number

- 小數點要格式化運算： 小數點相加減不能保證兩者等於，例如 `x = 1 - .8`, `y = .3 - .1`，因為有整數和浮點數參雜的關係，只能說 x 不小於 y，所以要加上 `.toFixed()` 將小數四捨五入到所需位數，確保數值精確。

- 使用頂層函數作特殊值轉譯比較： 有些特殊值無法做等值比較，例如 `if(NaN === NaN)`，返回 false，如果要檢查數值是否為非數值，可以用 `isNaN()` 或是 `isFinite()`，這兩種方法也會自動轉譯成數值。

字串 String

- 統一轉換大小寫： 字串的比較中使用 `.toLowerCase()` 或 `.toUpperCase()` 轉換，減少大小寫區分的錯誤。

- 搜尋字元不等於 -1： 搜尋字串的方式應該用 `if(message.indexOf('spam') != -1)` ，而不是使用 `if(message.indexOf('spam'))`，因若找不到字串返回 -1，而非 0（false），在此為字串起始位置為 0。

- 運算子比較字母順序：利用大小於運算子可比較字母順序，大寫字母「小於」小寫字母

typeof 運算子

- 高階程式設計中，比起比較變數值和另一個值，更需要比較該值為什麼類型，確認變數的類型往往更加可靠，可使用 typeof 查看物件的型別。

型別返回值

Undefinedundefined

Nullobject

Booleanboolean

Number（包括 NaN）number

Stringstring

Arrayobject

Objectobject

 由於歷史緣由，null 值的類型為 object，但在未來的實作中將變成 null，實際上不需瞭解一個值是否為 null 類型，而是檢查它是否與 null 全等。

```
var x = 1-.8, y = .3-.1;                //JavaSciprt 和其他語言用近似值來代表數值
if(x == y)
if(x.toFixed(2) == y.toFixed(2))

if(NaN === NaN)                         //NaN 這個非數字進行等值或全等比較，也為假
if(isNaN(NaN))                          //當需檢查一個數值變數是否為非數值時，改用 isNaN() 函數才能判定
if(isFinite(x))                         //如果提供的數值不是 NaN 或無限大，isFinite() 就返回 ture

var w = 'domojiun', u = 'DomoJiun';
if(w == u)
if(w.toLowerCase() == u.toLowerCase())
if(w.indexOf('domo'))
if(w.indexOf('domo') != -1)

if('cat' > 'dog')
if('cat' > 'catwalk')
if('cat' > 'Cat')

if(typeof x == 'number')
if(typeof NaN == 'number')
if(typeof w == 'string')
if(typeof null == 'object')
```

5.for 迴圈

迴圈用來重複執行一個動作，使用一種條件來確定是否要執行迴圈內容。
執行 for 迴圈有三個部份：

- 評估初始運算式： 通常用來定義變數或建立所需的任何基準，運算式總會被 JavaScript 執行一次，也僅一次。

- 確定條件： 當條件為真的時候，執行迴圈內容；條件為假時，停止執行（在條件設定不佳，可能會造成無窮迴圈）。

- 執行迴圈後求值： 執行次數運算式會在每完成一次迴圈後，對初始值做變化，意味著與迴圈內容執行次數相同

for( 初始值 ; 條件式 ; 執行次數運算式 ){ … }

```
for(var i=0 ; i<10 ; i++){
    ...
}
```

```
for(var i = 0; i <= 5; i++){
  document.write('i: ' + i + '<br>');
}

for(var i = 0, j = 0; (i + j) <= 10; i++, j += i){
  document.write('i: ' + i + ', j: ' + j + '<br>');
}
```

```
巢狀迴圈使用巢狀迴圈時，要留意語法、大括號，並註解結構說明，變數名稱也要不同，例如：外部迴圈用 i 做計數器，內部迴圈則用 j，以免造成衝突。
```

參考 MSDN for 陳述式：[https://msdn.microsoft.com/zh-tw/library/s1cyybdf(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/s1cyybdf(v=vs.94).aspx)

6.while & do-while 迴圈

for 迴圈和 while 迴圈功能差不多，不過 for 迴圈適用在「知道迴圈次數」的條件下；而 while 則是不知道重複執行次數的情況下使用。在 JavaScript 中較常使用 for 迴圈。
while 迴圈和 do-while 迴圈最大不同是，while 有可能不符合條件會完全不執行；但 do-while 至少執行一次迴圈內容，因為 do-while 的條件判斷是在執行完迴圈才做；while是執行前做判斷。

while 迴圈

while( 條件式 ){ … }

```
while(i < 10){
    ...
}
```

do-while 迴圈

do{ … }while( 條件式 )

```
do {
    ...
}while(i < 10);
```

```
var i = 0;
while(i <= 5){
  document.write('i: ' + i + '<br>');
  i++;
}

var j = 0;
while(j < 0){
  document.write('j: ' + j + '<br>');
  j++;
}
do{
  document.write('j: ' + j + '<br>');
  j++;
}while(j < 0);
```

參考 MSDN while 陳述式：[https://msdn.microsoft.com/zh-tw/library/6wsy66x9(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/6wsy66x9(v=vs.94).aspx)

7.特殊敘述

- break： 即便下次迴圈條件仍為真，也會立即停止執行，用來退出 switch 或 迴圈。
注意 break 停止的是最靠近的控制結構，如果迴圈 A 內有迴圈 B ，而 break 用於迴圈 B，就會結束該迴圈，再返回迴圈 A 中。

- continue： 離開目前迴圈，但不終止整個迴圈結構的執行，意味著再次測試條件，是否再執行取決於條件真假。

- return： 執行該敘述時，程式碼將離開目前函數。

```
for (var i = 1; i <= 50; i++) {
    if (i == 15) {
        break;
    }
    document.write (i + ", ");
}

for (var i = 1; i <= 50; i++) {
    if (i == 15) {
        continue;
    }
    document.write (i + ", ");
}
```

參考 MSDN break 陳述式：[https://msdn.microsoft.com/zh-tw/library/3fhdxafb(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/3fhdxafb(v=vs.94).aspx)
參考 MSDN continue 陳述式：[https://msdn.microsoft.com/zh-tw/library/8de3fkc8(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/8de3fkc8(v=vs.94).aspx)

參考或引用資料：

使用控制結構：[http://test.domojyun.net/MEMO/JavaScript/2_condition.html](http://test.domojyun.net/MEMO/JavaScript/2_condition.html)

本文整理內容參考《[JavaScript 設計與開發 透視新技術關鍵+完全實力養成](http://www.drmaster.com.tw/Bookinfo.asp?BookID=PG21344)》此書，純屬個人學習整理分享，非商業用途
本書作者：[LarryUllman](http://www.larryullman.com/)

以上內容純屬個人學習整理分享，學術使用，非商業用途，如有任何侵權 ，請告知，立即刪除。
