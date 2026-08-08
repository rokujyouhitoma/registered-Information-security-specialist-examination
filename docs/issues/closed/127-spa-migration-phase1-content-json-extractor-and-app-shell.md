# [FEAT/SPA] SPA 移行 Phase 1: コンテンツ JSON 抽出スクリプト作成 ＆ 単一 SPA アプリケーションシェルの構築 (ID: 127)

## メタデータ

- **ID**: 127
- **種別**: Feature / SPA / Architecture
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: PA (`product-architect`) & SA (`systems-architect`) & ST (`security-tester`)
- **ターゲットブランチ**: `feat/127-spa-migration-phase1-content-json-extractor-and-app-shell`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

[PA / SA / ST 共同策定の SPA アーキテクチャ遷移計画](project-docs/implementation_plan.md) の Phase 1 に基づき、全 27+ ドキュメントのコンテンツを構造化 JSON に自動抽出する `scripts/build_content_json.py` を新規構築しました。

あわせて、取り込んだ `src/js/frameworks/` モジュール群 (`router.js`, `scene.js`, `publisher.js`, `dom-utils.js`, `event.js`) を統合し、ハッシュルーティング対応の単一 SPA アプリケーションシェル `site/index.html` の土台を確立しました。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[NEW] `scripts/build_content_json.py`**:
   - `docs/` 配下の全 Markdown ドキュメントをパースし、`site/data/content_store.json` および `src/data/content_store.json` を動的自動出力。
2. **[NEW] `src/js/spa_app.js`**:
   - SPA アプリケーションエントリポイント（`Router`, `SceneDirector`, `Publisher` 初期化）。
3. **[MODIFY] `scripts/build_html_docs.py` & `Makefile`**:
   - ビルドプロセスへ `build_content_json.py` の自動連動を追加。
4. **[REGENERATE] `site/index.html` & `site/data/content_store.json`**:
   - `make build` により更新。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] `python3 scripts/build_content_json.py` が正常実行され、全 27+ ドキュメントのパースデータが `site/data/content_store.json` に出力されること。
- [x] `src/js/spa_app.js` により `Router`, `SceneDirector` が動作し、ハッシュルーティングのベースが起動すること。
- [x] `make build` によりコンテンツ JSON および静的アセット・Closure Compiler が正常ビルドされること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認。
- [x] ST による品質アサーション・テスト判定で【適合 (PASS)】を得ること。
