---
ID: 038
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/TEST] JavaScript ユニットテスト自動化 (Phase 13) (ID: 038)

## 1. 概要 / Summary
Node.js ネイティブのテストランナー (`node --test`) を活用し、フルスクラッチ検索エンジン (`site/fm_index_engine.js`) のトークナイザー、ベクター空間モデル計算、スコアリングアルゴリズムに対するユニットテスト `tests/unit/search_engine.test.js` を作成し、CI に組み込む。

---

## 2. トレーサビリティ / Traceability
- `project-docs/next_gen_platform_roadmap.md`（Phase 13）
- `site/fm_index_engine.js`

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [search_engine.test.js](../tests/unit/search_engine.test.js)
- [x] [package.json](../package.json)
- [x] [.github/workflows/ci.yml](../.github/workflows/ci.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/038-js-unit-testing`

1. **テストコード作成**:
   - `tests/unit/search_engine.test.js` を作成。
   - `tokenize` 機能、`loadIndex` モック/実データ検索、`search` スコア順序（例: 「TLS」クエリ時の該当性と上位スコア）を `node:test` と `node:assert` でテスト。
2. **`package.json` 更新**:
   - `"test:unit": "node --test tests/unit/search_engine.test.js"` を追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `npm run test:unit` がエラーなしで通過し、全テストケースが Green となること
