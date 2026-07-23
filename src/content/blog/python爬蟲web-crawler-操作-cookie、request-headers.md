---
title: "[Python]爬蟲Web Crawler -操作 Cookie、Request Headers"
description: "環境 Windows版本：Windows 10 專業版 20H2 python版本：3.10.0 pip 版本 [&hellip;]"
pubDate: 2022-02-13
topic: software
series: python
tags:
  - Web Crawler
  - 爬蟲
heroImage: /public/uploads/wp/7191.jpg
wpId: 7191
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/02/13/python%e7%88%ac%e8%9f%b2web-crawler-%e6%93%8d%e4%bd%9c-cookie%e3%80%81request-headers/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/02/python-Web-Crawler-1024x576.jpg)

環境

Windows版本：Windows 10 專業版 20H2

python版本：3.10.0

pip 版本(為Python內建的套件管理)：

模組、套件：

[urllib](https://docs.python.org/zh-tw/3/howto/urllib2.html)：

是一個用來從URLs (Uniform Resource Locators)取得資料的Python模組。

[PIP](https://pip.pypa.io/en/stable/)：

pip是一個以Python電腦程式語言寫成的軟體包管理系統，他可以安裝和管理軟體包，另外不少的軟體包也可以在「Python軟體包索引」中找到。 許多Python的發行版中已經預裝了pip。

[Python Beautifulsoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)：

借助網頁的結構特性來解析網頁的工具，只需要簡單的幾條指令就可以提取HTML標籤裡的元素。

```
pip install beautifulsoup4
```

實作流程

1.程式模擬瀏覽器，建立網路連線

urllib這個套件，有提供添加headers(標題頭)的功能，利用此功能讓程式模擬人為操作。

```
Url = req.Request(url, headers={
     	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36" #模仿真實使用者的資訊
    })
```

※備註：盡可能模仿真實使用者

2.觀察進入網站後給予的 Cookie

下面以PTT「八卦版」為例，觀察其Cookie的配置，如果cookie沒有相關配置，會被拒黨於門外。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/02/image-1024x549.png)

如果點選［我同意，我已年滿十八歲進入]，就會在Cookie內紀錄一筆

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/02/image-1-1024x576.png)

得知以上訊息後，模仿這個行為進行爬蟲。

實作

```
# 連線至 批踢踢實業坊 - 八卦版
import urllib.request as req
import bs4

# 包裝函式
def getTitle(url):
    request = req.Request(url, headers={
        "cookie": "over18=1",         # cookie 資訊
     	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36" #模仿真實使用者的資訊
    })
    with req.urlopen(request) as response:
        data = response.read().decode("utf-8") #讀取返回的資訊 並用萬國碼解讀
    root = bs4.BeautifulSoup(data, "html.parser") #data資料轉換成bs4的html解析
    text_titles = root.find_all("div", class_="title") #找出所有的div  tag 並且 class屬性為 title
    for title in text_titles:
        if title.a != None:
            print(title.a.string)
            
            
# 使用函式  https://www.ptt.cc/bbs/Gossiping/index.html
url = "https://www.ptt.cc/bbs/Gossiping/index.html"
getTitle(url)
```

參考或引用資料：

[Python爬蟲教學]Python網頁爬蟲動態翻頁的實作技巧：[https://www.learncodewithmike.com/2020/06/how-to-scrape-different-pages-using-python-scraper.html](https://www.learncodewithmike.com/2020/06/how-to-scrape-different-pages-using-python-scraper.html)

如何使用urllib套件取得網路資源：[https://docs.python.org/zh-tw/3/howto/urllib2.html](https://docs.python.org/zh-tw/3/howto/urllib2.html)

Python 自學第十五天：網路爬蟲 Web Crawler – 操作 Cookie、連續抓取頁面：[https://jenifers001d.github.io/2019/12/23/Python/learning-Python-day15/](https://jenifers001d.github.io/2019/12/17/Python/learning-Python-day13/)

Python 網路連線程式、公開資料串接 By 彭彭：[https://youtu.be/sUzR3QVBKIo](https://youtu.be/sUzR3QVBKIo)
