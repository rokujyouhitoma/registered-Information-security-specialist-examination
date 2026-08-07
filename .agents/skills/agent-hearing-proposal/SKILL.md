---
name: agent-hearing-proposal
description: 全 13 大スペシャリストエージェントからの専門的聞き取り・現状分析を行い、最も優先度の高い改善項目を1つに絞り込み、関与エージェントの役割分担を定義した上で、polish-issueと多段階エージェント再レビューを経て品質を極限まで高め開発推進するプロシージャスキル。
---
# agent-hearing-proposal

本スキルは、**全体管理（PM）** の統括のもと、**企画（ST）**、**設計・実装（SA および SA 指名スペシャリスト）**、**品質管理（QA / AU）** の各フェーズ明確な責任体制を敷き、全 13 専門エージェントからのヒアリング・改善提案選定から **`polish-issue` スキル適用** および **多段階エージェント再レビュー（Quality Refinement Loop）** を経て品質を極限まで高めて開発・マージを行う標準プロシージャです。

---

## 🏛️ フェーズ別エージェント責任体制 (Phase Accountabilities)

| フェーズ | 主担当エージェント | 役割と主な責務 |
|---|---|---|
| **全体管理 (Overall Management)** | **PM** (`project-manager`) | プロジェクト全体の推進・WBS管理・DoD達成評価・マージ承認統括 |
| **企画・提案選定 (Planning & Proposal)** | **ST** (`information-technology-strategist`) | 全エージェントヒアリング分析・戦略・企画観点での最重要課題選定・企画構想 |
| **設計・実装 (Design & Implementation)** | **SA** (`systems-architect`) + **SA指名スペシャリスト** | SA が課題に応じて指名した専門分野エージェント（SC, NW, DB, EP, SM, IR, EDU, UIUX 等）による詳細設計・コーディング・アーキテクチャ構築 |
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
| **SM** | `information-technology-service-manager` | ITSM・ログ解析・SIEM/SOAR インシデント運用 |
| **EP** | `embedded-systems-specialist` | IoT & OT / 組込みハードウェアセキュリティ |
| **IR** | `it-specialist-information-retrieval` | 情報検索エンジン・全文インデックス・データ構造 |
| **EDU** | `education-specialist` | 教育指導・ITSSセルフチェック・学習教材設計 |
| **UIUX** | `ui-ux-designer` | UI/UXデザイン・アクセシビリティ (WCAG 2.1) |

---

### Step 2: 単一最重要課題の企画・選定 & [Review Gate 1: 企画レビュー]
- **企画担当 (ST)** 主導のもと、ユーザー価値・シラバス適合性・技術的インパクトから最優先改善項目を **1 つ** 選定。
- **[Review Gate 1]**: **PM / ST / SA / AU** が企画構想を再レビューし、正当性を推敲・承認する。
- **設計・実装担当 (SA) による各スペシャリストの指名**: 課題内容に応じて、**SA** が実装を担当する専門スペシャリスト（例: UIUX, NW, DB, SC 等）を明示的に指名・アサインする。

---

### Step 3: Issue起票 & `polish-issue` による多段階設計推敲 & [Review Gate 2: 設計レビュー]
1. **Issue起票 (`create-issue`)**: `issues/<ID>-<title>.md` を作成し `issues/README.md` にアクティブ登録する。
2. **`polish-issue` スキルの適用**: `polish-issue` スキルを実行し、要件定義・変更影響範囲・DoD・テスト手順を徹底洗練（Polish）する。
3. **[Review Gate 2]**: **SA および SA 指名スペシャリスト** が設計・DoD・タスク分解を再レビュー（3回以上の反復推敲）し、完成度を高める。

---

### Step 4: 設計・実装 & [Review Gate 3: 品質管理・AU最終監査]
1. **ブランチ作成・実装**: **SA および SA 指名スペシャリスト** が `feat/` または `refactor/` ブランチで設計・実装を行う。
2. **品質管理 (QA)**: `npm run build && npm test` を実行し、全自動テスト（ユニット、トレース、品質監査、クイズ、検索等）の 100% 合格を検証する。
3. **[Review Gate 3 (AU 最終監査)]**: **AU (システム監査人)** が全 DoD 項目の適合度・ドキュメントトレーサビリティを監査し、【適合 (PASS)】判定を記録する。

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
- **設計・実装**: SA (`systems-architect`) + 指名スペシャリスト ([指名エージェント名])
- **品質管理・監査**: QA (`software-quality-assurance-specialist`) & AU (`systems-auditor`)

## 2. エージェントヒアリング結果一覧
- **ST**: ...
- **SA**: ...
- **SC**: ...
- ... (全 13 エージェント)

## 3. 企画担当 (ST) 提案：最重要改善項目 (Review Gate 1 通過)
### 提案タイトル: [改善項目名]
- **概要**: ...
- **SA 指名設計・実装スペシャリスト**: [指名エージェント名]

## 4. `polish-issue` 洗練および多段階エージェント再レビュー結果 (Review Gate 2 & 3)
- **Polish 実施内容**: ...
- **設計・実装推敲 (SA & 指名エージェント)**: 反復推敲により確定
- **品質管理 (QA) 検証結果**: 全自動テスト 100% PASS
- **AU 監査判定**: 【適合 (PASS)】
```
