---
title: "[C#][.NET]Repeater元件，自動寫迴圈"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-09-01
topic: software
series: csharp
heroImage: /public/uploads/wp/4613.jpg
wpId: 4613
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/09/01/c%e5%ad%b8%e7%bf%92repeater%e5%85%83%e4%bb%b6%ef%bc%8c%e8%87%aa%e5%8b%95%e5%af%ab%e8%bf%b4%e5%9c%88/"
---

環境與版本

作業系統：Window10 64x    版本：2004

開發軟件(IDE)：Visual Studio 2015 Community

.NET版本：ASP.NET Framework 4.x

專案架構：Web Form

資料庫產品版本：SQL Server 2014 Express Edition (64-bit)

資料庫版本編號：12.0.2000.8

簡介

Repeater控制項是基本的樣板化資料系結清單。 它沒有內建的版面配置或樣式，因此您必須明確地宣告控制項範本內的所有版面配置、格式和樣式標記。

Repeater元件範本

```
  
       <asp:Repeater id="Repeater1" runat="server">
          <HeaderTemplate><!--寫表頭的部份。-->
             <table border="1">
                <tr>
                   <td><b>Company</b></td>
                   <td><b>Symbol</b></td>
                </tr>
          </HeaderTemplate>
             
          <ItemTemplate><!--重複內容的部分-->
             <tr>
                <td> <%# DataBinder.Eval(Container.DataItem, "Name") %> </td>
                <td> <%# DataBinder.Eval(Container.DataItem, "Ticker") %> </td>
             </tr>
          </ItemTemplate>
             
          <FooterTemplate><!--用來寫表尾的部份。-->
             </table>
          </FooterTemplate>
             
       </asp:Repeater>
```

每個 Repeater 控制項至少必須定義 ItemTemplate 。

範本名稱描述

ItemTemplate定義清單中專案的內容和版面配置。 此為必要範本。

AlternatingItemTemplate如果已定義，則會判斷 (以零為基底的奇數索引) 專案的內容和配置。 如果未定義， ItemTemplate 則會使用。

SeparatorTemplate如果已定義，則會在專案之間轉譯 (以及) 的替代專案。 如果未定義，則不會呈現分隔符號。

HeaderTemplate如果已定義，則會決定清單標頭的內容和版面配置。 如果未定義，則不會呈現標頭。

FooterTemplate如果已定義，則決定清單頁尾的內容和配置。 如果未定義，則不會呈現頁尾。

參考資料：

Repeater 類別：[https://docs.microsoft.com/zh-tw/dotnet/api/system.web.ui.webcontrols.repeater.items?view=netframework-4.8](https://docs.microsoft.com/zh-tw/dotnet/api/system.web.ui.webcontrols.repeater?view=netframework-4.8)
