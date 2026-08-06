---
ID: 046
種別: Bug
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [BUG] 日本語検索クエリで検索結果が 0 件になるトークナイザーの正規表現・N-gramバグの修正 (ID: 046)

## 1. 概要 / Summary
「セキュリティ」「暗号化」「認証」などの日本語マルチバイト文字クエリを検索に入力した際、`Tokenizer.tokenize` 内の正規表現や分割処理の不備により、トークンが消失して検索結果が 0 件になるバグを完全解消する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [site/js/tokenizer.js](../site/js/tokenizer.js)
- 関連資料: [tests/unit/search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [tokenizer.js](../site/js/tokenizer.js)
- [ ] [search_engine.test.js](../tests/unit/search_engine.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/046-fix-japanese-query-tokenizer`

1. **正規表現および記号処理の修正**:
   - `replace(/[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+/g, ' ')` で日本語全角・半角記号を正しくスペース置換し、日本語単語および Bigram を安全に抽出。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 日本語検索クエリ（「セキュリティ」「暗号化」等）でヒット対象ドキュメントが正しく返されること。
- [ ] `search_engine.test.js` 内の日本語クエリテストが合格すること。
