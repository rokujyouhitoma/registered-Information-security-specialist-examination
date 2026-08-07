---
ID: 072
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による ITSS 到達度セルフ診断ツールの開発と Web UI/UX インタラクティブ診断機能の実装 (ID: 072)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき全 11 エージェントの聞き取りを実施した結果選出された最重要課題として、IPA ITSS V3 2011 に準拠したスキル到達度判定データを外部 JSON (`src/data/itss_skills.json`) として非結合化し、受講者がブラウザ上で直感的に自身のレベル (Level 1〜4) とスキル判定をセルフチェックできる Web UI/UX インタラクティブ診断ツール ([docs/itss_self_assessment_guide.md](../docs/itss_self_assessment_guide.md)) を開発・構築した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [docs/itss_self_assessment_guide.md](../docs/itss_self_assessment_guide.md)
- 関連資料: [project-docs/architecture/SYS-02-system_low_level_design.md](../project-docs/architecture/SYS-02-system_low_level_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/itss_skills.json](../src/data/itss_skills.json) [NEW]
- [x] [docs/itss_self_assessment_guide.md](../docs/itss_self_assessment_guide.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/072-data-driven-itss-self-assessment-tool`

1. **ITSS スキル判定データ JSON の構築 (STR, SC, ST)**:
   - `src/data/itss_skills.json` を作成し、Level 1 (IT基礎) 〜 Level 4 (情報処理安全確保支援士・専門高度) のスキル評価カテゴリとチェック項目を定義。

2. **Web インタラクティブ診断 UI/UX の構築 (UIUX)**:
   - `docs/itss_self_assessment_guide.md` にチェックボックス式インタラクティブ診断フォームおよび到達レベル自動判定ロジックを統合。

3. **ビルドおよび全自動テストの統合 (QA & AU)**:
   - `scripts/build_html_docs.py` で `itss_skills.json` の同期および全自動テスト (`npm run build && npm test`) の合格を達成。
   - AU システム監査人による適合判定の承認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/itss_skills.json` に ITSS Level 1〜4 の評価軸が定義されていること
- [x] `docs/itss_self_assessment_guide.md` (➔ `site/itss_self_assessment_guide.html`) にてリアルタイムレベル判定が動作すること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
