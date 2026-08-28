---
title: "[版本控管VCS]-基礎概念，SVN、GIT比較"
description: "(圖片出處: Scriptcrunch) 當軟體開發到了某一個階段時，我們往往很難在短期間內就把整個專案完成， [&hellip;]"
pubDate: 2019-11-11
topic: software
series: mis
heroImage: /public/uploads/wp/3618.png
wpId: 3618
slug: vcs-svn-git-3618
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/11/11/%e7%89%88%e6%9c%ac%e6%8e%a7%e7%ae%a1vcs-%e5%9f%ba%e7%a4%8e%e6%a6%82%e5%bf%b5%ef%bc%8csvn%e3%80%81git%e6%af%94%e8%bc%83/"
---

![](https://lh3.googleusercontent.com/V9exmHpEijkovaIY6VfAJHyIjDdLRS85VKNTKYUaulVtjcjGd3enC1oPtmL_u3dkc3_mADi8z4tyxiDQmw1cnfkdNV80ddyR1qb-M4If1W0_p_pV5GT3ZqPVp6xLVZwqjTrhz1mGs_V0gUArdwM4QX8gRogO3NMYTb4XhG1Jvy4E9arFVkQcIJflQEh1czWy2Ux384Eo8LRa6yagzcl3Rw-jYSfrVZRjy380rmA-OfVivtbLNp-CgMZ-C1gYHIrirsZ1RtkpgTgNIi0ZQlOFFhBGF3Rd8-rVSplTfSXOjyxF9PlApZPy0zAswMBIMcOFFxF5ETPOKDoZMB63Pzw8QhGLo9-nOxZWmpmk-GPIkit_lNblRXUo90lus6Jv4AokRh7SG_Lb52fTDm8mrr9gpPWHC-hSCiU5VST0ZFZUFpcfIagtWVOrQ5S0WTUeqWIh9cDBX_EJFv5m8FpRKDw3YAv1jVQcy_S_bgWhzYyMhWpWRKOEUhgl_6K3VAAmbhvylfuMAVYAge_m0K1dOQyN27ia1cywDVC-ReaQlybCCEj6XzMVipWhzoIVvh7QaeLszQDB03NCASb_bk9r56TMLdjrAq0OPNjrl1PWPToyvXyPxGX54gwu-SZuTKIPSFw1bG5QuGe0jrZ-0b8bUAOmkaHV1JLRSI3xUsaJAM5FBv8BgrQwV7P-TNxObtm9rMKSr9T_JT9fpyBhSxlSZSAvvqlncJruI_r1_EdYxI8snZVRHywO=w840-h843-no)

(圖片出處: [Scriptcrunch](https://scriptcrunch.com/295/))

當軟體開發到了某一個階段時，我們往往很難在短期間內就把整個專案完成，這種時候，經常需要依賴「版本控制」幫助我們掌握修改的部分，尤其是當出現某些錯誤難以發現時，也能即時回復成之前一個正常版本。

版本控管系統（以下簡稱VCS）－稱的上是軟體品質相關的基礎建設裡面，最重要的一個。也是團隊開發、系統開發的基底，甚至只要是開發軟體系統，就應該採用版本控管。

VCS必備三元素

保留修訂記錄：開發人員要能輕易透過VCS取得先前的版本，復原與檢視歷史紀錄。

連結性：所有開發人員都必須能夠存取VCS，且VCS必須是存取Source Code的唯一途徑。如果有人需要取得最新版本的程式碼，必定得透過VCS。

不可分割的交易：倘若需一次修改多個檔案，則應將多個檔案視為不可分割的單元，也就是有交易的觀念。異動要嘛一次全都成功，要嘛全都失敗。否則可能導致版本錯亂。

版本控制種類

本地端版本控制

這種版本控制工具中最流行的是 rcs

![](https://lh3.googleusercontent.com/rKxbPUjrLal8qUFcxchhyqkSogwn-9vcOd37WUoepALkRExiz8QlTuJC4dE3bx_IsaRvIn9BWRXVeQa6noN376J6TIy6vCaTCOyL2tEM--8jLmuMF14HHsoKdJN6m1NNY09qoDiVPQdaV0ofgsON2ogGfC184eUJuhtl87cCAnQG54WHsPXUmgZtWJjjijh_wlBuPFBaarQXJWsXmGViTEtIyaFrEraJA8VIZTPlfssTV5RrLaOcJQI6CJzjH_e39_UYGXF3_kF_4UjadBUU79yR_Cp14yHRg9bXF3vqys4XAIl8YX2BI77ErDzsLMo8Peyn5YcJh8ceGQhdXTXQQGTX57DOOvvXyB6qn4ziEnTZj1k93oKVQZ_8vCLXDIaVqpzLGkugJ3qcBZ61Nbb1N8qCy_F4RISfYj816JgvOCtFS-8atVqTVtY_Rex06s1nBmSSAjdQHbdLkiExXAqvZAL3aJqN8vdZptUs4uPQLHAp5ZjJXmjteYuA4oZrrJbTfUmazGy8qhkAy1OhHia7HCFf-9G_-14b2dZPq-DxXBG3ZRcORmo4Ng92opBn1clKkUdjGoYwjGz-6e9zQjwHJIgQH-2MvH79LHJW2ix9kS4txSSEzVlJwqTwsbbbQGtghlCll_ymP8Unq1qtgWmmKcs_AIFSz-MRBzxXhekQ0CPELFCb9EzfYUibF3AiCThDt66JmEiGJMQ5MsLazWw4vbJwEFFu8tpmrjDt7f69YbCs-hnj=w400-h336-no)

集中式版本控制系統(Centralized Version Control Systems，簡稱CVCSs)

此系統，如：CVS, Subversion 及 Perforce 皆具備單一伺服器，記錄所有版本的檔案，且有多個客戶端從伺服器從伺服器取出檔案。

![](https://lh3.googleusercontent.com/s1erEpg87JoelNCSpIpsJ1GzV3tL6zIYilJLDUk0t0QpsOS4btA34yOvhSOO4oIoeRAf7IW2FpL3zzfa2s8BK_H-kN31Vj6bjufoqtggpC6tB7IyG5FGKFZkKox0tyj4BYecBfu0q-bYISkBlujU7BkPmC4r_atQJ3JRDhv6XADLOO5gLoel9hMMstle0fLtxuCYr56gGSKy0a-_5SRihkan-eHMNJpSt6Dij1WfGxwgTNWt0EmXLnAYAt9NeXSr19CEKFzWmAe4mr5vL86LtMlzmWOxoLxBPS_t8g7179U7xtJbNFWVNo2IP1wWj9QKMc_nK9ZwVljwxCDjmoVM2einYJwmMnT8wpIgMQpIyL_hUG6bJd85qrrw_2K4IFg94XfLFdfyWEQszUkHrvLfaHXoi4g-uCPo34L4KXprEYBeTke5saZrDB-k1fCQ_4ax1FCd41G9JZw6PQjHQ9HqmtlVv-g3b5_y2YBm0LTIKxCmbEw1f1IBDF2b1PxgLyvWDYyZQthciwLorMfRRmJzmxOp8YKYOXexwATSAr02BtBjzfRuBRTBHghCfTFlG5Z-uGW1KLFcTvJNL1vyWm4l9S1qKFkN1RqQ2XsgWxGmb7_mNg5eqdxJ_PE3eihFAyoLDgzmpGsiwBjF_ay3uBg7BFXX5TK4tsJDlKX-KCBfMSygoxTbUNYOrNboQoVIkPcd0EkF9UkXb_0AUyh56vU86Xb3bxxuLQDScZgLnMrl-B3RoYZ7=w500-h392-no)

分散式版本控制系統(Distributed Version Control Systems, 簡稱DVCSs) 

在分散式版本控制系統，諸如：Git, Mercurial, Bazaar、Darcs。 客戶端不只是取出最後一版的檔案，而是完整複製整個儲存庫。即使是整個系統賴以運作的電腦損毀，皆可將任何一個客戶端先前複製的資料還原到伺服器。

![](https://lh3.googleusercontent.com/GA5NU4ZEsGNjkpE2qLTxLx5v91JzwvGirhuPe0sC8ZsT0IGJJA5x7WSEepYvzSK8c391bSSbSHmJGj5vcqSpHaxUjHBVZsw6MuhS3Py4Nj_IwYObMNoIxPOCM5H_CP9Vw8LfNzrGm1TpaqPqubuSSb4aFGM1JLP56CcDDZOdYnYdKTRmI-xYUemXJNYgmzPWU8StpEfNjh55lWAxRHlx4A_dozfe1P3b_jzKAW1qDNyfziR0TKmAPr4FnncOUauStPdffiyKPdZxBNj5Ly-SqQOMPBJLTEcnmmEXHt1xrVC12ytMYt8ZF6zHmtBOSycdhkf-F92S0p7c2ZPcLIfdq3314ON_ToWekR5MM4aidqQroq9N03XwF1OXRkVAP46aE3qmIYhw1cps2Ubk7DBE9aBizY13VgdkdZ8JByvZ1undFMFzOy1I1MY9y_KJut1L7WjAuLhuCA2NRNs5p73sjBqeiCZcVpY8dB72p_HnGc47QvcCwD9EJSAu5ncZETMuQSmMZfD0txVY7PoOc_BGFLwgwXCe4_ZNAXon_UD3rLH5wYYkfei-gsnGkRFrugGsP9D2xP8cCazyLfsWRl33jzJFrwzBE4PYnlMx9mPBj0USzcaOb2LrhmYNHUEoBZt1L9wgUb-jOiY8YrNi2ZuFXZY2HMt-yKD2OBZbdjmUDvtHPVFYon5KQMAoJUBqJbuEjKJxXoM3toiZh4IjUEnrnHz_wnALlrrzYdYCHZOSUnY3q7Qf=w500-h563-no)

基本概念術語

以下的基本概念是屬於版控領域。

基線（Baseline）
 基線是軟體文件或原始碼（或其它產出物）的一個穩定版本，它是進一步開發的基礎。[1

檔案庫（Repository）
 版控系統中需要有一個存放檔案的地方，這個地方稱為 Repository ，在 Repository 中存放了整個專案的所有版本，Repository 在不同的版控系統中有不同的儲存方式（如檔案、資料庫），Repository 是整個版控最重要的地方，所有使用者都需要從 Repository 取得或更新檔案，因此選擇一個穩定安全的機器來存放 Repository 是必須的，Subversion 可以支援使用http://、https://、file:///、svn://、svn+ssh:// 多種通訊協定。

 工作區（WorkSpace）
 前文提到檔案庫中存放了所有的版本，但使用的實務上不可能需要全部的版本，因此我們會從檔案庫中取得需要的版本（通常是最新版）複製到自己的硬碟中，而這些存放於本機硬碟的檔案可稱為本機副本（Local copy）存放的地方稱為 Workspace 。

取得檔案（Checkout）
 開始一份工作的時候，工作區並不會有任何檔案，這時候就要選擇檔案庫中需要的專案來執行 Checkout ，版控軟體會從檔案庫中複製指定的版本（通常是選擇最新版）到你的工作區形成本機複本，這個本機複本與檔案庫的目錄結構是一樣的，用一個專案的角度來看只有第一次需要使用 Checkout 。

 送交檔案（Commit）
 當你在工作複本中完成了你的工作（比如寫好一個功能），就需要將你的變動 Commit 到檔案庫中，在 Subversion 中沒有 Commit 之前的異動其他成員都不會知道。（往後文章會提出適當的 Commit 時機）

更新檔案（Update）
 在多人使用的環境下，整個檔案庫的檔案是會同時被多人修改的， Subversion 並不會即時抓取這些異動，必須等到您使用了 Update 功能，版控軟體才會將檔案庫和你的差異更新至你的本機複本中，在 Subversion 中預設會檢查使用者在送交檔案之前該檔案有沒有被異動，如果有異動會強迫使用者先執行 Update 。

分支（Branch）
 利用分支的功能可以有效隔離主線，當開發程式時想重構、測試寫法、開發新功能，這些可能不會那麼快處理完畢，而且可能會造成現有功能影響的動作都應該在分支下執行，執行完畢確認後再合併主線就可以大幅降低在開發時期對主線的影響，往後對於分支還會再提，現階段只需要記住分支內你隨便玩都不會干擾別人。

合併（Merge）
 當兩個使用者修改了同一份檔案，在 Subversion 中是採取「樂觀鎖定」的作法，也就是並不會限制一份檔案只有一個使用者才可以修改，而是在更新檔案的時候才去檢查衝突，假設 工程師 A 異動了檔案中的 1～3 行，而工程師 B 使用者異動了檔案中的 5～10行，工程師 A 先行送交檔案，接者工程師 B 要送交的時候系統會發現版本不同而要求先執行更新檔案，檔案更新的過程中會偵測到兩個版本的異動並無衝突而自動合併（Merge）異動。

衝突（Conflict）
 基於以上案例如果工程師  B 異動了 3～10 行，這時候因為同時異動到了第 3 行所以版控軟體無法自動合併，就會發出 Conflict 警告，需要使用者自行解決衝突。（請注意發生衝突後越早解決對系統影響越小）

版次（Revision）
 一個revision或version指的是一系列版本變遷的其中之一

匯入（Import）

匯出（Export）

兩個常見的版本控管工具系統

SVN(集中式)

![](https://subversion.apache.org/images/svn-square.jpg)

SVN是Subversion的簡稱，是一個開放原始碼的版本控制系統。說得簡單一點SVN就是用於多個人共同開發同一個項目，共用資源的目的。

1.每個版本庫有唯一的URL（官方地址），每個使用者都從這個地址獲取程式碼和資料；

2.獲取程式碼的更新，也只能連線到這個唯一的版本庫，同步以取得最新資料；

3.提交必須有網路連線（非本地版本庫）；

4.提交需要授權，如果沒有許可權，提交會失敗；

5.提交併非每次都能夠成功。如果有其他人先於你提交，會提示“改動基於過時的版本，先更新再提交”；

6衝突解決是一個提交速度的競賽：手快者，先提交，平安無事；手慢者，後提交，可能衝突.（建議每次提交前update）

Git(分散式)

![](https://git-scm.com/images/logo@2x.png)

Git是一款免費、開源的分布式版本控制系統，用於敏捷高效地處理任何或小或大的項目。作為一個開源的分布式版本控制系統，可以有效、高速的處理從很小到非常大的項目版本管理。

分布式相比於集中式的最大區別在於開發者可以提交到本地，每個開發者通過克隆（git clone），在本地機器上拷貝一個完整的Git倉庫。

1.Git中每個克隆(clone)的版本庫都是平等的。你可以從任何一個版本庫的克隆來建立屬於你自己的版本庫，同時你的版本庫也可以作為源提供給他人。

2.Git的每一次提取操作，實際上都是一次對程式碼倉庫的完整備份。提交完全在本地完成，無須別人給你授權，你的版本庫你作主，並且提交總是會成功。

3.甚至基於舊版本的改動也可以成功提交，提交會基於舊的版本建立一個新的分支。

4.Git的提交不會被打斷，直到你的工作完全滿意了，PUSH給他人或者他人PULL你的版本庫，合併會發生在PULL和PUSH過程中，不能自動解決的衝突會提示您手工完成。

5.衝突解決不再像是SVN一樣的提交競賽，而是在需要的時候才進行合併和衝突解決。

SVN、GIT優缺點對比

SVN

優點： 
1、 管理方便，邏輯明確，符合一般人思維習慣。
2、 易於管理，集中式伺服器更能保證安全性。 3、 程式碼一致性非常高。
4、 適合開發人數不多的專案開發。 

缺點： 
1、 伺服器壓力太大，資料庫容量暴增。 
2、 如果不能連線到伺服器上，基本上不可以工作，看上面第二步，如果伺服器不能連線上，就不能提交，還原，對比等等。 
3、 不適合開源開發（開發人數非常非常多）。但是一般集中式管理的有非常明確的許可權管理機制（例如分支訪問限制），可以實現分層管理，從而很好的解決開發人數眾多的問題。

 Git

優點： 
1、適合分散式開發，強調個體。 
2、公共伺服器壓力和資料量都不會太大。 
3、速度快、靈活。 
4、任意兩個開發者之間可以很容易的解決衝突。 
5、離線工作。 

缺點： 
1、學習週期相對而言比較長。 
2、不符合常規思維。 
3、程式碼保密性差，一旦開發者把整個庫克隆下來就可以完全公開所有程式碼和版本資訊。 

圖形化工具

使用工具系統的話，通常會分伺服器端使用的圖形化工具和使用者端的圖形化工具。

工具使用範例：

 SVN

 Server端：VisualSvn,可安裝在Widows上
 Client端：TortoiseSVN 

 Git 

Server端：Ggitlab,可安裝在Centos7上
Client端：TortoiseGit、GitKraken

參考資料

版本控制工具 git與svn(分散式vs集中式):[https://www.itread01.com/content/1544858506.html](https://www.itread01.com/content/1544858506.html)

[軟體工程]版本控管的重要概念：[https://dotblogs.com.tw/hatelove/2011/12/13/concept-of-version-control-system](https://dotblogs.com.tw/hatelove/2011/12/13/concept-of-version-control-system)

 開始 – 關於版本控制：[https://git-scm.com/book/zh-tw/v1/%E9%96%8B%E5%A7%8B-%E9%97%9C%E6%96%BC%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6](https://git-scm.com/book/zh-tw/v1/%E9%96%8B%E5%A7%8B-%E9%97%9C%E6%96%BC%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
