---
ID: 052
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] ITスペシャリスト（情報検索 / IR）エージェント (.agents/agents/it-specialist-information-retrieval.agent.md) の作成および品質検証 (ID: 052)

## 1. 概要 / Summary
既存の専門家エージェント群（DB, NW, SC等）の定義フォーマットおよびIPA/ITSS（ITスキル標準）に準拠した**ITスペシャリスト（情報検索 / IR）**エージェント (`.agents/agents/it-specialist-information-retrieval.agent.md`) を新規追加する。
また、作成されたエージェント定義に対し、PM（Project Manager）および QA（Quality Assurance Specialist）がそれぞれの観点で品質検証および整合性確認を実施する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA ITスキル標準 (ITSS V3 2011)](../references/itss_v3_2011/README.md) - ITスペシャリスト (IT Specialist) テクノロジ系分野
- 関連資料: [.agents/agents/database-specialist.agent.md](../.agents/agents/database-specialist.agent.md)
- 関連資料: [.agents/agents/network-specialist.agent.md](../.agents/agents/network-specialist.agent.md)
- 関連資料: [.agents/agents/information-security-specialist.agent.md](../.agents/agents/information-security-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [it-specialist-information-retrieval.agent.md](../.agents/agents/it-specialist-information-retrieval.agent.md)
- [x] [issues/README.md](README.md)
- [x] [issues/closed/052-create-it-specialist-ir-agent.md](closed/052-create-it-specialist-ir-agent.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/052-create-it-specialist-ir-agent`

1. **ITスペシャリスト（情報検索 / IR）エージェント定義の作成 (ST担当)**:
   - `.agents/agents/it-specialist-information-retrieval.agent.md` を作成。
   - YAML Frontmatter (`name`, `description`) の設定。
   - 責務定義：情報処理促進法およびIPA ITSS（ITスペシャリスト/情報検索・アルゴリズム・データ構造テクノロジ）に基づく業務・対象者像・技術水準。
   - 利用可能スキルマッピングテーブル (STRIDE脅威分析, run-security-scanner, create-issue/polish-issue, review-diff-code, adr-workflow)。
   - 行動規範：検索精度（Precision/Recall/NDCG等）と検索速度・メモリ効率（FM-index, ベクター検索, Bigram/形態素解析）の両立、クエリサニタイズ・ReDoS対策・インデックス汚染防止などのセキュリティ評価、評価・助言の明示、日本語応答スタイル。
   - 機能プロトコル:
     - 機能 A: 情報検索 (IR) インデックス設計・検索モデル（FM-index, N-gram, 転置インデックス, ベクター検索, スパース/デンス検索等）の評価・選定・調整。
     - 機能 B: 検索精度・評価指標（MAP/NDCG/適合率/再現率）・レスポンスパフォーマンス・セキュリティの検証・改善指導。
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
- [x] `.agents/agents/it-specialist-information-retrieval.agent.md` が作成され、必須全セクション（Frontmatter, 責務, 委譲テーブル, 行動規範, 応答プロトコル, 初期応答）が網羅されていること。
- [x] すべてのファイル参照・内部リンクが相対パス（`file:///...` 不使用）になっていること。
- [x] 情報検索 (IR) 技術（FM-index, トークナイズ, ベクター検索, 評価指標, 検索セキュリティ）に関するITスペシャリストとしての技術水準が明確であること。
- [x] PM によるプロジェクト整合性確認が完了し、問題がないこと。
- [x] QA による品質テスト（フォーマット・リンク・構造検証）が完了し合格していること。
