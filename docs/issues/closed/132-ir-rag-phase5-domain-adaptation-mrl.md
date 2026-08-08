# [FEAT/IR] IR・RAG 強化 Phase 5: セキュリティドメイン特化型 Fast-Vector / Matryoshka Representation Learning (MRL) ファインチューニング (ID: 132)

## メタデータ

- **ID**: 132
- **種別**: Feature / IR / Vector Compression
- **優先度**: Low
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`)
- **ターゲットブランチ**: `feat/132-ir-rag-phase5-domain-adaptation-mrl`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

「ISMAP」「NIST SP800」「RMF」「DHCPD」「TPROXY」などのセキュリティ専門用語に対する埋め込み空間の表現精度を高めるため、セキュリティドメイン適応（Continued Pre-training / Fine-tuning）および Matryoshka Representation Learning (MRL) による適応型低次元ベクトル圧縮機構を導入しました。

---

## 2. トレーサビリティ / Traceability

- 論文 / 参考資料: Kusupati et al., "Matryoshka Representation Learning" (NeurIPS 2022)
- 関連ドキュメント: [QUAL-02 次世代プラットフォーム設計](../project-docs/quality/QUAL-02-next_gen_platform_roadmap.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`src/js/vector_scorer.js`**:
   - `VectorScorer.truncateMRLVector(vec, targetDim)`: 64, 128, 256 次元の段階的 MRL ベクトル切り出しおよび L2 再正規化処理を追加。
   - `VectorScorer.calculateMRLCosineSimilarity(qVec, dVec, targetDim)`: 適応型低次元コサイン類似度スコアリング関数を追加。
2. **`tests/unit/search_engine.test.js`**:
   - MRL 低次元切り出し精度および多次元類似度アサーションテストを追加。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] Matryoshka ベクトルによる高速かつ省メモリな類似度スコアリングが正常動作すること。
- [x] 専門用語クエリの近傍探索精度が汎用ベクトル比で向上すること。
- [x] Closure Compiler コンパイルおよびビルドにパスすること。
