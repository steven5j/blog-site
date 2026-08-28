---
title: "[C#][.NET]ASP.NET Core MVC 使用Mysql資料庫 使用與範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-09-06
topic: software
series: csharp
heroImage: /public/uploads/wp/4660.jpg
wpId: 4660
slug: c-asp-net-core-mvc-mysql-4660
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/09/06/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e4%bd%bf%e7%94%a8mysql%e8%b3%87%e6%96%99%e5%ba%ab-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x    版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

資料庫產品版本：MySql

資料庫版本編號：Var 8.0.21

繼此篇[[C#學習]ASP.NET CORE MVC 應用程式中的資料庫 使用與範本](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/09/05/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e4%b8%ad%e7%9a%84%e8%b3%87%e6%96%99%e5%ba%ab-%e4%bd%bf%e7%94%a8%e8%88%87%e7%af%84%e6%9c%ac/) 進行延續學習使用範本

一般來說要在使用微軟開發的軟體時，微軟都是主要使用sqlsever去當作資料庫的使用，但是Sqlsever 在成本上其實相較於使用Mysql還要來的高，且Mysql在許多Iot 伺服器，或是Linux系統上，也比較支援。

此篇是由原本MsSQL資料庫，轉到MySQL資料庫

安裝MySql資料庫和相關套件

![](https://lh3.googleusercontent.com/pw/ACtC-3f1HwNVbpyyun_MXA6Hm6oBI6l5M0XUZsVy5epAE8LrIgWfhTTIRV2VQonDrUb4dpw0_Hb8GdK06I0YGMwc3Txlz9wZxcBhCc3mF16ut6JovzHjkh32upoIvY17J3RTvn8pzmx52M1GuKZGE_4nGrRfLw=w982-h741-no?authuser=0)

有安裝 MySQL for  Visual Studio，才可以在Visual Studio 有方便連結資料庫開發系統。

在開發軟件設定MySQL資料庫

在Visual Studio設定連線MySQL資料庫

![](https://lh3.googleusercontent.com/pw/ACtC-3fF9cdjpAKiu_g24XRxripmhZrSeRcJZ6yEzf02mgHcD2LsQ08Ujjw7Ae7ZHR6KFylUFCb_7ZQzjFFsHNXxL-HVd_yMSkhFhn4wmf5eb14QxgsUUgXHjgEmgxcyU3kg0hJBc45iUWFqh0KjPzUiWqsx3g=w707-h788-no?authuser=0)

安裝NuGet相關套件

![](https://lh3.googleusercontent.com/pw/ACtC-3fb9li4C9XHEm5ZUB_Xe6j6wM1pATCC-SPxeNWdVvn6nRs-zOgHVa4fX14kjoz127NOHRaE9nVaCgyvY_v-4SXAWKpgLWrBjRIjauswVkH4PBV54Zkvx3RJL0srdwIIalbA0Sm7yQAfLHj7VE5prYYOCA=w600-h612-no?authuser=0)

設定資料庫相關的資料表和資料內容

利用MySQL的GUI介面系統MySQL Workbench 8.0 CE，建立資料內容和資料庫。

![](https://lh3.googleusercontent.com/pw/ACtC-3fTaXWMg10IEm03fMIGe45wLnq2SHbtxnVKzQj0wwOHvR_LMT2aKR-gVdwUaAvJvgsbyqy4lPHUQiezqeLc1qQGsV2X1dpBc9BPP0ufWwVLRT90BUFXuovwE-NEqo4qsnnUlEPYpedR6vWVVlwD1j30Fg=w1605-h903-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3eZ1dznxgYT3nw9ExFhE7dSMnzL6KJLr0fo4XCZnhZUV2leIpFcRPbhSbZJOnZEBnXTjS7YHVJ8zHq797imNLQZiDGbkzfdUNpvmQPBjIS9SMMX1-COxxj63uVBjq5Pw9Wr-MOQUZ3olKuMDv_X0kWfyw=w1605-h903-no?authuser=0)

資料表的[id]欄位在原本的程式設計裡面是代表主鍵和含有自動遞增的特性，所以在Mysql資料庫上同樣把相關的特性 加上去。

在appsettings.json設定連線字串

```
  "ConnectionStrings": { 
    "MvcMovieContext": "Server=localhost; Port=3306;User Id=*****;Password=*****;Database=***;persistsecurityinfo=True" 
  }
```

相關資訊改成自己資料庫的內容資料。

在Startup.cs上設定啟動連線

在Startup.cs上新增第1行 和 第8~14行的內容。

```
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

public class Startup
{         
    public void ConfigureServices(IServiceCollection services)
        {
           
	     services.AddDbContext<MvcMovieContext>(options =>
            {
                options.UseMySql(Configuration.GetConnectionString("MvcMovieContext"), mysqlOptions =>
                {
                    mysqlOptions.ServerVersion(new Version(8, 0, 21), ServerType.MySql);
                });
            });
           
           
        }
}
```

依自己安裝MySQL的版本修改 => Version(8, 0, 21)

說明：
<MvcMovieContext>=>資料模型(Table Schema欄位)
(“MvcMovieContext”)=>在appsettings.json的連線字串

測試應用程式

![](https://lh3.googleusercontent.com/pw/ACtC-3d_jwhv8BLhtjr6vxrOIePJOu1wY9edhntNK3oTDiZWkz_KZ-uQM1JpG2Kf7zmLBIFs5T_wULYV85ugN1Zl6zQNOAB3tlGCNZCRlvxiq0amiZNd2BBTHd1kYBV8T-D4UEF08ReabOZxondFhm38jlLWlQ=w1274-h559-no?authuser=0)

參考資料：

[Asp.Net Core] 使用 Entity Framework Core 進行 MariaDB (MySQL) 資料庫結合開發：[https://medium.com/@jscinin/asp-net-core-3-%E4%BD%BF%E7%94%A8maria-db-mysql-%E9%80%B2%E8%A1%8C%E9%96%8B%E7%99%BC-9510d09c3a3a](https://medium.com/@jscinin/asp-net-core-3-%E4%BD%BF%E7%94%A8maria-db-mysql-%E9%80%B2%E8%A1%8C%E9%96%8B%E7%99%BC-9510d09c3a3a)
