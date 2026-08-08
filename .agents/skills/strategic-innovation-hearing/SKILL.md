---
name: strategic-innovation-hearing
description: 全 13 大スペシャリストエージェントからの専門的聞き取り・現状分析を行い、最優先改善項目を選定。時折「突拍子もない革新的企画 (突然変異的アプローチ)」を戦略的に導入し局所最適を回避しつつ、SM/SA による変更管理 (Change Management) および 4 大品質ゲート (Quality Gates: verify-quality-gates スキル一括検証、Closure Compiler ゼロエラー/警告、絶対パス完全排斥) を通して開発・マージを推進する標準プロシージャスキル。
---
# strategic-innovation-hearing

本スキルは、**全体管理（PM）** の統括のもと、**企画（ST）**、**設計・実装（SA および SA 指名スペシャリスト）**、**変更管理（SM）**、**品質管理・監査（QA / AU）** の明確な責任体制を敷き、全 13 専門エージェントからのヒアリングから **`polish-issue` スキル適用**、**突然変異的革新アイデアの発案**、**変更影響アセスメント（Change Impact Assessment）**、および **4 大品質ゲート（Quality Gates / `verify-quality-gates` スキル適用）** を経て品質と可用性を極限まで高めて開発・マージを行う標準プロシージャです。

---

## 🧬 突然変異的企画 (Mutation-driven Wildcard Proposal) 理念

通常の開発サイクルでは漸進的（インクリメンタル）な改善に偏りがちとなり、システムが局所最適（Local Maxima）に陥る危険性があります。
本プロシージャでは、進化生物学およびイノベーション理論における **「突然変異 (Mutation)」** の概念を取り入れ、以下の方針を義務付けます：

1. **突拍子もないアイデアの積極的発案**:
   - 毎回のヒアリング・企画検討において、定常改善に加えて **「一見突拍子もない非連続的・革新的な提案（突然変異的ワイルドカード案）」** を試みとして積極的に含める。
2. **破天荒なアイデアと厳格な品質管理の両立**:
   - どれほど突拍子もない「突然変異的企画」であっても、**5 大変更影響アセスメント (Quality Gate 1)** および **`verify-quality-gates` (Quality Gate 3)** の全自動テスト・絶対パス排除・Closure Compiler コンパイル警告/エラー 0 件をクリアすることで、劇的なイノベーションと堅牢なシステム安全性を両立させる。

---

## 🏛️ 4 大品質ゲート & フェーズ別責任体制 (Quality Gates & Accountabilities)

```
[Quality Gate 1] 企画・変更影響レビュー (ST / SM / SA / AU)
       ├── 突然変異的ワイルドカード企画の評価・選択
       └── 5大変更影響アセスメント (サービス運用、構造、セキュリティ、テスト、UI/UX)
       ↓
[Quality Gate 2] 多段階設計・JSDoc 型定義・相対パス設計レビュー (SA / スペシャリスト)
       ↓
[Quality Gate 3] 統合全自動品質検証ゲート (`verify-quality-gates` スキル呼出し)
  ├── ① Closure Compiler 最厳格コンパイルゲート (エラー・警告: 完全0件)
  ├── ② 相対パスリンクガバナンスゲート (絶対パス違反: 完全0件)
  ├── ③ 循環的複雑度適合ゲート (ADR-02: 全関数 <= 10)
  ├── ④ 用語・ドキュメントトレーサビリティ監査ゲート (100/100 PASS)
  └── ⑤ 統合全自動テストスイートゲート (npm test: 100% PASS)
       ↓
[Quality Gate 4] AU 最終適合監査 & PM マージ統合承認 (AU / PM)
```

| フェーズ | 主担当エージェント | 役割と主な責務 |
|---|---|---|
| **全体管理 (Overall Management)** | **PM** (`project-manager`) | プロジェクト全体の推進・WBS管理・DoD達成評価・マージ承認統括 |
| **企画・提案選定 (Planning & Proposal)** | **ST** (`information-technology-strategist`) | 全エージェントヒアリング分析・最重要課題選定、および**局所最適を回避する「突然変異的アイデア」の発案** |
| **変更管理 (Change Management)** | **SM** (`information-technology-service-manager`) + **SA** | **[Quality Gate 1] 新規施策・突然変異的提案に対する 5 大観点（サービス運用・データ構造・セキュリティ・品質テスト・UI/UX）の変更影響アセスメント** の実施・リスク評価 |
| **設計・実装 (Design & Implementation)** | **SA** (`systems-architect`) + **SA指名スペシャリスト** | **[Quality Gate 2] SA 指名スペシャリスト（IR, SC, NW 等）による詳細設計・Closure Compiler JSDoc 型アノテーション定義・相対パス記法設計** |
| **検索基盤・データ構造設計** | **IR** + **SA** | **IR** (情報検索) は **SA** と共同し、**文字列データ圧縮技術（Front Coding）**および**圧縮全文索引（FM-Index / BWT / Wavelet Tree）**の設計・最適化を評価する。 |
| **品質検証スキル実行** | **QA** + **AU** | **[Quality Gate 3] `verify-quality-gates` スキルを呼び出し、Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、全テスト 100% PASS を一括自動アサートする。** |
| **最終監査 & 承認** | **AU** + **PM** | **[Quality Gate 4] AU による全 DoD 項目・ドキュメントトレーサビリティの最終監査および【適合(PASS)】承認。** |

---

## 📋 実行手順 (Instructions)

### Step 1: 全 13 エージェントへの聞き取り & 課題抽出 (Hearing)
- **全体管理 (PM)** 統括のもと、全 13 大専門エージェントから専門視点での現状課題・改善ニーズおよび**非連続的な革新アイデア**を漏れなく聞き取る。

| ID | エージェント名称 | 専門領域 |
|:---:|---|---|
| **ST** | `information-technology-strategist` | 企画・セキュリティ戦略・経営IT・BCP/DR・突然変異的企画 |
| **SA** | `systems-architect` | システムアーキテクチャ・クラウド・IAM・ゼロトラスト |
| **SC** | `information-security-specialist` | 全体セキュリティ・暗号・認証・セキュア設計 |
| **NW** | `network-specialist` | ネットワークセキュリティ・境界防御・通信プロトコル |
| **DB** | `database-specialist` | データベース & データセキュリティ・DSPM |
| **AU** | `systems-auditor` | 監査・ガバナンス・コンプライアンス・品質ゲート最終承認 |
| **QA** | `software-quality-assurance-specialist` | 脆弱性診断・セキュアプログラミング・自動テスト |
| **PM** | `project-manager` | プロジェクト管理・WBS・DoD評価・総合品質承認 |
| **SM** | `information-technology-service-manager` | ITSM・変更管理 (Change Management)・影響評価・ログ解析・SIEM/SOAR |
| **EP** | `embedded-systems-specialist` | IoT & OT / 組込みハードウェアセキュリティ |
| **IR** | `it-specialist-information-retrieval` | 情報検索エンジン・全文インデックス・文字列データ圧縮 (Front Coding)・圧縮全文索引 (FM-Index / BWT) 【SAと共同検討】 |
| **EDU** | `education-specialist` | 教育指導・ITSSセルフチェック・学習教材設計 |
| **UIUX** | `ui-ux-designer` | UI/UXデザイン・アクセシビリティ (WCAG 2.1) |

---

### Step 2: 単一最重要課題の選定 & [Quality Gate 1: 企画・変更影響レビュー]
1. **最優先項目の選定**: **企画担当 (ST)** 主導のもと、ユーザー価値・シラバス適合性・技術的インパクト、および**時折織り込む突然変異的挑戦性**から改善項目を **1 つ** 選定。
2. **変更管理 (SM) & SA による 5 大変更影響アセスメント**:
   - **① サービス運用・可用性影響**: 既存サービスの動作、表示速度、エラー時のフォールバック処理への影響。
   - **② アーキテクチャ・データ構造影響**: モジュール間結合度、共有 JSON スキーマ、Closure Compiler 型アノテーションへの影響。
   - **③ セキュリティ・ガバナンス影響**: プロトタイプ汚染、XSS、CSP、入力検証、キー安全性の保持状態への影響。
   - **④ 品質・回帰テスト影響**: 既存ユニットテスト、全自動テストスイート (`npm test`)、ビルド整合性への影響。
   - **⑤ 学習体験・UI/UX影響**: WCAG 2.1 アクセシビリティ、画面描画、受検者の学習導線への影響。
3. **[Quality Gate 1 審査]**: **PM / ST / SA / SM / AU** が企画構想と変更影響アセスメント結果を審議・承認する。
4. **SA による専門スペシャリストの指名**: SA が課題に応じて担当スペシャリスト（例: IR, SC, UIUX 等）を指名。

---

### Step 3: Issue起票 & `polish-issue` による多段階設計推敲 & [Quality Gate 2: 設計レビュー]
1. **Issue起票 (`create-issue`)**: `issues/<ID>-<title>.md` を作成し `issues/README.md` にアクティブ登録する。
2. **`polish-issue` スキルの適用**: `polish-issue` スキルを実行し、要件定義・変更影響範囲・DoD・テスト手順を徹底洗練（Polish）する。
3. **[Quality Gate 2 審査]**: **SA、SM、および SA 指名スペシャリスト** が設計・JSDoc 型アノテーション・相対パスリンク設計・タスク分解を再レビュー（3回以上の反復推敲）し承認。

---

### Step 4: 設計・実装 & [Quality Gate 3: 統合品質検証] & [Quality Gate 4: AU 最終監査]
1. **ブランチ作成・実装**: **SA および SA 指名スペシャリスト** が `feat/` または `refactor/` ブランチで設計・実装を行う。
2. **[Quality Gate 3 実行] (スキル: `verify-quality-gates`)**:
   **`verify-quality-gates` スキルを呼び出し、以下の全項目が 100% 合格（エラー・違反・警告ゼロ）であることを自動検証する。**
   - **① Closure Compiler 最厳格コンパイルゲート**: `make build` (または `npm run build:js`) によるエラー・警告 **完全 0 件**。
   - **② 相対パスリンクガバナンスゲート**: `python3 scripts/check_relative_paths.py` による絶対パス違反 **完全 0 件**。
   - **③ 循環的複雑度適合ゲート (ADR-02)**: `python3 scripts/verify_cyclomatic_complexity.py` による全関数複雑度 **<= 10**。
   - **④ 用語・ドキュメントトレーサビリティゲート**: `node scripts/verify_traceability.js` & `python3 scripts/audit_glossary_quality.py` スコア **100/100 PASS**。
   - **⑤ 統合全自動テストスイートゲート**: `npm test` による全テスト **100% PASS**。
3. **[Quality Gate 4 (AU 最終監査)]**: **AU (システム監査人)** が Gate 3 判定結果および全 DoD 項目の適合度・ドキュメントトレーサビリティを監査し、【適合 (PASS)】判定を記録する。

---

### Step 5: Issue クローズ & 全体管理 (PM) によるマージ統合
1. **全体管理 (PM)** の承認のもと、Issue を `Closed` へ更新し `issues/closed/` に移動。
2. `issues/README.md` の一覧を更新。
3. Git コミットし、`main` ブランチへマージして作業ブランチを削除する。

---

## 🎯 出力フォーマットテンプレート

```markdown
# 👂 全 13 エージェント聞き取り調査 & 最重要改善提案

## 1. フェーズ別エージェント責任体制 & Quality Gates
- **全体管理**: PM (`project-manager`)
- **企画・提案選定 [Quality Gate 1]**: ST (`information-technology-strategist`) & SM (突然変異的アプローチ & 5大影響アセスメント)
- **設計・実装 [Quality Gate 2]**: SA (`systems-architect`) + 指名スペシャリスト ([指名エージェント名])
- **品質管理・検証 [Quality Gate 3]**: QA & AU (`verify-quality-gates` スキル実行)
- **最終監査・承認 [Quality Gate 4]**: AU (`systems-auditor`) & PM

## 2. エージェントヒアリング結果一覧
- **ST**: ... (突然変異的・非連続な革新アイデア含む)
- **SA**: ...
- **SM**: (変更管理・サービス運用観点での影響・考慮事項)
- **IR**: (文字列データ圧縮 / 圧縮全文索引の検討結果)
- ... (全 13 エージェント)

## 3. 企画担当 (ST) 提案：最重要改善項目 (Quality Gate 1 通過)
### 提案タイトル: [改善項目名] (通常改善 / 突然変異革新案)
- **概要**: ...
- **SA 指名設計・実装スペシャリスト**: [指名エージェント名]

## 4. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)
1. **サービス運用・可用性影響**: ...
2. **アーキテクチャ・データ構造影響**: ...
3. **セキュリティ・ガバナンス影響**: ...
4. **品質・回帰テスト影響**: ...
5. **学習体験・UI/UX影響**: ...

## 5. `verify-quality-gates` 実行および AU 最終監査結果 (Quality Gate 3 & 4)
- **Closure Compiler 最厳格コンパイルゲート**: エラー 0 件 / 警告 0 件 (PASS)
- **相対パスリンクガバナンスゲート**: 絶対パス違反 0 件 (PASS)
- **循環的複雑度適合ゲート (ADR-02)**: 全関数 <= 10 (PASS)
- **ドキュメント・用語トレーサビリティゲート**: 100/100 適合 (PASS)
- **統合全自動テストスイートゲート (npm test)**: 100% PASS
- **AU 最終監査判定**: 【適合 (PASS)】
```
