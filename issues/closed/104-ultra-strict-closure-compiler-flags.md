---
ID: 104
種別: Build
優先度: High
ステータス: Closed
---

# [BUILD] Closure Compiler における全判定ルールのエラー化 (--jscomp_error=*) と超極限型チェックフラグの導入 (ID: 104)

## 1. 概要 / Summary
Closure Compiler の型チェックおよび警告レベルを限界まで強化する。
`--jscomp_error=*` および全判定ルール (checkTypes, checkVars, missingProperties, strictModuleChecks, globalThis, uselessCode, visibility, invalidCasts, duplicate 等) をすべてエラー扱いとし、型情報最適化フラグ (`--use_types_for_optimization true`) を有効化する。
全 JS ファイルの JSDoc と型アノテーションを完全修復し、超極限レベルで 0 Error, 0 Warning を達成する。

---

## 2. トレーサビリティ / Traceability
- ユーザー要求: `warning_level` および型チェックレベルのさらなる厳格化・最高レベル化
- [MNG-08](../../project-docs/processes/MNG-08-adr_process.md) (ADR プロセス)
- [AGENTS.md](../../.agents/AGENTS.md) 開発・ビルド規約

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [Makefile](../Makefile) [MODIFY]
- [x] [src/js/**/*.js](../src/js/) [MODIFY]

---

## 4. 実装方針 / Implementation Plan
Target Branch: `build/104-ultra-strict-closure-compiler-flags`

1. **`Makefile` フラグの極限強化**:
   - 9 つの全主要判定グループ (`checkTypes`, `checkVars`, `missingProperties`, `strictModuleChecks`, `globalThis`, `uselessCode`, `visibility`, `invalidCasts`, `duplicate`) をエラー化。
   - `--use_types_for_optimization true` を有効化。
2. **全 JS モジュールの超厳格型調整**:
   - Closure Compiler が要求するすべての JSDoc 型定義・型キャスト・グローバルシンボル参照を完全に整合。
3. **アサーション検証**:
   - `make clean && make build` および `npm test` がエラー・警告 0 件で 100% PASS することを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] Makefile の Closure Compiler フラグが全 9 正規判定ルールエラー化および `--use_types_for_optimization true` の超極限レベルになっていること。
- [x] Closure Compiler によるコンパイルが 0 エラー 0 警告で完全通過すること。
- [x] 全 8 テストパイプライン (`npm test`) が 100% PASS すること。

