---
ID: 036
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/BUILD] Closure Compiler の導入と JS コンパイル設定 (ID: 036)

## 1. 概要 / Summary
yuzora リポジトリ (https://github.com/rokujyouhitoma/yuzora/) のビルド設計を参考に、当リポジトリの JavaScript 資産（自作 FM-index & ベクター検索エンジン `site/fm_index_engine.js` 等）に対して Google Closure Compiler を導入し、JS コードの最適化・軽量化・難読化および `Makefile` / `package.json` によるビルド自動化パイプラインを構築する。

---

## 2. トレーサビリティ / Traceability
- yuzora リポジトリのビルドアーキテクチャ (`Makefile`, `google-closure-compiler`)
- `site/fm_index_engine.js`

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [package.json](../package.json)
- [x] [Makefile](../Makefile)
- [x] [site/fm_index_engine.js](../site/fm_index_engine.js)
- [x] [site/fm_index_engine.min.js](../site/fm_index_engine.min.js)
- [x] [site/index.html](../site/index.html)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/036-integrate-closure-compiler`

1. **`package.json` の作成・設定**:
   - `google-closure-compiler` を依存関係に定義し、`build:js` スクリプトを追加。
2. **`Makefile` の作成**:
   - yuzora と同様に `make`, `make build`, `make clean` タスクを定義。
3. **Closure Compiler によるビルド検証**:
   - `site/fm_index_engine.js` をコンパイルし `site/fm_index_engine.min.js` を作成。
   - Web ポータル (`site/index.html`) から `.min.js` の正常動作を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `package.json` および `Makefile` が配置され、Closure Compiler ビルドコマンドが成功すること
- [x] `site/fm_index_engine.min.js` が生成され、自作全文検索エンジンが正常に動作すること
