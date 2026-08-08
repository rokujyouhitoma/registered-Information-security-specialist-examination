# [FIX/AU] issues/closed/ 配下における絶対パスリンク (file:///) の完全相対パス化クレンジングと check_relative_paths.py 判定合格化 (ID: 107)

## メタデータ

- **ID**: 107
- **種別**: Fix / Compliance
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: AU (`systems-auditor`) & QA (`software-quality-assurance-specialist`)
- **ターゲットブランチ**: `fix/107-fix-absolute-path-link-violations`

---

## 1. 概要 / Summary

プロジェクト標準規定 (`AGENTS.md` の "Documentation & Link Rules") により、全 Markdown ドキュメント内の実効ハイパーリンクは環境依存を避けるため厳格に相対パス表記とすることが義務付けられています。
本 Issue では、`issues/closed/` 配下の過去 Issue ファイル内に残存していた `file:///workspace/...` 形式の絶対パスリンクをすべて適切な相対パス形式に修復・クレンジングし、検証スクリプト `python3 scripts/check_relative_paths.py` にて 100% 合格 (0 件検出 / Exit Code 0) することを達成します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `issues/closed/*.md` (検出対象 31 箇所)**:
   - `issues/closed/090-qa-preventative-testing-framework.md`
   - `issues/closed/091-fix-pwa-sw-precache-addall-error.md`
   - `issues/closed/092-fix-fulltext-search-index-coverage.md`
   - `issues/closed/093-data-driven-stopwords-filtering-engine.md`
   - `issues/closed/094-fix-search-result-link-404.md`
   - `issues/closed/095-refactor-js-architecture-cohesion-coupling.md`
   - リンク記法 `[text](file:///workspace/registered-Information-security-specialist-examination/<path>)` を `[text](../../<path>)` または適切な相対パスに一括変換。
2. **[MODIFY] `scripts/check_relative_paths.py` (必要に応じて補助修正)**:
   - 相対パス検出精度の維持確認。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響 (Service Operation & Availability)**: 影響なし。ドキュメント内ハイパーリンクが GitHub, GitHub Pages, 各種環境で正しく相対参照可能になり閲覧性が向上。
2. **② アーキテクチャ・データ構造影響 (Architecture & Data Schema)**: 影響なし。Markdown リンク記法のみの正常化。
3. **③ セキュリティ・ガバナンス影響 (Security & Governance)**: ローカル環境パス (`file:///workspace/...`) の露出が全排除され、ガバナンス規定に 100% 適合。
4. **④ 品質・回帰テスト影響 (Quality & Regression Test)**: `python3 scripts/check_relative_paths.py` がエラーなし (Exit Code 0) で通過し、品質ゲートが正常化。
5. **⑤ 学習体験・UI/UX影響 (Learning Experience & UI/UX)**: ドキュメント閲覧時のリンク切れ (404) を完全に防止。

---

## 4. 詳細実装方針 / Implementation Plan

1. **絶対パスリンクの自動クレンジング実行**:
   - `issues/closed/*.md` 配下の `file:///workspace/registered-Information-security-specialist-examination/` を相対パス (例: `../../`) に置換。
2. **検証スクリプトによる判定**:
   - `python3 scripts/check_relative_paths.py` を実行し、0 件違反 / EXIT 0 を確認。
3. **全体回帰テスト実行**:
   - `make build && npm test` を実行し、既存テストスイートへの影響がないことを検証。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `issues/closed/*.md` 内のすべての絶対パスリンク (`file:///...`) が適切な相対パス表記に変換されていること。
- [x] `python3 scripts/check_relative_paths.py` が 0 件違反でパスし、Exit Code 0 を返却すること。
- [x] `make build` および `npm test` がエラーゼロで完全成功すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA & AU)**: パス変換ルールの適用結果を事前確認し、設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 項目の検証を行い、適合判定【PASS】を付与。
