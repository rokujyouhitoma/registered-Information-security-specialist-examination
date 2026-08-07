---
title: "公開鍵インフラストラクチャ (PKI: Public Key Infrastructure)"
last_updated: "2026-08-07"
author: "Information Security Specialist Agent & Systems Architect Agent"
---

# 🔑 公開鍵インフラストラクチャ (PKI) & 証明書失効検証

## 1. 概要 (Overview)
**PKI (Public Key Infrastructure)** は、公開鍵暗号方式とデジタル証明書（X.509）を用いて、通信相手の身元証明・改ざん検知・暗号化通信を実現するセキュリティ基盤構造である。

---

## 🎯 2. データ駆動 PKI 証明書失効検証 (CRL / OCSP / Stapling) 学習コンポーネント

<div id="pki-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="pki-container">データをロード中...</div>
    </div>
</div>

<script>
async function loadPKIData() {
    try {
        const res = await fetch('../../../data/pki_revocation.json');
        if (!res.ok) throw new Error('pki_revocation.json ロード失敗');
        const data = await res.json();
        
        document.getElementById('pki-container').innerHTML = `
            <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 1.25rem;">🔍 ${data.title}</h4>
            ${data.methods.map(m => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                        <span style="font-size: 1rem; color: #818cf8; font-weight: 700;">${m.name}</span>
                        <span style="background: rgba(99, 102, 241, 0.2); color: #c7d2fe; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem;">${m.type}</span>
                    </div>
                    <div style="font-size: 0.9rem; color: #f1f5f9; margin-bottom: 0.5rem; line-height: 1.6;">${m.mechanism}</div>
                    <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 0.5rem 0.8rem; border-radius: 0 6px 6px 0; font-size: 0.85rem; color: #fca5a5;">
                        ⚠️ <strong>課題・デメリット:</strong> ${m.drawback}
                    </div>
                </div>
            `).join('')}
        `;
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', loadPKIData);
</script>

---

## 3. 試験対策重要ポイント
- **ルートCAと中間CA**: ルート CA の秘密鍵はオフラインで厳重に保管され、日常の証明書発行業務は中間 CA に委任される。
- **OCSP Stapling**: パフォーマンス低下とプライバシー漏洩を防ぐ現代の標準失効検証技術。
