---
ID: 033
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] CLI対話型 理解度自己診断クイズツールの構築 (Phase 10) (ID: 033)

## 1. 概要 / Summary
`docs/glossary/` 配下の全 2,101 用語の高品質データベースを読み込み、ターミナル上でインタラクティブに四肢択一クイズや穴埋め問題を出題し、解答結果の採点・弱点分野の判定・用語解説のフィードバックを行う CLI 診断スクリプト `scripts/quiz_runner.py` を外部ライブラリ非依存（Python標準ライブラリのみ）でフルスクラッチ構築する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 10）
- `docs/glossary/syllabus_ver2_1.md` / `docs/glossary/syllabus_tsuiho_ver4_0.md`

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [quiz_runner.py](../scripts/quiz_runner.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/033-create-cli-quiz-runner`

1. **スクリプト設計**:
   - Markdown パーサーを自作し、`#### <a id="..."></a>用語名` の概要・出題ポイントから問題と選択肢（ダミー選択肢の動的生成含む）を構築。
   - CLI 対話モード（`--interactive`）および自動テストモード（`--test`）を実装。
2. **検証**:
   - `python3 scripts/quiz_runner.py --test` でエラーなく問題が生成・採点できることを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `scripts/quiz_runner.py` が正常動作し、クイズの出題・採点・結果表示が行えること
