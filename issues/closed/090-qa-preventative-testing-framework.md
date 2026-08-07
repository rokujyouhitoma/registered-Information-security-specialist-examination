# [#090] [QA/ENH] 障害再発防止のための統合 QA 自動検証テストフレームワークの構築

## 1. 概要 (Overview)
本イシューは、直近のビルド・デプロイ・検索エンジン運用で発生した一連の障害（HTML Markdown解釈崩れ、デプロイアセット404、JS型不一致 `vectors.forEach` 例外）に対し、品質保証（QA）スペシャリストとして全自動再発防止メカニズムおよび包括的テストケース群を構築・導入するものである。

---

## 2. 背景と目的 (Background & Objective)
- **背景**:
  1. `docs/search.md` の複数行 HTML タグにより Markdown パーサーが属性文字列をプレーンテキスト化する事象が発生した。
  2. GitHub Actions デプロイ順序の逆転により、MkDocs ビルドが `site/` 内のアセットデータを消去する事故が発生した。
  3. `search_index.json` の `vectors` 型（Array / Object）の差異により `TypeError: this.vectors.forEach is not a function` が発生した。
- **目的**:
  - 全 HTML 成果物の構文完全性・生の属性テキスト混入ゼロを自動検出する検証スクリプトを作成する。
  - `site/` 出力アセットの完全性（全サブディレクトリでの `data/` および `js/` 配備状態）を検証する E2E アセットチェッカーを構築する。
  - 検索エンジンの型堅牢性（境界値・破損データ・各種型）に対するユニットテストを大幅拡張する。
  - CI / CD パイプラインに QA 検証ステップを常駐化させ、品質退行（Regression）を 100% 阻止する。

---

## 3. 担当エージェントと役割 (Agents & Roles)
- **QA (`software-quality-assurance-specialist`)**: 統合QAテストフレームワーク設計・自動テスト実装・CI統合 [ステータス: Closed]
- **SA (`systems-architect`)**: ビルド整合性およびアセット配置構造のアーキテクチャ検証
- **AU (`systems-auditor`)**: 監査アサーションおよび回帰リスクの全数確認

---

## 4. 実装計画・ターゲットファイル (Implementation Plan)
1. **[NEW] [scripts/verify_build_integrity.js](file:///workspace/registered-Information-security-specialist-examination/scripts/verify_build_integrity.js)**
   - 生成された `site/` 内の全 `.html` ファイルを巡回し、`<p>` タグ内に `style=` や `onfocus=` などの HTML 生属性テキストが露出していないか構文チェック。
   - `site/`, `site/search/`, `site/quiz/` 等の全主要パスに `data/quiz_questions.json` や `js/*.js` が 100% 配置されているかアセット網羅率チェック。
2. **[MODIFY] [tests/unit/search_engine.test.js](file:///workspace/registered-Information-security-specialist-examination/tests/unit/search_engine.test.js)**
   - `vectors` が `null`, `undefined`, 空オブジェクト `{}` , 空配列 `[]` , 異常値の場合の耐久性テストケースを追加。
3. **[MODIFY] [package.json](file:///workspace/registered-Information-security-specialist-examination/package.json)**
   - `npm test` に `npm run test:build-integrity` を組み込み。
4. **[MODIFY] [.github/workflows/ci.yml](file:///workspace/registered-Information-security-specialist-examination/.github/workflows/ci.yml)**
   - CI ステップに QA 自動アセット・HTML 完全性検証を追加。

---

## 5. 完了定義 (Definition of Done: DoD)
- [x] HTML 生露出チェック・アセット完全性チェックを行う自動スクリプト `scripts/verify_build_integrity.js` が作成されていること。
- [x] `CustomSearchEngine` に対する境界値・異型 `vectors` 耐久テストが全件グリーンであること。
- [x] `npm test` で全 QA 検証スクリプトが 100% 成功すること。
- [x] CI パイプラインに組み込まれていること。
