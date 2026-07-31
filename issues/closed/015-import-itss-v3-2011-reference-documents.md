---
ID: 015
種別: Feature
優先度: High
ステータス: Closed
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
- [x] `references/itss_v3_2011_it_specialist_career.pdf` (000024949.pdf: ITスペシャリスト 2部キャリア編)
- [x] `references/itss_v3_2011_it_specialist_skill.pdf` (000024951.pdf: ITスペシャリスト 3部スキル編)
- [x] `references/itss_v3_2011_it_specialist_training_roadmap.pdf` (000024953.pdf: ITスペシャリスト 研修ロードマップ本体)
- [x] `references/itss_v3_2011_it_specialist_training_matrix.pdf` (000024956.pdf: ITスペシャリスト 研修ロードマップマトリックス)
- [x] `references/itss_v3_2011_level1_2_career.pdf` (000025035.pdf: レベル1、2共通 2部キャリア編)
- [x] `references/itss_v3_2011_level1_2_skill.pdf` (000025037.pdf: レベル1、2共通 3部スキル編)
- [x] [references/README.md](../references/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/015-import-itss-v3-2011-reference-documents`

1. **Python自動取得処理の実装**:
   - `urllib.request` を用い、ユーザーエージェントヘッダーを付与して各PDFを取得するスクリプトを実行。

2. **PDF整合性検証**:
   - 各ファイルの先頭 4 バイトが `%PDF` であることを確認し、全6ファイルで正常通過。

3. **[references/README.md](../references/README.md) の改訂**:
   - 取得した 6 ファイルの概要、原典 URL、更新日付、サイズを一覧表として登録。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 全 6 ファイルが `references/` 配下に格納され、ファイル先頭のマジックナンバー `%PDF` 検証を通過すること
- [x] [references/README.md](../references/README.md) に 6 ファイルの名称・説明・URLが正しく追加されること
- [x] ドキュメント内にローカル絶対パス（`file:///` 等）が含まれていないこと
