---
ID: 045
種別: Bug
優先度: High
ステータス: Closed
---

# [BUG/WEB] docs/ 配下の Markdown ドキュメントが HTML 変換されず 404 になる問題の修正 (ID: 045)

## 1. 概要 / Summary
GitHub Pages (`site/` ディレクトリ配信) 上で、`site/index.html` からリンクされている `subject_b/reasoning_guide.html` や `glossary/syllabus_ver2_1.html` 等のドキュメントページが 404 Not Found エラーになる問題を解決するため、`docs/` 配下の全 `.md` ドキュメントを自動でレスポンシブかつ美しい Dark Mode HTML に変換・ビルドして `site/` 配下に出力するスクリプト `scripts/build_html_docs.py` を作成し、ビルドプロセスに統合する。

---

## 2. トレーサビリティ / Traceability
- ユーザー報告 `https://rokujyouhitoma.github.io/registered-Information-security-specialist-examination/subject_b/reasoning_guide.html` 404 エラー
- [site/index.html](../site/index.html)
- [docs/subject_b/reasoning_guide.md](../docs/subject_b/reasoning_guide.md)
- [docs/scenarios/attack_scenarios_analysis.md](../docs/scenarios/attack_scenarios_analysis.md)
- [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [scripts/build_html_docs.py](../scripts/build_html_docs.py)
- [x] [Makefile](../Makefile)
- [x] [package.json](../package.json)
- [x] [site/](../site/) 配下の生成 HTML

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/045-build-html-docs-for-github-pages`

1. **`scripts/build_html_docs.py` の作成**:
   - `docs/` 配下の全 `.md` ファイルを再帰的に探索。
   - Markdown構文（見出し、リスト、テーブル、コードブロック、太字、リンク）をパースし、モダンな Dark Mode HTML テンプレートでレスポンシブな `.html` に変換。
   - 各 HTML ページに「トップページへ戻る」「検索へ」等の共通ナビゲーションヘッダーを付与。
   - 内部リンク `.md` を `.html` へ自動変換。
2. **ビルドプロセスの更新**:
   - `Makefile` および `package.json` の `build` コマンドに `python3 scripts/build_html_docs.py` を追加。
   - `make build` を実行して `site/` 配下に全 HTML を出力。
3. **検証**:
   - 生成された `site/subject_b/reasoning_guide.html` 等の存在と構造を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/` 配下のすべての `.md` ドキュメントに対応する HTML が `site/` 配下に正しく生成されること
- [x] `subject_b/reasoning_guide.html` 等のリンクがすべて正常に閲覧可能であること
- [x] `make build && npm test` が成功すること
