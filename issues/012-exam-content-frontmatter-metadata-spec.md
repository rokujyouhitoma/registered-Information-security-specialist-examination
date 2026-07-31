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
- [ ] `docs/**/*.md`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/012-exam-content-frontmatter-metadata-spec`

1. **標準 YAML Frontmatter スキーマの定義**:
   ```yaml
   ---
   title: "ドキュメントタイトル"
   syllabus_code: "3-5" # シラバス小項目番号
   exam_type: ["A-2", "B"] # 対象試験種別
   difficulty: "Advanced" # Basic, Intermediate, Advanced
   tags: ["TLS", "IPsec", "午後記述頻出"] # 検索用キーワードタグ
   last_updated: "2026-07-31"
   ---
   ```
2. **`writing_guide.md` の改訂**:
   - 上記スキーマを全学習コンテンツの必須テンプレートとして明記。
3. **サンプル記事の作成**:
   - 仕様に従ったサンプルドキュメントを作成して動作検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `writing_guide.md` に Frontmatter の必須スキーマ仕様が明記されること
- [ ] サンプル学習コンテンツに正しくメタデータが組み込まれ、パース可能であること
