# 文書管理台帳および文書管理規約 (Document Ledger & Management Rules)

Document ID: `MNG-01-document_ledger`

---

## 1. 概要・目的 (Overview & Purpose)

本ドキュメントは、**情報処理安全確保支援士試験 対策学習リポジトリ**において作成・管理される全てのドキュメント（要求定義書、プロセス規程、システム設計書、品質管理計画書、学習成果物、一次情報、Issue台帳等）の位置づけ、保管場所、管理責任、改定トリガーおよび追跡性（トレーサビリティ）を一元管理するための**マスター文書台帳**です。

本規約により、プロジェクト内のすべてのドキュメントの最新性維持、体系的整理、および役割重複の排除を実現します。

---

## 2. 文書管理体系と分類規則 (Classification & ID Rules)

ドキュメントは以下の 5 つの主要カテゴリおよび ID 体系で分類・配置されます。

| 分類コード | カテゴリ | 配置ディレクトリ | 概要 |
|---|---|---|---|
| **`REQ-xx`** | 要求定義 (Requirements) | `project-docs/requirements/` | ユーザー要求、ビジョン、ユースケース定義 |
| **`MNG-xx`** | 管理規程 (Management) | `project-docs/processes/` | 文書台帳、開発ワークフロー、執筆ガイド |
| **`PROC-xx`** | プロセス・運用 (Processes) | `project-docs/processes/` | シラバス更新、マルチエージェント役割、ロードマップ |
| **`SYS-xx` / `ARCH-xx`** | 設計・構造 (Architecture) | `project-docs/architecture/` | システム基本設計、詳細設計、UI/UX設計 |
| **`QUAL-xx`** | 品質管理 (Quality) | `project-docs/quality/` | マスター品質計画、用語精緻化計画、QAチェックリスト |

---

## 3. マスター文書台帳 (Master Document Ledger)

| 文書ID | 文書名 | 相対パス | 役割・概要 | 管理責任 (A) | 対象読者 | 改定トリガー |
|---|---|---|---|---|---|---|
| **[REQ-01]** | **ユーザー要求定義書** | [project-docs/requirements/REQ-01-user_requirements.md](../requirements/REQ-01-user_requirements.md) | 本リポジトリのビジョン、ターゲットユーザー、ユースケース、学習コンテンツの各種要求を定義する。 | PM | 全員、開発者、AI Agent | 目的や提供方針の変更時 |
| **[MNG-01]** | **文書管理台帳・規約** | [project-docs/processes/MNG-01-document_ledger.md](MNG-01-document_ledger.md) | 全ドキュメントの位置づけ、トレーサビリティ、分類、管理責任を定義する。 | PM | 管理者、AI Agent | 構造・カテゴリ変更時 |
| **[MNG-02]** | **ワークフローガイド** | [project-docs/processes/MNG-02-workflow_guide.md](MNG-02-workflow_guide.md) | Gitブランチ、Conventional Commits、Issueライフサイクル、クローズルールを規定する。 | PM | 全エージェント、開発者 | 開発ルールの変更時 |
| **[MNG-03]** | **ドキュメント執筆ガイド** | [project-docs/processes/MNG-03-writing_guide.md](MNG-03-writing_guide.md) | Markdownフォーマット、図解、午後記述キーワード強調等の執筆ルールを規定する。 | PM | コンテンツ執筆者 | 執筆スタイルの更新時 |
| **[PROC-01]** | **シラバス改定更新プロセス** | [project-docs/processes/PROC-01-syllabus_update_process.md](PROC-01-syllabus_update_process.md) | IPA公式シラバス改定に伴うドキュメント追従手続きと更新ガバナンス。 | PM / SC | 執筆者、監査人 | IPAシラバス更新時 |
| **[PROC-02]** | **マルチエージェント役割規定** | [project-docs/processes/PROC-02-agent_roles.md](PROC-02-agent_roles.md) | 11大スペシャリストエージェントの専門領域、RACIマトリクス、レビュー承認フロー。 | PM / ST | 全エージェント | エージェント追加・役割変更時 |
| **[PROC-03]** | **マネジメント改善計画書** | [project-docs/processes/PROC-03-management_improvement_plan.md](PROC-03-management_improvement_plan.md) | プロジェクト管理体制、品質ゲート、自動化テスト維持方針。 | PM | 管理者、AI Agent | 管理体制の見直し時 |
| **[PROC-04]** | **ロードマップ WBS** | [project-docs/processes/PROC-04-roadmap_wbs.md](PROC-04-roadmap_wbs.md) | コンテンツ制作・開発フェーズの WBS、スケジュール、マイルストーン管理。 | PM | 管理者、学習者 | マイルストーン達成時 |
| **[SYS-01]** | **システム基本設計書 (HLD)** | [project-docs/architecture/SYS-01-system_high_level_design.md](../architecture/SYS-01-system_high_level_design.md) | フルスクラッチWeb検索エンジンポータルの高位アーキテクチャ、コンポーネント構成。 | ST | 開発者、アーキテクト | システム基盤変更時 |
| **[SYS-02]** | **システム詳細設計書 (LLD)** | [project-docs/architecture/SYS-02-system_low_level_design.md](../architecture/SYS-02-system_low_level_design.md) | BM25スコアリング、FM-Index、Web Worker、データ駆動設計の低位仕様。 | ST | 開発者、AI Agent | アルゴリズム改修時 |
| **[ARCH-01]** | **UI/UX & レイアウト設計書** | [project-docs/architecture/ARCH-01-docs_architecture_and_layout_design.md](../architecture/ARCH-01-docs_architecture_and_layout_design.md) | Google風シンプルUI/UX、レスポンシブ表示、アクセシビリティ (WCAG 2.1) 規定。 | UIUX | デザイナー、開発者 | UI/UXデザイン変更時 |
| **[QUAL-01]** | **マスター品質向上計画** | [project-docs/quality/QUAL-01-master_quality_enhancement_roadmap.md](../quality/QUAL-01-master_quality_enhancement_roadmap.md) | 学習資料全体の品質維持、トレーサビリティ保証、厳格監査の総合計画。 | SC / AU | 全員、監査人 | 品質フェーズ更新時 |
| **[QUAL-02]** | **次世代プラットフォーム設計** | [project-docs/quality/QUAL-02-next_gen_platform_roadmap.md](../quality/QUAL-02-next_gen_platform_roadmap.md) | ハイブリッド検索、PWA、インタラクティブ採点等プラットフォームロードマップ。 | ST | アーキテクト、開発者 | 新技術導入決定時 |
| **[QUAL-03]** | **用語辞書精緻化計画書** | [project-docs/quality/QUAL-03-glossary_refinement_plan.md](../quality/QUAL-03-glossary_refinement_plan.md) | シラバス2,101用語の解説品質向上、トレーサビリティ全数自動検証方針。 | SC | 執筆者、開発者 | 辞書拡張時 |
| **[QUAL-04]** | **品質保証チェックリスト** | [project-docs/quality/QUAL-04-quality_assurance_checklist.md](../quality/QUAL-04-quality_assurance_checklist.md) | ドキュメントおよびソースコードの DoD / 品質検査項目一覧。 | AU / PM | 執筆者、監査人 | 監査基準更新時 |
| **[ISS-01]** | **Issue台帳** | [issues/README.md](../../issues/README.md) | 全 Issue のステータス（New, In Progress, Closed）を一元管理する。 | PM | 全員、AI Agent | Issue更新時 |
| **[DOC-IDX]** | **学習コンテンツインデックス** | [docs/index.md](../../docs/index.md) | Web公開用トップページ。全学習ドキュメントおよびシラバスへの索引リンク。 | UIUX | 一般学習者、受験者 | 新コンテンツ追加時 |

---

## 4. ドキュメント間のすみ分けと管理ルール (Demarcation & Rules)

### 4.1 成果物 (`docs/`) と 内部管理 (`project-docs/`) のすみ分け
- **`docs/` (Web公開用成果物)**: GitHub Pages を通じて一般受講者が閲覧・検索する解説コンテンツ、過去問対策ノート、シラバス要約のみを配置する。
- **`project-docs/` (内部管理資料)**: 要求定義 (REQ)、管理規程 (MNG/PROC)、設計書 (SYS/ARCH)、品質計画 (QUAL) など、関係者が参照する内部文書を配置する。

### 4.2 トレーサビリティの確保
各学習ドキュメントおよびコード開発は、必ず `REQ-01` の要求、`MNG-01` の台帳分類、および `QUAL-04` の品質基準に基づいて実施し、関連する Issue ID との相互リンクトレースを維持する。
