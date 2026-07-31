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

1. **`project-docs/writing_guide.md` の改訂**:
   - リンク記述において `file:///workspace/` や `file:///root/` などの絶対パス指定を厳禁とする規約を追加。
   - 正しい相対パス形式（例: `../references/syllabus_sc_ver2_1.pdf` または `../../docs/syllabus_detail.md`）の標準例を提示。

2. **相対パス自動チェック処理 `scripts/check_relative_paths.py` の実装**:
   ```python
   import re
   import sys
   from pathlib import Path

   # 検出対象パターン
   ABSOLUTE_PATTERNS = [
       re.compile(r'file:///'),
       re.compile(r'/workspace/registered-Information-security-specialist-examination'),
       re.compile(r'/root/\.gemini/')
   ]

   def scan_file(filepath):
       violations = []
       with open(filepath, 'r', encoding='utf-8') as f:
           for idx, line in enumerate(f, 1):
               for pat in ABSOLUTE_PATTERNS:
                   if pat.search(line):
                       violations.append((idx, line.strip()))
       return violations
   ```
   - エラーが見つかった場合、ファイル名・行番号・違反内容を出力し、ステータス `1` で終了。

3. **自動テストの実行**:
   - `python3 scripts/check_relative_paths.py` を実行し、全リポジトリで違反が0件であることを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `scripts/check_relative_paths.py` が実装され、実行した際に正常終了 (Exit code 0) すること
- [ ] `project-docs/writing_guide.md` に絶対パス禁止・相対パス指定ルールが記載されていること
- [ ] リポジトリ内のすべての `.md` ファイルに絶対パスが含まれていないこと
