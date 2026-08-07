# 用語集継続的品質改修ロードマップ & 人間代行多層化自動QA監査計画書 (Glossary Refinement Roadmap & Multi-Stage Automated QA Framework)

Document ID: `QUAL-03-glossary_refinement_plan`

本ドキュメントは、**情報処理安全確保支援士試験コンテンツ制作プロジェクト**における用語集（`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md`）の解説を全 11 エージェントの専門的知見を反映して最新化し、人間代行多層化自動品質保証 (QA) スクリプトにより全自動で品質監査するためのロードマップおよび設計規定書です。

---

## 👂 1. 全 11 エージェントヒアリング調査 & 最重要改善提案

### 1.1 全エージェント聞き取りマトリクス (Agent Hearing Findings)
PM がプロジェクト内の全 11 エージェントから専門視点での課題と要望を集約した結果は以下の通りです。

| エージェント | 専門分野 | ヒアリングによる現状課題と改善要望 |
|---|---|---|
| **SC** (セキュリティ) | 全体セキュリティ | 用語集の「暗号・認証」分野は改修完了しているが、Webセキュリティ・セキュアプログラミング用語の実践的解説がまだ一部簡易的な表現にとどまる。 |
| **NW** (ネットワーク) | NWセキュリティ | TLS 1.3、IPsec、DNSSEC、SPF/DMARC 等の解説を、構成図やシーケンス図 (Mermaid) と組み合わせた視覚的理解構造へ向上させたい。 |
| **DB** (データベース) | DBセキュリティ | SQL インジェクション対策、DB 暗号化、DSPM、IndexedDB セキュア運用の解説精緻化が必要。 |
| **ST** (アーキテクチャ) | クラウド & IAM | NIST SP 800-207 (ゼロトラスト)、S3/VPC/IAM リスク、OAuth 2.0/OIDC フローの実践的アーキテクチャ記述の追加。 |
| **EP** (組込みシステム) | IoT & OT | IoT 端末セキュリティ、Firmware Update、OT/ICS (IEC 62443) の専門記述の強化。 |
| **SM** (サービスマネジメント) | ITSM & インシデント | CSIRT / SOC のインシデントハンドリング、ログ解析、SIEM、SOAR 運用解説の充実。 |
| **STR** (ITストラテジスト) | セキュリティ戦略・BCP | 経営セキュリティガイドライン、BCP/DR、サプライチェーンリスク (SCRM) の専門定義強化。 |
| **UIUX** (UI/UXデザイン) | UI/UX & アクセシビリティ | 用語辞書個別ページ (`terms/*.html`) や検索画面におけるアクセシビリティ (WCAG 2.1) と可読性の担保。 |
| **QA** (品質保証) | 自動テスト・品質検証 | `scripts/audit_glossary_quality.py` スクリプトを拡張し、全 2,101 用語の品質規準 Ver.4.0（禁忌フレーズゼロ）を CI/CD で自動監査したい。 |
| **AU** (システム監査人) | 監査・ガバナンス | 全用語の改修状況およびトレーサビリティを完全数値化し、監査合格証明を自動生成したい。 |
| **PM** (プロジェクトマネージャー) | 全体管理 & DoD判定 | 全エージェントが連携し、用語集 Phase 2 (残全ドメイン) の改修と自動 QA 監査を一括で完成させることが最高インパクトである。 |

---

### 1.2 PM 提案：最重要改善項目 (Single Consolidated Priority Proposal)

> **【最重要改善提案】**
> **「用語集改修 Phase 2 の全ドメイン (DB, Webセキュリティ, クラウド, インシデント対応) の一括精緻化と、全自動マルチエージェント QA 品質監査システムの構築」**

- **提案目的**: 全 2,101 用語の品質規準 Ver.4.0 を完全適用し、全自動 QA テスト (`npm run test:audit`) による継続的品質保証を達成する。

---

## 👥 2. 関与エージェントと RACI 役割分担

本提案を完了するために、全 11 エージェントが以下の RACI マトリクスに従って連携します。

| エージェント | 担当専門領域 | RACI 区分 | 具体的なタスク内容 |
|---|---|:---:|---|
| **`information-security-specialist` (SC)** | Webセキュリティ・暗号 | **R** (実行責任) | OWASP Top 10、セキュアコーディング、暗号化の解説執筆・監修 |
| **`network-specialist` (NW)** | ネットワーク・通信 | **R** (実行責任) | TLS 1.3, IPsec, DNSSEC, DMARC の解説執筆・Mermaid図の提供 |
| **`database-specialist` (DB)** | DB・データ保護 | **R** (実行責任) | SQLi 防御, DB暗号化, DSPM の解説執筆 |
| **`systems-architect` (ST)** | クラウド・IAM・基盤 | **R** (実行責任) | ゼロトラスト, IAM, SAML/OAuth, CSPM の解説執筆 |
| **`embedded-systems-specialist` (EP)** | IoT・OTセキュリティ | **R** (実行責任) | IoT端末, 開発セキュリティ, IEC 62443 の解説執筆 |
| **`information-technology-service-manager` (SM)** | ITSM・ログ運用 | **R** (実行責任) | CSIRT, SOC, SIEM, インシデント対応の解説執筆 |
| **`information-technology-strategist` (STR)** | 戦略・BCP | **R** (実行責任) | ガバナンス, BCP/DR, SCRM の解説執筆 |
| **`ui-ux-designer` (UIUX)** | UI/UX・アクセシビリティ | **R** (実行責任) | 用語ページのレイアウト視認性・WCAG 2.1 適合の設計 |
| **`software-quality-assurance-specialist` (QA)** | 自動QAスクリプト | **R** (実行責任) | `scripts/audit_glossary_quality.py` の全自動テストスクリプト拡張 |
| **`systems-auditor` (AU)** | 最終監査・認証 | **A** (最終責任) | 全用語品質およびトレーサビリティの最終システム監査判定 |
| **`project-manager` (PM)** | 進捗管理・マージ承認 | **A** (最終責任) | WBS管理, Issueライフサイクル管理, `main` マージ判定 |

---

## 🗺️ 3. 用語集改修フェーズ別進捗ロードマップ

| Phase | 対象ドメイン | 主な解説キーワード例 | ステータス | 担当 Issue |
| :---: | :--- | :--- | :---: | :---: |
| **Phase 1** | 暗号・PKI・鍵管理・認証 | AES, RSA, AEAD, SHA-2/3, HMAC, PKI, PFS, RBAC, ABAC, PAM, SoD | **完了** | [#020](../issues/closed/020-refine-glossary-explanations-crypto-auth.md) |
| **Phase 2-1** | ネットワーク・通信セキュリティ | TLS 1.3, IPsec, DNSSEC, SPF/DKIM/DMARC, FW, WAF, IDS/IPS, WPA3 | **完了** | [#021](../issues/closed/021-refine-glossary-network-security.md) |
| **Phase 2-2** | DB, Webセキュア, クラウド, インシデント, IoT | SQLi, XSS, CSRF, AWS S3/IAM, CSIRT, SIEM, IEC 62443, BCP | **完了 (本Issue)** | [#068](../issues/closed/068-glossary-phase2-refinement-and-qa-automation.md) |

---

## 🤖 4. 全自動マルチエージェント QA 品質監査システム (`audit_glossary_quality.py`)

`npm run test:audit` を実行することで、以下の 4 大厳格品質検査項目が自動検証されます。

1. **禁忌フレーズ・機械的テンプレート文言の完全自動排除** (「〜に関する標準的な技術定義」等)
2. **用語解説文字数の十分性判定** (各項目の実効テキスト長が一定基準を満たしていること)
3. **セキュア技術規準・一次情報トレース判定**
4. **全 2,101 用語の適合率 100% 達成検証**
