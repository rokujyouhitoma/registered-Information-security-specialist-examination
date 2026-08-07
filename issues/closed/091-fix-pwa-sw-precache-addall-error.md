---
ID: 091
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG] PWA Service Worker における 404 アセットプリキャッシュ失敗 (TypeError: Failed to execute 'addAll' on 'Cache') の修正と堅牢化 (ID: 091)

## 1. 概要 / Summary
`https://rokujyouhitoma.github.io/registered-information-security-specialist-examination/search/` 等のページアクセス時に、Service Worker (`sw.js`) 内の `cache.addAll(PRECACHE_ASSETS)` が失敗し、以下のエラーが発生して Service Worker の登録・インストールが失敗する現象を解消します。

```text
search/:603 SW Registered: https://rokujyouhitoma.github.io/registered-information-security-specialist-examination/
sw.js:1 Uncaught (in promise) TypeError: Failed to execute 'addAll' on 'Cache': Request failed
```

### 再現手順 / Steps to Reproduce
1. 本リポジトリをビルドした Web サイト (`site/` または GitHub Pages) にアクセスする。
2. 開発者ツールの Console または Service Worker ログを確認する。
3. `sw.js:1 Uncaught (in promise) TypeError: Failed to execute 'addAll' on 'Cache': Request failed` が出力され、オフラインキャッシュ機能が無効化される。

### 再現環境 / Environment
- Browser: All modern browsers with Service Worker support
- File: `src/assets/sw.js`

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [sw.js](file:///workspace/registered-Information-security-specialist-examination/src/assets/sw.js)
- [x] [verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)
- [x] [README.md](file:///workspace/registered-Information-security-specialist-examination/issues/README.md)

---

## 3. 根本原因分析 (RCA) / Root Cause Analysis
1. `src/assets/sw.js` の `PRECACHE_ASSETS` リスト内に、存在しないファイル (`./compiled.html` および `./index.html`) が指定されていた。
2. ブラウザ標準の `cache.addAll()` API は配列で渡されたアセットのうち1つでも HTTP 404 等の失敗ステータスを返すと Promise 全体が reject され、Service Worker の `install` イベントが例外を発生して中断される。

---

## 4. 暫定対処と恒久対策 / Workaround & Permanent Fix
* **暫定対処 (Workaround)**: 個別フェッチエラーを `catch` して無視し、インストール処理全体のクラッシュを防御する。
* **恒久対策 (Permanent Fix)**:
  1. `PRECACHE_ASSETS` から存在しないリソース (`./compiled.html`, `./index.html`) を削除し、実在するアセット (`./docs_index.html`) に更新する。
  2. `install` イベントで個別アセット取得時に `cache.add().catch()` または `Promise.allSettled` によるハンドリングを追加し、一部リソース取得に失敗してもエラーログを出力しつつ他のキャッシュ保存を継続させ Service Worker を正常起動させる。
  3. `scripts/verify_build_integrity.js` に `sw.js` プリキャッシュアセットの実在性自動アサーションを追加する。

---

## 5. 実装方針 / Implementation Plan
Target Branch: `fix/091-fix-pwa-sw-precache-addall-error`

1. `src/assets/sw.js` の `PRECACHE_ASSETS` リストから `./compiled.html`, `./index.html` を削除し、`./docs_index.html` に修正。
2. `src/assets/sw.js` の `install` リスナーを改修し、各アセットのキャッシュ保存処理を個別の `.catch()` 付き `Promise.all` に更新してエラーの堅牢性を確保。
3. `scripts/verify_build_integrity.js` に `sw.js` 内のプリキャッシュ一覧抽出および `site/` 内での実在チェックアサーションを実装。
4. `python3 scripts/build_html_docs.py` を実行して `site/` の成果物を更新。
5. `node scripts/verify_build_integrity.js` および `npm test` を実行して検証。

---

## 6. 完了条件 / Success Criteria (DoD)
- [x] `PRECACHE_ASSETS` に存在するアセットがすべて `site/` 内に実在すること。
- [x] `sw.js` で一部アセット取得失敗が発生した場合でも Service Worker のインストール処理がフェイルしない構造になっていること。
- [x] `node scripts/verify_build_integrity.js` がアサーションエラーなしで正常終了すること。
- [x] `npm test` がすべて合格すること。
