---
title: "EDR (Endpoint Detection and Response) & XDR"
last_updated: "2026-08-07"
author: "Information Security Specialist Agent & Systems Architect Agent"
---

# 🕵️ EDR (Endpoint Detection and Response) & XDR

## 1. 概要 (Overview)
**EDR (Endpoint Detection and Response)** は、PC やサーバー等のエンドポイント上の動的挙動ログ（プロセス生成・レジストリ変更・ネットワーク接続）を常時監視し、侵入したマルウェアの検知・隔離・原因究明を行うセキュリティソリューションである。**XDR (Extended Detection and Response)** は EDR の監視領域をネットワーク、クラウド、メール、Identity に拡張統合したシステムである。

---

## 🎯 2. データ駆動 EDR / XDR プロセス解析ナビゲーター

<div id="edr-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="edr-container">データをロード中...</div>
    </div>
</div>

<script>
async function loadEDRData() {
    try {
        const res = await fetch('../../../data/edr_xdr_analysis.json');
        if (!res.ok) throw new Error('edr_xdr_analysis.json ロード失敗');
        const data = await res.json();
        
        document.getElementById('edr-container').innerHTML = `
            <h4 style="color: #f8fafc; margin-top: 0; margin-bottom: 1.25rem;">🔍 ${data.title}</h4>
            ${data.detectionPhases.map(p => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                    <div style="font-size: 1rem; color: #818cf8; font-weight: 700; margin-bottom: 0.4rem;">${p.phase}</div>
                    <div style="font-size: 0.88rem; color: #fca5a5; font-weight: 600; margin-bottom: 0.4rem;">🚨 検知インジケーター (IOC): ${p.indicator}</div>
                    <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.6rem 0.8rem; border-radius: 0 6px 6px 0; font-size: 0.88rem; color: #6ee7b7;">
                        🛡️ <strong>EDR/XDR 自動アクション:</strong> ${p.edrAction}
                    </div>
                </div>
            `).join('')}
        `;
    } catch (e) {
        console.error(e);
    }
}
document.addEventListener('DOMContentLoaded', loadEDRData);
</script>

---

## 3. 試験対策重要ポイント
- **EPP vs EDR**: EPP (Endpoint Protection Platform) は水際での侵入防止、EDR は侵入を前提とした検知・追跡・レスポンス。
