---
ID: 075
種別: Refactor
優先度: High
ステータス: Closed
---

# [DOCS/IPA] exam_overview.md の IPA 公式原文の完全復元および追記形式への構成変更 (ID: 075)

## 1. 概要 / Summary
[docs/exam_overview.md](../docs/exam_overview.md) は IPA 公式の試験概要ページの内容をそのまま記録している重要資料であるため、改変・要約された箇所を元の IPA 公式原文に完全復元した。直前キーフレーズ集やチェックリスト等の追加情報は、公式原文を一切改変しない「追記セクション」として下部に安全に配置した。

---

## 2. トレーサビリティ / Traceability
- 関連資料: [docs/exam_overview.md](../docs/exam_overview.md)
- 参照元: [IPA 情報処理安全確保支援士試験 概要ページ](https://www.ipa.go.jp/shiken/kubun/sc.html)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/exam_overview.md](../docs/exam_overview.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `docs/075-restore-ipa-official-exam-overview-text`

1. **IPA 公式原文の完全復元**:
   - 基本情報、1. 対象者像、2. 業務と役割、3. 期待する技術水準、4. 試験時間・出題形式・出題数（解答数）の全セクションを1文字の齟齬なく復元。

2. **追記形式へのセクション分離**:
   - 公式原文の末尾に `## 5. 【追記】 科目B 記述直前キーフレーズ集 & チェックリスト` を追記形式で追加。

3. **自動テストとビルド検証**:
   - `npm run build && npm test` による検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [x] `docs/exam_overview.md` の前半が IPA 公式原文と完全に一致していること
- [x] 直前キーフレーズ集およびチェックリストが追記形式で正しく配置されていること
- [x] `npm run build && npm test` が全件合格すること
