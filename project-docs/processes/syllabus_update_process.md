# IPA シラバス改定追従プロセス規約 (Syllabus Update Process)

本規約は、IPA（情報処理推進機構）による年次のシラバス改定や追補版発表に対応するため、差分検知・インポート・学習ドキュメント改定・変更履歴記録までの 4 ステップ標準手順を定義した運用ガバナンス文書です。

---

## 1. シラバス改定追従 4ステップ標準手順

### ステップ 1: 一次情報の収集 & 保存 (Information Collection)
1. **監視タイミング**: 毎年春期 (4月) および 秋期 (10月) の試験発表タイミングで IPA 公式Webサイトを巡回確認する。
2. **入手資料**:
   - 新版シラバスPDF (`syllabus_sc_verX_X.pdf`)
   - 変更箇所表示版PDF (`syllabus_sc_verX_X_henkou.pdf`)
3. **一次情報格納**: `references/` ディレクトリ配下に命名規約に従って格納し、[references/README.md](../../references/README.md) に記録する。

### ステップ 2: 差分解析 & OKF化 (Diff Analysis & Structuring)
1. **OKF自動変換**: [scripts/convert_all_references_to_okf.py](../../scripts/convert_all_references_to_okf.py) を実行し、新シラバスPDFを OKF フォーマット化する。
2. **差分抽出**: 既存の OKF シラバスドキュメント (`docs/syllabus_detail.md` 等) との差分を比較し、新設・削除・名称変更された小項目および「用語例」を一覧抽出する。

### ステップ 3: コアドキュメント & 用語辞書の更新 (Document Revision)
1. **シラバス詳細の更新**: `docs/syllabus_detail.md` または `docs/syllabus_tsuiho_detail.md` に新項目・変更内容を反映する。
2. **総合用語辞書の追記**: `docs/glossary.md` に新設された専門用語・略語を追加し、シラバスリンクを接続する。
3. **ロードマップ WBS の更新**: `project-docs/roadmap_wbs.md` に新シラバス項目を追加し、担当エージェントと優先Phaseを割り当てる。

### ステップ 4: 影響調査 & 修正 Issue の起票 (Impact Analysis & Issue Creation)
1. 既存の学習ドキュメント (`docs/`) において内容の改訂が必要な箇所を特定する。
2. `create-issue` スキルを使用して修正 Issue を起票し、[issues/README.md](../../issues/README.md) に登録して順次対応する。
3. リポジトリ直下の `CHANGELOG.md` に改定内容を記録する。
