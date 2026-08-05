---
ID: 022
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 用語集の機械的プレースホルダー解消と用語解説の本格高品質化（Phase 2-2: Web・アプリケーション・開発セキュリティ分野） (ID: 022)

## 1. 概要 / Summary
用語集の品質改善ロードマップに基づき、Phase 2-2 として「Web・アプリケーション・セキュアプログラミング・セキュリティテスト・開発環境（XSS, SQLi, CSRF, OSコマンドインジェクション, ディレクトリトラバーサル, BOF, Cookie Secure属性, セッション固定攻撃, SAST/DAST, ファジング, 脆弱性診断, ペネトレーションテスト, CI/CDセキュリティ等）」に関する用語群のプレースホルダー文言を撤廃する。
各用語に対し、概要・技術運用ポイント・支援士試験出題ポイントを含めた実践的な解説構造へ書き換える。

---

## 2. トレーサビリティ / Traceability
- IPA公式シラバス Ver.2.1（中項目2-5: セキュアプログラミング、中項目2-6: セキュリティテスト、中項目2-8: 開発環境のセキュリティ）
- `project-docs/management_improvement_plan.md`（品質保証プロセス DoD の策定）
- `scripts/audit_glossary_quality.py`（用語集品質監査ルール）

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/022-refine-glossary-web-dev-security`

1. **対象用語の特定と解説作成（中項目 2-5, 2-6, 2-8）**:
   - `XSS(Cross-Site Scripting)`
   - `SQLインジェクション`
   - `CSRF(Cross-Site Request Forgery)`
   - `OSコマンドインジェクション`
   - `ディレクトリトラバーサル`
   - `バッファオーバーフロー`
   - `Cookie属性(Secure)`
   - `セッション固定攻撃対策`
   - `入力バリデーション`
   - `出力エスケープ`
   - `ソースコード静的検査(SAST)`
   - `プログラム動的検査(DAST)`
   - `ファジング(Fuzzing)`
   - `脆弱性診断`
   - `ペネトレーションテスト`
   - `開発プロセスセキュリティ`
   - `CI/CDパイプラインセキュリティ`
2. **解説の構造化**:
   - 定型フレーズを完全に排除し、「概要」「技術・運用ポイント」「支援士試験出題ポイント」の3層構造へ刷新。
3. **品質検証**:
   - 該当17項目について定型文違反解消と品質合格を確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 対象用語（Web・開発セキュリティ17用語）から機械的なテンプレ文言が100%排除されていること
- [x] 各用語解説に「概要」「技術・運用ポイント」「支援士試験出題ポイント」が明記されていること
- [x] `scripts/audit_glossary_quality.py` の自動監査で該当項目の違反が解消されていること
