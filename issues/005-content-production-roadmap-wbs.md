---
ID: 005
種別: Feature
優先度: High
ステータス: In Progress
---

# [FEAT/ENH] コンテンツ制作ロードマップ & WBS の定義 (ID: 005)

## 1. 概要 / Summary
情報処理安全確保支援士試験の全シラバス項目（Ver.2.1 29小項目＋科目A-2追補版 32小項目）に対する学習コンテンツ（解説記事、要点ノート、過去問演習）の制作優先度（Phase 1〜3）および具体目標スケジュール（WBS）を定義・策定する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目1)
  - [docs/syllabus_detail.md](../docs/syllabus_detail.md)
  - [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [project-docs/roadmap_wbs.md](../project-docs/roadmap_wbs.md)
- [ ] [project-docs/README.md](../project-docs/README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/005-content-production-roadmap-wbs`

1. **出題頻度・難易度マトリックスの策定**:
   - 午後記述試験（科目B）における過去出題傾向に基づき、以下の3段階の優先度フェーズを定義する。
     - **Phase 1 (最優先/重点)**: 暗号・PKI, Webセキュリティ, NWセキュリティ, インシデント対応・フォレンジック, ゼロトラスト
     - **Phase 2 (標準/網羅)**: アカウント・認証管理, ログ解析, セキュリティ監査, クラウドセキュリティ, SBOM/SCRM
     - **Phase 3 (基礎/補完)**: 情報セキュリティマネジメント, 法令・ガイドライン, 物理セキュリティ
2. **WBS詳細ドキュメント `project-docs/roadmap_wbs.md` の作成**:
   - 全61小項目に対する制作担当領域、想定成果物（基礎解説・午後記述解法・過去問）、完了目標フェーズの一覧表を記述。
3. **目次統合**:
   - `project-docs/README.md` に作成したロードマップドキュメントの紹介とリンクを追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `project-docs/roadmap_wbs.md` が新規作成され、全61シラバス項目のPhase分類（Phase 1〜3）がマトリックス形式で明記されること
- [ ] [project-docs/README.md](../project-docs/README.md) にリンクが正常に追加され、リンク切れがないこと
- [ ] 相対パス（`../docs/syllabus_detail.md` 等）でリンクが記述されていること
