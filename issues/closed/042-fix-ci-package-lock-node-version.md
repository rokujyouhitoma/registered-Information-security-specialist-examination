---
ID: 042
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG/CI] GitHub Actions CI パイプラインでの package-lock.json 未検出エラーおよび Node.js バージョン警告の修正 (ID: 042)

## 1. 概要 / Summary
GitHub Actions の CI/CD パイプライン実行時に、`actions/setup-node@v4` で `cache: 'npm'` が指定されているにもかかわらず `package-lock.json` が存在しないため発生する `Error: Dependencies lock file is not found` を解消し、Node.js 20 の非推奨警告（DeprecationWarning）に対応して最新安定版バージョンへ更新する。

---

## 2. トレーサビリティ / Traceability
- GitHub Actions CI エラーログ (`Error: Dependencies lock file is not found`)
- [.github/workflows/ci.yml](../.github/workflows/ci.yml)
- [.github/workflows/static.yml](../.github/workflows/static.yml)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [package-lock.json](../package-lock.json)
- [x] [.github/workflows/ci.yml](../.github/workflows/ci.yml)
- [x] [.github/workflows/static.yml](../.github/workflows/static.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/042-fix-ci-package-lock-node-version`

1. **`package-lock.json` の生成**:
   - `npm i --package-lock-only` によりロックファイルを生成・コミット。
2. **GitHub Actions ワークフローの更新**:
   - Node.js バージョンを `22` に更新。
   - `ci.yml` および `static.yml` の `setup-node` キャッシュ設定とアクション呼び出しを適正化。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `package-lock.json` が生成され、`make build && npm test` が成功すること
- [x] CI ワークフロー定義が更新され、ロックファイルエラーと非推奨警告が解決すること
