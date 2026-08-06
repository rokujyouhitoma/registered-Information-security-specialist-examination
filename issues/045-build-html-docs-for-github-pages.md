---
ID: 045
種別: Bug
優先度: High
ステータス: Open (Re-opened / In Progress)
---

# [BUG] docs/ 配下の Markdown ドキュメントが HTML 変換されず 404 になる問題の修正 (ID: 045)

## 1. 概要 / Summary
GitHub Pages および静的配信Webサーバーにおいて、`docs/*.md` への直接リンクが HTML へ適切にビルド・レンダリングされずに 404 や未変換テキスト表示になる問題を解消する静的生成ビルドパイプラインを調整・精緻化する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)
- 関連資料: [docs/index.md](../docs/index.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)
- [ ] [Makefile](../Makefile)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/045-build-html-docs-for-github-pages`

1. **静的サイトビルダー/HTMLジェネレータの調整**:
   - `docs/` 配下の全 `.md` ファイルを等価な HTML ドキュメントへビルド変換し、GitHub Pages 配信ディレクトリへ適切に展開。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] GitHub Pages 上で全ドキュメントリンク（`.html` 経由）が正常に閲覧でき、404 エラーがゼロであること。
