---
title: "[C#][.NET]ASP.NET Core Identity 具有驗證機制的 Web 應用程式(一)"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-01-25
topic: software
series: csharp
tags:
  - Identity
wpId: 5739
slug: c-netasp-net-core-identity-web-5739
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/01/25/c-netasp-net-core-identity-%e5%85%b7%e6%9c%89%e9%a9%97%e8%ad%89%e6%a9%9f%e5%88%b6%e7%9a%84-web-%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e4%b8%80/"
---

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

範本參考

[個人Simple連結](https://github.com/steven5j/Blog/tree/main/ASP.NET%20Core%203.1%20Web%20%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%20MVCMovie%E7%AF%84%E6%9C%AC)

[官方Simple範例程式碼](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/security/authentication/identity/sample)

[C#程式語言目錄](/c程式語言開發/)

建立具有驗證的 Web 應用程式

ASP.NET Core Identity：

- 是支援使用者介面 (UI) 登入功能的 API。

- 管理使用者、密碼、設定檔資料、角色、宣告、權杖、電子郵件確認等等。

使用者可以建立具有儲存在中之登入資訊的帳戶， Identity 或可以使用外部登入提供者。 支援的外部登入提供者包括Facebook、Google、Microsoft 帳戶及 Twitter。

- 選取 [ 檔案] [ > 新增 > 專案]。

- 選取 ASP.NET Core Web 應用程式。 將專案命名為WebApp1 ，使其命名空間與專案下載相同。 按一下 [確定] 。

- 選取 ASP.NET Core Web 應用程式，然後選取 [變更驗證]。

- 選取 [個別使用者帳戶]，然後按一下 [確定]。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-1-1024x710.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-2-1024x710.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-4.jpg)

Data/Migration 是Model到Database間整合的中介模組，這裏，用來在資枓庫建置出存放驗證資料的相關資料表的模組。

Data/ApplicationDbContext.cs 為 ASP.NET Identity 搭配的 Entity Framework 資料物件 Data/Migrations 下兩個檔案用於定義 ASP.NET Identity 所需 SQL 資料庫的 Schema 資訊。

Areas/Identity/Pages 為會員管理相關介面，但只剩 _ViewStart.cshtml 可以微調版面，註冊新會員、帳號登入、修改密碼、忘記密碼等介面數十個 Razor Page cshtml 在 ASP.NET Core 2.1 後被收納到 Microsoft.AspNetCore.Identity.UI NuGet 程式庫。(如有特殊客製需求 [有方式修改](https://devblogs.microsoft.com/aspnet/aspnetcore-2-1-identity-ui/?WT.mc_id=DOP-MVP-37580)，但需留意調整不當將導致功能異常或影響資安。

套用移轉

ASP.NET CORE identity是code first的方式進行的，所以一開始需要套用Migration的方式來初始化資料庫。 在[套件管理器主控台]使用以下語法進行Code First 將程式碼轉移到資料庫。

```
PM> Update-Database
```

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-10-1024x209.png)

※因為是code first的方式，所以許多公司在考量使用的時候，需要多注意這塊，如果客製化需求大的專案，例如一些政府單位的案子，可能使用這種方式的話，需要修改的地方會非常多。

查看身分識別資料庫

ASP.NET Identity 預設使用 SQL Server Express LocalDB

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-9-1024x552.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-12.png)

有興趣實作雙因認證，可以參考文章[使用 ASP.NET Core 中的 SMS 的雙因素驗證](https://docs.microsoft.com/zh-tw/aspnet/core/security/authentication/2fa?view=aspnetcore-1.1)試看看。

設定 Identity 服務

加入 ConfigureServices。

設定的意義，註記在程式裏了

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
     // options.UseSqlite(
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection")));
    services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    services.AddRazorPages();
  
//複製以下行數
services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;               //密碼要有數字
                options.Password.RequireLowercase = true;           //要有小寫英文字母
                options.Password.RequireNonAlphanumeric = false;    //不需要符號字元
                options.Password.RequireUppercase = true;           //要有大寫英文字母
                options.Password.RequiredLength = 6;                //密碼至少要6個字元長
                options.Password.RequiredUniqueChars = 1;           //至少要有1個字元不一樣

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); //5分鐘沒有動靜就自動鎖住定網站，預設5分鐘
                options.Lockout.MaxFailedAccessAttempts = 5; //三次密碼誤就鎖定網站, 預設5次
                options.Lockout.AllowedForNewUsers = true; //新增的使用者也會被鎖定，就是犯規沒有新人優待

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true; //郵箱不能重覆使用
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

                options.LoginPath = "/Identity/Account/Login"; //登入頁
                options.AccessDeniedPath = "/Identity/Account/AccessDenied";//登出Action
                options.SlidingExpiration = true;
            });
  //複製以上行數
}
```

Identity藉由呼叫來啟用 UseAuthentication 。 

UseAuthentication會將驗證中介軟體新增。

```
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication(); //Identity藉由呼叫來啟用 UseAuthentication 。 UseAuthentication將驗證中介軟體新增至要求管線。
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
```

直接執行嘗試看看

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-13-1024x575.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-14-1024x575.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-15-1024x575.png)

也可以直接嘗試註冊看看，範本配置已經相當齊全

Scaffold Register、Login、登出和 RegisterConfirmation

.NET Core 2.1 以後，因為許多cshtml 都被收納了，所以我們要使用Scaffold 的方式建立出新的出來.

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-18.png)

使用Scaffold 的方式建立出來。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-12-1024x552.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-16-1024x710.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-17.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-19.png)

因為是範本檔，我們就直接全部勾選並新增上來

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-27.jpg)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/Image-22.jpg)

可以看到全部的頁面和後端城市都建立起來了，值得注意的是，他是直接分前後端，前端部分使用.cshtml，後端部分就是使用.cs，這樣的方式非常像微軟早期網頁主力WebForm的建構方式。

參考或引用資料來源：

簡介 Identity ASP.NET Core：[https://docs.microsoft.com/zh-tw/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio](https://docs.microsoft.com/zh-tw/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=visual-studio)

(Day 18) ASP.NET Core的驗證機制 – 上篇：[https://ithelp.ithome.com.tw/articles/10204475](https://ithelp.ithome.com.tw/articles/10204475)

ASP.NET Core 3.0 登入機制實作(claims-based authentication)：[http://ikevin.tw/2019/08/10/asp-net-core-3-0-%E7%99%BB%E5%85%A5%E6%A9%9F%E5%88%B6%E5%AF%A6%E4%BD%9Cclaims-based-authentication/](http://ikevin.tw/2019/08/10/asp-net-core-3-0-%E7%99%BB%E5%85%A5%E6%A9%9F%E5%88%B6%E5%AF%A6%E4%BD%9Cclaims-based-authentication/)

[Day 25] 用ASP.NET MVC 做簡單的註冊及登入系統(一)：[https://ithelp.ithome.com.tw/articles/10195671](https://ithelp.ithome.com.tw/articles/10195671)

[會員登入] 不使用ASP.NET Core Identity 的 Cookie 驗證 (ClaimsIdentity)：[https://dotblogs.com.tw/mis2000lab/2020/02/14/AspNet_Core_Authentication_cookie_ClaimsIdentity](https://dotblogs.com.tw/mis2000lab/2020/02/14/AspNet_Core_Authentication_cookie_ClaimsIdentity)

小試 ASP.NET Core Identity：[https://blog.darkthread.net/blog/aspnetcore-identity/](https://blog.darkthread.net/blog/aspnetcore-identity/)

人生記事本 @kevin的日記：[https://dotblogs.azurewebsites.net/Kevin_Date/Tags?qq=Identity](https://dotblogs.azurewebsites.net/Kevin_Date/Tags?qq=Identity)
