# [FEAT/IR] IR・RAG 強化 Phase 2: SPLADE モデルに基づくセキュリティドメイン同義語・関連語自動拡張エンジンの導入 (ID: 129)

## メタデータ

- **ID**: 129
- **種別**: Feature / IR / Neural Expansion
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`)
- **ターゲットブランチ**: `feat/129-ir-rag-phase2-splade-synonym-expansion`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

既存の形態素解析・単語完全一致検索に対し、ニューラルネットワーク (Sparse Lexical and Expansion Model - SPLADE) の思想を取り入れ、セキュリティ領域特有の「登録セキスペ ＝ RISS ＝ 情報処理安全確保支援士」といった同義語対応や、「ゼロトラスト」検索時に「PDP / PEP / 境界型防御」等のドメイン関連語を自動補完・拡張するスパースベクトル表現モジュールを導入しました。

---

## 2. トレーサビリティ / Traceability

- 論文 / 参考資料: Formal et al., "SPLADE: Sparse Lexical and Expansion Model for Information Retrieval" (SIGIR 2021)
- 関連ドキュメント: [SYS-02 システム詳細設計書](../project-docs/architecture/SYS-02-system_low_level_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`src/data/synonyms.json`**:
   - IPA 登録セキスペ公式用語（「登録セキスペ」「RISS」「情報処理安全確保支援士」）、ゼロトラスト（「PDP」「PEP」「ZTA」）、NIST/ISMAP/CMMC/RMF 関連用語のシノニムマップを拡充。
2. **`src/js/synonym_expander.js`**:
   - プロトタイプ汚染防御 (`SecurityValidator.isSafeKey`) を強化し、`_addTokenSynonyms` ヘルパー分割により循環的複雑度 <= 10 を維持。
3. **`tests/unit/search_engine.test.js`**:
   - 「登録セキスペ」「ゼロトラスト」等の実務ドメイン語彙拡張テストケースを追加。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] 「登録セキスペ」で「RISS」「情報処理安全確保支援士」が自動マッチ・スコア加算されること。
- [x] 「ゼロトラスト」で「PDP」「PEP」等の関連用語が検索候補に引き上げられること。
- [x] 単体テストおよび `make build` が 100% PASS すること。
