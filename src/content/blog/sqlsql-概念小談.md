---
title: "[SQL]SQL-概念小談"
description: "當不同的應用程式面對不同的資料庫管理系統時，必需有一個統一的語言來進行資料的存取 於是美國國家標準局(簡稱AN [&hellip;]"
pubDate: 2020-03-08
topic: software
series: sql
wpId: 3889
slug: sqlsql-3889
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/03/08/sqlsql-%e6%a6%82%e5%bf%b5%e5%b0%8f%e8%ab%87/"
---

當不同的應用程式面對不同的資料庫管理系統時，必需有一個統一的語言來進行資料的存取

於是美國國家標準局(簡稱ANSI)負責訂定了一個語言標準，稱之為『結構化查詢語言』

結構化查詢語言主要分為三大類型：

一、資料定義語言：主要是針對不同物件的結構定義，進行建立、刪除、修改等指令操作

例如：CREATE、DROP、ALTER

二、資料操作語言：主要是針對資料表或檢視表內的資料進行存取的操作。

常用的指令包括：SELECT、INSERT、UPDATE、DELETE

三、資料控制語言：主要是針對資料庫管理系統的安全進行控制。

常用指令包括：GRANT、DENT、REVOKE

結構化查詢語言(Structured Query Language，簡稱SQL)，唸成『SEQUEL』

Transact-SQL 參考 (資料庫引擎)：[https://docs.microsoft.com/zh-tw/sql/t-sql/language-reference?redirectedfrom=MSDN&view=sql-server-ver15](https://docs.microsoft.com/zh-tw/sql/t-sql/language-reference?redirectedfrom=MSDN&view=sql-server-ver15)
