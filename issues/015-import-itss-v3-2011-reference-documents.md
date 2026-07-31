---
ID: 015
種別: Feature
優先度: High
ステータス: Open
---

# [FEAT/ENH] ITスキル標準V3 2011 (ITSS) 関連資料 (/references/*) の取り込み (ID: 015)

## 1. 概要 / Summary
IPAが公開している「ITスキル標準V3 2011 (ITSS)」のITスペシャリスト関連資料およびレベル1・2共通資料（キャリア編、スキル編、研修ロードマップ本体・マトリックス計6ファイル）を取得し、リポジトリの `references/` ディレクトリ配下に格納・管理する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - IPA ITスキル標準V3 2011 ダウンロードページ (https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/download_v3_2011.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] `references/itss_v3_2011_it_specialist_career.pdf` (000024949.pdf: ITスペシャリスト 2部キャリア編)
- [ ] `references/itss_v3_2011_it_specialist_skill.pdf` (000024951.pdf: ITスペシャリスト 3部スキル編)
- [ ] `references/itss_v3_2011_it_specialist_training_roadmap.pdf` (000024953.pdf: ITスペシャリスト 研修ロードマップ本体)
- [ ] `references/itss_v3_2011_it_specialist_training_matrix.pdf` (000024956.pdf: ITスペシャリスト 研修ロードマップマトリックス)
- [ ] `references/itss_v3_2011_level1_2_career.pdf` (000025035.pdf: レベル1、2共通 2部キャリア編)
- [ ] `references/itss_v3_2011_level1_2_skill.pdf` (000025037.pdf: レベル1、2共通 3部スキル編)
- [ ] [references/README.md](../references/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/015-import-itss-v3-2011-reference-documents`

1. **指定URLからのPDF自動ダウンロード**:
   - スクリプトまたは `curl` を利用し、以下のIPA公式URLから全6個のPDFファイルを安全に取得する。
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024949.pdf` -> `references/itss_v3_2011_it_specialist_career.pdf`
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024951.pdf` -> `references/itss_v3_2011_it_specialist_skill.pdf`
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024953.pdf` -> `references/itss_v3_2011_it_specialist_training_roadmap.pdf`
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000024956.pdf` -> `references/itss_v3_2011_it_specialist_training_matrix.pdf`
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000025035.pdf` -> `references/itss_v3_2011_level1_2_career.pdf`
     - `https://www.ipa.go.jp/jinzai/skill-standard/plus-it-ui/itss/ps6vr70000004x60-att/000025037.pdf` -> `references/itss_v3_2011_level1_2_skill.pdf`

2. **ファイル存在検証と整合性チェック**:
   - ダウンロードした全6ファイルがバイト数ゼロでなく、PDFヘッダー (`%PDF-`) を持つ正当なファイルであることを検証。

3. **台帳ドキュメント `references/README.md` の更新**:
   - `references/README.md` の資料一覧テーブルに、今回取り込んだITSS V3 2011資料6件のファイル名、原典URL、概要説明を追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 指定された全6個のITSS PDFファイルが `references/` にダウンロードされ、破損なく格納されていること
- [ ] [references/README.md](../references/README.md) に取得済み資料一覧と原典リンクが追記されていること
- [ ] リポジトリ内にローカル絶対パスが含まれていないこと
