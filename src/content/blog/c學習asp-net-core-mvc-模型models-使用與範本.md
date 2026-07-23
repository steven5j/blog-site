---
title: "[C#][.NET]ASP.NET Core MVC 模型(Models) 使用與範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-08-31
topic: software
series: csharp
heroImage: /public/uploads/wp/4602.jpg
wpId: 4602
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/31/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%a8%a1%e5%9e%8bmodels-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/"
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

繼上篇[[C#學習]ASP.NET CORE MVC 檢視(VIEW) 使用與範本](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/08/30/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%aa%a2%e8%a6%96view-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/) 進行延續學習使用範本

新增資料模型類別

在創建Models資料夾下創建Movie.cs

![](https://lh3.googleusercontent.com/pw/ACtC-3dl_FInZBEYReWpSRgx3HhN75bNgNtJP8qTozu70xw1hDvuKfcqZ1Gnx9qLgTNGEpq63EaN6Jel14vFEE6SIzTlvrIVcYhU_h8kISD4-LKAGoW0pBlT1Ye2MA-Md5GLb624MvOGfYpJfJa2tyJnfj09pg=w433-h584-no?authuser=0)

使用下列程式碼更新 Movie.cs 檔案：

```
using System;
using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}
```

第9行 Id 欄位是資料庫的必要欄位，將作為主索引鍵。

第11行 [DataType](https://docs.microsoft.com/zh-tw/dotnet/api/system.componentmodel.dataannotations.datatype)上的屬性 `ReleaseDate` 指定資料 (Date的類型 ) 。 使用此屬性：

- 使用者不需要在日期欄位中輸入時間資訊。

- 只會顯示日期，不會顯示時間資訊。

新增 NuGet 套件

NuGet是一個自由開源軟體包管理系統。用於Microsoft開發平台。以前稱NuPack。針對. NET (包括. NET Core)，Microsoft 支援的共用程式碼機制

在工具->NuGet套件管理員->PMC(Package Magament Console 套件管理器主控台)

![](https://lh3.googleusercontent.com/pw/ACtC-3eo0653Ld_vrZhmsLaev4CDZTugDpuCp8jnzKjoy5J1EUmpr71KKdJjscozuG2ykfNWiAo1yHNTLbuw6Yz4kFjRdEI6eS6Lxc-5LRvQCrg_SBc7WDcvWnJZtFfpTFLKSHEE_5_h3UrVg6UVo63Eh0LqaQ=w1436-h240-no?authuser=0)

輸入以下 安裝程式碼

```
Install-Package Microsoft.EntityFrameworkCore.SqlServer
```

命令會新增 EF Core SQL Server 提供者。 提供者套件會將 EF Core 套件作為相依性安裝。 

建立資料庫內容類別

資料庫內容類別是使用MvcMovie/Models/Movie.cs 的模型(必要) ，使用EF Core 產生功能 (建立C、讀取R、更新U、刪除D) 。

建立Model/Data/MvcMovieContext.cs，並新增以下內容：

![](https://lh3.googleusercontent.com/pw/ACtC-3cB6sqAJnjsEJf2lgQhPkO0EcCFIugBjqHlPl7-cc4x1DaSp3LL0yTa4VghIPGDc-F3WbRbym4KNozaAkim35vxxaof3PAH_VqBX5OrNbB5bmvOGY8dWtVjZoAXNeAtNBO397CqpoosGoIJffgydIICZg=w433-h593-no?authuser=0)

```
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movie { get; set; }
    }
}
```

第13行 程式碼內[DbSet <Movie> ](https://docs.microsoft.com/zh-tw/dotnet/api/microsoft.entityframeworkcore.dbset-1)會建立實體集。 在 Entity Framework 詞彙中，實體集通常會對應至資料庫資料表。 實體會對應至資料表中的資料列。

![](https://lh3.googleusercontent.com/pw/ACtC-3dkHCmuY2g-X6Pviwa379Qiq2cW57GN5g7UDCMJK3GduilPHLLNsFWT2NIqp8Mq5r_gqOg2E-BUHsu6lV-yc5Qjj6dyBBVJBYXULwzsXMHUl9g9Q9JdxOuYFOPYlWKR0668PcsdkVnyZzpoiInKQfJjMw=w769-h110-no?authuser=0)

登錄資料庫內容

ASP.NET Core 內建相依性插入 (DI)。 服務 (例如 EF Core 資料庫內容) 必須在應用程式啟動期間向 DI 進行註冊。 需要這些服務的元件 (例如 Razor 頁面) 是透過函式參數提供這些服務。 取得資料庫內容執行個體的建構函式程式碼。

在 Startup.cs 最上方新增下列 using 陳述式：

```
using MvcMovie.Data;
using Microsoft.EntityFrameworkCore;
```

在 Startup.ConfigureServices 中新增下列第5~6行的程式碼：

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews();

    services.AddDbContext<MvcMovieContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("MvcMovieContext")));
}
```

連接字串的名稱，會透過對 [DbContextOptions](https://docs.microsoft.com/zh-tw/dotnet/api/microsoft.entityframeworkcore.dbcontextoptions) 物件呼叫方法來傳遞至內容。 作為本機開發之用，[ASP.NET Core configuration system](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0) 會從 appsettings.json 檔案讀取連接字串。

新增資料庫連線字串

將13~14行連接字串新增至檔案 * 上的appsettings.js* ：

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  //"ConnectionStrings": {
  //  "MvcMovieContext": "Server=(localdb)\\mssqllocaldb;Database=MvcMovieContext-1;Trusted_Connection=True;MultipleActiveResultSets=true"
  //},
  "ConnectionStrings": {
    "MvcMovieContext": "Server=(localdb)\\mssqllocaldb;Database=MvcMovieContext-2;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}

```

使用 scaffolding 程式碼產生器

使用 scaffolding 工具來為影片模型產生建立、讀取、更新和刪除 (CRUD) 頁面。

![](https://lh3.googleusercontent.com/pw/ACtC-3fQn4adVM6tRkYaG70HzhY5WSsBHbfu7CvD_h2U3p-bTpGWdOKQKYZjquC2v5ZfRq_AXzKW_YNduYHB2tgRZf6SRzs5jPxgfuvo1DdCmMfmTjm4ZvWc3cnvg_1g_W4dRSEpPYQCDKl_eI5CEI2cn-pNMA=w857-h860-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3f25unEXATQojCOVs7xibZA-gY9vApagMpiNzVN_bu10nDNbrCukNmoP_Rx-YSTXwZUp-BWVWCXoqM0Nr1f9iPs3i0_fzNYDoiJke-Qq5pVopX6fiFm87pxVDMqMfDwNtCJWDHcnzWj4fnfwC5HTT2WRg=w1178-h817-no?authuser=0)

模型類別: Movie (MvcMovie.Models)
資料內容類別： MvcMovie.Data.MvcMovieContext.cs (MvcMovie 的資料) 
檢視： 保持核取預設的每一個選項
控制器名稱： 保留預設值 MoviesController
選取 [新增]

![](https://lh3.googleusercontent.com/pw/ACtC-3dLsFEG3JJ-GkJCZPFNGcw3tuJ3oL97uMcWEplDDeVTlxoZTCFYGTQjQl-OXdTYermUX2pW28-UvifwNdT-jKsLZVNLiOjUjSG2CjDRSPwQkZ2KMxKfYc8XVGO9Bn0xd-913tN-KPWWo6ZfA78FuCH5Bw=w734-h456-no?authuser=0)

接下來Visual Studio就會自動會建立：

- Controllers/MoviesController.cs

- Razor 查看建立、刪除、詳細資料、編輯和索引頁面的檔案 (Views/Movies/ * cshtml)

自動建立這些檔案的流程稱為 scaffolding。

初始移轉

使用 EF Core 的 [移轉](https://docs.microsoft.com/zh-tw/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-5.0) 功能來建立資料庫。 移轉是一組工具，可讓您建立和更新資料庫，使其與您的資料模型相符。

從 [工具]功能表中，選取 [NuGet 套件管理員] >[套件管理器主控台Package Manager Console](PMC)。

![](https://lh3.googleusercontent.com/pw/ACtC-3caAQiyKDu46FaXwzzzR848GSib7ZvXI-OS0LTkZco0Y_52iY9GFtc-zoxJ1pohQmO2ebBFsiWIiGJzGUaQZGpXtVKLPnY5m9trOOkzc29ztxIs3PrKvrtkliXGQBzrYpi4qOxoMG31ZSpoXw5r6RsmRQ=w669-h523-no?authuser=0)

輸入下列命令：

```
Add-Migration InitialCreate
Update-Database
```

- `Add-Migration InitialCreate`：產生 migrations/{timestamp} _InitialCreate .cs 遷移用的檔案。 `InitialCreate` 引數是移轉名稱。 您可以使用任何名稱，但依照慣例，會選取描述移轉的名稱。 因為這是第一次移轉，所產生類別會包含建立資料庫結構描述的程式碼。 資料庫結構描述是以 `MvcMovieContext` 類別為基礎。

- `Update-Database`：將資料庫更新為先前命令所建立的最新遷移。 此命令會執行 Migrations/{time-stamp}_InitialCreate.cs 檔案中的 `Up`  function，其會建立資料庫。

- 

檢查 Migrations/{timestamp}_InitialCreate.cs 移轉檔案：

```
public partial class Initial : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Movie",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:ValueGenerationStrategy", 
                                 SqlServerValueGenerationStrategy.IdentityColumn),
                Title = table.Column<string>(nullable: true),
                ReleaseDate = table.Column<DateTime>(nullable: false),
                Genre = table.Column<string>(nullable: true),
                Price = table.Column<decimal>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Movie", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Movie");
    }
}
```

Up 方法會建立 Movie 資料表，並將 Id 設為主索引鍵。 Down 方法會還原 Up 移轉所做的結構描述變更。

測試應用程式

開啟應用程式，然後按一下 [Movie App]**** 連結。

![](https://lh3.googleusercontent.com/pw/ACtC-3fYmD5fcqRA06f9hpMUJ9u4WhzjhYiUhj9a_WR-FHhTuIUZhrm9xLQt92CMe6dR_QKuiKhi1qwTxTAzHnWhsfF_haWXOKXpac79UvmlHkTrnXZ5An-XKqIcp-p8VVvY9vLOqbga-6N-MUo5xUxU6dWvzg=w724-h396-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3eHTzF20lSwW0du99ueoTkpKMVD5lSP1S0pKvQQqpT45m_uFVz6EbyJa5fah5AdG4L3qFOEr3iepTXjlUBcmmSwkNInnnnMokLrlAqQgpH-y0nSiCx10rNfp9X4Z2YRm9_QNLr3nLUNcLtznzwfv2Uk4Q=w722-h499-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3cqDDQM2kXM6NrQ_B69Ajir3s73navFxpCR6izk29kuExgYVVoYreqWCX1EY0fBiKdmqZa2FRqMP4z4Ny-vdsuaZY_dv9I-XCPIZoXN3VSI1zNjzXCrsvlH88-NnLCmxdZd0ldyp0ybgnTEJLXlLBjLWA=w724-h874-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3dXOM5s07TjHL1s8kTmVCq4-1zRqctpWthPo6KcN0p3VFkOuRVURin3U27emGZjUBpjWb_7GjWrIkH-Xcb-Zk_SKnuAASkdqmGy5MXALvH-_U0U9MgX-Meg7jxNP6nK4tzXV6NGdZerBTUpb0PUlIj78A=w724-h526-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3c_2kCg3PdBGAl--y0x24OTINTsyWx1Mi6O76QSa51aXurLSvc6n9TBMLrPLqNHROL10RFGTtt-VixZ03T0JBDW6VW_Es1jz755gyhqYGhfo_6fLb3GX6lhO7XyM_q5KhvzAi-pBdFgmjqT_iEFBIfolQ=w724-h868-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3fk23Rh5B_npt7nSi3qMnUZ73vkY0v5h-6T2NRsal_3TWIeK2iu7agay88hpdtXO4I6lOHRk6nPAhMKk6seizYV0OxBa-CXDBz7q9seSUa21d9ycE5gdT_vBXVsUjEF8ZF8R3qgmXxV1H1LuKRVpyAUaA=w724-h868-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3eImDBmbNOr9v1x7mLDeQ1gAhaDXgHUYlB-FXHfuJ5RmSkx1vmlQMmu1_HNK6P7zQwwRx-vFho3oApAIpZZbDDSdhvuDWUPPRxZUPN2CSK0_LrNL8d4xfZE2iluBnlT28d-v0Av8SsBSPlSfwItmwtk4w=w724-h868-no?authuser=0)

以上為測試Create、Edit、Details 和 Delete 頁面。

控制器中的相依性插入(Dependency Injection,DI)

 Controllers/MoviesController.cs 檔案，並檢查建構函式：

```
public class MoviesController : Controller
{
    private readonly MvcMovieContext _context;

    public MoviesController(MvcMovieContext context)
    {
        _context = context;
    }
```

建構函式會使用[相依性插入](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-5.0)將資料庫內容 (`MvcMovieContext`) 插入到控制器中。 控制器中的每一個 [CRUD](https://wikipedia.org/wiki/Create,_read,_update_and_delete) 方法都會使用資料庫內容。

參考資料：

第4部分：將模型新增至 ASP.NET Core MVC 應用程式[https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-view?view=aspnetcore-3.1&tabs=visual-studio](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-3.1&tabs=visual-studio)

如需 EF Core PMC 工具的詳細資訊，請參閱 [EF Core 工具參考 – Visual Studio 中的 PMC](https://docs.microsoft.com/zh-tw/ef/core/miscellaneous/cli/powershell)。
