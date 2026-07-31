---
ID: 012
種別: Feature
優先度: Medium
ステータス: Open
---

# [FEAT/ENH] 試験種別 (科目A/科目B)・難易度メタデータ (Frontmatter) の定義 (ID: 012)

## 1. 概要 / Summary
作成される全学習ドキュメントの冒頭に YAML Frontmatter メタデータを導入し、「科目A-2（知識・四肢択一）」向けか「科目B（技能・記述分析）」向けかの区分、難易度、およびキーワードタグ（`#午後記述頻出`等）を統一・標準化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目8)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [project-docs/writing_guide.md](../project-docs/writing_guide.md)
- [ ] `docs/**/*.md`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/012-exam-content-frontmatter-metadata-spec`

1. **Frontmatter スキーマの策定**:
   - `title`, `syllabus_code`, `exam_type` (`A-2`, `B`), `difficulty`, `tags` の定義フォーマットを作成。
2. **ガイドライン追記**:
   - `writing_guide.md` に標準 Frontmatter テンプレートを記載。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `writing_guide.md` に Frontmatter 仕様が定義され、サンプル記事が作成されること
