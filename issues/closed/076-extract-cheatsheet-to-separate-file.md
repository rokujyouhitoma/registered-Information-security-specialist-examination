---
ID: 076
種別: Refactor
優先度: High
ステータス: Closed
---

# [REFACTOR] exam_overview.md の純粋IPA公式化および exam_cheatsheet.md への科目Bキーフレーズ集独立分離 (ID: 076)

## 1. 概要 / Summary
`docs/exam_overview.md` を IPA 公式発表原文のみを収録する純粋な資料として保全し、追記セクションであった「科目B 記述直前キーフレーズ集 & チェックリスト」を独立した専用ファイル `docs/exam_cheatsheet.md` に分離・新規構築した。また、`mkdocs.yml` のナビゲーションおよび各関連ドキュメントからの相互導線を整備した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [docs/exam_overview.md](../docs/exam_overview.md)
- 関連資料: [docs/exam_cheatsheet.md](../docs/exam_cheatsheet.md) [NEW]
- 関連資料: [mkdocs.yml](../mkdocs.yml)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/exam_overview.md](../docs/exam_overview.md)
- [x] [docs/exam_cheatsheet.md](../docs/exam_cheatsheet.md) [NEW]
- [x] [mkdocs.yml](../mkdocs.yml)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `refactor/076-extract-cheatsheet-to-separate-file`

1. **`docs/exam_overview.md` の完全純正化**:
   - 追記セクションを削除し、純度 100% の IPA 公式テキストに戻す。

2. **`docs/exam_cheatsheet.md` の新設**:
   - 全 13 専門領域の「科目 B 記述 30〜50 字模範解答構文（キーフレーズ集）」および「直前 1 週間チェックリスト」をスタイリッシュな UIUX デザインで構築。

3. **`mkdocs.yml` および相互リンクの更新 (UIUX)**:
   - ナビゲーションの「試験対策ガイド」配下に `⚡ 試験直前対策 虎の巻: exam_cheatsheet.md` を追加。

4. **全自動ビルド・検証**:
   - `npm run build && npm test` の実行。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/exam_overview.md` が 100% IPA 公式発表テキストのみで構成されていること
- [x] `docs/exam_cheatsheet.md` が新設され、直前キーフレーズ集・チェックリストが独立閲覧できること
- [x] `mkdocs.yml` に `exam_cheatsheet.md` が追加されていること
- [x] `npm run build && npm test` が全件合格すること
