---
ID: 035
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] フルスクラッチ FM-index & ベクター全文検索エンジンの開発 (Phase 12) (ID: 035)

## 1. 概要 / Summary
外部サービス（MkDocs / VitePress）や外部検索ライブラリ（Lunr等）に依存せず、**FM-index (Burrows-Wheeler Transform / Suffix Array / LF-mapping) および TF-IDF ベクトル空間モデル（コサイン類似度）に基づく全文検索エンジン**を Python 標準ライブラリおよび Vanilla JS（純粋JavaScript）のみでフルスクラッチ開発し、全 2,101 用語をミリ秒単位で高速検索できる Web / CLI ポータルを構築する。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 12）
- ユーザー要請: 検索エンジニア仕様（外部ライブラリ非依存、FM-index / ベクター検索の自作）

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [fm_index_search.py](../scripts/fm_index_search.py)
- [x] [fm_index_engine.js](../site/fm_index_engine.js)
- [x] [index.html](../site/index.html)
- [x] [search_index.json](../site/search_index.json)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/035-build-custom-fm-index-search-engine`

1. **Python 版 FM-index & ベクター検索エンジンの自作 (`scripts/fm_index_search.py`)**:
   - サフィックス配列 (Suffix Array)、BWT 文字列、LF マッピング、TF-IDF 重み付けベクトルの生成アルゴリズムを実装。
   - インデックス JSON (`site/search_index.json`) の生成と CLI 検索インターフェース（`--query`）を構築。
2. **Vanilla JS 版 検索エンジンの自作 (`site/fm_index_engine.js`)**:
   - `search_index.json` を非同期ロードし、ブラウザ内で BWT / LF-mapping パターンマッチングおよびベクトル空間コサイン類似度スコアリングをミリ秒単位で計算するクラス `FMIndexEngine` を記述。
3. **検索 Web インターフェースの構築 (`site/index.html`)**:
   - 外部ライブラリ不要な洗練されたシングルページアプリケーション（SPA UI）。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 外部検索ライブラリを使用せずに自作 FM-index & ベクター検索エンジンが正常動作すること
- [x] CLI (`python3 scripts/fm_index_search.py --query "TLS"`) および Web (`site/index.html`) で正しく全用語から検索結果とスコアが返ること
