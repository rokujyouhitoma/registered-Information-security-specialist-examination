---
title: "情報処理安全確保支援士試験 科目A-2 追補版Ver.4.0 用語辞書"
last_updated: "2026-08-01"
author: "Information Security Specialist Agent"
---

# 科目A-2 追補版Ver.4.0 用語辞書 (Glossary for Subject A-2 Supplement Ver.4.0)

本辞書は、IPA公式シラバス 科目A-2 追補版 Ver.4.0（全32小項目）に登場する最新のセキュリティテクノロジー、クラウド、ゼロトラスト、ガバナンス用語・キーワードを網羅抽出し、定義および参照リンクを整理したナレッジベースです。

---

## 🔤 最新テーマ別 用語一覧と定義

### 1. ゼロトラスト & クラウドセキュリティ

#### ASM / EASM (Attack Surface Management / 外部攻撃表面管理)
- **概要**: 組織がインターネット上に露出している自社資産（IPアドレス、ドメイン、クラウドストレージ、公開サービス等）を継続的に自動発見・調査・リスク評価する運用管理概念。
- **追補版参照**: [A2-24 攻撃表面管理 (ASM / EASM)](../syllabus_tsuiho_detail.md#a2-24-攻撃表面管理-asm--easm)

#### CASB (Cloud Access Security Broker)
- **概要**: ユーザーと複数のクラウドサービス (SaaS/PaaS) の間に割り込み、アクセス制御、シャドーIT検出、データ暗号化、DLPを一元適用するセキュリティサービス。
- **追補版参照**: [A2-18 CASB / SWG 運用](../syllabus_tsuiho_detail.md#a2-18-casb--swg-運用)

#### CSPM (Cloud Security Posture Management)
- **概要**: IaaS/PaaS環境の設定ミス（パブリック公開ストレージ、不適切なIAMポリシー等）やコンプライアンス違反を継続的に監視・自動是正する技術。
- **追補版参照**: [A2-08 クラウドセキュリティポスチャ管理 (CSPM)](../syllabus_tsuiho_detail.md#a2-08-クラウドセキュリティポスチャ管理-cspm)

#### SASE (Secure Access Service Edge) / SSE (Security Service Edge)
- **概要**: ネットワーク機能 (SD-WAN) とセキュリティ機能 (SWG, CASB, ZTNA, FWaaS) をクラウド型プラットフォームとして統合した次世代アーキテクチャ。セキュリティ機能群を独立させたものが SSE。
- **追補版参照**: [A2-02 SASE / SSE](../syllabus_tsuiho_detail.md#a2-02-sase-secure-access-service-edge--sse)

#### Zero Trust Architecture (ゼロトラストアーキテクチャ / NIST SP 800-207)
- **概要**: 「ネットワーク境界の内部も信頼しない」という原則に基づき、すべての通信とリクエストに対してユーザー・端末の動的認証・最小権限認可を継続的に評価する設計概念。
- **追補版参照**: [A2-01 ゼロトラストアーキテクチャ](../syllabus_tsuiho_detail.md#a2-01-ゼロトラストアーキテクチャ-nist-sp-800-207)

---

### 2. アイデンティティ & 高度認証技術

#### FAPI (Financial-grade API)
- **概要**: OAuth 2.0 / OpenID Connect をベースに、金融機関や高セキュリティ環境でのAPI連携に耐えうるようPKCE、mTLS、JWS等を必須化した高度安全規格。
- **追補版参照**: [A2-10 APIセキュリティ](../syllabus_tsuiho_detail.md#a2-10-apiセキュリティ)

#### FIDO2 / WebAuthn
- **概要**: 公開鍵暗号技術と生体認証（指紋・顔）等を組み合わせ、ネットワーク上にパスワードを流すことなくWebサイトへのログインを実現する標準規格。
- **追補版参照**: [A2-17 FIDO2 / WebAuthn](../syllabus_tsuiho_detail.md#a2-17-fido2--webauthn-パスワードレス認証)

#### SCIM (System for Cross-domain Identity Management)
- **概要**: IDaaSや社内Directory間において、ユーザーアカウントの作成・更新・削除（プロビジョニング）をREST/JSONで自動同期するための標準プロトコル。
- **追補版参照**: [A2-16 IDプロビジョニング・SCIM](../syllabus_tsuiho_detail.md#a2-16-idプロビジョニング・scim)

---

### 3. 次世代セキュリティ運用 & 開発セキュリティ

#### PQC (Post-Quantum Cryptography / 耐量子計算機暗号)
- **概要**: ショアのアルゴリズムを搭載した将来の量子コンピュータでも解読できないよう、格子暗号や多項式暗号等の数学的難問に基づく次世代公開鍵暗号体系。
- **追補版参照**: [A2-11 耐量子計算機暗号 (PQC)](../syllabus_tsuiho_detail.md#a2-11-耐量子計算機暗号-pqc--cryptrec)

#### SBOM (Software Bill of Materials / ソフトウェア部品表)
- **概要**: ソフトウェアに含まれるオープンソースライブラリやコンポーネントの名称、バージョン、依存関係、ライセンス情報を機械可読形式 (SPDX, CycloneDX) で一覧化した構成表。
- **追補版参照**: [A2-03 SBOM](../syllabus_tsuiho_detail.md#a2-03-sbom-software-bill-of-materials)

#### SOAR (Security Orchestration, Automation and Response)
- **概要**: 様々なセキュリティツール（SIEM, EDR, FW）からのアラートを収集し、あらかじめ定義したプレイブックに従って脅威の分析・一次対応・遮断を自動化する技術。
- **追補版参照**: [A2-05 SOAR](../syllabus_tsuiho_detail.md#a2-05-soar-security-orchestration--automation)

#### STIX / TAXII (脅威インテリジェンス標準)
- **概要**: 脅威インテリジェンス情報（IOC, 攻撃手法, 攻撃者情報）を表現する標準JSON仕様 (STIX) と、それをHTTPSで自動交換・配信するための送信プロトコル (TAXII)。
- **追補版参照**: [A2-06 Threat Intelligence](../syllabus_tsuiho_detail.md#a2-06-threat-intelligence-stixtaxii)
