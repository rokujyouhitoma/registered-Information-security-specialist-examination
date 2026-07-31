---
ID: 007
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 記事・問題コンテンツの品質保証プロセス (DoD) の策定 (ID: 007)

## 1. 概要 / Summary
作成される学習ドキュメントの誤情報・ハルシネーション・古くなった暗号規格の混入を防ぐため、IPA公式用語への完全適合、一次情報出典明記、午後記述対策キーワード強調を含む品質保証プロセスおよび Definition of Done (DoD) を策定する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目3)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [project-docs/quality_assurance_checklist.md](../project-docs/quality_assurance_checklist.md)
- [x] [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/007-content-quality-assurance-dod-process`

1. **品質保証チェックリスト `project-docs/quality_assurance_checklist.md` の策定**:
   - **1. IPA公式用語完全合致 (Strict IPA Syllabus Terminology)**:
     - シラバス Ver.2.1 および 追補版 Ver.4.0 に定義された用語・表記揺れなし（例: `共通鍵暗号` , `デジタル署名`, `送信元検証`）。
   - **2. 一次情報参照 (Authority & Provenance)**:
     - NIST SP 800シリーズ、CRYPTREC暗号リスト、RFC、IPA公式ガイドラインの一次情報リンクが明記されているか。
   - **3. 午後記述試験対策キーワード強調 (Exam Answer Keyword Highlighting)**:
     - 午後試験の採点基準となる必須キーワードが太字 (`**`) や引用ブロックで強調されているか。
   - **4. 技術的正確性とセキュリティ標準の検証**:
     - 非推奨暗号（DES, MD5, SHA-1等）を安全として紹介していないか。
     - コード例やプロトコルシーケンス（Mermaid図）に誤りがないか。
   - **5. パス記法とMarkdownフォーマット規約**:
     - 絶対パス (`file:///workspace/...`) が排除され、相対パス化されているか。

2. **`project-docs/writing_guide.md` の改訂**:
   - 「第5章：品質保証・レビューゲート (Quality Gate)」セクションを追加し、エージェント/執筆者が提出前にチェックリストをパスすることを規定。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `project-docs/quality_assurance_checklist.md` が作成され、全5分野のチェック項目が定義されること
- [ ] `project-docs/writing_guide.md` にレビューゲートフローが追記されること
- [x] チェックリストを適用した品質レビューの合格判定手順が明確であること
