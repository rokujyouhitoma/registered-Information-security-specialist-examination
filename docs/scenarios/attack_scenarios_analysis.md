# サイバー攻撃シナリオ・ログ解読ハンズオン ケーススタディ (Cyber Attack Scenarios & Log Analysis)

## 1. 概要 (Overview)
科目B試験（記述式）で最も頻繁に出題される**「外部からの侵入 ➔ 内部ネットワーク横展開 ➔ 情報漏洩・ランサムウェア被害」**の代表的サイバーキルチェーンシナリオについて、各フェーズで記録されるログデータ・イベントID・通信挙動の解読ノウハウを体系化したケーススタディである。

---

## 🎯 2. データ駆動 攻撃タイムライン & 対策解析演習

以下の対話型タイムラインコンポーネントでは、代表的な攻撃シナリオの侵入〜目的達成までのステップと検知・対策ポイントを視覚的に体験・解析できます。

<div id="attack-scenarios-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;" id="scenario-selector-btns"></div>

        <div id="scenario-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <h3 id="scenario-title" style="color: #f8fafc; font-size: 1.2rem; margin: 0;">シナリオを読み込んでいます...</h3>
                <span id="scenario-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.82rem; font-weight: 700;">Critical</span>
            </div>

            <div id="timeline-steps-container" style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.5rem;"></div>
        </div>
    </div>
</div>

<style>
.scenario-tab-btn {
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}
.scenario-tab-btn.active {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    border-color: #818cf8;
}
.timeline-step-card {
    background: rgba(255, 255, 255, 0.03);
    border-left: 4px solid #6366f1;
    border-radius: 0 10px 10px 0;
    padding: 1.25rem;
}
.timeline-step-phase {
    font-size: 0.82rem;
    color: #818cf8;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.4rem;
}
.timeline-step-action {
    font-size: 0.98rem;
    color: #f1f5f9;
    line-height: 1.6;
    margin-bottom: 0.75rem;
}
.timeline-step-box {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 0.88rem;
    margin-top: 0.5rem;
}
</style>

<script>
let attackData = [];
let currentScenarioIdx = 0;

async function loadAttackScenarios() {
    try {
        const res = await fetch('../data/attack_scenarios.json');
        if (!res.ok) throw new Error('attack_scenarios.json のロードに失敗しました');
        attackData = await res.json();
        renderScenarioTabs();
        renderCurrentScenario();
    } catch (err) {
        console.error('Scenario load error:', err);
    }
}

function renderScenarioTabs() {
    const btnContainer = document.getElementById('scenario-selector-btns');
    btnContainer.innerHTML = attackData.map((sc, idx) => `
        <button class="scenario-tab-btn ${idx === currentScenarioIdx ? 'active' : ''}" onclick="selectScenario(${idx})">
            ${sc.title.substring(0, 22)}...
        </button>
    `).join('');
}

function selectScenario(idx) {
    currentScenarioIdx = idx;
    renderScenarioTabs();
    renderCurrentScenario();
}

function renderCurrentScenario() {
    if (!attackData || attackData.length === 0) return;
    const sc = attackData[currentScenarioIdx];

    document.getElementById('scenario-title').innerText = sc.title;
    document.getElementById('scenario-badge').innerText = sc.severity;

    const stepsContainer = document.getElementById('timeline-steps-container');
    stepsContainer.innerHTML = sc.steps.map(s => `
        <div class="timeline-step-card">
            <div class="timeline-step-phase">STEP ${s.stepNumber}: ${s.phase}</div>
            <div class="timeline-step-action">${s.action}</div>
            <div class="timeline-step-box" style="border-left: 3px solid #eab308; color: #fef08a;">
                🔍 <strong>検知ポイント (Logs/EDR):</strong> ${s.detection}
            </div>
            <div class="timeline-step-box" style="border-left: 3px solid #10b981; color: #a7f3d0;">
                🛡️ <strong>根本対策 (Countermeasure):</strong> ${s.countermeasure}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadAttackScenarios);
</script>

---

## 3. 代表的攻撃キルチェーン (Scenario 01: VPN破られたケース)

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

---

## 4. 重要イベントログ解読リファレンス (Windows Event Log Reference)

| イベントID | ログ名称 | 解読時の重要ポイント・判定基準 |
|---|---|---|
| **4624** | アカウントログオン成功 | **ログオンタイプ 3 (ネットワーク)** または **10 (リモートデスクトップ)**。通常業務時間外かつ管理者アカウント（Administrator）でのログインを抽出。 |
| **4672** | 特権の割り当て | 特別な権限（SeDebugPrivilege 等）が割り当てられた瞬間の記録。一般ユーザーからの権限昇格検知。 |
| **4688** | 新しいプロセスの作成 | コマンドライン引数ログ（CommandLine）の記録。`powershell.exe -Enc` (Base64エンコード実行) や `cmd.exe /c whoami` のプロセス生成。 |
| **4768** | Kerberos TGT 要求 | 認証チケット要求。短時間での大量要求は Kerberoasting 攻撃の兆候。 |

---

## 5. インシデント初動対応 (CSIRT Triage Protocol)

1. **隔離措置**: 感染端末の物理LANケーブル抜去およびWi-Fi切断（C2通信の即時遮断）。
2. **メモリダンプ取得**: 電源を切る前に `RAM` データをダンプし、揮発性データ（プロセスメモリ上の暗号鍵・C2通信宛先）を物理保護（RFC 3227 揮発性順序の適用）。
3. **フォレンジック保全**: 書き込み防止装置（ライトブロッカ）を接続し、ストレージのビットストリームイメージを作成後、SHA-256 ハッシュ値を生成・記録する。
