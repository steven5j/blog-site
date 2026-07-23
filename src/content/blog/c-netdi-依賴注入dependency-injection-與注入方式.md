---
title: "[C#][.NET]DI 依賴注入(Dependency Injection) 與注入方式"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-06-19
topic: software
series: csharp
heroImage: /public/uploads/wp/6254.jpg
wpId: 6254
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/06/19/c-netdi-%e4%be%9d%e8%b3%b4%e6%b3%a8%e5%85%a5dependency-injection-%e8%88%87%e6%b3%a8%e5%85%a5%e6%96%b9%e5%bc%8f/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/06/C.NETDI-依賴注入Dependency-Injection-與注入方式-1024x576.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

服務生存期

ASP.NET Core 提供了一個內置的服務容器 IServiceProvider 負責管理服務的生命週期，從被依賴注入容器創建開始（就是將服務注入到你要使用的類的構造函數中），然後框架負責 創建依賴關係的實例，並在不再需要時進行處理（就是說等我們調用完，容器會自己去對時注入的服務進行釋放）。

在DI 容器中控管服務的生命週期

在Startup的ConfigureServices可以注入我們想要的服務，在注入的時候有三種模式可以選擇↓

Transient (暫時性的實體)

–每次要求(注入)元件時就建立一個新的Instance，永不共用。

Scoped (具範圍的實體)

– 在網頁 Request 處理過程(指接到瀏覽器請求到回傳結果前的執行期間)共用一個 Instance，並在第一次注入時建立物件，但是下個Request的HashCode就會不一樣。

Singleton (單一實體)

-當應用程式啟動時，會在第一次注入時或在註冊進 DI 容器時建立物件，整個 Process 只建立一個 Instance，任何時候都共用它。。

ASP.NET Core中就自帶DI，所以建議任何服務本身最好也用DI注入其他服務，也不要在服務類別中直接new出其他服務的物件。

服務註冊

```
//通用寫法
services.Add(new ServiceDescriptor(typeof(IDataService), typeof(DataService), ServiceLifetime.Transient));
//精簡寫法
services.AddTransient<IDataService, DataService>();
//未另宣告介面，直接使用實作型別
services.AddTransient<DataService>();
//註冊Scoped或Singleton，做法相同
services.AddSingleton<GlobalService>();
services.AddScoped<MyService>();
```

.net core DI (dependency injection)的注入方式

.net core 3.1 MVC架構中的在一般程式區域使用使用DI (dependency injection)注入方式

Constructor injection

```
//在Controller內建構給所有action使用
private readonly IDataService _dataService;

public HomeController(IDataService dataService)
{
    _dataService = dataService;
}
```

Method injection

```
//在action的arg使用[FromServices]
public IActionResult Index([FromServices] IDataService dataService2)
```

Service locator

```
//從RequestServices拿
IDataService dataService3 = HttpContext.RequestServices.GetService(typeof(IDataService)) as IDataService;
```

使用上的，三個是沒有什麼太大差別。

如何取得HttpContext?

如果程式不是繼承自Controller..等，而是額外需要獲取HttpContext的，那就可以先使用依賴注入的方式注入IHttpContextAccessor，然後再利用IHttpContextAccessor取得HttpContext

範例：第12行

```
internal class PermissionAuthorizationHandler 
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public PermissionAuthorizationHandler(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

		public  void test()
        {
            var test = _contextAccessor.HttpContext.RequestServices.GetService(typeof(IDataService)) as IDataService;
        }
}
```

一般優先會先使用第一種Constructor injection

個人避免第三種方式來使用DI容器,因為Service locator無法很容易進行單元測試(Service locator強依賴於DI容器)

所有DI容器都是為了解決物件中的依賴和物件生命週期,我之前也寫關於Autofac (IOC)容器介紹
, 雖然不是介紹.net core DI但核心概念是一樣的

在.net core 3.1 MVC架構中的View 的注入方式

在Razor頁面(.cshtml)使用DI (dependency injection)注入方式 @inject

```
@inject IDataService<T> DataService
```

範例：

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/06/image-1-1024x304.png)

參考或引用資料：

[Day04] 依賴注入 (Dependency Injection) – 我與 ASP.NET Core 3 的 30天：[https://ithelp.ithome.com.tw/articles/10251470](https://ithelp.ithome.com.tw/articles/10251470)

ASP.NET Core 內建可注入的服務：[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#framework-provided-services](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#framework-provided-services)

Dependency injection in ASP.NET Core：[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1)

筆記 – 不可不知的 ASP.NET Core 依賴注入：[https://blog.darkthread.net/blog/aspnet-core-di-notes/](https://blog.darkthread.net/blog/aspnet-core-di-notes/)

.NET Core 依賴注入語法進化：[https://abstreamace.com/sglab/2020/07/24/net-core-%E4%BE%9D%E8%B3%B4%E6%B3%A8%E5%85%A5%E8%AA%9E%E6%B3%95%E9%80%B2%E5%8C%96/](https://abstreamace.com/sglab/2020/07/24/net-core-%E4%BE%9D%E8%B3%B4%E6%B3%A8%E5%85%A5%E8%AA%9E%E6%B3%95%E9%80%B2%E5%8C%96/)

.net core 注入中的三种模式：Singleton、Scoped 和 Transient：[https://developer.aliyun.com/article/701337](https://developer.aliyun.com/article/701337)
.net core 2.1 DI (dependency injection)的三種注入方式有什麼不同嗎?：[https://ithelp.ithome.com.tw/questions/10201262](https://ithelp.ithome.com.tw/questions/10201262)

DI(Dependency injection) 注入方式：[https://ithelp.ithome.com.tw/questions/10201262](https://ithelp.ithome.com.tw/questions/10201262)

控制反轉 (IoC) 與 依賴注入 (DI)：[https://notfalse.net/3/ioc-di](https://notfalse.net/3/ioc-di)
