# IPA 情報処理安全確保支援士 シラバス Ver.2.1 必須知識リファレンス

本リファレンスは、`.agents/skills/quiz-generator` スキルが新問題・演習問題を自動作成・検証する際に参照する標準一次情報要約です。

---

## 1. 科目A/B 重点分野と必須技術用語

### 分野 1: 認証・暗号技術 (Cryptography & Authentication)
- **TLS 1.3**: Handshake RTT 削減、RSA/CBC/RC4 の廃止、Diffie-Hellman (PFS) 強制。
- **PKI (公開鍵基盤)**: CA, CRL, OCSP, CSR, SHA-256 with RSA/ECDSA。
- **OAuth 2.0 / OIDC**: Access Token, ID Token, Authorization Code Grant, PKCE (Proof Key for Code Exchange)。

### 分野 2: ネットワークセキュリティ & ドメイン認証 (Network Security)
- **メール送信ドメイン認証**: SPF (IP検証), DKIM (電子署名検証), DMARC (ポリシ定義 & 統計レポート)。
- **Zero Trust Architecture (ZTA)**: NIST SP 800-207 準拠。PDP (Policy Decision Point) / PEP (Policy Enforcement Point)。

### 分野 3: Webセキュリティ & 組織ガバナンス (Web & Governance)
- **Web 脆弱性対策**: Parameterized Query (バインド機構による SQLi 防御), CSP (Content Security Policy), SameSite Cookie。
- **クラウド & 組織管理**: CASB, CSPM, ISMS 2022 (ISO/IEC 27001:2022 5.7 脅威インテリジェンス / 5.23 クラウドサービス利用のセキュリティ管理策)。

---

## 2. 問題作成時の必須制約

1. **正解の固定化防止 (Mutation Guard)**:
   - 4択問題の正解インデックスはランダムシャッフル (`[1, 2, 3, 4]`) され、特定の番号に偏らないこと。
2. **科目B 記述問題の文字数制限 (Character Count Guard)**:
   - 模範解答は 30〜50 文字の日本語テキストとし、名詞止めまたは「〜すること。」で簡潔に記述すること。
