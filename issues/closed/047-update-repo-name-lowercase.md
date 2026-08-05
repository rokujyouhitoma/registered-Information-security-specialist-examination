---
ID: 047
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] リポジトリ名の小文字表記 (registered-information-security-specialist-examination) への統一更新 (ID: 047)

## 1. 概要 / Summary
GitHub 上のリポジトリ名変更（`registered-Information-security-specialist-examination` → 全小文字 `registered-information-security-specialist-examination`）に伴い、`README.md`、`site/index.html`、`scripts/` 内のパス指定、ドキュメント類におけるリポジトリ名・URL参照を一律で全小文字へ更新する。

---

## 2. トレーサビリティ / Traceability
- ユーザー指示「リポジトリ名がregistered-information-security-specialist-examinationに変更した。Iがiになった。」
- [README.md](../README.md)
- [site/index.html](../site/index.html)
- [scripts/convert_all_references_to_okf.py](../scripts/convert_all_references_to_okf.py)
- [scripts/verify_okf_coverage.py](../scripts/verify_okf_coverage.py)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [README.md](../README.md)
- [x] [site/index.html](../site/index.html)
- [x] [scripts/convert_all_references_to_okf.py](../scripts/convert_all_references_to_okf.py)
- [x] [scripts/verify_okf_coverage.py](../scripts/verify_okf_coverage.py)
- [x] [project-docs/writing_guide.md](../project-docs/writing_guide.md)
- [x] [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/047-update-repo-name-lowercase`

1. **文字列の一斉置換**:
   - `registered-Information-security-specialist-examination` を `registered-information-security-specialist-examination` に全置換。
2. **検証**:
   - `grep` で `registered-Information-security-specialist-examination` が 0 件になることを確認。
   - `npm test` が PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] リポジトリ内における旧大文字リポジトリ名表記が存在しないこと
- [x] `npm test` が成功すること
