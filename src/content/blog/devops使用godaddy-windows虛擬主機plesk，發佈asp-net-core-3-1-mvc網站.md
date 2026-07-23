---
title: "[DevOps]使用Godaddy Windows虛擬主機(Plesk)，發佈ASP.NET Core 3.1 MVC網站"
description: "介面創建與進入 先創建好網域 進入您的虛擬主機操作介面 進入Plesk管理員介面 建置SQL Sever Go [&hellip;]"
pubDate: 2021-04-24
topic: software
series: mis
heroImage: /public/uploads/wp/5870.jpg
wpId: 5870
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/04/24/devops%e4%bd%bf%e7%94%a8godaddy-windows%e8%99%9b%e6%93%ac%e4%b8%bb%e6%a9%9fplesk%ef%bc%8c%e7%99%bc%e4%bd%88asp-net-core-3-1-mvc%e7%b6%b2%e7%ab%99/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/DevOps使用Godaddy-Windows虛擬主機Plesk，發佈ASP.NET-Core-3.1-MVC網站-1024x576.jpg)

介面創建與進入

先創建好網域

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-3-1024x576.png)

進入您的虛擬主機操作介面

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-4-1024x576.png)

進入Plesk管理員介面

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-5-1024x576.png)

建置SQL Sever

Godaddy 購買其方案，有提供SQL SERVER

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-6-1024x576.png)

新增一個SQL SERVER

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-7-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-8-1024x576.png)

建完以後，可以使用SSMS 以GODADDY提供的連線IP 連線測試看看

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-9-1024x576.png)

把網站發佈到Godaddy的Window sever 主機

在Plesk管理介面中，選擇Web Deploy Publishing Settings 把設定檔下載回來。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-11-1024x576.png)

在Visual Studio 發佈專案

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-12-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-13-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-14.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-15.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-16-1024x554.png)

發佈設定

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-17.png)

密碼的部分，可以至虛擬主機介面進行密碼修改後獲得。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-21-1024x576.png)

必須先進行連線驗證，不然無法把檔案上傳上Godaddy主機

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-22-1024x961.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-23.png)

因為Godaddy暫時沒有net core3.1的環境，所以需要使用獨立式部屬模式，依照下方設定進行設定作業。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-18-1024x963.png)

進行發佈

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-19-1024x554.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-20.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-24-1024x554.png)

問題排除

仍然會發生一些狀況

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-25-1024x576.png)

查了查相關資料原因是 AspNetCoreModuleV2 是在 .Net Core 2.2 以後才有的東西，Godaddy 上面只有 2.0 !
把 web.config 裡面的 AspNetCoreModuleV2 置換成 AspNetCoreModule

相關問題排除，可以參考：[[ASP.Net Core] 如何讓 Godaddy 跑 .NET Core 3.1 ?](https://ithelp.ithome.com.tw/articles/10234843)

[如何使用Godaddy Windows虛擬主機(Plesk)，發行ASP.NET MVC網站](http://mazast.com/technology-info/asp-net/publish-asp-net-with-plesk/)

修改檔上傳

將修改完成的Web.config檔案上傳到Godaddy主機

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-26-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-27-1024x576.png)

直接覆蓋掉即可

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/04/image-28-1024x576.png)

網站部屬完成!

參考資料：

如何使用Godaddy Windows虛擬主機(Plesk)，發行ASP.NET MVC網站：[http://mazast.com/technology-info/asp-net/publish-asp-net-with-plesk/](http://mazast.com/technology-info/asp-net/publish-asp-net-with-plesk/)

[ASP.Net Core] 如何讓 Godaddy 跑 .NET Core 3.1 ?：

[https://ithelp.ithome.com.tw/articles/10234843](https://ithelp.ithome.com.tw/articles/10234843)
