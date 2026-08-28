---
title: "[MSSQL] MS SQL Transact-SQL 產生大量 修改特定欄位名稱 的 執行語法範本"
description: "環境與版本 作業系統：Window10 64x 版本：20H2 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2021-07-30
topic: software
series: sql
heroImage: /public/uploads/wp/6388.jpg
wpId: 6388
slug: mssql-ms-sql-transact-sql-6388
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/07/30/mssql-ms-sql-transact-sql-%e7%94%a2%e7%94%9f%e5%a4%a7%e9%87%8f-%e4%bf%ae%e6%94%b9%e6%ac%84%e4%bd%8d%e5%90%8d%e7%a8%b1-%e7%9a%84-%e5%9f%b7%e8%a1%8c%e8%aa%9e%e6%b3%95%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x 版本：20H2

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.9.1

資料庫版本編號：15.0.2080.-

在處理大量資料庫的時候，有時候一支一支維運修改顯得過於緩慢，所以使用大量處理的範本，來快速進行修正。

產生大量 修改特定欄位名稱 的 執行語法範本

調整並設定二個地方

- 設定值

- 相關條件

詳細調整影響的已經寫在Code裡面了。

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210126
-- Description:	產生大量修改Table 修改特定欄位名稱 的執行語法範本 
-- =============================================

DECLARE @Old_File VARCHAR(25);
DECLARE @New_File VARCHAR(25);

---設定值
SET @Old_File = 'Old_FILE_NAME' ;			--更改前的欄位名
SET @New_File = 'New_FILE_NAME' ;			--更改後的欄位名

-- 創暫存TABLE
DECLARE @table_name_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Table_name] [nvarchar](50) NULL,		--預存程序名稱
[schema_name] [nvarchar](10) NULL,		--資料庫結構名稱
[type_desc] [nvarchar](50) NULL,		--項目類別
[create_date] [DATETIME] NULL,			--創建時間
[modify_date] [DATETIME] NULL			--修改時間
);
-- 創暫存TABLE
DECLARE @TEMP TABLE  (
[CODE] [nvarchar](MAX) NULL	--預存程序名稱
);

--下條件把要抓取的TABL放進去這個暫存taBLE
INSERT INTO @table_name_TABLE
--可先查看 
SELECT 
	dense_rank() over(order by [create_date],[modify_date],[object_id] asc) as [rk]
	,[name] AS [Table_name]   
    ,SCHEMA_NAME(schema_id) AS [schema_name]  
    ,[type_desc]  
    ,[create_date]  
    ,[modify_date]  
FROM sys.tables
--設定相關條件
where [name]  like 'TABD' ;   --資料表名稱

-- 表格的字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @table_name_TABLE

DECLARE @Table_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Table_name = [Table_name] FROM @table_name_TABLE  WHERE [rk] = @Min

INSERT INTO @TEMP SELECT 'exec sp_rename ''['+@Table_name+'].'+@Old_FILE+''' , '''+@New_File+'''';
        
SET @Min=@Min+1
END

SELECT * FROM @TEMP; --回傳可使用字串

```
