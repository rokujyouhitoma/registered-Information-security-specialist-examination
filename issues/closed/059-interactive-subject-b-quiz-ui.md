---
ID: 059
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/EDU] 科目B記述式 インタラクティブ解法＆自動採点演習 UI モーダルの実装 (ID: 059)

## 1. 概要 / Summary
EDU（エデュケーションスペシャリスト）からの改善提案（Priority 2）に基づき、静的な科目B問題集演習に加え、Webポータル (`site/index.html`) 上で受講者が解答を入力し、即座にキーワード判定・模範解答フィードバックが行われる**「科目B インタラクティブ解法＆自動採点演習 UI モーダル」**を新設した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/education-specialist.agent.md](../../.agents/agents/education-specialist.agent.md)
- 関連資料: [docs/scenarios/hands_on_incident_analysis.md](../../docs/scenarios/hands_on_incident_analysis.md)
- 関連資料: [site/index.html](../../site/index.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [index.html](../../site/index.html)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/059-interactive-subject-b-quiz-ui`

1. **ポータル画面 (`site/index.html`) への演習 UI カードおよびモーダルの追加**:
   - 科目Bインシデント解析演習（SQLi, IAM設定不備, プロンプトインジェクション）の回答入力フォーム。
   - 入力値に対するキーワード判定・思考プロセス解説表示ロジックの実装。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `site/index.html` に「科目B インタラクティブ演習」モーダルが構築され、解答入力と自動採点・フィードバックが機能すること。
- [x] 相対パス検証および既存テストが正常合格すること。
