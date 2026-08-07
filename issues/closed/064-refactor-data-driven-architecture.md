---
ID: 064
種別: Refactor
優先度: High
ステータス: Closed
---

# [FEAT/ENH] JS 内ハードコードデータの分離・外部 JSON 化によるデータ駆動アーキテクチャへのリファクタリング (ID: 064)

## 1. 概要 / Summary
検索・スコアリングモジュール (`SynonymExpander`, `SemanticScorer`) 内にハードコードされているシノニム辞書や概念分類キーワードを外部 JSON ファイル (`src/data/synonyms.json`, `src/data/concept_config.json`) として分離抽出し、コードとデータを分離するデータ駆動アーキテクチャに改修した。また、設計資料 (`project-docs/system_low_level_design.md`) にデータ駆動設計思想を追加記載した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [project-docs/system_low_level_design.md](../project-docs/system_low_level_design.md)
- 関連資料: [src/js/synonym_expander.js](../src/js/synonym_expander.js)
- 関連資料: [src/js/semantic_scorer.js](../src/js/semantic_scorer.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/data/synonyms.json](../src/data/synonyms.json) [NEW]
- [x] [src/data/concept_config.json](../src/data/concept_config.json) [NEW]
- [x] [src/js/synonym_expander.js](../src/js/synonym_expander.js)
- [x] [src/js/semantic_scorer.js](../src/js/semantic_scorer.js)
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [x] [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [x] [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)
- [x] [project-docs/system_low_level_design.md](../project-docs/system_low_level_design.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/064-refactor-data-driven-architecture`

1. **データファイルの作成 (`src/data/`)**:
   - `src/data/synonyms.json` (シノニムマッピング辞書)
   - `src/data/concept_config.json` (概念カテゴリ定義・カテゴリキーワードマッピング)

2. **JavaScript モジュールのデータ駆動化**:
   - `SynonymExpander`: `setSynonymMap(map)` メソッドの実装および外部注入データの動的参照化。
   - `SemanticScorer`: `setConceptConfig(config)` メソッドの実装およびカテゴリ・キーワードの動的抽出化。

3. **ビルドスクリプトとテストコードのデータ連携**:
   - `scripts/build_html_docs.py` の `copy_static_assets()` に `src/data/` の `site/data/` への自動同期ステップを追加。
   - `scripts/fm_index_search.py` および `tests/unit/search_engine.test.js` で JSON データを読み込んで各クラスに注入。

4. **設計資料 (`project-docs/system_low_level_design.md`) へのデータ駆動設計思想の追加**:
   - セクション「5. データ駆動設計原則 (Data-Driven Architecture Principle)」を新規追加し、処理ロジックとデータの完全分離規則、拡張性の担保、保守性の利点を記載。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] シノニム辞書および概念カテゴリ・キーワードが JS 内から排除され、外部 JSON ファイルから動的ロードされていること
- [x] `scripts/build_html_docs.py` により `site/data/` 配下に JSON ファイルが正しく生成・デプロイされること
- [x] `project-docs/system_low_level_design.md` に「データ駆動設計原則」の設計思想が記載されていること
- [x] `npm run build && npm test` で全てのビルド・ユニットテスト・品質検証が合格すること
