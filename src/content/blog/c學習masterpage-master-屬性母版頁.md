---
title: "[C#][.NET]MasterPage.Master 屬性(母版頁)"
description: "使用母版頁的優點包括： 允許您集中頁面的通用功能。 允許您創建一個控件和代碼，並將結果應用於一組頁面。 允許您 [&hellip;]"
pubDate: 2020-05-03
topic: software
series: csharp
heroImage: /public/uploads/wp/4257.png
wpId: 4257
slug: c-masterpage-master-4257
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/05/03/c%e5%ad%b8%e7%bf%92masterpage-master-%e5%b1%ac%e6%80%a7%e6%af%8d%e7%89%88%e9%a0%81/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/05/master-page-asp-net.png)

使用母版頁的優點包括：

- 允許您集中頁面的通用功能。

- 允許您創建一個控件和代碼，並將結果應用於一組頁面。

- 允許您控制最終頁面的佈局。

- 允許您從各個內容頁面定制母版頁。

主版頁面

- 母版頁定義為文件擴展名.master。

- 母版頁繼承自MasterPage類。

- 母版頁包含一個@ Master指令。

- 母版頁使用ContentPlaceHolder控件來定義內容頁面的區域。

MasterPage和ContentPage範本

下面是一個主版頁面與內容頁面的範例：

檔案總管配置

![](https://lh3.googleusercontent.com/IQ3EZHYg3tD_EI03Im3ucpxDBr1_ufegnv3xYlVhlC405CHBjcv86g7T4Bu8C27eBtmLG_qvSKrhEGTK3WqQnjaJxK-yaCN_P0VboMgKpyYR0xvkLTAJgzF-GB09jpVJA7pJ05ay82fF8sNoMw2GQRaeoYUyxGJhoHeNRnAk4tt-kp9cCfaMYt6pD-ikNIkzUHMdE-8lM9WRXeqNVcyUEbPH2-1N3TS96l9FAWoBwllrbd0XgqFVoJ5799h9uEzHLGSzBeTJnKWuK31_JWivDpkTeoH8GyDkhT_2QxLwLuc_uNiMsP2mMu6W3KcqwBMCZntiYSbe9sYpWGk3L62HYLwsCT4Ze1BKFFAHkmvlaZYEXA3HF7hem6NGA1I8aXQ5dfHlYn9wcefIVj9a4DnkUgIl-s8Cuyj7zTU9e3gCguiyLYIxQ3ajyLEinsXfhj_swo4UdLUMKfsk-oKzPU5wmkzYdaRhKElYzt73_G9rfdT5AcwE-rRTL4O_a1nkOuRJfOKZzAKeKTvDeSQJhHThWmmNtZMTrvYofx5QMCdybOx5FVZhHhPHuLVtu9fujUMYGbs2LzAFOSZx_nKD-m3X9DPZ3BfYRCBytX_pFe9wTM0qo0WXgIwUdaLj0lVt9KulKr87yISH3bfjpG6GYvM4LERlep0VbdI8QgY0ectqUe_OzPilSOa8Pp7ymHQwJbvoLCmDzI91dkO12k9UrqHsWDLPDKuDlvyYvTfIi6kHKXgW6rQDsQ0nhsE=w513-h338-no)

Master Page 母頁

MasterPage.master

```
<%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %>

<!DOCTYPE html>

<html>
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <asp:ContentPlaceHolder id="head" runat="server">
    </asp:ContentPlaceHolder>
</head>
<body>
     <div style="background:#b6ff00">
            母版頁（Master Pages）：Master Page 使您有能力為web 應用程序中的所有頁面（或頁面組）創建一致的外觀和行為。
      </div>
    <form id="form1" runat="server">
    <div>
        <asp:ContentPlaceHolder id="ContentPlaceHolder1" runat="server">
            <div style="background:#ffd800">
                這是是放內容資料的，MasterPage這邊放任何程式會被清除
            </div>
        </asp:ContentPlaceHolder>
    </div>
    </form>
</body>
</html>

```

Content Page 內容頁

Default.aspx

```
<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <h2>這是內容頁面，</h2>
    <h2>Individual Content</h2>
    <p>Paragrap 1</p>
    <p>Paragrap 2</p>
<asp:TextBox id="textbox1" runat="server" />
<asp:Button id="button1" runat="server" text="Button" />

</asp:Content>

```

範本結果

![](https://lh3.googleusercontent.com/wivQZC57XiFZYh6zS6ULr63StII6ggyzV_w7YyJWtPVRSqoau8jTqkjgEnuFR_qF9vI9nDTLeMfPKQSu_ktp3Ch-ZDkiNaR0vT97KBLV3Pgn87vYv6__kV6vNhUH_aVgWmrFMobczuoZgoBEu8pFuyACygo1JkJAizYwN-_ixnNTgZ3wS4q7COxGl9TZJZdQCzGVpBolc3ZGYF8zs-h2QAfA7iM5qhdzhP7eDSIljALKFDI-pUh5w7kXJx-BNx5sscamDyBTTsxQDzRxg6WlJY-bLKx0-4NhcwH_7UsrH9mhx0VkGChIRIS4rNI4xV4FwBWtheggsRTbPDibNq1S1xFdP68kFpSJ4Azgnawpvx_l5fLYrqQZSZrLzrm-I-9ixJpiWTWcsM0SdzBh27dmF1ePbW7VdWBajUg9-4TT4HhYCVslwZwjDL0ZuVwOYaM8u9OpvxbKPu9dK0VzBrqgIoI62SZMUNvzM0rhiFN3yE4QQuMtl1MUEbCGajQdlvP0ILtaiq_WD0DuH5KQtEkgJoWtsRXN9gP6mg9BmftVXQNqZmG5_lSQakQ0An8r42coB2an0se7OAcgcfyx5TqYzK04QcpE6MqfHFSE7cTADP_eS-Mjd9fgeNbpDoDi0TPO9SmTiJOXqD0QB-kP5aN7whcDMtybfKtG4Rh4zWM2eUYE3tVk7px8rYe1fkB7hy2A3I66727uypTf0yuxfn0aAJJG14MLrFcDalCrTCLbgCwMYDHgEhD6VDw=w1605-h903-no)

參考資料：

Master Page：[http://vito-note.blogspot.com/2012/10/master-page.html](http://vito-note.blogspot.com/2012/10/master-page.html)

microsoft MasterPage.Master 屬性：[https://docs.microsoft.com/zh-tw/dotnet/api/system.web.ui.masterpage.master?view=netframework-4.8](https://docs.microsoft.com/zh-tw/dotnet/api/system.web.ui.masterpage.master?view=netframework-4.8)
