# [FEAT/EDU] REQ-02 連動型 ユーザーペルソナ別出題モード (Persona-based Learning Drill) の quiz_runner.py および クイズデータ拡張 (ID: 110)

## メタデータ

- **ID**: 110
- **種別**: Feature / Mutation Proposal
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: EDU (`education-specialist`) & ST (`information-technology-strategist`)
- **ターゲットブランチ**: `feat/110-implement-persona-based-quiz-drills`

---

## 1. 概要 / Summary

[REQ-02 ユーザー提供価値・ペルソナ・シナリオ詳細定義書](../project-docs/requirements/REQ-02-user_personas_and_scenarios.md) で策定した 4 大ユーザーペルソナ（① 受験者、② 有資格者、③ Webエンジニア、④ CSIRT/SOC）に直接資するため、クイズ問題データ `src/data/quiz_questions.json` に `persona` タグ属性を追加拡張し、CLI 診断ツール `scripts/quiz_runner.py` に `--persona <persona_id>` オプション付きの**「ペルソナ別・目的別出題モード (Persona-based Learning Drill)」** を実装・統合します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `src/data/quiz_questions.json`**:
   - 各クイズ問題に `"persona": "persona1"` （例: persona1=受験者, persona2=有資格者, persona3=Web開発者, persona4=CSIRT）属性を付与。
2. **[MODIFY] `scripts/quiz_runner.py`**:
   - `--persona <id>` CLI 引数によるフィルター出題モードを追加。
   - `--test` 自動テストモードにおいて Persona タグの正常ロードと出題ロジックを自動検証。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。JSON データの互換性を維持し、`quiz.html` および CLI の既存動作に悪影響を与えない。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`quiz_questions.json` の各要素に `persona` プロパティを追加する前方互換拡張。
3. **③ セキュリティ・ガバナンス影響**: 影響なし。CLI 引数の安全なバリデーションと相対パスルールの継続遵守。
4. **④ 品質・回帰テスト影響**: `npm test` (`quiz_runner.py --test`) が Persona 演習機能を含めて 100% PASS することを確認。
5. **⑤ 学習体験・UI/UX影響**: 4 大ペルソナの目的（午後記述対策、最新追補版復習、Web開発セキュア設計、CSIRT初動）に応じた選択的演習が可能になり、学習価値が最大化。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] `src/data/quiz_questions.json` 内の全問題に `persona` タグが定義されていること。
- [x] `python3 scripts/quiz_runner.py --persona persona1` 等でペルソナ指定出題が正常動作すること。
- [x] `make build` により `site/data/quiz_questions.json` および `docs/data/quiz_questions.json` へ正常同期されること。
- [x] `verify-quality-gates` スキルを実行し、Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 5. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA & EDU)**: REQ-02 ペルソナと出題タグの対応関係および CLI 引数インターフェースの設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
