# [FEAT/CHEATSHEET] 虎の巻 (exam_cheatsheet.html) への「直前総復習ワンタップブックマーク機能」の実装 (ID: 123)

## メタデータ

- **ID**: 123
- **種別**: Feature / Cheatsheet / UIUX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: SA (`systems-architect`) & UIUX (`ui-ux-designer`)
- **ターゲットブランチ**: `feat/123-add-one-tap-bookmark-feature-to-exam-cheatsheet`

---

## 1. 概要 / Summary

[REQ-02 ペルソナ 4（鈴木 大介：試験直前受検者）](project-docs/requirements/REQ-02-user_personas_and_scenarios.md) の試験直前における超高速な苦手項目総復習体験を実現するため、[試験直前虎の巻 (`docs/exam_cheatsheet.md`)](docs/exam_cheatsheet.md) の各重要知識カードおよび暗記項目に「⭐ ワンタップブックマーク」ボタンと「⭐ ブックマーク済み項目のみフィルター表示」トグルを追加します。

ローカルストレージ (`localStorage`) とリアルタイム同期し、オフライン（PWA環境）でも受検直前に自分の苦手な要点だけを1タップで抽出・復習できる圧倒的価値を提供します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/exam_cheatsheet.md`**:
   - ブックマークトグルバー UI、星印インタラクティブボタン、フィルター切り替えロジックを追加。
2. **[REGENERATE] `site/exam_cheatsheet.html`**:
   - `make build` により再生成。

---

## 3. 完了条件 / Success Criteria (DoD)

- [x] 虎の巻の各カードに ⭐ ブックマーク切替ボタンが配置され、クリックでON/OFFが切り替わること。
- [x] 「⭐ ブックマークのみ表示」フィルターが正常に機能し、選択したカードのみに絞り込めること。
- [x] `localStorage` に状態が永続化され、再読み込み後もブックマークが保持されること。
- [x] `make build` により `site/exam_cheatsheet.html` が正常更新されること。
- [x] `verify-quality-gates` スキルを実行し、全テスト 100% PASS を確認。
- [x] AU による最終判定で【適合 (PASS)】を得ること。
