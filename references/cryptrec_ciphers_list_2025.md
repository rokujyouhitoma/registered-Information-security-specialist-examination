# CRYPTREC 電子政府推奨暗号リスト 要約参照ガイド

出典: [CRYPTREC (暗号技術評価プロジェクト) 暗号リスト](https://www.cryptrec.go.jp/list.html)

---

## 1. CRYPTREC とは
CRYPTREC (Cryptography Research and Evaluation Committees) は、電子政府推奨暗号の安全性を評価・監視し、暗号技術の適切な利用を推進する日本のプロジェクト（総務省・デジタル庁・経済産業省・IPA・NICT連携）。

---

## 2. 暗号リストの分類構造
1. **電子政府推奨暗号リスト (Recommended Ciphers List)**:
   安全性および実装性能が確認され、電子政府システムで利用を推奨する暗号技術群。
2. **推奨候補暗号リスト (Candidate Ciphers List)**:
   将来的に電子政府推奨暗号に昇格する可能性がある暗号技術。
3. **運用監視暗号リスト (Monitored Ciphers List)**:
   かつて推奨暗号であったが、解読リスクの上昇や鍵長の不足により、互換性の目的以外での新規採用を推奨しない暗号技術（例: SHA-1, 3DES, RSA-1024など）。

---

## 3. 電子政府推奨暗号の主な分類とアルゴリズム
- **共通鍵暗号 (ブロック暗号)**:
  - AES (鍵長 128/192/256bit)
  - Camellia (鍵長 128/192/256bit)
- **公開鍵暗号 (署名 / 鍵共有)**:
  - RSA (鍵長 2048bit 以上)
  - ECDSA / ECDH (楕円曲線暗号, 鍵長 256bit 以上)
- **暗号学的ハッシュ関数**:
  - SHA-2 (SHA-256, SHA-384, SHA-512)
  - SHA-3 (SHA3-256, SHA3-512)
- **メッセージ認証コード (MAC)**:
  - HMAC
  - CMAC
- **認証付き暗号 (AEAD)**:
  - AES-GCM
  - AES-CCM
