---
title: "[DevOps]在Windos10上使用Commend Prompt 指令壓縮/解壓縮檔案"
description: "Create a ZIP File on Windows 10 此命令僅適用於 Windows 10 或更高版 [&hellip;]"
pubDate: 2021-08-04
topic: software
series: mis
heroImage: /public/uploads/wp/6403.jpg
wpId: 6403
slug: windos10-commend-prompt-6403
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/08/04/%e5%9c%a8windos10%e4%b8%8a%e4%bd%bf%e7%94%a8commend-prompt-%e6%8c%87%e4%bb%a4%e5%a3%93%e7%b8%ae-%e8%a7%a3%e5%a3%93%e7%b8%ae%e6%aa%94%e6%a1%88/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/08/在Windos10上使用Commend-Prompt-指令壓縮解壓縮檔案-1024x576.jpg)

Create a ZIP File on Windows 10

此命令僅適用於 Windows 10 或更高版本。因為工作用到，特此記錄下來。

Windows 10 附帶一個名為tar的命令，可幫助在您的 PC 上創建或提取檔案。您可以使用此命令將現有文件添加到 ZIP 存檔中，在這裡我們將展示如何執行此操作：

使用命令提示字元壓縮檔案

- 在您的 PC 上打開命令提示符窗口。

- 使用cd命令轉到文件所在的文件夾。

- 在命令提示符窗口中輸入以下命令並按Enter 鍵。將output.zip替換為您要為 [ZIP 文件指定的名稱]，並將myfile.txt替換為[要添加到 ZIP 中的文件]。

- 命令提示符將在您當前的工作目錄中創建並保存 ZIP 存檔。

```
tar.exe -a -c -f output.zip myfile.txt
```

使用命令提示字元提取 ZIP 檔案

- 打開命令提示符窗口並cd到您的 ZIP 存檔所在的目錄。

- 鍵入以下命令，用您的[存檔的實際名稱]替換myarchive.zip，然後按 Enter。

- 命令提示符將在您當前的工作目錄中解壓縮您的存檔。

```
tar.exe -xf myarchive.zip
```

參考或引用資料：

6 Easy Ways to Create a ZIP File on Windows 10：[https://www.makeuseof.com/easy-ways-create-zip-file-windows-10/](https://www.makeuseof.com/easy-ways-create-zip-file-windows-10/)
