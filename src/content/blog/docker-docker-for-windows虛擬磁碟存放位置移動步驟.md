---
title: "[Docker]Docker for windows虛擬磁碟存放位置移動步驟"
description: "環境與版本 作業系統：Window10 64x 版本：2004 產品版本：Docker Engine v 19 [&hellip;]"
pubDate: 2020-11-14
topic: software
series: mis
heroImage: /public/uploads/wp/4958.jpg
wpId: 4958
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/14/docker-docker-for-windows%e8%99%9b%e6%93%ac%e7%a3%81%e7%a2%9f%e5%ad%98%e6%94%be%e4%bd%8d%e7%bd%ae%e7%a7%bb%e5%8b%95%e6%ad%a5%e9%a9%9f/"
---

環境與版本

作業系統：Window10 64x 版本：2004

產品版本：Docker Engine v 19.03.13

原虛擬映像檔配置

Docker for windows安裝好，點選Docker Desktop運行Docker

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image.png)

Docker 虛擬硬碟檔案 的預設位置路徑

C:\Users\使用者名稱\AppData\Local\Docker\wsl\

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-3.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-2-1024x276.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-4-1024x299.png)

這2個檔案會隨著docker容器的建置，大小容量越來越大，若C碟容量沒有很大的電腦，會造成磁碟空間不足的情況，可將其移至其他容量充足的磁碟。

虛擬磁碟位置移動步驟

步驟一：

先把docker關閉，至右下角鯨魚圖示點右鍵，選擇Quit Docker Desktop關閉程式

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-5.png)

步驟二：

以系統管理員身分執行 命令提示字元，輸入wsl -l -v，查詢目前的Linux主機

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-6.png)

步驟三：

執行wsl -–shutdown

步驟四：

再次執行wsl -l -v，確認主機是否已關閉

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-7.png)

步驟五：

在空間充足的磁碟建立資料夾

範例位置：

E:\Docker\Linux\wsl\data\
E:\Docker\Linux\wsl\distro\

步驟六：

執行下列指令，將相關資料夾位置改成自己的

Windows 子系統 (WSL) 的命令

–export ：將散發套件匯出至 tar 檔案。

–unregister：取消註冊發行版本。

–import：匯入指定的 tar 檔案作為新的散發套件。

參考詳見：[適用於 Linux 的 Windows 子系統命令參考](https://docs.microsoft.com/zh-tw/windows/wsl/reference)、[什麼是適用於 Linux 的 Windows 子系統 (WSL)？](https://docs.microsoft.com/zh-tw/windows/wsl/faq)

範例：

```
wsl --export docker-desktop-data E:\Docker\Linux\wsl\data\docker-desktop-data.tar
wsl --unregister docker-desktop-data
wsl --import docker-desktop-data E:\Docker\Linux\wsl\data\ E:\Docker\Linux\wsl\data\docker-desktop-data.tar --version 2
```

```
wsl --export docker-desktop E:\Docker\Linux\wsl\distro\docker-desktop.tar
wsl --unregister docker-desktop
wsl --import docker-desktop E:\Docker\Linux\wsl\distro\ E:\Docker\Linux\wsl\distro\docker-desktop.tar --version 2
```

步驟七：

成功後在路徑下可看到 .vhdx檔案，.tar檔案為匯出檔，檔案移動時使用，可刪除。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-8.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-9.png)

步驟八：

再次執行wsl -l -v，確認主機是否已啟動

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-10.png)

步驟九：

執行docker info，若有出現詳細訊息，表示移動成功

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-11.png)

步驟十：

在Docker Desktop 軟體裡面的 Image docker 會掃描目前ˊ註冊的映像檔

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/image-12-1024x590.png)
