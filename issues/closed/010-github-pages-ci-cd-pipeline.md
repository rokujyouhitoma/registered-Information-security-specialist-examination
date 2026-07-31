---
ID: 010
種別: Feature
優先度: Medium
ステータス: Closed
---

# [FEAT/ENH] GitHub Pages 自動デプロイ & リンク切れ検証 CI の構築 (ID: 010)

## 1. 概要 / Summary
`main` ブランチへのプッシュ時に、`docs/` 内の学習ドキュメントを MkDocs / GitHub Pages へ自動ビルド・デプロイし、リンク切れ（デッドリンク）を自動検出する GitHub Actions ワークフローを導入する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目6)
  - [README.md](../README.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] `mkdocs.yml`
- [x] `.github/workflows/deploy.yml`
- [x] `.github/workflows/link-check.yml`

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/010-github-pages-ci-cd-pipeline`

1. **`mkdocs.yml` の設計**:
   - `site_name`: 情報処理安全確保支援士試験 対策ドキュメント
   - `theme`: `name: material` (または `mkdocs`)
   - `nav`:
     - ホーム: `index.md`
     - シラバス概要: `syllabus.md`
     - 公式シラバスVer.2.1詳細: `syllabus_detail.md`
     - シラバス追補版Ver.4.0詳細: `syllabus_tsuiho_detail.md`
     - 試験概要: `exam_overview.md`

2. **GitHub Actions デプロイパイプライン `.github/workflows/deploy.yml`**:
   - トリガー: `main` ブランチへの push
   - ステップ:
     1. リポジトリ checkout
     2. Python 3.x セットアップ
     3. `mkdocs-material` インストール
     4. `mkdocs gh-deploy --force` の実行

3. **デッドリンク検知パイプライン `.github/workflows/link-check.yml`**:
   - トリガー: Pull Request 作成時・更新時
   - ステップ: `lychee-action` を利用して Markdown ファイル内のデッドリンクを自動検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `mkdocs.yml` がリポジトリ直下に存在し、ローカルでのビルド (`python3 -m mkdocs build`) が正常完了すること
- [x] `.github/workflows/deploy.yml` および `link-check.yml` が正しく構成されていること
- [x] GitHub Actions の構文エラーがないこと
