/**
 * @fileoverview 検索エンジン Web Worker (Search Engine Web Worker)
 * SA 提案 (Priority 1) による UI メインスレッド完全非同期化
 */

// Worker スコープでのスクリプト非同期ロード
importScripts('tokenizer.js', 'vector_scorer.js', 'fm_index_engine.js');

let searchEngineInstance = null;

self.onmessage = async function(e) {
    const { action, query, topK, dataPath } = e.data;

    if (action === 'INIT') {
        try {
            searchEngineInstance = new self.CustomSearchEngine();
            const response = await fetch(dataPath || 'search_index.json');
            const data = await response.json();
            searchEngineInstance.docs = data.docs || [];
            searchEngineInstance.idf = data.idf || {};
            searchEngineInstance.vectors = data.vectors || {};
            searchEngineInstance._buildInvertedIndex();
            searchEngineInstance.isLoaded = true;

            self.postMessage({ status: 'READY', totalDocs: searchEngineInstance.docs.length });
        } catch (err) {
            self.postMessage({ status: 'ERROR', error: err.message });
        }
    } else if (action === 'SEARCH') {
        if (!searchEngineInstance || !searchEngineInstance.isLoaded) {
            self.postMessage({ status: 'ERROR', error: 'Search engine is not initialized' });
            return;
        }
        const results = searchEngineInstance.search(query || '', topK || 10);
        self.postMessage({ status: 'RESULTS', query, results });
    }
};
