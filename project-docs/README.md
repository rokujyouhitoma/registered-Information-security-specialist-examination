# プロジェクト運用・内部ドキュメント (Project Documentation)

本ディレクトリは、情報処理安全確保支援士試験対策リポジトリ自体の運用ルール、開発方針、Gitワークフロー、執筆ガイドラインを管理するエリアです。

> [!NOTE]
> 本ディレクトリ内のドキュメントはリポジトリ管理者・開発者向けであり、GitHub Pages の学習コンテンツ成果物（`docs/`）とは分離して管理しています。

---

## 📄 ドキュメント一覧

- **[system_high_level_design.md](system_high_level_design.md)**: システム基本設計書 (High-Level Design: HLD) - 全体アーキテクチャ、Web Worker非同期パイプライン、ハイブリッド検索構成、PWAキャッシュ、ITSSマルチエージェント体系。
- **[system_low_level_design.md](system_low_level_design.md)**: システム詳細設計書 (Low-Level Design: LLD) - クラス仕様、同義語拡張、密概念スコアリング、BM25計算式、Workerメッセージ通信プロトコル。
- **[agent_roles.md](agent_roles.md)**: マルチエージェント役割分担ガイド (RACIマトリックス)
- **[docs_architecture_and_layout_design.md](docs_architecture_and_layout_design.md)**: `docs/` ディレクトリ構成・レイアウト設計方針書 (階層構造、ナビゲーション、標準レイアウト、UI/UX規約)
- **[glossary_refinement_plan.md](glossary_refinement_plan.md)**: 用語集継続的品質改修ロードマップ & 人間代行多層化自動QA監査計画書
- **[management_improvement_plan.md](management_improvement_plan.md)**: プロジェクト管理・運用改善提案書 (PM視点による10の改善・定義項目)
- **[roadmap_wbs.md](roadmap_wbs.md)**: コンテンツ制作ロードマップ & WBS (全61小項目)
- **[requirements/REQ-01-user_requirements.md](requirements/REQ-01-user_requirements.md)**: ユーザー要求定義書 (ターゲットユーザー、ユースケース、要求定義)
- **[processes/MNG-01-document_ledger.md](processes/MNG-01-document_ledger.md)**: 文書管理台帳・文書管理規約 (全文書のメタデータ、すみ分け、トレーサビリティ)
- **[workflow_guide.md](workflow_guide.md)**: Gitブランチ戦略、コミット規約、Issue運用フロー
- **[writing_guide.md](writing_guide.md)**: ドキュメント執筆・フォーマットガイドライン

---

## 🛠 ディレクトリの役割整理

| ディレクトリ | 役割 | 公開対象 |
|---|---|---|
| **`docs/`** | 最終成果物（試験対策の学習コンテンツ・まとめ） | 🌟 GitHub Pages（一般公開） |
| **`project-docs/`** | プロジェクト運用のための内部資料・ルール | 🛠 内部管理 |
| **`references/`** | 一次情報資料・PDF・リンク集 | 📑 内部・参照 |
| **`issues/`** | 課題・学習タスク管理・Issue台帳 | 📋 内部・管理 |
| **`.agents/`** | AI Agent カスタマイズスキル設定 | 🤖 AIアシスタント用 |
