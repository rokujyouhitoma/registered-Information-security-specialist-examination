---
ID: 043
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG/WEB] site/index.html での JS モジュール読み込み 404 エラーおよび相関パス構造の修正 (ID: 043)

## 1. 概要 / Summary
`site/` ディレクトリを Web サーバーのドキュメントルート（または GitHub Pages 配元）として配信した際、`site/index.html` 内の `<script src="../src/js/modules/...">` がルート階層外を参照して `404 Not Found` になり `CustomSearchEngine is not defined` エラーが発生する問題を、配信用ディレクトリ `site/js/` を整備して解決する。

---

## 2. トレーサビリティ / Traceability
- ブラウザコンソール 404 エラーログ (`tokenizer.js 404`, `CustomSearchEngine is not defined`)
- [site/index.html](../site/index.html)
- [Makefile](../Makefile)
- [package.json](../package.json)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [site/js/tokenizer.js](../site/js/tokenizer.js)
- [x] [site/js/vector_scorer.js](../site/js/vector_scorer.js)
- [x] [site/js/fm_index_engine.js](../site/js/fm_index_engine.js)
- [x] [site/index.html](../site/index.html)
- [x] [Makefile](../Makefile)
- [x] [package.json](../package.json)
- [x] [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/043-fix-site-js-relative-path-404`

1. **`site/js/` 配下への JS モジュール配置**:
   - `site/js/tokenizer.js`, `site/js/vector_scorer.js`, `site/js/fm_index_engine.js` を同調整備。
2. **`site/index.html` のパス修正**:
   - `<script src="js/tokenizer.js"></script>` 等へ変更。
3. **ビルド＆テスト設定の同期**:
   - `Makefile`, `package.json`, `search_engine.test.js` の参照パスを `site/js/` へ更新し、`make build && npm test` で 100% PASS を確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `site/` をWebサーバーで起動した際に 404 エラーが出ず、`index.html` および `compiled.html` の雙方で検索ポータルが正常動作すること
- [x] `make build && npm test` が成功すること
