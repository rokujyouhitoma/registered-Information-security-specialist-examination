import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境でブラウザ用 JS モジュールを読み込む評価環境
const tokenizerScript = fs.readFileSync(path.resolve('src/js/tokenizer.js'), 'utf-8');
const vectorScorerScript = fs.readFileSync(path.resolve('src/js/vector_scorer.js'), 'utf-8');
const synonymScript = fs.readFileSync(path.resolve('src/js/synonym_expander.js'), 'utf-8');
const semanticScript = fs.readFileSync(path.resolve('src/js/semantic_scorer.js'), 'utf-8');
const engineScript = fs.readFileSync(path.resolve('src/js/fm_index_engine.js'), 'utf-8');
const searchIndexData = JSON.parse(fs.readFileSync(path.resolve('site/search_index.json'), 'utf-8'));

global.window = {};
eval(tokenizerScript);
eval(vectorScorerScript);
eval(synonymScript);
eval(semanticScript);
eval(engineScript);

const CustomSearchEngine = global.window.CustomSearchEngine;
const SynonymExpander = global.window.SynonymExpander;

test('Tokenizer - English and Japanese Normalization Test', (t) => {
    const engine = new CustomSearchEngine();
    const tokens = engine.tokenize('TLS 1.3 Protocol & Cryptography!');
    assert.ok(tokens.includes('tls'), 'Token should contain lowercase tls');
    assert.ok(tokens.includes('protocol'), 'Token should contain lowercase protocol');
    assert.ok(tokens.includes('cryptography'), 'Token should contain lowercase cryptography');

    const jpTokens = engine.tokenize('情報セキュリティ安全確保支援士');
    assert.ok(jpTokens.includes('情報セキュリティ安全確保支援士'), 'Token should contain full Japanese phrase');
});

test('SynonymExpander - Brand to Technology Concept Expansion Test (Yamaha -> Router/IPsec)', (t) => {
    const expanded = SynonymExpander.expandTokens(['ヤマハ']);
    assert.ok(expanded.includes('ルーター'), 'Yamaha query must expand to ルーター');
    assert.ok(expanded.includes('vpn'), 'Yamaha query must expand to vpn');
    assert.ok(expanded.includes('ipsec'), 'Yamaha query must expand to ipsec');
});

test('CustomSearchEngine - Hybrid Search Execution for Yamaha Query Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine.isLoaded = true;

    const results = engine.search('ヤマハ', 5);
    assert.ok(results.length > 0, 'Hybrid search should return relevant documents for ヤマハ query');
    const hasNetworkDoc = results.some(r => (r.name + ' ' + r.summary).includes('ネットワーク') || (r.name + ' ' + r.summary).includes('暗号') || (r.name + ' ' + r.summary).includes('通信'));
    assert.ok(hasNetworkDoc, 'Search results for ヤマハ must contain relevant network/VPN security documents');
});

test('Tokenizer & SearchEngine - Prototype Pollution Guard Test', (t) => {
    const engine = new CustomSearchEngine();
    const toxicTokens = engine.tokenize('__proto__ constructor prototype toString valueOf');
    assert.ok(Array.isArray(toxicTokens), 'Tokens should be returned as an array');
    assert.ok(!toxicTokens.includes('__proto__'), 'Toxic key __proto__ must be filtered out');

    assert.doesNotThrow(() => {
        engine.search('__proto__');
        engine.search('constructor');
    }, 'Search execution with toxic prototype keys should not throw an exception');
});
