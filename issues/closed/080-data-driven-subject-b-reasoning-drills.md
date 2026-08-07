---
ID: 080
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 外部 JSON データ駆動による科目 B 長文記述思考プロセス演習ツールの開発と Web UI/UX 設問分解ナビゲーターの導入 (ID: 080)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき全 13 エージェントの聞き取りを実施した結果選出された最重要課題として、IPA 科目 B 長文記述式の解法プロセス演習データを外部 JSON (`src/data/subject_b_drills.json`) として構造化し、受講者が長文問題文の分解・キーワード抽出・30〜50字要約を対話的にトレーニングできる Web UI/UX 設問分解ナビゲーター ([docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)) を開発・構築した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [.agents/skills/polish-issue/SKILL.md](../.agents/skills/polish-issue/SKILL.md)
- 関連資料: [docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/subject_b_drills.json](../src/data/subject_b_drills.json) [NEW]
- [x] [docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)

---

## 4. 実装方針 / Implementation Plan (Review Gate 2 多段階推敲済み)
Target Branch: `feat/080-data-driven-subject-b-reasoning-drills`

1. **演習データの構造化 (ST & EDU)**:
   - `src/data/subject_b_drills.json` を作成し、代表的な長文演習ケース（例: SAML/OAuth2.0 トークン漏洩時の影響範囲特定、DNS キャッシュポイズニングにおけるドメイン検証）を定義。

2. **Web インタラクティブ解法ナビゲーターの構築 (UIUX & SC)**:
   - `docs/subject_b/reasoning_guide.md` に問題文・設問・キーワード分解ステップが学べる対話型演習 UI を組込み。

3. **自動テスト・AU 最終監査 (QA & AU)**:
   - `scripts/build_html_docs.py` によるデプロイおよび `npm run build && npm test` の全件合格。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `src/data/subject_b_drills.json` が作成され長文解法演習データが定義されていること
- [x] `docs/subject_b/reasoning_guide.md` 上で設問分解ナビゲーター UI が動作すること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
