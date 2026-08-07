---
ID: 102
種別: Rules
優先度: High
ステータス: Closed
---

# [RULES] JS 変更時の Closure Compiler コンパイル必須ルールの規定と package.json / AGENTS.md への完全組み込み (ID: 102)

## 1. 概要 / Summary
「JavaScript ソースコード (`src/js/**/*.js`) を新規作成・変更・修正した場合、必ず Closure Compiler コンパイル (`make build` / `npm run build:js`) を実行し、成果物 (`site/fm_index_engine.min.js`) も同時に修正・コミットに含める」という開発ルールを正式に規定する。
`.agents/AGENTS.md` の開発者・エージェント規約を更新し、`package.json` の `build:js` スクリプトおよびビルド完全性アサーション (`verify_build_integrity.js`) へ完全に反映する。

---

## 2. トレーサビリティ / Traceability
- ユーザー要求: JS 修正時の Closure Compiler コンパイルとその修正成果物の同時組み込み必須化
- [MNG-08](../../project-docs/processes/MNG-08-adr_process.md) (ADR プロセス)
- [AGENTS.md](../../.agents/AGENTS.md) 開発・ビルド規約

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.agents/AGENTS.md](../.agents/AGENTS.md) [MODIFY]
- [x] [package.json](../package.json) [MODIFY]
- [x] [scripts/verify_build_integrity.js](../scripts/verify_build_integrity.js) [MODIFY]

---

## 4. 実装方針 / Implementation Plan
Target Branch: `build/102-enforce-closure-compiler-rule`

1. **`AGENTS.md` 規約の追加**:
   - JS 修正時の Closure Compiler 最厳格コンパイルと `site/fm_index_engine.min.js` の同時含める必須ルールを策定。
2. **`package.json` スクリプトの同期**:
   - `build:js` スクリプトを全 13 JS ファイル網羅 & 最厳格 `ADVANCED_OPTIMIZATIONS` に更新。
3. **ビルド完全性検証の強化**:
   - `scripts/verify_build_integrity.js` に `site/fm_index_engine.min.js` の存在・更新アサーションを組み込み。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `AGENTS.md` に JS 修正時の Closure Compiler コンパイル必須ルールが明記されていること。
- [x] `package.json` の `build:js` スクリプトが Makefile と同等に全 JS 網羅 & 最厳格コンパイルレベルに更新されていること。
- [x] `npm run build && npm test` が 100% PASS すること。

