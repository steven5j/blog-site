---
title: "[React]組件三大屬性(2)-props(properties的簡寫)"
description: "理解 每個組件對象都會有props(properties的簡寫)屬性 組件標籤的所有屬性都保存在props中 [&hellip;]"
pubDate: 2021-11-28
topic: software
series: javascript
heroImage: /public/uploads/wp/6862.jpg
wpId: 6862
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/11/28/react%e7%b5%84%e4%bb%b6%e4%b8%89%e5%a4%a7%e5%b1%ac%e6%80%a72-propsproperties%e7%9a%84%e7%b0%a1%e5%af%ab/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/10/React開發系列-1024x576.jpg)

理解

- 每個組件對象都會有props(properties的簡寫)屬性

- 組件標籤的所有屬性都保存在props中

在 React.js 中，將元件內自訂的屬性或其他參數整理成一個單一的物件，並將該物件傳遞給元件。而該物件就叫做 Props 。

Props

 Props 應用

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[【在 CodePen 上試試看吧！】](https://codepen.io/pen?&editors=0010)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/11/image-1.png)

name 這個屬性會被包在一個叫做 props 的物件當中，所以可以這樣來看這個物件：

```
props: {
    name: "Sara"
}
```

```
我們對 <Welcome name="Sara" /> 這個 element 呼叫了 ReactDOM.render()。
React 以 {name: 'Sara'} 作為 props 傳入 Welcome component 並呼叫。
Welcome component 回傳了 <h1>Hello, Sara</h1> 這個 element 作為返回值。
React DOM 有效的將 DOM 更新為 <h1>Hello, Sara</h1>。
```

Props 的注意事項

Props 是可以將父層的資料透過物件的形式傳遞到子層的元件中的。不過在子層的元件內想要去變更 props 物件的值時，就必須要注意了！

Props 是唯獨的

這邊指的唯獨（ read-only ）是代表 props 物件不能在元件內部進行修改。如果我們嘗試在元件內部修改 props 的值，就會產生錯誤訊息的提示了。

除了自定義的屬性名稱，還有一個 children

可以在任何的元件中帶入自己定義的屬性至其中，並且當作 props 物件將資料傳入到元件內部。
不過除了自定義的屬性和名稱之外，其實元件還有一個內建的 props 屬性： children

children 怎麼使用？

children 的寫法是將該屬性的值直接撰寫在元件的開始與結束標籤內（意即標籤的中間）。

```
function Welcome(props) {
  //在 Welcome 元件內，則因為我們改使用了 children 的屬性，所以元件內部採用的 props 物件的屬性也會改成 children
  return <h1>Hello, {props.children}</h1>;
}

//在宣告 element 的地方就要改寫成下方的寫法
const element = <Welcome> Sara </Welcome>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

參考資料：

[ Day 08 ] 元件的資料傳遞 – Props：[https://ithelp.ithome.com.tw/articles/10270598](https://ithelp.ithome.com.tw/articles/10270598)
