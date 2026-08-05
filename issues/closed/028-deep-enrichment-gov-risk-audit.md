---
ID: 028
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語解説の個別具体化・ディープリファイン (Phase 5-3: ガバナンス・リスク・監査・運用分野) (ID: 028)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` における「ガバナンス・リスクアセスメント・情報セキュリティ監査・インシデント運用」分野の用語解説について、10大スペシャリスト（AU, SM, PM, QAエージェント）の知見に基づき具体的規格（JIS Q 27001:2023, NIST SP 800-53/61, ISO/IEC 27035）、監査手続き、フォレンジック順序（RFC 3227）を明記した高解像度記述へ更新する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/master_quality_enhancement_roadmap.md`（Phase 5-3）
- IPA公式シラバス Ver.2.1 / Ver.4.0 ガバナンス・リスク・監査セキュリティ領域

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/028-deep-enrichment-gov-risk-audit`

1. **AU / SM / PM / QA 専門用語の抽出と精緻化**:
   - ガバナンス / ISMS: JIS Q 27001:2023 箇条・附属書A（93の管理策）、JIS Q 27002, 適用宣言書(SoA)作成要領.
   - 監査 / ガイドライン: システム監査基準 / 管理基準（経済産業省）、保証型監査と助言型監査、SOC 1 / SOC 2 Type II 報告書, NIST SP 800-53 Rev. 5.
   - 運用 / フォレンジック: CSIRT / PSIRT（ISO/IEC 27035）、インシデント対応ライフサイクル（NIST SP 800-61 Rev. 2）、揮発性順序（RFC 3227）、Chain of Custody（証拠保全）、WORM媒体.
2. **自動品質監査**:
   - `python3 scripts/audit_glossary_quality.py` で品質合格を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] ガバナンス・リスク・監査分野の用語解説に具体的規格名・ガイドライン・標準化団体が明記されていること
- [x] スクリプトによる品質監査で合格ステータスが維持されていること
