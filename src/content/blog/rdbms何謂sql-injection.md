---
title: "[RDBMS]何謂Sql injection"
description: "這題可謂是面試幾乎必考問題，原本想說網路上文章一堆了，也沒必要多寫這篇，但是因為實在太常考了，而且就算我們常常 [&hellip;]"
pubDate: 2022-02-18
topic: software
series: sql
heroImage: /public/uploads/wp/7247.jpg
wpId: 7247
slug: rdbms-sql-injection-7247
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/02/18/rdbms%e4%bd%95%e8%ac%82sql-injection/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/02/0_bqtNE3-mhgcMkvjg.jpg)

這題可謂是面試幾乎必考問題，原本想說網路上文章一堆了，也沒必要多寫這篇，但是因為實在太常考了，而且就算我們常常注意到，但是如果被問到，當下還真的會忘記怎麼去回答，決定狠下心來，好好寫一篇，讓未來被問到的時候，照著唸(誤😂😂

何謂Sql injection

利用SQL的語法進行一些惡意的攻擊！

在輸入的字串之中夾帶SQL指令，在設計不良的程式當中忽略了字元檢查，那麼這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的SQL指令而執行，因此遭到破壞或是入侵。

舉例：

某個網站的登入驗證的SQL查詢代碼為

```
strSQL = "SELECT * FROM users WHERE (name = '" + userName + "') and (pw = '"+ passWord +"');"
```

惡意填入

```
userName = "1' OR '1'='1";
```

```
passWord = "1' OR '1'='1";
```

時，將導致原本的SQL字串被填為

```
strSQL = "SELECT * FROM users WHERE (name = '1' OR '1'='1') and (pw = '1' OR '1'='1');"
```

也就是實際上執行的SQL命令會變成下面這樣的

```
strSQL = "SELECT * FROM users;"
```

因此達到無帳號密碼，亦可登入網站。所以SQL注入被俗稱為駭客的填空遊戲

三種較常見的 SQL injection 攻擊手法

1.Authorization Bypass：

```
SELECT * FROM customers WHERE name =' -name- ' AND password = ' -password-'
```

透過在’ -name- ‘所對應的方塊內輸入

```
'OR 1=1 --
```

語法意義

‘是將 name 的 input 方塊內容關閉

OR是指 [ 或是 ]的條件

1=1恆正

—將後方接著的內容註解化

使得 Query statement 變為

```
SELECT * FROM customers WHERE name =''OR 1=1 -- AND password = ' -password-'
```

2.Injecting SQL Sub-Statements into SQL Queries：

```
http://127.0.0.1?productid=123; DROP TABLE Products
```

在上面的 URL 中在 productid=123 後面加上一個分號 ;，並加上 DROP TABLE Products 這個 sub command會命令 SQL server 將 Products 這個 Table 刪除掉。

```
http://127.0.0.1?productid=123 UNION SELECT Username, Password FROM USERS
```

此URL 利用 UNION 能將兩個 SELECT 的結果用一個結果集呈現出來，而第二個 SELECT 是將 USERS 這個 Table 的 Username 與 Password 呈現出來，以竊取資料庫中存放的所有使用者的帳號密碼!

3.Exploiting Stored Procedures：

```
127.0.0.1?city=pune';EXEC master.dbo.xp_cmdshell 'Paramater1'
```

透過 EXEC 去執行 master.dbo.xp_cmdshell 這個預存程序，並帶一參數 Paramater1 代表想讓預存程序執行的內容。

如何防範SQL Injection

1.加強對用戶輸入資料的檢核與驗證

使用 Regular expression (正則表達式)驗證過濾輸入值與參數中惡意代碼，將輸入值中的單引號置換為雙引號。

在組合SQL字串時，先針對所傳入的參數加入其他字元（將單引號字元前加上跳脫字元）。

2.應用系統中存取資料庫時，應明確定義存取資料庫的使用者權限

假設一個普通用戶在 SQL 查詢語法中，嵌入一個 Drop Table 語句，那麼是否允許執行呢？由於 Drop 語法關係到資料庫的基本物件，因此操作這個語句用戶必須有相對應的操作權限。

3.在設計應用程式時，完全使用參數化查詢（Parameterized Query）來設計資料存取功能。⭐建議

例如C#此代碼：

```
class Program
{
    private static string connectionString = "Data Source=.;Initial Catalog=Test;Integrated Security=True";

    static void Main(string[] args)
    {
        Login("b", "a");
        Login("b' or 1=1--", "a");
    }

    private static void Login(string userName, string password)
    {
        using (SqlConnection conn = new SqlConnection(connectionString))
        {
            conn.Open();
            SqlCommand comm = new SqlCommand();
            comm.Connection = conn;
            //爲每一條數據添加一個參數
            comm.CommandText = "select COUNT(*) from Users where Password = @Password and UserName = @UserName";
            comm.Parameters.AddRange(
            new SqlParameter[]{                        
                new SqlParameter("@Password", SqlDbType.VarChar) { Value = password},
                new SqlParameter("@UserName", SqlDbType.VarChar) { Value = userName},
            });

            comm.ExecuteNonQuery();
        }
    }
}
```

原理如下

一般使用SQL指令字串的方式，可以改變 SQL語義 

```
SELECT * FROM customers WHERE name =' -name- ' AND password = ' -password-'
```

```
SELECT * FROM customers WHERE name =''OR 1=1 -- AND password = ' -password-'
```

參數方式的處理

資料庫伺服器不會將參數的內容視為SQL指令的一部份來處理，而是在資料庫完成 SQL 指令的編譯後，才套用參數運行， (白話點說 資料庫伺服器 會先將 SQL 語句進行編譯，之後再把使用者輸入的參數丟進先前編譯的 SQL 語句再次執行)。 因此就算參數中含有具有損的指令，也不會被資料庫所運行。

這也是所謂的SQL語義不會變化

因爲SQL的語意有可能會變化，所表達的查詢就可能變化。

細節深入原因->Execution Plan(執行計畫)

資料庫 收到SQL指令 –> 進行語法解析、語意分析 –> 編譯SQL生成執行計劃 –>選擇執行計劃 –>執行執行計劃。

簡單概述總結：

一般使用SQL指令字串不能夠重用執行計劃，參數的方式會重用執行計劃

如果不能夠重用執行計劃，那麼就有SQL注入的風險，因爲SQL的語意有可能會變化，所表達的查詢就可能變化。

參考：[[Sql Server 编译、重编译与执行计划重用原理]](https://blog.csdn.net/babauyang/article/details/7714211)、[[參數化查詢]](https://www.easyatm.com.tw/wiki/%E5%8F%83%E6%95%B8%E5%8C%96%E6%9F%A5%E8%A9%A2)、

4.使用其他更安全的方式連接SQL資料庫。 ⭐建議 例如：已修正過SQL注入問題的資料庫連接元件，例如ASP.NET的SqlDataSource物件或是 LINQ to SQL。

此方式最為建議。像筆者都用  ASP.NET的Linq元件。

參考或引用資料：

SQL注入：[https://zh.wikipedia.org/wiki/SQL%E6%B3%A8%E5%85%A5](https://zh.wikipedia.org/wiki/SQL%E6%B3%A8%E5%85%A5)

Microsoft MSDN [https://msdn.microsoft.com/zh-tw/library/ms175046.aspx](https://msdn.microsoft.com/zh-tw/library/ms175046.aspx)
Microsoft technet [https://technet.microsoft.com/library/aa991542](https://technet.microsoft.com/library/aa991542)
teamshatter sql-injection [http://www.teamshatter.com/topics/general/team-shatter-exclusive/sql-injections-in-stored-procedures/](http://www.teamshatter.com/topics/general/team-shatter-exclusive/sql-injections-in-stored-procedures/)

[Postx1] 攻擊行為－SQL 資料隱碼攻擊 SQL injection：[https://ithelp.ithome.com.tw/articles/10189201](https://ithelp.ithome.com.tw/articles/10189201)

如何預防SQL Injection 的攻擊 – 叡揚資訊：[https://www.gss.com.tw/images/stories/epaper_GSS_security/pdf/epaper_gss_security_0051.pdf](https://www.gss.com.tw/images/stories/epaper_GSS_security/pdf/epaper_gss_security_0051.pdf)

參數化查詢爲什麼能夠防止SQL注入：[https://www.twblogs.net/a/5b8bfdc32b717718832fa3ea](https://www.twblogs.net/a/5b8bfdc32b717718832fa3ea)

(SQL) 爲什麼參數化查詢可以防止SQL Injection/如何觀看Execution Plan上的差異：[https://jerrywu-3165.medium.com/sql-%E7%88%B2%E4%BB%80%E9%BA%BC%E5%8F%83%E6%95%B8%E5%8C%96%E6%9F%A5%E8%A9%A2%E5%8F%AF%E4%BB%A5%E9%98%B2%E6%AD%A2sql-injection-670e98c0c3bf](https://jerrywu-3165.medium.com/sql-%E7%88%B2%E4%BB%80%E9%BA%BC%E5%8F%83%E6%95%B8%E5%8C%96%E6%9F%A5%E8%A9%A2%E5%8F%AF%E4%BB%A5%E9%98%B2%E6%AD%A2sql-injection-670e98c0c3bf)
