---
ID: 087
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による EDR / XDR インシデントプロセス解析演習ツールの開発と Web UI/UX 導入 (ID: 087)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき選定された最重要課題として、EDR/XDR のプロセスツリー追跡・隔離アナリティクスデータを外部 JSON (`src/data/edr_xdr_analysis.json`) に構築し、[docs/glossary/terms/edr-xdr.md](../docs/glossary/terms/edr-xdr.md) に対話型学習 UI を導入・完成した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/glossary/terms/edr-xdr.md](../docs/glossary/terms/edr-xdr.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/edr_xdr_analysis.json](../src/data/edr_xdr_analysis.json) [NEW]
- [x] [docs/glossary/terms/edr-xdr.md](../docs/glossary/terms/edr-xdr.md) [NEW]
- [x] [mkdocs.yml](../mkdocs.yml)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: SC, UIUX)
Target Branch: `feat/087-data-driven-edr-xdr-analysis-tool`

1. `src/data/edr_xdr_analysis.json` の作成。
2. `docs/glossary/terms/edr-xdr.md` への対話型演習 UI の組み込み。
3. `mkdocs.yml` への追加。
4. `npm run build && npm test` の検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/edr_xdr_analysis.json` が定義されていること
- [x] `docs/glossary/terms/edr-xdr.md` 上で対話型 UI が正常動作すること
- [x] AU システム監査人適合判定、全自動テスト合格
