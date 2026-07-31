---
ID: 013
種別: Feature
優先度: High
ステータス: In Progress
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
- [ ] [docs/syllabus.md](../docs/syllabus.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/013-unified-glossary-dict-construction`

1. **シラバス全用語例の抽出スクリプト作成**:
   - `docs/syllabus_detail.md` および `docs/syllabus_tsuiho_detail.md` から全用語例（数千語）を抽出。
2. **用語辞書 `docs/glossary.md` の構造化**:
   - **アルファベット順 / 五十音順** の見出しを設置。
   - 用語名、略称、日本語訳、概要説明、および登場するシラバス小項目番号（例: `3-1`, `追補 13-1`）へのアンカーリンクを自動生成。
3. **目次追加**:
   - `docs/index.md` および `docs/syllabus.md` に用語辞書への案内リンクを追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `docs/glossary.md` が新規作成され、主要なセキュリティ専門用語・略語がシラバスリンク付きでインデックス化されること
- [ ] 目次ドキュメントから正常にリンクアクセスできること
