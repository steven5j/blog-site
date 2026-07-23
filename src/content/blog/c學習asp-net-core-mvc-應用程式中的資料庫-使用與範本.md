---
title: "[C#][.NET]ASP.NET Core MVC 應用程式中的資料庫 使用與範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-09-05
topic: software
series: csharp
heroImage: /public/uploads/wp/4651.jpg
wpId: 4651
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/09/05/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e4%b8%ad%e7%9a%84%e8%b3%87%e6%96%99%e5%ba%ab-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x    版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

資料庫產品版本：SQL Server 2014 Express Edition (64-bit)

資料庫版本編號：12.0.2000.8

範本參考

[個人Simple連結](https://github.com/steven5j/Blog/tree/main/ASP.NET%20Core%203.1%20Web%20%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%20MVCMovie%E7%AF%84%E6%9C%AC)

[官方Simple範例程式碼](https://github.com/dotnet/AspNetCore.Docs/tree/master/aspnetcore/tutorials/first-mvc-app/start-mvc/sample)

[C#程式語言目錄](/c程式語言開發/)

繼上篇[[C#學習]ASP.NET CORE MVC 模型(MODELS) 使用與範本](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/31/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%a8%a1%e5%9e%8bmodels-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/) 進行延續學習使用範本

MvcMovieContext 物件

- 會處理連線到資料庫

- 將 Movie 物件對應至資料庫記錄的工作。

在 Startup.cs 檔案的 `ConfigureServices` 方法中，以[相依性插入](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-5.0)容器登錄資料庫內容，第5、6行程式碼：

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews();

    services.AddDbContext<MvcMovieContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("MvcMovieContext")));
}
```

ASP.NET Core [組態](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0)系統會讀取 `ConnectionString`。 對於本機開發，它會從 appsettings.json 檔案取得連接字串：

```
"ConnectionStrings": {
  "MvcMovieContext": "Server=(localdb)\\mssqllocaldb;Database=MvcMovieContext-2;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

SQL Server Express LocalDB

LocalDB 為輕量版的 SQL Server Express Database Engine，鎖定程式開發為其目標。 LocalDB 會依需求啟動，並以使用者模式執行，因此沒有複雜的組態。 根據預設，LocalDB 資料庫會在C：/Users/{user} 目錄中建立 .mdf 檔案。

![](https://lh3.googleusercontent.com/pw/ACtC-3cRkpIDSxobRqe900QbY3hL4GpzQLL7vOIhOUHU_uVXCJmIsIuDz12c0r7vsZwJ3XzJLzNc8EwCQpV8wfv49ifJjn1v2aAYpuQ51moOnJ-ivtq9LSo-3KiusXAC9wIt4JpP2-QORo8yL550t52x0X_R2A=w1675-h903-no?authuser=0)

請注意ID 旁的索引鍵圖示。 根據預設，EF 會將名為 ID 的屬性設為主索引鍵。

![](https://lh3.googleusercontent.com/pw/ACtC-3dbQY22exGq1IVEmx3k9mrbFVnWOwdSk2MF40WIEwZq1pW8zJLXyzpT-xZYkmiQk4jEIjx5eaaYKYQkdiFS09RSLF5oXWxuYW9cpZI67AEr_u2MWT5ugcYgsAvuLATpOuGQO_05d4LEUo_rAnGnvGXLHA=w1675-h903-no?authuser=0)

植入資料庫

接下來是使用市場上常說到的Code First的方式，在 Models 資料夾中建立 SeedData 的新類別。 使用下列程式碼取代產生的程式碼：

![](https://lh3.googleusercontent.com/pw/ACtC-3e5tWwgVZsRYbHLDdMoXp7nTGO4Jn6rwMOfGpn4PRc3YNMc5ssGHgDDWjFIoyxJ-J26XAA9XpbKsmUG6-C6azQqL3SfRehlwMbgvxeyNv-676Jkqqnx-qFM_oIu_hMvGsMVti_N_nYAf4LWt-naOslOnA=w433-h584-no?authuser=0)

```
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MvcMovie.Data;
using System;
using System.Linq;

namespace MvcMovie.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MvcMovieContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<MvcMovieContext>>()))
            {
                // Look for any movies.
                if (context.Movie.Any())
                {
                    return;   // DB has been seeded
                }

                context.Movie.AddRange(
                    new Movie
                    {
                        Title = "When Harry Met Sally",
                        ReleaseDate = DateTime.Parse("1989-2-12"),
                        Genre = "Romantic Comedy",
                        Price = 7.99M
                    },

                    new Movie
                    {
                        Title = "Ghostbusters ",
                        ReleaseDate = DateTime.Parse("1984-3-13"),
                        Genre = "Comedy",
                        Price = 8.99M
                    },

                    new Movie
                    {
                        Title = "Ghostbusters 2",
                        ReleaseDate = DateTime.Parse("1986-2-23"),
                        Genre = "Comedy",
                        Price = 9.99M
                    },

                    new Movie
                    {
                        Title = "Rio Bravo",
                        ReleaseDate = DateTime.Parse("1959-4-15"),
                        Genre = "Western",
                        Price = 3.99M
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
```

如果資料庫中有任何電影，則SeedData初始設定式會返回，而且不會新增任何電影。

```
if (context.Movie.Any())
{
    return;   // DB has been seeded.
}
```

新增SeedData .cs在Program.cs初始設定式

Program.cs ，在Main 進入點修改以下7~26行內容。

```
namespace MvcMovie
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //CreateHostBuilder(args).Build().Run();

            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    SeedData.Initialize(services);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }

            host.Run();
        }
    }
}
```

![](https://lh3.googleusercontent.com/pw/ACtC-3cLWybSGwCtiAFxoRieD2y7Ygla1zkpr59Qgn0iL6X9Iu-EQKVucovlKMwX_lNzxUorB6YI3lk6Z_GcGo4p5JL9w_fSy42zFeqKxVH-IE7ebpsODdrEMdQ5DPmcGWszZrv5L8q9xn7Xt7Xz1PGC3zPaeA=w1273-h702-no?authuser=0)

範本參考

[Demo範本連結](https://github.com/steven5j/Blog/tree/main/ASP.NET%20Core%203.1%20Web%20%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%20MVCMovie%E7%AF%84%E6%9C%AC)

[C#程式語言目錄](/c程式語言開發/)

參考資料：

第5部分：使用 ASP.NET Core MVC 應用程式中的資料庫：[https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/working-with-sql?view=aspnetcore-5.0&tabs=visual-studio](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/working-with-sql?view=aspnetcore-5.0&tabs=visual-studio)
