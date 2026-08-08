# [FEAT/SCENARIO] 突然変異型攻撃演習「ソーシャルエンジニアリング＆フィッシングメール疑似判定トレーナー」の実装 (ID: 125)

## メタデータ

- **ID**: 125
- **種別**: Feature / Scenario / Interactive Tool
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: CSIRT (`csirt-lead`) & IR (`incident-responder`) & UIUX (`ui-ux-designer`)
- **ターゲットブランチ**: `feat/125-phishing-mail-header-analyzer-trainer`

---

## 1. 概要 / Summary

[REQ-02 ペルソナ 1（初学者）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md), [ペルソナ 3（シスアド）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md), および [ペルソナ 4（直前受検者）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) のメールセキュリティ・送信ドメイン認証 (SPF/DKIM/DMARC) およびソーシャルエンジニアリング判定スキルを飛躍的に高めるため、[インシデント解析ガイド (`docs/scenarios/hands_on_incident_analysis.md`)](docs/scenarios/hands_on_incident_analysis.md) および [メールセキュリティ用語解説 (`docs/glossary/terms/email-security.md`)](docs/glossary/terms/email-security.md) に、実物のメールヘッダー生ログを分析し、偽装・改ざんの有無を1タップで検証・スコアリングする「フィッシングメール疑似判定トレーナー」を新設します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/scenarios/hands_on_incident_analysis.md`**:
   - メールヘッダー生ログインタラクティブ解析＆偽装判定トレーナー UI コンポーネントを追加。
2. **[MODIFY] `docs/glossary/terms/email-security.md`**:
   - 実務ヘッダー解析シミュレータへの導線リンクと説明を追加。
3. **[REGENERATE] `site/scenarios/hands_on_incident_analysis.html` & `site/glossary/terms/email-security.html`**:
   - `make build` により再生成。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] メールヘッダー生ログ（Received, Authentication-Results, Return-Path, DKIM-Signature）を切り替えて偽装箇所を指摘・判定できるインタラクティブ UI が配置されていること。
- [x] SPF (Pass/Fail/SoftFail), DKIM (Pass/Fail), DMARC (Pass/Reject/Quarantine) の検証結果に応じた診断判定と解説が表示されること。
- [x] `make build` により全 HTML およびアセットが正常再生成されること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認。
- [x] AU による最終判定で【適合 (PASS)】を得ること。
