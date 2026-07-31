---
ID: 008
種別: Refactor
優先度: Medium
ステータス: Open
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

1. **規約の明文化**:
   - `writing_guide.md` に相対パス指定ルールを記述。
2. **自動検出スクリプトの作成**:
   - リポジトリ内の `.md` ファイルを走査し、`file:///` や `/workspace/` を検知するテストスクリプトを作成。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 相対パス検証スクリプトが作成され、実行してエラーが検知されないこと
