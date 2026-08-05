---
ID: 039
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] JS コードの厳格モジュール化と JSDoc 型定義強化 (Phase 14) (ID: 039)

## 1. 概要 / Summary
単一ファイル `site/fm_index_engine.js` として存在していた全文検索エンジンコードを、関心の分離に従い `src/js/modules/` (Tokenizer, VectorScorer, EngineCore) へモジュール分割し、Google Closure Compiler の高度な型解析・最適化 (`--compilation_level ADVANCED_OPTIMIZATIONS` / JSDoc 注釈) に耐えうる設計へとリファクタリングする。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 14）
- yuzora リポジトリのドメインモジュール設計方針 (`src/js/modules/`)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/js/modules/tokenizer.js](../src/js/modules/tokenizer.js)
- [x] [src/js/modules/vector_scorer.js](../src/js/modules/vector_scorer.js)
- [x] [src/js/modules/fm_index_engine.js](../src/js/modules/fm_index_engine.js)
- [x] [Makefile](../Makefile)
- [x] [package.json](../package.json)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/039-refactor-js-modules-jsdoc`

1. **モジュール分割と JSDoc 注釈**:
   - `src/js/modules/tokenizer.js`: テキスト正規化と文字 N-gram / 単語分割。
   - `src/js/modules/vector_scorer.js`: TF-IDF ベクトル計算およびコサイン類似度スコアリング。
   - `src/js/modules/fm_index_engine.js`: インデックス非同期ロードおよび検索エントリポイント。
2. **ビルドパイプライン調整**:
   - `Makefile` および `package.json` で分割されたソースファイルを並べて Closure Compiler へ渡し `site/fm_index_engine.min.js` を生成。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/js/modules/` 配下にモジュール化された JS ファイルが配置され、JSDoc 型定義が付与されていること
- [x] `make build` および `npm test` が失敗なく全て成功すること
