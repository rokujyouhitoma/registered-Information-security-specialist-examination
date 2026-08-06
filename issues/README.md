# Issue 台帳 (Issue Ledger)

本ディレクトリは、課題、新機能要求、リファクタリング、バグ修正などの Issue 管理用ディレクトリです。

---

## 1. アクティブ Issue 一覧

| ID | 種別 | タイトル | 担当 / ステータス | 課題ファイル |
|---|---|---|---|---|
| 057 | Feature | [ITSS スキルレベル対応 学習到達度セルフチェック＆教育ガイドの作成](057-create-itss-self-assessment-guide.md) | EDU / Open (In Progress) | [057-create-itss-self-assessment-guide.md](057-create-itss-self-assessment-guide.md) |
| 056 | Feature | [科目B対応 ハンズオン・インシデント解析実践演習シナリオ集の作成](056-create-subject-b-incident-analysis-scenarios.md) | SC / Open (In Progress) | [056-create-subject-b-incident-analysis-scenarios.md](056-create-subject-b-incident-analysis-scenarios.md) |
| 055 | Feature | [エデュケーション（ITSS教育スペシャリスト / EDU）エージェントの作成および品質検証](055-create-education-specialist-agent.md) | ST / Open (In Progress) | [055-create-education-specialist-agent.md](055-create-education-specialist-agent.md) |
| 054 | Performance | [転置インデックス (Inverted Index) 構造の導入とトークナイザ最適化](054-implement-inverted-index-and-tokenizer-opt.md) | SA / Open (In Progress) | [054-implement-inverted-index-and-tokenizer-opt.md](054-implement-inverted-index-and-tokenizer-opt.md) |
| 053 | Feature | [BM25 スコアリングアルゴリズムの導入およびプロトタイプ汚染防御](053-implement-bm25-scoring-and-sec-hardening.md) | SA / Open (In Progress) | [053-implement-bm25-scoring-and-sec-hardening.md](053-implement-bm25-scoring-and-sec-hardening.md) |
| 052 | Feature | [ITスペシャリスト（情報検索 / IR）エージェントの作成および品質検証](052-create-it-specialist-ir-agent.md) | ST / Open (In Progress) | [052-create-it-specialist-ir-agent.md](052-create-it-specialist-ir-agent.md) |
| 051 | Feature | [PWA (Progressive Web App) 対応・Service Worker による全オフライン学習環境の構築](051-st-pwa-service-worker.md) | ST / Open (In Progress) | [051-st-pwa-service-worker.md](051-st-pwa-service-worker.md) |
| 050 | Feature | [検索ポータルおよびトップページへのキーボードショートカット機能の導入](050-ux-keyboard-shortcuts.md) | UX / Open (In Progress) | [050-ux-keyboard-shortcuts.md](050-ux-keyboard-shortcuts.md) |
| 049 | Performance | [検索インデックスデータ構造の最適化・軽量化](049-perf-compress-search-index.md) | IR / Open (In Progress) | [049-perf-compress-search-index.md](049-perf-compress-search-index.md) |
| 048 | Security | [XSS 防止 Safe DOM レンダリング・Strict CSP 設定および入力値サニタイズ](048-sec-xss-safe-dom-csp.md) | SC / Open (In Progress) | [048-sec-xss-safe-dom-csp.md](048-sec-xss-safe-dom-csp.md) |
| 047 | Refactor | [リポジトリ名の小文字表記 (registered-information-security-specialist-examination) への統一更新](047-update-repo-name-lowercase.md) | PM / Open (In Progress) | [047-update-repo-name-lowercase.md](047-update-repo-name-lowercase.md) |
| 046 | Bug | [日本語検索クエリで検索結果が 0 件になるトークナイザーの正規表現・N-gramバグの修正](046-fix-japanese-query-tokenizer.md) | IR / Open (In Progress) | [046-fix-japanese-query-tokenizer.md](046-fix-japanese-query-tokenizer.md) |
| 045 | Bug | [docs/ 配下の Markdown ドキュメントが HTML 変換されず 404 になる問題の修正](045-build-html-docs-for-github-pages.md) | SA / Open (In Progress) | [045-build-html-docs-for-github-pages.md](045-build-html-docs-for-github-pages.md) |
| 044 | Feature | [トップページ (site/index.html) の総合学習ドキュメントインデックスポータル化](044-redesign-top-index-portal.md) | UX / Open (In Progress) | [044-redesign-top-index-portal.md](044-redesign-top-index-portal.md) |
| 043 | Bug | [site/index.html での JS モジュール読み込み 404 エラーおよび相関パス構造の修正](043-fix-site-js-relative-path-404.md) | SA / Open (In Progress) | [043-fix-site-js-relative-path-404.md](043-fix-site-js-relative-path-404.md) |
| 042 | Bug | [CI パイプラインでの package-lock.json 未検出エラーおよび Node.js バージョンの修正](042-fix-ci-package-lock-node-version.md) | QA / Open (In Progress) | [042-fix-ci-package-lock-node-version.md](042-fix-ci-package-lock-node-version.md) |
| 041 | Docs | [README.md および開発ドキュメントの完全リニューアル (Phase 16)](041-update-readme-documentation.md) | PM / Open (In Progress) | [041-update-readme-documentation.md](041-update-readme-documentation.md) |
| 040 | Tooling | [トレーサビリティ自動検証スクリプトの追加 (Phase 15)](040-verify-traceability-script.md) | QA / Open (In Progress) | [040-verify-traceability-script.md](040-verify-traceability-script.md) |
| 039 | Refactor | [JS コードの厳格モジュール化と JSDoc 型定義強化 (Phase 14)](039-refactor-js-modules-jsdoc.md) | SA / Open (In Progress) | [039-refactor-js-modules-jsdoc.md](039-refactor-js-modules-jsdoc.md) |
| 038 | Feature | [JavaScript ユニットテスト自動化 (Phase 13)](038-js-unit-testing.md) | QA / Open (In Progress) | [038-js-unit-testing.md](038-js-unit-testing.md) |

---

## 2. 完了済み Issue 一覧

| ID | 種別 | タイトル | 完了日 | 完了コミット / PR |
|---|---|---|---|---|
| 037 | Feature | [Closure Compiler の CI/CD 自動化パイプライン構築および compiled.html の導入](closed/037-setup-cicd-closure-compiler-compiled-html.md) | 2026-08-05 | [037-setup-cicd-closure-compiler-compiled-html.md](closed/037-setup-cicd-closure-compiler-compiled-html.md) |
| 036 | Feature | [Closure Compiler の導入と JS コンパイル設定](closed/036-integrate-closure-compiler.md) | 2026-08-05 | [036-integrate-closure-compiler.md](closed/036-integrate-closure-compiler.md) |
| 035 | Feature | [フルスクラッチ FM-index & ベクター全文検索エンジンの開発 (Phase 12)](closed/035-build-custom-fm-index-search-engine.md) | 2026-08-05 | [035-build-custom-fm-index-search-engine.md](closed/035-build-custom-fm-index-search-engine.md) |
| 034 | Feature | [サイバー攻撃シナリオ・ログ分析ハンズオンケーススタディの作成 (Phase 11)](closed/034-create-attack-scenarios-analysis.md) | 2026-08-05 | [034-create-attack-scenarios-analysis.md](closed/034-create-attack-scenarios-analysis.md) |
| 033 | Feature | [CLI対話型 理解度自己診断クイズツールの構築 (Phase 10)](closed/033-create-cli-quiz-runner.md) | 2026-08-05 | [033-create-cli-quiz-runner.md](closed/033-create-cli-quiz-runner.md) |
| 032 | Feature | [科目B (長文記述式) 解法思考プロセスガイドの整備 (Phase 9)](closed/032-create-subject-b-reasoning-guide.md) | 2026-08-05 | [032-create-subject-b-reasoning-guide.md](closed/032-create-subject-b-reasoning-guide.md) |
| 031 | Tooling | [監査スクリプト Ver.4.0 (具体解像度判定エンジン) の導入 (Phase 8)](closed/031-upgrade-audit-script-specificity.md) | 2026-08-05 | [031-upgrade-audit-script-specificity.md](closed/031-upgrade-audit-script-specificity.md) |
| 030 | Feature | [重要プロトコル・認証フローのMermaid図解化 (Phase 7)](closed/030-add-mermaid-diagrams-key-protocols.md) | 2026-08-05 | [030-add-mermaid-diagrams-key-protocols.md](closed/030-add-mermaid-diagrams-key-protocols.md) |
| 029 | Feature | [過去問データベースとの双方向ハイパーリンク網構築 (Phase 6)](closed/029-build-exam-db-hyperlink-network.md) | 2026-08-05 | [029-build-exam-db-hyperlink-network.md](closed/029-build-exam-db-hyperlink-network.md) |
| 028 | Feature | [用語解説の個別具体化・ディープリファイン (Phase 5-3: ガバナンス・リスク・監査分野)](closed/028-deep-enrichment-gov-risk-audit.md) | 2026-08-05 | [028-deep-enrichment-gov-risk-audit.md](closed/028-deep-enrichment-gov-risk-audit.md) |
