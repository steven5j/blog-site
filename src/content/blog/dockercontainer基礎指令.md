---
title: "[Docker]Container基礎指令"
description: "環境與版本 作業系統：Window10 64x 版本：2004 Docker Engine：v20.10.5 [&hellip;]"
pubDate: 2022-03-23
topic: software
series: mis
heroImage: /public/uploads/wp/7320.jpg
wpId: 7320
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/03/23/dockercontainer%e5%9f%ba%e7%a4%8e%e6%8c%87%e4%bb%a4/"
---

環境與版本

作業系統：Window10 64x 版本：2004

Docker Engine：v20.10.5

sonarqube：Version 8.8.0.42792

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/11/docker-1024x576.jpg)

Container 基礎指令

Container和映像檔Image之間的操作

commit將Container的改變存入映像檔

export將Container存成快照

import從Container快照恢復成映像檔

Container執行時的操作

create建立Container並執行指令

run同create，把 image 實體化，即以 image 為基礎創建一個容器（在上頭疊加暫時的容器存儲層，以及相關配置，如網路或 ip 位址等等），並執行指定的程序／命令。

kill刪除執行中的Container，但Container還是存在，只是死了。

rm刪除Container(停止或運行中都行)，Container就從這世上消失了

pause暫停執行中的Container，仍暫有記憶體，服務不中斷

unpause恢復暫停中的Container

stop停止執行中的Container，但不暫有記憶體，服務中斷

start啟動停止中的Container

restart重新啟動Container

wait讓Container暫停直到Container停止為止

rename更名Container

Container的狀態

inspect檢查Container的狀態(非常常用)

stats查看Container的CPU、記憶體及網路使用

port查看Container的通訊埠使用

ps查看Container使用狀態

top查看Container在主系統中的記憶體使用

Container執行時的操作

attach連接Container的標準輸出輸入端

exec在外部向Container內執行指令

denter進入Container

logs將Container內的輸出顯示到螢幕上

Container和主系統之間的操作

cp複製Container內的檔案到主系統

diff列出兩個Container之間檔案系統差異

events列出某個時間點之前或之後的事件

參考或引用資料

SonarQube學習（一）- 使用Docker安裝SonarQube（親測可用）：[https://iter01.com/575342.html](https://iter01.com/575342.html)

Container指令基礎：[https://joshhu.gitbooks.io/dockercommands/content/Containers/ContainersBasic.html](https://joshhu.gitbooks.io/dockercommands/content/Containers/ContainersBasic.html)

docker doc：[https://docs.docker.com/reference/](https://docs.docker.com/reference/)
