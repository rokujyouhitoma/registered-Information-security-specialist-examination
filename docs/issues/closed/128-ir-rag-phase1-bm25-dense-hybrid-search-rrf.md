# [FEAT/IR] IR・RAG 強化 Phase 1: BM25 + Dense ベクトルハイブリッド検索と Reciprocal Rank Fusion (RRF) スコア統合エンジンの構築 (ID: 128)

## メタデータ

- **ID**: 128
- **種別**: Feature / IR / Algorithm
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & ST (`security-tester`)
- **ターゲットブランチ**: `feat/128-ir-rag-phase1-bm25-dense-hybrid-search-rrf`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

試験過去問および IPA セキュリティドキュメントに対する検索精度向上を目的とし、形態素解析・単語完全一致検索（BM25 Lexical Search）と概念ベクトル検索（Dense Search）を組み合わせ、Reciprocal Rank Fusion (RRF) アルゴリズムにより統合・再スコアリングするハイブリッド検索エンジンモジュールを構築しました。
「CVE-2023-XXXX」「AES-256-GCM」「RTX830」等の型番・識別子完全一致と、「CMMCの背景」「プロキシ復号化」等の概念的検索を高度に両立させました。

---

## 2. トレーサビリティ / Traceability

- 関連資料: [SYS-02 システム詳細設計書](../project-docs/architecture/SYS-02-system_low_level_design.md), [QUAL-02 次世代プラットフォーム設計](../project-docs/quality/QUAL-02-next_gen_platform_roadmap.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`src/js/vector_scorer.js`**:
   - `VectorScorer.calculateRRFScore(rankBM25, rankDense, k)` を追加。
2. **`src/js/fm_index_engine.js`**:
   - `CustomSearchEngine.search()` 内で Lexical (BM25) ランクと Dense ベクトルランクを個別に抽出し、RRF 統合スコアを算出して最終ハイブリッド順位付けを実行。
   - 循環的複雑度リファクタリング（`_computeDocCandidateScore`, `_scoreCandidateDocs`, `_buildRankMaps` ヘルパー分割）。
3. **`tests/unit/search_engine.test.js`**:
   - RRF 数式精度テストおよび型番・概念ハイブリッド検索テストケースを追加。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] BM25 検索と Dense ベクトル検索の RRF 統合スコアリング関数が正常動作すること。
- [x] 型番・CVE 識別子クエリおよび概念的質問クエリの双方向テストケースを追加し 100% PASS すること。
- [x] Closure Compiler コンパイルおよび `make build` に合格すること。
