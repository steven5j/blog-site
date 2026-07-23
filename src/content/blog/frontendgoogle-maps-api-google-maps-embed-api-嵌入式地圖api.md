---
title: "[FrontEnd]Google Maps API &#8211; Google Maps Embed API 嵌入式地圖API"
description: "Google Map 是各式各樣的設備、網頁、行車紀錄器都很常用的API元件， 通過Maps Embed AP [&hellip;]"
pubDate: 2020-11-01
topic: software
series: frontend
heroImage: /public/uploads/wp/4778.jpg
wpId: 4778
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/01/frontendgoogle-maps-api-google-maps-embed-api-%e5%b5%8c%e5%85%a5%e5%bc%8f%e5%9c%b0%e5%9c%96api/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/googlemapstudynotes-1024x576.jpg)

Google Map 是各式各樣的設備、網頁、行車紀錄器都很常用的API元件，

通過Maps Embed API，可以通過簡單的HTTP請求在網站上放置交互式地圖或街景全景圖。利用iframe的標籤屬性設置Maps Embed API URL，可以輕鬆將地圖其嵌入到網頁中 ：

```
<iframe 
  width =" 600" 
  height =" 450" 
  frameborder =" 0" style =" border：0" 
  src =" https://www.google.com/maps/embed/v1/place?key=API_KEY
    ＆q = Space + Needle，Seattle + WA" allowfullscreen> 
</ iframe>
```

                                

啟用 Google Maps Embed API

Google API啟用網址：[Maps Embed API](https://console.developers.google.com/marketplace/product/google/maps-embed-backend.googleapis.com?q=search&referrer=search&project=test-88e4f)

啟用憑證

要使用Maps Embed API，向API發出請求時必須包含一個免費的API密鑰。

Google API獲取：[Creating API keys](https://developers.google.com/maps/documentation/embed/get-api-key)

嵌入式地圖API

Maps Embed API請求的網址：

```
https://www.google.com/maps/embed/v1/{模式}?key={YOUR_API_KEY}&{參數}
```

- {模式}是place，search，view，directions，或streetview。

- {YOUR_API_KEY} 是您的免費API密鑰。

- {參數}包括[可選參數](https://developers.google.com/maps/documentation/embed/get-started#optional_parameters)和特定於模式的參數。

基本模式

place 地點模式

Place 模式會在特定地點或地址（例如地標，商業，地理特徵或城鎮）上顯示地圖圖釘，如果遇到空格可以用”+”表示。而如果是加號（例如”849VCWC8 + R9″）必須轉換為849VCWC8%2BR9。

- p：定義在地圖上突出顯示的位置。它接受位置作為位置名稱，地址或位置ID。

```
  <iframe 
      width="100%" 
      height="450" 
      frameborder="0" 
      style="border:0" 
      src="https://www.google.com/maps/embed/v1/place?key={YOUR_API_KEY}&q=台北101" 
      allowfullscreen>
  </iframe>
```

  

View 檢視模式

View 模式會返回沒有標記或路線的地圖。

- center：定義地圖窗口的中心，並接受經度和緯度作為逗號分隔的值( 必須 )。
zoom：地圖縮放大小，範圍從 0 到 21。
maptype：定義載入的地圖方塊類型，包含 roadmap 和 satellite ( 衛星空照 )。
language：定義 UI 元素以及地圖方塊上顯示的標籤要使用的語言。
region：根據地緣政治敏感度，定義要顯示的適當邊界與標籤。

```
<iframe
    width="100%"
    height="450"
    frameborder="0" 
    style="border:0"
    src="https://www.google.com/maps/embed/v1/view?key=你的金鑰&zoom=18&center=-33.8569,151.2152&maptype=satellite">
  </iframe>
```

  

進階地圖模式

directions 路線規劃模式

Directions 模式會在地圖上顯示兩個或多個指定點之間的路徑以及距離和行進時間。

- origin：路線起點 ( 必須 )
destination：路線終點 ( 必須 )
waypoints：指定一個或多個中間地點，以在出發地和目的地之間路由路線。可使用 | 符號分隔。
mode：旅行方式，包含 driving、walking、bicycling、transit 和 flying。
avoid：避開一些特殊線，包含 tolls、ferries 和 highways，可使用 | 符號分隔。。
units：單位，包含 metric 或 imperial。

```
  <iframe
    width="100%"
    height="450"
    frameborder="0" 
    style="border:0"
    src="https://www.google.com/maps/embed/v1/directions?key=你的金鑰&origin=台北車站&waypoints=台北101|國父紀念館&destination=台北小巨蛋">
  </iframe>
```

  

Search 搜尋模式

Search模式會在可見的地圖區域顯示搜索結果。建議定義搜索的位置，在搜索詞p=（record+stores+in+Seattle）中包含位置，或者通過包含center和zoom參數來綁定搜索。

- q：指定搜索詞。它可以包含地理限制，例如in+Seattle或near+98033。( 必須 )。
zoom：地圖的縮放大小，範圍從 0 到 21。
center：中心點經緯度。

```
<iframe
    width="100%"
    height="450"
    frameborder="0" 
    style="border:0"
    src="https://www.google.com/maps/embed/v1/search?key=你的金鑰&q=711+in+台北101&zoom=14&center=25.033952,121.564360">
  </iframe>
```

  

備註：如果只有使用center 和 zoom，而沒有再搜索詞P中加上完整的（record+stores+in+Seattle），則他只會探索目前位置附近的資訊。

streetview 街景服務模式

可以將網站的街景圖像顯示為交互式全景圖。Google街景視圖可在整個覆蓋範圍內的指定位置提供全景視圖。

每個街景全景圖都可以從一個位置提供完整的360度視圖。圖像包含360度的水平視圖（完整環繞）和180度的垂直視圖（從垂直向上到垂直向下）。

- center：中心點經緯度 ( 必須 )。

- zoom：地圖縮放大小，範圍從 0 到 21。

- maptype：定義載入的地圖方塊類型，包含 roadmap 和 satellite ( 衛星空照 )。

- language：定義 UI 元素以及地圖方塊上顯示的標籤要使用的語言。

- region：根據地緣政治敏感度，定義要顯示的適當邊界與標籤。

- location：接受經度和緯度作為逗號分隔的值（46.414382,10.013988）。API將顯示距離該位置最近的全景照片。由於街景圖像會定期刷新，並且每次都可能會從略有不同的位置拍攝照片，因此在更新圖像時，您的位置可能會捕捉到不同的全景圖。

- pano：是特定的全景圖ID。如果您指定pano，則也可以指定location。該location：會如果API無法找到全景ID只能使用。

- heading：指示攝像頭的指南針方向從北向順時針方向傾斜。可接受的值是-180°至360°。

- pitch：指定攝像機的角度（向上或向下）。的pitch以度為單位指定從-90°到90°。正值將使照相機向上傾斜，而負值將使照相機向下傾斜。根據拍攝圖像時相機的位置，將默認角度設置為0°。因此，傾斜角度通常為0°，但並非總是如此。例如，在山丘上拍攝的圖像可能會顯示默認間距，該默認間距不是水平的。

- fov：確定圖像的水平視場。視場以度表示，範圍為10°-100°。默認為90°。處理固定大小的視口時，可以將視場視為縮放級別，數字越小表示縮放級別越高。

```
<iframe
    width="100%"
    height="450"
    frameborder="0" 
    style="border:0"
    src="https://www.google.com/maps/embed/v1/streetview?key=你的金鑰&location=25.033952,121.564360&heading=210&pitch=10&fov=35">
  </iframe>
```

  

參考資料：

Google Maps API – 網頁載入地圖 ( 起手式 )：[https://www.oxxostudio.tw/articles/201707/google-maps-1.html](https://www.oxxostudio.tw/articles/201707/google-maps-1.html)

Google官方文件：[https://developers.google.com/maps/documentation/embed/get-started?hl=zh_TW](https://developers.google.com/maps/documentation/embed/get-started?hl=zh_TW)
