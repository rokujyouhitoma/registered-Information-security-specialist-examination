# 🔍 総合ドキュメント＆シラバス全文検索

IPA 情報処理安全確保支援士試験 (SC) の公式シラバス Ver.2.1、科目A-2追補版 Ver.4.0、総合用語辞書 (2,101項目)、科目B思考プロセスガイド、およびインシデント解析シナリオを高速かつ横断的に検索できる**ハイブリッド型検索ポータル**です。

---

<div class="search-portal-container" style="margin: 2rem 0; font-family: 'Inter', sans-serif;">
    <div class="search-box-card" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9)); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); backdrop-filter: blur(12px);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <label for="portal-search-input" style="font-size: 1.1rem; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.4rem;">⚡</span> キーワード・概念・技術用語を検索
            </label>
            <span style="font-size: 0.8rem; background: rgba(99, 102, 241, 0.2); color: #818cf8; padding: 0.2rem 0.6rem; border-radius: 20px; border: 1px solid rgba(99, 102, 241, 0.4);">
                ショートカット: <kbd style="background: rgba(0,0,0,0.4); padding: 0.1rem 0.3rem; border-radius: 4px;">/</kbd>
            </span>
        </div>
        <div style="position: relative;">
            <input type="text" id="portal-search-input" placeholder="例: TLS 1.3, ゼロトラスト, OAuth 2.0, DMARC, PKI, インシデント..." autofocus
                style="width: 100%; padding: 1.1rem 1.4rem; font-size: 1.1rem; background: rgba(15, 23, 42, 0.8); border: 2px solid rgba(99, 102, 241, 0.4); border-radius: 12px; color: #ffffff; outline: none; transition: all 0.25s ease-in-out; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);"
                onfocus="this.style.borderColor='#818cf8'; this.style.boxShadow='0 0 0 4px rgba(99,102,241,0.25)';"
                onblur="this.style.borderColor='rgba(99, 102, 241, 0.4)'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.4)';"
            />
            <button id="clear-search-btn" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; display: none;" onclick="document.getElementById('portal-search-input').value=''; document.getElementById('portal-search-input').focus(); performPortalSearch();">✕</button>
        </div>

        <div style="margin-top: 1.2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #94a3b8;">
            <span style="font-weight: 600; color: #cbd5e1;">🔥 おすすめ検索:</span>
            <button class="quick-tag" onclick="quickSearch('TLS 1.3')">TLS 1.3</button>
            <button class="quick-tag" onclick="quickSearch('ゼロトラスト')">ゼロトラスト</button>
            <button class="quick-tag" onclick="quickSearch('OAuth 2.0')">OAuth 2.0</button>
            <button class="quick-tag" onclick="quickSearch('DMARC')">SPF / DMARC</button>
            <button class="quick-tag" onclick="quickSearch('PKI')">PKI (公開鍵基盤)</button>
            <button class="quick-tag" onclick="quickSearch('シーケンス図')">シーケンス図</button>
            <button class="quick-tag" onclick="quickSearch('インシデント')">インシデント解析</button>
        </div>
    </div>

    <!-- Category Filters -->
    <div style="display: flex; gap: 0.6rem; margin: 1.5rem 0 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem; overflow-x: auto;">
        <button class="filter-tab active" data-filter="all" onclick="setFilter('all', this)">🌐 すべて</button>
        <button class="filter-tab" data-filter="glossary" onclick="setFilter('glossary', this)">📚 用語辞書 (Glossary)</button>
        <button class="filter-tab" data-filter="syllabus" onclick="setFilter('syllabus', this)">📑 シラバス (Syllabus)</button>
        <button class="filter-tab" data-filter="subject_b" onclick="setFilter('subject_b', this)">🧠 科目B演習・解法</button>
        <button class="filter-tab" data-filter="scenarios" onclick="setFilter('scenarios', this)">⚔️ 攻撃・解析シナリオ</button>
    </div>

    <!-- Status & Results Count -->
    <div id="search-status-bar" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; color: #94a3b8;">
        <div id="status-text">検索インデックスを準備中...</div>
        <div id="results-count" style="font-weight: 600; color: #818cf8;"></div>
    </div>

    <!-- Results List -->
    <div id="search-results-list" style="display: flex; flex-direction: column; gap: 1rem;"></div>
</div>

<style>
.quick-tag {
    background: rgba(255, 255, 255, 0.06);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s ease;
}
.quick-tag:hover {
    background: rgba(99, 102, 241, 0.2);
    color: #ffffff;
    border-color: #818cf8;
}
.filter-tab {
    background: none;
    border: none;
    color: #94a3b8;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
    white-space: nowrap;
}
.filter-tab:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
}
.filter-tab.active {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8));
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
.result-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    transition: all 0.25s ease;
    text-decoration: none;
    display: block;
}
.result-card:hover {
    background: rgba(30, 41, 59, 0.85);
    border-color: rgba(99, 102, 241, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
.result-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #6366f1;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.result-title:hover {
    color: #818cf8;
}
.result-summary {
    font-size: 0.92rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 0.75rem;
}
.result-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.8rem;
    color: #64748b;
}
.badge-category {
    background: rgba(99, 102, 241, 0.15);
    color: #a5b4fc;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}
mark {
    background: rgba(245, 158, 11, 0.3);
    color: #fef08a;
    padding: 0.1rem 0.2rem;
    border-radius: 3px;
}
</style>

<script>
let currentFilter = 'all';
let searchIndex = null;
let customEngine = null;

async function initSearchEngine() {
    const statusText = document.getElementById('status-text');
    try {
        statusText.innerText = '検索インデックスをロード中...';
        const response = await fetch('./search_index.json');
        if (!response.ok) {
            throw new Error('search_index.json のロードに失敗しました');
        }
        searchIndex = await response.json();

        statusText.innerHTML = '✅ インデックスロード完了 (全 ' + (searchIndex.docs ? searchIndex.docs.length : 0) + ' 項目)';
        
        // 初回ロード時に自動検索 (URLパラメータがあれば実行)
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        if (q) {
            document.getElementById('portal-search-input').value = q;
            performPortalSearch();
        } else {
            performPortalSearch();
        }
    } catch (err) {
        console.error('Search init error:', err);
        statusText.innerHTML = '⚠️ インデックスロードエラー: ' + err.message;
    }
}

function setFilter(filter, el) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    if (el) el.classList.add('active');
    performPortalSearch();
}

function quickSearch(query) {
    const input = document.getElementById('portal-search-input');
    input.value = query;
    input.focus();
    performPortalSearch();
}

function performPortalSearch() {
    const input = document.getElementById('portal-search-input');
    const query = input.value.trim().toLowerCase();
    const clearBtn = document.getElementById('clear-search-btn');
    const resultsContainer = document.getElementById('search-results-list');
    const countEl = document.getElementById('results-count');

    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    if (!searchIndex || !searchIndex.docs) {
        return;
    }

    let results = [];

    if (!query) {
        // クエリ空時は全件表示（フィルター適用）
        results = searchIndex.docs.map(doc => ({ ...doc, score: 1.0 }));
    } else {
        const queryTerms = query.split(/\s+/).filter(t => t.length > 0);
        results = searchIndex.docs.filter(doc => {
            const title = (doc.name || doc.title || '').toLowerCase();
            const summary = (doc.summary || doc.content || '').toLowerCase();
            const text = title + ' ' + summary;
            
            return queryTerms.every(term => text.includes(term));
        }).map(doc => {
            const title = (doc.name || doc.title || '').toLowerCase();
            let score = 0;
            if (title.includes(query)) score += 10;
            if (title.startsWith(query)) score += 5;
            return { ...doc, score: score + 1 };
        });

        results.sort((a, b) => b.score - a.score);
    }

    // カテゴリーフィルター適用
    if (currentFilter !== 'all') {
        results = results.filter(doc => {
            const path = (doc.url || doc.id || '').toLowerCase();
            if (currentFilter === 'glossary') return path.includes('glossary');
            if (currentFilter === 'syllabus') return path.includes('syllabus');
            if (currentFilter === 'subject_b') return path.includes('subject_b');
            if (currentFilter === 'scenarios') return path.includes('scenarios');
            return true;
        });
    }

    countEl.innerText = results.length + ' 件のヒット';

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; background: rgba(30, 41, 59, 0.3); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
                <h3 style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 0.5rem;">該当する検索結果が見つかりませんでした</h3>
                <p style="color: #64748b; font-size: 0.85rem;">別のキーワードを試すか、カテゴリーフィルターを変更してください。</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.slice(0, 50).map(doc => {
        const title = doc.name || doc.title || '無題ドキュメント';
        const summary = doc.summary || '詳細解説ドキュメント';
        const rawUrl = doc.url || (doc.id ? doc.id + '.html' : '#');
        const url = rawUrl.endsWith('.html') ? rawUrl : rawUrl + '.html';
        
        let categoryLabel = '総合情報';
        if (url.includes('glossary')) categoryLabel = '用語辞書';
        else if (url.includes('syllabus')) categoryLabel = 'シラバス';
        else if (url.includes('subject_b')) categoryLabel = '科目B演習';
        else if (url.includes('scenarios')) categoryLabel = '攻撃シナリオ';

        // キーワードハイライト
        let highlightedSummary = summary;
        if (query) {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlightedSummary = summary.replace(regex, '<mark>$1</mark>');
        }

        return `
            <a href="${url}" class="result-card">
                <div class="result-title">
                    <span>${title}</span>
                    <span class="badge-category">${categoryLabel}</span>
                </div>
                <div class="result-summary">${highlightedSummary}</div>
                <div class="result-meta">
                    <span>🔗 ${url}</span>
                </div>
            </a>
        `;
    }).join('');
}

// リアルタイムイベントリスナーとショートカット
document.addEventListener('DOMContentLoaded', () => {
    initSearchEngine();

    const input = document.getElementById('portal-search-input');
    if (input) {
        input.addEventListener('input', performPortalSearch);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== input) {
            e.preventDefault();
            if (input) input.focus();
        } else if (e.key === 'Escape' && document.activeElement === input) {
            input.value = '';
            performPortalSearch();
        }
    });
});
</script>
