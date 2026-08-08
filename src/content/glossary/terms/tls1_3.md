---
title: "TLS 1.3 トランスポート層セキュリティ"
last_updated: "2026-08-07"
author: "Network Specialist Agent & Systems Architect Agent"
---

# 🔒 TLS 1.3 トランスポート層セキュリティ

## 1. 概要 (Overview)
**TLS 1.3 (RFC 8446)** は、インターネット通信の暗号化プロトコル TLS の最新バージョンであり、接続遅延の削減 (1-RTT / 0-RTT) と静的 RSA や CBC モード等の脆弱な暗号方式の完全廃止（前方秘匿性の標準化）を実現した。

---

## 🎯 2. データ駆動 TLS 1.3 vs 1.2 ハンドシェイク比較ナビゲーター

<div id="tls-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="tls-container">データをロード中...</div>
    </div>
</div>

<script>
async function loadTLSData() {
    try {
        const res = await fetch('../../../data/tls_comparison.json');
        if (!res.ok) throw new Error('tls_comparison.json ロード失敗');
        const data = await res.json();
        
        document.getElementById('tls-container').innerHTML = `
            <h4 style="color: #f8fafc; margin-top: 0;">⚡ ハンドシェイク往復回数 (RTT) 比較</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                <div style="flex: 1; min-width: 250px; background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 1rem; border-radius: 0 8px 8px 0;">
                    <strong style="color: #fca5a5;">🔴 TLS 1.2 (2-RTT ハンドシェイク)</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: #cbd5e1; font-size: 0.88rem;">
                        ${data.handshakeSteps.tls12.map(s => `<li style="margin-bottom:0.3rem;">${s}</li>`).join('')}
                    </ul>
                </div>
                <div style="flex: 1; min-width: 250px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 1rem; border-radius: 0 8px 8px 0;">
                    <strong style="color: #6ee7b7;">🟢 TLS 1.3 (1-RTT / 0-RTT ハンドシェイク)</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: #cbd5e1; font-size: 0.88rem;">
                        ${data.handshakeSteps.tls13.map(s => `<li style="margin-bottom:0.3rem;">${s}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <h4 style="color: #f8fafc; margin-bottom: 0.5rem;">⛔ TLS 1.3 で完全に廃止された脆弱な機能</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${data.deprecatedFeatures.map(f => `<span style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 0.3rem 0.7rem; font-size: 0.82rem;">${f}</span>`).join('')}
            </div>
        `;
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', loadTLSData);
</script>

---

## 3. 試験対策重要ポイント
- **PFS (Perfect Forward Secrecy / 前方秘匿性)**: 過去の暗号通信がサーバーの秘密鍵漏洩によって一括解読されることを防ぐ。ECDHE (楕円曲線ディフィ・ヘルマン) 鍵交換が標準化。
