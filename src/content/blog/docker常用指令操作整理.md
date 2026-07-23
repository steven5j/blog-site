---
title: "[Docker]常用指令操作整理"
description: "環境與版本 作業系統：Window10 64x 版本：2004 產品版本：Docker Engine v 19 [&hellip;]"
pubDate: 2020-11-19
topic: software
series: mis
heroImage: /public/uploads/wp/5003.jpg
wpId: 5003
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/11/19/docker%e5%b8%b8%e7%94%a8%e6%8c%87%e4%bb%a4%e6%93%8d%e4%bd%9c%e6%95%b4%e7%90%86/"
---

環境與版本

作業系統：Window10 64x 版本：2004

產品版本：Docker Engine v 19.03.13

Docker的指令標準格式如下：

```
docker [選項] 指令 [參數1...] [參數2...] [參數n...]
```

docker：使用docker 指令前方都必須帶有docker 開頭。
[選項]：設定Docker本身執行環境的選項，屬於進階部分。
[指令]：Docker的指令集，重點。
[參數…]：伴隨指令集的參數。

所有的指令都是圍繞這幾個元件上!

基礎系統與Docker Hub指令

info

列出和系統相關的資訊，如映像檔數、Container數、檔案系統目錄、Linux核心版本，使用Linux版本、CPU及記憶體等。

```
[你的Email]: docker info
```

本機可不輸入email，直接執行。

version

列出目前Docker的版本，以及Go語言的版本等。

```
docker version
```

Docker Registry相關指令

login/logout

[前往註冊DockerHub帳號](https://hub.docker.com/)

```
docker login
```

```
Username:[你的帳號]
Password:[你的密碼]
Login Succeeded
```

如果你有自行架設私有的Docker映像檔資料庫，則輸入該資料庫的位址，如：

```
docker login 192.168.1.120:8080
```

一般如果在login/logout後方留空，則自動指向公有的docker hub

一般使用Docker的映像檔時，是完全不需要帳號密碼的，只有要上傳映像檔才需要。

search <image_keywords> <搜尋條件>

在Docker Hub找中尋找映像檔用的。最好用的就是 -s 參數，用來找評等較高(星級)的映像檔。

映像檔Image相關指令

docker images 

列出本機映像檔

-a：列出完整的映像檔層次資訊。每個映像檔是由不同層次組成的，我們會在稍後說明。
-q：只列出映像檔ID。這在做映像檔批次處理時很方便。
-tree：官方文件已經沒有這個參數，但還是可以用。列出映像檔不同層次之間的樹狀關係。

docker pull <registry>/<image>

下載映像檔

從Docker Hub下載映像檔，沒有加任何Registry的位址時，就預設從官方的Registry下載(registry.hub.docker.com)。

要將某一個倉庫的所有映像檔都下載回來，可使用-a參數。但這樣要小心，因為有可能會太大，下載需要很長時間。

docker save/load

將映像檔存入/匯出電腦檔案格式

docker rmi

刪除映像檔，這個指令刪除本機中存放的映像檔。但如果有容器還在使用這個映像檔，則無法刪除。如果硬要刪除，可以下-f參數強迫刪除。

docker tag

替本機映像檔加標籤名稱

docker build/hisotry

docker build指令可以從現成的映像檔為基礎，自行建立全新的映像檔，而docker history則會列出製作的每一步過程。

docker push

上傳映像檔，如果你自建立映像檔，可以上傳到官方/私有/非官方公開的Docker Registry上

Container容器相關指令

Container和映像檔之間的操作

- commit：將Container的改變存入映像檔

- export：將Container存成快照

- import：從Container快照恢復成映像檔

Container執行時的操作

- create：建立Container並執行指令

- run：同create，把 image 實體化，即以 image 為基礎創建一個容器（在上頭疊加暫時的容器存儲層，以及相關配置，如網路或 ip 位址等等），並執行指定的程序／命令。

- kill：刪除執行中的Container，但Container還是存在，只是死了。

- rm：刪除Container(停止或運行中都行)，Container就從這世上消失了

- pause：暫停執行中的Container，仍暫有記憶體，服務不中斷

- unpause：恢復暫停中的Container

- stop：停止執行中的Container，但不暫有記憶體，服務中斷

- start：啟動停止中的Container

- restart：重新啟動Container

- wait：讓Container暫停直到Container停止為止

- rename：更名Container

Container的狀態

- inspect：檢查Container的狀態(非常常用)

- stats：查看Container的CPU、記憶體及網路使用

- port：查看Container的通訊埠使用

- ps：查看Container使用狀態

- top：查看Container在主系統中的記憶體使用

- dip：查看Container的IP

- dpid：查看Container的pid

Container執行時的操作

- attach：連接Container的標準輸出輸入端

- exec：在外部向Container內執行指令

- denter：進入Container

- logs：將Container內的輸出顯示到螢幕上

Container和主系統之間的操作

- cp：複製Container內的檔案到主系統

- diff：列出兩個Container之間檔案系統差異

- events：列出某個時間點之前或之後的事件

參考資料：

全面易懂的Docker指令大全：[https://joshhu.gitbooks.io/dockercommands/content/](https://joshhu.gitbooks.io/dockercommands/content/)

【Day 2】Docker Image (映像檔) & Dockerfile：[https://www.coderbridge.com/series/fa1b91903cf2495abd0034c823387a62/posts/ce1b5751e23f4a148f389521b2c4acc8](https://www.coderbridge.com/series/fa1b91903cf2495abd0034c823387a62/posts/ce1b5751e23f4a148f389521b2c4acc8)
