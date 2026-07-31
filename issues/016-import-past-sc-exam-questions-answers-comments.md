---
ID: 016
種別: Feature
優先度: High
ステータス: In Progress
---

# [FEAT/ENH] 歴代SC試験（情報処理安全確保支援士・情報セキュリティスペシャリスト）過去問題・解答例・採点講評 (/references/*) の収集・保存 (ID: 016)

## 1. 概要 / Summary
IPA公式Webサイトで公開されている平成21年（2009年）〜令和7年（2025年）までの歴代「情報処理安全確保支援士試験（SC）」および「情報セキュリティスペシャリスト試験（SC）」の過去問題冊子、解答例、および採点講評PDFを自動収集し、`references/past_exams/` ディレクトリ配下に体系的に構造化して格納する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - IPA 過去問題（問題追及・解答例・採点講評）一覧ページ (https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html)
  - 対象年度ページ群 (2009h21.html 〜 2025r07.html 全17年度分)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] `references/past_exams/<YYYY>_<haru|aki>/` 配下のPDFファイル群
- [ ] [references/README.md](../references/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/016-import-past-sc-exam-questions-answers-comments`

1. **ディレクトリ構造と命名規則の策定**:
   - `references/past_exams/<YYYY>_<haru|aki>/` ディレクトリを作成（例: `references/past_exams/2024_haru/`）。
   - ファイル命名規約:
     - **問題冊子**: `question_am1.pdf` (午前Ⅰ), `question_am2.pdf` (午前Ⅱ), `question_pm1.pdf` (午後Ⅰ/科目B), `question_pm2.pdf` (午後Ⅱ)
     - **解答例**: `answer_am1.pdf`, `answer_am2.pdf`, `answer_pm1.pdf`, `answer_pm2.pdf`
     - **採点講評**: `comment.pdf`

2. **自動収集Pythonクローラースクリプトの実装**:
   - `html.parser` や `re` を使用し、全17年度のHTMLから SC区分（情報処理安全確保支援士 / 情報セキュリティスペシャリスト）のPDF URL（`0000XXXXX.pdf`）をスクレイピング・抽出。
   - `urllib.request` に User-Agent ヘッダーを付与して安全にダウンロード。
   ```python
   # 解析対象URLパターン例
   YEAR_PAGES = [
       f"https://www.ipa.go.jp/shiken/mondai-kaiotu/{y}.html"
       for y in ["2025r07", "2024r06", "2023r05", "2022r04", "2021r03", "2020r02",
                 "2019h31", "2018h30", "2017h29", "2016h28", "2015h27", "2014h26",
                 "2013h25", "2012h24", "2011h23", "2010h22", "2009h21"]
   ]
   ```

3. **PDFマジックナンバー自動検証**:
   - ダウンロードした全PDFの先頭4バイトが `%PDF` であることを検証し、不完全な取得を自動ブロック。

4. **[references/README.md](../references/README.md) の改訂**:
   - 「3. 歴代SC過去問題・解答例・採点講評アーカイブ」セクションを新設し、年度ごとのフォルダ構成と原典ページリンクを一覧化。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 平成21年〜令和7年の全17年度分におけるSC区分の問題冊子・解答例・採点講評PDFが `references/past_exams/` に保存されること
- [ ] 全PDFファイルのマジックナンバー `%PDF` 検証が 100% PASS すること
- [ ] [references/README.md](../references/README.md) に全アーカイブの目録が正しく追加されること
- [ ] リポジトリ内にローカル絶対パス（`file:///` 等）が含まれていないこと
