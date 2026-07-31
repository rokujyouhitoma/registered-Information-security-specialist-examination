---
ID: 002
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] docs/syllabus_tsuiho_detail.md IPA公式シラバス追補版Ver.4.0詳細ドキュメント作成 (ID: 002)

## 1. 概要 / Summary
IPA公式の「情報処理安全確保支援士試験 シラバス 追補版 (科目A-2) Ver.4.0」の全項目（体系カテゴリ、大分類、中分類、小分類、細目番号 `(1)`, `(2)`, `①`, `②`...、学習目標、理解すべき内容、および全用語例）を、公式PDFと1対1で番号レベルまで完全一致させた詳細ドキュメント [docs/syllabus_tsuiho_detail.md](../../docs/syllabus_tsuiho_detail.md) を新規作成する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - IPA 情報処理安全確保支援士試験 シラバス 追補版 (科目A-2) Ver.4.0 ([references/syllabus_sc_am2_tsuiho4_0.pdf](../../references/syllabus_sc_am2_tsuiho4_0.pdf))

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/syllabus_tsuiho_detail.md](../../docs/syllabus_tsuiho_detail.md)
- [x] [docs/syllabus.md](../../docs/syllabus.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/002-syllabus-tsuiho-detail-creation`

1. **追補版BOK体系の構造解析**:
   - `references/syllabus_sc_am2_tsuiho4_0.pdf` から共通キャリア・スキルフレームワーク（BOK体系）の大分類（3, 4, 6）、中分類（9, 10, 11, 12, 13, 15, 16）、全32小項目、細目番号、目標、解説、用語例を解析・抽出。

2. **詳細ドキュメントの自動生成とクリーンアップ**:
   - Mermaid図による階層マップ、Markdown見出し構造（`#`, `##`, `###`, `####`, `#####`, `######`）を網羅した `syllabus_tsuiho_detail.md` を作成。
   - PDF特有のルビ（「ぜい」「びゅう」等）や不要な改行をスクリプトでクリーンアップ。

3. **目次ドキュメント更新**:
   - `docs/syllabus.md` に `syllabus_tsuiho_detail.md` への案内リンクを更新。

4. **自動検証テスト**:
   - Pythonスクリプト `verify_tsuiho_doc.py` により、追補版の全3大分類・7中分類・32小分類項目が100%存在・一致していることを機械的にテスト・検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] IPA公式シラバス追補版Ver.4.0の全32小項目および細目番号が100%網羅された `docs/syllabus_tsuiho_detail.md` が作成されること
- [x] 自動検証テストで全大分類・中分類・小分類がPASSとなること
