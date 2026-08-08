# [FEAT/QA] package.json への test:relative-paths コマンド追加統合と npm test 実行時の相対パスガバナンス自動アサーション常時化 (ID: 108)

## メタデータ

- **ID**: 108
- **種別**: Feature / Governance
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: QA (`software-quality-assurance-specialist`) & AU (`systems-auditor`)
- **ターゲットブランチ**: `feat/108-add-relative-paths-test-to-package-json`

---

## 1. 概要 / Summary

プロジェクト標準規定 (`AGENTS.md` の "Documentation & Link Rules") である「絶対パスリンク排斥・完全相対パス化ルール」をCI/CDおよび日常の開発テストプロセスで自動アサートするため、`package.json` に `"test:relative-paths": "python3 scripts/check_relative_paths.py"` を追加統合し、`npm test` の一発実行で相対パスガバナンス（違反 0 件アサーション）が常時検証される仕組みを確立します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `package.json`**:
   - `scripts` 内に `"test:relative-paths": "python3 scripts/check_relative_paths.py"` を追加。
   - `"test"` スクリプトに `npm run test:relative-paths` を組み込み。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。`npm test` 実行時にガバナンスアサーションが追加され、リンク切れや環境依存問題が未然に防がれる。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`package.json` 内のビルド・テストスクリプト定義の追加のみ。
3. **③ セキュリティ・ガバナンス影響**: ローカル絶対パス (`file:///workspace/...`) の漏出を CI/CD および手動テスト段階で全自動ブロック。
4. **④ 品質・回帰テスト影響**: 既存の全ユニットテスト・ビルド完全性アサーションに悪影響を与えることなくテスト自動化の網羅性が向上。
5. **⑤ 学習体験・UI/UX影響**: 教材・ドキュメントの相対参照が常時担保され、閲覧者の学習体験を保護。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`package.json` の更新**:
   - `"test:relative-paths": "python3 scripts/check_relative_paths.py"` を追加。
   - `"test"` の実行チェーンに `npm run test:relative-paths` を先頭付近へ挿入。
2. **`verify-quality-gates` による一括品質検証**:
   - `make build`
   - `python3 scripts/check_relative_paths.py`
   - `npm test`
   - 全自動テストスイートが 100% PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `package.json` に `"test:relative-paths"` が定義され、`npm test` の実行の一部として自動実行されること。
- [x] `npm test` の一発実行で `check_relative_paths.py` が正常合格 (違反 0 件) して通ること。
- [x] Closure Compiler 最厳格コンパイル (`make build`) がエラー・警告 0 件で成功すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA & QA)**: `package.json` スクリプト構成とテストチェーン順序の妥当性を検証・設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 項目の検証を行い、適合判定【PASS】を付与。
