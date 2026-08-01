---
ID: 008
種別: Refactor
優先度: Medium
ステータス: Closed
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
- [x] [project-docs/writing_guide.md](../project-docs/writing_guide.md)
- [x] `scripts/check_relative_paths.py`
- [x] ルート Markdown (`README.md`, `CHANGELOG.md`, `AGENTS.md`) および `.agents/` 配下の `.md` ファイル

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/008-enforce-relative-path-rules`

1. **`project-docs/writing_guide.md` の改訂**:
   - リンク・画像記述において `file:///workspace/`, `file:///root/`, `/workspace/...` などの絶対パス指定を厳禁とする規約を追加。
   - 実効ハイパーリンクとインラインコードでの説明文の記載区別を明記。
   - 正しい相対パス形式（例: `../references/syllabus_sc_ver2_1.pdf` または `../../docs/syllabus_detail.md`）の標準例および NG / OK 対比例を提示。

2. **相対パス自動チェック処理 `scripts/check_relative_paths.py` の拡張**:
   - スキャン範囲を `SCAN_DIRS = ["docs", "project-docs", "issues", "references", ".agents"]` およびリポジトリ直下の `.md` ファイル (`README.md`, `CHANGELOG.md`, `AGENTS.md` 等) に拡大。
   - 検出パターンとして Markdown リンク (`](file:///`, `](/workspace/`, `](/root/`) および HTML タグ (`href="..."`, `src="..."`) をサポート。
   - スキャン結果においてエラーが見つかった場合、ファイル名・行番号・違反内容を出力し、ステータス `1` で終了。

3. **自動テストおよびリポジトリ全件検証の実行**:
   - `python3 scripts/check_relative_paths.py` を実行し、全リポジトリで違反が0件であることを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `scripts/check_relative_paths.py` が拡張実装され、実行した際に正常終了 (Exit code 0) すること
- [x] `project-docs/writing_guide.md` に絶対パス禁止・相対パス指定ルール（NG/OK例）が記載されていること
- [x] リポジトリ内のすべての `.md` ファイルに実効絶対パスリンクが含まれていないこと
