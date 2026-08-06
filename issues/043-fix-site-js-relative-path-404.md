---
ID: 043
種別: Bug
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [BUG] site/index.html での JS モジュール読み込み 404 エラーおよび相対パス構造の修正 (ID: 043)

## 1. 概要 / Summary
`site/index.html` および各種ポータルページにおいて、JavaScript モジュール (`js/tokenizer.js`, `js/vector_scorer.js`, `js/fm_index_engine.js`) を読み込む際の相対パス指定不備による 404 エラーを解消し、完全にサーバーレス・ローカルファイル直読み環境で動作するよう修復する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [site/index.html](../site/index.html)
- 関連資料: [site/js/fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [index.html](../site/index.html)
- [ ] [tokenizer.js](../site/js/tokenizer.js)
- [ ] [vector_scorer.js](../site/js/vector_scorer.js)
- [ ] [fm_index_engine.js](../site/js/fm_index_engine.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/043-fix-site-js-relative-path-404`

1. **パス依存関係の正規化**:
   - `site/index.html` 内の `<script src="...">` タグにおけるパスを `js/tokenizer.js`, `js/vector_scorer.js`, `js/fm_index_engine.js` の順序で相対パス読み込み。
2. **スクリプト読み込み順序と依存関係の制御**:
   - `Tokenizer` ➔ `VectorScorer` ➔ `CustomSearchEngine` の依存順序の保証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] ブラウザのコンソールにおいて JS 404 フェッチエラーが一切発生しないこと。
- [ ] ローカル (`file://` 直開きおよびローカル HTTP サーバー) の両方で正常にスクリプトが初期化されること。
