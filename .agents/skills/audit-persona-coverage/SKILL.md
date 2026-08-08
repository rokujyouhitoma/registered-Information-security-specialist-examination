---
name: audit-persona-coverage
description: REQ-02 ユーザーペルソナ（初学者・記述対策・シスアド・直前受検者）に対する全ドキュメントの価値適合率を自動検証・集計するスキル。
---

# audit-persona-coverage Skill Instructions

本スキルは、情報処理安全確保支援士の学習ポータルが 4 つの定義ペルソナ（佐々木優太、高橋健一、中村美咲、鈴木大介）の学習向上に正しく寄与しているかを自動監査するスキルです。

## ワークフロー

1. **適合要件の確認**:
   - [project-docs/requirements/REQ-02-user_personas_and_scenarios.md](../../project-docs/requirements/REQ-02-user_personas_and_scenarios.md) を読み込み、各ペルソナの受検シナリオ・ニーズを確認する。

2. **自動監査スクリプトの実行**:
   - `python3 scripts/audit_persona_coverage.py` を実行し、全ドキュメントのペルソナアライメント率 100% を確認する。
