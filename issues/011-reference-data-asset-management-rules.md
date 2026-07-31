---
ID: 011
種別: Documentation
優先度: Low
ステータス: In Progress
---

# [FEAT/ENH] 一次情報 (references/*) および検証スクリプトの管理規約策定 (ID: 011)

## 1. 概要 / Summary
IPA公式PDFなどの一次情報（`references/`）の保管・命名規則を定め、データ抽出用の中間テキストファイルや一時検証スクリプトの整理ルール（`scratch/` のクリア規約および `.gitignore`）を策定する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目7)
  - [references/README.md](../references/README.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [references/README.md](../references/README.md)
- [ ] `.gitignore`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/011-reference-data-asset-management-rules`

1. **`references/README.md` の整備**:
   - IPA公式PDF（シラバス、過去問、採点講評等）の格納ルール、命名フォーマット（`syllabus_<exam>_ver<X_Y>.pdf`）、ライセンス・著作権留意事項を明記。
2. **スクラッチスクリプト・中間データの整理規約**:
   - `scratch/` に一時生成した `.txt`, `.py` などのスクラッチファイルの取り扱い規約を作成。
   - `.gitignore` に一時生成物の除外ルールを反映。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `references/README.md` に一次情報の保管規約と命名ルールが追記されること
- [ ] `.gitignore` が更新され、一次検証用の中間ファイルが Git 汚染を起こさない仕様になっていること
