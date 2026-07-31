---
ID: 017
種別: Feature
優先度: Medium
ステータス: Closed
---

# [FEAT/ENH] references/ 以下の一次資料ファイルのOKFフォーマット化と配置構成の検討 (ID: 017)

## 1. 概要 / Summary
`references/` ディレクトリに配置されている一次資料（IPAシラバスPDF、ITSS定義PDF、過去問題等）を、AIエージェント（LLM）および人間が検索・参照しやすい **OKF (Open Knowledge Format)** 形式（YAMLフロントマター付き構造化Markdown）へ変換・整備する。
また、変換後のOKFファイルの最適なディレクトリ構成（`references/okf/`）を決定・導入し、管理規約を確立する。

---

## 2. トレーサビリティ / Traceability
- 関連規約: [AGENTS.md](../AGENTS.md) (Primary Source References 規則, 相対パスルール)
- 関連資料: [references/README.md](../references/README.md)
- 関連Issue: [011-reference-data-asset-management-rules.md](011-reference-data-asset-management-rules.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [references/README.md](file:///workspace/registered-Information-security-specialist-examination/references/README.md)
- [x] [references/okf/](file:///workspace/registered-Information-security-specialist-examination/references/okf) [NEW]
- [x] [references/okf/syllabus_sc_ver2_1.md](file:///workspace/registered-Information-security-specialist-examination/references/okf/syllabus_sc_ver2_1.md) [NEW]
- [x] [references/okf/syllabus_sc_am2_tsuiho4_0.md](file:///workspace/registered-Information-security-specialist-examination/references/okf/syllabus_sc_am2_tsuiho4_0.md) [NEW]
- [x] [references/okf/past_exams/](file:///workspace/registered-Information-security-specialist-examination/references/okf/past_exams) [NEW]

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/017-convert-references-to-okf-format`

### 1. OKF配置構造の決定（案A採用）
- 原本PDF等の一次資料を汚さず整理整頓するため、**`references/okf/` ディレクトリ** を作成してそこに変換後Markdownを集約・格納する。
  - シラバス類: `references/okf/syllabus_sc_ver2_1.md`, `references/okf/syllabus_sc_am2_tsuiho4_0.md`
  - ITSS類: `references/okf/itss_v3_2011_level1_2_skill.md` 等
  - 過去問: `references/okf/past_exams/<year>/<exam_type>.md` (例: `references/okf/past_exams/2024_haru/am2.md`)

### 2. OKF メタデータ（YAMLフロントマター）の統一規定
各OKF Markdownファイルの先頭に以下のメタデータを付与する。
```yaml
---
type: reference_syllabus # reference_syllabus / reference_itss / reference_exam_am1 / reference_exam_am2 / reference_exam_pm1 / reference_exam_pm2
title: "情報処理安全確保支援士試験 シラバス Ver.2.1"
authority: "IPA"
version: "2.1"
source_pdf: "../syllabus_sc_ver2_1.pdf"
keywords:
  - セキュリティ
  - 攻撃手法
updated_at: "2026-07-31"
---
```

### 3. ドキュメントのOKF化とインデックス化
1. `references/okf/` および `references/okf/past_exams/` ディレクトリ構成を作成。
2. シラバス（Ver 2.1 および 追補版Ver 4.0）のOKF形式構造化ドキュメントを作成。
3. ITSS定義資料および代表的な過去問データのOKF構造化ドキュメントを作成。
4. `references/README.md` に OKF ディレクトリ構成と原本PDFとのマッピング表を追記・カタログ化。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] OKFファイルの配置場所（`references/okf/` 等）が決定・規約化されていること。
- [x] シラバスおよび過去問題（`references/past_exams/`）に対応するOKFドキュメント（YAMLフロントマター＋構造化Markdown）が作成されていること。
- [x] [references/README.md](../references/README.md) にOKFファイル一覧（過去問題含む）と原本PDFの対応表がカタログ化されていること。
- [x] `AGENTS.md` の相対パスルールおよび用語定義に準拠していること。


