---
ID: 042
種別: Bug
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [BUG] CI パイプラインでの package-lock.json 未検出エラーおよび Node.js バージョンの修正 (ID: 042)

## 1. 概要 / Summary
GitHub Actions 等の CI パイプライン環境において `package-lock.json` 未指定や Node.js バージョン互換性（Node.js 18 / 20 / 22）によってビルド・テストが失敗する問題を完全修正する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)
- 関連資料: [package.json](../package.json)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [package.json](../package.json)
- [ ] [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/042-fix-ci-package-lock-node-version`

1. **`package-lock.json` の作成とバージョン固定**:
   - `npm i --package-lock-only` による依存整合性の確保。
2. **CI ワークフロー定義の最適化**:
   - `.github/workflows/` 内の Node.js setup ステップにて Lts バージョン (`20.x`) 指定および `npm ci` の導入。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] CI パイプラインが警告・依存関係エラーなしで正常に完了すること。
- [ ] `npm ci` がローカルおよび CI 環境で再現性をもって成功すること。
