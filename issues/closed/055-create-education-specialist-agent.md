---
ID: 055
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] エデュケーション（ITSS教育スペシャリスト / EDU）エージェント (.agents/agents/education-specialist.agent.md) の作成および品質検証 (ID: 055)

## 1. 概要 / Summary
既存の専門家エージェント群（IR, DB, NW, SC等）の定義フォーマットおよびIPA「ITスキル標準 (ITSS V3 2011)」に準拠した**エデュケーションスペシャリスト（EDU）**エージェント (`.agents/agents/education-specialist.agent.md`) を新規追加した。
受講者のスキル診断 (Level 1〜7)、個別の研修ロードマップ策定、学習成果物・到達度アセスメント、および各分野専門エージェントへの個別指導エスカレーションを主導する。
また、作成されたエージェント定義に対し、PM（Project Manager）および QA（Quality Assurance Specialist）がそれぞれの観点で品質検証および整合性確認を実施した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA ITスキル標準 研修ロードマップ (references/okf/itss_v3_2011_it_specialist_training_roadmap.md)](../references/okf/itss_v3_2011_it_specialist_training_roadmap.md)
- 関連資料: [IPA ITスキル標準 研修マトリックス (references/okf/itss_v3_2011_it_specialist_training_matrix.md)](../references/okf/itss_v3_2011_it_specialist_training_matrix.md)
- 関連資料: [IPA ITスキル標準 キャリア編 (references/okf/itss_v3_2011_it_specialist_career.md)](../references/okf/itss_v3_2011_it_specialist_career.md)
- 関連資料: [.agents/agents/it-specialist-information-retrieval.agent.md](../.agents/agents/it-specialist-information-retrieval.agent.md)
- 関連資料: [.agents/agents/database-specialist.agent.md](../.agents/agents/database-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [education-specialist.agent.md](../.agents/agents/education-specialist.agent.md)
- [x] [issues/README.md](README.md)
- [x] [issues/closed/055-create-education-specialist-agent.md](closed/055-create-education-specialist-agent.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/055-create-education-specialist-agent`

1. **エデュケーションスペシャリスト（EDU）エージェント定義の作成 (ST/EDU担当)**:
   - `.agents/agents/education-specialist.agent.md` を作成。
   - YAML Frontmatter (`name`, `description`) の設定。
   - 責務定義：情報処理促進法およびIPA ITSS（ITスキル標準）に基づく業務・対象者像・技術水準。
   - 利用可能スキルマッピングテーブル (create-issue/polish-issue, adr-workflow, threat-modeling, run-security-scanner, review-diff-code)。
   - 行動規範：受講者の自律成長支援 (最優先)、定量的・定性的目標設定、専門エージェント連携、丁寧な日本語応答スタイル。
   - 機能プロトコル:
     - 機能 A: ITSS スキルレベル診断 (Level 1〜7) および個別研修ロードマップ策定。
     - 機能 B: 学習成果物（設計書/コード/テスト）の評価および専門エージェント群への指導連携。
   - 初期応答テンプレートの構築。

2. **PM 品質検証 (PM担当)**:
   - 課題管理・プロセス適合性の確認。
   - プロジェクト全体のマルチエージェント RACI / アーキテクチャとの整合性確認。

3. **QA 品質検証 (QA担当)**:
   - markdownフォーマット・相対パス参照ルール遵守確認。
   - 必須セクションの漏れやプレースホルダー残存がないかの自動・手動チェック。
   - DoD項目の全クリア確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `.agents/agents/education-specialist.agent.md` が作成され、必須全セクション（Frontmatter, 責務, 委譲テーブル, 行動規範, 応答プロトコル, 初期応答）が網羅されていること。
- [x] すべてのファイル参照・内部リンクが相対パス（`file:///...` 不使用）になっていること。
- [x] ITSS スキルレベル判定、研修ロードマップ、教育評価、マルチエージェント連携機能が明確に定義されていること。
- [x] PM によるプロジェクト整合性確認が完了し、問題がないこと。
- [x] QA による品質テスト（フォーマット・リンク・構造検証）が完了し合格していること。
