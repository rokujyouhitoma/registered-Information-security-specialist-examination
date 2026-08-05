---
ID: 037
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/CI] Closure Compiler の CI/CD 自動化パイプライン構築および compiled.html の導入 (ID: 037)

## 1. 概要 / Summary
yuzora リポジトリ (https://github.com/rokujyouhitoma/yuzora/) の構成に従い、Closure Compiler による最小化・最適化済み JavaScript (`site/fm_index_engine.min.js`) を動作させるリリース検証用 HTML エントリポイント `site/compiled.html` を作成し、GitHub Actions ワークフロー (`.github/workflows/ci.yml`) において Closure Compiler ビルドおよび品質監査スクリプトの自動テストを実行する CI/CD パイプラインを整備する。

---

## 2. トレーサビリティ / Traceability
- yuzora リポジトリの CI/CD ワークフロー (`.github/workflows/ci.yml`, `.github/workflows/static.yml`)
- `compiled.html` (リリース検証用 HTML)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [compiled.html](../site/compiled.html)
- [x] [index.html](../site/index.html)
- [x] [.github/workflows/ci.yml](../.github/workflows/ci.yml)
- [x] [.github/workflows/static.yml](../.github/workflows/static.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/037-setup-cicd-closure-compiler-compiled-html`

1. **`site/compiled.html` の作成**:
   - `index.html` (開発用 `fm_index_engine.js`) に対して、Closure Compiler のコンパイル成果物 `fm_index_engine.min.js` を読み込む生産用 HTML エントリポイントを構築。`index.html` 側は開発用の未圧縮 `fm_index_engine.js` 読み込みへリセット。
2. **GitHub Actions ワークフロー (`.github/workflows/ci.yml`) の構築**:
   - Node.js 環境のセットアップ
   - Closure Compiler の自動ビルド検証 (`make` / `npm run build`)
   - 用語品質監査スクリプト (`python3 scripts/audit_glossary_quality.py`) およびクイズ機能の自動実行。
3. **Pages デプロイワークフロー (`.github/workflows/static.yml`) の整備**:
   - GitHub Pages 自動配信の設定。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `site/compiled.html` が存在し、`site/fm_index_engine.min.js` が正常動作すること
- [x] `.github/workflows/ci.yml` および `static.yml` が定義され、Closure Compiler のビルドとテストが自動化されていること
