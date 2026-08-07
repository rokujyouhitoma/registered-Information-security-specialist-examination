---
ID: 086
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による OAuth 2.0 / OIDC 認可フロー＆PKCE 脆弱性解析演習ツールの開発と Web UI/UX 導入 (ID: 086)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき選定された最重要課題として、OAuth 2.0 認可コードフロー、PKCE 拡張、および OpenID Connect ID トークン検証の演習データを外部 JSON (`src/data/oauth_oidc_drills.json`) に構築し、[docs/glossary/terms/oauth2-oidc.md](../docs/glossary/terms/oauth2-oidc.md) に対話型学習 UI を導入・完成した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/glossary/terms/oauth2-oidc.md](../docs/glossary/terms/oauth2-oidc.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/oauth_oidc_drills.json](../src/data/oauth_oidc_drills.json) [NEW]
- [x] [docs/glossary/terms/oauth2-oidc.md](../docs/glossary/terms/oauth2-oidc.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: SA, UIUX)
Target Branch: `feat/086-data-driven-oauth-oidc-pkce-tool`

1. `src/data/oauth_oidc_drills.json` の作成。
2. `docs/glossary/terms/oauth2-oidc.md` への対話型比較 UI の組み込み。
3. `npm run build && npm test` の検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/oauth_oidc_drills.json` が定義されていること
- [x] `docs/glossary/terms/oauth2-oidc.md` 上で対話型 UI が正常動作すること
- [x] AU システム監査人適合判定、全自動テスト合格
