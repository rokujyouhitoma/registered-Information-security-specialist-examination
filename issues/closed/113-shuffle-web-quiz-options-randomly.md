# [BUG/UI] 実践演習クイズ (Web Quiz Portal) 選択肢順序のランダム化 (Fisher-Yates Shuffle) 実装 (ID: 113)

## メタデータ

- **ID**: 113
- **種別**: Bug / UI
- **優先度**: High
- **ステータス**: Open (In Progress)
- **担当スペシャリスト**: QA (`software-quality-assurance-specialist`) & UIUX (`ui-ux-designer`)
- **ターゲットブランチ**: `fix/113-shuffle-web-quiz-options-randomly`

---

## 1. 概要 / Summary

[Web 実践演習クイズポータル (`docs/quiz.md` / `site/quiz.html`)](docs/quiz.md) において、問題表示時に選択肢の順序がシャッフルされず静的配列のまま描画されているため、正解選択肢が常に 2 番目 (`answerIndex: 1`) に配置される現象が発生しています。選択肢配列を動的にランダムシャッフル (Fisher-Yates アルゴリズム) し、正解インデックスを追従マッピングするロジックを実装して正解位置をランダム化します。

---

## 2. 影響範囲と関連ファイル / Scope and Affected Files

1. **[MODIFY] `docs/quiz.md`**:
   - `renderQuestion()` 内で、各問題の選択肢オブジェクト配列を Fisher-Yates アルゴリズムにより動的にランダムシャッフルする処理を追加。
   - シャッフル後の正解インデックス (`shuffledCorrectIndex`) を保持し、`checkAnswer()` にて正誤判定。

---

## 3. 変更管理 (SM & SA) ：5 大変更影響アセスメント (Change Impact Assessment)

1. **① サービス運用・可用性影響**: 影響なし。表示時のフロントエンド選択肢シャッフル処理の追加のみ。
2. **② アーキテクチャ・データ構造影響**: 影響なし。`quiz_questions.json` データの元の構造・並び順は破壊せず、ビュー描画時のみ動的シャッフル。
3. **③ セキュリティ・ガバナンス影響**: XSS 防御、テキストエスケープおよび相対パスルールの継続適合。
4. **④ 品質・回帰テスト影響**: `make build` により `site/quiz.html` が正常同期され、`npm test` (`verify_build_integrity.js`) が 100% PASS。
5. **⑤ 学習体験・UI/UX影響**: 正解位置が毎回完全にランダム化（1〜4番目のどこにでも出題）され、受験者が位置暗記ではなく真の理解度で自己診断できる学習体験を実現。

---

## 4. 詳細実装方針 / Implementation Plan

1. **`docs/quiz.md` 内の JS ロジック改修**:
   - `currentShuffledOptions` および `shuffledAnswerIndex` 変数を定義。
   - `renderQuestion()` 実行時に、元の `options` 配列と `answerIndex` から選択肢オブジェクトのリスト `[{ text: opt, originalIdx: idx }]` を生成。
   - Fisher-Yates アルゴリズムで配列をシャッフルし、元の `answerIndex` と一致する要素の新インデックスを `shuffledAnswerIndex` に保存。
   - シャッフルされた選択肢でボタンを生成し、`checkAnswer(idx, btnEl)` では `shuffledAnswerIndex` と照合。
2. **ビルドおよび品質検証**:
   - `make build` で `site/quiz.html` を更新。
   - `verify-quality-gates` スキルを実行して 100% PASS を確認。

---

## 5. 完了条件 / Success Criteria (DoD)

- [x] `docs/quiz.md` 内で問題描画時に選択肢の並び順が動的にランダムシャッフルされること。
- [x] 選択肢の位置が変動しても、正解・不正解および解説 (`checkAnswer`) が正しくマッピング判定されること。
- [x] `make build` により `site/quiz.html` が正常生成・同期されること。
- [x] `verify-quality-gates` スキルを実行し、 Closure Compiler 0 エラー/警告、絶対パス 0 件、複雑度 <= 10、`npm test` 100% PASS を確認。
- [x] AU (システム監査人) による最終監査で【適合 (PASS)】判定を得ること。

---

## 6. 多段階エージェント再レビュー結果 (Review Gate 2 & 3)

- **[Review Gate 2: 設計レビュー] (SA, QA, UIUX)**: Fisher-Yates アルゴリズムによる完全ランダムシャッフルおよび解答状態マッピングの設計承認。
- **[Review Gate 3: AU 最終監査] (AU)**: 全 DoD 基準の検証を行い、適合判定【PASS】を付与。
