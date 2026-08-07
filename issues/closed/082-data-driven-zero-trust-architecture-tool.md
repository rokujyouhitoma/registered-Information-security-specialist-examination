---
ID: 082
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動によるゼロトラスト・アーキテクチャ対話型学習ツールの開発と Web UI/UX 境界型 vs ゼロトラスト比較診断機能の実装 (ID: 082)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき、企画担当 (ST) 主導で選定された最重要課題として、NIST SP 800-207 ゼロトラスト・アーキテクチャの構造データを外部 JSON (`src/data/zero_trust_architecture.json`) に分離・構築し、受講者が従来の境界型セキュリティとの差異および PEP/PDP 構成を対話的に学べる Web UI/UX インタラクティブ学習画面 ([docs/glossary/terms/zero-trust.md](../docs/glossary/terms/zero-trust.md)) を開発・完了した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [.agents/skills/polish-issue/SKILL.md](../.agents/skills/polish-issue/SKILL.md)
- 関連資料: [docs/glossary/terms/zero-trust.md](../docs/glossary/terms/zero-trust.md)
- 関連資料: [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/zero_trust_architecture.json](../src/data/zero_trust_architecture.json) [NEW]
- [x] [docs/glossary/terms/zero-trust.md](../docs/glossary/terms/zero-trust.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: UIUX, NW / Review Gate 2 多段階推敲済み)
Target Branch: `feat/082-data-driven-zero-trust-architecture-tool`

1. **データ構造化 (SA & NW)**:
   - `src/data/zero_trust_architecture.json` に NIST SP 800-207 の 7 大原則および PEP/PDP/PA の仕様・境界型比較データを構築。

2. **Web インタラクティブ UI/UX の構築 (SA & UIUX)**:
   - `docs/glossary/terms/zero-trust.md` に境界型 vs ゼロトラストのトグル切り替えおよびコンポーネントカード表示 UI を組込み。

3. **品質管理 & 最終監査 (QA & AU)**:
   - `scripts/build_html_docs.py` でデプロイし `npm run build && npm test` が全件合格すること。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/zero_trust_architecture.json` が作成され 7 大原則と PEP/PDP 構成が定義されていること
- [x] `docs/glossary/terms/zero-trust.md` 上で比較切替 UI が正常動作すること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
