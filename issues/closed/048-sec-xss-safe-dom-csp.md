---
ID: 048
種別: Security
優先度: High
ステータス: Closed
---

# [SEC] XSS 防止 Safe DOM レンダリング・Strict CSP 設定および入力値サニタイズ (ID: 048)

## 1. 概要 / Summary
Web 検索ポータル (`site/search.html`, `site/compiled.html`, `site/index.html`) において、動的 HTML 生成時に使用されている `innerHTML` を DOM エスケープ済みの Safe DOM レンダリング構文へ置き換え、厳格な Content Security Policy (CSP) メタタグおよび URL パラメータサニタイズ処理を追加することで、クロスサイトスクリプティング (XSS) 脆弱性を根本的に排除する。

---

## 2. トレーサビリティ / Traceability
- [site/search.html](../site/search.html)
- [site/compiled.html](../site/compiled.html)
- [site/index.html](../site/index.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [site/search.html](../site/search.html)
- [x] [site/compiled.html](../site/compiled.html)
- [x] [site/index.html](../site/index.html)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `sec/048-sec-xss-safe-dom-csp`

1. **Safe DOM レンダリングへの置換**:
   - `innerHTML` 直代入を廃止し、`document.createElement` + `textContent` による安全なノード構築関数 `createCardNode()` を導入。
2. **Strict CSP の適用**:
   - `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">` を各 HTML に付与。
3. **URL パラメータのサニタイズ**:
   - `?q=` のパラメータ取得時に不適切な制御コードを除去するサニタイズ関数を通す。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `innerHTML` による不安全な動的描画が排除されていること
- [x] CSP メタタグが適切に配置され、`make build && npm test` が成功すること
