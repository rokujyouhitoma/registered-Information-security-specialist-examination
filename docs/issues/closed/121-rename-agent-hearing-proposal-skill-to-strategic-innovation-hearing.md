# [REFACTOR/AGENTS] agent-hearing-proposal スキルの strategic-innovation-hearing への名称変更・リファクタリング (ID: 121)

## メタデータ

- **ID**: 121
- **種別**: Refactor / Agents
- **優先度**: Medium
- **ステータス**: Closed
- **担当スペシャリスト**: Agent Specialist (`agent-expert`)
- **ターゲットブランチ**: `feat/121-rename-agent-hearing-proposal-skill-to-strategic-innovation-hearing`

---

## 1. 概要 / Summary

エージェントスキルの役割と機能をより直感的かつ明確にするため、`.agents/skills/agent-hearing-proposal` スキルを **`strategic-innovation-hearing`** にリネームします。

本スキルは、全13大専門エージェントからのヒアリング、突然変異的（非連続的）革新アイデアの発案、変更影響アセスメント、および 4 大品質ゲート（Quality Gates）を通した開発推進を担うプロシージャです。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[RENAME] `.agents/skills/agent-hearing-proposal` ➔ `.agents/skills/strategic-innovation-hearing`**:
   - ディレクトリのリネームおよび `.agents/skills/strategic-innovation-hearing/SKILL.md` の YAML ヘッダー (`name: strategic-innovation-hearing`) の更新。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] `.agents/skills/strategic-innovation-hearing/SKILL.md` が正しく配置され、YAML `name` 属性が `strategic-innovation-hearing` に更新されること。
- [x] スキル呼び出しおよび自動検出 (Automatic Discovery) が正常動作すること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認すること。
- [x] AU による最終適合判定で【適合 (PASS)】を得ること。
