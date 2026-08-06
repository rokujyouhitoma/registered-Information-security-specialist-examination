---
ID: 053
種別: Feature
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [FEAT/SEC] BM25 スコアリングアルゴリズムの導入およびプロトタイプ汚染防御 (ID: 053)

## 1. 概要 / Summary
情報検索 (IR) システムの適合率 (Precision) とランキング精度 (NDCG) を向上させるため、従来の TF-IDF + 固定加算から、業界標準の **BM25 アルゴリズム ($k_1=1.2, b=0.75$)** とフィールド別動的重み付け（タイトル/要約/本文）に刷新する。
同時に、`Tokenizer` およびスコア集計マップにおける `Object.create(null)` の導入によりプロトタイプ汚染攻撃 (`__proto__` 注入等) の脅威を防御する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/it-specialist-information-retrieval.agent.md](../.agents/agents/it-specialist-information-retrieval.agent.md)
- 関連資料: [site/js/fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [tokenizer.js](../site/js/tokenizer.js)
- [ ] [fm_index_engine.js](../site/js/fm_index_engine.js)
- [ ] [search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/053-implement-bm25-scoring-and-sec-hardening`

1. **BM25 スコアリングの実装**: 平均ドキュメント長 (`avgdl`) 算出とパラメータ設定。
2. **セキュリティ強化**: `isSafeKey` ガードおよび `Object.create(null)` の徹底。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] ドキュメント長を考慮した BM25 スコア算出が機能すること。
- [ ] 特殊クエリ（`__proto__`, `toString` 等）を投入してもプロトタイプ汚染が発生しないこと。
- [ ] ユニットテストが正常に通過すること。
