---
name: verify-quality-gates
description: リポジトリ全体の全品質管理ゲート (Quality Gates) を一括自動検証するプロシージャスキル。Closure Compiler 最厳格コンパイル (エラー・警告 0件)、絶対パスリンク排除 (0件検出)、循環的複雑度 (<=10)、トレーサビリティ、および全自動テストスイートの 100% PASS を保証する。
---
# verify-quality-gates

本スキルは、`registered-Information-security-specialist-examination` リポジトリにおける最高水準の品質・セキュリティ・保守性を担保するため、すべての変更・リリース前に必ず実行し完全合格（全 PASS）を検証する統合品質管理ゲートプロシージャです。

---

## 🛡️ 統合品質管理ゲート一覧 (Quality Gate Criteria)

以下の 5 つの品質ゲートをすべて順次実行し、**すべてエラー・警告・違反が 0 件** であることを厳格にアサートします。

```
[Quality Gate 1] 企画・変更影響アセスメント (SM & SA 5大観点アセスメント)
       ↓
[Quality Gate 2] 多段階設計・JSDoc 型アノテーション & パス設計レビュー
       ↓
[Quality Gate 3] 全自動品質検証・ビルド・ガバナンス一括実行ゲート (verify-quality-gates)
  ├── 1. Closure Compiler 最厳格コンパイル (エラー・警告: 0件)
  ├── 2. 相対パスリンクガバナンス (絶対パス違反: 0件)
  ├── 3. 循環的複雑度検証 (ADR-02: 全関数 <= 10)
  ├── 4. ドキュメント・用語トレーサビリティ & 品質監査 (100/100 PASS)
  └── 5. 統合全自動テストスイート (npm test: 100% PASS)
       ↓
[Quality Gate 4] AU (システム監査人) 最終適合監査 & PM マージ統合承認
```

---

## 📋 実行・検証チェックリスト (Instructions)

### Gate 3-1: Closure Compiler 最厳格コンパイルゲート
- **実行コマンド**: `make build` (または `npm run build:js`)
- **判定基準**:
  - `ADVANCED_OPTIMIZATIONS` かつ `--jscomp_error=*` 設定において、コンパイルエラーおよび警告が **完全 0 件** であること。
  - 成果物 `site/fm_index_engine.min.js` が生成・配置されること。

### Gate 3-2: 相対パスリンクガバナンスゲート
- **実行コマンド**: `python3 scripts/check_relative_paths.py`
- **判定基準**:
  - リポジトリ内全 Markdown ファイル (`docs/`, `project-docs/`, `issues/`, `references/`, `.agents/`) において、実効絶対パスリンク (`file:///...`, `/workspace/...`) の違反件数が **完全 0 件** であること（Exit Code 0）。

### Gate 3-3: 循環的複雑度適合ゲート (ADR-02)
- **実行コマンド**: `python3 scripts/verify_cyclomatic_complexity.py`
- **判定基準**:
  - 全 JavaScript モジュール内のすべての関数において、循環的複雑度が閾値 **10 以下 (<= 10)** であること。

### Gate 3-4: トレーサビリティ & 用語品質判定ゲート
- **実行コマンド**: `node scripts/verify_traceability.js` および `python3 scripts/audit_glossary_quality.py`
- **判定基準**:
  - IPA シラバス用語と実装ドキュメント間の相互リンクが 100% 確保され、品質監査スコアが **100/100 (適合: PASS)** であること。

### Gate 3-5: 統合全自動テストスイートゲート
- **実行コマンド**: `npm test`
- **判定基準**:
  - ユニットテスト、シーケンス図トランスパイラ、クイズエンジン、FM-Index 検索 CLI、および `verify_build_integrity.js` が **100% PASS** すること。

---

## 🎯 検証結果出力ルール

全ゲートの検証結果をスクリプト実行ログとともに確認し、すべての判定が PASS である場合のみ AU (システム監査人) 最終監査へ移行します。1 件でも違反・エラーが発生した場合は即座に作業を修正・再実行します。
