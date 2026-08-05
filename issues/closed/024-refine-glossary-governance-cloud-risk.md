---
ID: 024
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語集の機械的プレースホルダー完全解消（Phase 2-4 & Phase 3: ガバナンス・リスク管理・クラウド・監査分野） (ID: 024)

## 1. 概要 / Summary
`syllabus_ver2_1.md` 内に残存するすべてのプレースホルダー項目（情報セキュリティガバナンス、ISMS, BCMS, リスクアセスメント STRIDE/ATA, リスク対応4分類, BCP/BCM, 情報セキュリティ監査, クラウド・AI・IoTセキュリティ等）について、10大スペシャリストエージェント協調QA基準に従い、概要・技術運用ポイント・試験出題ポイントの3層構造へ全面書き換えを行い、`syllabus_ver2_1.md` 内の違反件数をゼロにする。

---

## 2. トレーサビリティ / Traceability
- IPA公式シラバス Ver.2.1（大項目1: 情報セキュリティの基礎、大項目2: ガバナンス、大項目3: セキュリティ管理）
- `project-docs/glossary_refinement_plan.md`（10大スペシャリスト協調品質保証計画）
- `scripts/audit_glossary_quality.py`

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/024-refine-glossary-governance-cloud-risk`

1. **ガバナンス・リスク管理用語の改修 (中項目 1-1, 1-2, 1-3, 1-4, 1-5)**:
   - 情報セキュリティガバナンス、ITガバナンス、ISMS (JIS Q 27001)、BCMS (JIS Q 22301)、情報セキュリティ方針 (基本方針/対策基準/実施手順)
   - リスクアセスメント（特定/分析/評価）、STRIDE分析、アタックツリー分析(ATA)、リスクマトリクス、リスク対応4分類（低減/回避/共有/保有）、残留リスク
   - BCP/BCM、JIS Q 27002, 適用宣言書(SoA), ハードニング, クラウド・AI・IoTセキュリティ, 各種セキュリティ監査基準（保証型/助言型）
2. **多層化自動QA検証**:
   - `python3 scripts/audit_glossary_quality.py` を実行し、`syllabus_ver2_1.md` 内の違反数が 0 件になったことを全数走査により確認する。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `syllabus_ver2_1.md` 内のプレースホルダー違反件数が 100% ゼロ（完全解消）になっていること
- [x] 各改修用語に「概要」「技術・運用ポイント」「試験出題ポイント」が明記されていること
- [x] 10大エージェント協調QA判定基準を満たすこと
