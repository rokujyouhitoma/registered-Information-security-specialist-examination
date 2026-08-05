import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境で fm_index_engine.js を読み込むための評価環境
const engineScript = fs.readFileSync(path.resolve('site/fm_index_engine.js'), 'utf-8');
const searchIndexData = JSON.parse(fs.readFileSync(path.resolve('site/search_index.json'), 'utf-8'));

// グローバル window モックの設定
global.window = {};
eval(engineScript);

const CustomSearchEngine = global.window.CustomSearchEngine;

test('CustomSearchEngine Tokenizer Test', (t) => {
    const engine = new CustomSearchEngine();
    const tokens = engine.tokenize('TLS 1.3 Protocol');
    assert.ok(tokens.includes('tls'), 'Token should contain lowercase tls');
    assert.ok(tokens.includes('protocol'), 'Token should contain lowercase protocol');
});

test('CustomSearchEngine Search Execution Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine.isLoaded = true;

    const results = engine.search('TLS', 5);
    assert.ok(results.length > 0, 'Search should return matching results for TLS');
    assert.ok(results[0].name.toLowerCase().includes('tls'), 'Top result should be related to TLS');
});
