# [FEAT/UIUX] 全文検索 UI デバッグモードにおける Yuzora 仕様準拠キーバインド (`d`/`D`/`Ctrl+Shift+D`/`Escape`) の実装 (ID: 117)

## メタデータ

- **ID**: 117
- **種別**: Feature / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/117-add-yuzora-style-keybindings-for-search-dev-debug-mode`

---

## 1. 概要 / Summary

[Yuzora ユーザーマニュアル (USR-01 7.3 デバッグ機能のキーボードショートカット)](https://github.com/rokujyouhitoma/yuzora/blob/main/docs/manuals/USR-01-user_manual.md) のキーバインド仕様に準拠し、[全文検索ポータル (`docs/search.md` / `site/search.html`)](docs/search.md) において、キーボード操作で直接デバッグモード (`🛠️ Dev Mode`) を切り替え・操作できるキーバインドショートカット機能を導入します。テキスト入力フィールド (`input`/`textarea`) フォーカス時を除外する排他ガードを設けることで、検索キーワード入力の邪魔をせず快適な開発者デバッグ体験を提供します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/search.md`**:
   - `keydown` イベントリスナーに Yuzora 準拠のキーバインド処理を追加。
   - ショートカットキー操作:
     - `d` / `D`（テキスト入力中以外）または `Ctrl+Shift+D`: デバッグモード表示／非表示トグル。
     - `Escape`: デバッグモードが開いている場合はデバッグモードを非表示化（OFF）、非表示かつ入力フォーカス時は検索入力をクリア。
   - `🛠️ Dev Mode` トグルボタンに `[d / Ctrl+Shift+D]` ツールヒントバッジを追記。
2. **[REGENERATE] `site/search.html` & `site/search/index.html`**:
   - `make build` により更新。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。入力エリア非フォーカス時のキー入力をトリガーとするため誤動作ゼロ。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`keydown` イベントハンドラ内の制御フック。
3. **③ セキュリティ・ガバナンス影響**: XSS の完全防止、相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: Yuzora スタイルの世界観と一貫性のある直感的なデバッグキーショートカット (`d`/`D`/`Escape`) を実現。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`docs/search.md` の `keydown` イベントハンドラ強化**:
   ```javascript
   document.addEventListener('keydown', (e) => {
       const isInputFocused = document.activeElement === input || (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'));
       
       // Yuzora 準拠キーバインド: 'd' / 'D' (未入力時) または Ctrl+Shift+D で Dev Mode トグル
       if ((e.key === 'd' || e.key === 'D') && !isInputFocused && !e.ctrlKey && !e.metaKey && !e.altKey) {
           e.preventDefault();
           toggleDevMode();
       } else if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
           e.preventDefault();
           toggleDevMode();
       } else if (e.key === 'Escape') {
           if (devModeActive) {
               devModeActive = false;
               localStorage.setItem('dev_debug_mode', false);
               updateDevModeUI();
               performPortalSearch();
           } else if (isInputFocused && input) {
               input.value = '';
               performPortalSearch();
           }
       } else if (e.key === '/' && !isInputFocused) {
           e.preventDefault();
           if (input) input.focus();
       }
   });
   ```
2. **ボタン表示へのキーヒント追記**:
   - `🛠️ Dev Mode: OFF [d]` のようにショートカットキーの存在を視覚的にもガイド。
3. **ビルドおよび品質検証**:
   - `make build` で `site/search.html` を出力。
   - `verify-quality-gates` スキルを実行し 100% PASS を検証。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `d` / `D` キー（入力フィールドフォーカス時を除く）でデバッグモードがトグルされること。
- [x] `Ctrl+Shift+D` キーでデバッグモードがトグルされること。
- [x] `Escape` キーでデバッグモードがオフになること。
- [x] `make build` により `site/search.html` が正常同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: Yuzora 互換キーバインド設計および排他ガードロジックの承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
