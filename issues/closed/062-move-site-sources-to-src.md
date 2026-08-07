---
ID: 062
種別: Refactor
優先度: High
ステータス: Closed
---

# [FEAT/ENH] site/ 配下のソースコード (JS/sw.js/manifest.json) の src/ への集約とビルド処理の整備 (ID: 062)

## 1. 概要 / Summary
`/site` を純粋なビルド成果物（Git 管理外および完全動的生成ディレクトリ）とするため、`site/js/` 配下の検索エンジン JS モジュールおよび `sw.js`, `manifest.json` 等の手動保守ソースコードを `src/` 配下に移設・集約し、ビルドスクリプト経由で `site/` 配下へ自動コピー・コンパイルされる構成にリファクタリングした。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [issues/closed/061-automate-site-build-cicd.md](closed/061-automate-site-build-cicd.md)
- 関連資料: [issues/closed/043-fix-site-js-relative-path-404.md](closed/043-fix-site-js-relative-path-404.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] `site/js/*` -> `src/js/`
- [x] `site/sw.js`, `site/manifest.json` -> `src/assets/`
- [x] [Makefile](../Makefile)
- [x] [package.json](../package.json)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [x] [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)
- [x] [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [x] [.gitignore](../.gitignore)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/062-move-site-sources-to-src`

1. **ソースコードの `src/` 配下への移設と整理**:
   - `site/js/*.js` (`tokenizer.js`, `vector_scorer.js`, `synonym_expander.js`, `semantic_scorer.js`, `search_worker.js`, `fm_index_engine.js`) を `src/js/` 配下に集約。
   - `site/sw.js` および `site/manifest.json` を `src/assets/` 配下へ移動。

2. **ビルドスクリプト・設定の改修**:
   - `scripts/build_html_docs.py` に `copy_static_assets()` を実装し、`src/js/` および `src/assets/` を `site/` へ動的同期コピー。
   - `Makefile` および `package.json` の JS コンパイル参照パスを `src/js/` に変更。

3. **テスト・検索スクリプトの参照パス更新**:
   - `tests/unit/search_engine.test.js` および `scripts/fm_index_search.py` で `src/js/` を参照するように更新。

4. **`.gitignore` と Git 管理のクリーン化**:
   - `.gitignore` にビルド成果物である `site/` を追加。
   - 既存の `site/` 配下生成物を `git rm -r --cached site/` でインデックスから除外。

5. **全自動検証とビルドテスト**:
   - `npm run build && npm test` を実行し、全アサーション合格を確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 手動保守する全ソース（JSモジュール, Service Worker, Manifest）が `src/` 配下に正しく移動・整理されていること
- [x] `npm run build` または `make build` により、`src/` 内のソースと `docs/` から `/site` が完結して生成されること
- [x] `.gitignore` により生成物 `/site/` が管理対象外となり、Git の差分がクリーンに保たれること
- [x] `npm test` によるユニットテスト・トレーサビリティ検証・品質監査テストがすべて合格すること
