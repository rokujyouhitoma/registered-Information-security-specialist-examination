# [DOCS/EDU] REQ-02 Persona 1・2 連動 科目B午後記述模範解答の文字数制限適合 (30〜50字) 表記精緻化と試験直前対策虎の巻の採点品質向上 (ID: 112)

## メタデータ

- **ID**: 112
- **種別**: Documentation / Education
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: EDU (`education-specialist`) & AU (`systems-auditor`)
- **ターゲットブランチ**: `docs/112-add-character-count-badges-and-copy-buttons`

---

## 1. 概要 / Summary

[REQ-02 ユーザー提供価値・ペルソナ・シナリオ詳細定義書](../project-docs/requirements/REQ-02-user_personas_and_scenarios.md) の Persona 1（鈴木翔太：午後記述対策）および Persona 2（田中雅人：有資格者）の要件を直接満たすため、`docs/exam_cheatsheet.md` (試験直前対策 虎の巻) における科目 B 記述キーフレーズの文字数表記・採点基準適合を精緻化し、IPA 公式の制限文字数（30文字〜50文字以内）に対する適合度と解法ロジックを強化します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/exam_cheatsheet.md`**:
   - 分野別記述キーフレーズの正確な文字数バッジ表記（例: `[42字 - 採点適合]`）および「〜のため。」「〜を防ぐため。」の末尾表現の一致。
   - 解法ロジックおよび文字数調整ガイドの追加。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。Markdown ドキュメントの表現精緻化。
2. **② アーキテクチャ・データ構造影響**: 影響なし。システム構造に影響しない安全なテキスト改善。
3. **③ セキュリティ・ガバナンス影響**: 一次情報（IPA 公式採点基準）との適合性確保、絶対パスリンク排斥ルールの遵守。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`audit_glossary_quality.py`, `check_relative_paths.py`) 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: 受験者が実際の試験で問われる文字数制限（30字〜50字）をリアルに意識しながら速習でき、解答作成精度が向上。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] `docs/exam_cheatsheet.md` 内の全記述キーフレーズに正確な文字数バッジと採点適合表記が明記されていること。
- [x] `make build` を実行し、`site/exam_cheatsheet.html` が正常に更新・出力されること。
- [x] `python3 scripts/check_relative_paths.py` により絶対パス違反が 0 件であることを確認。
- [x] `verify-quality-gates` スキルを実行し、全テストおよび品質監査が 100% PASS すること。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 5. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, EDU, AU)**: IPA 採点規準（文字数上限・語尾統一）に対するキーフレーズの適合度設計を承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
