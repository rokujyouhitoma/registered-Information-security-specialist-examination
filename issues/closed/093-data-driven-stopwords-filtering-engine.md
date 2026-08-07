---
ID: 093
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT] 外部 JSON データ駆動によるストップワード除去機構の導入と全文検索エンジンの検索適合率向上 (ID: 093)

## 1. 概要 / Summary
Web全文検索エンジン（`CustomSearchEngine` / `Tokenizer`）および Python インデックスビルダ（`scripts/fm_index_search.py`）において、検索精度（適合率: Precision）を落とす一般的な高頻度ノイズ単語（助詞・指示語・一般的な手続き表現など）を除外するための外部 JSON データ駆動型ストップワード除去（Stop Words Filtering）機構を導入する。
データ駆動アーキテクチャに準拠し、外部ファイル `src/data/stopwords.json` から非同期ロードを行って、プロトタイプ汚染対策および無差別ヒットの削減を実現する。

---

## 2. トレーサビリティ / Traceability
- 関連規約・指針:
  - IPA情報処理安全確保支援士 シラバス Ver.2.1 / 科目 A-2 追補版 Ver.4.0
  - データ駆動型設計原則 (Data-Driven Architecture Guideline)
  - ISO/IEC 27001 セキュア・コーディングガイドライン (プロトタイプ汚染防御)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/stopwords.json](file:///workspace/registered-Information-security-specialist-examination/src/data/stopwords.json) [NEW]
- [x] [src/js/tokenizer.js](file:///workspace/registered-Information-security-specialist-examination/src/js/tokenizer.js)
- [x] [src/js/search_worker.js](file:///workspace/registered-Information-security-specialist-examination/src/js/search_worker.js)
- [x] [scripts/fm_index_search.py](file:///workspace/registered-Information-security-specialist-examination/scripts/fm_index_search.py)
- [x] [scripts/verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/093-stopwords-filtering-engine`

1. **データファイルの作成 (`src/data/stopwords.json`)**:
   - 日本語および英語のストップワード（例: 「について」「これ」「それ」「概要」「詳細」「また」「および」「the」「is」「a」「an」「in」「on」など）を配列形式で定義。
2. **Tokenizer モジュールの拡張 (`src/js/tokenizer.js`)**:
   - `Tokenizer._stopWords` (Set) を追加し、`Tokenizer.setStopWords(list)` メソッドを実装。
   - `tokenize(text)` 内で `words` や `bigrams` の抽出時にストップワードに含まれる単語を除外するフィルタ処理を追加。
3. **Web Worker 連携 (`src/js/search_worker.js`)**:
   - Worker の初期化 (`action === 'INIT'`) 時に `fetch('data/stopwords.json')` を行い、`Tokenizer.setStopWords()` にセット。
4. **Python インデックス生成・検索スクリプトの拡張 (`scripts/fm_index_search.py`)**:
   - `src/data/stopwords.json` をロードする処理を追加し、`tokenize(text)` 関数にてストップワードを除外。
5. **テストおよびビルド整合性検証 (`scripts/verify_build_integrity.js`)**:
   - ストップワード機能の動作検証をテスト項目に追加し、`npm test` で全項目が 100% 成功することを確認する。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/stopwords.json` に日本語・英語のストップワードリストが正しく定義されている。
- [x] `Tokenizer.setStopWords()` および `Tokenizer.tokenize()` でストップワードが適切に除外される。
- [x] `search_worker.js` が非同期で `stopwords.json` をロードし、ストップワードが適用される。
- [x] `scripts/fm_index_search.py` でインデックスビルド時および検索時にストップワードが除去される。
- [x] `npm run build && npm test` を実行し、既存テストおよび追加テストが 100% 合格する。
- [x] AU (システム監査人) によるトレーサビリティおよび適合度最終監査で【適合 (PASS)】を獲得する。
