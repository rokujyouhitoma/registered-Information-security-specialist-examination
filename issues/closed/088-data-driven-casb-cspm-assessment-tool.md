---
ID: 088
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による CASB / CSPM クラウドセキュリティ設定アセスメントツールの開発と Web UI/UX 導入 (ID: 088)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき選定された最重要課題として、CASB のシャドーIT監視・SaaSデータ保護および CSPM のクラウド設定ミス自動修正アセスメントデータを外部 JSON (`src/data/casb_cspm_assessment.json`) に構築し、[docs/glossary/terms/casb-cspm.md](../docs/glossary/terms/casb-cspm.md) に対話型学習 UI を導入・完成した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/glossary/terms/casb-cspm.md](../docs/glossary/terms/casb-cspm.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/casb_cspm_assessment.json](../src/data/casb_cspm_assessment.json) [NEW]
- [x] [docs/glossary/terms/casb-cspm.md](../docs/glossary/terms/casb-cspm.md) [NEW]
- [x] [mkdocs.yml](../mkdocs.yml)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: SA, UIUX)
Target Branch: `feat/088-data-driven-casb-cspm-assessment-tool`

1. `src/data/casb_cspm_assessment.json` の作成。
2. `docs/glossary/terms/casb-cspm.md` への対話型アセスメント UI の組み込み。
3. `mkdocs.yml` への追加。
4. `npm run build && npm test` の検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/casb_cspm_assessment.json` が定義されていること
- [x] `docs/glossary/terms/casb-cspm.md` 上で対話型 UI が正常動作すること
- [x] AU システム監査人適合判定、全自動テスト合格
