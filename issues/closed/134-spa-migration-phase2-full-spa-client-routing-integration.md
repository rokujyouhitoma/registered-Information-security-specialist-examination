---
ID: 134
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT] Full SPA モード移行: クライアントサイドハッシュルーティング・無縫子ナビゲーション完全統合 (ID: 134)

## 1. 概要 / Summary
学習ポータルの全画面（トップ、全文検索、クイズ演習、虎の巻、シラバス、用語辞書、各詳細ドキュメント）について、ページリロードなしの完全な SPA（Single Page Application）として無縫子（シームレス）に遷移・描画されるように統合する。

## 2. トレーサビリティ / Traceability
- **REQ-02 Persona 4 (直前受検者)**: モバイル・オフライン環境における高速ロード、ページ再読み込みを排除した画面遷移レスポンス向上
- **ADR-01 構成戦略**: PWA プリキャッシュ (`sw.js`) および `content_store.json` と連動するデータ駆動型 UI アーキテクチャ

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [ ] [src/js/spa_app.js](../src/js/spa_app.js)
- [ ] [src/js/frameworks/router.js](../src/js/frameworks/router.js)
- [ ] [src/js/frameworks/scene.js](../src/js/frameworks/scene.js)
- [ ] [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/134-full-spa-client-routing-integration`

1. **`scripts/build_html_docs.py` の HTML テンプレート拡張**:
   - `<main class="container">` の直下に `<div id="spa-view-container">` を用意し、初期表示 HTML コンテンツをコンテナ内に安全にラップ。
   - `HTML_TEMPLATE` 内に `spa_app.js` を始めとするフレームワーク JS スクリプトを読み込み可能に設定。
2. **`src/js/spa_app.js` の全ドキュメント動的レンダリング拡張**:
   - `content_store.json` から指定 doc_id（例: `syllabus_detail`, `glossary`, `scenarios/hands_on_incident_analysis` など）のコンテンツを動的抽出し、SPA ビューコンテナ `spa-view-container` に描画する `renderDocument(docId)` を追加。
   - ハッシュルート (`#`, `#search`, `#quiz`, `#glossary`, `#cheatsheet`, `#doc/<docId>`) および内部 `<a>` リンククリック時のデリゲート（`e.preventDefault()` ＆ `router.navigate()` への転送）を実装。
3. **Closure Compiler による高度最適化コンパイルと `make build` 同期**:
   - `make build` を実行し、全 HTML および `site/fm_index_engine.min.js` などの生成物を同期。
4. **自動テストおよび検証**:
   - `npm test` を実行し、すべての QA アサーションが 100% PASS することを確認。

## 5. 完了条件 / Success Criteria (DoD)
- [ ] すべてのナビゲーションリンククリック時、ブラウザリロード（再読み込み）なしでコンテンツが即座に動的更新されること。
- [ ] 直接 URL/ハッシュアクセス (`#doc/syllabus_detail` 等) で該当ドキュメントが正しく描画されること。
- [ ] `make build` でエラー・警告 0 件でビルド完了すること。
- [ ] `npm test` 全自動テストスイートが 100% PASS すること。
