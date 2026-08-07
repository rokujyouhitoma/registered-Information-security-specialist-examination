---
title: "ISMS (情報セキュリティマネジメントシステム) & ISO/IEC 27001:2022"
last_updated: "2026-08-07"
author: "Systems Architect & Systems Auditor Agents"
---

# 🏢 ISMS (情報セキュリティマネジメントシステム) & ISO/IEC 27001:2022

## 1. 概要 (Overview)
**ISMS (Information Security Management System)** とは、組織が保護すべき情報資産の「機密性 (C)」「完全性 (I)」「可用性 (A)」をバランスよく維持し、リスクを適切に管理するための体系的な仕組みである。

2022年に改訂された **ISO/IEC 27001:2022 (JIS Q 27001:2023)** では、従来の 114 管理策から **93 管理策** へと整理再編され、**11 の新規管理策**（クラウド利用、脅威インテリジェンス、DLP、Webフィルタリング等）が追加された。

---

## 🎯 2. データ駆動 ISMS 2022 管理策 & SoA (適用宣言書) セルフアセスメント

以下のコンポーネントでは、2022年改訂の 4 大カテゴリ管理策および新規 11 管理策の適用要件と SoA チェックポイントをインタラクティブに学習・確認できます。

<div id="isms-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;" id="isms-cat-tabs"></div>

        <div id="isms-controls-container" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem;">
            データをロード中...
        </div>
    </div>
</div>

<style>
.isms-tab {
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0.4rem 1rem;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}
.isms-tab.active {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    border-color: #818cf8;
}
.isms-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 1.25rem;
    margin-bottom: 1rem;
}
.badge-new {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.4);
    border-radius: 12px;
    padding: 0.15rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    margin-left: 0.5rem;
}
</style>

<script>
let ismsData = [];
let currentCatIdx = 0;

async function loadISMSData() {
    try {
        const res = await fetch('../../../data/isms_controls_2022.json');
        if (!res.ok) throw new Error('isms_controls_2022.json のロードに失敗しました');
        ismsData = await res.json();
        renderCatTabs();
        renderCatControls();
    } catch (err) {
        console.error('ISMS load error:', err);
    }
}

function renderCatTabs() {
    const tabsArea = document.getElementById('isms-cat-tabs');
    tabsArea.innerHTML = ismsData.map((cat, idx) => `
        <button class="isms-tab ${idx === currentCatIdx ? 'active' : ''}" onclick="selectISMSCat(${idx})">
            ${cat.categoryCode} ${cat.categoryName.split(' ')[0]}
        </button>
    `).join('');
}

function selectISMSCat(idx) {
    currentCatIdx = idx;
    renderCatTabs();
    renderCatControls();
}

function renderCatControls() {
    if (!ismsData || ismsData.length === 0) return;
    const cat = ismsData[currentCatIdx];
    const container = document.getElementById('isms-controls-container');

    container.innerHTML = `
        <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 1.25rem;">📋 ${cat.categoryName}</h4>
        ${cat.controls.map(ctrl => `
            <div class="isms-card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 1rem; color: #f1f5f9; font-weight: 700;">
                        ${ctrl.id} ${ctrl.title}
                        ${ctrl.isNew2022 ? '<span class="badge-new">✨ 2022新規管理策</span>' : ''}
                    </span>
                </div>
                <div style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 0.75rem;">
                    ${ctrl.summary}
                </div>
                <div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 0.6rem 0.8rem; border-radius: 0 6px 6px 0; font-size: 0.85rem; color: #c7d2fe;">
                    <strong>🔍 SoA (適用宣言書) アセスメント着眼点:</strong> ${ctrl.soaKeypoint}
                </div>
            </div>
        `).join('')}
    `;
}

document.addEventListener('DOMContentLoaded', loadISMSData);
</script>

---

## 3. ISO/IEC 27001 認証取得・運用の PDCA サイクル

```mermaid
graph TD
    P["Plan: ISMSの確立・基本方針決定・リスクアセスメント"] --> D["Do: 93管理策の導入・SoA作成・教育訓練"]
    D --> C["Check: 内部監査・マネジメントレビュー・ログ自己点検"]
    C --> A["Act: 是正処置・継続的改善"]
    A --> P
```

---

## 4. 試験対策チェックポイント (Exam Keypoints)

- **SoA (Statement of Applicability / 適用宣言書)**: 採択した管理策と排除した理由、およびその適用状況を明記した文書。
- **リスクアセスメントと管理目的**: リスクの特定・分析・評価を行い、対応する管理策を適用する。
- **2022年改訂 4 大カテゴリ**: 組織的 (A.5)、人的 (A.6)、物理的 (A.7)、技術的 (A.8)。
