---
title: "[Access] 問題排除(舊系統轉新系統)"
description: "Access 是 一個目前很少人使用的Microsoft office產品，內含的Visual Basic 語 [&hellip;]"
pubDate: 2020-12-11
topic: software
series: mis
tags:
  - Access
heroImage: /public/uploads/wp/5258.png
wpId: 5258
slug: access-5258
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/12/11/access-%e5%95%8f%e9%a1%8c%e6%8e%92%e9%99%a4%e8%88%8a%e7%b3%bb%e7%b5%b1%e8%bd%89%e6%96%b0%e7%b3%bb%e7%b5%b1/"
---

Access 是 一個目前很少人使用的Microsoft office產品，內含的Visual Basic 語言，是目前面臨要淘汰的語言，但是許多大公司(保險公司、政府單位)的老系統從很久很久之前就已經沿用到現在，也不好去做更變。

本篇整理分享本人在處理大型單位的Access系統時常遇到的狀況和問題排除：

一、Access很多版本問題

從最一開始的檔案 adp檔 ▶  mdb檔 ▶ accdb檔，各版本之間轉換會有滿大的變動影響，新版的Access已經不支援adp檔，以本人接觸的[保險中心大型系統改版案]為例，其舊的系統都是ADP檔，轉換成MDB後是不能使用的，需做部分程式的修改。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-1.png)

Sponsored Ad

主要問題排除注意及修改:

1.ODBC連線
2.程式裡面的SQL語法，有些加入前置詞dbo
3.報表介面修正和欄位設置

二、x32(x86)和x64不相容

如果Access檔案是用x32(x86)開發的，x64版本的Access會有無法開啟的狀況，且x32(x86)的程式和x64的程式有部分不相容或是[事件程序]不相容。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-3-1024x158.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-11-1024x622.png)

Sponsored Ad

主要問題排除注意及修改:

解決辦法： 在Declare 後面加PtrSafe 進行標記

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/03/image-9.png)

參考：[https://www.cnblogs.com/SH170706/p/8421554.html](https://www.cnblogs.com/SH170706/p/8421554.html)

三、遺漏參照(引用項目)

Access會引用很多參照，舊系統的Access在開發期間可能也會引用很多額外相關項目，以[保險中心大型系統改版案]為例，老舊的報表產生系統的Access檔會引用一些老舊的引用項目，有可能這些引用項目在新系統已經淘汰，或是需要使用更新的!

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-4.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-5.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-6.png)

Sponsored Ad

主要問題排除注意及修改:

修改引用該電腦最新的相關版本元件，或是引用最接近該Access檔案開發預設的老舊元件。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-7.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-8.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-9.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/12/image-10.png)

參考資料：

如何在 Access 資料庫中解決參考問題：[https://docs.microsoft.com/zh-tw/office/troubleshoot/access/resolve-reference-issues](https://docs.microsoft.com/zh-tw/office/troubleshoot/access/resolve-reference-issues)
