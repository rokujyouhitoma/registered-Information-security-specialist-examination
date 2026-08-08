# IPA シラバス改定追従プロセス規約 (Syllabus Update Process Governance)

本規約は、IPA（情報処理推進機構）による年次のシラバス改定や追補版発表に対応するため、差分検知・インポート・学習ドキュメント改定・変更履歴記録までの 4 ステップ標準手順およびガバナンス体制を定義した運用文書です。

---

## 1. シラバス改定追従 4ステップ標準手順

### ステップ 1: 一次情報の収集 & 保存 (Information Collection & Storage)
1. **定期監視タイミング**: 毎年春期 (4月) および 秋期 (10月) の IPA 公式試験発表のタイミングで IPA 公式サイト（[IPA シラバス一覧](https://www.ipa.go.jp/shiken/syllabus/index.html)）を巡回確認する。
2. **入手必須資料**:
   - 新版シラバスPDF (`syllabus_sc_verX_X.pdf`)
   - 変更箇所表示版PDF (`syllabus_sc_verX_X_henkou.pdf`)
   - 追補版資料（科目A-2 / 科目Bの更新時）
3. **一次情報格納 & 台帳記録**:
   - `references/` ディレクトリ配下に命名規約に従って格納。
   - [references/README.md](../../references/README.md) に追加ファイル名、概要、サイズ、公式URLを追記する。

### ステップ 2: 差分解析 & OKF構造化 (Diff Analysis & Structuring)
1. **OKF全自動変換**:
   ```bash
   python3 scripts/convert_all_references_to_okf.py
   ```
   新規PDFをテキスト抽出し、YAMLフロントマター付きの OKF 構造化ドキュメント (`references/okf/`) へ自動変換する。
2. **100% カバレッジ検証**:
   ```bash
   python3 scripts/verify_okf_coverage.py
   ```
   全一次資料と OKF ドキュメントの 1 対 1 対応（欠落 0 件）を確認する。
3. **差分抽出**:
   - 既存の OKF シラバスドキュメント (`docs/syllabus_detail.md` 等) と新版 OKF ドキュメントを比較。
   - 大分類・中分類・小分類の構成変更、新設・削除された「新出用語例」を抽出・整理する。

### ステップ 3: コアドキュメント & 総合用語辞書の更新 (Document Revision)
1. **シラバス詳細ドキュメントの更新**:
   - `docs/syllabus_detail.md`（Ver.2.1等）または `docs/syllabus_tsuiho_detail.md`（追補版等）に新項目および変更内容を反映。
2. **総合用語辞書への追記**:
   - [docs/glossary.md](../../docs/glossary.md) に新設された専門用語・略語・重要キーワードを追加し、該当シラバス項目へのリンクを設定。
3. **ロードマップ WBS の更新**:
   - [project-docs/roadmap_wbs.md](../roadmap_wbs.md) に新シラバス項目を追加し、対応優先度および担当エージェントを割り当てる。

### ステップ 4: 影響調査 & 改訂 Issue の起票 (Impact Analysis & Issue Governance)
1. **影響分析**:
   - 既存の学習コンテンツドキュメント (`docs/`) やテスト・演習問題において、記載内容の修正や補足が必要な箇所を検索・特定。
2. **Issue 起票 & 追跡**:
   - `create-issue` スキルを実行して改訂 Issue を起票し、[issues/README.md](../../issues/README.md) に登録する。
3. **Changelog の記録**:
   - リポジトリ直下の [CHANGELOG.md](../../CHANGELOG.md) に本改定の概要および変更点を記帳する。

---

## 2. 役割分担とガバナンス (RACI Matrix)

| ステップ | 担当 (Accountable / Responsible) | 協力 (Consulted) |
|---|---|---|
| **ステップ1: 情報収集** | Information Security Specialist Agent | Research Agent |
| **ステップ2: 差分解析** | Python Verification Scripts (`convert_all_references_to_okf.py`) | QA Agent |
| **ステップ3: ドキュメント更新** | Lead Security Writer Agent | Subject Matter Expert Agents |
| **ステップ4: 影響調査 & Issue** | Project Governance Lead | All Specialist Agents |

---

## 3. 品質ゲート (Quality Gate Check)

シラバス改定対応完了時には、以下の品質ゲートをパスする必要があります：
1. `python3 scripts/verify_okf_coverage.py` が 100% カバレッジを達成すること。
2. `python3 scripts/check_relative_paths.py` を実行し、相対パス違反が 0 件であること。
3. [CHANGELOG.md](../../CHANGELOG.md) に該当リリースの変更点が記載されていること。
