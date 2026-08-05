---
ID: 020
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語集の機械的プレースホルダー解消と用語解説の本格高品質化（Phase 1: 暗号・PKI・認証分野） (ID: 020)

## 1. 概要 / Summary
現状の用語集 (`docs/glossary/syllabus_ver2_1.md` 等) において、「〜の技術仕様、動作機構、およびセキュリティ運用上の解説。」といった機械的・抽象的なテンプレプレースホルダー文言が大量に残存しており、個別の用語解説として不十分である。
本 Issue では、品質と学習効果を高めるため専門ドメインごとに分割して順次改修を行う。Phase 1 として、支援士試験の超頻出分野である「暗号・PKI・鍵管理・認証・アクセス制御」関連の用語群について、概要・技術的特徴・支援士試験出題ポイントを含んだ実践的解説へ全面書き換えを行う。

---

## 2. トレーサビリティ / Traceability
- IPA公式シラバス Ver.2.1（中項目3-1: 暗号利用及び鍵管理、中項目3-8: アカウント管理及びアクセス管理）
- `project-docs/management_improvement_plan.md`（品質保証プロセス DoD の策定）
- `scripts/audit_glossary_quality.py`（用語集品質監査ルール）

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/020-refine-glossary-crypto-auth`

1. **品質監査スクリプトの厳格化**:
   - `scripts/audit_glossary_quality.py` の `ABSTRACT_PATTERNS` に `r"の技術仕様、動作機構、およびセキュリティ運用上の解説"` を追加し、プレースホルダー残存を自動検出させる。
2. **暗号・PKI関連用語（中項目 3-1）の改修**:
   - `共通鍵暗号(AES)`
   - `公開鍵暗号(RSA)`
   - `ハイブリッド暗号`
   - `暗号利用モード(ECB)`
   - `認証付き暗号(AEAD)`
   - `ハッシュ関数(SHA-2/3)`
   - `HMAC`
   - `デジタル署名`
   - `PKI(公開鍵基盤)`
   - `鍵管理`
   - `CRYPTREC暗号リスト`
   - `HSM / TPM`
   - `PFS(Perfect Forward Secrecy)`
   - 上記用語を単なる定義だけでなく「概要」「技術・運用ポイント」「支援士試験出題ポイント」の構成に刷新。
3. **アカウント管理・アクセス制御関連用語（中項目 3-8）の改修**:
   - `RBAC(ロールベースアクセス制御)`
   - `ABAC(属性ベースアクセス制御)`
   - `ID統合管理`
   - `特権アクセス管理(PAM)`
   - `職務分掌(SoD)`
   - `アカウントライフサイクル管理`
4. **検証と品質監査の合格確認**:
   - 改修した19項目について定型句違反ゼロおよび品質基準合格を確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 対象用語（暗号・PKI・認証関連19用語）から機械的なテンプレ文言が100%排除されていること
- [x] 各用語解説に「概要」「技術・運用ポイント」「支援士試験出題ポイント」が明記されていること
- [x] `scripts/audit_glossary_quality.py` の自動監査で改修対象項目の違反が解消されていること


