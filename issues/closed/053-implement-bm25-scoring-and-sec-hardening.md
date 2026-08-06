---
ID: 053
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/SEC] BM25 スコアリングアルゴリズムの導入およびプロトタイプ汚染防御 (ID: 053)

## 1. 概要 / Summary
情報検索 (IR) システムの適合率 (Precision) とランキング精度 (NDCG) を向上させるため、従来の TF-IDF + 固定加算から、業界標準の **BM25 アルゴリズム ($k_1=1.2, b=0.75$)** とフィールド別動的重み付け（タイトル/要約/本文）に刷新した。
同時に、`Tokenizer` およびスコア集計マップにおける `Object.create(null)` の導入によりプロトタイプ汚染攻撃 (`__proto__` 注入等) の脅威を完全防御した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/it-specialist-information-retrieval.agent.md](../../.agents/agents/it-specialist-information-retrieval.agent.md)
- 関連資料: [.agents/agents/systems-architect.agent.md](../../.agents/agents/systems-architect.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../../site/js/fm_index_engine.js)
- 関連資料: [site/js/tokenizer.js](../../site/js/tokenizer.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [tokenizer.js](../../site/js/tokenizer.js)
- [x] [fm_index_engine.js](../../site/js/fm_index_engine.js)
- [x] [search_engine.test.js](../../tests/unit/search_engine.test.js)
- [x] [issues/README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/053-implement-bm25-scoring-and-sec-hardening`

1. **SA 主導 & IR 連携による設計**:
   - `fm_index_engine.js` の `CustomSearchEngine` に平均ドキュメント長 (`avgdl`) の算出・ロード処理を追加。
   - BM25 スコアリング関数の実装。
   - 完全単語一致およびフィールド別マルチプライヤーの反映。
2. **セキュリティ強化 (プロトタイプ汚染対策)**:
   - `tokenizer.js` および `fm_index_engine.js` 内の辞書オブジェクトを `Object.create(null)` 化。
   - `__proto__`, `constructor`, `toString` などの特殊文字クエリに対する安全性の検証。
3. **ユニットテスト作成・検証**:
   - `tests/unit/search_engine.test.js` に BM25 スコアリングテストおよびプロトタイプ汚染テストを追加・合格。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `CustomSearchEngine` が BM25 アルゴリズムに基づきドキュメント長を考慮したスコア算出を行っていること。
- [x] タイトルや要約のフィールド重み付けおよび完全一致ブーストが正常に作用し、関連度の高い文書が上位表示されること。
- [x] 特殊クエリ（`__proto__`, `toString` 等）を投入してもエラーやプロトタイプ汚染が発生しないこと。
- [x] ユニットテストがすべて正常に通過すること。
