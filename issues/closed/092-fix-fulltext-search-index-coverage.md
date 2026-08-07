---
ID: 092
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG] 全 docs/ ドキュメントの検索インデックス化統合と Web 全文検索機能の完全化 (「ゼロトラスト」等での検索ヒットおよびカテゴリフィルタ正常化) (ID: 092)

## 1. 概要 / Summary
検索画面 (`docs/search.md` / `site/search.html`) において「ゼロトラスト」をはじめとする主要な学習キーワードや推奨チップをクリックしても検索結果が 0 件になり、結果が表示されない不具合を解消します。また、カテゴリタブ（用語辞書、シラバス、科目B演習、攻撃シナリオ）での絞り込みが正常に動作しない問題を修正します。

### 再現手順 / Steps to Reproduce
1. `site/search.html` (または `site/search/index.html`) をブラウザで開く。
2. 検索入力欄に「ゼロトラスト」と入力、または「ゼロトラスト」の検索ヒントチップをクリックする。
3. 「✅ 検索インデックスロード完了」と表示されるが、「約 0 件」「「ゼロトラスト」に一致する情報は見つかりませんでした。」と表示され、結果が出力されない。

### 再現環境 / Environment
- Browser: All modern browsers
- Files: `scripts/fm_index_search.py`, `scripts/build_html_docs.py`, `docs/search.md`, `src/js/fm_index_engine.js`

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [fm_index_search.py](file:///workspace/registered-Information-security-specialist-examination/scripts/fm_index_search.py)
- [x] [build_html_docs.py](file:///workspace/registered-Information-security-specialist-examination/scripts/build_html_docs.py)
- [x] [search.md](file:///workspace/registered-Information-security-specialist-examination/docs/search.md)
- [x] [fm_index_engine.js](file:///workspace/registered-Information-security-specialist-examination/src/js/fm_index_engine.js)
- [x] [verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)
- [x] [README.md](file:///workspace/registered-Information-security-specialist-examination/issues/README.md)

---

## 3. 根本原因分析 (RCA) / Root Cause Analysis
1. `scripts/fm_index_search.py` が `docs/glossary/syllabus_ver2_1.md` と `docs/glossary/syllabus_tsuiho_ver4_0.md` の2ファイル内にある特定の見出し形式のみを抽出し、`docs/glossary/terms/zero-trust.md` をはじめとする全 `docs/` 配下の単体 md ファイルを無視していた。
2. `search_index.json` 内の各 `doc` オブジェクトに正解となる `url` 属性が保持されておらず、リンク遷移や `activeFilter`（カテゴリタブ）による分類が機能していなかった。
3. `build_html_docs.py` 実行時に `fm_index_search.py` のインデックス再生成が呼び出されておらず、`search_index.json` が全自動同期されていなかった。

---

## 4. 暫定対処と恒久対策 / Workaround & Permanent Fix
* **暫定対処 (Workaround)**: 該当キーワードをシラバス大項目側に転写する。
* **恒久対策 (Permanent Fix)**:
  1. `fm_index_search.py` を改修し、`docs/` ディレクトリ配下の全 `.md` ファイルを巡回して単体用語・演習ガイド・シナリオ・各種ドキュメントを網羅的にパースし、相対 URL (`url`) と適切なタイトル・サマリー・全文テキストを保持させた `search_index.json` を生成する。
  2. `build_html_docs.py` に `fm_index_search.py` のインデックス生成関数呼び出しを組み込み、HTML ビルドと `search_index.json` 更新を全自動化する。
  3. `docs/search.md` および `src/js/fm_index_engine.js` のスコアリング（タイトル完全一致・キーワードブースト）と転置インデックス（`_buildInvertedIndex()`）自動構築、および `url` に基づくカテゴリフィルタ判定を完全化する。
  4. `scripts/verify_build_integrity.js` に「ゼロトラスト」「PKI」「TLS 1.3」等のキーワード検索正常動作のアサーションを追加する。

---

## 5. 実装方針 / Implementation Plan
Target Branch: `fix/092-fix-fulltext-search-index-coverage`

1. `scripts/fm_index_search.py` に `docs/` 内の全 `.md` ファイル再帰探索・構造抽出・URL自動付与ロジックを実装。
2. `scripts/build_html_docs.py` に `fm_index_search.py` の連動呼び出しを実装。
3. `src/js/fm_index_engine.js` と `docs/search.md` を改修し、完全一致ブースト・カテゴリ判定・転置インデックス自動構築を強化。
4. `scripts/verify_build_integrity.js` に検索結果アサーションを追加。
5. ビルド (`python3 scripts/build_html_docs.py`) 及び全テスト (`node scripts/verify_build_integrity.js`, `npm test`) を実行・検証。

---

## 6. 完了条件 / Success Criteria (DoD)
- [x] `site/search_index.json` に `docs/` 配下の全ドキュメントが網羅的にインデックス化され、各ドキュメントに正しい `url` が付与されていること。
- [x] 「ゼロトラスト」「PKI」「TLS 1.3」等で検索した際、該当するドキュメントが最上位にヒットし、クリック可能であること。
- [x] カテゴリタブ（用語辞書、シラバス、科目B演習、攻撃シナリオ）での絞り込み表示が正常に動作すること。
- [x] `node scripts/verify_build_integrity.js` および `npm test` がエラーなく全項目合格すること。
