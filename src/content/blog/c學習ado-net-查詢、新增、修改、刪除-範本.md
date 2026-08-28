---
title: "[C#][.NET]ADO.NET 查詢、新增、修改、刪除 範本"
description: "環境與版本 作業系統：Window10 64x 開發軟件(IDE)：Visual Studio 2015 Co [&hellip;]"
pubDate: 2020-05-05
topic: software
series: csharp
heroImage: /public/uploads/wp/4264.png
wpId: 4264
slug: c-ado-net-4264
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/05/05/c%e5%ad%b8%e7%bf%92ado-net-%e6%9f%a5%e8%a9%a2%e3%80%81%e6%96%b0%e5%a2%9e%e3%80%81%e4%bf%ae%e6%94%b9%e3%80%81%e5%88%aa%e9%99%a4-%e7%af%84%e6%9c%ac/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/05/ado-1.png)

環境與版本

作業系統：Window10 64x

開發軟件(IDE)：Visual Studio 2015 Community

.NET版本：ASP.NET Framework 4.x

專案架構：Web Form

資料庫產品版本：SQL Server 2014 Express Edition (64-bit)

資料庫版本編號：12.0.2000.8

ADO.NET 概觀

ADO.NET是微軟公司開發用來操作資料庫的函式庫，ADO.NET 可讓您以一致的方式存取資料來源 (例如 SQL Server 與 XML)。 資料共用的消費者應用程式可使用 ADO.NET 來連接至這些資料來源，並且擷取、處理及更新其中所含的資料。
•微軟在.NET Framework中負責資料存取的類別庫集
•可以讓.NET上的任何程式語言能夠連接並存取關聯式資料庫與非資料庫型資料來源
•連線資料來源以及離線資料模型兩個部份構成，這兩個部份是相輔相成的

ODBC > OLEDB > ADO > ADO.Net> Entity Framework

ODBC(Open DatabaseConnectivity)是一種標準，而標準其實是介面(ODBC驅動)
OLEDB(ObjectLinkingand Embedding,Database)能處理關聯式資料庫, 也能處理非關聯式資料(如:Excel)
ADO(ActiveX Data Objects)建立在ODBC和OLEDB之上的又一次封裝
ADO.Net引入了離線型資料模型的概念
Entity Framework將每個資料庫物件轉換成應用程式物件，資料欄位轉換為屬性

Connection(用於建立與資料庫的連線)

Command(用於執行SQL語句)

DataReader(用於讀取資料)

DataAdapter(用於填充把資料填充到DataSet)

DataSet(資料集,用於程式中)

是從資料來源中抓取之資料的記憶體內部快取，是ADO.NET 架構的主要元件
是由DataTable物件的集合所組成
使用DataAdapter，以資料來源中的資料建立和填入DataSet中的每個DataTable
Clear() (移除所有資料表中的資料列，以清除任何資料的DataSet)
Copy (複製這個DataSet的結構和資料)
GetXml() (傳回儲存於DataSet的資料之XML 表示)
Merge() (將指定的DataSet(DataTable、DataRow) 及其結構描述合併到目前的DataSet)

DataTable

可以儲存的最大資料列數目是16777216

SqlConnection：資料庫的連線字串，告訴程式你要針對哪一個資料庫做動作
SqlCommand：資料庫指令，Select、Insert、Delete、Update
SqlDataAdapter：資料連結器，負責把資料的結果集傳回
DataTable：用記憶體當作一張資料表，存放查詢的結果
DataSet：用記憶體當作一個資料集，包含多個查詢結果
SqlDataReader：資料讀取器，把查詢的結果讀出

ADO.NET 查詢、新增、修改、刪除 範本

Web.config

在Web.config裡面加入<connectionStrings>資料庫連線資料

```
<?xml version="1.0"?>

<!--
  For more information on how to configure your ASP.NET application, please visit
  http://go.microsoft.com/fwlink/?LinkId=169433
  -->

<configuration>

    <system.web>
      <compilation debug="true" targetFramework="4.5.2" />
      <httpRuntime targetFramework="4.5.2" />
    </system.web>

  <connectionStrings>
    <add name="TEST" connectionString="Data Source=.;Initial Catalog=TEST;Persist Security Info=True;User ID=IRSYS;Password=irsysdba" providerName="System.Data.SqlClient"/>
  </connectionStrings>
  
</configuration>

```

Default.aspx

在前台頁面中放上創建(C)、查詢(R)、修改(U)、刪除(D)相關功能。

```
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <fieldset>
        <legend>ADO.NET連線方式</legend>
        <asp:Label ID="Label1" runat="server" Text="Label">輸入值</asp:Label>
        Title:<asp:TextBox ID="Title" runat="server"></asp:TextBox>
        Value:<asp:TextBox ID="Value" runat="server"></asp:TextBox>
        <asp:Button ID="Select_btn" runat="server" Text="查詢" OnClick="Select_btn_Click"/>
        <asp:Button ID="Inster_btn" runat="server" Text="新增" OnClick="Inster_btn_Click" />
        <asp:Button ID="Update_btn" runat="server" Text="修改" OnClick="Update_btn_Click" />
        <asp:Button ID="Delete_btn" runat="server" Text="刪除" OnClick="Delete_btn_Click" />
        <asp:Button ID="Select_All_btn" runat="server" Text="查詢全部" OnClick="Select_All_btn_Click"/>
        <asp:GridView ID="GridView1" runat="server"></asp:GridView>
    </fieldset>
    </div>
    </form>
</body>
</html>

```

Default.aspx.cs

在後端的部分，製作資料庫連線和利用ado.net的連接方式，加上SQL的語法，與資料庫互動。

```
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;

public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            string SQLString = "Select * from Test..Test1 Where 1=1 ";
            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();
            SqlCommand sqlcommand = new SqlCommand(SQLString);

            sqlcommand.Connection = sqlconnection;
            sqlcommand.Parameters.Clear();

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                SqlDataAdapter sqldataadapter = new SqlDataAdapter(sqlcommand);
                sqldataadapter.Fill(dataset);

            }
            GridView1.DataSource = dataset.Tables[0];
            GridView1.DataBind();

        }
        catch (Exception msg)
        {
            Console.WriteLine(msg);
        }
        finally
        {

        }
    }

    protected void Select_btn_Click(object sender, EventArgs e)
    {
        try
        {

            string SQLString = "Select * from Test..Test1 Where 1=1 and Title=@Title ";

            SqlCommand sqlcommand = new SqlCommand(SQLString);
            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();

            sqlcommand.Connection = sqlconnection;
            sqlcommand.Parameters.Clear();
            string TitleTextTrim = Title.Text.Trim();
            sqlcommand.Parameters.Add("@Title", SqlDbType.NChar).Value = TitleTextTrim;

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                SqlDataAdapter sqldataadapter = new SqlDataAdapter(sqlcommand);
                sqldataadapter.Fill(dataset);
            }

            GridView1.DataSource = dataset.Tables[0];
            GridView1.DataBind();
        }
        catch(Exception msg)
        {
            Console.WriteLine(msg);
        }
    }

    protected void Inster_btn_Click(object sender, EventArgs e)
    {
        try
        {
            string SQLString = "INSERT INTO dbo.Test1([Title], [Value])VALUES (@Title, @Value); ";

            SqlCommand sqlcommand = new SqlCommand(SQLString);

            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();

            sqlcommand.Connection = sqlconnection;
            sqlcommand.CommandText = SQLString;
            sqlcommand.Parameters.Add("@Title", SqlDbType.NChar).Value = Title.Text.Trim();
            sqlcommand.Parameters.Add("@Value", SqlDbType.NChar).Value = Value.Text.Trim();

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                sqlcommand.ExecuteNonQuery();
            }
        }
        catch (Exception msg)
        {

        }
       

    }

    protected void Update_btn_Click(object sender, EventArgs e)
    {
        try
        {
            string SQLString = "Update dbo.Test1 SET [Value] = @Value WHERE [Title] = @Title; ";

            SqlCommand sqlcommand = new SqlCommand(SQLString);

            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();

            sqlcommand.Connection = sqlconnection;
            sqlcommand.CommandText = SQLString;
            sqlcommand.Parameters.Add("@Title", SqlDbType.NChar).Value = Title.Text.Trim();
            sqlcommand.Parameters.Add("@Value", SqlDbType.NChar).Value = Value.Text.Trim();

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                sqlcommand.ExecuteNonQuery();
            }

        }
        catch (Exception msg)
        {

        }
    }

    protected void Delete_btn_Click(object sender, EventArgs e)
    {
        try
        {
            string SQLString = "DELETE FROM dbo.Test1 WHERE [Title] = @Title and [Value] = @Value;  ";

            SqlCommand sqlcommand = new SqlCommand(SQLString);

            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();

            sqlcommand.Connection = sqlconnection;
            sqlcommand.CommandText = SQLString;
            sqlcommand.Parameters.Add("@Title", SqlDbType.NChar).Value = Title.Text.Trim();
            sqlcommand.Parameters.Add("@Value", SqlDbType.NChar).Value = Value.Text.Trim();

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                sqlcommand.ExecuteNonQuery();
            }

        }
        catch(Exception msg)
        {

        }
    }

    protected void Select_All_btn_Click(object sender, EventArgs e)
    {
        try
        {
            string SQLString = "Select * from Test..Test1 Where 1=1 ";
            SqlConnection sqlconnection = new SqlConnection(WebConfigurationManager.ConnectionStrings["Test"].ConnectionString);
            DataSet dataset = new DataSet();
            SqlCommand sqlcommand = new SqlCommand(SQLString);

            sqlcommand.Connection = sqlconnection;
            sqlcommand.Parameters.Clear();

            using (sqlcommand.Connection)
            {
                sqlcommand.Connection.Open();
                SqlDataAdapter SDadapter = new SqlDataAdapter(sqlcommand);
                SDadapter.Fill(dataset);

            }
            GridView1.DataSource = dataset.Tables[0];
            GridView1.DataBind();
        }
        catch(Exception msg)
        {

        }
    }
}
```

資料庫 範本

此範本使用MSSQL資料庫，可使用此指令碼產生相對應資料表

![](https://lh3.googleusercontent.com/WZy50pRqIOsmfxmPOLVrC-USBM8oABjXsMB0kNO9SOzNbqEW048cy3FrterqOXz3y2ZS8N5f44BqQ990XJiKSq6PjBeuMYs4zyiMDmsn2L0ahAF3qGOG4y2VqmLcTufg9G6xodjhchdOJCOspKt5zudtGpxEtdV5Y2LuIgt9fDLy9cYqvZmMhbZUlJH3DQHk1hr4dOhi462BHT0kKrR1ntTNr_JPPY-x3brw1mjJyU7WVwv_oa3O3Q1Rkjkrf6MnceaC60ZgmuBPlfYObSPJTGcvQY5GpNuPPAvgDqAt5ii6EbRtdSXT_4iHCM0hXhDY0R82yznv55AkUcwPgAe2bHTSBJmkqMI3iRyFi-pn8vwGVRtPhVVf14A-PAUNgS0iViOWWDc1VCza546EA7wQB0MN2F-yPin5GkFpA58gFqBf8ZS_7gUrywUNowvHj_jjoaDBqwkemDUW6L6Vrg4dpRtwxdI03CsXVxMjAPfHyjNT9g2ULHVlM6pOTjv_iWr4RvhY9dV2zfNunss6cAulTbBdUGo0nbyfd9EGWf3fk9gCy39SgtdmVrSPRojOp-4XF1sfpkdEuxBhriL1aPyJMEBmXeIKiUji24buu9V8c60s84VrmjGNk8-hZaLOU_mL6_PixHK4ggPDanoOlB5z-_tbc-BMvb5JdGjtvdxrB3Fv0kSKAjcHINoEGcnxur-ArCT8WZUAueOwhPtwsuTFK47NDZe_9kAScKjx4ronfYEVlMleeYRKbzw=w1605-h903-no)

```
USE [Test]
GO
/****** Object:  Table [dbo].[Test1]    Script Date: 2020/8/29 下午 06:39:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Test1](
	[Title] [nchar](16) NOT NULL,
	[Value] [nchar](16) NOT NULL,
	[pk] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Test1] PRIMARY KEY CLUSTERED 
(
	[pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Test1] ON 

GO
INSERT [dbo].[Test1] ([Title], [Value], [pk]) VALUES (N'title02         ', N'02              ', 2)
GO
INSERT [dbo].[Test1] ([Title], [Value], [pk]) VALUES (N'title03         ', N'03              ', 3)
GO
INSERT [dbo].[Test1] ([Title], [Value], [pk]) VALUES (N'title04         ', N'04              ', 5)
GO
SET IDENTITY_INSERT [dbo].[Test1] OFF
GO

```

範本結果

![](https://lh3.googleusercontent.com/MdJMN7rvU06dRTk2JiXlcmx3TENqv1f2vJJfqIACtbN8-WqYsL_VP-Jz0R6soQOvEqn6sK47j4BKwkv-mZaL5NKYWQsZ22CDEmTcUhFjh-75tpK0Upi7LvJ7o5jzIYN2R14GCNolxTaTj55a604sCBnrh5LZVM5VDr14wk8u_Ul16bcQ1Ii8NmxFibn04P1e7_tHjGiVlmvBOgajqjG2J3ZMG1fsp1mn_l1HAkI7RRmor7ygxRF3LkXPVCwyb8A5D-67HeTU_WifDF3TgCu8qRDF4FtTkp8olz-7PmYiQ403owQ7EScgSRjfN4HjzPyEcacTOP4Xrcm2PDzaKqW4iZ3A3QqZf4cRS7dgmXzmuwRZZkHGqftF7PFF8b4Ap_RtKZTG7h_koJ4iOZJ7lovzBH1Fi0ipzyIlMrBjzlhU30FwIqm2nEY5pifmNEfrgvuLIliYj3kqV6ryGf-a4e-zYQ5TkOq2yv4IJfXOuaUw-M1Go7lhBraKstlPJDqEOEFvs-oL66De_ynT2lrkQBG77VBbwyo_ZOdb_c7Lvng4ZU1d-6ay9eaLe4u0Pfthkuq1iC-Xd--TnN3NyP583p5uSD977brq7DH4iIJdszRurXgqcvgLWT1FmsBxiltK1pcvpB33ZEMUg9txZyzdr4jDF6jCvSsgZYjGL3CUrM7SB37QGzG4Fz3zvQPpb3Y5v9gQJt-e9oVSfZ9xWZFxXalTpHejk5yARyJA0K11LGWAYZ3qDk41sl2_avs=w1605-h903-no)

參考資料：

Microsoft ADO.NET 概觀 ：[https://docs.microsoft.com/zh-tw/dotnet/framework/data/adonet/ado-net-overview](https://docs.microsoft.com/zh-tw/dotnet/framework/data/adonet/ado-net-overview)
