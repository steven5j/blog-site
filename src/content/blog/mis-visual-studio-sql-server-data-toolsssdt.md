---
title: "[MIS軟體/工具]Visual Studio &#8211; 資料庫專案SQL Server Data Tools(SSDT)"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-01-12
topic: software
series: sql
tags:
  - Visual Studio
heroImage: /public/uploads/wp/5443.jpg
wpId: 5443
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/01/12/mis-visual-studio-sql-server-data-toolsssdt/"
---

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/SQL-Server-Data-Tools-1024x576.jpg)

視頻操作教學

資料庫專案優勢

1.將 SQL SERVER 中的各種資料庫物件轉換為程式碼

2.IntelliSense和編輯：在鍵入時驗證 T-SQL 指令碼

3.持續整合與部署：資料庫版控

4.資料庫結構比較：對資料庫執行差異比對

建立一個資料庫專案

選擇資料庫專案

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-1-1-1024x549.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-2-1-1024x549.png)

匯入資料庫

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-3-1-1024x552.png)

選擇資料庫連線

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-4-1.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-5-1.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-6.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-7.png)

完整資料庫物件專案

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-8.png)

進行資料庫比較並更新

資料庫結構描述比較

對專案按右鍵->結構描述比較

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-9.jpg)

結構描述比較畫面

左邊代表來源，右邊代表要修改的對象，中間按鈕可以進行切換

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-10-1024x380.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-11.jpg)

執行比較

左上方[比較]，Visual Studio會自動進行資料庫與資料庫專案的比對

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-13-1024x380.jpg)

列出差異，可以對目標進行更新

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-14-1024x380.jpg)

資料庫專案完成更新

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-15.jpg)

資料庫專案版控

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-1-2-1024x709.png)

右下角加入

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-16-1024x552.jpg)

我們使用GitHub

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-17-1024x552.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-18.jpg)

完成版控簽入

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-20-1024x552.jpg)

可惜之處美中不足：

資料庫架構可以進行版控，而要給資料庫預設內容也可以使用，但如果專案是以整體大量資料庫內容為主體的案件，要做版本控管比較難一點。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/VS_DB資料庫比較異動_20210112-1024x576.jpg)

參考引用資料：

如何為 SQL SERVER 建立資料庫版控：[https://blog.yowko.com/sql-server-version-control/](https://blog.yowko.com/sql-server-version-control/)

[Visual Studio]專案裡的資料庫專案：h[ttps://dotblogs.com.tw/kinanson/2016/04/30/145219](ttps://dotblogs.com.tw/kinanson/2016/04/30/145219)

資料庫專案設定：[https://docs.microsoft.com/zh-tw/sql/ssdt/database-project-settings?view=sql-server-ver15](https://docs.microsoft.com/zh-tw/sql/ssdt/database-project-settings?view=sql-server-ver15)

使用Visual Studio佈署DB，自動化填入資料：[https://edwardkuo.imas.tw/paper/2016/06/01/Devops/DBVersionControl/](https://edwardkuo.imas.tw/paper/2016/06/01/Devops/DBVersionControl/)

適用於 Visual Studio 的 SQL Server Data Tools：[https://visualstudio.microsoft.com/zh-hant/vs/features/ssdt/](https://visualstudio.microsoft.com/zh-hant/vs/features/ssdt/)
