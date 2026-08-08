# [FEAT/IR] IR・RAG 強化 Phase 3: Cross-Encoder / ColBERT (bge-reranker) による候補 Re-ranking 処理パイプラインの実装 (ID: 130)

## メタデータ

- **ID**: 130
- **種別**: Feature / IR / Reranking
- **優先度**: Medium
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & ST (`security-tester`)
- **ターゲットブランチ**: `feat/130-ir-rag-phase3-cross-encoder-colbert-reranking`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

検索の第 1 段階 (Retrieval) で上位 50 件の候補文書を高速抽出し、第 2 段階で Cross-Encoder / ColBERT (Contextualized Late Interaction over BERT) スコアリング（bge-reranker 相当処理）を適用して文脈適合度を精密にスコアリングする Re-ranking パイプラインを導入しました。
午後問題のような長文のシナリオ問題から特定の問の回答根拠箇所をピンポイントで上位表示させます。

---

## 2. トレーサビリティ / Traceability

- 論文 / 参考資料: Khattab & Zaharia, "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT" (SIGIR 2020)
- 関連ドキュメント: [QUAL-02 次世代プラットフォーム設計](../project-docs/quality/QUAL-02-next_gen_platform_roadmap.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`src/js/semantic_scorer.js`**:
   - `SemanticScorer.calculateColBERTScore(queryTokens, docTokens)`: クエリートークン vs ドキュメントトークンの MaxSim スコアリング処理。
   - `SemanticScorer.rerank(query, candidates, topK)`: 候補 50 件から最適合ドキュメント上位 topK 件を精密再ランク付けするパイプラインを追加。
   - 循環的複雑度 $\le 10$ を維持する構造リファクタリング (`_calculateTokenPairSim`, `_calculateQuestionMatchBoost`, `_scoreRerankCandidate`)。
2. **`src/js/search_worker.js`**:
   - Web Worker 上で `{ action: 'RERANK', query, candidates, topK }` による非同期 Re-ranking アクションを処理。
3. **`tests/unit/search_engine.test.js`**:
   - ColBERT MaxSim 計算テストおよび長文シナリオ問題ピンポイントブーストアサーションを追加 (< 100ms で動作確認)。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] 候補 50 件に対する Re-ranking スコア計算が非同期で 100ms 以内に正常完了すること。
- [x] 長文シナリオの特定の問い（設問3等）に対する適合箇所が第 1 順位に再ランクされること。
- [x] 単体テストおよび `make build` に合格すること。
