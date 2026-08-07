---
ID: 083
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による ISMS 2022年改訂 93管理策＆SoA インタラクティブ診断ツールの開発と Web UI/UX 導入 (ID: 083)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき、企画担当 (ST) 主導で選定された最重要課題として、ISO/IEC 27001:2022 (JIS Q 27001:2023) に準拠した 4 カテゴリ 93 管理策の構造データを外部 JSON (`src/data/isms_controls_2022.json`) に分離・構築し、受講者が SoA (適用宣言書) の管理策および新規 11 管理策を対話的にチェックできる Web UI/UX インタラクティブアセスメント画面 ([docs/glossary/terms/isms.md](../docs/glossary/terms/isms.md)) を開発・完了した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [.agents/skills/polish-issue/SKILL.md](../.agents/skills/polish-issue/SKILL.md)
- 関連資料: [docs/glossary/terms/isms.md](../docs/glossary/terms/isms.md)
- 関連資料: [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/isms_controls_2022.json](../src/data/isms_controls_2022.json) [NEW]
- [x] [docs/glossary/terms/isms.md](../docs/glossary/terms/isms.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (SA 指名: AU, UIUX / Review Gate 2 多段階推敲済み)
Target Branch: `feat/083-data-driven-isms-2022-controls-tool`

1. **データ構造化 (SA & AU)**:
   - `src/data/isms_controls_2022.json` に ISO/IEC 27001:2022 の 4 大カテゴリ（組織・人的・物理・技術）および新規 11 管理策データを構築。

2. **Web インタラクティブ UI/UX の構築 (SA & UIUX)**:
   - `docs/glossary/terms/isms.md` にカテゴリ別管理策の検索・閲覧および SoA アセスメント診断 UI を組込み。

3. **品質管理 & 最終監査 (QA & AU)**:
   - `scripts/build_html_docs.py` でデプロイし `npm run build && npm test` が全件合格すること。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/isms_controls_2022.json` が作成され 4 カテゴリ管理策が定義されていること
- [x] `docs/glossary/terms/isms.md` 上で ISMS アセスメント UI が正常動作すること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
