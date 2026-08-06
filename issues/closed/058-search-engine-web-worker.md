---
ID: 058
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/PERF] 検索エンジンコア (CustomSearchEngine) の Web Worker 化による UI メインスレッド完全非同期化 (ID: 058)

## 1. 概要 / Summary
SA（システムアーキテクト）からの改善提案に基づき、クライアントサイド検索エンジン (`site/js/fm_index_engine.js`) のインデックスロード、転置インデックス構築、トークナイズ、および BM25 スコア計算処理をメイン UI スレッド（UI Looper）から分離し、**Web Worker (`site/js/search_worker.js`)** 上で完全に非同期並列実行させた。
これにより、大容量インデックスロード時および複雑な検索処理時における画面フリーズ (Jank) を完全排除した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/systems-architect.agent.md](../../.agents/agents/systems-architect.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../../site/js/fm_index_engine.js)
- 関連資料: [site/js/tokenizer.js](../../site/js/tokenizer.js)
- 関連資料: [site/index.html](../../site/index.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [search_worker.js](../../site/js/search_worker.js)
- [x] [index.html](../../site/index.html)
- [x] [fm_index_engine.js](../../site/js/fm_index_engine.js)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/058-search-engine-web-worker`

1. **`site/js/search_worker.js` の新規作成**:
   - `importScripts('tokenizer.js', 'vector_scorer.js', 'fm_index_engine.js')` による Worker 内でのモジュールロード。
   - Worker message ハンドラ (`INIT`, `SEARCH`) の実装。
2. **`site/index.html` への連携**:
   - Worker 連携およびフォールバック機構の整備。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `site/js/search_worker.js` が構築され、Worker 経由でのバックグラウンド非同期検索が完了すること。
- [x] 検索実行時に UI メインスレッドがブロッキングされないこと。
- [x] ユニットテストおよび相対パス検証が正常合格すること。
