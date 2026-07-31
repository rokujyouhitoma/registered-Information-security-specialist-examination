---
ID: 016
種別: Feature
優先度: High
ステータス: Closed
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
- [x] `references/past_exams/<YYYY>_<haru|aki>/` 配下の全249個のPDFファイル群
- [x] [references/README.md](../references/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/016-import-past-sc-exam-questions-answers-comments`

1. **ディレクトリ構造と命名規則の策定**:
   - `references/past_exams/<YYYY>_<haru|aki>/` ディレクトリを作成。

2. **自動収集Pythonクローラースクリプトの実装**:
   - リポジトリ内・全17年度のHTMLからSC区分PDF URLを特定し、自動収集・保存完了。

3. **PDFマジックナンバー自動検証**:
   - ダウンロードした全249個のPDFで `%PDF` マジックナンバーの確認を100%パス。

4. **[references/README.md](../references/README.md) の改訂**:
   - 「3. 歴代SC過去問題・解答例・採点講評アーカイブ」の目録（全33期区分）を追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 平成21年〜令和7年の全17年度分におけるSC区分の問題冊子・解答例・採点講評PDF（計249ファイル）が `references/past_exams/` に保存されること
- [x] 全PDFファイルのマジックナンバー `%PDF` 検証が 100% PASS すること
- [x] [references/README.md](../references/README.md) に全アーカイブの目録が正しく追加されること
- [x] リポジトリ内にローカル絶対パス（`file:///` 等）が含まれていないこと
