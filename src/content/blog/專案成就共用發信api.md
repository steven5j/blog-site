---
title: "[專案成就]共用發信API"
description: "開發共用 email 寄送 API 中介層，統一接口、格式與錯誤處理；技術棧為 C# .NET Core 與 AWS。"
pubDate: 2023-05-03
topic: software
series: portfolio
heroImage: /uploads/wp/email-api-hero.jpg
wpId: 7602
slug: api-7602
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2023/05/03/%e5%b0%88%e6%a1%88%e6%88%90%e5%b0%b1%e5%85%b1%e7%94%a8%e7%99%bc%e4%bf%a1api/"
tags:
  - C#
  - .NET Core
  - AWS
  - API
---

<figure class="post-figure">
  <img src="/uploads/wp/email-api-hero.jpg" alt="共用發信 API 架構示意" width="960" height="540" loading="eager" />
</figure>

## 專案概述

<div class="spec-table-wrap" tabindex="0">
<table class="spec-table">
  <thead>
    <tr>
      <th scope="col">項目</th>
      <th scope="col">說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">what</th>
      <td>
        <p>共用發信 API 是讓開發人員可以透過打 API 的方式寄出 email 信件的軟體中介層（Middleware）。</p>
      </td>
    </tr>
    <tr>
      <th scope="row">when</th>
      <td>
        <p><strong>開發時程</strong>：2023/01/03 – 2023/01/07</p>
      </td>
    </tr>
    <tr>
      <th scope="row">why</th>
      <td>
        <p>希望開發人員未來在進行 email 信件寄送時，可以有一個共同的接口、共同的格式、共同的錯誤例外處理。</p>
      </td>
    </tr>
    <tr>
      <th scope="row">how</th>
      <td>
        <p>專案 A 已有使用 AWS queue 的寄信功能，故把專案 A 的功能移植至專案 B 使用。</p>
        <ol>
          <li><strong>增加 API 接口層</strong>：依照 API Guideline 設計接口層。</li>
          <li><strong>整合信件種類</strong>：依照 Subject Naming Rule 與 Billing Send Mail Training Material 進行信件種類邏輯分類與整合。</li>
          <li>增加 log 訊息。</li>
          <li>讓 API 回傳 queue 是否收到的結果。</li>
        </ol>
      </td>
    </tr>
    <tr>
      <th scope="row">effect</th>
      <td>
        <ul>
          <li><strong>便捷：</strong>開發人員如需寄信，透過各語言自行打 API 即可，不必另外安裝 AWS 相關寄信套件。</li>
          <li><strong>統一格式接口：</strong>統一格式，開發較不易出錯，建立團隊發信共識；未來邏輯層或 AWS attribute 調整時，只需修改此區塊。</li>
          <li><strong>統一例外處理：</strong>錯誤 request 有卡控，並提供友善回覆方便 debug，避免錯誤傳遞到 AWS。</li>
          <li><strong>節省：</strong>相對各專案各自開發寄信功能，統一 API 可減少重工。</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
</div>

## 過程經歷

### 專案挑戰：跟原開發人員的關係

<div class="challenge-grid" role="list">
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Status</p>
    <p>原本開發專案 A 的開發人員個性比較暴躁，且面對男生較不想理會。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Task</p>
    <p>詢問專案 A 的開發人員，確認需求功能放置位置。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Action</p>
    <ol>
      <li>在該人員沒有在處理其他事情時，客氣詢問。</li>
      <li>對方給出資訊後，立刻查看專案 A 並自行思考。</li>
    </ol>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Result</p>
    <p>後來成功搬移所有相關系統功能。</p>
  </div>
  <div class="challenge-card challenge-card--wide" role="listitem">
    <p class="challenge-label">Think</p>
    <p>工程師團隊男性過多時，有時男工程師較不想面對男生無可厚非，但過於顯露對團隊運作不利。建議維持團隊性別平衡，或由主管／組長以適當方式點破並改善。</p>
  </div>
</div>

### 技術挑戰：共用 Function，使用方式不同

<div class="challenge-grid" role="list">
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Status</p>
    <p>專案 A 已有 AWS queue 寄信功能，要把已完成功能移植到專案 B 使用。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Task</p>
    <p>搬移時遇到部分 Function 功能相同，但使用方式不同。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Action</p>
    <p>將引用到的 function 調整成專案 B 的使用方式。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Result</p>
    <p>搬移成功，測試完成，可正確執行。</p>
  </div>
  <div class="challenge-card challenge-card--wide" role="listitem">
    <p class="challenge-label">Think</p>
    <p>做功能搬移時，除了語言一致，派工者也應先確認相關 Function／Library 是否相同。</p>
  </div>
</div>

### 技術挑戰：異步 Function 轉換為同步 Function

<div class="challenge-grid" role="list">
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Status</p>
    <p>移植專案 A 的 AWS queue 寄信功能時，原實作為非同步寫法。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Task</p>
    <p>將非同步功能轉為同步，以便取得 Queue 回應訊息。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Action</p>
    <p>接口層（Controller）使用 <code>Task.Wait</code>，等待 function 回傳後再繼續運行。</p>
  </div>
  <div class="challenge-card" role="listitem">
    <p class="challenge-label">Result</p>
    <p>修正完成。</p>
  </div>
  <div class="challenge-card challenge-card--wide" role="listitem">
    <p class="challenge-label">Think</p>
    <p>依照不同使用情境，選擇同步或異步轉換。</p>
  </div>
</div>
