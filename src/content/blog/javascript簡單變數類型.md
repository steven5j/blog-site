---
title: "[JavaScript]簡單變數類型"
description: "所有的程式設計工作都可以歸結對「某些資料」進行「某種操作」，而變數就是代表「資料」的存在：變數是一個臨時的儲存 [&hellip;]"
pubDate: 2021-04-15
topic: software
series: javascript
heroImage: /public/uploads/wp/6036.jpg
wpId: 6036
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/15/javascript%e7%b0%a1%e5%96%ae%e8%ae%8a%e6%95%b8%e9%a1%9e%e5%9e%8b/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/簡單變數類型-1024x576.jpg)

所有的程式設計工作都可以歸結對「某些資料」進行「某種操作」，而變數就是代表「資料」的存在：變數是一個臨時的儲存容器。這裡的簡單變數指的是「一次指儲存單一的資訊片段」，包含數值、字串、布林值。
參考 MSDN 變數：[https://msdn.microsoft.com/zh-tw/library/67defydd(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/67defydd(v=vs.94).aspx)

1.變數宣告

變數宣告是為了正式承認它的存在，以下為變數宣告的四個部份：
var　變數名稱　=：賦值運算子　變數值
const 常數名稱　=：賦值運算子　常數值
var 用來宣告一個變數，使不使用與作用域（Scope）有關；const 用來宣告一個常數

命名規則

為了建立一變數，必須給它名稱，又稱為「識別子（Identifier）」，命名方式有：

- 開頭是字母（a-z/A-Z）、底線（）、錢符號（$） 其餘可包含字母（a-z/A-Z）、底線（）、數值（0-9）

- 不能使用 JavaScript 保留字、空格、標點符號或其他字元，可採用獨特和描述性的名稱，避開保留字

- 通常為「駝峰式」區分大小寫

```
var value = 'area';      //宣告變數
const CONST = 3.14;      //宣告常數
```

常數通常會用「全大寫字」和「底線」命名參考 MSDN JavaScript 保留字：[https://msdn.microsoft.com/zh-tw/library/0779sbks(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/0779sbks(v=vs.94).aspx)
參考 MSDN 為變數命名：[https://msdn.microsoft.com/zh-tw/library/67defydd(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/67defydd(v=vs.94).aspx)

宣告方式

除了一般宣告之外，var 還可以一次宣告多個變數，通常合併是方便組合宣告，然而不一定要在宣告時初始化變數，有時這麼做是有意義的，可以依照不同變數需求而改變宣告方式。

```
var fullname = 'Domo Huang';                  //一般宣告
var firstname = 'Domo', lastname = 'Huang';   //一次宣告並賦值多個變數
var a, b, c;                                  //一次宣告多個變數，但不賦值

var rate;
rate = 5.25;
```

宣告型別

型別分成數值（Number）、字串（String）、布林值（Boolean）、陣列（Array）、物件（Object）五種，沒有定義就為 Undefined，因 JavaScript 是弱型別語言，所以直接賦值即可，甚至在變數相加的情況會自動轉換型別。

- Number 不帶引號，可以是任何位數的數值，包含數字、小數點、正負數符號、字元「e」（指數記法），不包含千分位的逗號。

- String 需包含單引號或雙引號，出現特殊字元時要在字元前面加上「\」。

- Boolean 只有 0 和 1、true 和 false，有大小寫之分。

 Number、String、Boolean，三者為簡單變數類型；Array 和 Object 則是複雜變數類型。

- null 被定義為無值，最適合表示沒有結果的操作，例如運作時呼叫 Ajax 的結果可以是 null，說明沒有返回值。

- undefined 指未設定值，通常是沒有操作結果，例如宣告變數時未賦值。

```
//直接賦值定義型別（文字語法）
var vUndefined;                                         //沒有賦值，輸出時就為 undefined
var vNum = -1.234;                                      //數字 Numer
var vStr = 'string';                                    //字串 String
var vArr = ['元素1', '元素2', '元素3'];                  //陣列 Array
var vObj = { firstName:"Domo", lastName:"Huang" };      //物件 Object
var bool1 = 1, bool2 = 0, bool3 = true, bool4 = false;  //布林 Boolean，Boolean(值)： 轉換成布林

//正式型別宣告（物件語法）
var vNum = new Number(2);
var vStr = new String('JavaScript');
var vBool = new Boolean(false);
var vArr = new Array;
var vObj = new Object;
```

參考 MSDN 資料型態：[https://msdn.microsoft.com/zh-tw/library/7wkd9z69(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/7wkd9z69(v=vs.94).aspx)

宣告範圍

變數分成區域變數、全域變數、常數

- 區域變數：var 宣告的變數，只有在函數執行期間（也就是呼叫函數時）有效。

- 全域變數：在函式外宣告的變數，可以在程式中任何地方使用，但避免無意使用的原因：- 應用程式應該堅守「僅完成必要得最少功能」的原則，不是絕對必要，就不需宣告為全域變數。

- 對程式性能不利，應用程式必須持續維護變數存在，甚至在不使用的情況下也是如此。

- 當全域變數與程式庫變數或其他變數同名，容易造成衝突及邏輯錯誤。

- 常數：分為開發者使用 const 宣告以及 JavaScript 內建預定的常數，作用類似全域變數，可以在任何地方使用。

※在所有函數外部宣告的變數，即使有 var 宣告，相對於函數仍有全域變數作用。
※區域變數優先於全域變數，亦即若宣告了一個與全域變數相同名稱的區域變數，函式中的程式將會使用區域變數，而非全域變數。
※const 關鍵字並沒有得到所有瀏覽器支援，在某些 IE 中無法辨識，不建議在 JavaScript 中建立自己的常數。

```
globalValue = 'globel';      //宣告全域變數
var areaValue = 'area';      //宣告區域變數
const CONST = 3.14;          //宣告常數
```

參考 MSDN JavaScript 常數： [https://msdn.microsoft.com/zh-tw/library/ff818462(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/ff818462(v=vs.94).aspx)

2.使用數值（型別：Number）

建立數值

Number 不帶引號，可以是任何位數的數值，包含數字、小數點、正負數符號、字元「e」（指數記法），不包含千分位的逗號。

```
var vNum = -1.234;              //沒有宣告型別
var vNum = new Number(-1.234);  //正式宣告型別
```

算術運算子

和許多語言不同，JavaScript 只有一種數值類型，用來代表從整數、雙精準度（小數或實數）到指數記法的任何數值，能安全表示高達9*1015的數值。
運算式以「先乘除後加減」為原則，請參照其他優先順序[參考 MDN 網站算術運算子的優先順序](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E9%81%8B%E7%AE%97%E5%AD%90#.E9.81.8B.E7.AE.97.E5.AD.90.E7.9A.84.E5.84.AA.E5.85.88.E9.A0.86.E5.BA.8F)。

- Infinity： 無限值

- NaN： 不是一個數值（Not a Number）

- isNaN( 數值 )： 檢查是否是數值

- isFinite( 數值 )： 檢查是否是有限數值

```
var row1 = 1 + 1;
var row2 = 10 - 5;
var row3 = 10 * 3;
var row4 = 12 / 3;
var row5 = 100 % 6;
var row6 = 2 / 0;
var row7 = 'letter' / 1;

row1 ++;
++ row1;
row1 --;
-- row1;

row3 *= 0.5;
row4 /= 2;

isNaN(row5)
isNaN(row6)
isNaN(row7)
isFinite(row5)
isFinite(row6)
isFinite(row7)
```

參考 MSDN 計算運算子：[https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/6hsc0eak(v=vs.94).aspx)
參考 MSDN 運算子優先順序：[https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/z3ks45k7(v=vs.94).aspx)

格式化數值

JavaScript 的數值不僅是一個數字，還是 Number 類型的一個物件，內建方法可使數值返回一個精確到指定小數位數的數值

- .toFixed( 數值 n )： 限制數值顯示到小數點後 n 位數

- .toPrecision( 數值 n )： 限制數值顯示從整數開始算到小數共 n 位數

```
var total = 524.1234567890;
total.toFixed(2);
total.toFixed(5);
total.toPrecision(6);
total.toPrecision(4);
total.toPrecision(2);
total.toPrecision(1);
```

若限制數值小於整數位數，則顯示科學符號，例如 5.2e+2 就是 5.2*102參考 MSDN Number 物件：[https://msdn.microsoft.com/zh-tw/library/dwab3ed2(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/dwab3ed2(v=vs.94).aspx)

Math 物件

Math 物件是 JavaScript 的一個全域物件，物件內有幾個預先定義的常數，如 π （圓周率 3.14）和 E （2.71），值為固定，常數名稱都大寫。 Math 常數 Math 方法

- Math.abs( 數值 )： 取絕對值

- Math.ceil( 數值 )： 取無條件進位後的值

- Math.floor( 數值 )： 取無條件捨去後的值

- Math.round( 數值 )： 取四捨五入的值

- Math.pow( 數值 , n 次方 )： 返回值的 n 次方

- Math.max( 數值 , 數值 , 數值 … )： 返回 0 或取數列中的最大值

- Math.min( 數值 , 數值 , 數值 … )： 返回 0 或取數列中的最小值

- Math.random()： 返回 0 （含）到 1 （不含）之間的隨機亂數

```
Math.abs(-5236);
Math.ceil(5.5146);
Math.floor(5.5146);
Math.round(5.5146);
Math.pow(2,10);
Math.max(3,4,5,4,1,8,4,5);
Math.min(3,4,5,4,1,8,4,5);
Math.random();

//試算圓的公式
var radius = 12;
var area = Math.PI * Math.pow(radius,2);
var volume = Math.PI * (4/3) * Math.pow(radius,3);
```

參考 MSDN Math 物件：[https://msdn.microsoft.com/zh-tw/library/b272f386(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/b272f386(v=vs.94).aspx)

3.使用字串（型別：String）

建立字串

String 需包含單引號或雙引號，出現特殊字元時要在字元前面加上反斜線（\）。

```
var vStr = "I\'m Domo.";              //沒有宣告型別
var vStr = new String('I\'m Domo.');  //正式宣告型別
```

字串拆分

建立字串時，僅需要在任意內容加上引號，建立完後，可以用多種方式拆解字串，常見屬性及方法如下：

- .length： 變數的字串長度

- .charAt( 索引值 )： 找字串中對應索引值的字元

- .indexOf( 字元/字串 )： 找字串中第一次出現對應”字元/字串”的”索引值/起始值”，沒有則返回 -1
.indexOf( 字元/字串 , 數值 n )： 從第 n 個索引值開始找第一次出現對應的”索引值/起始值”，沒有則返回 -1

- .lastIndexOf( 字元/字串 )： 找字串中最後一次出現對應”字元/字串”的”索引值/起始值”，沒有則返回 -1
.lastIndexOf( 字元/字串 , 數值 n )： 從 0 到第 n 個索引值中找最後一次出現對應的”索引值/起始值”，沒有則返回 -1

- .slice( 字元 )： 以索引值為起始，往後讀取字串，若為負值就往後計算
.slice( 索引值 [from] , 索引值 [to] )： 索引值 [from] 到索引值 [to] 之間的字串

- .split( (‘分隔元素間的文字’) )： 將字串分割，可存取成陣列來讀取

```
var fullName = 'Domo Huang goes to Domo Store to buy a Domo doll with Domo\'s mom';
fullName.length;

fullName.charAt(0);
fullName.charAt(4);
fullName.charAt(8);
fullName.charAt(70);           //找不到返回空白

fullName.indexOf('D');
fullName.indexOf(' ');
fullName.indexOf('n');
fullName.indexOf('j');          //找不到返回-1

fullName.lastIndexOf('D');
fullName.lastIndexOf(' ');
fullName.lastIndexOf('n');
fullName.lastIndexOf('j');      //找不到返回-1

fullName.indexOf('o');
fullName.lastIndexOf('o');
fullName.indexOf('o',30);
fullName.lastIndexOf('o',30);

fullName.indexOf('Domo');
fullName.lastIndexOf('Domo');
fullName.indexOf('Domo',30);
fullName.lastIndexOf('Domo',30);

fullName.slice(32);
fullName.slice(0,4);
fullName.slice(-7);             //索引值若為負，將往後循環計算
fullName.slice(2,-7);           //從 2 到 -7 之間的字串

var str = 'Huang, Domo';
var strArr = str.split(',');    //分隔後，存給一個陣列
```

參考 MSDN String：[https://msdn.microsoft.com/zh-tw/library/ecczf11c(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/ecczf11c(v=vs.94).aspx)

字串操作

字串使用「連接」改變其值，類似字串的加法，將更多字元加到現有字串中，事實上，JavaScript 的連結運算子就是算術的加法運算子（+）。此外有可幫助字串連結的方法：

- .trim()： 將字串前後空格去掉

- .concat()： 也是字串相加，但較少使用，且沒有累加效果

- .toLowerCase()： 將字串轉換為小寫

- .toUpperCase()： 將字串轉換為大寫

```
var message = ' Hello, ';
message = message + 'Domo ';
message += 'Jiun! ';
message.trim();
message.concat(' How ', 'do ', 'U ', 'do?');

message.indexOf('jiun');                      //如果大小寫不符會找不到！
message.toLowerCase().indexOf('jiun');        //改成都小寫，較好找到要尋找的字串
message.indexOf('DOMO');
message.toUpperCase().indexOf('DOMO');
```

跳脫字元

字串中有某些具有意義的轉義序列（Escape Sequences），需要在插入引號之前加上反斜線（\）。
※注意這些轉義序列適用於單引號或雙引號，但在 PHP 等語言則不同，只能使用於雙引號內

```
document.write('純字元');
document.write('\'單引號\'');
document.write('\"雙引號\"');
document.write('\\反斜線\\');
document.write('換行(Enter鍵)\n我換行了！');
document.write('倒退(Backspace鍵)\b我倒退了！');
document.write('水平跳格(Tab鍵)\t我水平跳格了！');
document.write('垂直跳格(Tab鍵)\v我垂直跳格了！');
document.write('歸位\r我歸位了！');
document.write('換頁\f我換頁了！');
```

參考 MSDN 特殊字元：[https://msdn.microsoft.com/zh-tw/library/2yfce773(v=vs.94).aspx](https://msdn.microsoft.com/zh-tw/library/2yfce773(v=vs.94).aspx)

4.轉換型別

JavaScript 是弱型別的語言，可以一起使用不同類型的值也不會發生錯誤，例如數值與字串連接，JavaScript 會自動把數值轉換成字串，但一不小心還是會發生邏輯錯誤，因此使用強制轉換，就不擔心臭蟲（bug）發生。

轉換為數值型別

- Number( 值 )： 將值轉為數字

- parseInt( 值 )： 將值轉為整數
parseInt( 值 , 基數（Radix） )： 將值以基數值進制，包括 base-8（八進位）、base-10（十進位）、base-16（十六進位）轉成整數，預設是十進位

- parseFloat( 值 )： 將值轉成浮點數

- + 值 或 +( 值 )： 一樣將值轉為字串，這兩種方法也是轉換型別，雖一元運算子執行快速，但不如 parseInt() 和 parseFloat() 來得易讀

```
var date = new Date();
Number('123456');
Number('20.5678 and String!');    //字串不能直接轉成數字
Number(date);                     //時間會自動轉換成時間戳記

parseInt('20.5678');
parseInt('20.5678', 10);          //以 10 進位成整數，預設為 10 進位
parseInt('20.5678 and String!');  //字串會以出現在開頭的數字作轉換
parseInt('20.5678 22');
parseInt(' 20.5678 ');            //字串開頭的空白會被省略
parseInt('String! 20.5678');      //字串前面沒有數字，回傳 NaN

parseFloat('20.5678');
parseFloat('20.5678 and String!');
parseFloat('20.5678 22');
parseFloat(' 20.5678 ');
parseFloat('String! 20.5678');

var num = 1000, stringShip = '20', numTotal = 0, strTotal = '';
strTotal = num + stringShip;
numTotal += +stringShip;
numTotal += +(stringShip);

Number(undefined);                //undefined 轉數值變 NaN
Number(null);                     //null 轉數值變 0
```

轉換為字串型別

- String( 值 )： 將值轉為字串

- .toString()： 直接將數值轉成字串，減少錯誤機率

```
var date = new Date();
var numTotal = 1000;
var stringShip = '20';
String(123456);
String('20.5678 and String!');
String(date);                   //時間會自動轉換成字串，跟預設值一樣

var stringMessage = '總共 $' + numTotal.toString();
```

轉換為布林型別

- Boolean( 值 )： 將值轉為布林值（true／false 或 1／0）

```
var date = new Date();
Boolean('123456');                //只要內容有正常數值或字串，皆為 true
Boolean('20.5678 and String!');
Boolean(date);
Boolean(-123);
Boolean(0);
Boolean(false);
Boolean();
Boolean(undefined);
Boolean(null) =>;
```

5.註解

單行註解

- //： 兩條斜線之後到該行結束前的內容就是註解

```
//參數設定
var n = 1;
n++;  //累加
```

多行註解

- /* */： 「/*」開頭到「*/」結尾內的內容就是註解，常用來為檔案或函數增加更詳細的說明

```
也可作為偵錯工具：只要將可能有問題的程式碼放在這兩個關鍵字組合之間，就能使程式碼「鈍化」，而不需要從腳本中刪除。
通常不建議在文字中加入過多註解，他應全面且準確，修改程式碼時一定要更新註解。

```

```
/*
 *多行註解說明
 *多行註解說明
 *中間註解採用星號是慣例，但不是絕對必要
*/

/*var n = 1;
n++;*/
```

參考或引用資料：

事件處理：[http://test.domojyun.net/MEMO/JavaScript/7_event.html](http://test.domojyun.net/MEMO/JavaScript/7_event.html)

本文整理內容參考《[JavaScript 設計與開發 透視新技術關鍵+完全實力養成](http://www.drmaster.com.tw/Bookinfo.asp?BookID=PG21344)》此書，純屬個人學習整理分享，非商業用途
本書作者：[LarryUllman](http://www.larryullman.com/)

以上內容純屬個人學習整理分享，學術使用，非商業用途
