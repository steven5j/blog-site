---
title: "[Information Security資訊安全]SonarQube-Quality Profile(質量配置文件)掃描規則啟用與設定 簡介"
description: "環境與版本 作業系統：Window10 64x 版本：2004 Docker Engine：v20.10.5 [&hellip;]"
pubDate: 2021-07-11
topic: software
series: mis
wpId: 6293
slug: information-security-sonarqube-quality-profile-6293
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/07/11/information-security%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8sonarqube-quality-profile%e8%b3%aa%e9%87%8f%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6%e6%8e%83%e6%8f%8f%e8%a6%8f%e5%89%87%e5%95%9f%e7%94%a8/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/07/Information-Security資訊安全SonarQube-Quality-Profile質量配置文件掃描規則啟用與設定-簡介-1024x576.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

Docker Engine：v20.10.5

sonarqube：Version 8.8.0.42792

前言

Quality Profile質量配置文件是 SonarQube 的核心組件，因為它們是您定義規則集的地方，當違反這些規則時會在掃描你的專案時產生Bug訊息或是資安訊息。SonarQube內嵌了Sonar way的掃描規則，不同語言具有不同版本，比如C#/Java/Javascript等，預設從三個維度對規則進行劃分。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/06/image-1024x576.png)

大致可以處理的情況

在某些環境下可以容許特定的的規則通過。

經過討論以後，有部分資安狀況，是可以通過的。

覺得原本預設的規則配置不夠嚴謹，所以客製化的透過Quality Profile質量配置文件調整。

原本預設的掃描配置方式有誤，進行客製化修正。

大致介紹操作影片

功能概述

默認質量配置文件

每種語言都必須有一個默認的質量配置文件（用默認標籤標記）。

質量配置文件權限

默認情況下，只有具有管理質量配置文件權限的用戶才能編輯質量配置文件。

複製質量配置文件

當需要對內置配置文件進行一些更改時，先使用複製配置文件，然後對於新產生的配置文件做修改效果會很好。

擴展質量配置文件

許多或所有項目遵循一組通用規則時，擴展配置文件效果很好，

子配置文件繼承父配置文件的所有規則設置。如果規則在父配置文件中激活或停用，在子配置文件中一樣會激活或停用。

可以激活在父配置文件中停用壯代的子配置文件規則，但不能停用在父配置文件中處於激活狀態的子配置文件規則。

比較兩個質量配置文件

可以比較兩個質量配置文件之間的激活規則。

了解質量檔案中的變化

更改日誌，可以了解配置文件更改的紀錄。

在另一個 SonarQube 實例上使用質量配置文件

在不同一個電腦的SonarQube 上使用來自本電腦 SonarQube 的配置文件

避免棄用的規則

Rules頁面的 DEPRECATED 是配置文件的警告。

參考或引用資料

sonarqube基礎：掃描規則：2: Quality Profile的裁剪：[https://www.itread01.com/content/1541801583.html](https://www.itread01.com/content/1541801583.html)

sonarqube基礎：掃描規則：1: Sonar way之Java版：[https://www.itread01.com/content/1541801586.html](https://www.itread01.com/content/1541801586.html)

How to deactivate some Security Hotspots?：[https://community.sonarsource.com/t/how-to-deactivate-some-security-hotspots/39296](https://community.sonarsource.com/t/how-to-deactivate-some-security-hotspots/39296)

Quality Profiles：[https://docs.sonarqube.org/latest/instance-administration/quality-profiles/](https://docs.sonarqube.org/latest/instance-administration/quality-profiles/)
