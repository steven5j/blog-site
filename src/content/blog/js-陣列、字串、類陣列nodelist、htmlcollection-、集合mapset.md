---
title: "[JS學習]JS 陣列、字串、類陣列(NodeList、HTMLCollection )、集合(MAP&#038;SET)"
description: "集合 轉換成 陣列 Array.from 用於陣列轉換Array.from 亦可用來轉換 集合(Set &am [&hellip;]"
pubDate: 2020-10-23
topic: software
series: javascript
heroImage: /public/uploads/wp/4696.jpg
wpId: 4696
slug: js-nodelist-htmlcollection-mapset-4696
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/23/js-%e9%99%a3%e5%88%97%e3%80%81%e5%ad%97%e4%b8%b2%e3%80%81%e9%a1%9e%e9%99%a3%e5%88%97nodelist%e3%80%81htmlcollection-%e3%80%81%e9%9b%86%e5%90%88mapset/"
---

集合 轉換成 陣列

Array.from 用於陣列轉換
Array.from 亦可用來轉換 集合(Set & Map)

```
    const arr = [1, 2, 2, 3]
    const newArr = Array.from(new Set(arr))
    console.log(newArr) // [1, 2, 3]
```

字串 & 陣列轉換

陣列轉換成字串使用join()，若不傳值 會以 “,”分割
字串轉陣列使用 split() 和  Array.from()

```
    //  join() 陣列轉換成字串
    const strArr = ['A', 'B', 'C']
    
    let defaultStr = strArr.join()
    let spaceStr = strArr.join('')
    let str = strArr.join('、')
    
    console.log(defaultStr) // A,B,C
    console.log(spaceStr) // A B C
    console.log(str) // A、B、C
    
    // split() 字串轉陣列
    const str = '1 2 3 4 5 6'
    
    // ["1", "2", "3", "4", "5", "6"]
    console.log(str.split(' '))
    
    // Array.from() 字串轉陣列
    cosnt str = 'foo'
    console.log(Array.from(str)) // ["f", "o", "o"]
```

字串轉陣列

split() 將字串轉成陣列
reverse() 反轉陣列
join() 將陣列合併字串

```
    const str = 'Mom Get The Camera'
    const result = str.split('').reverse().join('')
    console.log(result)
```

NodeList、HTMLCollection (類陣列) 與 Array 差異

NodeList 是經由 document.querySelectorAll(),childNodes 產生
HTMLCollection 是經由 document.getElementsByTagName(),children 產生

這兩種皆為類陣列,無法使用陣列型別的method,但可使用索引存取內容

NodeList 為 Browser API，Array 則為 JS API
querySelectorAll(),getElementsByTagName 也為Browser API

NodeList 並非皆是 dynamic lists
意旨當有新的DOM被加入或舊的DOM被刪除時,不見得會自動更新

Ex:
querySelectorAll 會回傳 static list(不會自動更新)
.childNodes 則會自動更新

類陣列轉成陣列的方法

為了使其兩者皆可使用Array方法,要將其轉成陣列

方法1

可支援至 IE6

```
    const arr = [1, 2, 2, 3]
    const newArr = Array.from(new Set(arr))
    console.log(newArr) // [1, 2, 3]
```

方法2

不支援IE(Edge可)
可用 Polyfills 支援至IE9

```
    var btns = document.querySelectorAll('button');
    var btnsArr = Array.from(btns);
```

方法3

ES6 展開運算子 (不支援IE)

```
    var btns = document.querySelectorAll('button');
    var btnsArr = [...btns]
```

NodeList 與 HTMLCollection的差異

NodeList 並不限制儲存的節點型別(可儲存文字節點、屬性節點)
而 HTMLCollection只能放置 element 節點

```
  const tpl = `
    <div class="test">
      <h6>A</h6>
      <h6>B</h6>
      <h6>C</h6>
    </div>
    `
    const test = document.querySelector('.test')
    
    // NodeList(7) [text, h6, text, h6, text, h6, text]
    console.log(test.childNodes); 
    
    // HTMLCollection(3) [h6, h6, h6]
    console.log(test.children);
```

參考引用資料：

JS 陣列轉換&小技巧：[https://ithelp.ithome.com.tw/articles/10212010](https://ithelp.ithome.com.tw/articles/10212010)

將 Node List 轉換成陣列：[https://www.jstips.co/zh_tw/javascript/converting-a-node-list-to-an-array/](https://www.jstips.co/zh_tw/javascript/converting-a-node-list-to-an-array/)

DOM 集合型別 HTMLCollection、NodeList 差異說明：[https://pvencs.blogspot.com/2014/02/dom-htmlcollectionnodelist.html](https://pvencs.blogspot.com/2014/02/dom-htmlcollectionnodelist.html)
