---
ID: 081
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] agent-hearing-proposal スキルおよび PROC-02 におけるフェーズ別役割分担 (PM/ST/SA/指名スペシャリスト/QA/AU) の明記と再レビュー強化 (ID: 081)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルおよび `PROC-02-agent_roles.md` を改訂し、以下の明瞭なフェーズ別エージェント責任体制および `polish-issue` を含む多段階再レビュー（品質磨き上げサイクル）を厳格に規定した：
- **全体管理**: `PM` (プロジェクトマネージャー)
- **企画・提案選定**: `ST` (ITストラテジスト)
- **設計・実装**: `SA` (システムアーキテクト) および `SA` から指名された各スペシャリスト (SC, NW, DB, EP, SM, IR, EDU, UIUX)
- **品質管理 & 監査**: `QA` (ソフトウェア品質保証スペシャリスト) および `AU` (システム監査人)

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [.agents/skills/polish-issue/SKILL.md](../.agents/skills/polish-issue/SKILL.md)
- 関連資料: [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- [x] [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/081-define-agent-hearing-proposal-phase-roles`

1. **フェーズ別責任体制の組み込み**:
   - 「全体管理=PM」「企画・提案選定=ST」「設計・実装=SA & 指名スペシャリスト」「品質管理=QA & AU」の役割を `SKILL.md` および `PROC-02` に明記。

2. **`polish-issue` とステップ別再レビューサイクルの定義**:
   - 企画段階(ST/PM/SA)、Issue Polish段階(SA/指名スペシャリスト)、実装・品質検証段階(QA/AU) の 3 段階再レビュー（計3回以上の推敲）を標準フロー化。

3. **全自動ビルド・検証**:
   - `npm run build && npm test` の実行。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `SKILL.md` および `PROC-02-agent_roles.md` に各フェーズの担当エージェント役割が明確に規定されていること
- [x] `npm run build && npm test` が全件合格すること
