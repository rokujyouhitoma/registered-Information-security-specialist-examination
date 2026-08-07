---
ID: 100
種別: Bug
優先度: High
ステータス: Open (In Progress)
---

# [FIX] シーケンス図における参加者ノード幅の動的自動補正と長文字列はみ出し不具合の解消 (ID: 100)

## 1. 概要 / Summary
「Active Directory Domain Controller」などの長文字列の参加者名が表示された際、ノード幅（角丸長方形）が固定幅 `150px` に固定されていたため、テキストが枠外へ突出・はみ出してしまう描画不具合を解消する。
ラベル文字列の視覚長（英数字・全角文字の混在幅）に応じて、ノードボックス幅 (`boxWidth`) および列間隔 (`colWidth`) を動的に自動選定・伸縮するレスポンシブ幾何計算ルールを導入する。

---

## 2. トレーサビリティ / Traceability
- ユーザー報告: 添付画像における「Active Directory Domain Controller」のノード枠はみ出し
- UI/UX デザイナー (UIUX) ガイドライン: 自動可変ノードサイズ & WCAG 可読性保証
- [ADR-02](../../docs/adr/ADR-02-cyclomatic-complexity-threshold.md) (循環的複雑度 10 以下)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [scripts/sequence_diagram_parser.py](../scripts/sequence_diagram_parser.py) [MODIFY]
- [ ] [src/js/sequence_diagram/sequence_svg_renderer.js](../src/js/sequence_diagram/sequence_svg_renderer.js) [MODIFY]
- [ ] [tests/unit/sequence_renderer.test.js](../tests/unit/sequence_renderer.test.js)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `fix/100-dynamic-node-width-sequence-diagram`

1. **文字長に基づく動的ノード幅算出ロジック**:
   - 英数字 (`[a-zA-Z0-9_ -]`) は 1 文字につき `7.5px`、全角/日本語文字は 1 文字につき `13px` としてテキスト幅 $W_{text}$ を動的試算。
   - `boxWidth = Math.max(140, Math.ceil(textWidth + 30))`
   - `colWidth = Math.max(200, Math.ceil(maxBoxWidth + 40))`
2. **SVG レンダリングエンジンへの組み込み**:
   - `sequence_svg_renderer.js` および `sequence_diagram_parser.py` の全幾何計算（$X$ 座標マップ、全幅 `totalWidth`）に反映。
3. **アサーションと自動テスト**:
   - 長文字列ノードに対する枠収まりアサーションテストを追加。
   - `npm run build && npm test` を通じてビルド完全性を検証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 「Active Directory Domain Controller」等の長文字列参加者名が、枠内に完璧かつ美しく収まること。
- [ ] 全てのシーケンス図においてノード枠および列間隔が可変長で綺麗にレイアウトされること。
- [ ] 循環的複雑度上限 (10 以下: ADR-02) を全関数でクリアすること。
- [ ] `npm run build && npm test` が 100% PASS すること。
