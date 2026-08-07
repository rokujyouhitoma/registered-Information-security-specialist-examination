---
ID: 095
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] JavaScript 検索エンジンモジュールの SA アーキテクチャ再設計 (高凝集・低結合・SecurityValidator 集約) (ID: 095)

## 1. 概要 / Summary
システムアーキテクト (SA) の設計観点に基づき、JavaScript 検索エンジンモジュール群 (`src/js/`) のオブジェクト指向クラス設計およびモジュール間インターフェース (I/F) を全面的に見直す。
各クラス (`Tokenizer`, `VectorScorer`, `SemanticScorer`, `CustomSearchEngine`) に重複散在していたプロトタイプ汚染防御ロジックを共通セキュリティコンポーネント `SecurityValidator` に集約・高凝集化し、モジュール間の暗黙的結合度を低減する。

---

## 2. トレーサビリティ / Traceability
- 関連規約・指針:
  - システムアーキテクト (SA) 設計指針: 高凝集・低結合原則 (High Cohesion & Low Coupling)
  - セキュア・コーディングガイドライン: プロトタイプ汚染防御コンポーネント一元化

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/js/security_validator.js](file:///workspace/registered-Information-security-specialist-examination/src/js/security_validator.js) [NEW]
- [x] [src/js/tokenizer.js](file:///workspace/registered-Information-security-specialist-examination/src/js/tokenizer.js)
- [x] [src/js/vector_scorer.js](file:///workspace/registered-Information-security-specialist-examination/src/js/vector_scorer.js)
- [x] [src/js/semantic_scorer.js](file:///workspace/registered-Information-security-specialist-examination/src/js/semantic_scorer.js)
- [x] [src/js/fm_index_engine.js](file:///workspace/registered-Information-security-specialist-examination/src/js/fm_index_engine.js)
- [x] [src/js/search_worker.js](file:///workspace/registered-Information-security-specialist-examination/src/js/search_worker.js)
- [x] [src/assets/sw.js](file:///workspace/registered-Information-security-specialist-examination/src/assets/sw.js)
- [x] [docs/search.md](file:///workspace/registered-Information-security-specialist-examination/docs/search.md)
- [x] [scripts/build_html_docs.py](file:///workspace/registered-Information-security-specialist-examination/scripts/build_html_docs.py)
- [x] [scripts/verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)
- [x] [tests/unit/search_engine.test.js](file:///workspace/registered-Information-security-specialist-examination/tests/unit/search_engine.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/095-js-architecture-cohesion-coupling`

1. **共通セキュリティモジュールの切り出し (`src/js/security_validator.js`)**:
   - `SecurityValidator.isSafeKey(key)` を単一責任コンポーネントとして新規定義。
2. **既存スコアラー・トークナイザーのリファクタリング**:
   - `Tokenizer`, `VectorScorer`, `SemanticScorer`, `CustomSearchEngine` において内部の `isSafeKey` を `SecurityValidator.isSafeKey` の呼出しへ集約（後方互換用静的メソッドプロキシも維持）。
3. **スコアリング演算の高凝集化**:
   - BM25 スコアリングおよびセマンティック/コサイン結合計算のインターフェース設計を整理し、`CustomSearchEngine` の検索調停責務を明確化。
4. **ビルドパイプラインおよび PWA 統合**:
   - `scripts/build_html_docs.py` (Closure Compiler 対象に追加), `src/assets/sw.js` (プリキャッシュ追加), `scripts/verify_build_integrity.js` を更新。
5. **テスト & 自動検証**:
   - `tests/unit/search_engine.test.js` に `SecurityValidator` の単体テストを追加し、`npm run build && npm test` で 100% 成功を検証する。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `SecurityValidator` クラスが新規作成され、安全キー判定が一元管理される。
- [x] 全検索関連クラスが `SecurityValidator` を利用し、プロトタイプ汚染防御の二重管理・重複コードが排除される。
- [x] Closure Compiler ビルド、HTML 変換、Service Worker キャッシュ、およびユニットテストが 100% 正常動作する。
- [x] `npm run build && npm test` が 100% PASS すること。
- [x] AU (システム監査人) による適合度最終監査で【適合 (PASS)】を獲得すること。
