---
ID: 056
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/DOCS] 科目B対応 ハンズオン・インシデント解析実践演習シナリオ集 (docs/scenarios/hands_on_incident_analysis.md) の作成 (ID: 056)

## 1. 概要 / Summary
EDU（教育スペシャリスト）および SC（セキュリティスペシャリスト）の共同コンテンツ見直しに基づき、情報処理安全確保支援士試験の**科目B（旧午後Ⅰ/午後Ⅱ 長文記述式）**に対応した**ハンズオン・インシデント解析実践演習シナリオ集** (`docs/scenarios/hands_on_incident_analysis.md`) を新規構築した。
Webアクセスログ/WAFログ分析、クラウド責任共有モデル・IAM不備、生成AIプロンプトインジェクション対策、ネットワーク境界制御のケーススタディと、記述式解法思考プロセス・採点基準・模範解答を提示した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [IPA シラバス Ver.2.1 (references/syllabus_sc_ver2_1.pdf)](../../references/syllabus_sc_ver2_1.pdf)
- 関連資料: [IPA シラバス 追補版 Ver.4.0 (references/syllabus_sc_am2_tsuiho4_0.pdf)](../../references/syllabus_sc_am2_tsuiho4_0.pdf)
- 関連資料: [.agents/agents/information-security-specialist.agent.md](../../.agents/agents/information-security-specialist.agent.md)
- 関連資料: [.agents/agents/education-specialist.agent.md](../../.agents/agents/education-specialist.agent.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [hands_on_incident_analysis.md](../../docs/scenarios/hands_on_incident_analysis.md)
- [x] [index.md](../../docs/index.md)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/056-create-subject-b-incident-analysis-scenarios`

1. **SC 主導 & EDU 連携によるシナリオ教材作成 (`docs/scenarios/hands_on_incident_analysis.md`)**:
   - シナリオ 1: Web アプリ攻撃ログ分析（SQLi, Path Traversal, XSS のタイムラインと被害特定演習）。
   - シナリオ 2: クラウド / IAM 設定ミスとゼロトラスト境界制御（S3バケット公開、Strict CSP違反、最小権限離脱）。
   - シナリオ 3: 生成AIプロンプトインジェクション / LLMデータ漏洩防御演習（追補版 Ver.4.0 準拠）。
   - 各シナリオに問題文、構成図/ログデータ、設問（科目B形式）、解法思考プロセス、採点基準、模範解答を掲載。
2. **ナビゲーション更新 (`docs/index.md`)**:
   - 学習ドキュメントポータルへ本演習集のリンクを追加。
3. **品質検証**:
   - 相対パスルールの遵守、IPA 公式用語との完全整合。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/scenarios/hands_on_incident_analysis.md` が作成され、全実戦演習シナリオおよび解法・採点基準が網羅されていること。
- [x] ファイル内の全内部リンクが相対パスルールに準拠していること。
- [x] `docs/index.md` に正常にハイパーリンクが追加されていること。
