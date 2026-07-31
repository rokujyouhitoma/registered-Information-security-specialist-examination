# 変更履歴 (Changelog)

本プロジェクトにおける主要な変更・機能追加・一次資料更新の全履歴です。
フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.0.0/) に準拠しています。

---

## [Unreleased]

### Added
- コンテンツ制作ロードマップ & WBS (`project-docs/roadmap_wbs.md`) の策定 (全61シラバス項目を網羅)
- マルチエージェント役割分担ガイド (`project-docs/agent_roles.md`) RACIマトリックスの明文化
- 品質保証チェックリスト (`project-docs/quality_assurance_checklist.md`) および品質ゲートの策定
- 相対パス自動検証スクリプト (`scripts/check_relative_paths.py`) の導入
- Issue 台帳自動同期スクリプト (`scripts/sync_issues_ledger.py`) の導入
- MkDocs / GitHub Pages 自動デプロイ (`.github/workflows/deploy.yml`) および リンク検証 CI (`.github/workflows/link-check.yml`) の構築
- 一次情報管理規約 (`references/README.md`) の改訂および `.gitignore` の整備
- YAML Frontmatter 標準メタデータ仕様およびテンプレート記事 (`docs/template_article.md`) の作成
- 総合用語辞書 (`docs/glossary.md`) の新規構築 (主要略語・専門用語の相互リンク化)
- シラバス改定追従プロセス規約 (`project-docs/processes/syllabus_update_process.md`) の策定

---

## [1.2.0] - 2026-07-31

### Added
- `references/okf/` 以下の全258件一次資料PDFに対する完全OKFフォーマット変換および全自動文字起こし (カバレッジ100%達成)
- OKF 統合インデックス (`references/okf/README.md`) の作成
- 歴代過去問題・解答例・採点講評PDF (全249件) の収集・アーカイビング (`references/past_exams/`)
- ITスキル標準 V3 2011 (ITSS) 公式資料の取り込み

---

## [1.1.0] - 2026-07-31

### Added
- IPA公式シラバス 追補版 (科目A-2) Ver.4.0 詳細ドキュメント (`docs/syllabus_tsuiho_detail.md`) の新規作成 (全32小項目完全網羅)
- 10大スペシャリストエージェント定義ファイル (`.agents/agents/*`) のプロジェクトへの取り込み

---

## [1.0.0] - 2026-07-31

### Added
- IPA公式シラバス Ver.2.1 完全準拠ドキュメント (`docs/syllabus_detail.md`) の構造化作成 (全29小項目完全網羅)
- リポジトリ初期構築および基礎ドキュメント体系の定義
