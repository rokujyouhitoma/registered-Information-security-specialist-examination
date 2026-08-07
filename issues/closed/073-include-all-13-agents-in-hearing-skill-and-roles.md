---
ID: 073
種別: Refactor
優先度: High
ステータス: Closed
---

# [FEAT/ENH] agent-hearing-proposal スキルおよび PROC-02 における全 13 スペシャリストエージェントの漏れなき網羅と定義改訂 (ID: 073)

## 1. 概要 / Summary
`.agents/agents/` 配下に存在する全 13 大スペシャリストエージェント（SC, NW, DB, ST, AU, QA, PM, STR, SM, EP, IR, EDU, UIUX）が漏れなくヒアリング対象・RACI マトリクスに含まれるよう、`.agents/skills/agent-hearing-proposal/SKILL.md` および `project-docs/processes/PROC-02-agent_roles.md` のコンテキスト・エージェント一覧を全面修正・統合改訂した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)
- 関連資料: [.agents/agents/](../.agents/agents/)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- [x] [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/073-include-all-13-agents-in-hearing-skill-and-roles`

1. **全 13 大エージェントの同定とリスト統合**:
   - `SC`, `NW`, `DB`, `ST`, `AU`, `QA`, `PM`, `STR`, `SM`, `EP`, `IR` (情報検索), `EDU` (教育指導), `UIUX` (UI/UXデザイナー) の 13 名を完全列挙。

2. **`agent-hearing-proposal/SKILL.md` の更新**:
   - ヒアリング対象、マトリクス例、テンプレートに 13 エージェント全員を漏れなく記述。

3. **`PROC-02-agent_roles.md` の更新**:
   - 13 大スペシャリストエージェント一覧および RACI 割当表に IR と EDU を追記し完全適合させる。

4. **自動テスト・検証**:
   - `npm run build && npm test` の合格および全ドキュメントリンクの健全性確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `agent-hearing-proposal/SKILL.md` に全 13 エージェントが漏れなく定義されていること
- [x] `PROC-02-agent_roles.md` に全 13 エージェントの概要と RACI が記載されていること
- [x] `npm run build && npm test` が全件合格すること
