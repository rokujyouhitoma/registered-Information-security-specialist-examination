---
ID: 005
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] コンテンツ制作ロードマップ & WBS の定義 (ID: 005)

## 1. 概要 / Summary
情報処理安全確保支援士試験の全シラバス項目（Ver.2.1 29小項目＋科目A-2追補版 32小項目＝計61項目）に対する学習コンテンツ（解説記事、午後記述対策解法、過去問演習）の制作優先度（Phase 1〜3）および具体目標スケジュール（WBS）を定義・策定する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目1)
  - [docs/syllabus_detail.md](../docs/syllabus_detail.md) (IPA公式Ver.2.1)
  - [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md) (科目A-2追補版Ver.4.0)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [project-docs/roadmap_wbs.md](../project-docs/roadmap_wbs.md)
- [x] [project-docs/README.md](../project-docs/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/005-content-production-roadmap-wbs`

1. **シラバス全61小項目のPhase分類基準**:
   - **Phase 1 (最優先/重点 - 15項目)**: 午後記述試験（科目B）で毎期出題され、合否を分ける重要分野（暗号方式・PKI、Webセキュリティ・OWASP Top 10、ネットワークセキュリティ・IPsec/TLS、インシデントハンドリング/フォレンジック、ゼロトラスト/IAM）。
   - **Phase 2 (標準/網羅 - 25項目)**: 科目A-2四肢択一および記述の共通分野（アカウント管理、ログ解析、クラウドセキュリティ、SBOM/SCRM、セキュリティ監査）。
   - **Phase 3 (基礎/補完 - 21項目)**: 基礎知識・マネジメント・物理セキュリティ（情報セキュリティ方針、法令・ガイドライン、オフィスセキュリティ）。

2. **WBS詳細ドキュメント `project-docs/roadmap_wbs.md` の作成**:
   - 以下のカラム構造を持つMarkdownテーブルで全61項目を完全網羅する。
     `| シラバスコード | 小項目名 | 優先Phase | 対象試験種別 | 担当エージェント | 想定成果物ファイルパス |`
   - 各フェーズごとのマイルストーン目標（例: Phase 1完了で記述対策8割カバー）を設定。

3. **ドキュメント構造**:
   - `# コンテンツ制作ロードマップ & WBS`
   - `## 1. 開発基本方針 & フェーズ定義`
   - `## 2. 全シラバス項目 WBS マトリックス (61項目)`
   - `## 3. マイルストーン & 進捗管理規約`

4. **[project-docs/README.md](../project-docs/README.md) への組み込み**:
   - 一覧表に `roadmap_wbs.md` へのリンクと説明を追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `project-docs/roadmap_wbs.md` が作成され、全61項目（Ver.2.1 29項目＋追補版 32項目）が漏れなくリスト化されていること
- [x] 各項目に Phase (Phase 1〜3)、試験種別（A-2 / B）、担当エージェントが割り当てられていること
- [x] 相対パス検証ツールでリンク切れ・絶対パス混入がないことが確認されること
