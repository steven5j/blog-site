---
title: "[MSSQL] MS SQL Transact-SQL 產生大量新增、修改、刪除欄位 的 執行語法範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2021-01-26
topic: software
series: sql
heroImage: /public/uploads/wp/5803.jpg
wpId: 5803
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/01/26/mssql-ms-sql-transact-sql-%e7%94%a2%e7%94%9f%e5%a4%a7%e9%87%8f%e6%96%b0%e5%a2%9e%e3%80%81%e4%bf%ae%e6%94%b9%e3%80%81%e5%88%aa%e9%99%a4%e6%ac%84%e4%bd%8d-%e7%9a%84-%e5%9f%b7%e8%a1%8c%e8%aa%9e/"
---

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41

在處理大量資料庫的時候，有時候一支一支維運修改顯得過於緩慢，所以使用大量處理的範本，來快速進行修正。

產生大量修改Table新增欄位 的 執行語法範本

調整並設定二個地方

- 設定值

- 相關條件

詳細調整影響的已經寫在Code裡面了。

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210126
-- Description:	產生大量修改Table新增欄位 的執行語法範本 
-- =============================================

DECLARE @File VARCHAR(25);
DECLARE @Type VARCHAR(25);
DECLARE @NULL VARCHAR(25);
DECLARE @IS_DEFAULT VARCHAR(1);
DECLARE @DEFAULT VARCHAR(25);

---設定值
SET @File = 'FILE_NAME1' ;			--欄位名
SET @Type = 'CHAR(10)' ;		--型態名
SET @NULL = 'NOT NULL';			--null / NOT NULL
SET @IS_DEFAULT = 'Y';			--是否設定DEFAULT 預設值  Y/N
SET @DEFAULT = '('''')';		--預設值 若要空字串請設定 '('''')'

-- 創暫存TABLE
DECLARE @table_name_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Table_name] [nvarchar](50) NULL,	--預存程序名稱
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
where [name]  like 'TABD' ;   

-- 表格的字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @table_name_TABLE

DECLARE @Table_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Table_name = [Table_name] FROM @table_name_TABLE  WHERE [rk] = @Min
IF @IS_DEFAULT <> 'Y'
INSERT INTO @TEMP SELECT 'ALTER TABLE ['+@Table_name+']  ADD ['+@File+'] '+@Type+' '+@NULL+' ;'
IF @IS_DEFAULT = 'Y'
INSERT INTO @TEMP SELECT 'ALTER TABLE ['+@Table_name+']  ADD ['+@File+'] '+@Type+' '+@NULL+' DEFAULT '+@DEFAULT+' ;'

SET @Min=@Min+1
END

SELECT * FROM @TEMP; --回傳可使用字串

```

執行後的產生結果像這樣。直接全部複製就可以執行了。

![](https://lh3.googleusercontent.com/pw/ACtC-3fb5jhOPz6aCE7_cLdo633UwWWc1SbfCU76YtfVy6xqeZoGBD2s3mztA6RXY97fLfLs9oYxaKh2-VqnUn2cyvS6FHElnXa7b541krbH8igrR8ioDezy3Nxj76AHhAJi7RNeebenUi-7yoMxPu6aDZBIOQ=w942-h355-no?authuser=0)

產生大量修改Table修改欄位 的 執行語法範本

調整並設定二個地方

- 設定值

- 相關條件

詳細調整影響的已經寫在Code裡面了。

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210126
-- Description:	產生大量修改Table 修改欄位 的執行語法範本 
-- =============================================

DECLARE @File VARCHAR(25);
DECLARE @Type VARCHAR(25);
DECLARE @NULL VARCHAR(25);
DECLARE @IS_DEFAULT VARCHAR(1);
DECLARE @DEFAULT VARCHAR(25);

---設定值
SET @File = 'FILE_NAME1' ;			--欄位名
SET @Type = 'CHAR(30)' ;			--型態名(長度)
SET @NULL = 'NULL';					--null / NOT NULL

-- 創暫存TABLE
DECLARE @table_name_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Table_name] [nvarchar](50) NULL,	--預存程序名稱
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
where [name]  like 'TABD' ;   

-- 表格的字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @table_name_TABLE

DECLARE @Table_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Table_name = [Table_name] FROM @table_name_TABLE  WHERE [rk] = @Min

INSERT INTO @TEMP SELECT 'ALTER TABLE ['+@Table_name+']  ALTER COLUMN ['+@File+'] '+@Type+' '+@NULL+' ;'

SET @Min=@Min+1
END

SELECT * FROM @TEMP; --回傳可使用字串

```

產生大量修改Table刪除欄位 的 執行語法範本

調整並設定二個地方

- 設定值

- Table相關條件

詳細調整影響的已經寫在Code裡面了。

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20210126
-- Description:	產生大量修改Table 刪除欄位 的執行語法範本 
-- =============================================

DECLARE @File VARCHAR(25);
DECLARE @Type VARCHAR(25);
DECLARE @NULL VARCHAR(25);
DECLARE @IS_DEFAULT VARCHAR(1);
DECLARE @DEFAULT VARCHAR(25);

---設定值
SET @File = 'FILE_NAME1' ;			--欄位名

-- 創暫存TABLE
DECLARE @table_name_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Table_name] [nvarchar](50) NULL,	--預存程序名稱
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
--設定Table相關條件
where [name]  like 'TABD' ;   

-- 表格的字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @table_name_TABLE

DECLARE @Table_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Table_name = [Table_name] FROM @table_name_TABLE  WHERE [rk] = @Min

INSERT INTO @TEMP SELECT 'ALTER TABLE ['+@Table_name+']  DROP COLUMN ['+@File+'] ;'

SET @Min=@Min+1
END

SELECT * FROM @TEMP; --回傳可使用字串

```

如遇到類似以下狀況，需要先刪除Constraint，可以參考[[MSSQL] MS SQL Transact-SQL 大量刪除約束條件Constraint 範本](/2020/11/09/sql%e5%ad%b8%e7%bf%92-ms-sql-transact-sql-%e5%a4%a7%e9%87%8f%e5%88%aa%e9%99%a4%e7%b4%84%e6%9d%9f%e6%a2%9d%e4%bb%b6constraint-%e7%af%84%e6%9c%ac/)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/image-23.png)
