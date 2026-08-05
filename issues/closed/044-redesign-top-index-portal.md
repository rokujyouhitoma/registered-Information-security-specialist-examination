---
ID: 044
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/UI] トップページ (site/index.html) の総合学習ドキュメントインデックスポータル化 (ID: 044)

## 1. 概要 / Summary
トップページ (`site/index.html`) を単一の検索画面から、リポジトリ内の全マークダウン学習資料（全 2,101 用語辞書、科目B思考プロセスガイド、サイバー攻撃シナリオ、クイズ等）を美しいモダン UI (Dark Mode / Glassmorphism) で網羅的に閲覧・ナビゲーションできる「総合学習インデックスポータル」へと刷新する。同時に、自作 FM-index & ベクター全文検索エンジンをポータルのヘッダー・即時検索機能としてシームレスに統合する。

---

## 2. トレーサビリティ / Traceability
- ユーザー要請「トップページは、検索ページではなくマークダウンのページのindexページにしてください。」
- [site/index.html](../site/index.html)
- [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)
- [docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [site/index.html](../site/index.html)
- [ ] [site/compiled.html](../site/compiled.html)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/044-redesign-top-index-portal`

1. **`site/index.html` の完全リニューアル**:
   - ヘッダー：ヒーローセクション ＆ 即時ライブ全文検索バー（自作 FM-index / Closure Compiler JS 統合）
   - コンテンツエリア：
     - 📖 **学習マテリアルカード** (シラバスVer2.1辞書 / 補足Ver4.0辞書 / 科目B解法ガイド / 攻撃シナリオ分析 / CLI対話型クイズ)
     - 🗂️ **シラバス分類別インデックスナビゲーション**
     - 📊 **リポジトリ品質統計バッジ** (2,101用語、合格率100%、自作検索エンジン)
2. **動作検証**:
   - `make build && npm test` が PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `site/index.html` がマークダウン文書群の総合学習インデックスポータルとなり、全コンテンツにナビゲートできること
- [ ] ポータル上から自作全文検索エンジンが正常に機能すること
- [ ] `npm test` が成功すること
