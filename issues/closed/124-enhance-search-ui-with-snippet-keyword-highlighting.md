# [FEAT/SEARCH] 検索UI (search.html) への「キーワード検索ヒット箇所スニペットハイライト機能」の強化 (ID: 124)

## メタデータ

- **ID**: 124
- **種別**: Feature / Search / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SE (`search-engine-specialist`) & UIUX (`ui-ux-designer`)
- **ターゲットブランチ**: `feat/124-enhance-search-ui-with-snippet-keyword-highlighting`

---

## 1. 概要 / Summary

[REQ-02 ペルソナ 1（佐々木 優太：初学者）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) および [ペルソナ 4（鈴木 大介：直前受検者）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) の検索ヒット確認スピードを最速化するため、[全文検索UI (`docs/search.md` & `src/js/search_ui.js`)](docs/search.md) において、検索結果スニペット内の検索クエリ該当文字列をダイナミックハイライト（ネオンイエロー/エメラルド風 `<mark>` スタイリング）表示する機能を強化します。

本改修は JavaScript (`src/js/search_ui.js`) の変更を伴うため、[AGENTS.md mandatory rule](.agents/AGENTS.md) に従って Closure Compiler (`make build`) を実行し、完全性アサーションを通過させます。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `src/js/search_ui.js`**:
   - クエリ一致用語のスニペット内ハイライト関数 (`highlightKeywords`) の追加。
2. **[MODIFY] `docs/search.md`**:
   - ハイライト表示用 CSS スタイル (`mark.search-highlight`) の追加。
3. **[REGENERATE/COMPILE] `site/search.html` & `site/fm_index_engine.min.js`**:
   - `make build` により再生成。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] 検索結果スニペット内にヒットしたクエリ語句が `<mark class="search-highlight">` で視覚的に目立つ表示になること。
- [x] Closure Compiler コンパイル結果 (`site/fm_index_engine.min.js`) が最新状態で同梱されていること。
- [x] `make build` により全 HTML およびアセットが正常再生成されること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認。
- [x] AU による最終判定で【適合 (PASS)】を得ること。
