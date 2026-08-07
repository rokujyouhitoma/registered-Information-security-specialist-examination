---
ID: 089
種別: Refactor
優先度: High
ステータス: In Progress
---

# [REFACTOR] agent-hearing-proposal スキルおよび PROC-02 における IR エージェントと SA の文字列データ圧縮・圧縮全文索引 (FM-Index) 共同検討規定の追加 (ID: 089)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルおよび `PROC-02-agent_roles.md` を改訂し、**IR (情報検索スペシャリスト)** が **SA (システムアーキテクト)** と密に協調し、検索エンジンの「文字列データ圧縮技術（Front Coding, 変長符号化）」および「簡潔データ構造による圧縮全文索引（FM-Index / BWT / Wavelet Tree）」のアーキテクチャ検討・設計・最適化を行う役割分担を明記・強化した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- [x] [project-docs/processes/PROC-02-agent_roles.md](../project-docs/processes/PROC-02-agent_roles.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/089-ir-sa-string-compression-fm-index-collaboration`

1. **IR & SA 共同検討規定の明記**:
   - `SKILL.md` および `PROC-02-agent_roles.md` に IR と SA による文字列データ圧縮・簡潔データ構造・圧縮全文索引の検討義務を記述。

2. **全自動ビルド・検証**:
   - `npm run build && npm test` の実行。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `SKILL.md` および `PROC-02-agent_roles.md` に IR と SA の文字列データ圧縮・圧縮全文索引に関する共同検討規定が明確化されていること
- [x] `npm run build && npm test` が全件合格すること
