# [FEAT/UIUX] 全 Web ページにおけるグローバルナビゲーションヘッダーの完全統一とトップポータル (site/index.html) の生成適正化 (ID: 114)

## メタデータ

- **ID**: 114
- **種別**: Feature / UIUX
- **優先度**: High
- **ステータス**: Open (In Progress)
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & QA (`software-quality-assurance-specialist`)
- **ターゲットブランチ**: `fix/114-unify-global-navigation-header-across-all-pages`

---

## 1. 概要 / Summary

Web サイト内のページ間（トップ, 検索, クイズ, シラバス, 用語辞書, 虎の巻等）でヘッダー構造やリンク先の整合性が一部異なっていた問題、および `site/index.html` (トップポータル) が生成されずヘッダーの「🏠 トップ」リンククリック時に 404 エラーとなる問題を解消します。`scripts/build_html_docs.py` の HTML テンプレートを改修し、全 36+ ページでレスポンシブかつ完全に同一なデザイン・リンク構造を持つグローバルナビゲーションヘッダーを一括適用します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `scripts/build_html_docs.py`**:
   - `docs/index.md` の変換先として `site/index.html` （および互換用 `site/docs_index.html`）を生成。
   - `HTML_TEMPLATE` 内のヘッダーナビゲーション項目（トップ, 検索, クイズ, 虎の巻, シラバス, 用語辞書）の完全統一とレスポンシブスタイルの調整。
2. **[REGENERATE] `site/**/*.html`**:
   - `make build` により全 36+ 件の HTML ドキュメントを統一ヘッダーで一括再ビルド。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。リンク切れの根本解消およびグローバルナビゲーションの安定性向上。
2. **② アーキテクチャ・データ構造影響**: 影響なし。ビルドジェネレータのテンプレート統一のみ。
3. **③ セキュリティ・ガバナンス影響**: XSS の完全防止、エスケープおよび相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` により `site/index.html` を含む全 HTML ファイルが正常生成され、`npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: 全 36+ ページでどの深さのドキュメントを開いていても、1 タップで「トップ」「検索」「クイズ」「虎の巻」「シラバス」「用語辞書」へスムーズに回遊可能な一貫したモダンヘッダー環境を実現。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`scripts/build_html_docs.py` の改修**:
   - `index.md` 変換時に `site/index.html` および `site/docs_index.html` の両方を生成・配置。
   - `HTML_TEMPLATE` の `<header class="layout-header">` 内ナビゲーション項目を統一:
     - `🏠 トップ` (`{rel_root}index.html`)
     - `🔍 全文検索` (`{rel_root}search.html`)
     - `🧠 クイズ演習` (`{rel_root}quiz.html`)
     - `⚡ 虎の巻` (`{rel_root}exam_cheatsheet.html`)
     - `📖 シラバス` (`{rel_root}syllabus.html`)
     - `📚 用語辞書` (`{rel_root}glossary.html`)
2. **全ドキュメントの再ビルド**:
   - `make build` を実行して全 36+ ページの HTML を更新。
3. **品質ゲートの検証**:
   - `verify-quality-gates` スキルを実行し、`verify_build_integrity.js` で `index.html` 存在・全アセット・リンクの正常性を 100% PASS 証明。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `scripts/build_html_docs.py` により `site/index.html` が正常に生成されること。
- [x] 全 36+ 件の生成 HTML ページにおいて、ヘッダー (`layout-header`) のブランド表示・ナビゲーション項目が 100% 同一デザイン・同一リンク構造で表示されること。
- [x] `make build` により全 HTML ドキュメントが正常にビルド・同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` (`verify_build_integrity.js`) 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: グローバルナビゲーションテンプレート設計および `site/index.html` 同期方針の設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
