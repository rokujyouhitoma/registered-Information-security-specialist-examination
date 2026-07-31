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

1. **`references/README.md` の改訂**:
   - **保管対象基準**: IPA公式PDF、CRYPTRECリスト、NIST SP 800等の公式一次情報に限定。
   - **命名規約**: `syllabus_<shiken>_ver<major>_<minor>.pdf` (例: `syllabus_sc_ver2_1.pdf`)。
   - **著作権・引用注記**: 商業利用や改変に関する注意事項を記載。

2. **スクラッチスクリプト & 一時データ管理規約**:
   - PDF解析スクリプトや分析用中間ファイル（`.txt`, `.py`）は、作業中のみ `scratch/` または artifacts 内で利用。
   - **`.gitignore` の更新**:
     - `scratch/*`
     - `*.tmp`
     - `*.pdftotext.txt`

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `references/README.md` が作成され、保管規約・命名規則が明記されていること
- [ ] `.gitignore` に一時ファイル・スクラッチデータの除外設定が追記されていること
- [ ] リポジトリ直下に不要な一時生成スクリプトが残存していないこと
