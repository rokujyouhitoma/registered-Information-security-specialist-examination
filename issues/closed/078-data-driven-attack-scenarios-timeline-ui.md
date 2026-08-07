---
ID: 078
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動によるサイバー攻撃・解析シナリオ演習機能の開発と Web UI/UX タイムライン解析画面の導入 (ID: 078)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき全 13 エージェントの聞き取りを実施した結果選出された最重要課題として、サイバー攻撃の侵入・検知・対応のシミュレーションデータを外部 JSON (`src/data/attack_scenarios.json`) として非結合化し、受講者がブラウザ上で攻撃タイムラインと対策ポイントを視覚的かつ対話的に学べる Web UI/UX タイムライン解析演習画面 ([docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)) を構築した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)
- 関連資料: [project-docs/architecture/SYS-02-system_low_level_design.md](../project-docs/architecture/SYS-02-system_low_level_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/attack_scenarios.json](../src/data/attack_scenarios.json) [NEW]
- [x] [docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/078-data-driven-attack-scenarios-timeline-ui`

1. **攻撃シナリオ JSON データの作成 (ST, NW, DB, SC)**:
   - `src/data/attack_scenarios.json` を作成し、代表的インシデント（例: 標的型メールからの C2 通信 & 内部横展開、SQLi によるデータ漏洩）の時系列ステップと対策データを構築。

2. **Web インタラクティブタイムライン UI/UX の構築 (UIUX & EDU)**:
   - `docs/scenarios/attack_scenarios_analysis.md` にタイムラインステップナビゲーターおよび詳細解法アコーディオン UI を埋め込み。

3. **自動テスト・AU システム最終監査 (QA & AU)**:
   - `scripts/build_html_docs.py` による静的デプロイおよび全自動テスト (`npm run build && npm test`) の全件合格。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/attack_scenarios.json` が作成され複数攻撃シナリオが構造化されていること
- [x] `docs/scenarios/attack_scenarios_analysis.md` (➔ `site/scenarios/attack_scenarios_analysis.html`) 上でタイムライン演習 UI が正常に動作すること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
