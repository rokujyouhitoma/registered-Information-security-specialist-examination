---
ID: 019
種別: Feature
優先度: Medium
ステータス: Closed
---

# [FEAT/ENH] 用語辞書 (docs/glossary/*) における全専門用語の解説内容の拡充と重要用語 (ST/SA等) のページ分割体系化 (ID: 019)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` に登録されている全 2,760 件の各専門用語において、概要レベルにとどまらず、試験対策・実務観点から十分な定義・仕組み・利用場面・技術仕様を含む詳細な解説内容を拡充する。
特に、セキュア技術 (ST) およびシステムアーキテクチャ (SA) に該当する重要・大規模キーワード（例: ゼロトラスト, TLS 1.3, PKI, OAuth/OIDC, DMARC, SAML 2.0, EDR/SIEM等）については、1ページ分の解説量が見込まれるため、`docs/glossary/terms/<term_slug>.md` への個別詳細ページ分割アーキテクチャを設計・導入する。

---

## 2. トレーサビリティ / Traceability
- **一次情報参照資料**:
  - [references/nist_sp800_207.pdf](../references/nist_sp800_207.pdf) (NIST SP 800-207 Zero Trust Architecture 原本)
  - [references/cryptrec_ciphers_list.pdf](../references/cryptrec_ciphers_list.pdf) (CRYPTREC 電子政府推奨暗号リスト 原本)
- **基盤ドキュメント**:
  - [docs/glossary/index.md](../docs/glossary/index.md)
  - [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
  - [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md) (概要＋要約＋詳細ページリンク化)
- [ ] [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md) (概要＋要約＋詳細ページリンク化)
- [ ] [docs/glossary/terms/*.md](../docs/glossary/terms/) (新規作成: 重要用語の個別詳細解説ページ群)
- [ ] [references/README.md](../references/README.md) (一次情報カタログ確認)
- [ ] [mkdocs.yml](../mkdocs.yml) (ナビゲーション拡張: 専門用語詳細ライブラリの追加)

---

## 4. 実装計画・ステップ / Detailed Implementation Plan
Target Branch: `feat/019-expand-glossary-detailed-explanations`

### Phase 1: 個別詳細解説アーキテクチャ (`docs/glossary/terms/*.md`) の基本構築
1. `docs/glossary/terms/` ディレクトリを作成。
2. ST (セキュリティ技術) / SA (アーキテクチャ) 分野の最重要キーワード（例: `zero-trust.md`, `tls1_3.md`, `pki-and-certificates.md`, `oauth2-oidc.md`, `dmarc-dkim-spf.md` 等）の深掘り個別解説ドキュメントを順次執筆。
3. テンプレート標準化:
   - 概要（1行定義）
   - **メカニズムとアーキテクチャ図解 (Mermaid / GitHub Alert 活用)**
   - **試験対策ポイント (科目A/科目B 出題パターン・選択肢の罠)**
   - **一次情報参照 (NIST SP 800-207 / CRYPTREC / RFC 規格番号)**

### Phase 2: 用語辞書ポータル (`syllabus_ver2_1.md`, `syllabus_tsuiho_ver4_0.md`) への統合
1. 各辞書項目に、要約された実践解説を登録。
2. 個別詳細ページが存在する用語には `📖 [詳細解説ドキュメントを見る](terms/<term_slug>.md)` へのダイレクト相対リンクを設定。

### Phase 3: 自動検証とドキュメント品質保証
1. `python3 scripts/verify_glossary_coverage.py` を実行し、全用語のカバレッジ 100% を維持していることを検証。
2. `python3 scripts/check_relative_paths.py` を実行し、新規個別ページおよびリンクの相対パス破綻 0 件を保証。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 重要用語 (ST / SA 等) に関する個別解説ページ階層 (`docs/glossary/terms/*.md`) が設計・作成され、辞書ポータルからシームレスにアクセスできること
- [ ] `docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` 内の専門用語に質度の高い詳細解説・要約が掲載されていること
- [ ] `python3 scripts/verify_glossary_coverage.py` および `python3 scripts/check_relative_paths.py` がエラーなし (Exit Code 0) で正常終了すること

