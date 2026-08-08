# ワークフロー・運用ガイド (Workflow Guide)

本プロジェクトにおける Git 運用、Issue 管理、ドキュメント追加の標準フローです。

---

## 🌿 1. ブランチ命名規則

作業は必ず該当するタスク用ブランチを作成して行います。

```text
<type>/<issue-id>-<lowercase-hyphenated-description>
```

- **`feat/`**: 新しい学習コンテンツや機能の追加（例: `feat/001-network-security-notes`）
- **`fix/`**: 内容の誤りやタイポの修正（例: `fix/002-crypto-typo`）
- **`docs/`**: プロジェクト運用ドキュメントの更新
- **`refactor/`**: ディレクトリ構成や共通フォーマットの整理

---

## 📝 2. コミットメッセージ規約 (Conventional Commits)

```text
<type>(<scope>): <summary> (ID: <issue-id>)
```

### 例:
```bash
git commit -m "feat(network): ネットワークセキュリティ要点ノートを追加 (ID: 001)"
```

---

## 🔄 3. Issue のライフサイクル

1. **作成**: スキル `create-issue` を利用して `issues/XXX-title.md` を作成し、[issues/README.md](../issues/README.md) 台帳に登録する。
2. **詳細化**: スキル `polish-issue` で調査、更新対象ファイル、完了条件 (DoD) を定義する。
3. **作業・検証**: ブランチで作業を実行し、完了条件を満たす。
4. **完了・クローズ**: スキル `git-workflow` の手順に従い、ステータスを `Closed` に変更して `issues/closed/` に移動する。
