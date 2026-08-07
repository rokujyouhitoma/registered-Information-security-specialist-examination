---
ID: 066
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] UI/UX デザイナーエージェント (ui-ux-designer.agent.md) の作成および ST/PM 3段階厳格レビュー (ID: 066)

## 1. 概要 / Summary
`.agents/agents/` 配下に、最高品質の UI/UX デザイナーエージェント定義ファイル (`ui-ux-designer.agent.md`) を新規作成した。最も質の高い SC (セキュリティスペシャリスト) エージェントの構造・フォーマットを基準とし、UIデザイン原則、Web Design Aesthetics 規約、アクセシビリティ（WCAG 2.1）、モダンフロントエンド開発思想に準拠させた。ST (システムアーキテクト) および PM (プロジェクトマネージャー) による3段階の念入りなセルフレビューを経て完成させた。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/information-security-specialist.agent.md](../.agents/agents/information-security-specialist.agent.md)
- 関連資料: [.agents/agents/systems-architect.agent.md](../.agents/agents/systems-architect.agent.md)
- 関連資料: [.agents/agents/project-manager.agent.md](../.agents/agents/project-manager.agent.md)
- 関連資料: [project-docs/multi_agent_raci_matrix.md](../project-docs/multi_agent_raci_matrix.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/agents/ui-ux-designer.agent.md](../.agents/agents/ui-ux-designer.agent.md) [NEW]
- [x] [project-docs/agent_roles.md](../project-docs/agent_roles.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/066-create-ui-ux-designer-agent`

1. **SC エージェントを基準とした初案の作成**:
   - フロントマター (name, description)
   - UI/UX デザイナーとしての基本定義・責務
   - 利用可能なスキル・コマンドマッピング
   - 行動規範 (アクセシビリティ WCAG 2.1、デザインシステム遵守、Google/Apple 検索UI思想、マイクロインタラクション)
   - 機能ごとの詳細応答プロトコル (機能A: UIデザイン策定、機能B: UX分析、機能C: デザインシステム構築、機能D: アクセシビリティレビュー)

2. **ST (システムアーキテクト) & PM (プロジェクトマネージャー) による 3段階推敲レビュー**:
   - **Review Cycle 1 (構造・責務の厳格化)**: SC と同等の専門的定義、知識水準、期待技術水準の完全記載。
   - **Review Cycle 2 (スキル連携・デザインルール適合)**: `generate_image`, `mandatory-secure-web-skills`, Web Design Aesthetics 規約との連携強化。
   - **Review Cycle 3 (全体整合性・RACIマトリクス更新)**: マルチエージェント RACI マトリクス (`project-docs/agent_roles.md`) への UI/UX ロール追記。

3. **全自動検証と品質確認**:
   - `npm run build && npm test` での動作確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `ui-ux-designer.agent.md` が最高品質（SC エージェントと同等の詳細構造）で作成されていること
- [x] ST および PM による3段階のレビューを経て、責務・スキル・行動規範・プロトコルが洗練されていること
- [x] `project-docs/agent_roles.md` に UI/UX デザイナーの領域が反映されていること
- [x] `npm run build && npm test` が全件合格すること
