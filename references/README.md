# 参考文献・一次情報資料 (References & Primary Sources)

本ディレクトリは、情報処理推進機構（IPA）が公開している公式シラバス、試験関連PDF資料、およびITスキル標準（ITSS）等の一次情報を管理するエリアです。

---

## 📑 1. IPA 公式シラバス関連資料

| ファイル名 | 原典タイトル / 概要 | 公式URL |
|---|---|---|
| `syllabus_sc_ver2_1.pdf` | 情報処理安全確保支援士試験 シラバス Ver.2.1 | [IPA シラバス一覧](https://www.ipa.go.jp/shiken/syllabus/index.html) |
| `syllabus_sc_am2_tsuiho4_0.pdf` | 情報処理安全確保支援士試験 シラバス 追補版 (科目A-2) Ver.4.0 | [IPA シラバス一覧](https://www.ipa.go.jp/shiken/syllabus/index.html) |
| `syllabus_sc_am2_tsuiho4_0_henkou.pdf` | 情報処理安全確保支援士試験 シラバス 追補版 (科目A-2) Ver.4.0 変更箇所表示版 | [IPA シラバス一覧](https://www.ipa.go.jp/shiken/syllabus/index.html) |

---

## 📑 2. IPA ITスキル標準V3 2011 (ITSS) 関連資料

| ファイル名 | 分類・原典タイトル | サイズ | 公式URL |
|---|---|---|---|
| `itss_v3_2011_it_specialist_career.pdf` | ITスペシャリスト 2部キャリア編 職種の概要と達成度指標（職種別） | 392 KB | [IPA公式 (000024949.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024949.pdf) |
| `itss_v3_2011_it_specialist_skill.pdf` | ITスペシャリスト 3部スキル編 スキル領域とスキル熟達度・知識項目（職種別） | 954 KB | [IPA公式 (000024951.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024951.pdf) |
| `itss_v3_2011_it_specialist_training_roadmap.pdf` | ITスペシャリスト 研修ロードマップ（職種別）：本体 | 1.3 MB | [IPA公式 (000024953.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024953.pdf) |
| `itss_v3_2011_it_specialist_training_matrix.pdf` | ITスペシャリスト 研修ロードマップ（職種別）：マトリックス | 519 KB | [IPA公式 (000024956.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024956.pdf) |
| `itss_v3_2011_level1_2_career.pdf` | レベル1、2共通 2部キャリア編 職種の概要と達成度指標（2018年8月改訂） | 157 KB | [IPA公式 (000025035.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000025035.pdf) |
| `itss_v3_2011_level1_2_skill.pdf` | レベル1、2共通 3部スキル編 スキル領域とスキル熟達度・知識項目 | 236 KB | [IPA公式 (000025037.pdf)](https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000025037.pdf) |

---

## 📌 一次情報資料の管理規約 (Governance & Guidelines)

### 1. 保管対象基準 (Primary Source Selection Criteria)
本 `references/` ディレクトリに保管する資料は、以下の公的・公式な一次情報源から取得した資料に限定します：
- **IPA（独立行政法人情報処理推進機構）公式資料**:
  - 情報処理安全確保支援士（SC）および情報セキュリティスペシャリスト試験のシラバス・追補版・試験要綱。
  - 歴代試験（平成21年〜令和7年）の過去問題冊子・解答例・採点講評PDF。
  - ITスキル標準 V3 2011（ITSS）の職種別キャリア編・スキル編・研修ロードマップ等。
- **公認セキュリティ基準・評価リスト**:
  - CRYPTREC（電子政府推奨暗号リスト）、NIST SP 800 シリーズ等の公認標準ガイドライン。

### 2. ファイル命名規約 (Naming Conventions)
すべての保管ファイルは、以下のルールに沿って英数小文字とアンダースコア (`_`) で命名してください：
- **シラバス資料**: `syllabus_<shiken>_ver<major>_<minor>.pdf` （例: `syllabus_sc_ver2_1.pdf`）
- **追補版資料**: `syllabus_<shiken>_<am|pm>_tsuiho<ver>.pdf` （例: `syllabus_sc_am2_tsuiho4_0.pdf`）
- **ITSS 資料**: `itss_v3_2011_<scope>_<type>.pdf` （例: `itss_v3_2011_it_specialist_career.pdf`）
- **過去問資料アーカイブ (`references/past_exams/<year>_<haru|aki>/`)**:
  - 問題冊子: `question_am1.pdf` (午前Ⅰ), `question_am2.pdf` (午前Ⅱ), `question_pm1.pdf` (午後Ⅰ/科目B), `question_pm2.pdf` (午後Ⅱ)
  - 解答例: `answer_am1.pdf`, `answer_am2.pdf`, `answer_pm1.pdf`, `answer_pm2.pdf`
  - 採点講評: `comment.pdf` または `*_cmnt.pdf`
- **OKF 構造化ドキュメント (`references/okf/`)**:
  - 原典PDFのパス・ファイル名と1対1に対応する `.md` ファイル（例: `references/okf/past_exams/2024_haru/question_am2.md`）

### 3. 著作権・引用注記 (Copyright & Citation Notes)
- **著作権の保持**: 本ディレクトリに収録されている PDF 資料の著作権は、独立行政法人情報処理推進機構（IPA）または各発行機関に帰属します。
- **利用目的**: 本リポジトリ内の各種学習コンテンツおよびナレッジの作成・検証・精度向上のための非営利研究・学習目的としてのみ利用します。
- **相対パス参照の強制**: `docs/` や `project-docs/` 等から本文書・資料を参照する際は、必ず環境非依存の相対パス（例: `[シラバス](../references/syllabus_sc_ver2_1.pdf)`）でリンクしてください。絶対パス (`file:///...`) の使用は厳禁です。

### 4. スクラッチスクリプト & 一時データ管理規約 (Scratch & Temp File Governance)
- **中間生成物の非混入**: PDF解析、テキスト抽出、一時検証等に使用する使い捨てスクリプトや中間テキストファイル（`.txt`, `.tmp`, `.log`）は、本ディレクトリやリポジトリ直下に直接保存・コミットしないでください。
- **一時作業場所の利用**: 一時的な処理スクリプトや検証用データは `scratch/` ディレクトリまたはエージェントの artifacts 領域内で作業を行ってください。
- **Git 除外規則**: `scratch/*`, `*.tmp`, `*.log`, `*.pdftotext.txt` は `.gitignore` により自動的に無効化され、Git リポジトリへの誤混入が防がれています。

---

## 📑 3. 歴代SC試験 過去問題・解答例・採点講評アーカイブ (`references/past_exams/`)

平成21年（2009年）〜令和7年（2025年）までの全17年度分における情報処理安全確保支援士（SC）および情報セキュリティスペシャリスト（SC）の過去問題冊子・解答例・採点講評PDF（計249ファイル）を格納しています。

### アーカイブ一覧 (全33期区分)

- **2025年 (令和7年)**: [2025_haru](past_exams/2025_haru/), [2025_aki](past_exams/2025_aki/)
- **2024年 (令和6年)**: [2024_haru](past_exams/2024_haru/), [2024_aki](past_exams/2024_aki/)
- **2023年 (令和5年)**: [2023_haru](past_exams/2023_haru/), [2023_aki](past_exams/2023_aki/)
- **2022年 (令和4年)**: [2022_haru](past_exams/2022_haru/), [2022_aki](past_exams/2022_aki/)
- **2021年 (令和3年)**: [2021_haru](past_exams/2021_haru/), [2021_aki](past_exams/2021_aki/)
- **2020年 (令和2年)**: [2020r02](past_exams/2020r02/) (※特別実施期含む)
- **2019年 (平成31年/令和元年)**: [2019_haru](past_exams/2019_haru/), [2019_aki](past_exams/2019_aki/)
- **2018年 (平成30年)**: [2018_haru](past_exams/2018_haru/), [2018_aki](past_exams/2018_aki/)
- **2017年 (平成29年)**: [2017_haru](past_exams/2017_haru/), [2017_aki](past_exams/2017_aki/)
- **2016年 (平成28年)**: [2016_haru](past_exams/2016_haru/), [2016_aki](past_exams/2016_aki/) (情報セキュリティスペシャリスト)
- **2015年 (平成27年)**: [2015_haru](past_exams/2015_haru/), [2015_aki](past_exams/2015_aki/)
- **2014年 (平成26年)**: [2014_haru](past_exams/2014_haru/), [2014_aki](past_exams/2014_aki/)
- **2013年 (平成25年)**: [2013_haru](past_exams/2013_haru/), [2013_aki](past_exams/2013_aki/)
- **2012年 (平成24年)**: [2012_haru](past_exams/2012_haru/), [2012_aki](past_exams/2012_aki/)
- **2011年 (平成23年)**: [2011_haru](past_exams/2011_haru/), [2011h23](past_exams/2011h23/) (※特別試験含む)
- **2010年 (平成22年)**: [2010_haru](past_exams/2010_haru/), [2010_aki](past_exams/2010_aki/)
- **2009年 (平成21年)**: [2009_haru](past_exams/2009_haru/), [2009_aki](past_exams/2009_aki/)

### 格納ファイル種別ルール
- **問題冊子**: `question_am1.pdf` (午前Ⅰ), `question_am2.pdf` (午前Ⅱ), `question_pm1.pdf` (午後Ⅰ/科目B), `question_pm2.pdf` (午後Ⅱ)
- **解答例**: `answer_am1.pdf`, `answer_am2.pdf`, `answer_pm1.pdf`, `answer_pm2.pdf`
- **採点講評**: `comment.pdf` / `*_cmnt.pdf`

---

## 📑 4. Open Knowledge Format (OKF) 構造化ナレッジライブラリ (`references/okf/`)

一次資料（PDF等全258ファイル）をAIエージェントおよび人間が効率的に検索・参照できるように、YAMLフロントマター（メタデータ）付き構造化Markdownとして完全変換・構造化した標準ナレッジライブラリ群です。
全PDFに対して **100% カバレッジ (258/258件)** が保証されています。

### OKF ディレクトリ構造と対応マップ

| 分類 | PDF保管パス | OKF構造化ドキュメント格納パス |
|---|---|---|
| **IPA シラバス** | `references/syllabus_*.pdf` | `references/okf/syllabus_*.md` |
| **ITSS スキル標準** | `references/itss_*.pdf` | `references/okf/itss_*.md` |
| **過去問題・解答例・講評** | `references/past_exams/<year>/<filename>.pdf` | `references/okf/past_exams/<year>/<filename>.md` |

### 管理・検証スクリプト
- **全自動変換スクリプト**: [scripts/convert_all_references_to_okf.py](../scripts/convert_all_references_to_okf.py)
  - `pdftotext` とメタデータ抽出ロジックにより、全PDFをOKFフォーマットへ一括変換生成します。
- **100% カバレッジ監査スクリプト**: [scripts/verify_okf_coverage.py](../scripts/verify_okf_coverage.py)
  - 全PDFと全OKFドキュメントの1対1対応を機械的に検証し、欠落0件を判定・保証します。

