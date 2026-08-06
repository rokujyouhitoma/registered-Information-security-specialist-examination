---
ID: 060
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/IR] シノニム辞書拡張 (A) × 概念ベクトルセマンティック検索 (B) ハイブリッド検索エンジンの開発 (ID: 060)

## 1. 概要 / Summary
IR（情報検索）スペシャリストからの提案に基づき、単語の文字列完全一致（BM25）の限界を克服し、「ヤマハ」などのベンダー名・略称・表記揺れクエリから「ルーター」「VPN」「IPsec」などの関連技術ドキュメントを引き当てられる**ハイブリッド検索エンジン (Hybrid Search Engine)** を構築した。
アプローチ A (シノニム辞書クエリ拡張: `synonym_expander.js`) と アプローチ B (密概念ベクトル・セマンティック検索: `semantic_scorer.js`) を統合し、Web Worker (`search_worker.js`) 上で非同期実行させた。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/it-specialist-information-retrieval.agent.md](../../.agents/agents/it-specialist-information-retrieval.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../../site/js/fm_index_engine.js)
- 関連資料: [site/js/synonym_expander.js](../../site/js/synonym_expander.js)
- 関連資料: [site/js/semantic_scorer.js](../../site/js/semantic_scorer.js)
- 関連資料: [project-docs/system_high_level_design.md](../../project-docs/system_high_level_design.md)
- 関連資料: [project-docs/system_low_level_design.md](../../project-docs/system_low_level_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [synonym_expander.js](../../site/js/synonym_expander.js)
- [x] [semantic_scorer.js](../../site/js/semantic_scorer.js)
- [x] [search_worker.js](../../site/js/search_worker.js)
- [x] [fm_index_engine.js](../../site/js/fm_index_engine.js)
- [x] [search_engine.test.js](../../tests/unit/search_engine.test.js)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/060-implement-hybrid-synonym-semantic-search`

1. `site/js/synonym_expander.js` の新規構築 (ベンダー名・製品名から技術概念へのクエリ拡張)。
2. `site/js/semantic_scorer.js` の新規構築 (密概念ベクトル類似度算出)。
3. `fm_index_engine.js` および `search_worker.js` へのハイブリッド統合。
4. ユニットテストおよびトレーサビリティ検証の全自動チェック。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 「ヤマハ」クエリで「ルーター」「IPsec」「VPN」ドキュメントがスコア順上位にヒットすること。
- [x] `node --test tests/unit/search_engine.test.js` が無エラーで合格すること。
- [x] `python3 scripts/verify_traceability.py` による自動相対パス検証を通過すること。
