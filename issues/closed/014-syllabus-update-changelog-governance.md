---
ID: 014
種別: Process
優先度: Low
ステータス: Closed
---

# [FEAT/ENH] IPAシラバス改定追従プロセス & 変更履歴 (Changelog) の運用 (ID: 014)

## 1. 概要 / Summary
IPAによる年次のシラバス改定や追補版発表に対応するため、差分検知・インポート手順（`project-docs/processes/syllabus_update_process.md`）を定義し、プロジェクト全体の変更履歴を管理する `CHANGELOG.md` を導入する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目10)
  - [project-docs/processes/MNG-01-document_ledger.md](../project-docs/processes/MNG-01-document_ledger.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [project-docs/processes/syllabus_update_process.md](../project-docs/processes/syllabus_update_process.md)
- [x] `CHANGELOG.md`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/014-syllabus-update-changelog-governance`

1. **シラバス改定追従手順書 `project-docs/processes/syllabus_update_process.md` の改訂・強化**:
   - **ステップ 1 (情報収集 & 保存)**: 監視タイミング（年2回）、PDF取得手順、`references/` への格納と [references/README.md](../../references/README.md) の記録。
   - **ステップ 2 (差分解析 & OKF化)**: `convert_all_references_to_okf.py` による自動テキスト化、`verify_okf_coverage.py` による検証、既存 OKF との差分抽出。
   - **ステップ 3 (コアドキュメント & 用語辞書 & WBS の更新)**: `docs/syllabus_detail.md`, `docs/syllabus_tsuiho_detail.md`, `docs/glossary.md`, `project-docs/roadmap_wbs.md` への反映。
   - **ステップ 4 (影響調査 & 修正 Issue 起票)**: `docs/` 配下の既存ドキュメントへの影響調査、`create-issue` による起票、`CHANGELOG.md` への記録。
   - **ガバナンス & RACI 連携**: 情報処理安全確保支援士エージェント等の担当定義と品質ゲート（Quality Gate）判定の組み込み。

2. **`CHANGELOG.md` の運用確立とバージョン整理**:
   - Keep a Changelog 1.0.0 規格に完全に準拠。
   - セクション構成 (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`) の明確化。
   - これまでの実施内容を `[1.3.0] - 2026-08-01` として確定記録し、今後の更新運用ルールのガイドを追記。

3. **検証と Git ワークフロー**:
   - `python3 scripts/check_relative_paths.py` による相対パスの検証。
   - Issue 014 の `Closed` 移行および `issues/README.md` の更新。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `project-docs/processes/syllabus_update_process.md` が拡張・作成され、4ステップの追従手順およびスクリプト連携・品質ゲートが明確に記述されていること
- [x] リポジトリ直下に `CHANGELOG.md` が整備され、これまでの変更履歴および運用記載ルールが記録されていること
