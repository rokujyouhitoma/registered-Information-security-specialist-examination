---
ID: 013
種別: Feature
優先度: High
ステータス: Open
---

# [FEAT/ENH] 全用語・略語を一元管理する用語辞書 (docs/glossary.md) の構築 (ID: 013)

## 1. 概要 / Summary
IPA公式シラバス（Ver.2.1 および 科目A-2追補版）に登場するすべての専門用語・略語（GCM, AEAD, SOAR, STIX, TAXII, SCRM, SBOM等）を一元検索・閲覧でき、該当シラバス項目への相互リンクを持つ総合用語辞書 `docs/glossary.md` を作成する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目9)
  - [docs/syllabus_detail.md](../docs/syllabus_detail.md)
  - [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [docs/glossary.md](../docs/glossary.md)
- [ ] [docs/index.md](../docs/index.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/013-unified-glossary-dict-construction`

1. **シラバス用語の抽出**:
   - `docs/syllabus_detail.md` および `docs/syllabus_tsuiho_detail.md` から全用語例（数千語規模）をインデックス抽出。
2. **用語辞書 `docs/glossary.md` の生成**:
   - アルファベット・五十音順の見出し、概要説明、シラバス番号へのリンク構造を持つ用語集を作成。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `docs/glossary.md` が作成され、主要な専門用語・略語のインデックスとリンクが登録されること
