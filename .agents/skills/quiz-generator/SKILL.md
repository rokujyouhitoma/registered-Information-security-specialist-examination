---
name: quiz-generator
description: IPA情報処理安全確保支援士シラバスVer.2.1適合のクイズ演習問題を自動作成・検証し、src/data/quiz_questions.json に登録するスキル。
---

# quiz-generator Skill Instructions

本スキルは、情報処理安全確保支援士の試験対策問題（4択問題・科目B記述演習問題）をIPA公式シラバス準拠で自動作成・検証・登録する標準プロシージャです。

## ワークフロー

1. **参照ナレッジの確認**:
   - [.agents/skills/quiz-generator/references/IPA_Syllabus_Ver2.1_Summary.md](references/IPA_Syllabus_Ver2.1_Summary.md) を閲覧し、公式用語・カテゴリ分類を確認する。

2. **問題構造データの生成**:
   - `src/data/quiz_questions.json` のスキーマ（`id`, `category`, `persona`, `question`, `options`, `answerIndex`, `explanation`）に適合させる。
   - 4択問題の場合、正解インデックス (`answerIndex`) は常に 0〜3 の間でランダム分散させ、特定位置に固定しないこと。
   - 記述問題の場合、模範解答は 30〜50 文字の制限内（`[48字 / 45-50字制限適合]`）とすること。

3. **品質検証**:
   - `python3 scripts/quiz_runner.py --test` を実行し、全問題データがエラーなくロード・合格判定されるか自動アサートする。
