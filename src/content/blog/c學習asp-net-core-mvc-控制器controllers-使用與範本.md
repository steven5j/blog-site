---
title: "[C#][.NET]ASP.NET Core MVC 控制器(Controllers) 使用與範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-08-30
topic: software
series: csharp
heroImage: /public/uploads/wp/4587.jpg
wpId: 4587
slug: c-asp-net-core-mvc-controllers-4587
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/30/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%8e%a7%e5%88%b6%e5%99%a8controllers-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x   版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

範本參考

[個人Simple連結](https://github.com/steven5j/Blog/tree/main/ASP.NET%20Core%203.1%20Web%20%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%20MVCMovie%E7%AF%84%E6%9C%AC)

[官方Simple範例程式碼](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/tutorials/first-mvc-app/start-mvc/sample)

[C#程式語言目錄](/c程式語言開發/)

新增控制器

在Controller資料夾下，創建一個HelloWorldController.cs的類別。(如圖)

![](https://lh3.googleusercontent.com/pw/ACtC-3cEod7_jX_oJUnV5mFlzbhjltCSBh3TFn-kQgtSoDJDtzA1nAVRSGTvwtHlWPx1idh_Y8J35yrmcUa9HxLLEXlZxnlXsGy_4XSMby9x6HYqertFsy8MxNqdKd1_vN5A86IURG0aO974nZlOIldZT2aUeg=w441-h576-no?authuser=0)

以下列內容取代 Controllers/HelloWorldController.cs 的內容：

```
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class HelloWorldController : Controller
    {
        // 
        // GET: /HelloWorld/

        public string Index()
        {
            return "This is my default action...";
        }

        // 
        // GET: /HelloWorld/Welcome/ 

        public string Welcome()
        {
            return "This is the Welcome action method...";
        }

        // GET: /HelloWorld/Welcome_1/ 
        // Requires using System.Text.Encodings.Web;
        public string Welcome_1(string name, int numTimes = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
        }

        // GET: /HelloWorld/Welcome_2/ 
        public string Welcome_2(string name, int ID = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, ID: {ID}");
        }

    }
}
```

效果展示

GET: /HelloWorld/

![](https://lh3.googleusercontent.com/pw/ACtC-3e8wiJ0-d-phBBlysnNKs6zPcTFSsj0FvJGQUnfKz5xgPFcnOwf4IoY_L1OGIcjLrSDc_Nhk3Zbrrrri31T0h9ifVrsiTPmT_4UVRtirrQWfQaEvQR0mUeJIWyIyw3yL8z0nMeAopCjgUW9XACFjk9LUg=w800-h560-no?authuser=0)

GET: /HelloWorld/Welcome/

![](https://lh3.googleusercontent.com/pw/ACtC-3d7qar1_Z7pVmUbMb-1JX19765_2H0wVcW6Yb-jOzj9WhG6wqzpa_4ugzG_3RISors-90KpZx-jAqh55udMRMzEdgFZjQWO5SGIG56tFGBkJqXpV4n7D-iaYvb2sIHph7Zv-_AnDRjM7DlrOTPyZJfSkQ=w800-h560-no?authuser=0)

MVC 使用的預設 URL 路由邏輯使用像這樣的格式來判斷要叫用的程式碼：

```
/[Controller]/[ActionName]/[Parameters]
```

在 Startup.cs 檔案的 Configure 方法中設定路由格式

```
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
```

不提供任何 URL 區段時，則會預設為範本行5中指定的 “Home” 控制器和 “Index” 方法。

GET: /HelloWorld/Welcome_1/?name=jack&numTimes=2

給予參數的方式。

![](https://lh3.googleusercontent.com/pw/ACtC-3eIxuH0LbcReGH8IA_2QDrf1SF9DDpU3f1iWSoHqd5E_s-knVyoqjieUiAPb8_t0qhpcb72PYZLS_iIo_q9qIeqIh8ctyqmlTF4O19yE31zR1v0xB4wDU38x7tIGOLMvp1UoKTIxTqDKB-9NgvjQV5V7Q=w800-h560-no?authuser=0)

GET: /HelloWorld/Welcome_2/5?name=jack

![](https://lh3.googleusercontent.com/pw/ACtC-3dwGveZC6FQOsgRsad_TTNeinUcSTCqKx6pV43XObbbdy9_OeneaLHagbbvhxiArOXpE8z8k53SfJ8a9JQFHRvbF3Kr2E4dRp1wapzdFhCZedZWeQ-LUlqv9eMy6AmOyM-ATYjLzRPWVaszgxvBPkEDkg=w800-h560-no?authuser=0)

URL 區段符合路由參數 id，所以直接帶入

```
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});
```

參考資料：

第2部分：將控制器新增至 ASP.NET Core MVC 應用程式：[https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-3.1&tabs=visual-studio](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-3.1&tabs=visual-studio)
