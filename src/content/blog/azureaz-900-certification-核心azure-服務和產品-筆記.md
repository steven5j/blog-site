---
title: "[Azure]AZ-900 Certification 核心Azure 服務和產品 筆記"
description: "Az-900 Certification 主要考驗的方向： 知道核心的幾項服務內容，且知道他們是做甚麼的，一些 [&hellip;]"
pubDate: 2022-06-27
topic: software
series: mis
heroImage: /public/uploads/wp/7377.jpg
wpId: 7377
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2022/06/27/azureaz-900-certification-%e6%a0%b8%e5%bf%83azure-%e6%9c%8d%e5%8b%99%e5%92%8c%e7%94%a2%e5%93%81-%e7%ad%86%e8%a8%98/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2022/06/Azure-Study-Note-1024x576.jpg)

Az-900 Certification 主要考驗的方向：

知道核心的幾項服務內容，且知道他們是做甚麼的，一些基礎的配置和一些基礎的限制、基礎架構

Azure所有服務：

[https://azure.microsoft.com/zh-tw/services/](https://azure.microsoft.com/zh-tw/services/)

Azure 主要核心服務

General一般功能服務(Azure產品頁未介紹)

[Resource Group(資源群組)](https://docs.microsoft.com/zh-tw/azure/azure-resource-manager/management/manage-resource-groups-portal)：資源群組是存放 Azure 方案相關資源的容器。 資源群組可以包含方案的所有資源，或只包含您要以群組方式管理的資源。

[Azure Marketplace](https://azuremarketplace.microsoft.com/zh-tw/marketplace/)：允許客戶查找、嘗試、購買和提供來自數百家領先服務提供商的應用程序和服務，這些服務提供商都已經認證在Azure上運行。

Azure 計算服務

[Azure Virtual Machines(azure 虛擬機)](https://azure.microsoft.com/zh-tw/services/virtual-machines/)：基礎架構及服務(IaaS)，用於在雲中創建和使用虛擬機。

[Azure Virtual Machine Scale Sets(虛擬機器擴展集)](https://azure.microsoft.com/zh-tw/services/virtual-machine-scale-sets/#overview)：專為自動縮放相同的虛擬機而設計。

[Azure App Service(Azure 應用服務)](https://azure.microsoft.com/zh-tw/services/app-service/)：平台及服務(Paas)，提供構建、部屬和擴展企業及Web、移動和API應用。

Azure 容器服務

[Azure Container instances(Azure 容器執行個體)](https://azure.microsoft.com/zh-tw/services/container-instances/)：允許您上傳容器的Paas產品，然後他將為您運行。

[Azure Kubernetes Service (AKS)](https://azure.microsoft.com/zh-tw/services/kubernetes-service/)：用於管理大量容器的容器協調器服務。

Azure 網路服務

[Virtual Network(Azure 虛擬網路)](https://azure.microsoft.com/zh-tw/services/virtual-network/)：在雲中創建和使用虛擬機的IaaS服務。

[Azure Load Balancing(負載均衡器)](https://azure.microsoft.com/zh-tw/products/azure-load-balancing/)：專為自動縮放相同虛擬機而設計，為流量工作負載取得負載平衡。

[VPN Gateway(VPN 閘道)](https://azure.microsoft.com/zh-tw/services/vpn-gateway/)：PaaS提供用於建構、部屬和擴展企業級數web、移動和API應用。

[Application Gateway(應用程式閘道)](https://azure.microsoft.com/zh-tw/services/application-gateway/)：第 7 層智慧型路由，安全、可靈活調整及具高可用性的 Web

[Azure Content Delivery Network(Azure 內容傳遞網路)](https://azure.microsoft.com/zh-tw/services/cdn/#overview)：基於事件創建基礎結構。

  

Azure 儲存服務

[Azure Blob Storage(Azure Blob 儲存體)](https://azure.microsoft.com/zh-tw/services/storage/blobs/)：Blob物件，對於可以容納的數據沒有限制。Blobs具有高度的可擴展性。

[Azure Disk Storage(Azure 磁碟儲存體)](https://azure.microsoft.com/zh-tw/services/storage/disks/)：用於 Azure 虛擬機器的高效能、高持久性區塊儲存體。

[Azure Files(Azure 檔案)](https://azure.microsoft.com/zh-tw/services/storage/files/)：無伺服器的企業級雲端檔案共用。

[Azure Archive Storage(Azure 封存儲存體)](https://azure.microsoft.com/zh-tw/services/storage/archive/)：

Azure 數據庫服務

[Azure Cosmos DB(Azure 宇宙數據庫)](https://azure.microsoft.com/zh-tw/services/cosmos-db/)：NoSQL 資料庫支援開放式 API 及任何規模。全球分布式數據庫，使您能夠靈活獨立擴展吞吐量和儲存。

[Azure SQL Database](https://azure.microsoft.com/zh-tw/products/azure-sql/database/#overview)：雲端打造、隨時更新、完全受控的關係資料庫服務。

[Azure Database Migration Service(Azure 資料庫移轉服務)](https://azure.microsoft.com/zh-tw/services/database-migration/)：完全託管的服務，在實現從多個數據庫源到Azure平台的吳鳳遷移，並將停機時間降至最低。

IOT物聯網

[Azure IoT Hub(Azure IoT 中心)](https://azure.microsoft.com/zh-tw/services/iot-hub/#overview)：託管在雲中的託管服務，做為物聯網應用程序與其管理的設備之間雙向通信的中心消息中心。

大數據和分析

[Data Lake Analytics](https://azure.microsoft.com/zh-tw/services/hdinsight/)：一種建樺大數據的案須分析作業服務，您可以編寫查詢來轉換數據並提取是有價值的見解，而不是部屬、配置和調整硬件。分散式分析服務讓巨量資料更容易上手。

[Azure HDInsight](https://azure.microsoft.com/zh-tw/services/hdinsight/)：面相企業的完全託管開源分析服務。佈建雲端 Hadoop、Spark、R Server、HBase 及 Storm 叢集。

人工智能

[Azure Machine Learning(Azure 機器學習服務)](https://azure.microsoft.com/zh-tw/services/machine-learning/)：提供基於雲的環境，用於開發、培訓、測試、部屬、管理和跟蹤機器學習模型。

無服務器計算

[Azure Function (Azure 功能)](https://azure.microsoft.com/zh-tw/services/functions/)：關注運行服務的代碼，而不是基礎平台或基礎結構。基於事件創建基礎結構。

[Azure Logic Apps](https://azure.microsoft.com/zh-tw/services/logic-apps/)：雲服務，可以幫助您在需要跨企業或組織集成應用、數據、系統和服務時自動執行任務、業務流程和工作流。

[Azure Event Grid(事件格線)](https://azure.microsoft.com/zh-tw/services/event-grid/)：一種託管的智能事件路由服務，他使用發布、訂閱模型來統一事件消耗，可靠的大規模事件傳遞。

DevOps：

[Azure DevOps](https://azure.microsoft.com/zh-tw/services/devops/)：提供開發協作工具，包括管道、Git儲存庫、看板以及廣泛的自動化和基於雲的負載測試。

[Azure DevTest Labs(Azure 開發測試實驗室)](https://azure.microsoft.com/zh-tw/services/devtest-lab/)：允許您在Azure中快速創建環境，同時最大限度地減少浪費並控制成本。

管理和治理 Management and governance：

[Azure Advisor(Azure 顧問)](https://azure.microsoft.com/zh-tw/services/advisor/)：Azure 最佳做法的免費個人化指南。可以提供高可用性、安全性、性能、成本的建議。

Reference：

AZ 900系列培训：[https://youtu.be/EJS3k-Cl9Mw](https://youtu.be/EJS3k-Cl9Mw)
