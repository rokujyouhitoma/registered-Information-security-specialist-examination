---
ID: 016
種別: Feature
優先度: High
ステータス: Open
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
- [ ] `references/past_exams/<year>_<season>/` 配下のPDFファイル群
  - `question_am1.pdf`, `question_am2.pdf`, `question_pm1.pdf`, `question_pm2.pdf` (問題冊子)
  - `answer_am1.pdf`, `answer_am2.pdf`, `answer_pm1.pdf`, `answer_pm2.pdf` (解答例)
  - `comment.pdf` (採点講評)
- [ ] [references/README.md](../references/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/016-import-past-sc-exam-questions-answers-comments`

1. **対象年度・期のクローリング分析**:
   - 以下の17年度分のIPA公式過去問ページから、SC（情報処理安全確保支援士 / 情報セキュリティスペシャリスト）に関連するPDFリンクを抽出する。
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2023r05.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2022r04.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2021r03.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2020r02.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2019h31.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2018h30.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2017h29.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2016h28.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2015h27.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2014h26.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2013h25.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2012h24.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2011h23.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2010h22.html`
     - `https://www.ipa.go.jp/shiken/mondai-kaiotu/2009h21.html`

2. **自動収集Pythonスクリプトの開発**:
   - `BeautifulSoup` または `re` スクリプトを作成し、SC区分（旧区分含む）の問題・解答・講評PDFの直リンクを自動特定して取得。
   - `references/past_exams/<YYYY>_<haru|aki>/` 配下に統一命名ルールで保存。

3. **整合性検証と台帳記録**:
   - 各PDFファイルのマジックナンバー (`%PDF`) を検証。
   - [references/README.md](../references/README.md) に「3. 歴代SC試験 過去問題・解答例・採点講評アーカイブ」のインデックスを追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 指定された17年度分の過去問、解答例、採点講評PDFが `references/past_exams/` 配下に漏れなく保存されること
- [ ] 全PDFファイルのマジックナンバー `%PDF` 検証が PASS すること
- [ ] [references/README.md](../references/README.md) に過去問アーカイブ目次が更新・記録されること
