---
ID: 040
種別: Tooling
優先度: High
ステータス: Closed
---

# [TOOLING] トレーサビリティ自動検証スクリプトの追加 (Phase 15) (ID: 040)

## 1. 概要 / Summary
yuzora リポジトリの `scripts/verify-traceability.js` の設計思想に基づき、IPA公式シラバス (Ver.2.1) および科目A補足資料 (Ver.4.0) の要求小項目と `docs/glossary/` 配下の全 2,101 用語項目、および関連ドキュメントとのトレース整合性を自動で全数チェックするスクリプト `scripts/verify_traceability.js` を作成し、CI に統合する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 15）
- `docs/glossary/syllabus_ver2_1.md`
- `docs/glossary/syllabus_tsuiho_ver4_0.md`

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [scripts/verify_traceability.js](../scripts/verify_traceability.js)
- [x] [package.json](../package.json)
- [x] [.github/workflows/ci.yml](../.github/workflows/ci.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/040-verify-traceability-script`

1. **`scripts/verify_traceability.js` の作成**:
   - `docs/glossary/syllabus_ver2_1.md` および `syllabus_tsuiho_ver4_0.md` をパースし、用語見出し (`### `) の全数走査、ユニークID/アンカーの検証、および「概要」「技術・運用ポイント」「試験出題ポイント」の全セクション完全存在を検証。
2. **CI / テスト統合**:
   - `package.json` に `"test:traceability": "node scripts/verify_traceability.js"` を追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `node scripts/verify_traceability.js` が 100% 成功し、トレーサビリティ欠損ゼロが保証されること
