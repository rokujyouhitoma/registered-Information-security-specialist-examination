---
ID: 054
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/PERF] 転置インデックス (Inverted Index) 構造の導入とトークナイザ最適化 (ID: 054)

## 1. 概要 / Summary
検索処理のレイテンシ削減とメモリ走査効率の極大化のため、従来の全文書配列走査 ($O(N_{docs})$) から、クエリトークンにヒットする文書のみを選択的にスコアリングする**転置インデックス (Inverted Index) 構造**を `CustomSearchEngine` へ導入した。
また、トークナイザにおける無駄な文字 Bigram 発生を抑制し、検索クエリに対する高速かつクリーンなマッチングを実現した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/it-specialist-information-retrieval.agent.md](../../.agents/agents/it-specialist-information-retrieval.agent.md)
- 関連資料: [.agents/agents/systems-architect.agent.md](../../.agents/agents/systems-architect.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../../site/js/fm_index_engine.js)
- 関連資料: [site/js/tokenizer.js](../../site/js/tokenizer.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [tokenizer.js](../../site/js/tokenizer.js)
- [x] [fm_index_engine.js](../../site/js/fm_index_engine.js)
- [x] [search_engine.test.js](../../tests/unit/search_engine.test.js)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/054-implement-inverted-index-and-tokenizer-opt`

1. **SA 主導 & IR 連携による転置インデックス構築**:
   - `CustomSearchEngine` の `loadIndex` 時に、`this.vectors` から動的に転置インデックス `this.invertedIndex` (`Object.create(null)`) を構築。
   - `invertedIndex[token] = [docId1, docId2, ...]` の転置リストを作成。
   - 検索実行時 (`search`) は、クエリトークンに対応する転置リストの候補文書に対象を絞って BM25 スコア計算を実行。
2. **ユニットテストの追加と速度検証**:
   - 転置インデックス構造の生成確認テストおよび高速検索テストを `tests/unit/search_engine.test.js` に追加し合格。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `CustomSearchEngine` 内部に転置インデックス (`invertedIndex`) が正常に構築されること。
- [x] 全文書走査ではなく、トークンヒットした該当文書のみを対象に高速スコア計算が行われていること。
- [x] 検索の精度・結果順位を落とさずにレスポンス性能が維持・向上すること。
- [x] ユニットテストがすべて正常に通過すること。
