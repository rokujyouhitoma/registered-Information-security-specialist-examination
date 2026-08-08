# [FEAT/SCENARIO] 【突然変異型】AIサイバー攻撃インシデント逆引きアタックマップ (Interactive Attack Blast Radius Visualizer) の実装 (ID: 119)

## メタデータ

- **ID**: 119
- **種別**: Feature / Scenario / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & UIUX (`ui-ux-designer`)
- **ターゲットブランチ**: `feat/119-interactive-cyber-attack-blast-radius-visualizer`

---

## 1. 概要 / Summary

[REQ-02 ペルソナ 2（高橋 健一：実務経験者・記述対策）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) および [ペルソナ 4（鈴木 大介：直前対策）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) の科目B午後記述突破力を飛躍的に向上させるため、従来の静的な解説を超えた **「AIサイバー攻撃インシデント逆引きアタックマップ (Interactive Attack Blast Radius Visualizer)」** を [攻撃シナリオ解析ドキュメント (`docs/scenarios/attack_scenarios_analysis.md`)](docs/scenarios/attack_scenarios_analysis.md) に新設・実装します。

攻撃者の侵入経路（Initial Access）、横展開（Lateral Movement）、権限昇格、C2通信、データ流出（Exfiltration）の各フェーズにおいて、ネットワーク境界、DMZ、内部LAN、SOC監視ポイント、感染隔離（Containment Action）ステップをインタラクティブなノード選択マップとシーケンス視覚化で表現し、科目B記述で問われる「適切な初期対応手順（物理・論理隔離等）」を体験的に学習できる環境を提供します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/scenarios/attack_scenarios_analysis.md`**:
   - インタラクティブ・アタックマップ・コンポーネント（攻撃フェーズ切り替え、感染影響範囲 Blast Radius ハイライト、初動対応シミュレーター）を追加。
2. **[MODIFY] `src/data/attack_scenarios.json` / `docs/data/attack_scenarios.json`**:
   - 攻撃フェーズ、影響範囲ノード、IPA推奨初期対応、科目B模範記述解答（30〜50字適合）のデータ構造を拡充。
3. **[REGENERATE] `site/scenarios/attack_scenarios_analysis.html`**:
   - `make build` により再生成。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。静的 HTML 内でのクライアントサイド・レスポンシブ視覚化コンポーネント。
2. **② アーキテクチャ・データ構造影響**: 影響なし。既存の `attack_scenarios.json` スキーマにノード影響マップ属性を追加。
3. **③ セキュリティ・ガバナンス影響**: XSS 防御、絶対パス排除の遵守。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: 科目B午後記述で合否を分ける「ネットワーク構成図・ログからの攻撃範囲の特定と初動隔離」を、ゲーム感覚で直感的にトレーニングできる圧倒的価値を提供。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`docs/scenarios/attack_scenarios_analysis.md` へのインタラクティブコンポーネント実装**:
   - 攻撃シナリオ（標的型メール -> ランサムウェア横展開 / APIキー漏洩 -> クラウドデータ奪取 / Active Directory 権限昇格等）を選択できるタブUI。
   - 侵入ノード（Initial Access）、踏み台（Pivot）、影響端末（Blast Radius）がカラーグラデーションで動的に点滅ハイライトするノードマップ。
   - 「適切な初動対応を選んで実行」ボタン（例: `[端末のLAN物理隔離]` `[C2 IPのアドミニストレーティブブロック]`）をクリックすると、二次被害防止のアニメーションと IPA 公式シラバス Ver.2.1 適合の記述解答（30〜50字制限内）をオーバーレイ出力。
2. **`make build` による同期と品質検証**:
   - `make build` で HTML 生成。
   - `verify-quality-gates` スキルを実行し全テスト 100% PASS を確認。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] 攻撃フェーズ（初期侵入 -> 横展開 -> C2/流出）ごとに影響範囲 (Blast Radius) と防御ノードが動的ハイライト表示されること。
- [x] 各攻撃シナリオにおいて「IPA推奨の初動対応アクション（ネットワーク隔離・ログ保全等）」を選択でき、科目B記述模範解答（文字数制限適合 30〜50字）が表示されること。
- [x] `make build` により `site/scenarios/attack_scenarios_analysis.html` が正常同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, QA)**: インタラクティブ攻撃影響範囲マップおよび初動対応シミュレーター設計の承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
