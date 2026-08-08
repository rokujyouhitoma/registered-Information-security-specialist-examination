# 情報セキュリティスペシャリスト試験 科目B (長文記述式) 完全攻略・解法思考プロセスガイド

## 1. 科目B 記述問題の本質と評価軸 (Core Principles & Scoring Criteria)

科目B試験（旧 午後I・午後II試験）では、知識の丸暗記ではなく**「与えられたシステム構成図・アクセスログ・運用事例の文脈から、セキュリティ上の弱点や攻撃の影響範囲を正しく読み取り、IPA公式採点基準に適合する形式で言語化する力」**が問われる。

### IPA公式採点基準の3大要件
1. **問題文の事実に基づくこと**: 問題文に記載されていない独自の前提を勝手に補って解答することは厳禁。
2. **問いの形式と一致すること**: 「理由を述べよ」に対しては「〜のため。」、「目的を述べよ」に対しては「〜を防ぐため。」「〜を確保するため。」と答える。
3. **字数制限の厳守**: 30字〜50字指定の場合、30字未満や文字数超過は減点・ゼロ点の対象。

---

## 🎯 2. データ駆動 科目B 長文記述 設問分解・要約演習ナビゲーター

以下のコンポーネントでは、実際の科目 B 長文問題文からキーワードを抽出し、IPA 適合 30〜50 字解答を組み立てるステップを体験・訓練できます。

<div id="subject-b-drill-app" style="max-width: 850px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;" id="drill-selector-btns"></div>

        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
                <h3 id="drill-title" style="color: #f8fafc; font-size: 1.15rem; margin: 0;">演習をロード中...</h3>
                <span id="drill-domain" style="background: rgba(99, 102, 241, 0.2); color: #818cf8; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;">認証・クラウド</span>
            </div>

            <div style="background: rgba(0, 0, 0, 0.3); border-left: 4px solid #6366f1; border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; font-size: 0.95rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 1.5rem;">
                <strong>📄 長文問題文抜粋:</strong>
                <p id="drill-passage" style="margin-top: 0.5rem; margin-bottom: 0;"></p>
            </div>

            <div id="drill-questions-container" style="display: flex; flex-direction: column; gap: 1.5rem;"></div>
        </div>
    </div>
</div>

<style>
.drill-btn {
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
.drill-btn.active {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    border-color: #818cf8;
}
.kw-tag {
    display: inline-block;
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 0.2rem 0.6rem;
    font-size: 0.82rem;
    margin-right: 0.4rem;
}
</style>

<script>
let drillData = [];
let currentDrillIdx = 0;

async function loadSubjectBDrills() {
    try {
        const res = await fetch('../data/subject_b_drills.json');
        if (!res.ok) throw new Error('subject_b_drills.json のロードに失敗しました');
        drillData = await res.json();
        renderDrillTabs();
        renderCurrentDrill();
    } catch (err) {
        console.error('Drill load error:', err);
    }
}

function renderDrillTabs() {
    const btnContainer = document.getElementById('drill-selector-btns');
    btnContainer.innerHTML = drillData.map((d, idx) => `
        <button class="drill-btn ${idx === currentDrillIdx ? 'active' : ''}" onclick="selectDrill(${idx})">
            ${d.title.substring(0, 20)}...
        </button>
    `).join('');
}

function selectDrill(idx) {
    currentDrillIdx = idx;
    renderDrillTabs();
    renderCurrentDrill();
}

function renderCurrentDrill() {
    if (!drillData || drillData.length === 0) return;
    const d = drillData[currentDrillIdx];

    document.getElementById('drill-title').innerText = d.title;
    document.getElementById('drill-domain').innerText = d.domain;
    document.getElementById('drill-passage').innerText = d.problemPassage;

    const qContainer = document.getElementById('drill-questions-container');
    qContainer.innerHTML = d.questions.map(q => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem;">
            <div style="font-size: 0.85rem; color: #818cf8; font-weight: 700; margin-bottom: 0.4rem;">設問 ${q.qIndex} [${q.frameworkStep}]</div>
            <div style="font-size: 1rem; color: #f1f5f9; font-weight: 600; margin-bottom: 1rem;">${q.question}</div>

            <div style="margin-bottom: 0.75rem;">
                <span style="font-size: 0.85rem; color: #94a3b8; margin-right: 0.5rem;">🔑 抽出キーワード:</span>
                ${q.extractKeywords.map(kw => `<span class="kw-tag">${kw}</span>`).join('')}
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; margin-bottom: 0.75rem;">
                <div style="font-size: 0.85rem; color: #a7f3d0; font-weight: 700;">✅ IPA 採点適合 模範解答 (${q.charCount}字):</div>
                <div style="font-size: 0.95rem; color: #ffffff; margin-top: 0.3rem;">「${q.sampleAnswer}」</div>
            </div>

            <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                💡 <strong>解説・ポイント:</strong> ${q.explanation}
            </div>
        </div>
    `).join('');
}

// SPA 対応: DOMContentLoaded は SPA 動的注入後には再発火しない。
// readyState が 'loading' でなければ即時実行する。
(document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', loadSubjectBDrills)
    : (loadSubjectBDrills)());
</script>

---

## 3. 設問タイプ別 解答構文テンプレート (Answering Templates)

```mermaid
graph LR
    A["設問タイプ分析"] --> B["【理由問題】 〜のため。"]
    A --> C["【目的問題】 〜を防ぐため。"]
    A --> D["【リスク問題】 〜により〜が〜するリスク。"]
    A --> E["【対策問題】 〜を〜に設定・運用する。"]
```

### ① 理由を問う問題（「〜はなぜか」「その理由を答えよ」）
- **合格基本構文**: `[問題文中の条件・挙動] により、[具体的な悪影響・セキュリティ上の脆弱性] が発生するため。`
- **模範解答例**: 「送信元IPアドレスが偽装されたパケットを受信した場合でも、内部ネットワークからの不正送信と判定できなくなるため。」(46字)

### ② 目的・意図を問う問題（「〜を行う目的は何か」）
- **合格基本構文**: `[対象となる攻撃・事象] による [被害・悪用] を [防ぐ/防止する/最小化する] ため。`
- **模範解答例**: 「正規の利用者になりすました悪意ある第三者による、特権コマンドの不正実行を防ぐため。」(40字)

### ③ リスク・脅威を問う問題（「どのような問題が生じるか」）
- **合格基本構文**: `[攻撃手法/設定ミス] によって、[重要資産/データ] が [漏洩・改ざん・停止] するリスク。`
- **模範解答例**: 「VPN機器の既知の脆弱性を突かれ、内部ネットワークへ不正侵入されるリスク。」(37字)

---

## 4. 過去問演習におけるセルフ添削チェックリスト (Self-Correction Checklist)

- [ ] 問題文中のキーワード（システム名、サーバー名、プロトコル名）を正確に使用しているか？
- [ ] 抽象的な言葉（例: 「セキュリティを高めるため」）を具体化（例: 「セッションハイジャックを防止するため」）できているか？
- [ ] 文字数が指定範囲の 80%〜100% に収まっているか？
