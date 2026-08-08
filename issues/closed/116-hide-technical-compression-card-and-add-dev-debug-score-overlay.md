# [FEAT/UIUX] 全文検索 UI からの技術指標バナーの非表示化と開発者向けデバッグモード（検索スコアオーバーレイ）の追加 (ID: 116)

## メタデータ

- **ID**: 116
- **種別**: Feature / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/116-hide-technical-compression-card-and-add-dev-debug-score-overlay`

---

## 1. 概要 / Summary

ユーザー体験 (UX) 向上のため、[全文検索ポータル (`docs/search.md` / `site/search.html`)](docs/search.md) 上部に常時表示されていた技術仕様バナー（「IR & SA 文字列データ圧縮 & 簡潔全文索引: Front Coding 前形共通圧縮 & FM-Index (BWT) 適用済み...」）をデフォルト表示から排斥し、画面領域を効率化します。一方、開発者・アジャイル検証用として **デバッグモード (`🛠️ Dev Mode`)** トグルを新設し、ON 時にエンジン詳細メトリクスの表示および各検索結果カードへの **検索適合スコア (`[Score: 105.00]`)** のオーバーレイ表示を実現します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/search.md`**:
   - 圧縮技術仕様カード (`#compression-info-card`) をデフォルト非表示 (`display: none`) に指定。
   - ステータスバー横に `🛠️ Dev Mode` トグルボタンを配置。
   - `toggleDevMode()` 関数および `localStorage` 状態保持 (`dev_debug_mode`) の実装。
   - デバッグモード ON 時に各検索結果カードに `[Score: X.XX]` スコアバッジを表示。
2. **[REGENERATE] `site/search.html` & `site/search/index.html`**:
   - `make build` により更新。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。ユーザー画面ファーストビューの省スペース化および視認性大幅向上。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`CustomSearchEngine` 内のスコア算出ロジックは不変、UI レンダリング層での表示切り替え。
3. **③ セキュリティ・ガバナンス影響**: XSS の完全防止、相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**:
   - 一般ユーザー：クリーンで無駄のない Google スタイルの洗練された検索体験を提供。
   - 開発者・運用者：ワンタップでスコア・データ構造・圧縮パラメータを可視化でき、検索エンジンのチューニング作業が飛躍的に容易に。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`docs/search.md` 内のマークアップとスタイルの改修**:
   - 技術仕様カードの `id` を `dev-metrics-panel` とし、初期スタイルを `display: none;` に設定。
   - ステータスバー領域 (`#search-status-bar`) に `<button id="dev-mode-btn" onclick="toggleDevMode()">🛠️ Dev Mode: OFF</button>` を設置。
2. **`toggleDevMode()` およびスコアオーバーレイロジックの実装**:
   - `devModeActive` 変数を保持。
   - ON 時に `#dev-metrics-panel` を表示 (`display: flex;`)、OFF 時に非表示。
   - `renderResults(query, results)` 内で `devModeActive` が true の場合、カード右上に `<span class="score-badge">[Score: ${score.toFixed(2)}]</span>` を動的付与。
3. **ビルドおよび品質検証**:
   - `make build` で `site/search.html` を更新。
   - `verify-quality-gates` スキルを実行し 100% PASS を検証。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] デフォルト状態で技術仕様バナーが非表示となり、一般ユーザー向けのクリーンな UI になっていること。
- [x] `🛠️ Dev Mode` ボタンのクリックでデバッグモードが切り替わり、設定状態が `localStorage` に保持されること。
- [x] デバッグモード ON 時に、各検索結果カードに `[Score: XX.XX]` スコアバッジが表示されること。
- [x] `make build` により `site/search.html` が正常同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: 一般ユーザー向け領域省スペース化および開発者向けデバッグオーバーレイ設計の承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
