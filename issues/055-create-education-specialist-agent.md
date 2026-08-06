---
ID: 055
種別: Feature
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [FEAT] エデュケーション（ITSS教育スペシャリスト / EDU）エージェント (.agents/agents/education-specialist.agent.md) の作成および品質検証 (ID: 055)

## 1. 概要 / Summary
既存の専門家エージェント群（IR, DB, NW, SC等）の定義フォーマットおよびIPA「ITスキル標準 (ITSS V3 2011)」に準拠した**エデュケーションスペシャリスト（EDU）**エージェント (`.agents/agents/education-specialist.agent.md`) を新規追加する。
受講者のスキル診断 (Level 1〜7)、個別の研修ロードマップ策定、学習成果物・到達度アセスメント、および各分野専門エージェントへの個別指導エスカレーションを主導する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA ITスキル標準 研修ロードマップ (references/okf/itss_v3_2011_it_specialist_training_roadmap.md)](../references/okf/itss_v3_2011_it_specialist_training_roadmap.md)
- 関連資料: [.agents/agents/education-specialist.agent.md](../.agents/agents/education-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [education-specialist.agent.md](../.agents/agents/education-specialist.agent.md)
- [ ] [issues/README.md](README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/055-create-education-specialist-agent`

1. `education-specialist.agent.md` の新規作成、YAML Frontmatter、責務、委譲スキル、行動規範、応答プロトコル、初期応答メッセージの完全構築。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `.agents/agents/education-specialist.agent.md` が存在し、必須全セクションと相対パスルールが網羅されていること。
