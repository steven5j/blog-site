---
title: "[MSSQL]sys.sql_modules 找某個關鍵字Keyword在哪些物件中出現"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2021-01-21
topic: software
series: sql
heroImage: /public/uploads/wp/5403.jpg
wpId: 5403
slug: mssqlsys-sql_modules-keyword-5403
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/01/21/mssqlsys-sql_modules-%e6%89%be%e6%9f%90%e5%80%8b%e9%97%9c%e9%8d%b5%e5%ad%97keyword%e5%9c%a8%e5%93%aa%e4%ba%9b%e7%89%a9%e4%bb%b6%e4%b8%ad%e5%87%ba%e7%8f%be/"
---

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41(SQL SEVER2019)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/MSSQLsys.sql_modules-找某個關鍵字Keyword在哪些物件中出現--1024x576.jpg)

在維護舊系統的時候，面對海量前工程師遺留下來的產物，好的可能有好的交付文件可以查看了解，壞的可能甚麼都沒有只能透過線索一一搜尋查看，這裡就分享如何在資料庫中找某個Keyword在哪些物件中出現! 也可以找尋Table名稱在哪個物件中出現!

找某個關鍵字Keyword在哪些物件中  sys.sql_modules

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210120
-- Description:	找某個Keyword在哪個物件中出現!
-- =============================================

SELECT distinct object_name(object_id) as [物件名稱], definition as [物件內資訊]
FROM sys.sql_modules
WHERE definition LIKE '%關鍵字串%';
```

※FROM 後可以使用[sys.sql_modules](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-catalog-views/sys-sql-modules-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15) 或是 [sys.all_sql_modules](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-catalog-views/sys-all-sql-modules-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15)

![](https://lh3.googleusercontent.com/pw/ACtC-3eIaj_NJKjVTaWQiTjz_56X4qfMNqGjfpHkDB5IRkDAxK6cVUZbjer1tAcjGBvlvxQ2sY8d6jYxkCByQCaVfgFIcjP1EXD5iw5KlfpS-msm8vfgkmbfd9UeZyO853szidrvJbc9eO8E7c100yNFETNYTg=w703-h218-no?authuser=0)

找某個關鍵字Keyword在哪些預存程序中  sys.procedures

只要找預存程序的話可以使用[sys.procedures](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-catalog-views/sys-procedures-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15)

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210120
-- Description:	找某個Keyword在哪個Stored Proceduce中出現!
-- =============================================

Select distinct object_name(object_id) as [物件名稱], object_definition(object_id) as [物件內資訊]
from sys.procedures
Where object_definition(object_id) like '%關鍵字串%';
```

![](https://lh3.googleusercontent.com/pw/ACtC-3egrPo96-tRny5cK8AvJ1jYA-G_dr_H7pQ2nZinC9etSddKpKQnWe5VuDf3tae9wadsr-qsGuPgJXe88CyxvsE4D7FWlG6QfkPraofY5IsTLDg3Q2oYTWPpJScZ6qDuYpcu8Mmq8-uHGpXFUaDluN0gLQ=w674-h166-no?authuser=0)

參考或引用資料：

如何表列出預存程序(Stored Procesure)中用到了哪一些資料表呢?：[https://dotblogs.com.tw/rockchang/2015/10/30/153753](https://dotblogs.com.tw/rockchang/2015/10/30/153753)

[SQL]SQL Server中找某個Keyword在那個物件中出現! (Part 2)：[https://dotblogs.com.tw/rainmaker/2012/07/16/73405](https://dotblogs.com.tw/rainmaker/2012/07/16/73405)

sys.sql_modules (Transact-SQL)：[https://dotblogs.com.tw/rainmaker/2012/07/16/73405](https://dotblogs.com.tw/rainmaker/2012/07/16/73405)
