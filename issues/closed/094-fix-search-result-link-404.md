---
ID: 094
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG] 検索結果画面 (docs/search.md) からのリンク遷移時の 404 Not Found エラーの修正 (ID: 094)

## 1. 概要 / Summary
総合検索画面 (`docs/search.md`) において検索結果のリンクをクリックした際、アンカー付き URL (`glossary/syllabus_ver2_1.html#anchor`) の末尾に誤って `.html` が重複付与されて `glossary/syllabus_ver2_1.html#anchor.html` となり、ページが存在せず 404 Not Found エラーが発生する不具合を修復する。
また、GitHub Pages のディレクトリ型ルーティング (`site/search/index.html`) からの遷移においても相対パスが正しく解決されるよう相対パス補正処理を堅牢化する。

---

## 2. トレーサビリティ / Traceability
- 関連規約・指針:
  - QA 自動ビルド完全性・アセット配備ガイドライン (404 根絶規定)
  - W3C Web URL & Anchor Fragment 仕様

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/search.md](file:///workspace/registered-Information-security-specialist-examination/docs/search.md)
- [x] [scripts/verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/094-search-result-link-404`

1. **URL 正規化・アンカー対応ロジックの修正 (`docs/search.md`)**:
   - `renderResults` 内での `rawUrl` の処理を見直し、URL 分割（ベースパスとアンカー `#` の分離）を実施。
   - ベースパスが `.html` で終わっていない場合のみ `.html` を補填し、アンカーを再結合する。
   - `window.location.pathname` が `/search/` や `search/index.html` ディレクトリ配下にある場合、相対パス階層プレフィックス (`../`) を動的に付与してリンク先 404 を防止する。
2. **自動ビルド検証アサーションの追加 (`scripts/verify_build_integrity.js`)**:
   - `search_index.json` 内の全ドキュメント URL および `search.md` でレンダリングされる URL のパース・正規化結果について、404 リンクが含まれていないことを自動アサーションテスト項目に追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] 検索結果一覧でアンカー付き用語（シラバス・総合用語集）のリンクに `.html` が重複付与されず正しい URL になる。
- [x] ルート (`search.html`) およびサブディレクトリ (`search/index.html`) の双方から正しい相手先ページへ遷移できる。
- [x] `npm run build && npm test` が 100% PASS すること。
- [x] AU (システム監査人) によるトレーサビリティおよび適合度最終監査で【適合 (PASS)】を獲得すること。
