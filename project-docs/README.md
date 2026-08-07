# 📁 プロジェクトドキュメントポータル (Project Documentation Hub)

本ディレクトリ (`project-docs/`) は、**情報処理安全確保支援士試験 対策学習リポジトリ**の要求定義、運用プロセス、システム設計、および品質管理計画を一元管理する内部ドキュメントハブです。

---

## 🗺️ ドキュメントマップ (Visual Index Map)

```
project-docs/
├── 📋 requirements/     # [REQ]  ユーザー要求定義書・ビジョン
├── ⚙️ processes/        # [MNG/PROC] 文書台帳・ワークフロー・執筆ガイド・RACI
├── 🏛️ architecture/     # [SYS/ARCH] システム基本・詳細設計書, UI/UX設計書
└── 🛡️ quality/          # [QUAL] 品質向上計画・ロードマップ・監査チェックリスト
```

---

## 📑 カテゴリ別ドキュメント索引 (Document Index)

### 📋 1. 要求定義 (Requirements - `REQ`)
| ID | ドキュメント名 | 概要 | 主な対象者 |
| :---: | :--- | :--- | :--- |
| **`REQ-01`** | [ユーザー要求定義書](requirements/REQ-01-user_requirements.md) | 本リポジトリのビジョン、ターゲットユーザー、提供機能の要求定義 | 全員 / 開発者 |

### ⚙️ 2. 管理規程 & 運用プロセス (Management & Processes - `MNG` / `PROC`)
| ID | ドキュメント名 | 概要 | 主な対象者 |
| :---: | :--- | :--- | :--- |
| **`MNG-01`** | [マスター文書管理台帳・規約](processes/MNG-01-document_ledger.md) | リポジトリ内全ドキュメントの位置づけ・分類・管理責任の定義 | 管理者 / 監査人 |
| **`MNG-02`** | [ワークフローガイド](processes/MNG-02-workflow_guide.md) | Gitブランチ、Conventional Commits、Issueクローズルール | 全エージェント |
| **`MNG-03`** | [ドキュメント執筆ガイド](processes/MNG-03-writing_guide.md) | Markdownスタイル規約、図解表現、キーワード強調ルール | 執筆担当者 |
| **`PROC-01`** | [シラバス改定更新プロセス](processes/PROC-01-syllabus_update_process.md) | IPAシラバス改定に伴うドキュメント追従・更新手順 | 執筆者 / PM |
| **`PROC-02`** | [マルチエージェント役割規定](processes/PROC-02-agent_roles.md) | 11大スペシャリストの専門領域、RACIマトリクス、承認フロー | 全エージェント |
| **`PROC-03`** | [マネジメント改善計画書](processes/PROC-03-management_improvement_plan.md) | 管理体制、品質ゲート、開発テスト維持方針 | 管理者 / PM |
| **`PROC-04`** | [ロードマップ WBS](processes/PROC-04-roadmap_wbs.md) | コンテンツ制作・開発フェーズの WBS とマイルストーン | PM / 開発者 |

### 🏛️ 3. システム設計 & UI/UX (Architecture - `SYS` / `ARCH`)
| ID | ドキュメント名 | 概要 | 主な対象者 |
| :---: | :--- | :--- | :--- |
| **`SYS-01`** | [システム基本設計書 (HLD)](architecture/SYS-01-system_high_level_design.md) | Web検索ポータルの高位アーキテクチャ・コンポーネント構成 | ST / 開発者 |
| **`SYS-02`** | [システム詳細設計書 (LLD)](architecture/SYS-02-system_low_level_design.md) | BM25スコアリング、FM-Index、Web Worker、データ駆動設計 | ST / 開発者 |
| **`ARCH-01`** | [UI/UX & レイアウト設計書](architecture/ARCH-01-docs_architecture_and_layout_design.md) | Google風シンプルUI/UX、レスポンシブ表示、WCAG 2.1 規定 | UIUX / 開発者 |

### 🛡️ 4. 品質管理 & 監査 (Quality & Audit - `QUAL`)
| ID | ドキュメント名 | 概要 | 主な対象者 |
| :---: | :--- | :--- | :--- |
| **`QUAL-01`** | [マスター品質向上計画](quality/QUAL-01-master_quality_enhancement_roadmap.md) | 学習資料全体の品質維持、トレーサビリティ保証、厳格監査計画 | SC / AU |
| **`QUAL-02`** | [次世代プラットフォーム設計](quality/QUAL-02-next_gen_platform_roadmap.md) | ハイブリッド検索、PWA、解法演習プラットフォームロードマップ | ST / 開発者 |
| **`QUAL-03`** | [用語辞書精緻化計画書](quality/QUAL-03-glossary_refinement_plan.md) | シラバス2,101用語の解説品質向上、自動検証方針 | SC / 執筆者 |
| **`QUAL-04`** | [品質保証チェックリスト](quality/QUAL-04-quality_assurance_checklist.md) | ドキュメントおよびソースコードの DoD / 品質検査項目一覧 | AU / PM |

---

## 🔍 クイックナビゲーションガイド

- **「開発ルール・コミット手順を知りたい」** ➔ [MNG-02 ワークフローガイド](processes/MNG-02-workflow_guide.md)
- **「検索エンジンのアルゴリズム・設計を知りたい」** ➔ [SYS-02 システム詳細設計書](architecture/SYS-02-system_low_level_design.md)
- **「各エージェントの担当領域とRACIを知りたい」** ➔ [PROC-02 マルチエージェント役割規定](processes/PROC-02-agent_roles.md)
- **「品質チェックリストと監査基準を確認したい」** ➔ [QUAL-04 品質保証チェックリスト](quality/QUAL-04-quality_assurance_checklist.md)
