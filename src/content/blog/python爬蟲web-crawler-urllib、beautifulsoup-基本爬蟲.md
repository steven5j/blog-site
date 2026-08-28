---
title: "[Python]爬蟲Web Crawler -urllib、BeautifulSoup 基本爬蟲"
description: "環境 windows版本：Windows 10 專業版 20H2 python版本：3.10.0 pip 版本 [&hellip;]"
pubDate: 2022-02-02
topic: software
series: python
tags:
  - Web Crawler
  - 爬蟲
heroImage: /public/uploads/wp/7179.jpg
wpId: 7179
slug: python-web-crawler-urllib-beautifulsoup-7179
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/02/02/python%e7%88%ac%e8%9f%b2web-crawler-urllib%e3%80%81beautifulsoup-%e5%9f%ba%e6%9c%ac%e7%88%ac%e8%9f%b2/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/02/python-Web-Crawler-1024x576.jpg)

環境

windows版本：Windows 10 專業版 20H2

python版本：3.10.0

pip 版本(為Python內建的套件管理)：

模組、套件：

[urllib](https://docs.python.org/zh-tw/3/howto/urllib2.html)：

是一個用來從URLs (Uniform Resource Locators)取得資料的Python模組。

[PIP](https://pip.pypa.io/en/stable/)：

pip是一個以Python電腦程式語言寫成的軟體包管理系統，他可以安裝和管理軟體包，另外不少的軟體包也可以在「Python軟體包索引」中找到。 許多Python的發行版中已經預裝了pip。

[Python Beautifulsoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)：

借助網頁的結構特性來解析網頁的工具，只需要簡單的幾條指令就可以提取HTML標籤裡的元素。

基本流程

- 引用 `urllib.request` 模組。

- 以 `urlopen()` 函式模擬瀏覽器，向目標網址建立連線：傳送要求 (Request) 和參數給網站伺服器，並且接收網站伺服器的回應 (Response)。

- 使用 `with` 關鍵字實作，依照不同檔案格式以不同語法讀取 Response。

※備註：盡可能模仿真實使用者

```
import urllib.request as Request
with Request.urlopen(網址) as Response:
    # 依照不同檔案格式讀取 Response

```

格式分析處理

HTML 格式

```
import urllib.request as req
with req.urlopen(網址) as res:
    page_data = res.read().decode("utf-8")    # 以一般文字格式，讀取「網站伺服器的回應」，使用萬國碼utf-8
print(page_data)
```

使用beautifulsoup解析HTML並處理

安裝

```
pip install beautifulsoup4
```

使用 beautifulsoup 

```
from bs4 import BeautifulSoup

soup = BeautifulSoup(page_data,"html.parser") #將網頁資料以html.parser解析
sel = soup.select("div.title a") #取HTML標中的 <div class="title"></div> 中的<a>標籤存入sel
```

JSON 格式

```
import json
with req.urlopen(網址) as res:
    page_data = json.loads(res.read().decode("utf-8"))    # 以 JSON 格式，轉換 從讀取「網站伺服器的回應」
print(page_data)
```

json.loads(res)：回傳 List、字典資料格式。

參考或引用資料：

Day-1 Python爬蟲小人生(1)：[https://ithelp.ithome.com.tw/articles/10202121](https://ithelp.ithome.com.tw/articles/10202121)

[Python教學]Request和BeautifulSoup爬蟲教學，初學者也可以馬上學會！：[https://zx2515296964.medium.com/python-%E6%95%99%E5%AD%B8-%E7%B0%A1%E5%96%AE%E5%B9%BE%E6%AD%A5%E9%A9%9F-%E8%AE%93%E4%BD%A0%E8%BC%95%E9%AC%86%E7%88%AC%E8%9F%B2-928a816051c1](https://zx2515296964.medium.com/python-%E6%95%99%E5%AD%B8-%E7%B0%A1%E5%96%AE%E5%B9%BE%E6%AD%A5%E9%A9%9F-%E8%AE%93%E4%BD%A0%E8%BC%95%E9%AC%86%E7%88%AC%E8%9F%B2-928a816051c1)

[Python爬蟲教學]7個Python使用BeautifulSoup開發網頁爬蟲的實用技巧：[https://www.learncodewithmike.com/2020/02/python-beautifulsoup-web-scraper.html](https://www.learncodewithmike.com/2020/02/python-beautifulsoup-web-scraper.html)

[Python爬蟲教學]Python網頁爬蟲動態翻頁的實作技巧：[https://www.learncodewithmike.com/2020/06/how-to-scrape-different-pages-using-python-scraper.html](https://www.learncodewithmike.com/2020/06/how-to-scrape-different-pages-using-python-scraper.html)

如何使用urllib套件取得網路資源：[https://docs.python.org/zh-tw/3/howto/urllib2.html](https://docs.python.org/zh-tw/3/howto/urllib2.html)

Python 自學第十三天：取得網路公開資料 Open Data：[https://jenifers001d.github.io/2019/12/17/Python/learning-Python-day13/](https://jenifers001d.github.io/2019/12/17/Python/learning-Python-day13/)

Python 網路連線程式、公開資料串接 By 彭彭：[https://youtu.be/sUzR3QVBKIo](https://youtu.be/sUzR3QVBKIo)
