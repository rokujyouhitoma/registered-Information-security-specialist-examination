/**
 * @fileoverview 検索エンジン Web Worker (Search Engine Web Worker)
 * SA 提案 (Priority 1) および IR ハイブリッド検索 (Issue 060) 対応
 */

// Worker スコープでのスクリプト非同期ロード (シノニム拡張 A & 密概念 B)
importScripts('tokenizer.js', 'vector_scorer.js', 'synonym_expander.js', 'semantic_scorer.js', 'fm_index_engine.js');

let searchEngineInstance = null;

self.onmessage = async function(e) {
    const { action, query, topK, dataPath } = e.data;

    if (action === 'INIT') {
        try {
            // 外部 JSON データの動的ロード (データ駆動設計)
            try {
                const [synRes, conceptRes, stopRes] = await Promise.all([
                    fetch('data/synonyms.json').catch(() => null),
                    fetch('data/concept_config.json').catch(() => null),
                    fetch('data/stopwords.json').catch(() => null)
                ]);
                if (synRes && synRes.ok && self.SynonymExpander) {
                    const synData = await synRes.json();
                    self.SynonymExpander.setSynonymMap(synData);
                }
                if (conceptRes && conceptRes.ok && self.SemanticScorer) {
                    const conceptData = await conceptRes.json();
                    self.SemanticScorer.setConceptConfig(conceptData);
                }
                if (stopRes && stopRes.ok && self.Tokenizer) {
                    const stopData = await stopRes.json();
                    self.Tokenizer.setStopWords(stopData);
                }
            } catch (ignoreErr) {}

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
