---
title: "[C#][.NET]反射：通過字串並且從另一個程序集(專案檔)中獲得類型建立實例"
description: "環境與版本 作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110 IIS [&hellip;]"
pubDate: 2022-01-24
topic: software
series: csharp
wpId: 7166
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/01/24/c-net%e5%8f%8d%e5%b0%84%ef%bc%9a%e9%80%9a%e9%81%8e%e5%ad%97%e4%b8%b2%e4%b8%a6%e4%b8%94%e5%be%9e%e5%8f%a6%e4%b8%80%e5%80%8b%e7%a8%8b%e5%ba%8f%e9%9b%86%e5%b0%88%e6%a1%88%e6%aa%94%e4%b8%ad/"
---

環境與版本

作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110

IIS版本：10.0.19041.1415

專案架構：.Net core MVC 3.1

開發軟件(IDE)：Visual Studio 2019 Community

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/netcorestudynotes-1024x576.jpg)

今天給大家講講反射和按類型創建實例。!

業務場景

在做某個電信業者專案開發的時候，遇到一個滿有趣的業務場景，讓我找了很多網路相關內容後，終於找到相對應解法。

今天我們的專案抓取的物件模型是儲存在資料庫內表格欄位字串當中，但是資料庫只有存字串，且可以透過調整資料庫表格欄位字串內容來改變抓取的物件類型，這樣的業務場景狀況如何實現呢?我們想通過類型名稱（字符串）來實例化該類。

解決

第一步 利用反射Type.GetType取得Type

```
//同個程序集下面
Type communicatorType = Type.GetType(typeName);

//不同程序集下面
Assembly assembly = Assembly.Load(AssemblyName);
//另一個方式 ->Assembly assembly = typeof(typeName).Assembly;
Type type = assembly.GetType(typeName);
```

typeName 是要完整的類型與程序集名稱(字串)。舉例：namespaces.className ， 。

assemblyName是程序集(專案名)名稱，不同的程序集需使用此。

註：程序集不是字串的話也可以使用typeof(Type).Assembly

第二步是實例化類：

```
 Class/Interface instance = Activator.CreateInstance(TYPE, parameters) as Class/Interface;
```

Activator.CreateInstance()可以建立實例類，不過是Object類型。

as Class/Interface 可以轉化此Object類型成為指定的類型

參考資料：

REFLECTION: GET TYPE BY STRING & INSTANCE CLASS FROM ANOTHER ASSEMBLY：[https://fmoralesdev.com/2019/04/16/reflection-get-type-by-string-instance-class-from-another-assembly/](https://fmoralesdev.com/2019/04/16/reflection-get-type-by-string-instance-class-from-another-assembly/)

Activator 類別：[https://docs.microsoft.com/zh-tw/dotnet/api/system.activator?view=net-6.0](https://docs.microsoft.com/zh-tw/dotnet/api/system.activator?view=net-6.0)

Convert String to Type in C# [duplicate]：[https://stackoverflow.com/questions/11107536/convert-string-to-type-in-c-sharp](https://stackoverflow.com/questions/11107536/convert-string-to-type-in-c-sharp)
