---
ID: 019
種別: Feature
優先度: Medium
ステータス: Open (New)
---

# [FEAT/ENH] 用語辞書 (docs/glossary/*) における全専門用語の解説内容の拡充と重要用語 (ST/SA等) のページ分割体系化 (ID: 019)

## 1. 概要 / Summary
`docs/glossary/syllabus_ver2_1.md` および `docs/glossary/syllabus_tsuiho_ver4_0.md` に登録されている各専門用語において、概要レベルにとどまらず、試験対策・実務観点から十分な定義・仕組み・利用場面・技術仕様を含む詳細な解説内容を拡充する。
特に、セキュア技術 (ST) およびシステムアーキテクチャ (SA) に該当する重要・大規模キーワード（例: ゼロトラスト, TLS 1.3, PKI, OAuth/OIDC, DMARC, SAML等）については、1ページ分の解説量が見込まれるため、`docs/glossary/terms/<term_slug>.md` への個別詳細ページ分割アーキテクチャを設計・導入する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [docs/glossary/index.md](../docs/glossary/index.md)
  - [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
  - [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
  - [project-docs/writing_guide.md](../project-docs/writing_guide.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [ ] [docs/glossary/syllabus_ver2_1.md](../docs/glossary/syllabus_ver2_1.md)
- [ ] [docs/glossary/syllabus_tsuiho_ver4_0.md](../docs/glossary/syllabus_tsuiho_ver4_0.md)
- [ ] [docs/glossary/terms/*.md](../docs/glossary/terms/) (新規作成: 重要用語の個別詳細解説ページ)
- [ ] [references/nist_sp800_207_zero_trust_summary.md](../references/nist_sp800_207_zero_trust_summary.md) (新規追加: NIST SP 800-207 参考資料)
- [ ] [references/cryptrec_ciphers_list_2025.md](../references/cryptrec_ciphers_list_2025.md) (新規追加: CRYPTREC 暗号リスト参考資料)
- [ ] [references/README.md](../references/README.md) (一次情報カタログ更新)
- [ ] [mkdocs.yml](../mkdocs.yml) (ナビゲーション拡張)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/019-expand-glossary-detailed-explanations`

1. **重要用語 (ST / SA 重点分野等) の個別ページ分割方針**:
   - 1ページ分の詳細解説が必要な重要用語（ST: セキュリティ技術 / SA: アーキテクチャ関連）を定義。
   - `docs/glossary/terms/<term_slug>.md`（例: `terms/zero-trust.md`, `terms/tls1_3.md`, `terms/oauth2_oidc.md`）の個別の専用解説ドキュメントを配置。
   - 各シラバス用語辞書側には概要＋要約＋「📖 [個別詳細解説: 〇〇](terms/xxx.md)」のダイレクトリンクを設定。
2. **解説フォーマットの標準化 (テンプレート定義)**:
   - 概要（1行定義）
   - **詳細解説 (メカニズム・アーキテクチャ図解)**
   - **試験対策ポイント (科目A/科目B 出題傾向・引っ掛けパターン)**
   - **関連仕様・RFC / NISTガイドライン参照**
3. **段階的拡充 & 一次情報との整合性担保**:
   - IPA公式シラバス、NIST SP 800、CRYPTREC暗号リスト等の一次情報に基づく正確かつ体系的な解説を記述。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] 重要用語 (ST / SA 等) に関する個別解説ページ階層 (`docs/glossary/terms/*.md`) が設計・作成され、辞書からスムーズに個別ページへ遷移できること
- [ ] 用語辞書内の専門用語に具体的で分かりやすい詳細解説・要約が拡充されていること
- [ ] `python3 scripts/verify_glossary_coverage.py` および `python3 scripts/check_relative_paths.py` がエラーなし (Exit Code 0) で正常終了すること
