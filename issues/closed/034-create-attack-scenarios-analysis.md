---
ID: 034
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] サイバー攻撃シナリオ・ログ分析ハンズオンケーススタディの作成 (Phase 11) (ID: 034)

## 1. 概要 / Summary
情報セキュリティスペシャリスト科目B問題で出題される高度なサイバー攻撃事例（例: VPN脆弱性経由の侵入、Active Directory 横展開、ランサムウェア二重脅迫）をモデルとし、攻撃キルチェーン、Windowsイベントログ・ネットワークログの解読ポイント、および初動トリアージ手順を解説する分析ドキュメント `docs/scenarios/attack_scenarios_analysis.md` を作成する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 11）
- IPA科目B試験出題パターン（インシデント対応・ログ分析領域）

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/034-create-attack-scenarios-analysis`

1. **ケーススタディ作成**:
   - 侵入フェーズ: 公開VPN機器の未パッチ脆弱性（RCE）とC2通信（コネクトバック）。
   - 横展開フェーズ: Pass-the-Hash / Kerberoasting 攻撃と Active Directory イベントログ解析。
   - 目的遂行フェーズ: データの暗号化・DLP回避・二重脅迫。
2. **ログ分析テーブルの組み込み**:
   - イベントID (4624, 4672, 4688, 4768) とログ判定条件。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/scenarios/attack_scenarios_analysis.md` が作成され、詳細な攻撃シナリオとログ解読法が整理されていること
