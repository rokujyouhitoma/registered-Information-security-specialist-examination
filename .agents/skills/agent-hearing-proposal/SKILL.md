---
name: agent-hearing-proposal
description: 全 13 大スペシャリストエージェントからの専門的聞き取り・現状分析を行い、最優先改善項目を選定。SM (ITサービスマネージャ) / SA (システムアーキテクト) による厳格な変更管理 (Change Management) および5大影響アセスメントを経て、polish-issueおよび多段階エージェント再レビューにより品質を極限まで高め開発推進するプロシージャスキル。
---
# agent-hearing-proposal

本スキルは、**全体管理（PM）** の統括のもと、**企画（ST）**、**設計・実装（SA および SA 指名スペシャリスト）**、**変更管理（SM）**、**品質管理（QA / AU）** の各フェーズ明確な責任体制を敷き、全 13 専門エージェントからのヒアリング・改善提案選定から **`polish-issue` スキル適用**、**変更影響アセスメント（Change Impact Assessment）**、および **多段階エージェント再レビュー（Quality Refinement Loop）** を経て品質と可用性を極限まで高めて開発・マージを行う標準プロシージャです。

---

## 🏛️ フェーズ別エージェント責任体制 (Phase Accountabilities)

| フェーズ | 主担当エージェント | 役割と主な責務 |
|---|---|---|
| **全体管理 (Overall Management)** | **PM** (`project-manager`) | プロジェクト全体の推進・WBS管理・DoD達成評価・マージ承認統括 |
| **企画・提案選定 (Planning & Proposal)** | **ST** (`information-technology-strategist`) | 全エージェントヒアリング分析・戦略・企画観点での最重要課題選定・企画構想 |
| **変更管理 (Change Management)** | **SM** (`information-technology-service-manager`) + **SA** | **新規施策・変更導入時における5大観点（サービス運用・データ構造・セキュリティ・品質テスト・UI/UX）の変更影響アセスメント (Change Impact Assessment)** の実施・リスク評価 |
| **設計・実装 (Design & Implementation)** | **SA** (`systems-architect`) + **SA指名スペシャリスト** | SA が課題に応じて指名した専門分野エージェント（SC, NW, DB, EP, SM, IR, EDU, UIUX 等）による詳細設計・コーディング・アーキテクチャ構築 |
| **検索基盤・データ構造設計** | **IR** + **SA** | **IR** (情報検索) は **SA** と共同し、検索エンジンの**文字列データ圧縮技術（Front Coding, 変長符号化）**および**簡潔データ構造による圧縮全文索引（FM-Index / BWT / Wavelet Tree）**の設計・最適化を検討・評価する。 |
| **品質管理 & 監査 (QA & Audit)** | **QA** + **AU** | QA による全自動テスト検証・回帰テスト、AU によるシステム適合度最終監査および【適合(PASS)】判定 |

---

## 📋 実行手順 (Instructions)

### Step 1: 全 13 エージェントへの聞き取り & 課題抽出 (Hearing)
- **全体管理 (PM)** 統括のもと、全 13 大専門エージェントから専門視点での現状課題・改善ニーズを漏れなく聞き取る。

| ID | エージェント名称 | 専門領域 |
|:---:|---|---|
| **ST** | `information-technology-strategist` | 企画・セキュリティ戦略・経営IT・BCP/DR |
| **SA** | `systems-architect` | システムアーキテクチャ・クラウド・IAM・ゼロトラスト |
| **SC** | `information-security-specialist` | 全体セキュリティ・暗号・認証・セキュア設計 |
| **NW** | `network-specialist` | ネットワークセキュリティ・境界防御・通信プロトコル |
| **DB** | `database-specialist` | データベース & データセキュリティ・DSPM |
| **AU** | `systems-auditor` | 監査・ガバナンス・コンプライアンス |
| **QA** | `software-quality-assurance-specialist` | 脆弱性診断・セキュアプログラミング・自動テスト |
| **PM** | `project-manager` | プロジェクト管理・WBS・DoD評価・総合品質承認 |
| **SM** | `information-technology-service-manager` | ITSM・変更管理 (Change Management)・影響評価・ログ解析・SIEM/SOAR |
| **EP** | `embedded-systems-specialist` | IoT & OT / 組込みハードウェアセキュリティ |
| **IR** | `it-specialist-information-retrieval` | 情報検索エンジン・全文インデックス・文字列データ圧縮 (Front Coding)・圧縮全文索引 (FM-Index / BWT) 【SAと共同検討】 |
| **EDU** | `education-specialist` | 教育指導・ITSSセルフチェック・学習教材設計 |
| **UIUX** | `ui-ux-designer` | UI/UXデザイン・アクセシビリティ (WCAG 2.1) |

---

### Step 2: 単一最重要課題の企画・選定 & 変更影響アセスメント [Review Gate 1: 企画・変更レビュー]
1. **最優先項目の選定**: **企画担当 (ST)** 主導のもと、ユーザー価値・シラバス適合性・技術的インパクトから最優先改善項目を **1 つ** 選定。
2. **変更管理 (SM) & SA による 5 大変更影響アセスメント (Change Impact Assessment)**:
   新しい施策・機能・リファクタリングを導入する際、以下の 5 大観点から変更の影響を事前に徹底検討する。
   - **① サービス運用・可用性影響 (Service Operation & Availability)**: 既存サービスの動作、表示速度、エラー時のフォールバック処理への影響。
   - **② アーキテクチャ・データ構造影響 (Architecture & Data Schema)**: モジュール間結合度、共有 JSON スキーマ、Closure Compiler 型アノテーションへの影響。
   - **③ セキュリティ・ガバナンス影響 (Security & Governance)**: プロトタイプ汚染、XSS、CSP、入力検証、キー安全性の保持状態への影響。
   - **④ 品質・回帰テスト影響 (Quality & Regression Test)**: 既存ユニットテスト、全自動テストスイート (`npm test`)、ビルド整合性への影響。
   - **⑤ 学習体験・UI/UX影響 (Learning Experience & UI/UX)**: WCAG 2.1 アクセシビリティ、画面描画、受験者の学習導線への影響。
3. **[Review Gate 1]**: **PM / ST / SA / SM / AU** が企画構想と変更影響アセスメント結果を審議し、承認する。
4. **SA による各スペシャリストの指名**: 課題内容に応じて、**SA** が実装を担当する専門スペシャリスト（例: UIUX, NW, DB, SC, IR 等）を明示的に指名・アサインする。※検索・インデックス領域では IR を必ず指名。

---

### Step 3: Issue起票 & `polish-issue` による多段階設計推敲 & [Review Gate 2: 設計レビュー]
1. **Issue起票 (`create-issue`)**: `issues/<ID>-<title>.md` を作成し `issues/README.md` にアクティブ登録する。
2. **`polish-issue` スキルの適用**: `polish-issue` スキルを実行し、要件定義・変更影響範囲・DoD・テスト手順を徹底洗練（Polish）する。
3. **[Review Gate 2]**: **SA、SM、および SA 指名スペシャリスト (IR等)** が設計・変更影響対策・DoD・タスク分解を再レビュー（3回以上の反復推敲）し、完成度を高める。

---

### Step 4: 設計・実装 & [Review Gate 3: 品質管理・AU最終監査]
1. **ブランチ作成・実装**: **SA および SA 指名スペシャリスト** が `feat/` または `refactor/` ブランチで設計・実装を行う。
2. **品質管理 (QA)**: `npm run build && npm test` を実行し、全自動テスト（ユニット、トレース、品質監査、クイズ、検索等）の 100% 合格を検証する。
3. **[Review Gate 3 (AU 最終監査)]**: **AU (システム監査人)** が全 DoD 項目の適合度・ドキュメントトレーサビリティを監査し、【適合(PASS)】判定を記録する。

---

### Step 5: Issue クローズ & 全体管理 (PM) によるマージ統合
1. **全体管理 (PM)** の承認のもと、Issue を `Closed` へ更新し `issues/closed/` に移動。
2. `issues/README.md` の一覧を更新。
3. Git コミットし、`main` ブランチへマージして作業ブランチを削除する。

---

## 🎯 出力フォーマットテンプレート

```markdown
# 👂 全 13 エージェント聞き取り調査 & 最重要改善提案

## 1. フェーズ別エージェント責任体制
- **全体管理**: PM (`project-manager`)
- **企画・提案選定**: ST (`information-technology-strategist`)
- **変更管理 (Change Management)**: SM (`information-technology-service-manager`) & SA (5大影響アセスメント実施)
- **設計・実装**: SA (`systems-architect`) + 指名スペシャリスト ([指名エージェント名])
- **検索基盤・データ圧縮**: IR (`it-specialist-information-retrieval`) & SA (文字列圧縮・FM-Index共同検討)
- **品質管理・監査**: QA (`software-quality-assurance-specialist`) & AU (`systems-auditor`)

## 2. エージェントヒアリング結果一覧
- **ST**: ...
- **SA**: ...
- **SM**: (変更管理・サービス運用観点での影響・考慮事項)
- **IR**: (文字列データ圧縮 / 圧縮全文索引の検討結果)
- ... (全 13 エージェント)

## 3. 企画担当 (ST) 提案：最重要改善項目 (Review Gate 1 通過)
### 提案タイトル: [改善項目名]
- **概要**: ...
- **SA 指名設計・実装スペシャリスト**: [指名エージェント名]

## 4. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)
1. **サービス運用・可用性影響**: ...
2. **アーキテクチャ・データ構造影響**: ...
3. **セキュリティ・ガバナンス影響**: ...
4. **品質・回帰テスト影響**: ...
5. **学習体験・UI/UX影響**: ...

## 5. `polish-issue` 洗練および多段階エージェント再レビュー結果 (Review Gate 2 & 3)
- **Polish 実施内容**: ...
- **設計・実装推敲 (SA & 指名エージェント)**: 反復推敲により確定
- **品質管理 (QA) 検証結果**: 全自動テスト 100% PASS
- **AU 監査判定**: 【適合 (PASS)】
```

