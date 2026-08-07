---
ID: 069
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] Web 学習ポータルの PWA・UI/UX（TOC・レスポンシブ）刷新と科目 B ビジュアル解法ガイドの拡充 (ID: 069)

## 1. 概要 / Summary
`agent-hearing-proposal` スキルに基づき全 11 エージェントの聞き取りを実施した結果選出された最重要課題として、Web 学習ポータル (`docs/` & `site/`) の PWA (ServiceWorker オフラインキャッシュ) 化、UIUX デザイナー主導による読書用 TOC サイドバー・テーマ切り替え・WCAG 2.1 向上、および科目 B / 攻撃シナリオの視覚的ビジュアル化（Mermaid シーケンス図・Safe vs Vulnerable コード比較）を一括で推進・完了した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/skills/agent-hearing-proposal/SKILL.md](../.agents/skills/agent-hearing-proposal/SKILL.md)
- 関連資料: [project-docs/architecture/ARCH-01-docs_architecture_and_layout_design.md](../project-docs/architecture/ARCH-01-docs_architecture_and_layout_design.md)
- 関連資料: [project-docs/architecture/SYS-01-system_high_level_design.md](../project-docs/architecture/SYS-01-system_high_level_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/assets/sw.js](../src/assets/sw.js)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [x] [docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)
- [x] [docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/069-pwa-uiux-portal-enhancement-subject-b`

1. **PWA & ServiceWorker キャッシュの強化 (ST & DB)**:
   - `src/assets/sw.js` における HTML/CSS/JS/JSON の完全オフラインキャッシュ戦略と自動キャッシュ更新機構の適用。
   - `scripts/build_html_docs.py` による PWA マニフェスト (`site/manifest.json`) および `sw.js` のデプロイ。

2. **UI/UX & アクセシビリティの最適化 (UIUX)**:
   - 共通テンプレートにおけるサイドバー TOC (Table of Contents)、読書専用フォーカスレイアウト、WCAG 2.1 適合スタイルの適用。

3. **科目 B ガイド & 攻撃シナリオのビジュアル実践強化 (SC, NW, EP, SM, STR)**:
   - `docs/subject_b/reasoning_guide.md` 内での Vulnerable vs Safe セキュアコーディング対比解説の追記。
   - `docs/scenarios/attack_scenarios_analysis.md` 内での通信シーケンス Mermaid 図の追記。

4. **全自動検証と AU システム最終監査 (QA & AU)**:
   - `npm run build && npm test` の合格および AU 監査報告。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] PWA マニフェストと ServiceWorker オフラインキャッシュが正しく実装・ビルドされていること
- [x] 共通テンプレートの UI/UX 表示（レスポンシブ、可読性）が向上していること
- [x] 科目 B ガイドおよび攻撃シナリオに視覚的な比較コードおよび Mermaid 図が補強されていること
- [x] AU システム監査人による全項目 【適合 (PASS)】 判定を受けること
- [x] `npm run build && npm test` が全件合格すること
