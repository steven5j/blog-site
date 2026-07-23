---
title: "[MSSQL] MS SQL Transact-SQL 大量刪除Table、Stored procedure範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：SQL Server 2014 [&hellip;]"
pubDate: 2020-10-18
topic: software
series: sql
heroImage: /public/uploads/wp/4765.jpg
wpId: 4765
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/18/sql%e5%ad%b8%e7%bf%92-ms-sql-transact-sql-%e5%a4%a7%e9%87%8f%e5%88%aa%e9%99%a4table%e3%80%81stored-procedure%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：SQL Server 2014 Express Edition (64-bit)

資料庫版本編號：12.0.2000.8

一般來說在MSSQL的GUI管理器(SSMS)，刪除表格和預存程序都需要一個個刪，比較麻煩，所以如果是一次大量要刪除的情況下，靠程式碼比較快速。但是這個方式需要[欲保留的表格或預存程序名稱]具有一定規則性，才會方便調整條件而不去刪掉[欲保留的表格或預存程序名稱]。

大量刪除表格和預存程序的SQL程式碼範本，直接執行後會回傳一組[刪除字串]，並不會接刪除。然後執行這組[刪除字串]即可以刪除大量表格。

大量刪除Table表格 的 SQL程式碼範本

需要依照需求調整兩個地方 1.使用的資料庫 和  2.設定相關條件

```
--!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!
-- =============================================
-- Author:		Steven朱
-- ALTER date:  20201016
-- Description:	產生 大量刪除 表格table 的字串   
-- =============================================
--!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 創暫存TABLE
DECLARE @table_name_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Table_name] [nvarchar](50) NULL,	--預存程序名稱
[schema_name] [nvarchar](10) NULL,		--資料庫結構名稱
[type_desc] [nvarchar](50) NULL,		--項目類別
[create_date] [DATETIME] NULL,			--創建時間
[modify_date] [DATETIME] NULL			--修改時間
);

--下條件把多餘的預存程序放進去這個taBLE
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
where [name]  like 'AI_I%' ;  

--組合DROP 表格的字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @table_name_TABLE

declare @string nvarchar(max)		--字串
SET  @string = 'DROP TABLE '

DECLARE @Table_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Table_name = [Table_name] FROM @table_name_TABLE  WHERE [rk] = @Min
SET @string += ' ['+@Table_name+'] ';
	 if @Min=@MAX SET @string += ''
	 ELSE SET @string += ',';
SET @Min=@Min+1
END

SELECT @string;--回傳字串

```

大量刪除Stored procedure預存程序 的 SQL程式碼範本

需要依照需求調整兩個地方 1.使用的資料庫 和 2.設定相關條件

```
--!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!
-- =============================================
-- Author:		Steven朱軒
-- ALTER date:  20201016
-- Description:	產生 大量刪除 預存程序 的字串   
-- =============================================
--!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- 創暫存TABLE
DECLARE @procedure_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[procedure_name] [nvarchar](50) NULL,	--預存程序名稱
[schema_name] [nvarchar](10) NULL,		--資料庫結構名稱
[type_desc] [nvarchar](50) NULL,		--項目類別
[create_date] [DATETIME] NULL,			--創建時間
[modify_date] [DATETIME] NULL			--修改時間
);

--下條件把多餘的預存程序放進去這個taBLE
INSERT INTO @procedure_TABLE
--可先查看 
SELECT 
	dense_rank() over(order by [create_date],[modify_date],[object_id] asc) as [rk]
	,[name] AS [procedure_name]   
    ,SCHEMA_NAME(schema_id) AS [schema_name]  
    ,[type_desc]  
    ,[create_date]  
    ,[modify_date]  
FROM sys.procedures
--設定排除條件
where [name] not like '%USP_AILIB%' ;  

--組DROP預存程序字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @procedure_TABLE

declare @string nvarchar(max)		--字串
SET  @string = 'DROP PROCEDURE '

DECLARE @procedure_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @procedure_name = [procedure_name] FROM @procedure_TABLE  WHERE [rk] = @Min
SET @string += ' ['+@procedure_name+'] ';
	 if @Min=@MAX SET @string += ''
	 ELSE SET @string += ',';
SET @Min=@Min+1
END

SELECT @string;--回傳字串

```
