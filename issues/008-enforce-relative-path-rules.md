---
ID: 008
種別: Refactor
優先度: Medium
ステータス: In Progress
---

# [FEAT/ENH] 絶対パス排除と相対パス表記ルールの厳格化 (ID: 008)

## 1. 概要 / Summary
ローカル環境依存の絶対パス（`file:///workspace/...`）がドキュメントや Issue 内に混入することを防止するため、執筆ガイドラインに「相対パス強制ルール」を明記し、リポジトリ全体を走査して絶対パスを自動検出・修正するスクリプトを導入する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目4)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [project-docs/writing_guide.md](../project-docs/writing_guide.md)
- [ ] `scripts/check_relative_paths.py`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/008-enforce-relative-path-rules`

1. **相対パスルールの明確化 (`project-docs/writing_guide.md`)**:
   - `file:///` や `/workspace/` などの絶対パス記法を禁止し、リポジトリ相対パスまたは完全相対パス (`../`, `./`) を使うルールを追加。
2. **自動検出Pythonスクリプト `scripts/check_relative_paths.py` の作成**:
   - `docs/`, `project-docs/`, `issues/`, `README.md` 内の全 `.md` ファイルを走査し、絶対パス（`file:///` 等）が含まれていた場合に該当ファイル名と行番号を表示して非ゼロで終了するチェック処理を実装。
3. **既存パスの動作検証**:
   - スクリプトを実行し、現在のリポジトリ全体でエラーが0件であることを自動テストする。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `scripts/check_relative_paths.py` が作成され、全 `.md` ファイルをエラーなしで走査完了すること
- [ ] `writing_guide.md` に絶対パス禁止・相対パス強制が規約として明記されること
