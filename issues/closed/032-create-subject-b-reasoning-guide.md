---
ID: 032
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 科目B (長文記述式) 解法思考プロセスガイドの整備 (Phase 9) (ID: 032)

## 1. 概要 / Summary
情報セキュリティスペシャリスト試験（科目B / 旧午後試験）における長文記述式問題について、問題文（ネットワーク構成図、シーケンス、アクセスログ）から正解根拠を的確に抽出し、IPA公式採点基準に適合する文字数制限内（30〜50字）の模範解答を構築するための思考プロセスガイド `docs/subject_b/reasoning_guide.md` を作成する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 9）
- IPA公式科目B過去問題・採点講評

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [reasoning_guide.md](../docs/subject_b/reasoning_guide.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/032-create-subject-b-reasoning-guide`

1. **解法思考ロジックの体系化**:
   - 設問要求の分類（「技術的理由」「セキュリティ上のリスク」「管理者への報告事項」「予防対策」）。
   - IPA採点基準に準拠した文末表現定型構文（「〜を防止するため」「〜により〜が漏洩するリスク」）。
   - ネットワーク図・ログ分析時の3大着眼点（プロトコル不整合、特権昇格、時間軸異常）。
2. **ドキュメント作成**:
   - `docs/subject_b/reasoning_guide.md` を新規作成。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/subject_b/reasoning_guide.md` が作成され、科目B解法テクニックが具体例付きで網羅されていること
