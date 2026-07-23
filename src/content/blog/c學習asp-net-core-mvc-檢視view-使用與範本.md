---
title: "[C#][.NET]ASP.NET Core MVC 檢視(View) 使用與範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-08-30
topic: software
series: csharp
heroImage: /public/uploads/wp/4596.jpg
wpId: 4596
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/30/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%aa%a2%e8%a6%96view-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/"
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

繼上篇 [[C#學習]ASP.NET CORE MVC 控制器(CONTROLLERS) 使用與範本](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/30/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%8e%a7%e5%88%b6%e5%99%a8controllers-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/) 進行延續學習使用範本

新增檢視

在 Controller/HelloWorldController.cs 類別中，以下列程式碼取代 Index 方法：

```
public IActionResult Index()
{
    return View();
}
```

會呼叫控制器的 View 方法。

會傳回 IActionResult (或衍生自 ActionResult 的類別)

在Views 資料夾下，創建資料夾 HelloWorld 並創建 index.cshtml

註：.cshtml 為 微軟的項目Razor頁面。 

![](https://lh3.googleusercontent.com/pw/ACtC-3f5ny2a5xQgBYJtPUBaMFzOZGRgub9yhACMASv9ttu6fr161thkVu4Rll14bYp6bKfTbAR95NZ-IO0W-CmYUkpKQmAfZE5SUM9bjuyaABAekPhr1-70LJn-n6EafqlYQoPV8kKOndsw6pnQ0tvpCty2Ig=w436-h753-no?authuser=0)

下列內容取代 Views/HelloWorld/Index. cshtml 的檔案內容

```
@{
    ViewData["Title"] = "Index";
}

<h2>Index</h2>

<p>Hello from our View Template!</p>
```

GET:/HelloWorld

![](https://lh3.googleusercontent.com/pw/ACtC-3d_gCFNQGD-IE4V500UbcWVb0J3x04rX7Ti07C2KOLaa3XmaCAqICe16lAXRENFdNkfqOliSfxzCSJWTcewMv3WmfVV7X2cYqbtcGCuMG9AbutWUhsvuVfMHzoC7Ls2NbDFPUYiFOCvbtOZA1oqKWENng=w824-h428-no?authuser=0)

變更配置檔案中的標題、頁尾及功能表連結

以下資料代替Views/Shared/_Layout. cshtml 的檔案內容

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Movie App</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" asp-controller="Movies" asp-action="Index">Movie App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2020 - Movie App - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    @RenderSection("Scripts", required: false)
</body>
</html>
```

每個頁面會顯示相同的功能表配置。 功能表配置是在 Views/Shared/_Layout.cshtml 檔案中實作。

第34行，@RenderBody 是顯示您建立之所有檢視特定頁面的預留位置

選取 Privacy 連結。 請注意，瀏覽器索引標籤上的標題會顯示 Privacy Policy – Movie App，而不是 Privacy Policy – MvcMovie：

![](https://lh3.googleusercontent.com/pw/ACtC-3f3u7NvBB-rpkGu41sQLkw-EdAWwL9zrL8ehInP1ochJaZM_zZqP72KQLQk6vg_3XkQ5yVM5h-rNJxn4EwEh3eNHaTbovAgwr90HwAYp0c0yBjndKOKqogelPIMEL7U4djL1Np0NE_sgoDbPt4xzUL_rA=w831-h391-no?authuser=0)

查看Views/_ViewStart.cshtml 檔案：

```
@{
    Layout = "_Layout";
}
```

Views/_ViewStart.cshtml 檔案會將 Views/Shared/_Layout.cshtml 檔案引入每一個View的頁面。

變更 Views/HelloWorld/Index.cshtml 檢視檔案的標題和元素：

```
@{
    ViewData["Title"] = "Movie List";
}

<h2>My Movie List</h2>

<p>Hello from our View Template!</p>
```

GET：/HelloWorld

![](https://lh3.googleusercontent.com/pw/ACtC-3eCEHpoYEspoNZyPtFeFZzhw6oc8onfxmGYaLDr5qt5JLJ7sk1zJlprAj_vu7MCKNyrAXwA8TTIJ1ODBbYzziOUAXazpRGjyR_8oDVnLnJAFw71u2lC8msGOqUjr9Fgt5PxIb-e1vtTn64cbNGxLfBEmA=w805-h399-no?authuser=0)

Index.cshtml 檢視範本中的內容已與 Views/Shared/_Layout.cshtml 檢視範本合併。

將資料從控制器傳遞至檢視

在Controller/HelloWorldController.cs加入以下7~13行內容

```
namespace MvcMovie.Controllers
{
    public class HelloWorldController : Controller
    {// 
        // GET: /HelloWorld/Welcome/ 

        public IActionResult Welcome(string name, int numTimes = 1)
        {
            ViewData["Message"] = "Hello " + name;
            ViewData["NumTimes"] = numTimes;

            return View();
        }
    }
}
```

建立名為 Views/HelloWorld/Welcome.cshtml 的 Welcome 檢視範本。

![](https://lh3.googleusercontent.com/pw/ACtC-3fbB5JfZ9aaGwPk45rZzN_eHRXEV-2kMKRO5SvhnSErJtOCCV2mZXSFVqIzLva_La1IFinb_l4lCSX2JVG6EOoTLOZY4H5z3lib1KHJUWJ_bo8Uw2mPnI-zQPpxgNg0TPkYAbagoh28fA-Pxk3alVn90A=w433-h757-no?authuser=0)

使用下列內容取代 Views/HelloWorld/Welcome.cshtml 的內容：

```
@{
    ViewData["Title"] = "Welcome";
}

<h2>Welcome</h2>

<ul>
    @for (int i = 0; i < (int)ViewData["NumTimes"]; i++)
    {
        <li>@ViewData["Message"]</li>
    }
</ul>
```

GET：/HelloWorld/Welcome?name=jack&numtimes=5

![](https://lh3.googleusercontent.com/pw/ACtC-3fFe9d90UnEvvwJIeVn6_phZw7eNkFvxjs425cs0NuQWXUJEFXRiH1Cy6U4XlHIarVSGg5h2YJxuILzfHBJYhxbksWtXOz_0ldfNzSgnjXxANafJg6AagPEisrKMqiQ8xclqqf9kO3_qQkHMvUzk4JG_g=w1143-h518-no?authuser=0)

參考資料：

第3部分：將視圖新增至 ASP.NET Core MVC 應用程式：[https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-view?view=aspnetcore-3.1&tabs=visual-studio](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-view?view=aspnetcore-3.1&tabs=visual-studio)

何時應該使用 ViewBag、ViewData 或 TempData：[https://rachelappel.com/2014/01/02/when-to-use-viewbag-viewdata-or-tempdata-in-asp-net-mvc-3-applications/](https://rachelappel.com/2014/01/02/when-to-use-viewbag-viewdata-or-tempdata-in-asp-net-mvc-3-applications/)
