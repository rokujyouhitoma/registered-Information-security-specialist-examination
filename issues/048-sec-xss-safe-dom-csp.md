---
ID: 048
種別: Security
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [SEC] XSS 防止 Safe DOM レンダリング・Strict CSP 設定および入力値サニタイズ (ID: 048)

## 1. 概要 / Summary
クライアントサイド JavaScript での HTML レンダリング処理における DOM ベース XSS 脆弱性を排除するため、`textContent` / `innerText` による Safe DOM レンダリングを導入し、Content Security Policy (CSP) をディレクティブレベルで厳格化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/information-security-specialist.agent.md](../.agents/agents/information-security-specialist.agent.md)
- 関連資料: [.agents/agents/network-specialist.agent.md](../.agents/agents/network-specialist.agent.md)
- 関連資料: [site/index.html](../site/index.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [index.html](../site/index.html)
- [ ] [fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `sec/048-sec-xss-safe-dom-csp`

1. **`innerHTML` 直代入の廃止**: `document.createElement` + `textContent` への完全リファクタリング。
2. **Strict CSP の適用**: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self';">` による通信境界・スクリプト保護。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `innerHTML` への動的入力直代入が排除され、安全な DOM 生成が行われること。
- [ ] XSS 攻撃用ペロード (`<script>alert(1)</script>`) を検索に入力してもスクリプトが発動しないこと。
