---
ID: 084
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による TLS 1.3 vs 1.2 ハンドシェイク比較演習ツールの開発と Web UI/UX 導入 (ID: 084)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき選定された最重要課題として、TLS 1.3 (1-RTT, RSA廃止, 前方秘匿性) と TLS 1.2 のハンドシェイク手順・暗号スイート差分データを外部 JSON (`src/data/tls_comparison.json`) に構築し、[docs/glossary/terms/tls1_3.md](../docs/glossary/terms/tls1_3.md) に対話型学習 UI を導入・完成した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/glossary/terms/tls1_3.md](../docs/glossary/terms/tls1_3.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/tls_comparison.json](../src/data/tls_comparison.json) [NEW]
- [x] [docs/glossary/terms/tls1_3.md](../docs/glossary/terms/tls1_3.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: NW, UIUX)
Target Branch: `feat/084-data-driven-tls13-comparison-tool`

1. `src/data/tls_comparison.json` の作成。
2. `docs/glossary/terms/tls1_3.md` への対話型比較 UI の組み込み。
3. `npm run build && npm test` の検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/tls_comparison.json` が定義されていること
- [x] `docs/glossary/terms/tls1_3.md` 上で比較 UI が正常動作すること
- [x] AU システム監査人適合判定、全自動テスト合格
