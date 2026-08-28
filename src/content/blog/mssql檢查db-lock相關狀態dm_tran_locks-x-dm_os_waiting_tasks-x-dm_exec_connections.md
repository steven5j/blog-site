---
title: "[MSSQL]檢查DB Lock相關狀態(dm_tran_locks x dm_os_waiting_tasks x dm_exec_connections)"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2021-06-03
topic: software
series: sql
heroImage: /public/uploads/wp/6089.jpg
wpId: 6089
slug: mssql-db-lock-dm_tran_locks-x-dm_os_waiting_task-6089
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/06/03/mssql%e6%aa%a2%e6%9f%a5db-lock%e7%9b%b8%e9%97%9c%e7%8b%80%e6%85%8bdm_tran_locks-x-dm_os_waiting_tasks-x-dm_exec_connections/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/06/MSSQL檢查DB-Lock相關狀態dm_tran_locks-x-dm_os_waiting_tasks-x-dm_exec_connections-1024x576.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41(SQL SEVER2019)

DB Lock 鎖定

每一個交易會要求資源上不同類型的鎖定，例如交易相依的資料列、頁面或資料表。 鎖定會阻擋其他交易修改資源，以免造成要求鎖定的交易發生問題。 每一個交易對於鎖定的資源不再具有相依性時，就會釋放它的鎖定。

任何資料庫若交易管理不當，時常會導致多使用者的系統發生競爭與效能問題，是每個DBA必須去了解的部份。是資料庫中的功能，在多使用者的環境下沒有他就不能正常的運作。

相關了解：[鎖定與資料列版本設定基本概念](https://docs.microsoft.com/zh-tw/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver15)

動態管理檢視 (DMV)

Analysis Services 動態管理檢視 (Dmv) 是傳回模型物件、伺服器作業和伺服器健全狀況相關資訊的查詢。

相關了解：[動態管理檢視 (DMV)](https://docs.microsoft.com/zh-tw/analysis-services/instances/use-dynamic-management-views-dmvs-to-monitor-analysis-services?view=asallproducts-allversions)

動態管理檢視(DMV)的組合(dm_tran_locks x dm_os_waiting_tasks x dm_exec_connections)。

sys.dm_tran_locks

傳回有關 SQL Server 中目前使用中鎖定管理員資源的資訊。 每一個資料列皆代表一個對鎖定管理員針對已經授與或在等待授與的鎖定的目前使用中要求。細節了解：[sys.dm_tran_locks (Transact-SQL)](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=sql-server-ver15)

sys.dm_os_waiting_tasks

傳回有關等候某項資源的工作等候佇列資訊。細節了解：[sys.dm_os_waiting_tasks](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-os-waiting-tasks-transact-sql?view=sql-server-ver15)

sys.dm_exec_connections

傳回有關與這個 SQL Server 執行個體建立之連接及每一個連接之詳細資料的資訊。細節了解：[sys.dm_exec_connections](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-connections-transact-sql?view=sql-server-ver15)

透過上述組合找出被鎖定物件以及語法：

```

-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210120
-- Description:	找鎖定的物件、類型以及被誰鎖住
-- =============================================

SELECT
        tl.request_session_id AS [我的SID]
        ,tl.resource_type AS [資源類型]
        ,DB_NAME(tl.resource_database_id) AS [資料庫名稱]
        ,(CASE resource_type
                WHEN 'OBJECT' THEN OBJECT_NAME(tl.resource_associated_entity_id)
                ELSE (SELECT
                                        OBJECT_NAME(object_id)
                                FROM sys.partitions
                                WHERE hobt_id = resource_associated_entity_id)
        END) AS [物件名稱]
        ,tl.resource_description AS [資源說明]
        ,tl.request_mode AS [鎖定類型]
        ,tl.request_status AS [狀態]
        ,wt.blocking_session_id AS [被阻塞SID]
        ,c.connect_time AS [連接時間]
        ,txt.text AS [最近執行語法]
	   ,lock_txt.text AS [被阻塞的執行語法]
FROM sys.dm_tran_locks AS tl
LEFT JOIN sys.dm_os_waiting_tasks AS wt
        ON tl.lock_owner_address = wt.resource_address
LEFT JOIN sys.dm_exec_connections AS c
        ON tl.request_session_id = c.session_id
LEFT JOIN sys.dm_exec_connections AS d
        ON wt.blocking_session_id = d.session_id
CROSS APPLY sys.dm_exec_sql_text(c.most_recent_sql_handle) txt 
OUTER APPLY sys.dm_exec_sql_text(d.most_recent_sql_handle) lock_txt 
WHERE resource_type != 'DATABASE'
  AND tl.request_session_id > 50 
ORDER BY tl.request_session_id
GO
```

(request_mode)[鎖定類型]：

將告訴我們鎖定的模式，內容種類很多，如果是一般開發維護處理下，只需要注意以下3種即可：

X (獨占鎖定 Exclusive Locks)持有的會話會被授與資源的獨佔存取權。一般表示 dead lock，就是我們需要處理的。

IX (意圖鎖定 Intent Locks)表示要將 X 鎖定放置在鎖定階層中的某些從屬資源上。一般表示 wait lock ，這種是因為前一個Request已經dead lock，而被pending的狀態。

S or IS (共享鎖定 Shared Locks)持有的會話會被授與資源的共用存取權。一般的長時間查詢就會顯示這種狀態。

細節了解：[其他狀態種類](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=sql-server-ver15)

參考或引用資料：

sys.dm_tran_locks (Transact-SQL)：[https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=sql-server-ver15](https://docs.microsoft.com/zh-tw/sql/relational-databases/system-dynamic-management-views/sys-dm-tran-locks-transact-sql?view=sql-server-ver15)

SQL Server – 鎖定類型介紹：[https://caryhsu.blogspot.com/2011/09/sql-server.html](https://caryhsu.blogspot.com/2011/09/sql-server.html)

[SQL Server]檢查DB Lock狀態：[https://dotblogs.com.tw/AlenWu_coding_blog/2017/06/03/sql_lock_check](https://dotblogs.com.tw/AlenWu_coding_blog/2017/06/03/sql_lock_check)

[SQL Server][Lock]透過DMV找鎖定的物件、類型以及被誰Blocking：[https://dotblogs.com.tw/stanley14/2017/05/13/SQL_FIND_Block](https://dotblogs.com.tw/stanley14/2017/05/13/SQL_FIND_Block)
