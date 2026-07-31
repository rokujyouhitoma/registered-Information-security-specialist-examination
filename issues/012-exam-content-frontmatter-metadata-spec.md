---
ID: 012
種別: Feature
優先度: Medium
ステータス: In Progress
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
- [ ] `docs/template_article.md`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/012-exam-content-frontmatter-metadata-spec`

1. **標準 YAML Frontmatter スキーマの規定**:
   ```yaml
   ---
   title: "記事の正式タイトル"
   syllabus_code: "3-1" # シラバス小項目番号 (Ver.2.1 または 追補版)
   exam_type:
     - "A-2" # 科目A-2 (四肢択一知識)
     - "B"   # 科目B (午後実務記述分析)
   difficulty: "Advanced" # Basic / Intermediate / Advanced
   tags:
     - "暗号方式"
     - "GCM"
     - "午後記述頻出"
   last_updated: "2026-07-31"
   author: "Database Specialist Agent"
   ---
   ```

2. **`project-docs/writing_guide.md` への組み込み**:
   - 「第2章：記事メタデータ標準仕様」を追加し、Frontmatter の必須/任意フィールドを解説。

3. **サンプル記事 `docs/template_article.md` の作成**:
   - 仕様に基づく雛形記事を作成。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `project-docs/writing_guide.md` に YAML Frontmatter 仕様が定義されていること
- [ ] テンプレート記事 `docs/template_article.md` が作成され、パース可能であること
