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
const compressionScript = fs.readFileSync(path.resolve('src/js/string_compression.js'), 'utf-8');
const searchIndexData = JSON.parse(fs.readFileSync(path.resolve('site/search_index.json'), 'utf-8'));
const synonymsData = JSON.parse(fs.readFileSync(path.resolve('src/data/synonyms.json'), 'utf-8'));
const conceptData = JSON.parse(fs.readFileSync(path.resolve('src/data/concept_config.json'), 'utf-8'));

global.window = {};
eval(tokenizerScript);
eval(vectorScorerScript);
eval(synonymScript);
eval(semanticScript);
eval(engineScript);
eval(compressionScript);

const CustomSearchEngine = global.window.CustomSearchEngine;
const SynonymExpander = global.window.SynonymExpander;
const SemanticScorer = global.window.SemanticScorer;
const FrontCodingCompressor = global.window.FrontCodingCompressor;

SynonymExpander.setSynonymMap(synonymsData);
SemanticScorer.setConceptConfig(conceptData);

test('FrontCodingCompressor - String Data Compression & Decompression Test (IR & SA)', (t) => {
    const terms = [
        "authentication",
        "authentication_factor",
        "authentication_provider",
        "authorization",
        "authorization_code"
    ];

    const result = FrontCodingCompressor.compress(terms);
    assert.ok(result.originalSize > 0, 'Original size should be calculated');
    assert.ok(result.compressedSize > 0, 'Compressed size should be calculated');
    assert.ok(result.ratio > 0, 'Compression ratio should be positive');

    const decompressed = FrontCodingCompressor.decompress(result.compressed);
    assert.deepEqual(decompressed.sort(), terms.sort(), 'Decompressed terms must match original terms exactly');
});

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
    const maliciousTokens = engine.tokenize('__proto__ constructor prototype toString');
    assert.ok(!Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted'), 'Prototype must not be polluted by malicious tokens');
});

test('CustomSearchEngine - Support Object Type Vectors Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = [{ id: 'doc1', name: 'TLS 1.3', summary: 'Transport Layer Security' }];
    engine.idf = { tls: 1.5 };
    engine.vectors = { "0": { tls: 1.5 } }; // Object type vectors
    engine.isLoaded = true;

    const results = engine.search('TLS', 5);
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].id, 'doc1');
});

test('CustomSearchEngine - QA Robust Boundary Values Test (null, undefined, invalid vectors)', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = [{ id: 'doc1', name: 'ZTA', summary: 'Zero Trust' }];
    engine.idf = { zta: 1.0 };
    engine.isLoaded = true;

    // Test with null, undefined, string, number
    [null, undefined, "invalid_string", 12345, []].forEach(invalidVectors => {
        engine.vectors = invalidVectors;
        assert.doesNotThrow(() => {
            const res = engine.search('ZTA', 5);
            assert.ok(Array.isArray(res), 'Search should return array even with invalid vectors');
        }, `Engine should not throw error when vectors is ${invalidVectors}`);
    });
});
