# 🧠 実践演習クイズ (Interactive Quiz Portal)

IPA 情報処理安全確保支援士試験 (SC) のシラバス重要概念・セキュアプログラミング・攻撃解析に関する理解度を判定する対話型クイズポータルです。

---

<div class="quiz-portal-container" style="max-width: 800px; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div id="quiz-card" style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
            <span id="quiz-category-badge" style="background: rgba(99, 102, 241, 0.2); color: #818cf8; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.82rem; font-weight: 600;">読み込み中...</span>
            <span id="quiz-progress" style="font-size: 0.85rem; color: #94a3b8;">Question 1</span>
        </div>

        <h3 id="quiz-question-text" style="color: #f8fafc; font-size: 1.15rem; line-height: 1.6; margin-bottom: 1.5rem;">問題をロードしています...</h3>

        <div id="quiz-options-list" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;"></div>

        <div id="quiz-feedback-box" style="display: none; padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.92rem;"></div>

        <div style="display: flex; justify-content: flex-end; gap: 1rem;">
            <button id="next-question-btn" onclick="nextQuestion()" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; border: none; border-radius: 20px; padding: 0.6rem 1.5rem; font-weight: 600; cursor: pointer; display: none;">次の問題へ ➔</button>
        </div>
    </div>
</div>

<style>
.quiz-opt-btn {
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 0.9rem 1.2rem;
    text-align: left;
    font-size: 0.98rem;
    cursor: pointer;
    transition: all 0.2s ease;
}
.quiz-opt-btn:hover:not(:disabled) {
    background: rgba(99, 102, 241, 0.15);
    color: #ffffff;
    border-color: #818cf8;
}
.quiz-opt-btn.correct {
    background: rgba(16, 185, 129, 0.2) !important;
    border-color: #10b981 !important;
    color: #a7f3d0 !important;
}
.quiz-opt-btn.wrong {
    background: rgba(239, 68, 68, 0.2) !important;
    border-color: #ef4444 !important;
    color: #fca5a5 !important;
}
</style>

<script>
let questionsData = [];
let currentIdx = 0;

async function fetchWithFallback(pathList) {
    for (let i = 0; i < pathList.length; i++) {
        try {
            const res = await fetch(pathList[i]);
            if (res.ok) return res;
        } catch (e) {}
    }
    throw new Error('All path attempts failed for ' + pathList[0]);
}

async function loadQuizData() {
    try {
        const res = await fetchWithFallback([
            'data/quiz_questions.json',
            './data/quiz_questions.json',
            '../data/quiz_questions.json',
            '/registered-information-security-specialist-examination/data/quiz_questions.json',
            '/registered-information-security-specialist-examination/quiz/data/quiz_questions.json'
        ]);
        questionsData = await res.json();
        renderQuestion();
    } catch (err) {
        console.error('Quiz load error:', err);
        document.getElementById('quiz-question-text').innerText = 'クイズデータの取得に失敗しました: ' + err.message;
    }
}

function renderQuestion() {
    if (questionsData.length === 0) return;
    const q = questionsData[currentIdx];

    document.getElementById('quiz-category-badge').innerText = q.category.toUpperCase();
    document.getElementById('quiz-progress').innerText = `Question ${currentIdx + 1} / ${questionsData.length}`;
    document.getElementById('quiz-question-text').innerText = q.question;

    const optList = document.getElementById('quiz-options-list');
    optList.innerHTML = q.options.map((opt, idx) => `
        <button class="quiz-opt-btn" onclick="checkAnswer(${idx}, this)">${idx + 1}. ${opt}</button>
    `).join('');

    document.getElementById('quiz-feedback-box').style.display = 'none';
    document.getElementById('next-question-btn').style.display = 'none';
}

function checkAnswer(selectedIdx, btnEl) {
    const q = questionsData[currentIdx];
    const allBtns = document.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(btn => btn.disabled = true);

    const feedbackBox = document.getElementById('quiz-feedback-box');
    feedbackBox.style.display = 'block';

    if (selectedIdx === q.answerIndex) {
        btnEl.classList.add('correct');
        feedbackBox.style.background = 'rgba(16, 185, 129, 0.15)';
        feedbackBox.style.border = '1px solid #10b981';
        feedbackBox.style.color = '#6ee7b7';
        feedbackBox.innerHTML = `<strong>🎉 正解です！</strong><br>${q.explanation}`;
    } else {
        btnEl.classList.add('wrong');
        allBtns[q.answerIndex].classList.add('correct');
        feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
        feedbackBox.style.border = '1px solid #ef4444';
        feedbackBox.style.color = '#fca5a5';
        feedbackBox.innerHTML = `<strong>❌ 不正解...</strong><br>正解: ${q.answerIndex + 1}. ${q.options[q.answerIndex]}<br>${q.explanation}`;
    }

    if (currentIdx < questionsData.length - 1) {
        document.getElementById('next-question-btn').style.display = 'block';
    }
}

function nextQuestion() {
    currentIdx = (currentIdx + 1) % questionsData.length;
    renderQuestion();
}

document.addEventListener('DOMContentLoaded', loadQuizData);
</script>
