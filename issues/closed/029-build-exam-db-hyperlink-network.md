---
ID: 029
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 過去問データベースとの双方向ハイパーリンク網構築 (Phase 6) (ID: 029)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` における主要用語の「試験出題ポイント」欄から、`references/` 配下に保存されている SC（情報処理安全確保支援士 / 情報セキュリティスペシャリスト）歴代過去問題（平成・令和試験問題・解答例）への相対ハイパーリンク構造を網羅的に形成し、学習者が用語から直ちに過去問の出題文脈・正解解法を確認できる双方向ナビゲーションを構築する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/master_quality_enhancement_roadmap.md`（Phase 6）
- `references/` ディレクトリ内の全過去問題資産（OKFフォーマット化済みPDF/テキスト）

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [x] [syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [x] [references/README.md](../references/README.md)
- [x] [audit_glossary_quality.py](../scripts/audit_glossary_quality.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/029-build-exam-db-hyperlink-network`

1. **過去問リンクマッピング構築**:
   - TLS, IPsec, SQLi, XSS, CSRF, ISMS, 証拠保全, CSIRT 等の重要頻出用語に対し、`../../references/` への相対パスリンク（例: `[令和5年秋 科目B 問1 (VPN/C2通信)](../../references/...)`）を埋め込む。
2. **自動品質監査**:
   - `python3 scripts/audit_glossary_quality.py` でパス妥当性と品質を監査。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 用語集の主要項目から `references/` への有効な相対ハイパーリンクが形成されていること
- [x] スクリプトによる品質監査で合格ステータスが維持されていること
