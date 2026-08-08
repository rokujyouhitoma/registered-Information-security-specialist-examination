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

        <!-- 💥 AIサイバー攻撃インシデント逆引きアタックマップ (Interactive Blast Radius Visualizer) -->
        <div id="blast-radius-app" style="margin-top: 2.5rem; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 16px; padding: 1.75rem; box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <h4 style="color: #f8fafc; font-size: 1.1rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <span>💥 AIサイバー攻撃 逆引きアタックマップ</span>
                    <span style="font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); padding: 0.15rem 0.6rem; border-radius: 12px; font-weight: 700;">Blast Radius Simulator</span>
                </h4>
                <div id="step-selector-btns" style="display: flex; gap: 0.4rem;"></div>
            </div>

            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.25rem; line-height: 1.5;">
                攻撃フェーズごとにネットワーク影響範囲（Blast Radius）の伝播状況をリアルタイム視視化できます。「CSIRT初動隔離シミュレート」を実行すると、被害抑止アクションと科目B記述式の模範解答が出力されます。
            </p>

            <!-- Topology Nodes Visualizer Map -->
            <div id="topology-nodes-container" style="display: flex; flex-wrap: wrap; gap: 0.85rem; justify-content: center; background: rgba(30, 41, 59, 0.6); padding: 1.25rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 1rem;"></div>

            <!-- Containment Action & Model Answer Overlay -->
            <div id="containment-action-box" style="display: none; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 1.25rem; margin-top: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="color: #34d399; font-weight: 700; font-size: 0.92rem;">🛡️ CSIRT 初動隔離成功 & 科目B記述式模範解答</span>
                    <span id="char-count-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; padding: 0.15rem 0.5rem; border-radius: 10px; font-size: 0.78rem; font-weight: 700; font-family: monospace;">[48字 / 45-50字制限適合]</span>
                </div>
                <div id="model-answer-text" style="color: #e2e8f0; font-size: 0.92rem; line-height: 1.6; font-weight: 600; background: rgba(0,0,0,0.3); padding: 0.75rem 1rem; border-radius: 8px; border-left: 4px solid #10b981;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
                <button id="simulate-containment-btn" onclick="simulateContainment()" style="background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; border: none; border-radius: 10px; padding: 0.6rem 1.25rem; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 10px rgba(16,185,129,0.3);">
                    ⚡ CSIRT 初動隔離シミュレートを実行
                </button>
            </div>
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
.topo-node {
    padding: 0.6rem 1rem;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.topo-node.normal {
    background: rgba(30, 41, 59, 0.8);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.topo-node.compromised {
    background: rgba(239, 68, 68, 0.25);
    color: #fca5a5;
    border: 1px solid #ef4444;
    animation: pulseComp 1.5s infinite ease-in-out;
}
.topo-node.blast {
    background: rgba(245, 158, 11, 0.2);
    color: #fde047;
    border: 1px solid #f59e0b;
}
.topo-node.isolated {
    background: rgba(16, 185, 129, 0.25);
    color: #6ee7b7;
    border: 1px solid #10b981;
}
@keyframes pulseComp {
    0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(239,68,68,0.4); }
    50% { transform: scale(1.03); box-shadow: 0 0 20px rgba(239,68,68,0.8); }
}
</style>

<script>
let attackData = [];
let currentScenarioIdx = 0;
let currentStepIdx = 0;
let isContainmentActive = false;

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
    currentStepIdx = 0;
    isContainmentActive = false;
    renderScenarioTabs();
    renderCurrentScenario();
}

function selectStep(stepIdx) {
    currentStepIdx = stepIdx;
    isContainmentActive = false;
    renderCurrentScenario();
}

function simulateContainment() {
    isContainmentActive = true;
    renderCurrentScenario();
}

function renderCurrentScenario() {
    if (!attackData || attackData.length === 0) return;
    const sc = attackData[currentScenarioIdx];

    document.getElementById('scenario-title').innerText = sc.title;
    document.getElementById('scenario-badge').innerText = sc.severity;

    // Render Steps Timeline
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

    // Render Step Selector Buttons for Topology Visualizer
    const stepBtnsContainer = document.getElementById('step-selector-btns');
    if (stepBtnsContainer) {
        stepBtnsContainer.innerHTML = sc.steps.map((s, idx) => `
            <button onclick="selectStep(${idx})" style="background: ${idx === currentStepIdx ? '#6366f1' : 'rgba(255,255,255,0.05)'}; color: ${idx === currentStepIdx ? '#fff' : '#94a3b8'}; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 0.2rem 0.6rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                Step ${s.stepNumber}
            </button>
        `).join('');
    }

    // Render Topology Nodes Blast Radius Map
    const currentStep = sc.steps[currentStepIdx] || sc.steps[0];
    const compIds = currentStep.compromisedNodeIds || [];
    const blastIds = currentStep.blastRadiusNodeIds || [];
    const containment = sc.containmentAction || {};
    const isolatedIds = isContainmentActive ? (containment.isolatedNodeIds || []) : [];

    const nodesContainer = document.getElementById('topology-nodes-container');
    if (nodesContainer && sc.nodes) {
        nodesContainer.innerHTML = sc.nodes.map(node => {
            let statusClass = 'normal';
            let statusIcon = '🖥️';

            if (isContainmentActive && isolatedIds.includes(node.id)) {
                statusClass = 'isolated';
                statusIcon = '🛡️';
            } else if (compIds.includes(node.id)) {
                statusClass = 'compromised';
                statusIcon = '🔴';
            } else if (blastIds.includes(node.id)) {
                statusClass = 'blast';
                statusIcon = '⚠️';
            }

            return `
                <div class="topo-node ${statusClass}">
                    <span>${statusIcon}</span>
                    <span>${node.label}</span>
                </div>
            `;
        }).join('');
    }

    // Render Containment Action Overlay
    const containmentBox = document.getElementById('containment-action-box');
    if (containmentBox) {
        if (isContainmentActive && containment.modelAnswer) {
            containmentBox.style.display = 'block';
            document.getElementById('model-answer-text').innerText = containment.modelAnswer;
            document.getElementById('char-count-badge').innerText = `[${containment.charCount}字 / 45-50字制限適合]`;
        } else {
            containmentBox.style.display = 'none';
        }
    }
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
