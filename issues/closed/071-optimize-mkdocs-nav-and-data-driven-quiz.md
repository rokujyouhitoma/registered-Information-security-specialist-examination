---
ID: 071
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] mkdocs.yml ナビゲーション構造の完全最適化およびデータ駆動型演習クイズ機能の開発 (ID: 071)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき全 11 エージェントの聞き取りを実施した結果選出された最重要課題として、`mkdocs.yml` の `nav:` ナビゲーション構造を全学習ドキュメントが網羅されるよう完全再編し、外部 JSON (`src/data/quiz_questions.json`) に基づくデータ駆動型の対話型演習クイズ機能（CLI `scripts/quiz_runner.py` および Web 画面 `docs/quiz.md`）を公開・開発した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [mkdocs.yml](../mkdocs.yml)
- 関連資料: [project-docs/architecture/SYS-02-system_low_level_design.md](../project-docs/architecture/SYS-02-system_low_level_design.md)
- 関連資料: [scripts/quiz_runner.py](../scripts/quiz_runner.py)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [mkdocs.yml](../mkdocs.yml)
- [x] [src/data/quiz_questions.json](../src/data/quiz_questions.json) [NEW]
- [x] [scripts/quiz_runner.py](../scripts/quiz_runner.py)
- [x] [docs/quiz.md](../docs/quiz.md) [NEW]
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/071-optimize-mkdocs-nav-and-data-driven-quiz`

1. **`mkdocs.yml` の `nav:` 体系の全面整理 (UIUX)**:
   - 「ホーム」「総合検索」「演習クイズ」「シラバス体系」「総合用語辞書」「科目B対策・事例解析」「試験対策ガイド」が漏れなく網羅された最新構造に再編。

2. **データ駆動クイズ問題 JSON の構築 (全専門エージェント)**:
   - `src/data/quiz_questions.json` を作成し、全 11 専門領域に渡る高品質 4 択実戦クイズデータを構築。

3. **CLI クイズエンジンのデータ駆動化 (QA & ST)**:
   - `scripts/quiz_runner.py` を外部 JSON データロード型へ改修。

4. **Web インタラクティブクイズ UI の開発 (UIUX)**:
   - `docs/quiz.md` を作成し、ブラウザ上で全問題に回答・採点・フィードバックが得られる Google 風シンプル UI クイズ画面を構築。
   - `scripts/build_html_docs.py` に `quiz.md` の HTML 化および JSON 同期処理を追加。

5. **全自動検証と AU システム最終監査 (QA & AU)**:
   - `npm run build && npm test` (特に `npm run test:quiz`) の合格および AU 監査承認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `mkdocs.yml` の `nav:` に全ドキュメントが漏れなく体系的に配置されていること
- [x] `src/data/quiz_questions.json` が作成され、全専門分野の実践クイズデータが定義されていること
- [x] `scripts/quiz_runner.py` がデータ駆動で正常に動作し `npm run test:quiz` が合格すること
- [x] Web インタラクティブクイズ画面 (`docs/quiz.md` ➔ `site/quiz.html`) が公開され正常にプレイ可能なこと
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
