# ITSS スキルレベル対応 学習到達度セルフチェック＆教育ガイド

本ドキュメントは、IPA「ITスキル標準 (ITSS V3 2011)」および情報処理安全確保支援士（SC）シラバスに基づき、エデュケーションスペシャリスト（EDU）とセキュリティスペシャリスト（SC）が共同作成した**学習到達度セルフチェック＆スキルアップ指導ガイド**です。

---

## 🎯 第1章: ITSS レベル到達度インタラクティブセルフ診断

以下の各スキルチェックボックスを選択すると、あなたの現在の **ITSS 到達レベル (Level 1 〜 Level 4)** が自動計算・表示されます。

<div id="itss-diagnosis-container" style="max-width: 800px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
            <div>
                <span style="font-size: 0.85rem; color: #94a3b8;">現在の推定到達スキルレベル</span>
                <h2 id="itss-result-level" style="font-size: 1.8rem; color: #818cf8; margin-top: 0.2rem;">Level 1 判定中...</h2>
            </div>
            <div id="itss-score-badge" style="background: rgba(99, 102, 241, 0.2); color: #c7d2fe; padding: 0.4rem 1rem; border-radius: 20px; font-weight: 700; font-size: 1.1rem; border: 1px solid rgba(99, 102, 241, 0.4);">0 / 0</h2>
        </div>

        <div id="itss-skills-form" style="display: flex; flex-direction: column; gap: 1.5rem;"></div>
    </div>
</div>

<style>
.itss-level-group {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1.25rem;
}
.itss-level-header {
    font-size: 1.05rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.itss-level-desc {
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 1rem;
}
.itss-checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.5rem 0;
    font-size: 0.92rem;
    color: #cbd5e1;
    cursor: pointer;
}
.itss-checkbox-label input {
    margin-top: 0.2rem;
    accent-color: #6366f1;
    width: 1.1rem;
    height: 1.1rem;
}
</style>

<script>
let itssData = null;

async function initITSSDiagnosis() {
    try {
        const res = await fetch('./data/itss_skills.json');
        if (!res.ok) throw new Error('itss_skills.json のロードに失敗しました');
        itssData = await res.json();
        renderITSSForm();
    } catch (err) {
        console.error('ITSS load error:', err);
    }
}

function renderITSSForm() {
    if (!itssData || !itssData.levels) return;
    const formContainer = document.getElementById('itss-skills-form');

    let html = '';
    let totalSkillsCount = 0;

    itssData.levels.forEach(lvl => {
        totalSkillsCount += lvl.skills.length;
        html += `
            <div class="itss-level-group">
                <div class="itss-level-header">🎯 ${lvl.name}</div>
                <div class="itss-level-desc">${lvl.description}</div>
                <div class="itss-skills-list">
                    ${lvl.skills.map((skill, sIdx) => `
                        <label class="itss-checkbox-label">
                            <input type="checkbox" data-level="${lvl.level}" onchange="calculateITSSLevel()">
                            <span>${skill}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    formContainer.innerHTML = html;
    calculateITSSLevel();
}

function calculateITSSLevel() {
    const checkboxes = document.querySelectorAll('#itss-skills-form input[type="checkbox"]');
    let totalChecked = 0;
    let maxAchievedLevel = 1;

    let levelCheckCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let levelTotalCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

    checkboxes.forEach(cb => {
        const lvl = parseInt(cb.getAttribute('data-level'));
        levelTotalCounts[lvl]++;
        if (cb.checked) {
            totalChecked++;
            levelCheckCounts[lvl]++;
        }
    });

    if (levelCheckCounts[4] >= 2) maxAchievedLevel = 4;
    else if (levelCheckCounts[3] >= 2) maxAchievedLevel = 3;
    else if (levelCheckCounts[2] >= 2) maxAchievedLevel = 2;
    else maxAchievedLevel = 1;

    document.getElementById('itss-score-badge').innerText = `${totalChecked} / ${checkboxes.length}`;

    const levelTextMap = {
        1: "Level 1: IT基礎・基本概念達成",
        2: "Level 2: セキュリティ応用・技術習得",
        3: "Level 3: セキュリティ専門・実務指導レベル",
        4: "Level 4: 情報処理安全確保支援士 (SC) 高度プロフェッショナル"
    };

    document.getElementById('itss-result-level').innerText = levelTextMap[maxAchievedLevel];
}

document.addEventListener('DOMContentLoaded', initITSSDiagnosis);
</script>

---

## 🗺️ 第2章: セルフ診断結果に基づくステップアップ・ロードマップ

### 診断結果 A: チェック項目が Level 1〜2 中心の場合
- **おすすめ学習ステップ**:
  - `docs/syllabus_detail.md` でシラバス用語の基礎概念を理解。
  - `docs/glossary/index.md` で専門用語・略語の定義を固める。

### 診断結果 B: チェック項目が Level 3〜4 中心の場合
- **おすすめ学習ステップ**:
  - `docs/subject_b/reasoning_guide.md` で科目 B 長文記述の設問分解・30〜50字要約思考プロセスを訓練。
  - `docs/scenarios/attack_scenarios_analysis.md` で最新の攻撃・インシデント解析演習を実行。
