---
title: "[C#][.NET]ASP.NET Core MVC 進行Database First式開發"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-10-01
topic: software
series: csharp
heroImage: /public/uploads/wp/4689.jpg
wpId: 4689
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/01/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-%e9%80%b2%e8%a1%8cdatabase-first%e5%bc%8f%e9%96%8b%e7%99%bc/"
---

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

資料庫產品版本：SQL Server 2014 Express Edition (64-bit)

資料庫版本編號：12.0.2000.8

Database First就是先在資料庫把資料庫結構設計完成，再到ASP.NET Core裏，建立資料庫連線，然後使用Entity Framework來完成Model的建立。　

MSSQL環境

![](https://lh3.googleusercontent.com/pw/ACtC-3d4UKVOtA38pZhCgtLvcsUoVUZOpk1YgaUA5AXEl3T7dIL_sFy9Jiw4IaY330djSaQ1tfiVHKLWADADZr_s41cpznJ4yqdFCT2urBzcijXZdaB7IY4kTE1-lXhDzYo651UOVw4EOLeaUSrp-VWbC7h9cw=w864-h712-no?authuser=0)

Visual Studio – ASP.NET Core環境

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-13.png)

建一個資料庫連線，如下圖在[伺服器總管]的[資料連接]選[加入連接…]

![](https://lh3.googleusercontent.com/pw/ACtC-3cwvtHjeg0xH5HlXtI3KeFlSURlkWOA8fwB10p1CQMtcki1upTSDO7dfMZJbTAXWC0drS8RZ2-w4a84AI2H8syQ7iKiGpQu5zAiGWKfYEoz7X19FHE3esJVuMw8KyNnzRKNAPWNmOc6n_b4gKl33e2KJg=w570-h457-no?authuser=0)

在[選擇資料來源]視窗選擇Microsoft SQL Server

![](https://lh3.googleusercontent.com/pw/ACtC-3f2ZWG70_-kCJvG8eB77rfjxFKZs_wXbqrXkiFM3fX9FLwA1sRv5p_j983RmfHukRQbSrOfUdo6AeOvcDdeSoCYw72cf6Z81XTiILgVm20f7O8eCbgPsmUpQTNvwM3qTdvmn27X0u61KABaguqRj4Cd8A=w641-h427-no?authuser=0)

按下[繼續]就出現[加入連接]的視窗，在這裏輸入要連結的資料庫伺服名稱和選擇資料庫名稱。

備註： .  ←是SQL SERVER的預設執行個體伺服器名子。

![](https://lh3.googleusercontent.com/pw/ACtC-3fTu3VdWSpbbRPdKwFTN94Ncneh6LVhViO41Xftp7AQPhpg9PwyqARUij6wl7mWhazleCLRHkZv8CmZb3Mm6HbJJXAXSBj6Mnn4NE83FaQ6NhUuamtIkD920UG4_QqeHafu_KTSxIbplrGnfB4c4ejQdg=w630-h712-no?authuser=0)

本機測試與開發基本上驗證都是直接選擇Windwos驗證，這也是所謂整合式驗證的一部份，如果整個團隊開發的話，就可能會用不同的驗證方式。

![](https://lh3.googleusercontent.com/pw/ACtC-3eriwCr1cDzOk_peTSvP7QgStH3GhF_p7pC6DjY0NBDcFgDS98FsQ4FvYKJjfTcEIT1r4AqrfcLbijDpGLn8eQWY9KInUPyv0To_bpdDSy-5jx1lkA79Va2bPvmSz16alYv0dnBplxK8HNEPRdjRVSJ7g=w686-h205-no?authuser=0)

SQL Server驗證，在一些以資料面龐大的團隊或公司，SQL SERVER資料庫可能在公司的機房上面，而公司很多員工都有各自的權限，會利用在SQL SEVER的帳號密碼做資料庫存取相關權限的驗證。
Active Directory密碼驗證，是微軟Windows Server中，負責架構中大型網路環境的集中式目錄管理服務（Directory Services）
Active Directory整合式驗證，同上雷同。

　　一般開發或是學習SQL Server和Visual Studio都在同一台電腦上，也就直接用Windows驗證就行了。

![](https://lh3.googleusercontent.com/pw/ACtC-3fT847cFBwf1MExF53bWuES-ReumbVCIF6VjTpDICKmeolaeYwOKhiLGg-mGhWPsLTM8y75lOU3x-RxFhg3A4n4YGV486m3trNyn6iH2zi-p_6q8F40Zsv04B-tfaBoyfpT7I9AyTrX92dQImIWV5j9fg=w632-h712-no?authuser=0)

點選[進階]，跳出[進階屬性]，下面的連線字串，這就是ConnectionString，在ASP.NET裏是資料庫處理的重要參數值。

![](https://lh3.googleusercontent.com/pw/ACtC-3fBSXrgnQb_a5o1Dwubku7k2FGpnXLJ2B9H_4GBb8EczeJGqhmfmzYJhNK0P2itZjpNGFI1CxkKg45yyJK8FimufOHI9amGVr4q0fy6oWP934QqRwkUqaaT5vLo2Wno53o_VjL-Qv3PWP6CJ6zWDNPzWQ=w628-h712-no?authuser=0)

Visual Studio 2019頁面，打開你的專案。再到[工具]功能表下，選擇[NuGet套件管理員]下的[套件管理器主控台]功能。

![](https://lh3.googleusercontent.com/pw/ACtC-3fK9HoD-atuBxkl8gAVjZkGOQJh-GZ3N3zGPM3W03jD8v4urhrcucW1GIfbJ7_IFMHR1rM-pz6JdbZRdDiQUb0XFMjBi5y6pjZ8FyTQbKaHq8_pocmvbKNNlt1I9trxW4_m4ejoVGCX3Uvm_vtzsRgV9A=w674-h539-no?authuser=0)

在Visual Studio下方跳出[套件管理器主控台]視窗。

![](https://lh3.googleusercontent.com/pw/ACtC-3c_cbAdShg_VoXXF5AyeESHhjpVHNz2gG0PhIhocXjPZN_AEDved6ZVSzxK_d2us6-kuNUxzcoMlERYvEzmxRDbte8GeUqag81Kj5y94SvdxoG3H_y3LW2zTmhdOykeorv09icTxu9s2Rh_uJDmfAzzWA=w1684-h908-no?authuser=0)

在[套件管理器主控台]中輸入以下命令：

```
Scaffold-DbContext "資料庫連線字串" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```

資料庫字串獲取方式

資料庫連線字串可打開[伺服器總管]，在[資料連接]中找出剛才建好的連接點上按滑鼠右鍵叫出快選單，如下圖：

![](https://lh3.googleusercontent.com/pw/ACtC-3fGYnuWPJLh98tBBpuW40xQZm4nQq_o6UJcmuVFDN0JrtlzJWS3Clrh5hgugrtOHLbBTFU8oEcWWWwa44tnfKHldiGKN3Fh-M5lRVOmeMPJK8gXDbohD5ewyr2CIZ5E24yW8bL2J8zON1gGOSFqVGaD3Q=w462-h633-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3esYiWhFtXBjom73pdi2lG4FCRXP6x7rAQnnkcoV4FAY3hJMeIYiDgJMwGEl8HiPjMeI28EtoaMaC_HgoR9l2PAijW-d-YCuuQ_kvAPrCoL0DI7PBuepsFaUWvn4zmUCl1BMjeeOFFDr-TBdzzQD2jYFA=w602-h661-no?authuser=0)

```
Data Source=.;Initial Catalog=BUTLER;Integrated Security=True
```

複製替換掉命令中雙引號裏的”資料庫連線字串”，即成為如下完整指今令；

```
Scaffold-DbContext "Data Source=.;Initial Catalog=BUTLER;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```

※常用參數，也可以參考 [這裡](https://learn.microsoft.com/zh-tw/ef/core/cli/powershell)

-Force ：如果此位置已有相同檔案時覆蓋，就算沒檔案也可以多這個參數。

-OutputDir Models：將檔案輸出到Models資料夾

-NoOnConfiguring：DbContext不要產生OnConfiguring片段。

-UseDatabaseNames：使用跟資料庫一樣的大小寫命名，不然可能大小寫會被改成別的風格

-NoPluralize：不要加複數s，不然會幫你在命名結尾上加上s

將完整指令貼到[套件管理主控台]，按下[Enter]執行這個指令。

![](https://lh3.googleusercontent.com/pw/ACtC-3d-k92sE_hmTCV6crYMWOpoWNdsNVSN3gvz_B_BCMlMUlJpRvwJJE4BWrKWgcS9kPIMJHzfkS0ChLxt_GjKa5W9Nq5yatuyUz0oq-AkCr8iat3PNJ7KzipyxGo8nsn3U5NOZ7A0r3AKL5xeF8JlOVaNkw=w1266-h457-no?authuser=0)

可以看到方案總管裏，Model資料夾下多出幾個類別檔案，正好對應我們在SQL SERVER裏建的兩個新的資料表。另外還有一個BUTLERContext.cs的資料庫類別檔案。

![](https://lh3.googleusercontent.com/pw/ACtC-3eVktkIfeWXQG0OOHO4yGJw0ZOQRzxxMcXzCWh-Nm_gyrb87Qojm_NplBX8x4nLE5bcG7O8tIKS15YsYVlfTuVbRvz_1GwZRklojrkuL6LfUE95PsSStVH8bbzyKIMqDcpGkqJuR3FnSBZ5MWk79x5oqg=w1687-h908-no?authuser=0)

如何重複使用?

如果你已經開發到一定的程度了，而且很多程式都已經引用連結該Model資料，而我們在這個時候對於資料表的資料結構有做修改的動作，想要程式同步的Mofel資料同步，然後自己也不想一個一個刻，這樣的狀況下，可以利用下方的方式！

如果已經很多程式都引用連結該Model程式，使用Scaffold-DbContext 的命令去創建時會有很多建立失敗的狀況。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-1024x280.png)

把相關引用到的程式都從專案移除(只是暫時移除)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-3.png)

刪除原本使用Scaffold-DbContext 的命令去創建的Model程式

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-4.png)

預備狀態

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-5.png)

將完整指令貼到[套件管理主控台]，按下[Enter]執行這個指令。

```
Scaffold-DbContext "Data Source=.;Initial Catalog=BUTLER;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```

成功建立

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-1-1024x109.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-2.png)

參考資料：

(Day 9) 如何進行Database First式開發？：[https://ithelp.ithome.com.tw/articles/10201333](https://ithelp.ithome.com.tw/articles/10201333)
