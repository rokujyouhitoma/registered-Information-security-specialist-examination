---
ID: 101
種別: Build
優先度: High
ステータス: Closed
---

# [BUILD] Makefile における Closure Compiler 対象 JS ファイルの全数網羅と SRC_JS 各行改行フォーマットへの統一 (ID: 101)

## 1. 概要 / Summary
`Makefile` における Closure Compiler のコンパイル対象ファイルが一部のみに限定されていた課題を修正する。
`src/js/` 配下のすべての JavaScript ファイル（モジュール・パッケージ・ファサード含む）を漏れなくコンパイル対象に含め、`SRC_JS` 変数定義をファイルごとの改行フォーマット (`\`) に更新する。
さらに Closure Compiler オプションを最厳格設定 (`ADVANCED_OPTIMIZATIONS`, `VERBOSE`, `strict_mode_input`, `ECMASCRIPT_NEXT`) に強化する。

---

## 2. トレーサビリティ / Traceability
- ユーザー要求: Closure Compiler 対象の全 JS 網羅、`SRC_JS` の各ファイルごと改行フォーマット化、およびコンパイルオプション最厳格化
- [MNG-08](../../project-docs/processes/MNG-08-adr_process.md) (ADR プロセス)
- ISO/IEC 25010 保守性・品質アサーション

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [Makefile](../Makefile) [MODIFY]
- [x] [src/js/semantic_scorer.js](../src/js/semantic_scorer.js) [MODIFY]
- [x] [src/js/synonym_expander.js](../src/js/synonym_expander.js) [MODIFY]

---

## 4. 実装方針 / Implementation Plan
Target Branch: `build/101-include-all-js-in-closure-compiler`

1. **`Makefile` の更新**:
   - `SRC_JS` 変数に `src/js/` 配下の全 13 ソースファイルをファイルごとに改行 (`\`) して列挙。
   - `Closure Compiler` のオプションを最厳格レベル (`ADVANCED_OPTIMIZATIONS`, `VERBOSE`, `strict_mode_input true`, `ECMASCRIPT_NEXT`) に強化。
2. **ビルド完全性アサーションの検証**:
   - `make build` および `npm run build && npm test` を実行し、ビルドエラーなしで全機能・テストが PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `Makefile` 内の `SRC_JS` がファイルごとに改行され、`src/js/` 配下の全 13 JS ファイルが網羅されていること。
- [x] Closure Compiler のオプションが最も厳格な設定 (`ADVANCED_OPTIMIZATIONS`, `VERBOSE`, `strict_mode_input`) に設定されていること。
- [x] Closure Compiler によるコンパイルが正常に完了し、全 8 テストパイプライン (`npm test`) が 100% PASS すること。

