---
ID: 039
種別: Refactor
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [REFACTOR] JS コードの厳格モジュール化と JSDoc 型定義の強化 (ID: 039)

## 1. 概要 / Summary
クライアントサイド JavaScript コード群 (`site/js/*.js`) におけるグローバル汚染を防ぎ、厳格な UMD / ES モジュールパターン（Node.js とブラウザ環境の両立）および Closure Compiler 適合の JSDoc 型注釈を全面適用・強化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/agents/systems-architect.agent.md](../.agents/agents/systems-architect.agent.md)
- 関連資料: [site/js/tokenizer.js](../site/js/tokenizer.js)
- 関連資料: [site/js/vector_scorer.js](../site/js/vector_scorer.js)
- 関連資料: [site/js/fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [tokenizer.js](../site/js/tokenizer.js)
- [ ] [vector_scorer.js](../site/js/vector_scorer.js)
- [ ] [fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/039-refactor-js-modules-jsdoc`

1. **JSDoc 型注釈の厳格付与**:
   - Closure Compiler 型チェッカー適合 `@param`, `@return`, `@type`, `@private` の完全付与。
   - `!Array<string>`, `!Object<string, number>` などの非 null 型指定。
2. **UMD / 万能モジュールラッパーの強化**:
   - `typeof globalThis !== 'undefined'`, `typeof window !== 'undefined'`, `typeof module !== 'undefined' && module.exports` による安全なエクスポート判定。
3. **型安全ガード & プロトタイプ防衛**:
   - 入力型バリデーション (`typeof text === 'string'`) および非破壊アクセス処理。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] すべての JS ファイルにおいて JSDoc 型定義が付与され、コンパイルエラー・警告が存在しないこと。
- [ ] Node.js 環境 (`require`/`import`) およびブラウザ環境 (`<script>`) の両方で同一コードが修正なしで正常動作すること。
- [ ] ユニットテストが問題なく通過すること。
