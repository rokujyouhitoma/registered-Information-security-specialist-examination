# コンテンツ制作ロードマップ & WBS (Content Production Roadmap & WBS)

本ドキュメントは、情報処理安全確保支援士試験（SC）の全シラバス小項目（IPA公式Ver.2.1 29項目 ＋ 科目A-2追補版Ver.4.0 32項目 ＝ 計61項目）に対する学習コンテンツ（解説記事、午後記述対策解法、過去問演習）の制作優先度（Phase 1〜3）および具体目標スケジュール（WBS）を規定する開発ロードマップです。

---

## 1. 開発基本方針 & フェーズ定義

| フェーズ | 優先度 | 項目数 | 対象分野と選定理由 | 達成目標 (Milestone) |
|---|---|---|---|---|
| **Phase 1** | **最優先/重点** | 15 項目 | 午後記述試験（科目B）で毎期出出題され合否を分ける重要コア分野（暗号方式・PKI、Webセキュリティ・OWASP Top 10、IPsec/TLS、インシデントハンドリング/フォレンジック、ゼロトラスト/IAM） | 午後記述試験（科目B）の実務記述設問の8割以上をカバーする解法モデルの確立 |
| **Phase 2** | **標準/網羅** | 25 項目 | 科目A-2四肢択一および記述の共通知識分野（アカウント管理、ログ解析、クラウドセキュリティ、SBOM/SCRM、セキュリティ監査） | 科目A-2四肢択一知識問題および基本用語の100%カバー |
| **Phase 3** | **基礎/補完** | 21 項目 | 基礎概念・関連ガイドライン・物理セキュリティ分野（情報セキュリティ方針、法令、物理オフィスセキュリティ） | 全シラバス61項目の完全網羅化と相互参照用語辞書の完成 |

---

## 2. 全シラバス項目 WBS マトリックス (61項目)

### 2.1 IPA公式シラバス Ver.2.1 重点分野 (29小項目)

| シラバスコード | 小項目名 | 優先Phase | 対象試験種別 | 担当エージェント (RACI) | 想定成果物ファイルパス |
|---|---|---|---|---|---|
| **1-1** | 情報セキュリティの概念・CIA | Phase 3 | A-2 | `information-security-specialist` | `docs/01_concepts/cia_triad.md` |
| **1-2** | 脅威と脆弱性 | Phase 2 | A-2 / B | `information-security-specialist` | `docs/01_concepts/threats_vulnerabilities.md` |
| **1-3** | 事故前提社会とインシデント概念 | Phase 2 | A-2 / B | `information-technology-service-manager` | `docs/01_concepts/incident_concepts.md` |
| **2-1** | 情報セキュリティ方針・ガバナンス | Phase 3 | A-2 | `systems-auditor` | `docs/02_governance/policy_governance.md` |
| **2-2** | 情報セキュリティマネジメントシステム (ISMS) | Phase 2 | A-2 | `systems-auditor` | `docs/02_governance/isms_iso27001.md` |
| **2-3** | リスクマネジメント・リスクアセスメント | Phase 2 | A-2 / B | `systems-auditor` | `docs/02_governance/risk_assessment.md` |
| **3-1** | 暗号技術 (共通鍵・公開鍵・ハッシュ関数) | Phase 1 | A-2 / B | `information-security-specialist` | `docs/03_technology/cryptography_fundamentals.md` |
| **3-2** | 公開鍵基盤 (PKI) と証明書 | Phase 1 | A-2 / B | `information-security-specialist` | `docs/03_technology/pki_digital_signatures.md` |
| **3-3** | 認証技術 (多要素認証・SAML・OAuth) | Phase 1 | A-2 / B | `systems-architect` | `docs/03_technology/authentication_iam.md` |
| **3-4** | アクセス制御と権限管理 | Phase 2 | A-2 / B | `systems-architect` | `docs/03_technology/access_control.md` |
| **4-1** | ネットワークセキュリティ (IPsec/TLS/VPN) | Phase 1 | A-2 / B | `network-specialist` | `docs/04_network/ipsec_tls_vpn.md` |
| **4-2** | 境界防御 (FW/IDS/IPS/UTM) | Phase 1 | A-2 / B | `network-specialist` | `docs/04_network/firewall_ids_ips.md` |
| **4-3** | Webセキュリティ・OWASP Top 10 | Phase 1 | A-2 / B | `software-quality-assurance-specialist` | `docs/04_network/web_security_owasp.md` |
| **4-4** | メールセキュリティ (SPF/DKIM/DMARC) | Phase 1 | A-2 / B | `network-specialist` | `docs/04_network/email_security_dmarc.md` |
| **4-5** | DNSセキュリティ (DNSSEC/TSIG) | Phase 2 | A-2 / B | `network-specialist` | `docs/04_network/dns_security_dnssec.md` |
| **5-1** | OS・サーバーセキュリティ | Phase 2 | A-2 | `systems-architect` | `docs/05_system/os_server_hardening.md` |
| **5-2** | データベースセキュリティ (SQLi/暗号化) | Phase 1 | A-2 / B | `database-specialist` | `docs/05_system/database_security.md` |
| **5-3** | クラウドセキュリティ (SaaS/PaaS/IaaS) | Phase 1 | A-2 / B | `systems-architect` | `docs/05_system/cloud_security_ccm.md` |
| **5-4** | エンドポイントセキュリティ (EDR/EPP) | Phase 1 | A-2 / B | `information-security-specialist` | `docs/05_system/endpoint_security_edr.md` |
| **5-5** | モバイル・IoT・組込みセキュリティ | Phase 3 | A-2 | `embedded-systems-specialist` | `docs/05_system/iot_embedded_security.md` |
| **6-1** | セキュアプログラミング・コード検証 | Phase 2 | A-2 / B | `software-quality-assurance-specialist` | `docs/06_development/secure_programming.md` |
| **6-2** | 脆弱性診断・ペネトレーションテスト | Phase 2 | A-2 / B | `software-quality-assurance-specialist` | `docs/06_development/vulnerability_scanning.md` |
| **7-1** | インシデントハンドリング・CSIRT/SOC | Phase 1 | A-2 / B | `information-security-specialist` | `docs/07_operation/incident_handling_csirt.md` |
| **7-2** | ログ解析・SIEM | Phase 1 | A-2 / B | `information-technology-service-manager` | `docs/07_operation/log_analysis_siem.md` |
| **7-3** | デジタルフォレンジック | Phase 1 | A-2 / B | `information-security-specialist` | `docs/07_operation/digital_forensics.md` |
| **7-4** | BCP・事業継続性マネジメント | Phase 2 | A-2 / B | `information-technology-strategist` | `docs/07_operation/bcp_disaster_recovery.md` |
| **8-1** | セキュリティ関連法規・ガイドライン | Phase 3 | A-2 | `systems-auditor` | `docs/08_compliance/laws_regulations.md` |
| **8-2** | 物理・環境セキュリティ | Phase 3 | A-2 | `systems-auditor` | `docs/08_compliance/physical_security.md` |
| **8-3** | プライバシー・個人情報保護 | Phase 3 | A-2 | `systems-auditor` | `docs/08_compliance/privacy_gdpr.md` |

---

### 2.2 科目A-2追補版 Ver.4.0 追補分野 (32小項目)

| シラバスコード | 小項目名 | 優先Phase | 対象試験種別 | 担当エージェント (RACI) | 想定成果物ファイルパス |
|---|---|---|---|---|---|
| **A2-01** | ゼロトラストアーキテクチャ (NIST SP 800-207) | Phase 1 | A-2 / B | `systems-architect` | `docs/tsuiho/zero_trust_architecture.md` |
| **A2-02** | SASE (Secure Access Service Edge) / SSE | Phase 1 | A-2 / B | `network-specialist` | `docs/tsuiho/sase_sse_concepts.md` |
| **A2-03** | SBOM (Software Bill of Materials) | Phase 2 | A-2 / B | `software-quality-assurance-specialist` | `docs/tsuiho/sbom_management.md` |
| **A2-04** | SCRM (サプライチェーンリスクマネジメント) | Phase 2 | A-2 / B | `information-technology-strategist` | `docs/tsuiho/scrm_supply_chain.md` |
| **A2-05** | SOAR (Security Orchestration & Automation) | Phase 2 | A-2 / B | `information-technology-service-manager` | `docs/tsuiho/soar_automation.md` |
| **A2-06** | Threat Intelligence (STIX/TAXII) | Phase 2 | A-2 / B | `information-security-specialist` | `docs/tsuiho/threat_intelligence_stix.md` |
| **A2-07** | EDR/XDR ガバナンス | Phase 2 | A-2 / B | `information-security-specialist` | `docs/tsuiho/xdr_governance.md` |
| **A2-08** | クラウドセキュリティポスチャ管理 (CSPM) | Phase 2 | A-2 / B | `systems-architect` | `docs/tsuiho/cspm_cloud_posture.md` |
| **A2-09** | コンテナ・Kubernetes セキュリティ | Phase 2 | A-2 / B | `systems-architect` | `docs/tsuiho/container_k8s_security.md` |
| **A2-10** | APIセキュリティ (OAuth 2.1 / OIDC / FAPI) | Phase 1 | A-2 / B | `systems-architect` | `docs/tsuiho/api_security_fapi.md` |
| **A2-11** | 耐量子計算機暗号 (PQC) / CRYPTREC | Phase 2 | A-2 | `information-security-specialist` | `docs/tsuiho/pqc_post_quantum.md` |
| **A2-12** | 秘密計算・同形暗号 | Phase 3 | A-2 | `information-security-specialist` | `docs/tsuiho/privacy_preserving_computation.md` |
| **A2-13** | AI・LLM セキュリティ (OWASP for LLM) | Phase 2 | A-2 / B | `software-quality-assurance-specialist` | `docs/tsuiho/ai_llm_security.md` |
| **A2-14** | ランサムウェア対策・不変バックアップ | Phase 1 | A-2 / B | `information-security-specialist` | `docs/tsuiho/ransomware_immutable_backup.md` |
| **A2-15** | OT・ICS セキュリティ (IEC 62443) | Phase 3 | A-2 | `embedded-systems-specialist` | `docs/tsuiho/ot_ics_iec62443.md` |
| **A2-16** | IDプロビジョニング・SCIM | Phase 2 | A-2 / B | `systems-architect` | `docs/tsuiho/scim_identity_provisioning.md` |
| **A2-17** | FIDO2 / WebAuthn パスワードレス認証 | Phase 2 | A-2 / B | `systems-architect` | `docs/tsuiho/fido2_passwordless.md` |
| **A2-18** | CASB / SWG 運用 | Phase 2 | A-2 / B | `network-specialist` | `docs/tsuiho/casb_swg_operation.md` |
| **A2-19** | Microsegmentation | Phase 2 | A-2 / B | `network-specialist` | `docs/tsuiho/microsegmentation_network.md` |
| **A2-20** | CI/CD パイプライン・DevSecOps | Phase 2 | A-2 / B | `software-quality-assurance-specialist` | `docs/tsuiho/devsecops_cicd.md` |
| **A2-21** | サービスメッシュセキュリティ | Phase 3 | A-2 | `systems-architect` | `docs/tsuiho/service_mesh_security.md` |
| **A2-22** | インシデントレスポンス自動化プレイブック | Phase 2 | A-2 / B | `information-technology-service-manager` | `docs/tsuiho/ir_playbook.md` |
| **A2-23** | 脅威ハンティング (Threat Hunting) | Phase 2 | A-2 / B | `information-security-specialist` | `docs/tsuiho/threat_hunting.md` |
| **A2-24** | 攻撃表面管理 (ASM / EASM) | Phase 2 | A-2 / B | `information-security-specialist` | `docs/tsuiho/asm_attack_surface.md` |
| **A2-25** | データセキュリティガバナンス・DSPM | Phase 3 | A-2 | `database-specialist` | `docs/tsuiho/dspm_data_security.md` |
| **A2-26** | 個人情報保護法・改正法追従 | Phase 3 | A-2 | `systems-auditor` | `docs/tsuiho/japan_privacy_law.md` |
| **A2-27** | EU Cyber Resilience Act (CRA) | Phase 3 | A-2 | `systems-auditor` | `docs/tsuiho/eu_cra_compliance.md` |
| **A2-28** | 重要インフラセキュリティガイドライン | Phase 3 | A-2 | `information-technology-strategist` | `docs/tsuiho/critical_infrastructure.md` |
| **A2-29** | セキュリティ診断ガイドライン (IPA) | Phase 3 | A-2 | `software-quality-assurance-specialist` | `docs/tsuiho/ipa_vulnerability_guideline.md` |
| **A2-30** | クラウド監査ガイドライン | Phase 3 | A-2 | `systems-auditor` | `docs/tsuiho/cloud_audit_guideline.md` |
| **A2-31** | 暗号強度改善方針 (CRYPTREC) | Phase 3 | A-2 | `information-security-specialist` | `docs/tsuiho/cryptrec_guideline.md` |
| **A2-32** | セキュリティ経済性・ROI分析 | Phase 3 | A-2 | `information-technology-strategist` | `docs/tsuiho/security_economics_roi.md` |

---

## 3. マイルストーン & 進捗管理規約

1. **Phase 1 完了規約 (Milestone 1)**:
   - 最優先15項目の解説ドキュメントが完成し、午後記述試験設問キーワードおよび構成構成図（Mermaid）が含まれていること。
2. **Phase 2 完了規約 (Milestone 2)**:
   - 標準25項目の解説が完成し、共通知識問題が全カバーされていること。
3. **Phase 3 完了規約 (Milestone 3)**:
   - 全61小項目が完成し、総合用語辞書 (`docs/glossary.md`) と完全相互リンクされていること。
