---
title: "[C#][.NET]在Visual Studio 中使用 Library Manager(LibMan)"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-03-07
topic: software
series: csharp
heroImage: /public/uploads/wp/5921.png
wpId: 5921
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/03/07/%e5%9c%a8visual-studio-%e4%b8%ad%e4%bd%bf%e7%94%a8-library-managerlibman/"
---

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

Microsoft Library Manager – ASP.NET Core 管理前端套件的好工具

Microsoft Library Manager是一個客戶端庫管理工具。

可以從CDN去下載客戶端庫和和框架。

必須在Visual Studio2017版本15.8或以上使用。

libman.json是庫管理器的清單文件。

Visual Studio 在 ASP.NET Core 專案中有內建的 LibMan 支援，包括：

- 支援在組建上設定和執行 LibMan 還原作業。

- 用於觸發 LibMan 還原和清除作業的功能表項目。

- 搜尋對話方塊來尋找程式庫，並將檔案新增至專案。

- 在 LibMan 資訊清單檔案 上編輯libman.js 的支援 — 。

延伸模組->管理延伸模組

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-3-1024x659.png)

管理擴充功能 ->安裝Microsoft Library Manager

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-2-1024x754.png)

原專案方案總管內容

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-1.png)

對wwwroot右鍵 -> 加入->用戶端程式庫

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-4.png)

搜尋想要的函式庫

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-6.png)

libman.json出來了

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-5.png)

libman.json內容

此檔案結構為 json，預設有三個屬性

version (可選): String

用來指定 libman.json 之語法版本。

defaultProvider (可選): String

用來指定前端套件預設來源，雖然說是可以選，但是因為通常我們套件來源都是固定的，因此推薦一定要有，預設是從 cdnjs 讀取資料，還有 File System 可以用

libraries(必填): Object Array

前端套件列表，用來列出所有受管理的套件與其設定，物件內容詳細說明請參照下說

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-7.png)

library: String

代表cdnjs上套件之名稱與版本，使用 @ 分隔，套件名稱沒有 IntelliSense 支援，但是版本就有，輸入完套件名稱後打上 @ 就會出現版本的選單

destination(必選填): string

這邊代表要將此套件檔案放在哪裡，若有設定 defaultDestination 就不用必填，但是反過來說，沒有 defaultDestination 就需要填寫此屬性。

完成以上填寫並存檔後，LibMan 就會自動還原套件檔案，也可以透過手動觸發或是清除受管理之套件資料夾。

```
    {
      "library": "jquery@3.6.0",
      "destination": "wwwroot/lib/jquery/"
    }
```

參考或引用資料：

在 Visual Studio 中使用 LibMan 搭配 ASP.NET Core：[https://docs.microsoft.com/zh-tw/aspnet/core/mvc/models/validation?view=aspnetcore-5.0](https://docs.microsoft.com/zh-tw/aspnet/core/mvc/models/validation?view=aspnetcore-5.0)

Microsoft Library Manager – ASP.NET Core 管理前端套件的新好工具：[https://dotblogs.com.tw/abc12207/2018/09/03/MicrosoftLibraryManager-NewGoodToolToManageClient-sideLibraryForASPNETCore](https://dotblogs.com.tw/abc12207/2018/09/03/MicrosoftLibraryManager-NewGoodToolToManageClient-sideLibraryForASPNETCore)
