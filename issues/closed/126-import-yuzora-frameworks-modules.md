# [FEAT/FRAMEWORKS] yuzora リポジトリからの JavaScript フレームワークモジュール群の一括取り込み (ID: 126)

## メタデータ

- **ID**: 126
- **種別**: Feature / Frameworks / Core JS
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & SE (`search-engine-specialist`)
- **ターゲットブランチ**: `feat/126-import-yuzora-frameworks-modules`

---

## 1. 概要 / Summary

本リポジトリのフロントエンド基盤・インタラクティブアニメーションおよびイベント制御モジュールを強化するため、[yuzora リポジトリ (src/js/frameworks)](https://github.com/rokujyouhitoma/yuzora/tree/main/src/js/frameworks) から全 9 つのコア JavaScript フレームワークモジュールを取り込みます。

### 取り込み対象ファイル群:
1. `src/js/frameworks/animation.js`
2. `src/js/frameworks/dom-utils.js`
3. `src/js/frameworks/event.js`
4. `src/js/frameworks/locator.js`
5. `src/js/frameworks/publisher.js`
6. `src/js/frameworks/router.js`
7. `src/js/frameworks/scene.js`
8. `src/js/frameworks/scheduler.js`
9. `src/js/frameworks/timing.js`

取り込み後は [AGENTS.md mandatory rule](.agents/AGENTS.md) に従って Closure Compiler (`make build`) を実行し、コンパイル済みアーティファクト (`site/fm_index_engine.min.js`) およびビルド完全性を更新します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[NEW] `src/js/frameworks/`**:
   - `animation.js`, `dom-utils.js`, `event.js`, `locator.js`, `publisher.js`, `router.js`, `scene.js`, `scheduler.js`, `timing.js`
2. **[REGENERATE/COMPILE] `site/fm_index_engine.min.js` & `site/js/`**:
   - `make build` により再生成および静的アセット同期。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] `src/js/frameworks/` 下に 9 つの全フレームワークモジュールが正常配置されていること。
- [x] Closure Compiler 最厳格コンパイル (`make build`) を実行し、ビルドエラー・構文エラーが 0 件であること。
- [x] `verify-quality-gates` スキルを実行し、循環的複雑度および全自動テストスイートが 100% PASS であること。
- [x] AU による最終判定で【適合 (PASS)】を得ること。
