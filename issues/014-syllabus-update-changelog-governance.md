---
ID: 014
種別: Process
優先度: Low
ステータス: In Progress
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
- [ ] [project-docs/processes/syllabus_update_process.md](../project-docs/processes/syllabus_update_process.md)
- [ ] `CHANGELOG.md`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/014-syllabus-update-changelog-governance`

1. **シラバス改定追従手順書 `project-docs/processes/syllabus_update_process.md` の策定**:
   - **ステップ 1 (情報収集)**: IPA公式Webサイト（年2回の定期確認）から新版シラバスPDFおよび変更箇所表示版を取得し `references/` へ格納。
   - **ステップ 2 (差分解析)**: スクリプト等を用いて大分類・中分類・小分類・用語例の追加・削除差分を特定。
   - **ステップ 3 (ドキュメント更新)**: `docs/syllabus_detail.md` または `docs/syllabus_tsuiho_detail.md` を更新。
   - **ステップ 4 (影響調査)**: `docs/` 配下の既存学習ドキュメントへの影響を調査し修整Issueを起票。

2. **`CHANGELOG.md` の作成**:
   - Keep a Changelog 基準に従い、リポジトリルートに `CHANGELOG.md` を配置。
   - これまでの実施内容（v1.0.0: IPAシラバス2.1準拠、v1.1.0: 追補版4.0詳細作成、v1.2.0: エージェント定義取り込み）を記載。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `project-docs/processes/syllabus_update_process.md` が作成され、4ステップの追従手順が明確に記述されていること
- [ ] リポジトリ直下に `CHANGELOG.md` が追加され、これまでの変更履歴が記録されていること
