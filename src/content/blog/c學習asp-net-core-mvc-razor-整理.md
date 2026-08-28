---
title: "[C#][.NET]ASP.NET Core MVC RAZOR 整理"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-10-10
topic: software
series: csharp
heroImage: /public/uploads/wp/4702.jpg
wpId: 4702
slug: c-asp-net-core-mvc-razor-4702
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/10/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-razor-%e6%95%b4%e7%90%86/"
---

環境與版本

作業系統：Window10 64x    版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

Razor

Razor 又稱Razor Syntax，是用來將Server Side 的C#程式嵌入到HTML 中的標記語法（Markup Syntax）。

說明：

- Razor 中只有HTML 及C#兩種元素，二者的結合就形成了Razor
語法。

- C#程式區塊（Razor Code Block）是以@{…}包覆，裡面是一
般C#程式。

- Razor Inline 表達式是指「C#變數穿插在HTML 中」的式子。而
Razor 中預設是HTML 語言，若遇到@符號，表示它後面接的是
C#指令。

- Razor 會依不同的規則或符號在HTML 和C#之間做切換。

Razor 支援的保留關鍵字，分為兩大類：

- Razor 關鍵字：section、model、helper、inherits 和functions 五個
關鍵字是Razor 創造的，用來支持Razor 語法所需功能。

- C#關鍵字：這是源自既有的C#，不是Razor 所創造。Razor 支援
常用的C#關鍵字，但有些如namespace 及class 關鍵字就不支援。

![](https://lh3.googleusercontent.com/pw/ACtC-3cYBHbWvJvQ7T8sYKDf08i1Na0q3g5x1Cu1Kst3KUgi97bdB2zbJybcn8KGsaGq6t-dpo68WuhlnEIkLRZPkPP_ePJiq11hNdFJQK9HcKzzBV5hP48sRKWNcjsKLtaQA7cbdGCfVxNHHB97J2QsVA5VBg=w830-h682-no?authuser=0)

Razor 語法規則

規則1：以@符號作為C#的開頭

規則2：以@{…}宣告單行C#程式

```
@{ var City = "Taipei"; }
@{ var PostalCode = 110; }
@{ string city = "Taoyuan"; }
@{ int postalCode = 334; }
```

規則3：以@{…}宣告多行C#程式

```
@{
var Name = "Kevin";
var Height = 180;
var Weight = 75;
}
```

規則4：C#的Inline 表達式

```
<p>我的名字: @Name </p>
<p>我的身高: @Height </p>
<p>我的體重: @Weight </p>
<p>居住城市: @City </p>
<p>郵遞區號: @PostalCode </p>
```

規則5：C#程式區塊中的HTML 隱式轉換

@{…}程式區塊中預設語言是C#，但若夾雜了HTML 語法，Razor
會自動做隱式轉換，將該部分輸出成HTML

規則6：C#關鍵字嚴格區分大小寫（但VB 不分）

規則7：單行註解－@…@

規則8：多行註解－@…@

規則9：Razor 隱性表達式－@符號

規則10：Razor 明確表達式－@(…)符號

規則11：以文字顯示@符號，需用@@表示

規則12：字串變數中的雙引號顯示

規則13：用@(…)將HTML 或JS 編碼成純文字

規則14：用@Html.Raw()顯示原始字串, 不做HTML 編碼

以@helper 指示詞建立可重複使用的Razor Helper

Razor Helper 是將一段HTML 或Razor 語法獨立成可重複使用的區
塊，方式是在View 中以@helper 關鍵字來宣告。

Razor Helper 在結構及使用上，跟C# Method 很像，只不過
前者在Razor 頁面中宣告，後者在Class 類別中宣告。

範例：

```
<table class="table table-bordered table-striped">
...
<tbody>
@foreach (var m in Model)
{
...
<!--中文-->
@DisplayScore(m.Chinese)
<!--英文-->
@DisplayScore(m.English)
<!--數學-->
@DisplayScore(m.Math)
<!--計算總分-->
@if (m.Id == ViewBag.topId)
{
<!--總分最高者-->
<td class="top1">@Html.DisplayFor(x => m.Total)</td>
}
else
{
<td>@Html.DisplayFor(x => m.Total)</td>
}
</tr>
}
</tbody>
</table>
@helper DisplayScore(int score)
{
	if (score < 60)
	{
	<td class="poor">@score</td>
	}	
	else if (score >= 95)
	{
	<td class="excellent">@score</td>
	}
	else
	{
	<td>@score</td>
	}
}

```

可重複使用的Partial View 部分檢視

Partial View 部分檢視，它是可重複使用的檢視區塊，相
較於一般View，Partial View 著眼的是可重複使用區塊，和製作一個大型
完整的View 出發點是不同的。

![](https://lh3.googleusercontent.com/pw/ACtC-3f4TFNznLXxD9urLhVqbu_a3dGfBgSEFDGBkhUJa2egPDFBaCFaeOL4yDrmOG-CKRBgverkmu_hKWmbIeVVROGE4_6ArBHQv87R_NvKWCJ4pzQL0bBjgxWRJMrq8Y-HbtJbBPd7ohQ4nhSipYfZ5THTbA=w944-h606-no?authuser=0)

```
//同一層目錄
@Html.Partial("PartialView 名稱")
//不同層目錄
@Html.Partial("~/Views/目錄名稱/PartialView 名稱")
```

以下是Partial View 的特性說明：

- 呼叫Partial View 的View 就是Parent View 父檢視。

- 父檢視呼叫Partial View 的指令是@Html.Partial(“部分檢視.cshtml”)。PartialViewName 如果是與主頁面（例如 Index.cshtml）是同一個目錄，則可以直接填入 PartialViewName，而如果是使用其他目錄（例如 ~/Views/Shared/）的 Partial View 檔案，則可以使用檔案路徑。

- Partial View 延伸檔名與View 相同，都是.csthml。

- Partial View 可放在個別的View 資料夾，同一個資料夾的Parent View
會優先參考使用。也可放在Views\Shared 資料夾，讓所有資料夾的
Parent View 共用。

- 因此Parent View 尋找Partial View 的順序，是先在本身所在的資料夾搜尋，若找不到的話，才會到Shared 資料夾中尋找。

- 如果是通用佈局設計應該放在_Layout.cshtml 佈局檔中，非佈局類但可重複使用內容，就可以做成Partial View。

以ViewData 傳遞資料給Partial View

```
@Html.Partial("PartialView 名稱", ViewData)
```

- Partial View 初始時，它會得到Parent View 的ViewDataDictionary
複本。

- 但Partial View 更動ViewData 資料，它不會更新回Parent View。

- Partial View 回傳時，它的ViewData 便會消失。

以model 物件傳遞資料給Partial View

```
@Html.Partial("PartialName", model 物件)
```

參考資料：

Razor ASP.NET Core 的語法參考：[https://docs.microsoft.com/zh-tw/aspnet/core/mvc/views/razor?view=aspnetcore-3.1](https://docs.microsoft.com/zh-tw/aspnet/core/mvc/views/razor?view=aspnetcore-3.1)
