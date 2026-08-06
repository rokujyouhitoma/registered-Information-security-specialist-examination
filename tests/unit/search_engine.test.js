import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境でブラウザ用 JS モジュールを読み込む評価環境
const tokenizerScript = fs.readFileSync(path.resolve('site/js/tokenizer.js'), 'utf-8');
const vectorScorerScript = fs.readFileSync(path.resolve('site/js/vector_scorer.js'), 'utf-8');
const engineScript = fs.readFileSync(path.resolve('site/js/fm_index_engine.js'), 'utf-8');
const searchIndexData = JSON.parse(fs.readFileSync(path.resolve('site/search_index.json'), 'utf-8'));

global.window = {};
eval(tokenizerScript);
eval(vectorScorerScript);
eval(engineScript);

const CustomSearchEngine = global.window.CustomSearchEngine;

test('Tokenizer - English and Japanese Normalization Test', (t) => {
    const engine = new CustomSearchEngine();
    const tokens = engine.tokenize('TLS 1.3 Protocol & Cryptography!');
    assert.ok(tokens.includes('tls'), 'Token should contain lowercase tls');
    assert.ok(tokens.includes('protocol'), 'Token should contain lowercase protocol');
    assert.ok(tokens.includes('cryptography'), 'Token should contain lowercase cryptography');

    const jpTokens = engine.tokenize('情報セキュリティ安全確保支援士');
    assert.ok(jpTokens.includes('情報セキュリティ安全確保支援士'), 'Token should contain full Japanese phrase');
    assert.ok(jpTokens.includes('情報'), 'Token should contain Bigram 情報');
    assert.ok(jpTokens.includes('セキ'), 'Token should contain Bigram セキ');
});

test('Tokenizer & SearchEngine - Prototype Pollution Guard Test', (t) => {
    const engine = new CustomSearchEngine();
    const toxicTokens = engine.tokenize('__proto__ constructor prototype toString valueOf');
    assert.ok(Array.isArray(toxicTokens), 'Tokens should be returned as an array');
    assert.ok(!toxicTokens.includes('__proto__'), 'Toxic key __proto__ must be filtered out');
    assert.ok(!toxicTokens.includes('constructor'), 'Toxic key constructor must be filtered out');

    assert.doesNotThrow(() => {
        engine.search('__proto__');
        engine.search('constructor');
        engine.search('toString');
    }, 'Search execution with toxic prototype keys should not throw an exception');
});

test('CustomSearchEngine - Inverted Index Dynamic Construction Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine._buildInvertedIndex();

    assert.ok(engine.invertedIndex, 'Inverted index object should exist');
    assert.ok(engine.invertedIndex['tls'], 'Inverted index should contain postings list for tls');
    assert.ok(Array.isArray(engine.invertedIndex['tls']), 'Postings list must be an array of doc IDs');
});

test('CustomSearchEngine - BM25 Scoring and Ranking Precision Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine.isLoaded = true;

    const tlsResults = engine.search('TLS', 5);
    assert.ok(tlsResults.length > 0, 'Search should return results for TLS');
    assert.ok(tlsResults[0].name.toLowerCase().includes('tls'), 'Top result should contain TLS in title');

    const secResults = engine.search('セキュリティ', 5);
    assert.ok(secResults.length > 0, 'Search should return results for セキュリティ');
    assert.ok(secResults[0].score > 0, 'Top result should have positive score');
});
