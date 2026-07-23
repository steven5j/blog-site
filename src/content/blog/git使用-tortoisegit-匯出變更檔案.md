---
title: "[Git]使用 TortoiseGit 只匯出在特定版本中新增或修改過的檔案"
description: "近期接大型專案，甲方要求每次更新的時候給予差異檔做更新，而不能一次給予全部的檔案，但是我們我們程式更新的幅度極 [&hellip;]"
pubDate: 2021-09-26
topic: software
series: mis
heroImage: /public/uploads/wp/6523.png
wpId: 6523
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/09/26/git%e4%bd%bf%e7%94%a8-tortoisegit-%e5%8c%af%e5%87%ba%e8%ae%8a%e6%9b%b4%e6%aa%94%e6%a1%88/"
---

近期接大型專案，甲方要求每次更新的時候給予差異檔做更新，而不能一次給予全部的檔案，但是我們我們程式更新的幅度極大，開發人員極少，很難一支一支抓出來做更新，這時候網路上搜尋到相關的技術與辦法，雖然有辦法可以使用Git語法進行，但是使用TortoiseGit 這個Git工具，更加的簡單容易，秉持著能利用工具就利用工具的精神😂 ，未來在教導夥伴同事的時候，使用工具教學較簡單方便。

視頻

一、至TortoiseGit 官網下載TortoiseGit

官方網站：[https://tortoisegit.org/](https://tortoisegit.org/)

不習慣英文的，在安裝完以後，可以安裝繁體中文外掛套件

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-1024x576.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-1.png)

二、點選Show log

在有.git的資料夾(專案資料夾)底下按下右鍵，選擇Show log

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-3.png)

 二、 任選「兩個版本」 

會列出所有 Revisions 紀錄，然後任選「兩個版本」後按右鍵選取 Compare revisions

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-6.png)

三、列出這兩個版本間的所有差異項目 並  匯出這些差異項目 

會出現 Changed Files 視窗，這裡會列出這兩個版本間的所有差異項目，透過滑鼠或按鍵盤 Ctrl + A 全選後按下右鍵選 Export selection to … 匯出這些差異項目。

右下方的View Patch，可以查看差異內容

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-8.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-9.png)

四、列出這兩個版本間的所有差異項目 並 匯出這些差異項目

會將檔案和資料夾依照原來位置放置。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-11.png)

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/09/image-10.png)

這個功能省了很多時間😃😃😃

參考或引用資料：

如何讓 Git 僅匯出在特定版本中新增或修改過的檔案：[https://blog.miniasp.com/post/2014/04/01/Git-Export-Only-Added-Modified-Files](https://blog.miniasp.com/post/2014/04/01/Git-Export-Only-Added-Modified-Files)
