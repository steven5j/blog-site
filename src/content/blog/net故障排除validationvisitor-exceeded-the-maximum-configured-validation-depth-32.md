---
title: "[C#][.NET]故障排除ValidationVisitor exceeded the maximum configured validation depth &#8217;32&#8217;"
description: "環境與版本 作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110 開發軟 [&hellip;]"
pubDate: 2021-12-05
topic: software
series: csharp
heroImage: /public/uploads/wp/6894.png
wpId: 6894
slug: net-validationvisitor-exceeded-the-maximum-confi-6894
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/12/05/net%e6%95%85%e9%9a%9c%e6%8e%92%e9%99%a4validationvisitor-exceeded-the-maximum-configured-validation-depth-32/"
---

環境與版本

作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/12/image-1024x457.png)

事件經過：

在某次發佈檔案準備提交給客戶單位的時候，在本人電腦本來一切正常運轉運作，後來給予測試人員測試，結果在測試人員的電腦上測試時，卻在某個頁面的按鈕發生了500的錯誤，使用debug模式查看，此訊息：

InvalidOperationException: ValidationVisitor exceeded the maximum configured validation depth ’32’ when validating type ‘你的路徑’. This may indicate a very deep or infinitely recursive object graph. Consider modifying ‘MvcOptions.MaxValidationDepth’ or suppressing validation on the model type.

這件事弔詭的事情，主要是因為該頁面在某個session連結下的時候，才會發生這樣的問題，而在其他session連結下的時候，完全不會有這樣的狀況，從頭到尾只差在session連結不同而已，詭異問題歸詭異問題，但是問題還是要解決。

解決：

後來在這篇stackoverflow [[ASP.net Core API : ValidationVisitor exceeded the maximum configured validation depth ’32’](https://stackoverflow.com/questions/63112368/asp-net-core-api-validationvisitor-exceeded-the-maximum-configured-validation)] 下找到答案

一種解決方法是在 Startup.ConfigureServices 中增加 MaxModelValidationErrors：

```
services.AddMvc()
    .AddMvcOptions(options => {
    options.MaxModelValidationErrors = 999999;
})
```

原因：

MaxAllowedErrors 和 MaxValidationDepth 背後的想法似乎是為了避免遞歸錯誤無限增加。

因此，當發生這種情況時，這是代碼問題而不是用戶問題，並且您向用戶顯示的數據可能很瘋狂（例如，相同的兩條錯誤消息中的每一條都有 16 個實例）

如果打算有這麼深的深度，那麼按照錯誤消息的建議修改該值即可。

參考或引用資料：

Model validation: Exception thrown when there are more than (MaxAllowedErrors + MaxValidationDepth) errors #13778：[https://github.com/dotnet/aspnetcore/issues/13778](https://github.com/dotnet/aspnetcore/issues/13778)

ASP.net Core API : ValidationVisitor exceeded the maximum configured validation depth ’32’：[https://stackoverflow.com/questions/63112368/asp-net-core-api-validationvisitor-exceeded-the-maximum-configured-validation](https://stackoverflow.com/questions/63112368/asp-net-core-api-validationvisitor-exceeded-the-maximum-configured-validation)
