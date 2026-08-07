---
ID: 096
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT] ADR-02 循環的複雑度 (Cyclomatic Complexity) 閾値規定の設計導入と自動検証ツールの構築 (ID: 096)

## 1. 概要 / Summary
プロジェクトの成長に伴う JavaScript / Python コードの肥大化・複雑化を防ぎ、保守性・可読性・テスト容易性を高次元で維持するため、`ADR-02: 循環的複雑度（サイクロマティック複雑度）の閾値設定と自動検知の導入` をプロジェクトアーキテクチャ規定として導入する。
[docs/adr/ADR-02-cyclomatic-complexity-threshold.md](../docs/adr/ADR-02-cyclomatic-complexity-threshold.md) を起草するとともに、全自動テストスイート (`npm test`) 内で関数の循環的複雑度（閾値 10 以下）を自動アサーション検証する検査フレームワークを導入・リファクタリング改善を推進する。

---

## 2. トレーサビリティ / Traceability
- 関連規約・参考資料:
  - 外部仕様参考: [ADR-02 Cyclomatic Complexity Threshold (yuzora)](https://github.com/rokujyouhitoma/yuzora/blob/main/docs/adr/ADR-02-cyclomatic-complexity-threshold.md)
  - システムアーキテクト (SA) 品質ガイドライン: 関数の単一責任化と可読性・保守性指標 (Maintainability Index)
  - ISO/IEC 25010 ソフトウェア品質モデル (保守性・解析性)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/adr/ADR-02-cyclomatic-complexity-threshold.md](../docs/adr/ADR-02-cyclomatic-complexity-threshold.md) [NEW]
- [x] [docs/adr/README.md](../docs/adr/README.md) [NEW]
- [x] [scripts/verify_cyclomatic_complexity.py](../scripts/verify_cyclomatic_complexity.py) [NEW]
- [x] [src/js/fm_index_engine.js](../src/js/fm_index_engine.js)
- [x] [src/js/semantic_scorer.js](../src/js/semantic_scorer.js)
- [x] [src/js/search_worker.js](../src/js/search_worker.js)
- [x] [package.json](../package.json)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/096-cyclomatic-complexity-threshold`

1. **ADR ドキュメントの作成 (`docs/adr/ADR-02-cyclomatic-complexity-threshold.md`)**:
   - サイクロマティック複雑度の閾値規定（原則 10 以下、例外時は明示的な ADR/JSDoc 理由記載）、背景、評価方針をドキュメント化し [docs/adr/README.md](../docs/adr/README.md) を整備する。
2. **循環的複雑度自動検証エンジンの開発 (`scripts/verify_cyclomatic_complexity.py`)**:
   - `src/js/` 配下の全 JavaScript ファイル内の関数について、分岐・制御構文 (`if`, `else if`, `for`, `while`, `case`, `catch`, 複合論理演算子 `&&`, `||`, `? :`) から循環的複雑度 $V(G)$ を解析・計算し、アサーション検証を行うスクリプトを構築。
3. **複雑度超過関数のリファクタリング改善**:
   - 複雑度が高くなっていた関数（`CustomSearchEngine.prototype.search` 等）について、スコアリング計算・単語完全一致ブースト判定・候補抽出ロジック等を小さなヘルパー関数へ分割（リファクタリング）し、複雑度 10 以下に最適化する。
4. **全自動テストフレームワークへの統合**:
   - `package.json` の `test` スクリプトに `test:complexity` を追加し、`npm test` で全自動検証される仕組みを完成させる。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/adr/ADR-02-cyclomatic-complexity-threshold.md` が作成され、プロジェクトの公式設計規定として定義される。
- [x] `scripts/verify_cyclomatic_complexity.py` が作成され、JS 関数の複雑度測定・アサーションが正常実行される。
- [x] `src/js/` 配下のすべての対象関数が複雑度閾値 (10 以下) を満たすか、必要最小限の例外理由が明示されている。
- [x] `npm run build && npm test` が 100% PASS すること。
- [x] AU (システム監査人) による適合度最終監査で【適合 (PASS)】を獲得すること。
