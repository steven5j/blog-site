---
title: "[Information Security資訊安全]SonarQube源碼掃描.NET 專案"
description: "環境與版本 作業系統：Window10 64x 版本：2004 Docker Engine：v20.10.5 [&hellip;]"
pubDate: 2021-05-05
topic: software
series: mis
heroImage: /public/uploads/wp/6162.jpg
wpId: 6162
slug: information-security-sonarqube-net-6162
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/05/05/information-security%e8%b3%87%e8%a8%8a%e5%ae%89%e5%85%a8sonarqube%e6%ba%90%e7%a2%bc%e6%8e%83%e6%8f%8f-net-%e5%b0%88%e6%a1%88/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/05/Information-Security資訊安全SonarQube源碼掃描.NET-專案-1024x576.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

Docker Engine：v20.10.5

sonarqube：Version 8.8.0.42792

使用SonarScanner for .NET

使用MSBuild或dotnet命令作為構建工具來啟動項目/解決方案的分析。

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/05/image-2.png)

先決條件

- 至少您的SonarQube服務器支持的最低Java版本

- 與您的構建系統相對應的SDK

將相關環境配置路徑，配置於 PATH環境變量

NET CORE專案掃描

專案版本：NET Core 3.1

模式：.NET MVC

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/05/image-1024x554.png)

.NET Core和.NET Core全局工具

基於.NET Core：

```
dotnet tool install --global dotnet-sonarscanner
dotnet sonarscanner begin /k:"project-key"  /d:sonar.login="myAuthenticationToken"
dotnet build <path to solution.sln>
dotnet sonarscanner end /d:sonar.login="myAuthenticationToken"
```

NET Framework 專案掃描

版本：.NET Framework 4.7.2  

模式：.NET WebForm

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/05/image-1-1024x554.png)

“經典” .NET Framework

基於“經典” .NET Framework。要使用它，請從項目的根文件夾中執行以下命令

```
SonarScanner.MSBuild.exe begin /k:"project-key" /d:sonar.login="myAuthenticationToken" 
MSBuild.exe <path to solution.sln> /t:Rebuild
SonarScanner.MSBuild.exe end /d:sonar.login="myAuthenticationToken"
```

問題排除：

注意PATH的路徑

注意需要下載SonarScanner for .NET

掃描檔案 排除部分檔案內容：

最簡單的方法是在啓動服務器（localhost：9000）後轉到服務器URL，然後以管理員身份登錄，轉到設置>排除>源文件排除 – 在此處添加文件路徑。 重新啓動掃描服務器。

參考或引用資料：

⭐MS-Build 2017「Microsoft.WebApplication.targets」缺失：[http://hk.uwenku.com/question/p-fvuuiken-ck.html](http://hk.uwenku.com/question/p-fvuuiken-ck.html)

一次解決MSBuild遺失Web Application.targets的方法：[https://blog.gss.com.tw/index.php/2019/05/23/fix-web-application-targets/](https://blog.gss.com.tw/index.php/2019/05/23/fix-web-application-targets/)

Asp.Net&.Net Core 使用 SonarQube 踩坑记 (使用 MSBuild扫描器篇)：[https://blog.csdn.net/weixin_44763552/article/details/105437129](https://blog.csdn.net/weixin_44763552/article/details/105437129)

SonarScanner for .NET：[https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/)

SonarQube排除目录：[https://qastack.cn/programming/21323276/sonarqube-exclude-a-directory](https://qastack.cn/programming/21323276/sonarqube-exclude-a-directory)
