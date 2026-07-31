---
ID: 017
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] references/ 以下の全一次資料PDF(全258件)の完全OKFフォーマット化と管理自動化 (ID: 017)

## 1. 概要 / Summary
`references/` ディレクトリに存在する **すべての一次資料PDF（計258ファイル：シラバス3件、ITSS資料6件、過去問題249件）** を、1つも漏らさずに **OKF (Open Knowledge Format)** 形式（YAMLフロントマター付き構造化Markdown）へ完全変換・配置・カタログ化する。
PM（プロジェクトマネジメント）の管理下で、自動一括変換スクリプトおよびカバレッジ検証スクリプトを構築し、100%のOKF化達成を保証する。

---

## 2. トレーサビリティ / Traceability
- 関連規約: [AGENTS.md](../AGENTS.md) (Primary Source References 規則, 相対パスルール)
- 関連資料: [references/README.md](../references/README.md)
- 関連Issue: [011-reference-data-asset-management-rules.md](011-reference-data-asset-management-rules.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [references/README.md](../../references/README.md)
- [x] [scripts/convert_all_references_to_okf.py](../../scripts/convert_all_references_to_okf.py) [NEW]
- [x] [scripts/verify_okf_coverage.py](../../scripts/verify_okf_coverage.py) [NEW]
- [x] [references/okf/](../../references/okf) [NEW]
  - [x] `references/okf/*.md` (シラバス3件、ITSS6件)
  - [x] `references/okf/past_exams/<year>/*.md` (過去問全249件)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/017-convert-references-to-okf-format`

### 1. 全258件のPDFのディレクトリ・ファイル分析
対象内訳:
- **IPA シラバス**: 3件 (`syllabus_sc_ver2_1.pdf`, `syllabus_sc_am2_tsuiho4_0.pdf`, `syllabus_sc_am2_tsuiho4_0_henkou.pdf`)
- **ITSS 関連資料**: 6件 (`itss_v3_2011_*.pdf`)
- **過去問題アーカイブ (`references/past_exams/`)**: 33期分・計249件 (問題冊子、解答例、採点講評)

### 2. 全自動OKF変換スクリプト (`scripts/convert_all_references_to_okf.py`) の開発
- PDFテキスト抽出（`pypdf` / `pdfplumber` / `fitz` またはフォールバック処理）を用いて全PDFを走査。
- メタデータ解析ロジックを実装し、以下を自動生成：
  - 各PDFに対応する OKF YAML フロントマター (`type`, `title`, `authority`, `exam_year`, `version`, `source_pdf`, `keywords`, `updated_at`)
  - 構造化Markdownコンテンツ
- 対応する出力パス構成：
  - シラバス/ITSS: `references/okf/<basename>.md`
  - 過去問: `references/okf/past_exams/<year>/<basename>.md`

### 3. OKF変換カバレッジ監査スクリプト (`scripts/verify_okf_coverage.py`) の開発
- `references/` 内の全 `.pdf` ファイルを検索し、それらに対応する `.md` が `references/okf/` 内に存在するかを1対1でチェックする。
- 全258件のPDFに対して100%（欠落0件）の対応が存在することを確認して成功ステータスを返す。

### 4. `references/README.md` の全件自動カタログ更新
- スクリプト実行結果に基づき、全258件のPDFとOKFファイルの対比インデックス・マッピング表を `references/README.md` に追記・更新する。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `scripts/convert_all_references_to_okf.py` が実装され、エラーなく実行可能であること。
- [x] `references/` 配下の **全258件のPDFファイル** に対し、漏れなくすべて対応する OKF Markdown ドキュメントが `references/okf/` 配下に生成されていること。
- [x] `scripts/verify_okf_coverage.py` を実行し、全PDFに対する OKF カバレッジが **100% (258/258件)** であることが検証されていること。
- [x] アウトライン化・画像化 PDF に対する Tesseract OCR による全文文字起こしが適用されていること。
- [x] [references/README.md](../references/README.md) に全258件のPDFとOKFファイルのマッピング表がカタログ化されていること。
- [x] すべての生成ドキュメントおよびリンクが `AGENTS.md` の相対パスルールに準拠していること。
