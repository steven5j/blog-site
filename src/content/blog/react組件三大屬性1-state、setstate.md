---
title: "[React]組件三大屬性(1)-State、setState"
description: "理解 state是組件對象最重要的屬性, 值是對象(可以包含多個key-value的組合) 組件被稱為&#82 [&hellip;]"
pubDate: 2021-11-23
topic: software
series: javascript
tags:
  - React養成
  - 組件三大屬性
heroImage: /public/uploads/wp/6858.jpg
wpId: 6858
slug: react-1-state-setstate-6858
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/11/23/react%e7%b5%84%e4%bb%b6%e4%b8%89%e5%a4%a7%e5%b1%ac%e6%80%a71-state%e3%80%81setstate/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/10/React開發系列-1024x576.jpg)

理解

- state是組件對象最重要的屬性, 值是對象(可以包含多個key-value的組合)

- 組件被稱為”狀態機”, 通過更新組件的state來更新對應的頁面顯示(重新渲染組件)

基本使用

狀態機

State 的實際應用

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

```

[【在 CodePen 上嘗試】](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/11/image.png)

setState()

用來修改或更新 Class Component 內 state 物件的一個方法。

即便 state 本身是一個物件但是我們依舊要使用 React.js 提供的 setState() 方法才能夠成功修改其值，成功修改完值後才能觸發頁面的重新渲染呈現目前狀態和資料最新的內容。

setState() 應用

```
// state 物件的值
this.state={
    name: 'Angela'
}

// 修改 state 物件中的 name 屬性
this.setState({name: 'Sabrina'});
```

注意事項

請不要直接修改 State

```
// 錯誤寫法
this.state.comment = 'Hello';

// 正確寫法
this.setState({comment: 'Hello'});
```

不可以直接去修改 state 物件本身，如果需要修改的話都一定要透過 setState() 這個方法，使用 this.state.屬性 去做修改的話是會出現錯誤的，而且畫面也不會做重新渲染（ Re-render ）的動作。

State 的更新可能是非同步的

setState() 並不會總是馬上更新 component。它有可能會將其分批處理更新或延遲到稍後才更新。所以請把 setState() 想成一個請求而非一個馬上對 component 進行更新的指令。

官方文件

例如，這個程式碼可能無法更新 counter：

```
// 錯誤
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修正這個問題，使用第二種形式的 setState()，它接受一個 function 而不是一個 object。Function 將接收先前的 state 作為第一個參數，並且將更新的 props 作為第二個參數：

```
// 正確
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

// 也可以適用於正常的 function：
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

可以變更 state 內個別的值

```
// Class Component 內部的 constructor
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

我們能夠在 state 當中存入多個變數的值。當要修改或更新裡面某一個變數時，可以針對個別的變數做修改即可，沒有動到的變數會保留原來的值不變更。

```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

在更新 state 的值時就變得很方便！因為它們的更新都是個別獨立的不需要去注意其他的變數，當然前提是你沒有去動到它的話。

參考資料：

[ Day 09 ] State 是什麼？：[https://ithelp.ithome.com.tw/articles/10271223](https://ithelp.ithome.com.tw/articles/10271223)

[ Day 10 ] setState() 的用法：[https://ithelp.ithome.com.tw/articles/10271783](https://ithelp.ithome.com.tw/articles/10271783)

State 和生命週期：[https://zh-hant.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)

使用React.setState需要注意的三点：[https://segmentfault.com/a/1190000008271880](https://segmentfault.com/a/1190000008271880)

02课 React如何正确使用setState：[https://youtu.be/dON_O_R3NSg](https://youtu.be/dON_O_R3NSg)
