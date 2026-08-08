---
ID: 135
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] ディレクトリ構造再定義: 学習コンテンツの src/content 移行および docs/ へのプロジェクト管理資料集約 (ID: 135)

## 1. 概要 / Summary
サイトとして配信・表示する全学習コンテンツ資料を `src/content/` 配下に配置し、`project-docs/` 配下の要件定義・設計仕様書・アーキテクチャ資料を `docs/` 配下に集約統合する。これにより、`docs/` をプロジェクト管理・設計開発資材専用ディレクトリとして純粋化する。

## 2. トレーサビリティ / Traceability
- **ADR-01 構成戦略**: ソースコード・配信コンテンツ (`src/`) と開発プロジェクト管理資料 (`docs/`) の明確な境界分離

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [src/content/](../src/content/)
- [ ] [docs/](../docs/)
- [ ] [scripts/build_content_json.py](../scripts/build_content_json.py)
- [ ] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [ ] [scripts/fm_index_search.py](../scripts/fm_index_search.py)
- [ ] [scripts/audit_traceability.py](../scripts/audit_traceability.py)
- [ ] [scripts/check_relative_paths.py](../scripts/check_relative_paths.py)
- [ ] [scripts/verify_build_integrity.js](../scripts/verify_build_integrity.js)

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/135-restructure-learning-content-to-src-content-and-docs`

1. ディレクトリ移動:
   - `docs/` 配下の学習ドキュメントを `src/content/` に移動。
   - `project-docs/` 配下の要件・設計・評価資料を `docs/` に移動。
   - `project-docs/` ディレクトリを削除。
2. スクリプト・ビルドパイプラインの更新:
   - 全生成・検証スクリプトの入力ディレクトリパスを `src/content/` に変更。
3. `make build` & `npm test` による検証:
   - 全自動テストスイート 100% PASS を確認。

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 学習コンテンツがすべて `src/content/` 配下に配置されていること。
- [ ] 要件・設計仕様・評価ドキュメントがすべて `docs/` 配下に集約されていること。
- [ ] `make build` が正常完了すること。
- [ ] `npm test` が 100% PASS すること。
