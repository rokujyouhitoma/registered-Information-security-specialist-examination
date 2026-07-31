---
ID: 009
種別: Feature
優先度: Medium
ステータス: In Progress
---

# [FEAT/ENH] Issue 採番・追跡・自動化ルールの強化 (ID: 009)

## 1. 概要 / Summary
Issue 作成時の ID 重複や手動追記の手間を解消するため、`issues/` 内の全 Markdown ファイルから Issue 台帳 [issues/README.md](../issues/README.md) を自動更新・検証するスクリプトを構築し、採番ルールを標準化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目5)
  - [issues/README.md](../issues/README.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [issues/README.md](../issues/README.md)
- [ ] `scripts/sync_issues_ledger.py`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/009-issue-tracking-automation-rules`

1. **台帳自動更新スクリプト `scripts/sync_issues_ledger.py` の作成**:
   - `issues/*.md` および `issues/closed/*.md` をスキャンし、各ファイルの Frontmatter（`ID`, `種別`, `優先度`, `ステータス`）および 1 行目のタイトルを抽出。
   - `Open` / `In Progress` のアクティブ Issue と `Closed` の完了済み Issue に自動選別し、[issues/README.md](../issues/README.md) を自動フォーマット更新する。
2. **採番重複チェック機能の導入**:
   - IDの重複やフォーマット違反がある場合は警告・エラーを発生させる。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `scripts/sync_issues_ledger.py` を実行すると `issues/README.md` が正常に同期・生成されること
- [ ] 重複 ID や不正 Frontmatter に対する検出・警告機能が正常に動作すること
