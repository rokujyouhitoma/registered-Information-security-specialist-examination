# [FEAT/QA] IR・RAG 強化 Phase 6: RAGAS / ARES 基準による検索精度定量評価パイプラインと過去問グラウンドトゥルースデータセットの構築 (ID: 133)

## メタデータ

- **ID**: 133
- **種別**: Feature / QA / Benchmark
- **優先度**: Medium
- **ステータス**: Closed
- **担当スペシャリスト**: QA (`quality-auditor`) & AU (`compliance-auditor`)
- **ターゲットブランチ**: `feat/133-ir-rag-phase6-ragas-ares-evaluation-pipeline`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

検索アルゴリズムや Chunking・Re-ranking 手法の改善効果を定量的・客観的に測定するため、過去問（問題文・公式解答・採点講評）をグラウンドトゥルース（正解データ）とした RAGAS (Retrieval Augmented Generation Assessment) / ARES 互換の評価パイプラインを構築しました。
「Context Precision」「Context Recall」「Harmonic F1 Score」を自動計測し、検索エンジン改修による精度劣化の防止と継続的最適化を自動アサーション化しました。

---

## 2. トレーサビリティ / Traceability

- 参考資料: RAGAS (Retrieval Augmented Generation Assessment) / ARES Framework
- 関連ドキュメント: [QUAL-01 マスター品質向上計画](../project-docs/quality/QUAL-01-master_quality_enhancement_roadmap.md), [QUAL-04 品質保証チェックリスト](../project-docs/quality/QUAL-04-quality_assurance_checklist.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`src/data/ground_truth.json`**:
   - 科目 A・科目 B 過去問・セキュリティドキュメントに対する問題・クエリ・正解参照先 ID のグラウンドトゥルースデータセットを新規定義。
2. **`scripts/audit_search_ragas.py`**:
   - Context Precision（検索結果の上位における正解適合率）および Context Recall（正解網羅率）、F1 スコアを自動評価・レポート出力する評価スクリプトを実装 (Context Precision >= 0.85 アサーション)。
3. **`package.json`**:
   - `npm run test:ragas` を追加し、全自動ビルド・テストスイート (`npm test`) に統合。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] `python3 scripts/audit_search_ragas.py` が正常実行され、Context Precision / Context Recall が定量数値として出力されること。
- [x] 過去問テストセットで Context Precision >= 0.85 を達成すること (評価実績: Context Precision 1.0000 / Recall 1.0000)。
- [x] スクリプトが `npm test` に組み込まれテストが 100% PASS すること。
