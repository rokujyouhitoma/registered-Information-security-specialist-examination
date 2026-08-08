---
title: "CASB & CSPM (クラウドセキュリティ管理)"
last_updated: "2026-08-07"
author: "Systems Architect Agent & Information Security Specialist Agent"
---

# ☁️ CASB & CSPM (クラウドセキュリティ管理)

## 1. 概要 (Overview)
クラウド利活用の急拡大に伴い、従業員の未承認 SaaS 利用 (シャドーIT) や IaaS 設定ミスによる情報漏洩事故を防止するため、**CASB (Cloud Access Security Broker)** と **CSPM (Cloud Security Posture Management)** の導入が不可欠となっている。

---

## 🎯 2. データ駆動 CASB / CSPM 評価基準ナビゲーター

<div id="casb-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="casb-container">データをロード中...</div>
    </div>
</div>

<script>
async function loadCASBData() {
    try {
        const res = await fetch('../../../data/casb_cspm_assessment.json');
        if (!res.ok) throw new Error('casb_cspm_assessment.json ロード失敗');
        const data = await res.json();
        
        document.getElementById('casb-container').innerHTML = `
            <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 1.25rem;">☁️ ${data.title}</h4>
            ${data.solutions.map(s => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                    <div style="font-size: 1rem; color: #818cf8; font-weight: 700; margin-bottom: 0.3rem;">${s.name}</div>
                    <div style="font-size: 0.88rem; color: #6ee7b7; font-weight: 600; margin-bottom: 0.5rem;">🎯 重点領域: ${s.focus}</div>
                    <ul style="margin: 0; padding-left: 1.2rem; color: #cbd5e1; font-size: 0.88rem; line-height: 1.6;">
                        ${s.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', loadCASBData);
</script>

---

## 3. 試験対策重要ポイント
- **責任共有モデル (Shared Responsibility Model)**: SaaS/PaaS/IaaS におけるクラウド事業者と利用者のセキュリティ責任境界を明確化。
