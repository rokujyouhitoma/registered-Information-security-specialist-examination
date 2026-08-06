---
ID: 040
種別: Tooling
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [TOOLING] トレーサビリティおよび相対パス自動検証スクリプトの強化 (ID: 040)

## 1. 概要 / Summary
リポジトリ内の全 Markdown ドキュメント (`docs/`, `issues/`, `references/` 等) における内部リンク、一次情報参照、および絶対パス違反 (`file:///` 検出) を自動検証するガバナンススクリプト (`scripts/verify_traceability.py` 等) を構築・強化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.agents/AGENTS.md](../.agents/AGENTS.md) - Documentation & Link Rules
- 関連資料: [references/README.md](../references/README.md) - ガバナンス規約

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [verify_traceability.py](../scripts/verify_traceability.py)
- [ ] [Makefile](../Makefile)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/040-verify-traceability-script`

1. **静的リンク解析スクリプトの作成・整備**:
   - リポジトリ内の全 `.md` ファイルを走査し、`file:///` 絶対パスを誤用している箇所の自動検出・警告機能。
   - マークダウンハイパーリンク (`[text](relative/path)`) のターゲットファイル実在チェック。
2. **自動実行パイプラインの統合**:
   - `Makefile` の `verify` または `check` ターゲットへのスクリプト組み込み。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] スクリプトを実行した際、全 Markdown ファイルの相対パスおよびリンク実在性が検証され、違反ゼロで通過すること。
- [ ] `file:///` 絶対パスが混入した場合にスクリプトがエラー（非ゼロ終了コード）を出力して検知できること。
