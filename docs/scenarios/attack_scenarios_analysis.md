# サイバー攻撃シナリオ・ログ解読ハンズオン ケーススタディ (Cyber Attack Scenarios & Log Analysis)

## 1. 概要 (Overview)
科目B試験（記述式）で最も頻繁に出題される**「外部からの侵入 ➔ 内部ネットワーク横展開 ➔ 情報漏洩・ランサムウェア被害」**の代表的サイバーキルチェーンシナリオについて、各フェーズで記録されるログデータ・イベントID・通信挙動の解読ノウハウを体系化したケーススタディである。

---

## 2. 代表的攻撃シナリオとキルチェーン (Scenario 01: VPN破られたケース)

```mermaid
sequenceDiagram
    autonumber
    actor Attacker as 攻撃者 (外部)
    participant FW as 境界FW / VPN機器
    participant C2 as 外部C2サーバー
    participant DC as Active Directory Domain Controller
    participant FS as 社内ファイルサーバー

    Attacker->>FW: 未パッチ脆弱性 (RCE) 攻撃パケット送信
    FW->>C2: 逆接続 (Reverse Shell / UDP 8443)
    Attacker->>DC: Pass-the-Hash による管理者権限奪取 (Event ID 4624 Type 3)
    Attacker->>FS: 機密データの圧縮・暗号化・DLP回避送信
```

### シナリオ詳細フロー
1. **初期侵入 (Initial Access)**:
   - 境界に置かれた VPN 機器のファームウェア未パッチ脆弱性（RCE）を突かれ、リバースシェルにより C2 サーバー（IP: 203.0.113.50, Port 8443）へ暗号化コネクトバックが確立される。
2. **横展開 (Lateral Movement)**:
   - 侵入後、メモリダンプツール（Mimikatz相当）により `lsass.exe` から NTLM ハッシュを抽出し、Pass-the-Hash 攻撃によりドメインコントローラへ無断アクセス。
3. **目的遂行 (Exfiltration & Impact)**:
   - 社内ファイルサーバー内の機密データを暗号化アーカイブ化し、HTTPS/DNSトンネリング経由で外部へ送出後、端末をランサムウェアで暗号化（二重脅迫）。

---

## 3. 重要イベントログ解読リファレンス (Windows Event Log Reference)

| イベントID | ログ名称 | 解読時の重要ポイント・判定基準 |
|---|---|---|
| **4624** | アカウントログオン成功 | **ログオンタイプ 3 (ネットワーク)** または **10 (リモートデスクトップ)**。通常業務時間外かつ管理者アカウント（Administrator）でのログインを抽出。 |
| **4672** | 特権の割り当て | 特別な権限（SeDebugPrivilege 等）が割り当てられた瞬間の記録。一般ユーザーからの権限昇格検知。 |
| **4688** | 新しいプロセスの作成 | コマンドライン引数ログ（CommandLine）の記録。`powershell.exe -Enc` (Base64エンコード実行) や `cmd.exe /c whoami` のプロセス生成。 |
| **4768** | Kerberos TGT 要求 | 認証チケット要求。短時間での大量要求は Kerberoasting 攻撃の兆候。 |

---

## 4. インシデント初動対応 (CSIRT Triage Protocol)

1. **隔離措置**: 感染端末の物理LANケーブル抜去およびWi-Fi切断（C2通信の即時遮断）。
2. **メモリダンプ取得**: 電源を切る前に `RAM` データをダンプし、揮発性データ（プロセスメモリ上の暗号鍵・C2通信宛先）を物理保護（RFC 3227 揮発性順序の適用）。
3. **フォレンジック保全**: 書き込み防止装置（ライトブロッカ）を接続し、ストレージのビットストリームイメージを作成後、SHA-256 ハッシュ値を生成・記録する。
