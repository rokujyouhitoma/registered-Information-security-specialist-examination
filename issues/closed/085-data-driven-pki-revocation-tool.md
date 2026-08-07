---
ID: 085
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による PKI 証明書失効検証 (CRL/OCSP/Stapling) 演習ツールの開発と Web UI/UX 導入 (ID: 085)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき選定された最重要課題として、PKI (公開鍵インフラ) の証明書失効検証方式（CRL, OCSP, OCSP Stapling）の仕組みとメリット・デメリットを外部 JSON (`src/data/pki_revocation.json`) に分離・構築し、[docs/glossary/terms/pki.md](../docs/glossary/terms/pki.md) に対話型学習 UI を導入・完成した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/glossary/terms/pki.md](../docs/glossary/terms/pki.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/pki_revocation.json](../src/data/pki_revocation.json) [NEW]
- [x] [docs/glossary/terms/pki.md](../docs/glossary/terms/pki.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: SC, UIUX)
Target Branch: `feat/085-data-driven-pki-revocation-tool`

1. `src/data/pki_revocation.json` の作成。
2. `docs/glossary/terms/pki.md` への対話型比較 UI の組み込み。
3. `npm run build && npm test` の検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/pki_revocation.json` が定義されていること
- [x] `docs/glossary/terms/pki.md` 上で比較 UI が正常動作すること
- [x] AU システム監査人適合判定、全自動テスト合格
