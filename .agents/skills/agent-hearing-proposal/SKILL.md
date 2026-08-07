---
name: agent-hearing-proposal
description: 全 13 大スペシャリストエージェントからの専門的聞き取り・現状分析を行い、最も優先度の高い改善項目を1つに絞り込み、関与エージェントの役割分担を定義した上で、polish-issueと多段階エージェント再レビューを経て品質を極限まで高め開発推進するプロシージャスキル。
---
# agent-hearing-proposal

本スキルは、**PM (プロジェクトマネージャー)** 主導のもと、プロジェクト内のすべての専門エージェントから体系的な聞き取り（ヒアリング）を実施し、改善すべき最重要項目を 1 つに選定・提案し、**`polish-issue` スキルおよび多段階エージェント再レビュー（Quality Refinement Loop）** を経て極めて高い品質で開発・統合を行う標準プロシージャです。

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

---

### 2. 単一最重要改善項目の選定 & Review Gate 1 (企画再レビュー)
- 抽出された課題の中から、**ユーザー価値、IPA試験適合性、品質向上インパクト、システム保守性**の観点から最も優先度が高い **1 つの改善項目** を選定・提案する。
- **[Review Gate 1]**: PM, ST, AU が提案内容を多角的にレビュー・推敲し、単一最重要課題として十分な正当性とインパクトがあるか確認する。

---

### 3. Issue 起票 & `polish-issue` による品質洗練 (Review Gate 2)
1. **Issue起票 (`create-issue`)**: `issues/<ID>-<title>.md` を起票し `issues/README.md` にアクティブ登録する。
2. **`polish-issue` スキルの適用**: `polish-issue` スキルを読み込み、Issue 内容（概要、依存関係、影響範囲ファイル、詳細実装ステップ、DoD）を徹底的に洗練する。
3. **[Review Gate 2]**: 関与する主要専門エージェント（ST, UIUX, QA, SC等）が設計および DoD 規準を再レビューし、不備や不足があれば Issue を反復推敲（3回程度の厳格チェック）する。

---

### 4. 機能実装 & 多段階コード・UX・品質検証 (Review Gate 3)
1. **フィーチャーブランチ作成**: `feat/<ID>-<desc>` または `refactor/<ID>-<desc>` ブランチを作成し実装を進める。
2. **UI/UX & アーキテクチャ検証**: UIUX デザイナーによる画面レイアウト・操作性レビュー、ST による設計適合度レビューを行う。
3. **全自動テスト・検証**: `npm run build && npm test` を実行し、既存テストおよび新規テスト全件の正常合格を確認する。
4. **[Review Gate 3 (AU 最終監査)]**: AU (システム監査人) が DoD 完了基準・シラバス適合度・品質規準をチェックし、【適合 (PASS)】判定を記録する。

---

### 5. Issue クローズ & Git ワークフロー統合
1. Issue のステータスを `Closed` に更新し、すべての DoD チェックボックスを通過済み `[x]` に更新する。
2. `mv issues/<ID>-<title>.md issues/closed/` に移動する。
3. `issues/README.md` のテーブルを更新し、完了済み一覧へ移動する。
4. Conventional Commit に従いコミットし、`main` ブランチへマージ後、作業ブランチを削除する。

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

## 2. PM 提案：最重要改善項目 (Review Gate 1 通過)
### 提案タイトル: [改善項目名]
- **概要**: ...
- **目的・期待効果**: ...

## 3. 関与エージェントと RACI 役割分担
| エージェント | 担当領域 | 役割 (RACI) | 具体的なタスク内容 |
|---|---|---|---|
| ... | ... | ... | ... |

## 4. `polish-issue` 洗練および多段階エージェント再レビュー結果 (Review Gate 2 & 3)
- **Polish 実施内容**: ...
- **エージェント再レビュー結果**: 3回以上の反復推敲を経て承認完了
- **AU 監査判定**: 【適合 (PASS)】
```
