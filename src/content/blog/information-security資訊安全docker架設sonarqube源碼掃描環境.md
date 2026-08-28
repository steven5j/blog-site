---
title: "[Information Security資訊安全]Docker架設SonarQube源碼掃描環境"
description: "環境與版本 作業系統：Window10 64x 版本：2004 Docker Engine：v20.10.5 [&hellip;]"
pubDate: 2021-04-26
topic: software
series: mis
heroImage: /public/uploads/wp/5831.jpg
wpId: 5831
slug: information-security-docker-sonarqube-5831
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/26/information-security%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8docker%e6%9e%b6%e8%a8%adsonarqube%e6%ba%90%e7%a2%bc%e6%8e%83%e6%8f%8f%e7%92%b0%e5%a2%83/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/Information-Security資訊安全Docker架設SonarQube源碼掃描環境.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

Docker Engine：v20.10.5

sonarqube：Version 8.8.0.42792

前言

以 Docker 架設
SonarScanner 源碼掃描環境，可省去複雜的環境安裝及設定，
只要簡單的幾步驟，大約 5 – 10 分鐘，
就可以把環境架設起來。

先安裝Docker Desktop 和註冊 Docker Hub：[https://www.docker.com/get-started](https://www.docker.com/get-started)

1.下載 SonarQube 鏡像

執行 docker pull sonarqube 下載最新鏡像

[https://hub.docker.com/_/sonarqube](https://hub.docker.com/_/sonarqube)

查看其他參數

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-29-1024x615.png)

2.啟動SonarQube

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-30-1024x542.png)

兩種方式去建置Container

執行下列指令

```
docker run --name 要命名的Container專案名稱 -p 9000:9000 -d sonarqube
```

使用介面填上相關訊息已啟動

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-36-1024x590.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-34-1024x590.png)

開啟瀏覽器輸入 127.0.0.1:9000

第一次瀏覽系統需要一段時間建置，登入帳密為 admin

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-35-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-31-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-32-1024x576.png)

其他相關訊息

系統訊息查看

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-37-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-33-1024x576.png)

參考或引用資料

SonarQube學習（一）- 使用Docker安裝SonarQube（親測可用）：[https://iter01.com/575342.html](https://iter01.com/575342.html)
