---
title: "[JS作品]JS30系列11 &#8211; Custom Video Player 自定義視頻播放器"
description: "作品網址： 主題目標 為video元素添加自定義樣式的播放控制面板 [&hellip;]"
pubDate: 2020-03-26
topic: software
series: javascript
tags:
  - JavaScript 30 Portfolio
heroImage: /public/uploads/wp/3941.gif
wpId: 3941
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/26/js%e4%bd%9c%e5%93%81js30%e7%b3%bb%e5%88%9711-custom-video-player-%e8%87%aa%e5%ae%9a%e7%be%a9%e8%a6%96%e9%a0%bb%e6%92%ad%e6%94%be%e5%99%a8/"
---

![](https://lh3.googleusercontent.com/PYRgx5B5VzjzLI_YoXIM3iKoHFM_fOA3jBC9XDsBFVSK6nJmbfMszTDQlYz6ETJq2eEOM3G8mW83y00SZEdFHsjrGvhiKWzwfkHa09AH7W18oVLOnDMbG_OxC88ZxkdWhj_tPswULm-B3wGciETwW-q6fI6v0GH0XVjBj5YVy_bPEle9T80jbsnDBGzy82tbdvPj34O4IBOGM4cBmqYykEGVF0cFzZRQvXXeeeakzHDuM915R4ZDCBNSdEs7gMT8js7UcPpqTrCG47Lzh4Vg7OdAe0CSnYIw60uc7gsTMFjyA-jTVOfcsYPEOuGpTHKbQjRncp8HY8ZaOpcpPNZOdRA9NOdd68v4hjl01ocUqCr6I_R8N8ZIlBSu2bbXgM3azkZG3HzfRUTh1ieCL_EYzyAw2M7NsfH1G0hOCaVzzARaRHnhv4j39xW3MEn5eWPXTKKJuJC_6UU1yAadJmRymKMW4lJYqFZx14hnrtknAZnPnA9p6DABcKcWFAlG4SFYtxOP1BiLMvhXuHjIWUTSiyyCCiw5ZKxgF27hzr7iE3KwZx5xGUGv8FVJ4gXKjJDC2iGkk-D1X44xIpf8CUMml2pIuOOgjRQ8OPairWEMxLFi2183yot-tZXn97mfXJ1GFKLi11L3mNcKk1ap_nDYFR-s2MAv9LEzNT5GoM-P8S7VQOw8FqzQmxRYy-lwzOnfqIuQ6sOonCHsk5DKpCEUjcML_3BTBZE8fur5SSZ_oMNco4Fa5ZYXDsI=w854-h480-no)

作品網址：

[Demo作品連結](https://steven5j.github.io/JavaScript30day/11%20-%20Custom%20Video%20Player/)

[JavaScript 30 作品目錄](https://wordpress-1652732-6572997.cloudwaysapps.com/javascript-30%e4%bd%9c%e5%93%81%e7%b3%bb%e5%88%97/)

 

 

主題目標

- 為video元素添加自定義樣式的播放控制面板

-  可滑動調節音量、播放速度

-  可通過按鈕快進、回退

-  可點擊視頻畫面或按鈕播放或暫停視頻播放

-  可點擊或拖動進度條選擇視頻播放進度

- 將播放器的各項 DOM ，都建立監聽事件

 

 

需求思考分析

- 首先，我們已經有了HTML 文件，裡面包含各種播放器用到的元素，格式也已經在CSS 文件中幫我們設置好了

-  在JS 中選擇我們需要添加功能的HTML 元素，建立好變量

-  用JS 寫好播放器的功能

-  給第二步中獲取的元素加上事件監聽和回調，即可實現功能

 

 

處理步驟

步驟 1. 播放的呈現

- 取得 HTML 上的各個元素

- 綁定撥放功能

- 增加變換播放按鈕圖案功能

- 添加播放後，進度條的動態顯示

步驟 2.  快退/快進跳轉按鈕 和 音量與播放速度調整

- 利用 html 上的 name 與值

- 觸發狀態的綁定

步驟 3. 進度條的動態切換

- 建立播放進度條跳轉至指定時間 scrub function

- 簡單的拉動綁定事件 click 與 mousemove

- 避免播放器的點擊功能互相影響，建立 mousedown 變數

- 並在進度條上點擊時觸發

 

特別技術、函式

<HTML>

[<video>: The Video Embed element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

 HTML `<video>`元素用於在HTML或者XHTML文檔中嵌入媒體播放器，用於支持文檔內的視頻播放。你也可以將 `<video>`  標籤用於音頻內容，但是[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)元素可能在用戶體驗上更合適。 

[Media events](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)

在處理用[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)和[`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)標籤嵌入到HTML文檔中的媒體時，會觸發多種事件。本章列出這些事件，並給出一些使用方法。

事件名稱描述

`abort` 在播放被終止時觸發,例如, 當播放中的視頻重新開始播放時會觸發這個事件。

`canplay`在媒體數據已經有足夠的數據（至少播放數幀）可供播放時觸發。這個事件對應CAN_PLAY的readyState。

`canplaythrough`在媒體的readyState變為CAN_PLAY_THROUGH時觸發，表明媒體可以在保持當前的下載速度的情況下不被中斷地播放完畢。注意：手動設置currentTime會使得firefox觸發一次canplaythrough事件，其他瀏覽器或許不會如此。

`durationchange`元信息已載入或已改變，表明媒體的長度發生了改變。例如，在媒體已被加載足夠的長度從而得知總長度時會觸發這個事件。

`emptied`媒體被清空（初始化）時觸發。

`ended`播放結束時觸發。

`error`在發生錯誤時觸發。元素的error屬性會包含更多信息。參閱  [HTMLMediaElement.error](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error)  獲得詳細信息。

`loadeddata`媒體的第一幀已經加載完畢。

`loadedmetadata`媒體的元數據已經加載完畢，現在所有的屬性包含了它們應有的有效信息。

`loadstart`在媒體開始加載時觸發。

`mozaudioavailable`當音頻數據緩存並交給音頻層處理時

`pause`播放暫停時觸發。

`play`在媒體回放被暫停後再次開始時觸發。即，在一次暫停事件後恢復媒體回放。

`playing`在媒體開始播放時觸發（不論是初次播放、在暫停後恢復、或是在結束後重新開始）。

`progress`告知媒體相關部分的下載進度時周期性地觸發。有關媒體當前已下載總計的信息可以在元素的buffered屬性中獲取到。

`ratechange`在回放速率變化時觸發。

`seeked`在跳躍操作完成時觸發。

`seeking`在跳躍操作開始時觸發。

`stalled`在嘗試獲取媒體數據，但數據不可用時觸發。

`suspend`在媒體資源加載終止時觸發，這可能是因為下載已完成或因為其他原因暫停。

`timeupdate`元素的currentTime屬性表示的時間已經改變。

`volumechange`在音頻音量改變時觸發（既可以是volume屬性改變，也可以是muted屬性改變）.。

`waiting`在一個待執行的操作（如回放）因等待另一個操作（如跳躍或下載）被延遲時觸發。

使用下面的代碼，你可以很容易的觀察到這些事件:

```
`var v = document.getElementsByTagName("video")[0];
v.addEventListener("seeked", function() { document.getElementsByTagName("video")[0].play(); }, true);
v.currentTime = 10.0;`
```

<CSS>

[::-webkit-slider-runnable-track 與 ::-moz-range-track](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-runnable-track)

非標準的語法，依照 MDN 上的說明，可能會變換，主要是針對  中 type=”range” 的類型設定進度調軌跡的背景與邊框樣式

[::-webkit-slider-thumb](https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-webkit-slider-thumb) 與 [::-moz-range-thumb](https://developer.mozilla.org/zh-TW/docs/Web/CSS/::-moz-range-thumb)

這是type為range的input標籤內的一種偽類樣式,用於設置range的滑塊的具體樣式,該偽類只在內核為webkit/blink的瀏覽器中有效

該偽類需要配和::-webkit-slider-runnable-track使用,否則會沒有效果…….

這兩個的功能相同，簡單說就是移動時候的顯示樣式，主要是在不同瀏覽器的支援。

[-moz-appearance (-webkit-appearance, appearance)](https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance)

就是變更元素的外觀而已。

[ flex-basis ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

CSS屬性flex-basis指定了flex元素在主軸方向上的初始大小。如果不使用   box-sizing 改變盒模型的話，那麼這個屬性就決定了flex元素的內容盒（content-box）的尺寸。

<JavaScript>

[HTMLMediaElement: timeupdate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event)

當currentTime更新時會觸發timeupdate事件。這個事件的觸發頻率由系統決定，但是會保證每秒觸發4-66次。

[MouseEvent.offsetX](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event)

MouseEvent接口的只讀屬性offsetX規定了事件對象與目標節點的內填充邊（padding edge）在X軸方向上的偏移量。

[HTMLElement.offsetWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)

HTMLElement.offsetWidth是一個只讀屬性，返回一個元素的佈局寬度。一個典型的（譯者註：各瀏覽器的offsetWidth可能有所不同）offsetWidth是測量包含元素的邊框(border)、水平線上的內邊距(padding)、豎直方向滾動條(scrollbar)（如果存在的話）、以及CSS設置的寬度(width)的值。

完整程式碼

```
`// 抓取全部的元素
const player = document.querySelector('.player');
const video =player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//讓影片撥放或暫停
console.log(video);
function togglePlay(){
   const method = video.paused? 'play':'pause';
    video[method]();
}

video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);

//加入圖示ICON點選邏輯事件變化
function updateButton(){
 const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent= icon;
}
video.addEventListener ( 'play' , updateButton);
video.addEventListener ( 'pause' , updateButton);

//快退/快進

console.log(skipButtons);
function skip(){
video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click',skip));

//音量和播放速度

console.log(ranges);
function handleRangeUpdate(){
    video[this.name] = this.value;
};
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//進度條操作--------------------------------------
console.log(progressBar)
//自動進度條依照撥放時間圖示變化
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate',handleProgress);
//根據點擊位置設置播放時間
function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
progress.addEventListener('click',scrub);

//鼠標在progress上移動時更新進度
let mousedown =  false ;
//利用邏輯和操作符&&的短路特性來實現“只有當mousedown為true，或可類型轉換為true時才執行scrub(e)”的判斷操作
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
// progress . addEventListener ( ' mousemove ' , ( e ) => {

//     //若處於拖拽狀態則執行更新
//     if (mousedown) {
//          scrub (e);
//     }
// });
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);`
```

 

 

參考資料：

JS30紀錄 10-Hold Shift and Check Checkboxes： [https://shunnien.github.io/2017/12/27/Javascript30days-10/](https://shunnien.github.io/2017/12/27/Javascript30days-10/)

Js 30 day 中文指南：[https://github.com/soyaine/JavaScript30](https://github.com/soyaine/JavaScript30)
