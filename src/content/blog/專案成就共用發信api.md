---
title: "[專案成就]共用發信API"
description: "專案概述： Subject Description what 共用發信API 是讓開發人員可以透過打API的方 [&hellip;]"
pubDate: 2023-05-03
topic: software
series: portfolio
wpId: 7602
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2023/05/03/%e5%b0%88%e6%a1%88%e6%88%90%e5%b0%b1%e5%85%b1%e7%94%a8%e7%99%bc%e4%bf%a1api/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2023/05/Untitled-Diagram-Page-3.jpg)

專案概述：

SubjectDescription

what共用發信API 是讓開發人員可以透過打API的方式寄出email信件的軟體中介層(Middleware)

when
開發時程，與預估啟用時程開發時程：2023/01/03-2023/01/07  

why 為什麼要發起這個專案
一開始的構想、假設是什麼希望開發人員未來在進行email信件寄送的時候，可以有一個共同的接口、共同的格式、共同的錯誤例外處理

how 執行策略是什麼在專案A已經有相關使用AWS queue的寄信功能，故把專案A的功能移植至專案B上面使用。
1.整合與開發增加API接口層：依照API Guideline 設計接口層
2.整合信件種類：依照Subject Naming Rule 和Billing Send Mail Training Material 進行信件種類邏輯分類和整合
3.增加log訊息。
4.讓API有回傳queue是否收到的結果

effect 短期、中期、長期的目標預設，一開始預設的便捷：開發人員如需要寄信，透過各語言自己打API即可，不用另外安裝AWS相關寄信套件。
統一格式接口：統一格式，開發較不會出錯，建立開發團隊有發信共識，未來邏輯層或AWS attribute如有整，只需要修改此區塊程式碼。
統一例外處理：打錯誤的request時，有相關卡控，並提共友善的回覆訊息方便開發人員進行debug。避免錯誤傳遞到AWS上面。
節省：相較於每個專案各自開發自己的寄信功能，統一API信件功能，可以節省開發人員的重工性開發。

過程經歷

專案挑戰：

跟原開發人員的關係

TypeDescription

Status原本開發專案A的開發人員個性比較暴躁，且面對男生較不想理會。

Task詢問專案A的開發人員，詢問需求功能放置位置。

Action1.在該人員，沒有在處理任何事情的時候，客氣的詢問專案A的開發人員。
2.該人員給出一些資訊訊息後，就立刻去查看專案A並自行思考一下。

Result後來成功搬移所有相關系統功能。

Think工程師因為團體男性過多，有時候男工程師只想面對女生無可厚非，但是過於顯露這樣的個性，對於團隊運作開發，其實並不利。建議還是團隊男女平衡為主，或是由主管組長點破此事(可用玩笑的方式)，希望改善。

技術挑戰：

共用Function，使用方式不同

TypeDescription

Status在專案A已經有相關使用AWS queue的寄信功能，故把專案A已經完成的功能移植至專案B上面使用。

Task從專案A開發的寄信功能搬移到專案B(此專案)時，遇到一些Function，功能是一樣地，但是使用方式不一樣。

Action將引用到的function調整成 專案B(此專案) 的使用方式。

Result搬移成功，測試完成，可正確執行。

Think在做專案功能搬移的時候，除了思考他們語言一致以外，如果是派工者，可以更加的思考到，使用的相關Function或是Library是否是同樣的。

異步Function轉換為同步Function

TypeDescription

Status在專案A已經有相關使用AWS queue的寄信功能，故把專案A已經完成的功能移植至專案B上面使用。但在A專案的時候，此功能是用非同步的方式撰寫。

Task原本A專案非同步的功能，轉換為同步，即可取得Queue的回應訊息。

Action接口介面層(Controller))使用 Task.Wait，等待function回傳以後再運行。

Result修正完成。

Think依照不同的使用形況，轉換同步與異步。
