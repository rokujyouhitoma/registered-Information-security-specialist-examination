---
ID: 049
種別: Performance
優先度: High
ステータス: Closed
---

# [PERF] 検索インデックスデータ構造の最適化・軽量化 (ID: 049)

## 1. 概要 / Summary
`site/search_index.json`（約 11MB）のデータ転送量を最適化するため、`scripts/fm_index_search.py` における IDF 配列および高次元ベクトルの精度の最適化（少数点以下の不要桁数トリム）ならびにコンパクト JSON 化（無駄な改行・インデントの削除）を行い、初期通信サイズを大幅に削減（約 11MB → 約 5.7MB）する。

---

## 2. トレーサビリティ / Traceability
- [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [site/search_index.json](../site/search_index.json)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [x] [site/search_index.json](../site/search_index.json)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `perf/049-perf-compress-search-index`

1. **インデックス軽量化ロジックの追加**:
   - `export_index_json` にて浮動小数点数（IDF, ベクトル重み）を小数点第4位に丸めて保持 (`round(val, 4)`)。
   - `json.dump(..., separators=(',', ':'))` によりインデントや余分な空白を除去。
2. **検証**:
   - インデックスファイルのサイズ変化を確認。
   - `npm test` で検索結果・テスト精度が維持されることを全自動確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `site/search_index.json` のファイルサイズが削減されること
- [x] `npm test` がすべて PASS すること
