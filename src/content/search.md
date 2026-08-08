# 🔍 全文検索

<div class="google-search-container" style="max-width: 800px; margin: 1.5rem 0 3rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    
    <!-- Google Style Search Input Box -->
    <div style="position: relative; margin-bottom: 1.25rem;">
        <div style="position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: #94a3b8; pointer-events: none;">🔍</div>
        <input type="text" id="portal-search-input" placeholder="検索ワードを入力 (例: TLS 1.3, ゼロトラスト, OAuth 2.0, DMARC, PKI)..." autofocus />
        <button id="clear-search-btn" onclick="clearSearchInput()">✕</button>
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
    <div id="search-status-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #64748b; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div id="status-text">インデックス準備中...</div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div id="results-count"></div>
            <button id="dev-mode-toggle" onclick="toggleDevMode()" style="background: rgba(255,255,255,0.05); color: #64748b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 0.2rem 0.6rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s;">🛠️ Dev Mode: OFF</button>
        </div>
    </div>

    <!-- Results List (Google Search Result Style) -->
    <div id="search-results-list" style="display: flex; flex-direction: column; gap: 1.75rem;"></div>
</div>

<style>
#portal-search-input {
    width: 100%;
    padding: 0.9rem 2.8rem 0.9rem 2.8rem;
    font-size: 1.05rem;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    color: #ffffff;
    outline: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
#portal-search-input:focus {
    border-color: #818cf8;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
}
#clear-search-btn {
    position: absolute;
    right: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 1.1rem;
    cursor: pointer;
    display: none;
}
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
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 0.92rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.4rem 0.2rem;
    position: relative;
    transition: color 0.15s ease;
}
.g-tab:hover {
    color: #f1f5f9;
}
.g-tab.active {
    color: #818cf8;
    font-weight: 600;
}
.g-tab.active::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    right: 0;
    height: 3px;
    background: #6366f1;
    border-radius: 3px 3px 0 0;
}

.g-result-item {
    text-decoration: none;
    display: block;
    transition: transform 0.15s ease;
}
.g-result-item:hover {
    transform: translateX(4px);
}
.g-result-breadcrumb {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.g-result-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #818cf8;
    line-height: 1.35;
    margin-bottom: 0.35rem;
}
.g-result-item:hover .g-result-title {
    text-decoration: underline;
    color: #a5b4fc;
}
.g-result-snippet {
    font-size: 0.9rem;
    color: #cbd5e1;
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.g-result-snippet mark {
    background: rgba(234, 179, 8, 0.3);
    color: #fde047;
    font-weight: 700;
    padding: 0.05rem 0.3rem;
    border-radius: 4px;
    border: 1px solid rgba(234, 179, 8, 0.5);
}
</style>

<script>
var searchEngine = window.searchEngine || null;
var activeFilter = 'all';

function clearSearchInput() {
    const input = document.getElementById('portal-search-input');
    if (input) {
        input.value = '';
        input.focus();
        performPortalSearch();
    }
}

async function fetchWithFallback(pathList) {
    for (let i = 0; i < pathList.length; i++) {
        try {
            const res = await fetch(pathList[i]);
            if (res.ok) return res;
        } catch (e) {
            // try next
        }
    }
    throw new Error('All path attempts failed for ' + pathList[0]);
}

async function ensureCustomSearchEngineLoaded() {
    if (typeof CustomSearchEngine !== 'undefined') return;

    const loc = window.location.pathname;
    let base = './';
    if (loc.endsWith('/search/') || loc.indexOf('/search/') !== -1) {
        base = '../';
    }

    const scripts = [
        'js/security_validator.js',
        'js/tokenizer.js',
        'js/vector_scorer.js',
        'js/synonym_expander.js',
        'js/semantic_scorer.js',
        'js/string_compression.js',
        'js/fm_index_engine.js'
    ];

    for (const s of scripts) {
        await new Promise((resolve) => {
            const el = document.createElement('script');
            el.src = base + s;
            el.onload = resolve;
            el.onerror = resolve;
            document.head.appendChild(el);
        });
    }

    if (typeof CustomSearchEngine === 'undefined') {
        await new Promise((resolve) => {
            const el = document.createElement('script');
            el.src = base + 'fm_index_engine.min.js';
            el.onload = resolve;
            el.onerror = resolve;
            document.head.appendChild(el);
        });
    }
}

var devModeActive = localStorage.getItem('dev_debug_mode') === null ? true : localStorage.getItem('dev_debug_mode') === 'true';

function updateDevModeUI() {
    const btn = document.getElementById('dev-mode-toggle');
    if (btn) {
        btn.innerText = devModeActive ? '🛠️ Dev Mode: ON [d]' : '🛠️ Dev Mode: OFF [d]';
        btn.style.color = devModeActive ? '#818cf8' : '#64748b';
        btn.style.borderColor = devModeActive ? '#6366f1' : 'rgba(255,255,255,0.1)';
        btn.style.background = devModeActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.05)';
    }
}

function toggleDevMode() {
    devModeActive = !devModeActive;
    localStorage.setItem('dev_debug_mode', devModeActive);
    updateDevModeUI();
    performPortalSearch();
}

async function initSearchEngine() {
    const statusText = document.getElementById('status-text');
    updateDevModeUI();

    try {
        await ensureCustomSearchEngineLoaded();

        if (typeof CustomSearchEngine === 'undefined') {
            throw new Error('CustomSearchEngine is not defined. Please check script load order.');
        }

        searchEngine = new CustomSearchEngine();
        
        const indexRes = await fetchWithFallback(['search_index.json', './search_index.json', '../search_index.json', '/registered-information-security-specialist-examination/search_index.json']);
        const indexData = await indexRes.json();
        searchEngine.docs = indexData.docs || [];
        searchEngine.idf = indexData.idf || {};
        searchEngine.vectors = indexData.vectors || {};
        if (typeof searchEngine._buildInvertedIndex === 'function') {
            searchEngine._buildInvertedIndex();
        }
        searchEngine.isLoaded = true;
        
        try {
            const synonymsRes = await fetchWithFallback(['data/synonyms.json', './data/synonyms.json', '../data/synonyms.json', '/registered-information-security-specialist-examination/data/synonyms.json']);
            const synonyms = await synonymsRes.json();
            if (window.SynonymExpander) SynonymExpander.setSynonymMap(synonyms);
        } catch (e) {
            console.warn('Synonyms load warning:', e);
        }

        try {
            const conceptRes = await fetchWithFallback(['data/concept_config.json', './data/concept_config.json', '../data/concept_config.json', '/registered-information-security-specialist-examination/data/concept_config.json']);
            const conceptConfig = await conceptRes.json();
            if (window.SemanticScorer) SemanticScorer.setConceptConfig(conceptConfig);
        } catch (e) {
            console.warn('Concept config load warning:', e);
        }

        statusText.innerHTML = `✅ 検索インデックスロード完了 (${searchEngine.docs.length} 件のドキュメント)`;
        performPortalSearch();
    } catch (err) {
        console.error('Search index load error:', err);
        statusText.innerHTML = `⚠️ 検索インデックスのロードに失敗しました (${err.message})`;
    }
}

function quickSearch(term) {
    const input = document.getElementById('portal-search-input');
    if (input) {
        input.value = term;
        input.focus();
        performPortalSearch();
    }
}

function setFilter(filterName, btn) {
    activeFilter = filterName;
    document.querySelectorAll('.g-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    performPortalSearch();
}

function performPortalSearch() {
    const input = document.getElementById('portal-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const query = input ? input.value.trim() : '';

    if (clearBtn) {
        clearBtn.style.display = query ? 'block' : 'none';
    }

    if (!searchEngine || !searchEngine.isLoaded) return;

    let results = query ? searchEngine.search(query, 100) : searchEngine.docs;

    if (activeFilter !== 'all') {
        results = results.filter(doc => {
            const url = doc.url || (doc.id ? doc.id + '.html' : '');
            if (activeFilter === 'glossary') return url.includes('glossary');
            if (activeFilter === 'syllabus') return url.includes('syllabus');
            if (activeFilter === 'subject_b') return url.includes('subject_b');
            if (activeFilter === 'scenarios') return url.includes('scenarios');
            return true;
        });
    }

    renderResults(query, results);
}

function renderResults(query, results) {
    const resultsContainer = document.getElementById('search-results-list');
    const countEl = document.getElementById('results-count');

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
        
        // URL 分割処理 (ベースパスとアンカーハッシュ # の完全分離)
        let baseUrl = rawUrl;
        let anchorHash = '';
        if (rawUrl.includes('#')) {
            const parts = rawUrl.split('#');
            baseUrl = parts[0];
            anchorHash = '#' + parts.slice(1).join('#');
        }

        if (baseUrl && !baseUrl.endsWith('.html') && !baseUrl.endsWith('/')) {
            baseUrl += '.html';
        }

        if (baseUrl.startsWith('./')) {
            baseUrl = baseUrl.substring(2);
        }

        // 現在の閲覧ページパスに応じた相対階層プレフィックスの解決
        const loc = window.location.pathname;
        let prefix = './';
        if (loc.endsWith('/search/') || loc.indexOf('/search/') !== -1) {
            if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://') && !baseUrl.startsWith('/')) {
                prefix = '../';
            }
        }

        const url = prefix + baseUrl + anchorHash;
        
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

        let matchTypeBadge = '🧠 概念・同義語近似';
        const docNameLower = title.toLowerCase();
        const qLower = query ? query.toLowerCase().trim() : '';
        if (qLower) {
            if (docNameLower === qLower) matchTypeBadge = '🎯 タイトル完全一致';
            else if (docNameLower.includes(qLower)) matchTypeBadge = '🔤 タイトル部分一致';
            else if (summary.toLowerCase().includes(qLower)) matchTypeBadge = '📄 概要文一致';
        }
        const scoreVal = typeof doc.score === 'number' ? doc.score : (parseFloat(doc.score) || 0);
        const docId = doc.id || doc.url || title;

        const devBadgesHtml = devModeActive ? `
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem; margin-bottom: 0.15rem;">
                <span style="background: rgba(148, 163, 184, 0.12); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); padding: 0.08rem 0.45rem; border-radius: 8px; font-size: 0.72rem; font-family: monospace;">🔑 ID: ${docId}</span>
                <span style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); padding: 0.08rem 0.45rem; border-radius: 8px; font-size: 0.72rem; font-weight: 700; font-family: monospace;">⚡ Score: ${scoreVal.toFixed(2)}</span>
                <span style="background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.08rem 0.45rem; border-radius: 8px; font-size: 0.72rem;">${matchTypeBadge}</span>
            </div>
        ` : '';

        return `
            <a href="${url}" class="g-result-item">
                <div class="g-result-breadcrumb">📄 <span>${pathBreadcrumb}</span></div>
                <div class="g-result-title">${title}</div>
                <div class="g-result-snippet">${highlightedSummary}</div>
                ${devBadgesHtml}
            </a>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    updateDevModeUI();
    initSearchEngine();

    const input = document.getElementById('portal-search-input');
    if (input) {
        input.addEventListener('input', performPortalSearch);
    }

    document.addEventListener('keydown', (e) => {
        const isInputFocused = document.activeElement === input || (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'));

        // Yuzora 準拠キーバインド: 'd' / 'D' (テキスト入力時を除く) または Ctrl+Shift+D で Dev Mode トグル
        if ((e.key === 'd' || e.key === 'D') && !isInputFocused && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            toggleDevMode();
        } else if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey) && e.shiftKey) {
            e.preventDefault();
            toggleDevMode();
        } else if (e.key === 'Escape') {
            if (devModeActive) {
                devModeActive = false;
                localStorage.setItem('dev_debug_mode', false);
                updateDevModeUI();
                performPortalSearch();
            } else if (isInputFocused && input) {
                input.value = '';
                performPortalSearch();
            }
        } else if (e.key === '/' && !isInputFocused) {
            e.preventDefault();
            if (input) input.focus();
        }
    });
});
</script>
