---
ID: 026
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語解説の個別具体化・ディープリファイン (Phase 5-1: ネットワーク・通信・暗号分野) (ID: 026)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` における「ネットワーク・通信セキュリティ・暗号・認証」分野の用語解説について、抽象的な汎用フレーズを排し、10大スペシャリスト（NW, SCエージェント）の知見に基づき具体プロトコル（TLS 1.3, BGPsec, DNSSEC, WPA3）、ポート番号、暗号アルゴリズム（AES-GCM, RSA-2048, Ed25519）、過去問解法ポイントを明記した高解像度解説に書き換える。

---

## 2. トレーサビリティ / Traceability
- `project-docs/master_quality_enhancement_roadmap.md`（Phase 5-1）
- IPA公式シラバス Ver.2.1 / Ver.4.0 ネットワーク・暗号セキュリティ領域

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/026-deep-enrichment-network-crypto`

1. **NW / SC 専門用語の抽出と精緻化**:
   - TLS 1.3（0-RTT, Encrypted SNI / ECH, 鍵交換 ECDHE）, IPsec (IKEv2, ESP/AH, トンネル/トランスポートモード), DNSSEC (DS, RRSIG, DNSKEY), BGPsec, WPA3 (SAEハンズシェイク).
   - 暗号方式（AES-GCM, RSA, ECC, SHA-256/384, KDF, PQC耐量子暗号）、認証方式（OAuth 2.0, OpenID Connect, FIDO2/WebAuthn, SAML 2.0）.
2. **自動品質監査**:
   - `python3 scripts/audit_glossary_quality.py` で品質合格を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] ネットワーク・暗号分野の用語解説に具体的な数値・プロトコル名・アルゴリズムが明記されていること
- [x] スクリプトによる品質監査で合格ステータスが維持されていること
