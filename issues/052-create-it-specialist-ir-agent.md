---
ID: 052
種別: Feature
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [FEAT] ITスペシャリスト（情報検索 / IR）エージェント (.agents/agents/it-specialist-information-retrieval.agent.md) の作成および品質検証 (ID: 052)

## 1. 概要 / Summary
既存の専門家エージェント群（DB, NW, SC等）の定義フォーマットおよびIPA/ITSS（ITスキル標準）に準拠した**ITスペシャリスト（情報検索 / IR）**エージェント (`.agents/agents/it-specialist-information-retrieval.agent.md`) を新規追加する。
作成されたエージェント定義に対し、PM（Project Manager）および QA（Quality Assurance Specialist）がそれぞれの観点で品質検証および整合性確認を実施する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA ITスキル標準 (references/okf/itss_v3_2011_it_specialist_career.md)](../references/okf/itss_v3_2011_it_specialist_career.md)
- 関連資料: [.agents/agents/database-specialist.agent.md](../.agents/agents/database-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [it-specialist-information-retrieval.agent.md](../.agents/agents/it-specialist-information-retrieval.agent.md)
- [ ] [issues/README.md](README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/052-create-it-specialist-ir-agent`

1. **ITスペシャリスト（情報検索 / IR）エージェント定義の作成 (ST担当)**:
   - `.agents/agents/it-specialist-information-retrieval.agent.md` を作成。
   - YAML Frontmatter (`name`, `description`) の設定。
   - 責務定義：IPA ITSS（ITスペシャリスト/情報検索・アルゴリズム・データ構造テクノロジ）に基づく業務・対象者像・技術水準。
   - 利用可能スキルマッピングテーブル、行動規範、機能プロトコル、初期応答テンプレートの構築。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `.agents/agents/it-specialist-information-retrieval.agent.md` が作成され、全必須セクションが網羅されていること。
- [ ] すべてのファイル参照・内部リンクが相対パスルールに適合していること。
