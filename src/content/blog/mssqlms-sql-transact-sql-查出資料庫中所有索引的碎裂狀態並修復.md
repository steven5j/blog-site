---
title: "[MSSQL]MS SQL Transact-SQL 查出資料庫中所有索引的碎裂狀態並修復"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2021-01-20
topic: software
series: sql
heroImage: /public/uploads/wp/5398.jpg
wpId: 5398
slug: mssqlms-sql-transact-sql-5398
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/01/20/mssqlms-sql-transact-sql-%e6%9f%a5%e5%87%ba%e8%b3%87%e6%96%99%e5%ba%ab%e4%b8%ad%e6%89%80%e6%9c%89%e7%b4%a2%e5%bc%95%e7%9a%84%e7%a2%8e%e8%a3%82%e7%8b%80%e6%85%8b%e4%b8%a6%e4%bf%ae%e5%be%a9/"
---

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/索引的碎裂狀態-1024x576.jpg)

查詢資料庫中索引破碎狀態

工作上大量運用到SQL SERVER ，當資料庫中的索引碎裂(index fragmentation)程度過高時，索引的效率就會大大降低，為了避免這個問題發生，就必須定時替資料庫健檢(維護資料庫)，也就是進行索引重建(rebuild)或索引重組(reorganize)。

SELECT 指令搭配 sys.dm_db_index_physical_stats 這個動態管理函示(DMF, Dynamic Management Function) 可以查出資料庫中所有索引的碎裂狀態，如下 T-SQL 語法：

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210120
-- Description:	查詢資料表內的索引破碎化百分比情形   
-- =============================================

SELECT OBJECT_NAME(dt.object_id)    as [TableName]   ,	--資料表名稱
       si.name                      as [IndexName]   ,	--索引名稱
       dt.avg_fragmentation_in_percent,					--邏輯片段的百分比 (索引中失序的頁面)。
       dt.avg_page_space_used_in_percent				
FROM
       (SELECT object_id                   ,
               index_id                    ,
               avg_fragmentation_in_percent,
               avg_page_space_used_in_percent
       FROM    sys.dm_db_index_physical_stats (DB_ID(), NULL, NULL, NULL, 'DETAILED')
       WHERE   index_id <> 0
       ) AS dt --does not return information about heaps
       INNER JOIN sys.indexes si
       ON     si.object_id = dt.object_id
          AND si.index_id  = dt.index_id
```

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-11.png)

索引重建與索引重組的判斷時機如下:

索引重組的時機

```
ALTER INDEX REORGANIZE
```

- 檢查 External fragmentation 部分

- 當 avg_fragmentation_in_percent 的值介於 10 到 15 之間

- 檢查 Internal fragmentation 部分

- 當 avg_page_space_used_in_percent 的值介於 60 到 75 之間

索引重建的時機

```
ALTER INDEX REBUILD WITH (ONLINE = ON) 
```

- 檢查 External fragmentation 部分

- 當 avg_fragmentation_in_percent 的值大於 15

- 檢查 Internal fragmentation 部分

- 當 avg_page_space_used_in_percent 的值小於 60

索引破碎修復產生執行字串

自動找出資料庫內哪些索引需要被重建或重組，且把 ALTER INDEX 的 T-SQL語法寫好

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210120
-- Description:	依照破碎程度分類重組或重建並產生修復執行字串   
-- =============================================
SELECT 'ALTER INDEX [' + ix.name + '] ON [' + s.name + '].[' + t.name + '] ' +
       CASE
              WHEN ps.avg_fragmentation_in_percent > 15			--破碎程度 判斷使用重組() 還是使用 重建()
              THEN 'REBUILD'									--重建
              ELSE 'REORGANIZE'									--重組
       END +
       CASE
              WHEN pc.partition_count > 1
              THEN ' PARTITION = ' + CAST(ps.partition_number AS nvarchar(MAX))
              ELSE ''
       END as [修復語法],
       avg_fragmentation_in_percent,
	   CASE
              WHEN ps.avg_fragmentation_in_percent > 15			--破碎程度 判斷使用重組() 還是使用 重建()
              THEN 'REBUILD'
              ELSE 'REORGANIZE'
       END as [判斷重組或重建]
FROM   sys.indexes AS ix
       INNER JOIN sys.tables t
       ON     t.object_id = ix.object_id
       INNER JOIN sys.schemas s
       ON     t.schema_id = s.schema_id
       INNER JOIN
              (SELECT object_id                   ,
                      index_id                    ,
                      avg_fragmentation_in_percent,
                      partition_number
              FROM    sys.dm_db_index_physical_stats (DB_ID(), NULL, NULL, NULL, NULL)
              ) ps
       ON     t.object_id = ps.object_id
          AND ix.index_id = ps.index_id
       INNER JOIN
              (SELECT  object_id,
                       index_id ,
                       COUNT(DISTINCT partition_number) AS partition_count
              FROM     sys.partitions
              GROUP BY object_id,
                       index_id
              ) pc
       ON     t.object_id              = pc.object_id
          AND ix.index_id              = pc.index_id
WHERE  ps.avg_fragmentation_in_percent > 10						--需要進行重組或重建的破碎程度 條件
   AND ix.name IS NOT NULL
```

![](https://lh3.googleusercontent.com/pw/ACtC-3c7L4OWNeoyMWqA-iPvmZKU6TxMk74tzpH_NktO37VvCP06sVrbZYSWrfnbM2Y6dyNZC3q9lQ7dTTabSmESfPzteoPZ8GJ-2IvOGnCv4A3of22JjLyKvMKDFvZlxixsYAPlxSR_BEGSGlDRbTmZRlFdoA=w1024-h370-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/ACtC-3dzgxMM5y8z-VwyUHcxotsPII7C1w2uifyFDzLGpwrAZ3OwSF3UEoRCc_FC9nmX9fwHODoQb9JFaiBCIaL-LO2o43Q1TvODeKyfZG7ZBXIzViA2WpaFfXEM2EVIEhnhRFtt-N3oGOEOZ81TnZBMpt02-A=w1024-h493-no?authuser=0)

參考或引用資料：

藉由重新組織或重建索引來解決索引片段：[https://docs.microsoft.com/zh-tw/sql/relational-databases/indexes/reorganize-and-rebuild-indexes?view=sql-server-ver15](https://docs.microsoft.com/zh-tw/sql/relational-databases/indexes/reorganize-and-rebuild-indexes?view=sql-server-ver15)

MS SQL Server 索引重建或重組標準與T-SQL語法：[https://dotblogs.com.tw/cheng_syun/2018/04/10/120246](https://dotblogs.com.tw/cheng_syun/2018/04/10/120246)

讓 SQL Server 告訴你有哪些索引應該被重建或重組：[https://blog.miniasp.com/post/2009/01/18/Let-SQL-Server-Tell-You-Which-Indexes-to-Rebuild-or-Reorganize](https://blog.miniasp.com/post/2009/01/18/Let-SQL-Server-Tell-You-Which-Indexes-to-Rebuild-or-Reorganize)

建立索引(1)-叢集與非叢集索引：[https://vito-note.blogspot.com/2013/05/blog-post_5510.html](https://vito-note.blogspot.com/2013/05/blog-post_5510.html)
