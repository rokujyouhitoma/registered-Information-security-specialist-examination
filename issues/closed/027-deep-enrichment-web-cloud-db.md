---
ID: 027
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語解説の個別具体化・ディープリファイン (Phase 5-2: Web・App・クラウド・DB・DevSecOps分野) (ID: 027)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` における「Webアプリケーションセキュリティ・クラウド・DB・開発・DevSecOps」分野の用語解説について、10大スペシャリスト（SA, DB, ST, ESエージェント）の知見に基づき具体技術（SQLiバインドメカニズム, CSP/CORSヘッダー, JWTアルゴリズム, ISMAP評価基準, SBOM標準SPDX/CycloneDX, TDE暗号化）を盛り込んだ高解像度記述へ更新する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/master_quality_enhancement_roadmap.md`（Phase 5-2）
- IPA公式シラバス Ver.2.1 / Ver.4.0 アプリケーション・クラウド・DBセキュリティ領域

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/027-deep-enrichment-web-cloud-db`

1. **SA / DB / ST / ES 専門用語の抽出と精緻化**:
   - Web / App: SQLi（プレースホルダ/バインド機構）、XSS（Context-Aware Escaping / CSP）、CSRF（SameSite Cookie / CSRF Token）、CORS（Access-Control-Allow-Origin）、JWT（rs256 vs hs256 / none攻撃）。
   - クラウド / 開発: ISMAP、責任共有モデル、DevSecOps（シフトレフト）、SBOM（SPDX / CycloneDX）、IaC（Terraform / CloudFormation）、コンテナセキュリティ（Distroless / Rootless）。
   - DB: TDE (Transparent Data Encryption), RBAC/ABAC (NST SP 800-207).
2. **自動品質監査**:
   - `python3 scripts/audit_glossary_quality.py` で品質合格を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] Web・クラウド・DB分野の用語解説に具体的技術名・ヘッダー名・パッチ適用ポイントが明記されていること
- [x] スクリプトによる品質監査で合格ステータスが維持されていること
