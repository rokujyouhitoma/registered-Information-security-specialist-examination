# ITSS スキルレベル対応 学習到達度セルフチェック＆教育ガイド

本ドキュメントは、IPA「ITスキル標準 (ITSS V3 2011)」および情報処理安全確保支援士（SC）シラバスに基づき、エデュケーションスペシャリスト（EDU）とセキュリティスペシャリスト（SC）が共同作成した**学習到達度セルフチェック＆スキルアップ指導ガイド**です。

---

## 🎯 第1章: 分野別 ITSS レベル到達度セルフチェックマトリックス

以下の各分野のチェック項目に対し、自身の達成状況を確認することで、現在の ITSS レベル (Level 1〜4) をセルフ診断できます。

### 1.1 暗号・認証・PKI 分野

| レベル | チェック項目 | チェック |
| :---: | :--- | :---: |
| **Level 1** | 共通鍵暗号（AES等）と公開鍵暗号（RSA/ECC等）の基本的な役割の違いを説明できる。 | [ ] |
| **Level 2** | デジタル署名、ハッシュ関数（SHA-256）、および PKI（電子証明書/CA）の仕組みを理解している。 | [ ] |
| **Level 3** | TLS 1.3 / IPsec のハンドシェイク手順、暗号スイート選定、および多要素認証 (MFA) フローを設計できる。 | [ ] |
| **Level 4** | CRYPTREC 推奨暗号リストの選定基準に基づき、耐量子計算機暗号 (PQC) への移行計画や暗号プロトコルの脆弱性評価を単独で主導できる。 | [ ] |

---

### 1.2 Web・アプリケーションセキュリティ分野

| レベル | チェック項目 | チェック |
| :---: | :--- | :---: |
| **Level 1** | SQL インジェクション、XSS、CSRF の概要とリスクを理解している。 | [ ] |
| **Level 2** | 入力値のサニタイズ（エスケープ処理）、プレースホルダ利用、Cookie の `SameSite`/`HttpOnly` 属性の設定理由を説明できる。 | [ ] |
| **Level 3** | Content Security Policy (CSP)、CORS バウンダリ、OAuth 2.0 / OpenID Connect の認可・認証制御を正しく実装・評価できる。 | [ ] |
| **Level 4** | 複雑な Web アプリケーション全体のセキュリティバイデザイン、プロンプトインジェクション対策、SAST/DAST スキャン結果のトリアージを主導できる。 | [ ] |

---

### 1.3 ネットワーク・通信境界セキュリティ分野

| レベル | チェック項目 | チェック |
| :---: | :--- | :---: |
| **Level 1** | ファイアウォール (FW) や IP アドレス・ポート番号によるパケットフィルタの基本を理解している。 | [ ] |
| **Level 2** | IDS/IPS、WAF、VLAN 分離、およびプロキシサーバーの役割を説明できる。 | [ ] |
| **Level 3** | DMZ 構成、セグメンテーション、SWG、および DNS 偽装 (Cache Poisoning) 対策を設計・構築できる。 | [ ] |
| **Level 4** | NIST SP 800-207 準拠のゼロトラスト・アーキテクチャ (ZTA / SDP / EDR 連携) や通信境界の完全ローカル動作・厳格 CSP ポリシーを策定できる。 | [ ] |

---

### 1.4 ガバナンス・リスク管理・監査分野

| レベル | チェック項目 | チェック |
| :---: | :--- | :---: |
| **Level 1** | ISMS (JIS Q 27001) の PDCA サイクルと情報セキュリティ方針の目的を理解している。 | [ ] |
| **Level 2** | リスク対応の 4 区分（低減・回避・共有・保有）および BCP/RTO/RPO の基本概念を説明できる。 | [ ] |
| **Level 3** | 情報セキュリティリスクアセスメント（特定・分析・評価）、適用宣言書 (SoA) の選定理由作成、監査証拠の手配ができる。 | [ ] |
| **Level 4** | 組織全体のリスク管理体系策定、保証型/助言型セキュリティ監査の主導、および CSIRT / SOC インシデントエスカレーション基準を統括できる。 | [ ] |

---

## 🗺️ 第2章: セルフ診断結果に基づくステップアップ・ロードマップ

### 診断結果 A: チェック項目が Level 1〜2 中心の場合
- **おすすめ学習ステップ**:
  - `docs/syllabus_detail.md` でシラバス用語の基礎概念を理解。
  - `docs/glossary.md` で専門用語・略語の定義を固める。
- **推奨エージェント**: **EDU エージェント** ([`education-specialist.agent.md`](../.agents/agents/education-specialist.agent.md)) で基礎学習の個別指導を受ける。

### 診断結果 B: チェック項目が Level 3 中心の場合
- **おすすめ学習ステップ**:
  - `docs/scenarios/hands_on_incident_analysis.md` で実戦インシデント解析の長文問題演習。
  - `docs/syllabus_tsuiho_detail.md` で追補版 Ver.4.0 (クラウド、AIセキュリティ等) の最新知識を修得。
- **推奨エージェント**: **SC エージェント** ([`information-security-specialist.agent.md`](../.agents/agents/information-security-specialist.agent.md)) で科目B記述式の思考プロセス指導を受ける。

### 診断結果 C: チェック項目が Level 4 中心の場合
- **おすすめ学習ステップ**:
  - リポジトリのソースコード (`site/js/fm_index_engine.js` 等) に対するセキュリティスキャンやパフォーマンスリファクタリングの実戦演習。
- **推奨エージェント**: **SA エージェント** ([`systems-architect.agent.md`](../.agents/agents/systems-architect.agent.md)) や **IR エージェント** ([`it-specialist-information-retrieval.agent.md`](../.agents/agents/it-specialist-information-retrieval.agent.md)) と技術ディスカッションを行う。

---

## 🔗 関連演習・ドキュメント
- [科目B対応 ハンズオン・インシデント解析演習 (`docs/scenarios/hands_on_incident_analysis.md`)](scenarios/hands_on_incident_analysis.md)
- [ITSS エデュケーションガイド (`docs/itss_education.md`)](itss_education.md)
- [シラバス詳細 (`docs/syllabus_detail.md`)](syllabus_detail.md)
