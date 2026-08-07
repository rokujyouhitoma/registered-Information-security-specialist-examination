---
name: agent-hearing-proposal
description: 全 13 大スペシャリストエージェントからの専門的聞き取り・現状分析を行い、最も優先度の高い改善項目を1つに絞り込み、関与エージェントの役割分担を定義した上でIssue化・開発推進するプロシージャスキル。
---
# agent-hearing-proposal

本スキルは、**PM (プロジェクトマネージャー)** 主導のもと、プロジェクト内のすべての専門エージェントから体系的な聞き取り（ヒアリング）を実施し、プロジェクト全体の改善すべき項目を 1 つに絞り込んで提案し、関係エージェントの RACI 役割分担を定義した上で標準開発ライフサイクルを推進する手順を規定します。

---

## 📋 実行手順 (Instructions)

### 1. 全 13 エージェントへの聞き取り & 課題抽出 (Hearing & Needs Gathering)
- 13 大専門エージェントに対し、それぞれの専門領域における現状の課題、ボトルネック、コンテンツ/機能の改善ニーズを漏れなく聞き取る。

| ID | エージェント名称 | 専門領域 |
|:---:|---|---|
| **SC** | `information-security-specialist` | 全体セキュリティ・暗号・認証・セキュア設計 |
| **NW** | `network-specialist` | ネットワークセキュリティ・境界防御・通信プロトコル |
| **DB** | `database-specialist` | データベース & データセキュリティ・DSPM |
| **ST** | `systems-architect` | クラウド・IAM・ゼロトラスト・システムアーキテクチャ |
| **AU** | `systems-auditor` | 監査・ガバナンス・コンプライアンス |
| **QA** | `software-quality-assurance-specialist` | 脆弱性診断・セキュアプログラミング・自動テスト |
| **PM** | `project-manager` | プロジェクト管理・WBS・DoD評価・総合品質承認 |
| **STR** | `information-technology-strategist` | セキュリティ戦略・経営IT・BCP/DR |
| **SM** | `information-technology-service-manager` | ITSM・ログ解析・SIEM/SOAR インシデント運用 |
| **EP** | `embedded-systems-specialist` | IoT & OT / 組込みハードウェアセキュリティ |
| **IR** | `it-specialist-information-retrieval` | 情報検索エンジン・全文インデックス・データ構造 |
| **EDU** | `education-specialist` | 教育指導・ITSSセルフチェック・学習教材設計 |
| **UIUX** | `ui-ux-designer` | UI/UXデザイン・アクセシビリティ (WCAG 2.1) |

- 各エージェントから提出された意見・改善要望をマトリクス形式で集約整理する。

### 2. 単一最重要改善項目の絞り込み・提案 (Consolidated Single Proposal)
- 抽出された課題の中から、**ユーザー価値、IPA試験適合性、品質向上インパクト、システム保守性**の観点から最も優先度が高い **1 つの改善項目** を選定・提案する。
- 提案内容には以下の要素を明記する：
  1. 改善項目のタイトルおよび概要
  2. 解決する課題と導入メリット
  3. 具体的なスコープ（変更対象ファイル・機能）

### 3. 関与エージェントの役割定義 (Agent RACI Matrix Definition)
- 提案項目を推進するにあたり、関与する全エージェントとその具体的役割（R: 実行責任者, A: 最終責任者/監査人, C: 助言・レビュー, I: 報告先）を一覧化して明記する。

### 4. Issue 化と開発推進 (Issue Creation & Feature Branch Workflow)
1. **Issue起票 (`create-issue`)**: `issues/<ID>-<title>.md` を起票し `issues/README.md` に登録する。
2. **Issue洗練 (`polish-issue`)**: 関与エージェントの役割、DoD、ファイル変更計画を詳細化する。
3. **ブランチ作成・実装**: `feat/<ID>-<desc>` または `refactor/<ID>-<desc>` ブランチを作成し実装を進める。
4. **全自動テスト・検証**: `npm run build && npm test` で検証する。
5. **最終監査 & クローズ (`git-workflow`)**: AU 最終監査を経て `issues/closed/` に移動し、`main` ブランチにマージする。

---

## 🎯 出力フォーマットテンプレート

ヒアリングおよび改善提案の出力時には以下の標準フォーマットを使用する。

```markdown
# 👂 全 13 エージェント聞き取り調査 & 最重要改善提案

## 1. エージェントヒアリング結果一覧
- **SC**: ...
- **NW**: ...
- **DB**: ...
- **ST**: ...
- **AU**: ...
- **QA**: ...
- **PM**: ...
- **STR**: ...
- **SM**: ...
- **EP**: ...
- **IR**: ...
- **EDU**: ...
- **UIUX**: ...

## 2. PM 提案：最重要改善項目 (Single Priority Proposal)
### 提案タイトル: [改善項目名]
- **概要**: ...
- **目的・期待効果**: ...

## 3. 関与エージェントと RACI 役割分担
| エージェント | 担当領域 | 役割 (RACI) | 具体的なタスク内容 |
|---|---|---|---|
| ... | ... | ... | ... |
```
