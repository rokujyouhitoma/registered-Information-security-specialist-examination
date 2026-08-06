import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境で fm_index_engine.js を読み込むための評価環境
const tokenizerScript = fs.readFileSync(path.resolve('site/js/tokenizer.js'), 'utf-8');
const vectorScorerScript = fs.readFileSync(path.resolve('site/js/vector_scorer.js'), 'utf-8');
const engineScript = fs.readFileSync(path.resolve('site/js/fm_index_engine.js'), 'utf-8');
const searchIndexData = JSON.parse(fs.readFileSync(path.resolve('site/search_index.json'), 'utf-8'));

global.window = {};
eval(tokenizerScript);
eval(vectorScorerScript);
eval(engineScript);

const CustomSearchEngine = global.window.CustomSearchEngine;

test('CustomSearchEngine Tokenizer Test', (t) => {
    const engine = new CustomSearchEngine();
    const tokens = engine.tokenize('TLS 1.3 Protocol');
    assert.ok(tokens.includes('tls'), 'Token should contain lowercase tls');
    assert.ok(tokens.includes('protocol'), 'Token should contain lowercase protocol');

    const jpTokens = engine.tokenize('セキュリティ');
    assert.ok(jpTokens.includes('セキュリティ'), 'Token should contain full Japanese word');
    assert.ok(jpTokens.includes('セキ'), 'Token should contain Bigram セキ');
});

test('CustomSearchEngine Prototype Pollution Protection Test', (t) => {
    const engine = new CustomSearchEngine();
    const tokens = engine.tokenize('__proto__ constructor toString');
    assert.ok(Array.isArray(tokens), 'Tokens should be an array');
    assert.doesNotThrow(() => {
        engine.search('__proto__');
    }, 'Search with __proto__ query should not throw');
});

test('CustomSearchEngine Inverted Index Construction Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine._buildInvertedIndex();

    assert.ok(engine.invertedIndex['tls'], 'Inverted index should contain entry for tls');
    assert.ok(Array.isArray(engine.invertedIndex['tls']), 'Inverted index entry should be an array of doc IDs');
});

test('CustomSearchEngine BM25 Search Execution Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine.isLoaded = true;

    const results = engine.search('TLS', 5);
    assert.ok(results.length > 0, 'Search should return matching results for TLS');
    assert.ok(results[0].name.toLowerCase().includes('tls'), 'Top result should be related to TLS');

    const jpResults = engine.search('セキュリティ', 5);
    assert.ok(jpResults.length > 0, 'Search should return matching results for Japanese query セキュリティ');
});
