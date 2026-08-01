---
ID: 011
種別: Documentation
優先度: Low
ステータス: Closed
---

# [FEAT/ENH] 一次情報 (references/*) および検証スクリプトの管理規約策定 (ID: 011)

## 1. 概要 / Summary
IPA公式PDFなどの一次情報（`references/`）の保管・命名規則を定め、データ抽出用の中間テキストファイルや一時検証スクリプトの整理ルール（`scratch/` のクリア規約および `.gitignore`）を策定する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目7)
  - [references/README.md](../references/README.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [references/README.md](../references/README.md)
- [x] `.gitignore`
- [x] リポジトリルートのクリーンアップ (`convert.log` 削除)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/011-reference-data-asset-management-rules`

1. **`references/README.md` の改訂・強化**:
   - **保管対象基準**: IPA公式PDF（シラバス、追補版、過去問題冊子・解答例・採点講評）、ITSS V3 2011、NIST SP 800、CRYPTREC暗号リスト等の公式一次情報に限定。
   - **命名規約 (Naming Conventions)**:
     - シラバス: `syllabus_<shiken>_ver<major>_<minor>.pdf`
     - ITSS: `itss_v3_2011_<scope>_<type>.pdf`
     - 過去問: `references/past_exams/<year>_<haru|aki>/` 配下の標準名 (`question_am1.pdf`, `answer_am2.pdf`, `comment.pdf` 等)
     - OKF構造化ドキュメント: `references/okf/` 配下の対応パス
   - **著作権・引用注記 (Copyright & Citation Notes)**:
     - IPA等の原典表示、適切な引用範囲の維持、相対パス参照の原則。
   - **一時データ・スクラッチ管理規約**:
     - 中間スクリプトや一時テキストは `scratch/` または artifacts 内で限定利用し、コミット非対象とする運用規則。

2. **`.gitignore` の更新と不要ファイルクリーンアップ**:
   - `.gitignore` に `*.log` を追加。
   - ルートに存在する `convert.log` を削除。

3. **検証と Git ワークフロー**:
   - `python3 scripts/check_relative_paths.py` を実行して相対パス健全性を確認。
   - Issue 011 を `Closed` に更新して `issues/closed/` に移動し `issues/README.md` を更新。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `references/README.md` が拡張・改訂され、保管規約・命名規則・著作権注記が明記されていること
- [x] `.gitignore` に一時ファイル・ログデータ (`*.log`) の除外設定が追記されていること
- [x] リポジトリ直下に不要な一時生成スクリプト・ログファイルが残存していないこと
