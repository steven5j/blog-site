---
title: "[C#][.NET].Net界神級的工具 &#8211; Resharper介紹"
description: "環境與版本 作業系統：Window10 64x 版本：20H2 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-08-02
topic: software
series: csharp
wpId: 6362
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/08/02/c-net-net%e7%95%8c%e7%a5%9e%e7%b4%9a%e7%9a%84%e5%b7%a5%e5%85%b7-resharper%e4%bb%8b%e7%b4%b9/"
---

環境與版本

作業系統：Window10 64x 版本：20H2

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/07/C.NET介紹.Net界神級的工具-Resharper-1-1024x576.jpg)

ReSharper是JetBrains公司發行的一套Visual Studio擴充套件，如果你是一名.NET開發人員，但是你卻不使用ReSharper，那麼你就不是一個高效的碼農了，因為這是一個強大的神器！用它的代價是，啟動VS會變得非常慢，非常卡，但是開發效率絕對提升N倍！ ！ ！

Navigation – ReSharper Essentials

官方的介紹

視頻介紹：

ReSharper功能簡介

提供的擴充功能很多，以下僅摘述比較常用的功能介紹：

代碼分析Code analysis

筆者覺得這個超好用!!，減少自己DeBug的次數

持續的代碼質量分析

如果文件包含錯誤或問題，標記欄頂部的狀態指示器會更改其顏色和圖標。右鍵單擊該圖標，您可以快速切換 ReSharper 代碼分析、標識符突出顯示和 Visual Studio 代碼分析，以及在最高嚴重級別的問題之間導航。

![](https://www.jetbrains.com/resharper/features/screenshots/20171/status_indicator.png)

代碼問題的快速修復

可幫助您立即修復所有受支持語言中檢測到的大多數代碼問題。應用快速修復就像按下Alt+Enter突出顯示的代碼問題並選擇適當的方法來修復問題或改進次優代碼一樣簡單。

![](https://www.jetbrains.com/resharper/features/screenshots/20163/qfix_enumerate_to_list.gif)

快速修復Quick-fixes

幫助開發者，以最精湛的撰寫風格修正程式語法。

應用快速修復

快速修復通常由紅色 （用於錯誤）或黃色 （用於警告、建議和提示）燈泡表示，當您在突出顯示的代碼行上設置插入符號時，它們會出現在突出顯示的代碼行的左側。

![](https://www.jetbrains.com/resharper/features/screenshots/20163/qf_add_return.gif)

C#：修復可能的 NullReferenceException

當 ReSharper 檢測到可能為 null 的對像上的方法調用時，可能會導致 System.NullReferenceException運行時出現問題，它會建議兩個快速修復方法。

![](https://www.jetbrains.com/resharper/features/screenshots/20163/qf_conditional_access.gif)

C#：將 foreach 轉換為 LINQ 表達式

ReSharper 將幫助您檢查現有代碼庫中是否存在可以轉換為 LINQ 表達式的循環，然後您可以使用快速修復來快速安全地執行轉換。

![](https://www.jetbrains.com/resharper/features/screenshots/20163/qf_linq.gif)

重構Refactorings

這是ReSharper最重要的核心靈魂，會使用的人，會大大的加強其代碼的的理解性

使用代碼重構

您查看可以在當前插入符號位置或當前選擇應用哪些重構。

![](https://www.jetbrains.com/resharper/features/screenshots/100/refactor_this.png)

改名

Rename 重構允許您重命名任何符號，包括：命名空間、類型、方法、參數、局部變量、屬性、字段和事件。它會自動查找並更正對符號的所有引用。重命名重構可以直接從編輯器調用，有時也可以從其他視圖（類視圖、對象瀏覽器）調用。

![](https://www.jetbrains.com/resharper/features/screenshots/50/rename_refactoring_in_XAML.png)

為子串引入變量

此重構可幫助您快速將字符串的一部分移動到單獨的變量。根據目標 C# 版本，重構將使用字符串插值或將字符串包裝到String.Format().

![](https://www.jetbrains.com/resharper/features/screenshots/20171/introduce_var_for_substring.gif)

調試幫助Debugging assistance

就是Debug模式下，提供額外協助。

內聯調試裝飾

當您在調試代碼時暫停執行時，您可以在編輯器中的相應代碼行旁邊看到局部變量、當前行表達式和函數返回的值。

![](https://www.jetbrains.com/resharper/features/screenshots/20173/inline_debugging.animated.gif)

改進的、可搜索的數據提示

ReSharper 提供了 Visual Studio DataTips 的改進替代品

![](https://www.jetbrains.com/resharper/features/screenshots/20173/DataTips_highlight.animated.gif)

缺點

耗掉更多的CPU、內存以及磁盤I/O

有可能讓不夠強大的開發機變得很慢…。

下載

一般付費版或30天試用版：[https://www.jetbrains.com/resharper/](https://www.jetbrains.com/resharper/)

有大學edu郵箱即可免費申請教育版License：[https://www.jetbrains.com/community/education/#students](https://www.jetbrains.com/community/education/#students)

有開源項目的可申請開發者社區版License：[https://www.jetbrains.com/shop/eform/opensource](https://www.jetbrains.com/shop/eform/opensource)

![](https://www.jetbrains.com/community/education/img/free-educational-licenses.svg)

參考或引用資料：

[鐵人賽Day30] ASP.Net Core MVC 進化之路 – 工具篇(4) / Refactor with ReSharper：[https://dotblogs.com.tw/armycoding/2018/11/14/123036](https://dotblogs.com.tw/armycoding/2018/11/14/123036)

VisualStudio神級插件——JetBrains Resharper：[https://dotblogs.com.tw/armycoding/2018/11/14/123036](https://dotblogs.com.tw/armycoding/2018/11/14/123036)

官方網站：[https://www.jetbrains.com/](https://www.jetbrains.com/)

VisualStudio神級插件——JetBrains Resharper2021.1.5學習版+教程：[https://ldqk.xyz/20](https://ldqk.xyz/20)
