---
ID: 018
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] シラバス全用語例の用語辞書 (docs/glossary.md) 完全登録・相互ハイパーリンク化と分割運用 (ID: 018)

## 1. 概要 / Summary
`docs/syllabus_detail.md` (シラバスVer.2.1) および `docs/syllabus_tsuiho_detail.md` (追補版Ver.4.0) に登場するすべての「用語例・キーワード」を網羅抽出し、`docs/glossary.md` (総合用語辞書) に定義・解説を登録する。
また、シラバス詳細ドキュメントと用語辞書間で相互ハイパーリンク（相対パス）を設定する。
用語数の増加により `docs/glossary.md` のファイルサイズ・行数が過大となった場合は、五十音順・アルファベット順・分野別にファイルを分割運用する（例: `docs/glossary/` 配下または複数ファイル）。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [docs/syllabus_detail.md](../docs/syllabus_detail.md)
  - [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md)
  - [docs/glossary.md](../docs/glossary.md)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [docs/glossary.md](../docs/glossary.md) (および分割後の `docs/glossary/*.md`)
- [ ] [docs/syllabus_detail.md](../docs/syllabus_detail.md)
- [ ] [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md)
- [ ] [mkdocs.yml](../mkdocs.yml) (必要に応じてナビゲーション更新)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/018-comprehensive-glossary-terms-linking-split`

1. **用語例・キーワードの網羅抽出**:
   - `docs/syllabus_detail.md` および `docs/syllabus_tsuiho_detail.md` の全小項目から「用語例・キーワード」を自動抽出・整理。
2. **用語辞書 (`docs/glossary.md`) の拡充・構造化**:
   - 未掲載の用語例について、IPA公式解説および標準仕様に準拠した解説・分類メタデータを登録。
3. **相互ハイパーリンクの適用**:
   - シラバス各項目の用語例から用語辞書への相対リンクを設定。
   - 用語辞書の各項目からシラバス該当小項目への逆リンクを設定。
4. **大容量化時のファイル分割運用**:
   - 用語数・ファイル容量が大きく閲覧性が低下する場合、索引カテゴリ別（あ〜さ行、た〜は行、ま〜わ行、A〜Z等）または分野別に `docs/glossary/` ディレクトリ等へファイルを分割し `mkdocs.yml` の nav も更新。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `docs/syllabus_detail.md` および `docs/syllabus_tsuiho_detail.md` 内の全用語例が `docs/glossary.md` (または分割ファイル) に登録されていること
- [ ] シラバス詳細と用語辞書間で相対パスによる相互ハイパーリンクが完全に設定されていること
- [ ] ファイルサイズ超過時に適切な分割構成となり、`python3 scripts/check_relative_paths.py` がエラーなし (Exit Code 0) で正常終了すること
