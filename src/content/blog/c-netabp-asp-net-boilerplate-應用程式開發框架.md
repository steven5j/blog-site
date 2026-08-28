---
title: "[C#][.Net]ABP (ASP.NET Boilerplate) 應用程式開發框架"
description: "簡介 ABP是「ASP.NET Boilerplate Project (ASP.NET樣板項目)」的簡稱。A [&hellip;]"
pubDate: 2021-10-13
topic: software
series: csharp
heroImage: /public/uploads/wp/6711.png
wpId: 6711
slug: c-netabp-asp-net-boilerplate-6711
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/10/13/c-netabp-asp-net-boilerplate-%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e9%96%8b%e7%99%bc%e6%a1%86%e6%9e%b6/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/10/image-3-1024x576.png)

簡介

ABP是「ASP.NET Boilerplate Project (ASP.NET樣板項目)」的簡稱。
ABP是一個開源的且文檔友好的應用框架，起始的想法是，“開發一款為所有公司和開發者通用的框架！”。
它不僅僅是一個框架，更提供了一個基於 DDD   和最佳實踐的健壯的體系模型。

官方網址：https://aspnetboilerplate.com/

ABP框架已實現了以下特性：

- [](https://aspnetboilerplate.com/Pages/Documents/Dependency-Injection)[Dependency Injection](https://aspnetboilerplate.com/Pages/Documents/Dependency-Injection)依賴注入：ABP 使用並提供傳統的 DI 基礎設施。由於此類是一個應用程序服務，因此它通常作為瞬態（按請求創建）註冊到 DI 容器。它可以簡單地註入任何依賴項。

- [Repository倉儲模式](https://aspnetboilerplate.com/Pages/Documents/Repositories)：ABP 可以為每個實體創建一個默認的存儲庫（例如本例中的 IRepository<Task>）。默認存儲庫有許多有用的方法，例如本示例中使用的 FirstOrDefault 方法。我們可以擴展默認存儲庫以滿足我們的需求。存儲庫抽象了 DBMS 和 ORM，並簡化了數據訪問邏輯。

- [](https://aspnetboilerplate.com/Pages/Documents/Authorization)[Authorization](https://aspnetboilerplate.com/Pages/Documents/Authorization)授權：ABP 可以聲明性地檢查權限。如果當前用戶沒有“更新任務”權限或未登錄，它會阻止對 UpdateTask 方法的訪問。ABP 不僅使用聲明性屬性，而且還有其他方式可以授權。

- [](https://aspnetboilerplate.com/Pages/Documents/Validating-Data-Transfer-Objects)[Validation](https://aspnetboilerplate.com/Pages/Documents/Validating-Data-Transfer-Objects)驗證：ABP 自動檢查輸入是否為空。它還根據標準數據註釋屬性和自定義驗證規則驗證輸入的所有屬性。如果請求無效，它會拋出一個正確的驗證異常並在客戶端處理它。

- [](https://aspnetboilerplate.com/Pages/Documents/Audit-Logging)[Audit Logging](https://aspnetboilerplate.com/Pages/Documents/Audit-Logging)審計日誌：根據約定和配置為每個請求自動保存用戶、瀏覽器、IP 地址、調用服務、方法、參數、調用時間、執行持續時間和一些其他信息。

- [](https://aspnetboilerplate.com/Pages/Documents/Unit-Of-Work)[Unit Of Work](https://aspnetboilerplate.com/Pages/Documents/Unit-Of-Work)工作單元：在 ABP 中，默認情況下每個應用程序服務方法都被假定為一個工作單元。它會自動創建一個連接並在方法開始時開始一個事務。如果該方法成功完成且無異常，則提交事務並釋放連接。即使此方法使用不同的存儲庫或方法，它們都將是原子的（事務性的）。提交事務時，實體上的所有更改都會自動保存。我們甚至不需要調用 _repository.Update(task) 方法，如上所示。

- [](https://aspnetboilerplate.com/Pages/Documents/Handling-Exceptions)[Exception Handling](https://aspnetboilerplate.com/Pages/Documents/Handling-Exceptions)異常處理：我們幾乎不需要在 Web 應用程序的 ABP 中手動處理異常。默認情況下所有異常都會自動處理！如果發生異常，ABP 會自動記錄並返回正確的結果給客戶端。例如，如果這是一個 AJAX 請求，它會向客戶端返回一個 JSON 對象，指示發生了錯誤。它對客戶端隱藏實際異常，除非異常是 UserFriendlyException，如本示例中所用。它還理解和處理客戶端的錯誤並向用戶顯示適當的消息。

- [Logging](https://aspnetboilerplate.com/Pages/Documents/Logging)：如您所見，我們可以使用基類中定義的 Logger 對象來編寫日誌。默認情況下使用 Log4Net，但它是可更改和可配置的。

- [](https://aspnetboilerplate.com/Pages/Documents/Localization)[Localization](https://aspnetboilerplate.com/Pages/Documents/Localization)本地化：注意我們在拋出異常時使用了 ‘L’ 方法嗎？這樣，它會根據當前用戶的文化自動進行本地化。有關更多信息，請參閱[本地化](https://aspnetboilerplate.com/Pages/Documents/Localization)文檔。

- [](https://aspnetboilerplate.com/Pages/Documents/Data-Transfer-Objects)[Auto Mapping](https://aspnetboilerplate.com/Pages/Documents/Data-Transfer-Objects)自動映射：在最後一行，我們使用 ABP 的 IObjectMapper 的 MapTo 方法映射輸入。屬性到實體屬性。它使用 AutoMapper 庫來執行映射。我們可以根據命名約定輕鬆地將屬性從一個對象映射到另一個對象。

- [](https://aspnetboilerplate.com/Pages/Documents/Dynamic-Web-API)[Dynamic API Layer](https://aspnetboilerplate.com/Pages/Documents/Dynamic-Web-API)動態 API 層：TaskAppService 實際上是一個簡單的類。我們通常必須編寫一個包裝器 API 控制器來向 JavaScript 客戶端公開方法，但 ABP 會在運行時自動執行此操作。這樣，我們就可以直接從客戶端使用應用程序服務方法。

- [](https://aspnetboilerplate.com/Pages/Documents/Dynamic-Web-API#dynamic-javascript-proxies)[Dynamic JavaScript AJAX Proxy](https://aspnetboilerplate.com/Pages/Documents/Dynamic-Web-API#dynamic-javascript-proxies)動態 JavaScript AJAX 代理：ABP 創建代理方法，使調用應用程序服務方法就像在客戶端調用 JavaScript 方法一樣簡單。

How it works

不要重複！ASP.NET Boilerplate 按照慣例自動執行常見的軟件開發任務。您專注於您的業務代碼。

![](https://aspnetboilerplate.com/images/home/abp-concerns.png)

Startup Templates

Free Startup Templates

![](https://aspnetboilerplate.com/images/home/module-zero-core-template.png)

ASP.NET Zero

![](https://aspnetboilerplate.com/images/aspnetzero/4.png)

索引集

[🔒[C#][.Net]學習範本 aspnetboilerplate 啟動 React.js+.Net Web Api](/2021/10/12/c-net%E5%AD%B8%E7%BF%92%E7%AF%84%E6%9C%AC-aspnetboilerplate-%E5%95%9F%E5%8B%95-react-js-net-web-api/)

參考資料：

Abp翻译文档：https://github.com/ABPFrameWorkGroup/AbpDocument2Chinese

ABP (ASP.NET Boilerplate) 應用程式開發框架 新手教學 No.0 全篇索引：https://dotblogs.com.tw/jakeuj/2016/07/28/abp0

基于DDD的现代ASP.NET开发框架–ABP系列文章总目录：https://www.cnblogs.com/mienreal/p/4528470.html

一步一步使用ABP框架搭建正式项目系列教程：https://www.cnblogs.com/farb/p/4849791.html

ABP Framework – Open Source Web Application Framework：[https://abp.io/](https://abp.io/)

擁抱開源 – AspNetBoilerplate(ABP) 框架簡介：[https://www.gss.com.tw/blog/%E6%93%81%E6%8A%B1%E9%96%8B%E6%BA%90-aspnetboilerplate-abp-%E6%A1%86%E6%9E%B6%E7%B0%A1%E4%BB%8B](https://www.gss.com.tw/blog/%E6%93%81%E6%8A%B1%E9%96%8B%E6%BA%90-aspnetboilerplate-abp-%E6%A1%86%E6%9E%B6%E7%B0%A1%E4%BB%8B)
