---
ID: 099
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] シーケンス図トランスパイラパッケージ化とクラス別ファイル分割による高凝集・疎結合アーキテクチャの実現 (ID: 099)

## 1. 概要 / Summary
単一ファイル `src/js/sequence_renderer.js` に集約されていたシーケンス図トランスパイラモジュールを、クラス設計 SA の指導に基づき、独立パッケージ `src/js/sequence_diagram/` へパッケージ分割する。
Lexer, Parser, AST/Data Models, SVG Renderer, Facade などの各クラスをそれぞれの単一責任ファイルに分離し、保守性と再利用性を極限まで高める。

---

## 2. トレーサビリティ / Traceability
- ユーザー要求: `src/js/sequence_renderer.js` のパッケージ分割およびクラス別ファイル化
- [MNG-08](../../project-docs/processes/MNG-08-adr_process.md) (ADR プロセス) & [ADR-02](../../docs/adr/ADR-02-cyclomatic-complexity-threshold.md) (循環的複雑度 10 以下)
- 単一責任原則 (SRP) および高凝集・低結合設計 (High Cohesion & Low Coupling)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [src/js/sequence_diagram/sequence_models.js](../src/js/sequence_diagram/sequence_models.js) [NEW]
- [x] [src/js/sequence_diagram/sequence_lexer.js](../src/js/sequence_diagram/sequence_lexer.js) [NEW]
- [x] [src/js/sequence_diagram/sequence_parser.js](../src/js/sequence_diagram/sequence_parser.js) [NEW]
- [x] [src/js/sequence_diagram/sequence_svg_renderer.js](../src/js/sequence_diagram/sequence_svg_renderer.js) [NEW]
- [x] [src/js/sequence_diagram/index.js](../src/js/sequence_diagram/index.js) [NEW]
- [x] [src/js/sequence_renderer.js](../src/js/sequence_renderer.js) [MODIFY - ファサードエントリーポイント]
- [x] [scripts/verify_cyclomatic_complexity.py](../scripts/verify_cyclomatic_complexity.py)
- [x] [tests/unit/sequence_renderer.test.js](../tests/unit/sequence_renderer.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/099-package-split-sequence-diagram-classes`

1. **`src/js/sequence_diagram/` パッケージの作成**:
   - `sequence_models.js`: Token, Participant, Message, AST データモデル
   - `sequence_lexer.js`: SequenceLexer クラス
   - `sequence_parser.js`: SequenceParser クラス
   - `sequence_svg_renderer.js`: SequenceSVGCalculatedRenderer クラス
   - `index.js`: モジュール統合および SequenceDiagramFacade の定義
2. **`src/js/sequence_renderer.js` のエクスポートファサード化**:
   - ブラウザおよび Node.js 環境双方に対応する一元エントリーポイントとして再定義。
3. **静的解析・テストスイートへの適合**:
   - `scripts/verify_cyclomatic_complexity.py` を更新し `src/js/` 配下の全サブディレクトリの JS ファイルを自動巡回解析。
   - `npm run build && npm test` が 100% PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] シーケンス図ライブラリが `src/js/sequence_diagram/` 配下にクラス別ファイルとして高凝集に分割されていること。
- [x] 循環的複雑度上限 (10 以下: ADR-02) を全分割ファイルでクリアすること。
- [x] `npm run build && npm test` が 100% PASS すること。
