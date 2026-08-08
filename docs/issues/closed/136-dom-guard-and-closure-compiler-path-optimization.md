---
ID: 136
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG/SEC] 全文検索・Webクイズ画面における DOM 存在判定ガード強化と Makefile 内 Closure Compiler ローカルパス最適化 (ID: 136)

## 1. 概要 / Summary

SPA 画面遷移時や動的コンテンツ読み込み時において、`document.getElementById` の戻り値が `null` となる可能性に対処するため、`src/content/quiz.md` および `src/content/search.md` 内の JavaScript コードに DOM 存在チェック判定ガードを追加します。
あわせて、`Makefile` 内で実行される `google-closure-compiler` の呼び出し方式を `npx -y` からローカルにインストール済みの `./node_modules/.bin/google-closure-compiler` 直接実行へ変更し、ビルド時の実行パス安定化とパフォーマンス向上を図ります。

### 再現手順 / Steps to Reproduce
1. SPA ナビゲーションにおいて DOM 要素が動的に差し替えられる途中で `renderQuestion()` や `initSearchEngine()` が呼び出された場合。
2. 該当 DOM 要素（`quiz-options-list`, `status-text` 等）が存在しない場合に `TypeError: Cannot set property 'innerHTML' of null` が発生するリスクが存在した。
3. `make build` 実行時に `npx -y` 経由で Closure Compiler が起動し、NPX のパッケージ判定オーバーヘッドが発生していた。

### 再現環境 / Environment
- OS / Env: Linux / Node.js v20+ / Make
- Files:
  - `src/content/quiz.md`
  - `src/content/search.md`
  - `Makefile`

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

- [x] [Makefile](Makefile)
- [x] [src/content/quiz.md](src/content/quiz.md)
- [x] [src/content/search.md](src/content/search.md)
- [x] [src/data/content_store.json](src/data/content_store.json)

---

## 3. 根本原因分析 (RCA) / Root Cause Analysis

1. **DOM 存在保証の不足**: SPA 化に伴いコンテンツがクライアントサイドで動的に描画・切替されるようになったため、DOM の取得結果（`getElementById`）に対する null ガードが不十分な箇所で実行例外が発生する可能性があった。
2. **NPX 実行オーバーヘッド**: `Makefile` で `npx -y google-closure-compiler` と記述されていたため、すでに `node_modules` に配備されているパッケージであっても `npx` の探索・検証フローが発生し、ビルド開始が著しく遅延する原因となっていた。

---

## 4. 暫定対処と恒久対策 / Workaround & Permanent Fix

* **暫定対処 (Workaround)**: 個別画面の更新をリロードで回避する。
* **恒久対策 (Permanent Fix)**:
  1. `quiz.md` および `search.md` のすべての DOM 操作箇所に null チェックガードを追加。
  2. `Makefile` のコンパイルコマンドを `./node_modules/.bin/google-closure-compiler` に変更。

---

## 5. 実装方針 / Implementation Plan

Target Branch: `fix/136-dom-guard-and-closure-compiler-path-optimization`

1. `src/content/quiz.md` 内の `loadQuizData()`, `renderQuestion()`, `filterByPersona()` 等の DOM 取得処理に `if (element)` ガードを追加。
2. `src/content/search.md` 内の `initSearchEngine()`, `setFilter()`, `renderResults()` 等の DOM 取得処理に null ガードを追加し、`searchEngine` 二重初期化防止判定を実装。
3. `Makefile` の Closure Compiler 呼び出しコマンドを `./node_modules/.bin/google-closure-compiler` に更新。
4. `make build && npm test` を実行し、全 5 つの Quality Gates を合格させる。

---

## 6. 完了条件 / Success Criteria (DoD)

- [x] DOM 存在判定ガードが追加され、要素不在時にも JS 例外が発生しない
- [x] `Makefile` でローカル `node_modules/.bin/google-closure-compiler` が正常動作し、ビルド処理が高速化する
- [x] Closure Compiler 最厳格コンパイル（エラー・警告0件）が PASS する
- [x] `npm test`（全10テストスイート）が 100% PASS する
