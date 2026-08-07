---
ID: 079
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] agent-hearing-proposal スキルへの多段階エージェント再レビュー＆polish-issue 品質磨き上げサイクルの組込み (ID: 079)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルを改訂し、Issue 起票時の `polish-issue` による徹底要件洗練に加え、企画提案・設計・実装・テストの各ステップにおいて専門エージェント群（PM, ST, AU, UIUX, QA等）による多段階再レビュー（計3回以上の推敲）を義務付ける品質磨き上げ（Quality Refinement Loop）仕様へ強化した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [.agents/skills/polish-issue/SKILL.md](../.agents/skills/polish-issue/SKILL.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/079-enhance-agent-hearing-proposal-quality-review-loop`

1. **`agent-hearing-proposal/SKILL.md` の品質磨き上げサイクル改訂**:
   - `polish-issue` スキルを使用した Issue 要件の徹底洗練（Polish）ステップを標準組み込み。
   - ステップごとに専門エージェント（ST, UIUX, QA, PM, AU）による再レビュー（Review Iteration）を行うフローを規定。

2. **全自動ビルド・検証**:
   - `npm run build && npm test` の実行。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `agent-hearing-proposal/SKILL.md` に `polish-issue` およびエージェント間再レビューサイクルが明確に定義されていること
- [x] `npm run build && npm test` が全件合格すること
