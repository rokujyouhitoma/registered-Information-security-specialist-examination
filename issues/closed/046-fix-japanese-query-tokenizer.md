---
ID: 046
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG/SEARCH] 日本語検索クエリで検索結果が 0 件になるトークナイザーの正規表現・N-gramバグの修正 (ID: 046)

## 1. 概要 / Summary
自作検索エンジン (JS版 `tokenizer.js` および Python版 `fm_index_search.py`) の `tokenize()` 関数において、`[^\w\s]` の正規表現により日本語文字（漢字、ひらがな、カタカナ）が誤ってすべて削ぎ落とされ、クエリ「セキュリティ」等の日本語検索で結果が 0 件になる問題を修正する。日本語マルチバイト文字に対応した正規化・Bigram/単語分割ロジックを実装し、インデックス再ビルドと検索動作の正常化を行う。

---

## 2. トレーサビリティ / Traceability
- ユーザー報告「検索が日本語のクエリだとひっかからない。クエリ「セキュリティ」だと一件もでない。」
- [src/js/modules/tokenizer.js](../src/js/modules/tokenizer.js)
- [site/js/tokenizer.js](../site/js/tokenizer.js)
- [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/js/modules/tokenizer.js](../src/js/modules/tokenizer.js)
- [x] [site/js/tokenizer.js](../site/js/tokenizer.js)
- [x] [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [x] [site/search_index.json](../site/search_index.json)
- [x] [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/046-fix-japanese-query-tokenizer`

1. **JS/Python Tokenizer のマルチバイト日本語対応**:
   - `[^\w\s]` による削除を廃止し、記号除去のみに制限 (`[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】]` 等を除去）。
   - 全文および文字 Bigram (`n-gram`) を日本語・英語ともに正しく抽出。
2. **検索インデックスの再構築 & JSビルド**:
   - `python3 scripts/fm_index_search.py --build` で全 2,101 用語のインデックス `site/search_index.json` を再生成。
   - Closure Compiler で `make build` を実行。
3. **テストの追加と検証**:
   - `tests/unit/search_engine.test.js` に日本語クエリ（「セキュリティ」「TLS」「ゼロトラスト」等）のユニットテストを追加し、検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] クエリ「セキュリティ」「ゼロトラスト」等の日本語検索で該当ドキュメントが正しくヒットすること
- [x] `npm test` がすべて合格すること
