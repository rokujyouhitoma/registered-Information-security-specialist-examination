# [FEAT/IR] Web Worker 検索コア (search_worker.js) への FrontCodingCompressor 組み込みと圧縮統計メッセージング機能の拡張 (ID: 106)

## メタデータ

- **ID**: 106
- **種別**: Feature / Refactor
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: IR (`it-specialist-information-retrieval`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/106-integrate-string-compression-in-search-worker`

---

## 1. 概要 / Summary

IR (情報検索) および SA (システムアーキテクト) の共同設計に基づき、`src/js/search_worker.js` (Web Worker 検索エンジン) の `importScripts` に `string_compression.js` を追加して Front Coding 差分圧縮アルゴリズム (`FrontCodingCompressor`) を Worker スコープ内で完全有効化します。
また、Worker 初期化完了時の `READY` レスポンスメッセージに、転置インデックス語彙辞書の圧縮結果統計 (`compressStats`: `compressedCount`, `originalSize`, `compressedSize`, `ratio`) を追加・返却するメッセージング機能の拡張を実施します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `src/js/search_worker.js`**:
   - `importScripts` に `'string_compression.js'` を追加。
   - `_handleInitAction()` において `searchEngineInstance.compressTerms()` を呼び出し、`READY` メッセージに `compressStats` オブジェクトを含めて送信。
2. **[MODIFY] `tests/unit/search_engine.test.js`**:
   - `search_worker.js` のソースコードおよびメッセージハンドリングロジックに対するユニットテスト・依存関係アサーションを追加。
3. **[MODIFY] `site/js/search_worker.js` & `docs/js/search_worker.js`**:
   - `make build` (または静的アセット同期スクリプト `scripts/build_html_docs.py`) による配備・検証。

---

## 3. Threat Modeling & セキュア設計 / Security Requirements

- **Worker メッセージ安全ガード**: postMessage で送信されるレスポンスオブジェクトの各プロパティに対する型検証を維持し、プロトタイプ汚染や不正オブジェクトの逆シリアル化リスクを防ぐ。
- **リソース取得安全検証**: `_fetchJsonResource` におけるレスポンスチェックとエラーハンドリングの徹底。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`src/js/search_worker.js` の修正**:
   - `importScripts` の第 6 引数に `'string_compression.js'` を挿入:
     `importScripts('security_validator.js', 'tokenizer.js', 'vector_scorer.js', 'synonym_expander.js', 'semantic_scorer.js', 'string_compression.js', 'fm_index_engine.js');`
   - `_handleInitAction` 関数内でインデックス構築後に `const compressStats = searchEngineInstance.compressTerms();` を取得。
   - `self.postMessage({ status: 'READY', totalDocs: searchEngineInstance.docs.length, compressStats });` に拡張。

2. **`tests/unit/search_engine.test.js` のテスト拡張**:
   - `search_worker.js` 内で `string_compression.js` が正しい順序で `importScripts` に定義されているかのモジュールアサーションテストを追加。
   - `READY` メッセージ構造の正常性アサーションを追加。

3. **コンパイルと品質自動検証**:
   - `make build` を実行し、全アセットの同期および HTML ドキュメントビルドを確認。
   - `npm test` を実行し、100% テスト通過および循環的複雑度 (<= 10) を確認。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `src/js/search_worker.js` の `importScripts` に `string_compression.js` が含まれ、Worker 内で `FrontCodingCompressor` が利用可能であること。
- [x] Worker の `READY` メッセージに `compressStats` (`compressedCount`, `originalSize`, `compressedSize`, `ratio`) が含まれてメインスレッドに返却されること。
- [x] `tests/unit/search_engine.test.js` に Worker 構造アサーションテストが追加されパスすること。
- [x] `make build` によるアセット同期およびビルドが正常に完了すること。
- [x] `npm test` による全自動テストおよび循環的複雑度検証 (ADR-02: <=10) に 100% 合格すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA & IR)**: Web Worker スコープでのスクリプト非同期読み込み順序と `compressStats` メッセージペイロード構造を検証・設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 項目の検証を行い、適合判定【PASS】を付与。
