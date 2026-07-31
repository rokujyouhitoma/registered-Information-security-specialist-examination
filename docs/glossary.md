---
title: "情報処理安全確保支援士試験 総合用語辞書 (Glossary)"
last_updated: "2026-07-31"
author: "Information Security Specialist Agent"
---

# 情報処理安全確保支援士試験 総合用語辞書 (Glossary)

本用語辞書は、IPA公式シラバス（Ver.2.1）および科目A-2追補版（Ver.4.0）に登場する主要なセキュリティ専門用語・略語・プロトコルの一覧と概要、および関連シラバス項目への相互参照リンクを提供する統合用語ベースです。

---

## 🔤 アルファベット順インデックス (A 〜 Z)

### A

#### AEAD (Authenticated Encryption with Associated Data / 認証付き暗号)
- **概要**: 暗号化による秘匿性と、メッセージ認証コード (MAC) による改ざん検知・送信元認証を同一アルゴリズムで同時に実現する暗号方式。
- **代表例**: GCM (Galois/Counter Mode), CCM.
- **関連シラバス**: [3-1 暗号技術](syllabus_detail.md#3-1-暗号技術)

#### ASM / EASM (Attack Surface Management / 外部攻撃表面管理)
- **概要**: 組織がインターネット上に露出している自社資産（IPアドレス、ドメイン、クラウドストレージ等）を継続的に発見・調査・リスク評価する運用概念。
- **関連シラバス**: [A2-24 攻撃表面管理 (ASM)](syllabus_tsuiho_detail.md#a2-24-攻撃表面管理-asm--easm)

---

### C

#### CASB (Cloud Access Security Broker)
- **概要**: ユーザーと複数のクラウドサービス (SaaS/PaaS) の間に割り込み、アクセス制御、シャドーIT検出、データ暗号化、DLPを一元適用するセキュリティ概念。
- **関連シラバス**: [A2-18 CASB / SWG 運用](syllabus_tsuiho_detail.md#a2-18-casb--swg-運用)

#### CSPM (Cloud Security Posture Management)
- **概要**: IaaS/PaaS環境の設定ミス（パブリック公開ストレージ、不適切なIAMポリシー等）やコンプライアンス違反を継続的に監視・自動是正する技術。
- **関連シラバス**: [A2-08 クラウドセキュリティポスチャ管理 (CSPM)](syllabus_tsuiho_detail.md#a2-08-クラウドセキュリティポスチャ管理-cspm)

---

### D

#### DMARC (Domain-based Message Authentication, Reporting, and Conformance)
- **概要**: SPFおよびDKIMによる認証結果を検証し、送信元ドメインの偽装が疑われるメールの処理方針 (none / quarantine / reject) を送信元が指定する認証技術。
- **関連シラバス**: [4-4 メールセキュリティ](syllabus_detail.md#4-4-メールセキュリティ)

---

### E

#### EDR / XDR (Endpoint / Extended Detection and Response)
- **概要**: PCやサーバー等のエンドポイント（XDRではNW/クラウド等も包含）の挙動ログを常時監視し、侵入後の脅威を即座に検知・孤立化・調査するソリューション。
- **関連シラバス**: [5-4 エンドポイントセキュリティ](syllabus_detail.md#5-4-エンドポイントセキュリティ)

---

### F

#### FAPI (Financial-grade API)
- **概要**: OAuth 2.0 / OpenID Connect をベースに、金融機関や高セキュリティ環境でのAPI連携に耐えうるようPKCE、mTLS、JWS等を必須化した高度安全規格。
- **関連シラバス**: [A2-10 APIセキュリティ](syllabus_tsuiho_detail.md#a2-10-apiセキュリティ)

#### FIDO2 / WebAuthn
- **概要**: 公開鍵暗号技術と生体認証（指紋・顔）等を組み合わせ、ネットワーク上にパスワードを流すことなくWebサイトへのログインを実現する標準規格。
- **関連シラバス**: [A2-17 FIDO2 / WebAuthn](syllabus_tsuiho_detail.md#a2-17-fido2--webauthn-パスワードレス認証)

---

### G

#### GCM (Galois/Counter Mode)
- **概要**: 共通鍵ブロック暗号（AES等）の利用モードの一種。カウンターモード (CTR) による高速暗号化とガロア体演算による認証タグ生成を並行処理するAEAD方式。
- **関連シラバス**: [3-1 暗号技術](syllabus_detail.md#3-1-暗号技術)

---

### P

#### PKCE (Proof Key for Code Exchange)
- **概要**: OAuth 2.0認可コードグラントフローにおいて、認可コード横取り攻撃を防ぐため動的に生成した検証コード (code_verifier / code_challenge) を用いる拡張仕様。
- **関連シラバス**: [3-3 認証技術](syllabus_detail.md#3-3-認証技術)

#### PQC (Post-Quantum Cryptography / 耐量子計算機暗号)
- **概要**: ショアのアルゴリズムを搭載した将来の量子コンピュータでも解読できないよう、格子暗号や多項式暗号等の数学的難問に基づく次世代公開鍵暗号体系。
- **関連シラバス**: [A2-11 耐量子計算機暗号 (PQC)](syllabus_tsuiho_detail.md#a2-11-耐量子計算機暗号-pqc--cryptrec)

---

### S

#### SAML 2.0 (Security Assertion Markup Language)
- **概要**: HTTPおよびXMLをベースに、IdP (Identity Provider) と SP (Service Provider) 間で認証・認可情報をトークン（アサーション）として伝送するSSO標準規格。
- **関連シラバス**: [3-3 認証技術](syllabus_detail.md#3-3-認証技術)

#### SASE (Secure Access Service Edge)
- **概要**: ネットワーク機能 (SD-WAN) とセキュリティ機能 (SWG, CASB, ZTNA, FWaaS) をクラウド型プラットフォームとして包括統合した次世代アーキテクチャ。
- **関連シラバス**: [A2-02 SASE / SSE](syllabus_tsuiho_detail.md#a2-02-sase-secure-access-service-edge--sse)

#### SBOM (Software Bill of Materials / ソフトウェア部品表)
- **概要**: ソフトウェアに含まれるオープンソースライブラリやコンポーネントの名称、バージョン、依存関係、ライセンス情報を機械可読形式 (SPDX, CycloneDX) で一覧化した構成表。
- **関連シラバス**: [A2-03 SBOM (Software Bill of Materials)](syllabus_tsuiho_detail.md#a2-03-sbom-software-bill-of-materials)

#### SCIM (System for Cross-domain Identity Management)
- **概要**: IDaaSや社内Directory間において、ユーザーアカウントの作成・更新・削除（プロビジョニング）をREST/JSONで自動同期するための標準プロトコル。
- **関連シラバス**: [A2-16 IDプロビジョニング・SCIM](syllabus_tsuiho_detail.md#a2-16-idプロビジョニング・scim)

#### SOAR (Security Orchestration, Automation and Response)
- **概要**: 様々なセキュリティツール（SIEM, EDR, FW）からのアラートを収集し、あらかじめ定義したプレイブックに従って脅威の分析・一次対応・遮断を自動化する技術。
- **関連シラバス**: [A2-05 SOAR](syllabus_tsuiho_detail.md#a2-05-soar-security-orchestration--automation)

#### STIX / TAXII
- **概要**: 脅威インテリジェンス情報（IOC, 攻撃手法, 攻撃者情報）を表現する標準XML/JSON仕様 (STIX) と、それをHTTPSで自動交換・配信するための送信プロトコル (TAXII)。
- **関連シラバス**: [A2-06 Threat Intelligence](syllabus_tsuiho_detail.md#a2-06-threat-intelligence-stixtaxii)

---

### Z

#### Zero Trust Architecture (ゼロトラストアーキテクチャ / NIST SP 800-207)
- **概要**: 「ネットワーク境界の内部も信頼しない」という原則に基づき、すべての通信とリクエストに対してユーザー・端末の動的認証・最小権限の認可を継続的に評価する設計概念。
- **関連シラバス**: [A2-01 ゼロトラストアーキテクチャ](syllabus_tsuiho_detail.md#a2-01-ゼロトラストアーキテクチャ-nist-sp-800-207)
