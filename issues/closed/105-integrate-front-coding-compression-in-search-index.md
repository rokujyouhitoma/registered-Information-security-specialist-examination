# [FEAT/IR] FrontCodingCompressor の CustomSearchEngine への高度統合と検索インデックス語彙辞書前形差分圧縮機能の実装 (ID: 105)

## メタデータ

- **ID**: 105
- **種別**: Feature / Refactor
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: IR (`it-specialist-information-retrieval`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/105-integrate-front-coding-compression-in-search-index`

---

## 1. 概要 / Summary

IR (情報検索) および SA (システムアーキテクト) の共同設計に基づき、`src/js/string_compression.js` 内の `FrontCodingCompressor` (前形差分圧縮アルゴリズム) を `src/js/fm_index_engine.js` (`CustomSearchEngine`) へ高度統合します。
これにより、転置インデックスの語彙辞書（全トークン集合）を Front Coding 圧縮してメモリ保持・計算可能にし、検索エンジンのメモリフットプリント削減と FM-Index 圧縮全文索引との統合基盤を完成させます。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `src/js/fm_index_engine.js`**:
   - `CustomSearchEngine` クラスに `FrontCodingCompressor` を活用した `compressTerms()` および `getDecompressedTerms()` メソッドを追加。
   - 転置インデックス語彙辞書の前形差分圧縮状態保持・解凍データアクセスおよび JSDoc 型定義の追加。
2. **[MODIFY] `tests/unit/search_engine.test.js`**:
   - `FrontCodingCompressor` 統合および `compressTerms()` / `getDecompressedTerms()` の機能・動作検証ユニットテストを追加。
3. **[MODIFY] `site/fm_index_engine.min.js`**:
   - Closure Compiler (`make build`) 最厳格設定による再コンパイル成果物の更新。

---

## 3. Threat Modeling & セキュア設計 / Security Requirements

- **プロトタイプ汚染防御**: 圧縮データから復元されたトークン文字に対して `SecurityValidator.isSafeKey` (または `CustomSearchEngine.isSafeKey`) を適用し、`__proto__`, `prototype`, `constructor` 等の有害プロパティの注入を防止。
- **入力値検証・境界チェック**: 圧縮データ構造の各要素 (`prefixLen`, `suffix`) に対する型チェックおよび型安全なフォールバック処理を徹底。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`src/js/fm_index_engine.js` の機能拡張**:
   - `CustomSearchEngine` に `compressedTerms` プロパティ（`!Array<{prefixLen: number, suffix: string}>`）を追加。
   - `compressTerms()` メソッドの実装: 転置インデックスの全キー (トークン) をソートし、`FrontCodingCompressor.compress()` を呼び出して `compressedTerms` に格納。元のキー数、圧縮後バイト数、圧縮率を返却。
   - `getDecompressedTerms()` メソッドの実装: `FrontCodingCompressor.decompress(this.compressedTerms)` を呼び出し、安全に復元されたトークン配列を返却。
   - すべてのメソッドに正確な JSDoc アノテーション (`@return`, `@param`, `@type`) を付与。

2. **`tests/unit/search_engine.test.js` のテスト拡張**:
   - `CustomSearchEngine.compressTerms()` の実行テストと圧縮率計算の正常性確認。
   - `CustomSearchEngine.getDecompressedTerms()` で復元されたトークン一覧が元の転置インデックスのキーと完全一致することを検証。
   - 不正な入力や空のインデックスに対する安全性検証。

3. **コンパイルと品質自動検証**:
   - `make build` (Closure Compiler) を実行し、警告・エラーがゼロ (`0`) であることを確認。
   - `npm test` を実行し、全ユニットテスト (10/10 PASS) および循環的複雑度 (<= 10) のパスを確認。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `CustomSearchEngine` に Front Coding 前形差分圧縮統合メソッド (`compressTerms`, `getDecompressedTerms`) が実装されていること。
- [x] 復元されたトークン群が元のインデックスキーと 100% 一致し、プロトタイプ汚染防御が維持されていること。
- [x] `tests/unit/search_engine.test.js` に新規テストケースが追加され、パスすること。
- [x] `make build` が Closure Compiler 最厳格設定 (`ADVANCED_OPTIMIZATIONS` / `--jscomp_error=*`) で警告・エラー 0 件で通過し `site/fm_index_engine.min.js` が更新されていること。
- [x] `npm test` による全自動テストおよび循環的複雑度検証 (ADR-02: <=10) に 100% 合格すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA & IR)**: `FrontCodingCompressor` の API 仕様と `CustomSearchEngine` の転置インデックス構造の型整合性・循環的複雑度要求を反復推敲し、設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 項目の検証を行い、適合判定【PASS】を付与。
