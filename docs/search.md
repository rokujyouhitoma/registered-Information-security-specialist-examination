# 🔍 全文検索

<div class="google-search-container" style="max-width: 800px; margin: 1.5rem 0 3rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    
    <!-- Google Style Search Input Box -->
    <div style="position: relative; margin-bottom: 1.25rem;">
        <div style="position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: #94a3b8; pointer-events: none;">🔍</div>
        <input type="text" id="portal-search-input" placeholder="検索ワードを入力 (例: TLS 1.3, ゼロトラスト, OAuth 2.0, DMARC, PKI)..." autofocus
            style="width: 100%; padding: 0.9rem 2.8rem 0.9rem 2.8rem; font-size: 1.05rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; color: #ffffff; outline: none; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
            onfocus="this.style.borderColor='#818cf8'; this.style.boxShadow='0 4px 16px rgba(99, 102, 241, 0.25)';"
            onblur="this.style.borderColor='rgba(255, 255, 255, 0.15)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.2)';"
        />
        <button id="clear-search-btn" style="position: absolute; right: 1.1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; font-size: 1.1rem; cursor: pointer; display: none;" onclick="document.getElementById('portal-search-input').value=''; document.getElementById('portal-search-input').focus(); performPortalSearch();">✕</button>
    </div>

    <!-- Suggested Quick Chips -->
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; font-size: 0.82rem; margin-bottom: 1.5rem; color: #94a3b8;">
        <span style="color: #64748b; font-weight: 500;">検索ヒント:</span>
        <button class="g-chip" onclick="quickSearch('TLS 1.3')">TLS 1.3</button>
        <button class="g-chip" onclick="quickSearch('ゼロトラスト')">ゼロトラスト</button>
        <button class="g-chip" onclick="quickSearch('OAuth 2.0')">OAuth 2.0</button>
        <button class="g-chip" onclick="quickSearch('DMARC')">DMARC</button>
        <button class="g-chip" onclick="quickSearch('PKI')">PKI</button>
        <button class="g-chip" onclick="quickSearch('インシデント')">インシデント解析</button>
    </div>

    <!-- Google Style Minimal Tabs -->
    <div style="display: flex; gap: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 1.5rem; padding-bottom: 0.2rem;">
        <button class="g-tab active" data-filter="all" onclick="setFilter('all', this)">すべて</button>
        <button class="g-tab" data-filter="glossary" onclick="setFilter('glossary', this)">用語辞書</button>
        <button class="g-tab" data-filter="syllabus" onclick="setFilter('syllabus', this)">シラバス</button>
        <button class="g-tab" data-filter="subject_b" onclick="setFilter('subject_b', this)">科目B演習</button>
        <button class="g-tab" data-filter="scenarios" onclick="setFilter('scenarios', this)">攻撃シナリオ</button>
    </div>

    <!-- Status & Count -->
    <div id="search-status-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #64748b; margin-bottom: 1.25rem;">
        <div id="status-text">インデックス準備中...</div>
        <div id="results-count"></div>
    </div>

    <!-- Results List (Google Search Result Style) -->
    <div id="search-results-list" style="display: flex; flex-direction: column; gap: 1.75rem;"></div>
</div>

<style>
.g-chip {
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0.2rem 0.65rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.15s ease;
}
.g-chip:hover {
    background: rgba(99, 102, 241, 0.15);
    color: #c7d2fe;
    border-color: #818cf8;
}

.g-tab {
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: #94a3b8;
    padding: 0.4rem 0.2rem;
    font-size: 0.92rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}
.g-tab:hover {
    color: #f1f5f9;
}
.g-tab.active {
    color: #818cf8;
    border-bottom-color: #818cf8;
    font-weight: 600;
}

.g-result-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-decoration: none;
}

.g-result-breadcrumb {
    font-size: 0.78rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.g-result-breadcrumb span {
    color: #94a3b8;
    font-weight: 500;
}

.g-result-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #818cf8;
    line-height: 1.35;
    transition: color 0.15s;
}
.g-result-item:hover .g-result-title {
    color: #a5b4fc;
    text-decoration: underline;
}

.g-result-snippet {
    font-size: 0.9rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin-top: 0.1rem;
}

mark {
    background: rgba(245, 158, 11, 0.25);
    color: #fef08a;
    padding: 0.05rem 0.2rem;
    border-radius: 2px;
}
</style>

<script>
let currentFilter = 'all';
let searchIndex = null;

async function initSearchEngine() {
    const statusText = document.getElementById('status-text');
    try {
        statusText.innerText = 'インデックスをロード中...';
        
        const [indexRes, synRes, conceptRes] = await Promise.all([
            fetch('./search_index.json'),
            fetch('./data/synonyms.json').catch(() => null),
            fetch('./data/concept_config.json').catch(() => null)
        ]);

        if (!indexRes.ok) {
            throw new Error('search_index.json のロードに失敗しました');
        }
        searchIndex = await indexRes.json();

        if (synRes && synRes.ok && window.SynonymExpander) {
            const synData = await synRes.json();
            window.SynonymExpander.setSynonymMap(synData);
        }
        if (conceptRes && conceptRes.ok && window.SemanticScorer) {
            const conceptData = await conceptRes.json();
            window.SemanticScorer.setConceptConfig(conceptData);
        }

        statusText.innerHTML = '全 ' + (searchIndex.docs ? searchIndex.docs.length : 0) + ' 項目中から検索可能';
        
        // 初回検索実行
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        if (q) {
            document.getElementById('portal-search-input').value = q;
        }
        performPortalSearch();
    } catch (err) {
        console.error('Search init error:', err);
        statusText.innerHTML = '⚠️ エラー: ' + err.message;
    }
}

function setFilter(filter, el) {
    currentFilter = filter;
    document.querySelectorAll('.g-tab').forEach(tab => tab.classList.remove('active'));
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
    if (!searchIndex || !searchIndex.docs) return;

    let results = [];

    if (!query) {
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

    // カテゴリーフィルター
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

    countEl.innerText = '約 ' + results.length + ' 件';

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="padding: 2rem 0; color: #94a3b8; font-size: 0.95rem;">
                「<strong style="color: #f1f5f9;">${query}</strong>」に一致する情報は見つかりませんでした。
                <ul style="margin-top: 0.5rem; padding-left: 1.2rem; color: #64748b; font-size: 0.85rem;">
                    <li>キーワードに誤字・脱字がないか確認してください</li>
                    <li>別のキーワードや一般的な言葉に置き換えてみてください</li>
                </ul>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.slice(0, 40).map(doc => {
        const title = doc.name || doc.title || '無題ドキュメント';
        const summary = doc.summary || '詳細解説ドキュメント';
        const rawUrl = doc.url || (doc.id ? doc.id + '.html' : '#');
        const url = rawUrl.endsWith('.html') ? rawUrl : rawUrl + '.html';
        
        let pathBreadcrumb = '総合情報';
        if (url.includes('glossary')) pathBreadcrumb = '用語辞書 › ' + title;
        else if (url.includes('syllabus')) pathBreadcrumb = 'シラバス › ' + title;
        else if (url.includes('subject_b')) pathBreadcrumb = '科目B演習 › ' + title;
        else if (url.includes('scenarios')) pathBreadcrumb = '攻撃シナリオ › ' + title;

        let highlightedSummary = summary;
        if (query) {
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlightedSummary = summary.replace(regex, '<mark>$1</mark>');
        }

        return `
            <a href="${url}" class="g-result-item">
                <div class="g-result-breadcrumb">📄 <span>${pathBreadcrumb}</span></div>
                <div class="g-result-title">${title}</div>
                <div class="g-result-snippet">${highlightedSummary}</div>
            </a>
        `;
    }).join('');
}

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
