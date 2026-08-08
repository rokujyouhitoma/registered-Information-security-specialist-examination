# [FEAT/UIUX] 全 37 ページにおける「⚡ 虎の巻 (exam_cheatsheet.html)」を含む一貫したヘッダーナビゲーションの適用アサーションとモバイルレスポンシブ幅の最適化 (ID: 115)

## メタデータ

- **ID**: 115
- **種別**: Feature / UIUX
- **優先度**: High
- **ステータス**: Open (In Progress)
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & QA (`software-quality-assurance-specialist`)
- **ターゲットブランチ**: `fix/115-verify-cheatsheet-link-and-header-consistency`

---

## 1. 概要 / Summary

ユーザーより「ページのヘッダーがページによって異なり、『虎の巻』があったりなかったりする」というフィードバックが寄せられました。これに対応し、`scripts/build_html_docs.py` の `HTML_TEMPLATE` 内のヘッダーナビゲーション項目（🏠 トップ, 🔍 全文検索, 🧠 クイズ演習, ⚡ 虎の巻, 📖 シラバス, 📚 用語辞書）が、サブディレクトリ内（`site/glossary/terms/*.html`, `site/scenarios/*.html`, `site/subject_b/*.html` 等）を含めた全 37 件の HTML ページで 100% 漏れなく統一表示されていることをアサート・保証します。あわせて、モバイル画面での折り返し (`flex-wrap: wrap`) と視認性を最適化します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `scripts/build_html_docs.py`**:
   - `layout-header` および `header-nav` にモバイル折り返しスタイル (`flex-wrap: wrap; gap: 0.75rem 1.25rem;`) を適用。
   - `HTML_TEMPLATE` 内のナビゲーション全項目が全 37 ページで確実に一貫描画されることを保証。
2. **[MODIFY] `scripts/verify_build_integrity.js`**:
   - 全生成 HTML ページにおいて「⚡ 虎の巻」を含む全ナビゲーション項目の存在チェックアサーションを追加。
3. **[REGENERATE] `site/**/*.html`**:
   - `make build` により全 HTML ドキュメントを一括再ビルド。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。ナビゲーションリンクの崩れ・漏れの完全防止。
2. **② アーキテクチャ・データ構造影響**: 影響なし。ビルドテンプレートおよび検証アサーションの機能強化。
3. **③ セキュリティ・ガバナンス影響**: 相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: モバイル・デスクトップどちらの環境でも、「⚡ 虎の巻」を含む主要コンテンツへいつでもワンタップで切り替え可能な安定した UI/UX を提供。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`scripts/build_html_docs.py` のスタイル調整**:
   - `layout-header` に `flex-wrap: wrap` を追加し、狭小画面でのメニュー項目あふれを防止。
2. **`scripts/verify_build_integrity.js` へのアサーション追加**:
   - 走査する全 HTML ファイル内で `<a href="...exam_cheatsheet.html"...>⚡ 虎の巻</a>` が存在することを自動チェック。
3. **全ドキュメントの再ビルドと検証**:
   - `make build` で全 37 ページの HTML を出力。
   - `verify-quality-gates` スキルを実行し、全テスト 100% PASS を自動検証。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] 全 37 件の生成 HTML ファイル（ルート・サブディレクトリ問わず）の `<header class="layout-header">` 内に『⚡ 虎の巻』を含む全 6 大ナビゲーションリンクが同一デザインで確実に存在すること。
- [x] `scripts/verify_build_integrity.js` にて全ページのヘッダー完全性検証ロジックを強化し、PASS すること。
- [x] `make build` により全 HTML ドキュメントが正常にビルド・同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: 全 37 ページヘッダーの自動品質アサーション方針を承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
