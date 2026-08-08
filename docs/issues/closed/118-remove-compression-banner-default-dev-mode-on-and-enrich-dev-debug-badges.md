# [FEAT/UIUX] 全文検索 UI からの冗長圧縮バナーの完全削除、Dev Mode デフォルト ON 化、および開発者デバッグ情報（ID・適合スコア・一致種別）の高度可視化 (ID: 118)

## メタデータ

- **ID**: 118
- **種別**: Feature / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/118-remove-compression-banner-default-dev-mode-on-and-enrich-dev-debug-badges`

---

## 1. 概要 / Summary

ユーザーフィードバックに基づき、[全文検索ポータル (`docs/search.md` / `site/search.html`)](docs/search.md) から冗長な「⚡ IR & SA 文字列データ圧縮 & 簡潔全文索引」技術バナー領域を完全に削除・排斥します。また、開発作業の継続に伴い **デバッグモード (`🛠️ Dev Mode`) をデフォルト ON** に設定します。さらに、Dev Mode ON 時の各検索結果カードに表示するデバッグ情報を大幅拡張し、**ドキュメント ID (`[ID: ...]`)**、**検索適合スコア (`[Score: ...]`)**、および **一致判別種別 (`[Match: 🎯 完全一致 / 🔤 タイトル部分一致 / 📄 概要一致 / 🧠 概念・同義語近似]`)** をマルチバッジ形式でリアルタイム可視化します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/search.md`**:
   - `#dev-tech-card`（旧技術圧縮メトリクス領域）を完全に削除。
   - `devModeActive` の初期判定をデフォルト `true` に変更。
   - Dev Mode 動作時に、各検索結果カードヘッダーへマルチデバッグバッジ (`[ID: ...]`, `[Score: ...]`, `[Match: ...]`) を生成・挿入。
2. **[REGENERATE] `site/search.html` & `site/search/index.html`**:
   - `make build` により更新。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。不要バナー排除によりファーストビュー視認性向上。
2. **② アーキテクチャ・データ構造影響**: 影響なし。スコア算出および一致判定の可視化ロジック層の機能拡張。
3. **③ セキュリティ・ガバナンス影響**: XSS の完全防止、相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**:
   - 画面上部をクリーンに保ちつつ、開発・検証時はデフォルトで高度なデバッグデータ（ID・Score・Match Type）を即座に参照可能。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`docs/search.md` の HTML 改修**:
   - 旧技術圧縮バナー HTML (`#dev-tech-card`) を完全に削除。
2. **`devModeActive` のデフォルト ON 設定**:
   ```javascript
   let devModeActive = localStorage.getItem('dev_debug_mode') === null ? true : localStorage.getItem('dev_debug_mode') === 'true';
   ```
3. **一致種別 (Match Type) 判定およびマルチデバッグバッジ生成**:
   ```javascript
   let matchTypeBadge = '🧠 概念・同義語近似';
   const docNameLower = title.toLowerCase();
   const qLower = query ? query.toLowerCase().trim() : '';
   if (qLower) {
       if (docNameLower === qLower) matchTypeBadge = '🎯 タイトル完全一致';
       else if (docNameLower.includes(qLower)) matchTypeBadge = '🔤 タイトル部分一致';
       else if (summary.toLowerCase().includes(qLower)) matchTypeBadge = '📄 概要文一致';
   }
   const scoreVal = typeof doc.score === 'number' ? doc.score : (parseFloat(doc.score) || 0);
   const docId = doc.id || doc.url || title;

   const devBadgesHtml = devModeActive ? `
       <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.25rem;">
           <span style="background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); padding: 0.1rem 0.45rem; border-radius: 8px; font-size: 0.72rem; font-family: monospace;">🔑 ID: ${docId}</span>
           <span style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); padding: 0.1rem 0.45rem; border-radius: 8px; font-size: 0.72rem; font-weight: 700; font-family: monospace;">⚡ Score: ${scoreVal.toFixed(2)}</span>
           <span style="background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.1rem 0.45rem; border-radius: 8px; font-size: 0.72rem;">${matchTypeBadge}</span>
       </div>
   ` : '';
   ```
4. **ビルドおよび品質検証**:
   - `make build` で `site/search.html` を同期。
   - `verify-quality-gates` スキルを実行し 100% PASS を検証。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] 画面上部の旧技術圧縮メトリクスバナー (`#dev-tech-card`) が完全削除されていること。
- [x] Dev Mode がデフォルトで ON となり、初回閲覧時にもデバッグオーバーレイが表示されること。
- [x] 各検索結果カードに `ID`、`Score`、`Match Type` のデバッグバッジが表示されること。
- [x] `d` / `D` / `Ctrl+Shift+D` / `Escape` キーボードショートカットで Dev Mode の ON/OFF 切り替えが正常機能すること。
- [x] `make build` により `site/search.html` が正常同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: バナー削除およびドキュメント ID/Score/Match Type デバッグバッジ設計の承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
