/**
 * @fileoverview 検索エンジン Web Worker (Search Engine Web Worker)
 * SA 提案 (Priority 1) および IR ハイブリッド検索 (Issue 060) 対応
 */

// Worker スコープでのスクリプト非同期ロード (セキュリティ A & シノニム B & 密概念 C)
importScripts('security_validator.js', 'tokenizer.js', 'vector_scorer.js', 'synonym_expander.js', 'semantic_scorer.js', 'fm_index_engine.js');

let searchEngineInstance = null;

/**
 * @private
 * 単一 JSON リソースを取得する汎用ヘルパー
 * @param {string} url
 * @return {Promise<any>}
 */
async function _fetchJsonResource(url) {
    try {
        const res = await fetch(url);
        return (res && res.ok) ? await res.json() : null;
    } catch (e) {
        return null;
    }
}

/**
 * @private
 * シノニム・概念構成・ストップワードの各外部データ動的取得ヘルパー
 */
async function _fetchAndSetDynamicData() {
    const [synData, conceptData, stopData] = await Promise.all([
        _fetchJsonResource('data/synonyms.json'),
        _fetchJsonResource('data/concept_config.json'),
        _fetchJsonResource('data/stopwords.json')
    ]);

    if (synData && self.SynonymExpander) self.SynonymExpander.setSynonymMap(synData);
    if (conceptData && self.SemanticScorer) self.SemanticScorer.setConceptConfig(conceptData);
    if (stopData && self.Tokenizer) self.Tokenizer.setStopWords(stopData);
}

/**
 * @private
 * Worker 初期化アクション処理
 * @param {string} dataPath
 */
async function _handleInitAction(dataPath) {
    try {
        await _fetchAndSetDynamicData();

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
}

/**
 * @private
 * Worker 検索実行アクション処理
 * @param {string} query
 * @param {number} topK
 */
function _handleSearchAction(query, topK) {
    if (!searchEngineInstance || !searchEngineInstance.isLoaded) {
        self.postMessage({ status: 'ERROR', error: 'Search engine is not initialized' });
        return;
    }
    const results = searchEngineInstance.search(query || '', topK || 10);
    self.postMessage({ status: 'RESULTS', query, results });
}

self.onmessage = async function(e) {
    const { action, query, topK, dataPath } = e.data;
    if (action === 'INIT') {
        await _handleInitAction(dataPath);
    } else if (action === 'SEARCH') {
        _handleSearchAction(query, topK);
    }
};
