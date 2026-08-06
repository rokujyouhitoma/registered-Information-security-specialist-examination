---
ID: 057
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/DOCS] ITSS スキルレベル対応 学習到達度セルフチェック＆教育ガイド (docs/itss_self_assessment_guide.md) の作成 (ID: 057)

## 1. 概要 / Summary
EDU（教育スペシャリスト）および SC（セキュリティスペシャリスト）の共同見直しに基づき、ITSS (ITスキル標準 V3 2011) のレベル 1〜4 に準拠した**学習到達度セルフチェック＆教育ガイド** (`docs/itss_self_assessment_guide.md`) を新規構築した。
受講者が自身のスキルレベル（暗号、認証、NW、Webセキュリティ、ガバナンス・監査）をセルフチェックできるアセスメントマトリックスおよび各領域での専門エージェント受講ガイドを提供した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA ITスキル標準 スキル編 (references/okf/itss_v3_2011_it_specialist_skill.md)](../../references/okf/itss_v3_2011_it_specialist_skill.md)
- 関連資料: [.agents/agents/education-specialist.agent.md](../../.agents/agents/education-specialist.agent.md)
- 関連資料: [.agents/agents/information-security-specialist.agent.md](../../.agents/agents/information-security-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [itss_self_assessment_guide.md](../../docs/itss_self_assessment_guide.md)
- [x] [index.md](../../docs/index.md)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/057-create-itss-self-assessment-guide`

1. **EDU 主導 & SC 連携による到達度ガイド作成 (`docs/itss_self_assessment_guide.md`)**:
   - 分野別（暗号・認証、NW・通信、Web・Appセキュリティ、ガバナンス・リスク・監査、情報検索 IR）の ITSS レベル 1〜4 セルフチェック項目。
   - レベル判定結果に応じた推奨学習ロードマップと学習リソース。
   - 弱点克服のためのリポジトリ内専門エージェント（SC, IR, DB, NW, SA）活用受講セッション。
2. **ナビゲーション更新 (`docs/index.md`)**:
   - `docs/index.md` へリンクを追加。
3. **品質検証**:
   - 相対パスルールの徹底。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/itss_self_assessment_guide.md` が作成され、レベル1〜4のセルフチェック項目およびエージェント連携ガイドが網羅されていること。
- [x] 全内部リンクが相対パスルールに準拠していること。
- [x] `docs/index.md` にハイパーリンクが追加されていること。
