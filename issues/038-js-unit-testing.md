---
ID: 038
種別: Feature
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [FEAT] JavaScript ユニットテスト自動化環境の構築と回帰テスト整備 (ID: 038)

## 1. 概要 / Summary
クライアントサイド検索エンジンコア (`site/js/fm_index_engine.js`)、トークナイザー (`site/js/tokenizer.js`)、コサイン類似度・BM25計算コア (`site/js/vector_scorer.js`) に対するJavaScriptユニットテスト自動化環境 (`node:test` モジュール) を構築・精緻化する。
コードリファクタリングや機能追加時における検索精度・動作回帰を自動検知する強固なテスト品質基盤を確立する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/software-quality-assurance-specialist.agent.md](../.agents/agents/software-quality-assurance-specialist.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../site/js/fm_index_engine.js)
- 関連資料: [site/js/tokenizer.js](../site/js/tokenizer.js)
- 関連資料: [site/js/vector_scorer.js](../site/js/vector_scorer.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [search_engine.test.js](../tests/unit/search_engine.test.js)
- [ ] [package.json](../package.json)
- [ ] [Makefile](../Makefile)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/038-js-unit-testing`

1. **テスト環境アーキテクチャ設計**:
   - Node.js 標準 `node:test` および `node:assert/strict` によるゼロ依存高速ユニットテスト環境の整備。
   - グローバルスコープ擬似化環境 (`global.window`) における ブラウザJS モジュールの正確なロード評価環境構築。
2. **検証テストケースの全面網羅**:
   - `Tokenizer.tokenize`: 英数字小文字化、記号除外、日本語単語抽出、Bigram分割、プロトタイプ汚染防御 (`__proto__` ガード)。
   - `VectorScorer.calculateCosineSimilarity`: ノルム計算、共通トークン積、直交ベクトルのスコアリング検証。
   - `CustomSearchEngine.search`: インデックスロード、BM25 スコア算出、転置インデックスヒット判定、完全一致ブースト、上限件数 (`topK`) スライス。
3. **CI / 自動化連携**:
   - `npm test` コマンドおよび `Makefile` (`make test`) からの自動起動スクリプト整備。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `node --test tests/unit/search_engine.test.js` が無エラー・ゼロ失敗で正常実行されること。
- [ ] トークナイズ、コサイン類似度、BM25スコア、プロトタイプ汚染対策、転置インデックス構築の全テストが通過すること。
- [ ] `npm test` で全テストが自動トリガーされること。
- [ ] ドキュメント・コード内のすべてのパスが相対パスルールに適合していること。
