---
title: "[MSSQL] MS SQL 修改資料表與欄位 T-SQL 語法"
description: "Transact-SQL 資料表增修語法 新增資料表 刪除資料表 把整個資料表給移除掉 清除資料表內容 把資料 [&hellip;]"
pubDate: 2020-02-17
topic: software
series: sql
wpId: 3822
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/02/17/sql-ms-sql-%e4%bf%ae%e6%94%b9%e8%b3%87%e6%96%99%e8%a1%a8%e8%88%87%e6%ac%84%e4%bd%8d-t-sql-%e8%aa%9e%e6%b3%95/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/02/新增-Microsoft-PowerPoint-簡報-1024x576.jpg)

Transact-SQL 資料表增修語法

新增資料表

```
`CREATE TABLE [TableName] (
	[Column] [DataType] [PRIMARY KEY],
	[Column] [DataType],
	[Column] [DataType]
)`
```

刪除資料表

把整個資料表給移除掉

```
`DROP TABLE [TableName]`
```

清除資料表內容

把資料表的內容初始化，主鍵也會初始化，效能較好

```
`TRUNCATE TABLE [TableName]`
```

把資料表的內容清空，主鍵不會除使化，效能較慢一點，主要是在抓某特定條件資料進行清除用的。

```
`DELETE FROM table_name  WHERE [condition]`
```

Transact-SQL 基本欄位增修語法

增加欄位

```
`ALTER TABLE [TableName] ADD [ColumnName] [DataType] Default [Value]`
```

更改欄位大小型態

```
`ALTER TABLE [TableName] ALTER COLUMN [ColumnName] [DataType](Data length)`
```

範例：

```
`ALTER TABLE Products ALTER COLUMN ProductName VARCHAR(30)`
```

更改欄位預設值

Step 1 檢查有無重複的 Constraint

```
`EXEC sp_helpconstraint @objname = 'TABLE_NAME'`
```

Step 2 如有重複 Constraint 需要先刪除

```
`ALTER TABLE [TableName] DROP CONSTRAINT [DF_Table_Column]`
```

Step 3 重新建立 Constraint

```
`ALTER TABLE [TableName] ADD CONSTRAINT [DF_Table_Column] DEFAULT '' FOR [ColumnName]`
```

刪除欄位

```
`ALTER TABLE [TableName] DROP COLUMN [ColumnName]`
```

參考資料：

[SQL] MS SQL 修改資料表與欄位 T-SQL 語法： [https://dotblogs.com.tw/joysdw12/2011/05/31/26731](https://dotblogs.com.tw/joysdw12/2011/05/31/26731) 

Transact-SQL 參考 (資料庫引擎)：[https://docs.microsoft.com/zh-tw/sql/t-sql/language-reference?redirectedfrom=MSDN&view=sql-server-ver15](https://docs.microsoft.com/zh-tw/sql/t-sql/language-reference?redirectedfrom=MSDN&view=sql-server-ver15)

SQL 教程：[https://www.runoob.com/sql/sql-autoincrement.html](https://www.runoob.com/sql/sql-autoincrement.html)
