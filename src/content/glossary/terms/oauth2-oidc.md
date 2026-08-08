---
title: "OAuth 2.0 & OpenID Connect (OIDC)"
last_updated: "2026-08-07"
author: "Systems Architect Agent & Information Security Specialist Agent"
---

# 🔑 OAuth 2.0 & OpenID Connect (OIDC) セキュリティ

## 1. 概要 (Overview)
**OAuth 2.0 (RFC 6749)** はサードパーティアプリケーションへサードパーティのリソースアクセス権限を安全に委任する「認可プロトコル」であり、**OpenID Connect (OIDC)** は OAuth 2.0 の上に ID トークン (JWT) の概念を追加した「認証プロトコル」である。

---

## 🎯 2. データ駆動 PKCE / state / nonce セキュリティ機構学習コンポーネント

<div id="oauth-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="oauth-container">データをロード中...</div>
    </div>
</div>

<script>
async function loadOAuthData() {
    try {
        const res = await fetch('../../../data/oauth_oidc_drills.json');
        if (!res.ok) throw new Error('oauth_oidc_drills.json ロード失敗');
        const data = await res.json();
        
        document.getElementById('oauth-container').innerHTML = `
            <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 1.25rem;">🛡️ ${data.title}</h4>
            ${data.securityMechanisms.map(m => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                    <div style="font-size: 1rem; color: #818cf8; font-weight: 700; margin-bottom: 0.4rem;">${m.feature}</div>
                    <div style="font-size: 0.88rem; color: #6ee7b7; font-weight: 600; margin-bottom: 0.4rem;">🎯 防御目的: ${m.purpose}</div>
                    <div style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.6;">${m.mechanism}</div>
                </div>
            `).join('')}
        `;
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', loadOAuthData);
</script>

---

## 3. 試験対策重要ポイント
- **PKCE (code_verifier / code_challenge)**: モバイルアプリ・SPA で必須となる認可コード奪取防御策。
- **state vs nonce**: state は CSRF 防止、nonce は ID トークンのリプレイ防止。
