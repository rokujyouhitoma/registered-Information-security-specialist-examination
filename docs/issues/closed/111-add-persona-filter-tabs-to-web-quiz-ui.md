# [FEAT/UIUX] REQ-02 ユーザーペルソナ別出題フィルタータブ (Persona Filter Tabs) の Web クイズ UI への動的実装 (ID: 111)

## メタデータ

- **ID**: 111
- **種別**: Feature / UI/UX
- **優先度**: High
- **ステータス**: Closed
- **担当スペシャリスト**: UIUX (`ui-ux-designer`) & EDU (`education-specialist`)
- **ターゲットブランチ**: `feat/111-add-persona-filter-tabs-to-web-quiz-ui`

---

## 1. 概要 / Summary

[REQ-02 ユーザー提供価値・ペルソナ・シナリオ詳細定義書](../project-docs/requirements/REQ-02-user_personas_and_scenarios.md) で定義された 4 大ユーザーペルソナ（① 受験者、② 有資格者、③ Web開発者、④ CSIRT/SOC）がブラウザ上で目的別クイズ演習を即座に開始できるよう、`docs/quiz.md` (Web UI 版クイズポータル) に動的ペルソナ出題フィルタータブ (Persona Filter Tabs) を実装・統合します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/quiz.md`**:
   - クイズカード上部に 5 つのフィルタータブ (全問, Persona 1, Persona 2, Persona 3, Persona 4) を追加。
   - `filterPersona(personaKey)` JS ロジックの実装（タブ切り替え、該当ペルソナ問題抽出、表示更新）。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。デフォルトは「全問表示」のため、既存の全問題演習機能は 100% 保持される。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`quiz_questions.json` の `persona` タグを活用した安全なクライアントサイドフィルタリング。
3. **③ セキュリティ・ガバナンス影響**: XSS の完全防止、相対パス表記ルールの継続遵守。
4. **④ 品質・回帰テスト影響**: `make build` および `npm test` (`verify_build_integrity.js`) が 100% PASS することを確認。
5. **⑤ 学習体験・UI/UX影響**: モダンなグラスモフィズムタブ UI により、受信者が自身の目的に特化した演習モードを 1 タップで切り替え可能に。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] `docs/quiz.md` に 4 大ペルソナ対応の出題フィルタータブがレスポンシブデザインで配置されていること。
- [x] 各タブをクリックした際に該当ペルソナの問題のみがフィルタリング・表示更新されること。
- [x] `make build` を実行し、`site/quiz.html` が正常に生成・同期されること。
- [x] `verify-quality-gates` スキルを実行し、Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 5. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, UIUX, EDU)**: レスポンシブタブデザイン、カラーコントラスト、およびクイズ状態リセットロジックの設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
