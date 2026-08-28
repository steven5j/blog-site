---
title: "[MSSQL] MS SQL Transact-SQL 大量刪除約束條件Constraint 範本"
description: "環境與版本 作業系統：Window10 64x 版本：2004 資料庫產品版本：Microsoft SQL S [&hellip;]"
pubDate: 2020-11-09
topic: software
series: sql
heroImage: /public/uploads/wp/4946.jpg
wpId: 4946
slug: sql-ms-sql-transact-sql-constraint-4946
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/09/sql%e5%ad%b8%e7%bf%92-ms-sql-transact-sql-%e5%a4%a7%e9%87%8f%e5%88%aa%e9%99%a4%e7%b4%84%e6%9d%9f%e6%a2%9d%e4%bb%b6constraint-%e7%af%84%e6%9c%ac/"
---

環境與版本

作業系統：Window10 64x 版本：2004

資料庫產品版本：Microsoft SQL Server Developer (64-bit) v18.4

資料庫版本編號：15.0.2070.41

查看資料庫內的條件約束Constraint

可以查看整個資料庫內用到的Constranint 名稱，或是加上條件抓取特定資料表的Constraint。

```
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20201028
-- Description:	查看 資料庫的 條件Constraint  
-- =============================================

SELECT 
	dense_rank() over(order by A.[crdate],A.[refdate],A.[id] asc) as [rk]
	,A.[name] AS [Constraint_name]   
    ,A.[id]
    ,A.[type]  
    ,A.[crdate]  
    ,A.[refdate]  
	,B.[id] as [OBJECT_ID]
FROM sysobjects AS A INNER JOIN syscolumns AS B  --sysobjects
ON A.[id] = B.[cdefault]
where A.[type] ='D'			--條件Constraint  
--AND B.[id] = OBJECT_ID('TableName') --縮小搜尋範圍資料表名稱 
```

大量刪除約束條件Constraint 範本 的 SQL程式碼範本

需要依照需求調整一個地方 1.設定要更動的資料表表的名稱 和2.設定相關條件

```
--!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!!!小心使用!!
-- =============================================
-- Author:		Steven玄
-- ALTER date:  20201028
-- Description:	產生 大量刪除 條件Constraint  的字串   (通常自串會很長)
-- =============================================
--!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!!!Watch out!!

-- 創暫存TABLE
DECLARE @Constraint_TABLE TABLE  (
[rk] [int] NOT NULL,					--順序
[Constraint_name] [nvarchar](50) NULL,	--預存程序名稱
[id] [nvarchar](20) NULL,			--Constraint ID
[type] [nvarchar](50) NULL,			--項目類別
[crdate] [DATETIME] NULL,			--創建時間
[refdate] [DATETIME] NULL,			--修改時間
[OBJECT_ID][nvarchar](20) NULL		--物件ID
);

DECLARE @Table VARCHAR(20) = 'TAD_201' --設定要更動的資料表表的名稱

--下條件把多餘的預存程序放進去這個taBLE
INSERT INTO @Constraint_TABLE
--可先查看 
SELECT 
	dense_rank() over(order by A.[crdate],A.[refdate],A.[id] asc) as [rk]
	,A.[name] AS [Constraint_name]   
    ,A.[id]
    ,A.[type]  
    ,A.[crdate]  
    ,A.[refdate]  
	,B.[id] as [OBJECT_ID]
FROM sysobjects AS A INNER JOIN syscolumns AS B  --sysobjects
ON A.[id] = B.[cdefault]
where A.[type] ='D'			--條件Constraint  
AND B.[id] = OBJECT_ID(@Table)   --表的名稱
--設定相關條件
AND A.[name] like 'DF_TAD%'	  --Constraint 名稱

--組DROP預存程序字串
DECLARE @MAX   BIGINT;
DECLARE @Min   BIGINT;
SELECT @MAX = MAX([rk]),@Min=MIN([rk]) FROM @Constraint_TABLE

declare @string nvarchar(max)		--字串
SET  @string = 'ALTER TABLE ['+@Table+'] DROP CONSTRAINT '

DECLARE @Constraint_name nvarchar(100) --預存程序名稱
WHILE(@Min <= @MAX)
BEGIN
SELECT @Constraint_name = [Constraint_name] FROM @Constraint_TABLE  WHERE [rk] = @Min
SET @string += ' ['+@Constraint_name+'] ';
	 if @Min=@MAX SET @string += ''
	 ELSE SET @string += ',';
SET @Min=@Min+1
END

SELECT @string;--回傳字串

```
