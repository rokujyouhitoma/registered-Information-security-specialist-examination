---
title: "ゼロトラスト・アーキテクチャ (Zero Trust Architecture)"
last_updated: "2026-08-01"
author: "Information Security Specialist Agent"
---

# 🛡️ ゼロトラスト・アーキテクチャ (Zero Trust Architecture)

## 1. 概要 (Overview)
**ゼロトラスト (Zero Trust)** とは、「社内ネットワーク境界の内側であっても無条件に信頼せず、すべてのアクセス要求を明示的に検証・認可する」という新しいセキュリティ設計コンセプトである。

従来の「境界型セキュリティ (Perimeter Security)」が「内側は安全、外側は危険」という前提に立っていたのに対し、ゼロトラストは「ネットワークは常に敵対的な環境であり、内部にも脅威が存在する」という前提（Assume Breach）に基づいている。

---

## 🎯 2. データ駆動 ゼロトラスト・アーキテクチャ 対話型学習コンポーネント

以下のコンポーネントでは、NIST SP 800-207 準拠の 7 大原則、主要コンポーネント (PEP/PDP)、および境界型セキュリティとの対比を動的に学習・診断できます。

<div id="zero-trust-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
            <button class="zt-tab-btn active" id="zt-tab-comparison" onclick="switchZTTab('comparison')">⚖️ 境界型 vs ゼロトラスト比較</button>
            <button class="zt-tab-btn" id="zt-tab-principles" onclick="switchZTTab('principles')">📜 NIST 7大原則</button>
            <button class="zt-tab-btn" id="zt-tab-components" onclick="switchZTTab('components')">🧩 PEP/PDP コンポーネント</button>
        </div>

        <div id="zt-content-area" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem;">
            データを読み込み中...
        </div>
    </div>
</div>

<style>
.zt-tab-btn {
    background: transparent;
    color: #94a3b8;
    border: none;
    border-bottom: 3px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}
.zt-tab-btn.active {
    color: #818cf8;
    border-bottom-color: #6366f1;
}
.zt-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 1.25rem;
    margin-bottom: 1rem;
}
.zt-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.4rem;
}
.zt-card-desc {
    font-size: 0.88rem;
    color: #cbd5e1;
    line-height: 1.6;
}
</style>

<script>
let ztData = null;

async function loadZeroTrustData() {
    try {
        const res = await fetch('../../../data/zero_trust_architecture.json');
        if (!res.ok) throw new Error('zero_trust_architecture.json のロードに失敗しました');
        ztData = await res.json();
        switchZTTab('comparison');
    } catch (err) {
        console.error('ZT load error:', err);
    }
}

function switchZTTab(tabName) {
    if (!ztData) return;
    document.querySelectorAll('.zt-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`zt-tab-${tabName}`).classList.add('active');

    const area = document.getElementById('zt-content-area');

    if (tabName === 'comparison') {
        area.innerHTML = `
            <h4 style="color: #f8fafc; margin-top:0; margin-bottom: 1rem;">⚖️ 従来の境界型 vs ゼロトラスト比較モデル</h4>
            ${ztData.comparison.map(c => `
                <div class="zt-card">
                    <div style="font-size: 0.85rem; color: #818cf8; font-weight: 700; margin-bottom: 0.3rem;">評価観点: ${c.aspect}</div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 250px; background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong style="color: #fca5a5; font-size: 0.85rem;">🔴 従来の境界型モデル:</strong>
                            <div style="color: #cbd5e1; font-size: 0.88rem; margin-top: 0.2rem;">${c.perimeter}</div>
                        </div>
                        <div style="flex: 1; min-width: 250px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong style="color: #6ee7b7; font-size: 0.85rem;">🟢 ゼロトラストモデル:</strong>
                            <div style="color: #cbd5e1; font-size: 0.88rem; margin-top: 0.2rem;">${c.zeroTrust}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    } else if (tabName === 'principles') {
        area.innerHTML = `
            <h4 style="color: #f8fafc; margin-top:0; margin-bottom: 1rem;">📜 NIST SP 800-207 基本原則抜粋</h4>
            ${ztData.principles.map(p => `
                <div class="zt-card">
                    <div class="zt-card-title">原則 ${p.id}: ${p.title}</div>
                    <div class="zt-card-desc">${p.detail}</div>
                </div>
            `).join('')}
        `;
    } else if (tabName === 'components') {
        area.innerHTML = `
            <h4 style="color: #f8fafc; margin-top:0; margin-bottom: 1rem;">🧩 PEP / PDP 主要アーキテクチャコンポーネント</h4>
            ${ztData.components.map(c => `
                <div class="zt-card">
                    <div class="zt-card-title" style="color: #818cf8;">${c.code}: ${c.name}</div>
                    <div class="zt-card-desc">${c.role}</div>
                </div>
            `).join('')}
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadZeroTrustData);
</script>

---

## 3. コンポーネント構成図 (Architecture Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー / デバイス
    participant PEP as Policy Enforcement Point (PEP)
    participant PDP as Policy Decision Point (PDP)
    participant Resource as 企業リソース / SaaS

    User->>PEP: リクエスト送信 (リソースアクセス要求)
    PEP->>PDP: 評価要求 (ユーザー属性・端末状態ログ送付)
    Note over PDP: Policy Engine (PE) による判定<br/>Policy Administrator (PA) による制御
    PDP-->>PEP: 評価結果 (許可 / 拒否 / 多要素認証要求)
    alt 評価判定：許可
        PEP->>Resource: セッション確立・通信通過
        Resource-->>User: レスポンス返却
    else 評価判定：拒否
        PEP-->>User: アクセス拒否 (403 Forbidden)
    end
```

---

## 4. 試験対策上の最重要チェックポイント (Exam Keypoints)

- **PEP / PDP の分離**: アクセス制御を決定する機能(PDP)と、実際に通信を遮断・許可する機能(PEP)が分離されていること。
- **暗号化と識別**: 通信路の完全暗号化（TLS 1.3）および、証明書（mTLS）等によるデバイスの確実な識別。
- **継続的評価**: 一度のログイン成功にとどまらず、アクセスごとに属性やセキュリティポスチャを継続評価（Continuous Evaluation）すること。
