---
ID: 061
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] CI/CD による /site ディレクトリの動的ビルドおよび自動デプロイ化 (ID: 061)

## 1. 概要 / Summary
`/docs` 内の Markdown ファイル更新時に `/site` 内の生成済み HTML や検索インデックスとの間に発生する乖離（手動ビルドのコミット漏れ等）を防ぐため、CI/CD パイプライン（GitHub Actions）で `npm run build` を自動実行して `/site` を動的に生成・検証・デプロイする構成へ改修した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [issues/closed/010-github-pages-ci-cd-pipeline.md](closed/010-github-pages-ci-cd-pipeline.md)
- 関連資料: [issues/closed/037-setup-cicd-closure-compiler-compiled-html.md](closed/037-setup-cicd-closure-compiler-compiled-html.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)
- [x] [.github/workflows/ci.yml](../.github/workflows/ci.yml)
- [x] [Makefile](../Makefile)
- [x] [package.json](../package.json)
- [x] [README.md](../README.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/061-automate-site-build-cicd`

1. **GitHub Actions ワークフロー (`.github/workflows/deploy.yml`) の改修**:
   - Python 3.11 環境および Node.js 22 環境をセットアップ。
   - `npm ci` (または `npm install`) で依存関係をインストール。
   - `npm run build` を呼び出して、JavaScript の Closure Compiler 最適化 (`site/fm_index_engine.min.js`) および `scripts/build_html_docs.py` による独自 HTML 変換 (`site/*.html`, `site/search_index.json`) を実行。
   - `mkdocs build` を実行して MkDocs テーマとの整合性を確保した静的ファイルを生成。
   - 動的に生成された `/site` ディレクトリの成果物を `actions/upload-pages-artifact@v3` でアップロードし、`actions/deploy-pages@v4` で GitHub Pages へ自動デプロイ。

2. **CI ワークフロー (`.github/workflows/ci.yml`) の動作確認と維持**:
   - PR / push 時に `npm run build` が正しく実行され、ドキュメントと JS エンジンのコンパイルエラーがないことを保証。

3. **ローカルおよび CI テスト実行**:
   - `npm run build` を実行し、生成物とテスト (`npm test`) がすべてパスすることを確認。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `.github/workflows/deploy.yml` に `npm run build` ステップが組み込まれ、`/site` が動的に構築されてデプロイされる構成になっていること
- [x] `.github/workflows/ci.yml` でのビルドおよび全自動テスト (`npm test`) が正常にパスすること
- [x] ローカル環境で `npm run build` および `npm test` がエラーなく実行完了すること
- [x] ドキュメント更新時に CI/CD 経由で常に最新の `/site` がデプロイされる仕組みが確立していること
