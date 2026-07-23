---
title: "[C#][.NET]故障排除Access to the path &#8221; is denied.解决方案-透過IIS 中的身分識別 調整資料夾權限"
description: "環境與版本 作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110 IIS [&hellip;]"
pubDate: 2021-12-31
topic: software
series: csharp
heroImage: /public/uploads/wp/6990.jpg
wpId: 6990
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/12/31/c-net%e6%95%85%e9%9a%9c%e6%8e%92%e9%99%a4access-to-the-path-is-denied-%e8%a7%a3%e5%86%b3%e6%96%b9%e6%a1%88-%e9%80%8f%e9%81%8eiis-%e4%b8%ad%e7%9a%84%e8%ba%ab%e5%88%86%e8%ad%98%e5%88%a5/"
---

環境與版本

作業系統：Window10 64x | 版本：20H2 | OS組件：19042.1110

IIS版本：10.0.19041.1415

專案架構：.Net core MVC 3.1

開發軟件(IDE)：Visual Studio 2019 Community

前言與事件經過

本來身為乙方的我們開發完專案程式，放置於甲方的環境中運轉，但是在某次甲方IT人員更動一些權限，並且異動上傳檔案的資料夾位置，原本好好的軟體狀態，在檔案上傳的時候，突然發生Exception訊息狀況!

訊息內容大致如下：

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/12/1640831659580-1024x172.jpg)

Access to the path ‘你的路徑’ is denied.

每次發生這種錯誤的時候，甲方都會立馬打來突然唸一番並詢問到底怎麼回事，也要求趕緊修正。原本好好的，且我們也根本甚麼都沒做就被唸被罵，內心多少不是很高興，但內心不是滋味歸不是滋味，事情還是要解決，所以立刻規劃要怎麼查問題和修正問題，首先請他們發相關提示訊息過來，並且詢問甲方IT部門突然做了甚麼事情，雖然IT部門回復沒有去更動甚麼，只做一些權限調整..等。

Sponsored Ad

原因與解決

原因：

對於創建的每個應用程序池(Application Pool)，新應用程序池 (Application Pool) 的 Identity 屬性默認設置為ApplicationPoolIdentity。默認情況下，IIS 管理進程 (WAS) 將使用新應用程序池的名稱創建一個虛擬帳戶，並在此帳戶下運行應用程序池的工作進程。

每當創建新的應用程序池時，IIS 管理進程都會創建一個安全標識符 (SID)，代表應用程序池本身的名稱。例如，如果您創建名為“MyNewAppPool”的應用程序池 (Application Pool) ，則會在 Windows 安全系統中創建名為“MyNewAppPool”的安全標識符。但是，該身份不是真實的用戶帳戶；它不會在 Windows 用戶管理控制台中顯示為用戶。

要在 Windows Server 2008 以上運行 IIS 7.0 以上時使用虛擬帳戶，您必須將您創建的應用程序池的 Identity 屬性更改為ApplicationPoolIdentity。方法如下：

- 打開 IIS 管理控制台 (INETMGR.MSC)。

- 打開機器節點下的應用程序池節點。選擇要更改為在自動生成的應用程序池標識下運行的應用程序池。

- 右鍵單擊應用程序池並選擇進階設置

- 選擇Identity列表項並單擊省略號（帶有三個點的按鈕）。

- 出現以下對話框：

- 選擇內置帳戶按鈕，然後從組合框中選擇身份類型ApplicationPoolIdentity。

![](https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities/_static/image5.jpg)

![](https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities/_static/image7.jpg)

解決：

後來藉由「權限」、「Access to the path ‘你的路徑’ is denied.」關鍵字，猜想有可能發生的問題，並且網路查找相關訊息，透過這篇文章「[IIS程序发布好出现Access to the path ‘路径’ is denied问题的解决，一句话最简](https://blog.csdn.net/mhshencaobo/article/details/85269464)」與微軟的「[Application Pool Identities](https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities)」了解IIS裡面關於APP Pool的iis權限配置，藉由資料夾的權限配置教學，並且拍攝影片給甲方讓他們操作，解決的此問題。

通過在 Windows 資源管理器中選擇一個文件並將“DefaultAppPool”標識添加到文件的訪問控制列表 (ACL) 來嘗試此操作。

- 打開 Windows 資源管理器

- 選擇一個文件或目錄。

- 右鍵單擊文件並選擇屬性

- 選擇安全性選項

- 單擊編輯按鈕，然後單擊添加按鈕

- 單擊位置按鈕並確保您選擇了您的計算機。

- 在Enter the object names to select:文本框中輸入IIS AppPool\DefaultAppPool。

- 單擊檢查名稱按鈕，然後單擊確定。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/12/1640890657882-1024x660.jpg)

![](https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities/_static/image9.jpg)

視頻操作

參考資料：

ApplicationPoolIdentity 沒有 ASP.NET App_Data 資料夾的寫入權限
h[ttps://docs.microsoft.com/zh-tw/troubleshoot/aspnet/applicationpoolidentity-write-app-data](https://docs.microsoft.com/zh-tw/troubleshoot/aspnet/applicationpoolidentity-write-app-data)

IIS程序发布好出现Access to the path ‘路径’ is denied问题的解决，一句话最简
ht[tps://blog.csdn.net/mhshencaobo/article/details/85269464](https://blog.csdn.net/mhshencaobo/article/details/85269464)

Application Pool Identities
[https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities](https://docs.microsoft.com/en-us/iis/manage/configuring-security/application-pool-identities)

Access to the path ” is denied.解决方案
[https://www.pianshen.com/article/7269459380/](https://www.pianshen.com/article/7269459380/)

Access to the path is denied
ht[tps://stackoverflow.com/questions/4877741/access-to-the-path-is-denied](https://stackoverflow.com/questions/4877741/access-to-the-path-is-denied)

瞭解 IIS 中的身分識別
h[ttps://docs.microsoft.com/zh-tw/troubleshoot/iis/understanding-identities](https://docs.microsoft.com/zh-tw/troubleshoot/iis/understanding-identities)
