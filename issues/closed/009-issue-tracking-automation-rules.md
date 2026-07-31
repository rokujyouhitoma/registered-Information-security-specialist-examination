---
ID: 009
種別: Feature
優先度: Medium
ステータス: Closed
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
- [x] [issues/README.md](../issues/README.md)
- [x] `scripts/sync_issues_ledger.py`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/009-issue-tracking-automation-rules`

1. **Issue 台帳自動同期スクリプト `scripts/sync_issues_ledger.py` の開発**:
   - **機能仕様**:
     - `issues/`（アクティブ）および `issues/closed/`（完了済み）をスキャン。
     - 各ファイルの YAML Frontmatter（`ID`, `種別`, `優先度`, `ステータス`）および `# ` タイトル行を抽出。
     - 重複する ID が検知された場合はエラーを出力して中断。
     - ID 順（001, 002, 003...）に並び替え、[issues/README.md](../issues/README.md) の「1. アクティブ Issue 一覧」「2. 完了済み Issue 一覧」を完全フォーマット再生する。
   - **入力検証ルール**:
     - ID が 3 桁の数字 (`001`, `002` 等) であること。
     - ファイル名が `<ID>-<title>.md` 形式に一致すること。

2. **実行方法とスクリプトのテスト**:
   - `python3 scripts/sync_issues_ledger.py` を実行し、`issues/README.md` が差分なく正しく出力されることを検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `scripts/sync_issues_ledger.py` が作成され、`issues/README.md` の全テーブルを自動生成できること
- [x] ID の重複やファイル名のフォーマット不正を自動検知して判定エラーを出せること
- [x] スクリプトの実行により台帳データの整合性が 100% 保持されること
