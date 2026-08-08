# [FEAT/AGENTS] .agents カスタムスキル群 (quiz-generator, audit-persona-coverage) および一次情報リファレンス設定の実装 (ID: 120)

## メタデータ

- **ID**: 120
- **種別**: Feature / Agents / Infrastructure
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & Agent Specialist (`agent-expert`)
- **ターゲットブランチ**: `feat/120-add-quiz-generator-persona-audit-skills-and-reference-knowledge`

---

## 1. 概要 / Summary

.agents ディレクトリの機能を最大限に活用し、情報処理安全確保支援士の学習ポータルの品質維持・拡充を自動化するための以下 3 つのエージェント拡張（スキル・リファレンス・共有設定）を実装します。

1. **`quiz-generator` スキル ([.agents/skills/quiz-generator/SKILL.md](.agents/skills/quiz-generator/SKILL.md))**:
   - IPA公式シラバス Ver.2.1 適合の4択・記述式問題を厳格な用語チェック・文字数チェック付きで自動生成・検証登録するプロシージャスキル。
2. **`audit-persona-coverage` スキル ([.agents/skills/audit-persona-coverage/SKILL.md](.agents/skills/audit-persona-coverage/SKILL.md)) & 検証スクリプト**:
   - [REQ-02 ペルソナ要件](../project-docs/requirements/REQ-02-user_personas_and_scenarios.md) に対する全ドキュメントの網羅率を測定・レポート生成するスキル。
3. **一次情報リファレンス (`references/`) & スキル共有設定 (`skills.json`)**:
   - `.agents/skills/quiz-generator/references/IPA_Syllabus_Ver2.1_Summary.md` および `.agents/skills.json` を配備。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[NEW] `.agents/skills/quiz-generator/SKILL.md`**: IPA公式シラバス適合問題生成プロシージャ。
2. **[NEW] `.agents/skills/quiz-generator/references/IPA_Syllabus_Ver2.1_Summary.md`**: 参照一次情報。
3. **[NEW] `.agents/skills/audit-persona-coverage/SKILL.md`**: ペルソナ適合性監査スキル。
4. **[NEW] `scripts/audit_persona_coverage.py`**: ペルソナ網羅度自動集計スクリプト。
5. **[NEW] `.agents/skills.json`**: チーム共有スキル構成ファイル。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] `.agents/skills/quiz-generator/SKILL.md` および一次参照文書が正しく配置され利用可能であること。
- [x] `.agents/skills/audit-persona-coverage/SKILL.md` および `scripts/audit_persona_coverage.py` が正常実行でき、ペルソナ適合率 100% をアサートできること。
- [x] `.agents/skills.json` が有効な JSON 構造で配置されること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。
