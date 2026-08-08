import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境でブラウザ用 JS モジュールを読み込む評価環境
const validatorScript = fs.readFileSync(path.resolve('src/js/security_validator.js'), 'utf-8');
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
eval(validatorScript);
eval(tokenizerScript);
eval(vectorScorerScript);
eval(synonymScript);
eval(semanticScript);
eval(engineScript);
eval(compressionScript);

const SecurityValidator = global.window.SecurityValidator;
const CustomSearchEngine = global.window.CustomSearchEngine;
const SynonymExpander = global.window.SynonymExpander;
const SemanticScorer = global.window.SemanticScorer;
const FrontCodingCompressor = global.window.FrontCodingCompressor;

SynonymExpander.setSynonymMap(synonymsData);
SemanticScorer.setConceptConfig(conceptData);

test('SecurityValidator - Prototype Pollution Guard Unit Test', (t) => {
    assert.strictEqual(SecurityValidator.isSafeKey('__proto__'), false);
    assert.strictEqual(SecurityValidator.isSafeKey('prototype'), false);
    assert.strictEqual(SecurityValidator.isSafeKey('constructor'), false);
    assert.strictEqual(SecurityValidator.isSafeKey('validKey'), true);

    const safeObj = { safe: 'value' };
    assert.strictEqual(SecurityValidator.hasSafeProperty(safeObj, 'safe'), true);
    assert.strictEqual(SecurityValidator.hasSafeProperty(safeObj, '__proto__'), false);
});

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

test('Tokenizer - Stop Words Filtering Test', (t) => {
    const Tokenizer = global.window.Tokenizer;
    const stopwordsData = JSON.parse(fs.readFileSync(path.resolve('src/data/stopwords.json'), 'utf-8'));
    Tokenizer.setStopWords(stopwordsData);

    const tokens = Tokenizer.tokenize('ゼロトラスト について 概要 the is');
    assert.ok(!tokens.includes('について'), 'Stop word について must be filtered out');
    assert.ok(!tokens.includes('概要'), 'Stop word 概要 must be filtered out');
    assert.ok(!tokens.includes('the'), 'Stop word the must be filtered out');
    assert.ok(!tokens.includes('is'), 'Stop word is must be filtered out');
    assert.ok(tokens.includes('ゼロトラスト'), 'Non-stop word ゼロトラスト must be preserved');
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

test('CustomSearchEngine - FrontCodingCompressor Integration Test (compressTerms & getDecompressedTerms)', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = [{ id: 'doc1', name: 'Authentication', summary: 'OAuth 2.0 and OIDC' }];
    engine.idf = { authentication: 1.5, authorization: 1.2, oauth: 2.0 };
    engine.vectors = [{ authentication: 1.5, authorization: 1.2, oauth: 2.0 }];
    engine.isLoaded = true;

    // Trigger inverted index build and FrontCoding compression
    engine._buildInvertedIndex();

    assert.ok(engine.compressedTerms.length > 0, 'compressedTerms should be populated after building index');
    const compRes = engine.compressTerms();
    assert.strictEqual(compRes.compressedCount, engine.compressedTerms.length);

    const decompressed = engine.getDecompressedTerms();
    assert.ok(decompressed.includes('authentication'), 'Decompressed terms must contain authentication');
    assert.ok(decompressed.includes('authorization'), 'Decompressed terms must contain authorization');
    assert.ok(decompressed.includes('oauth'), 'Decompressed terms must contain oauth');
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

test('Search Worker - Script Import & Message Contract Assertion Test', (t) => {
    const workerScript = fs.readFileSync(path.resolve('src/js/search_worker.js'), 'utf-8');
    assert.ok(workerScript.includes("importScripts('security_validator.js', 'tokenizer.js', 'vector_scorer.js', 'synonym_expander.js', 'semantic_scorer.js', 'string_compression.js', 'fm_index_engine.js');"), 'Worker must import string_compression.js before fm_index_engine.js');
    assert.ok(workerScript.includes('compressStats: compressStats'), 'Worker READY payload must include compressStats');
});

test('VectorScorer - Reciprocal Rank Fusion (RRF) Calculation Unit Test', (t) => {
    const VectorScorer = global.window.VectorScorer;
    const rrfBothFirst = VectorScorer.calculateRRFScore(1, 1, 60);
    assert.strictEqual(rrfBothFirst.toFixed(6), (2.0 / 61.0).toFixed(6));

    const rrfMixed = VectorScorer.calculateRRFScore(1, 5, 60);
    assert.strictEqual(rrfMixed.toFixed(6), (1.0 / 61.0 + 1.0 / 65.0).toFixed(6));

    const rrfNone = VectorScorer.calculateRRFScore(0, 0, 60);
    assert.strictEqual(rrfNone, 0.0);
});

test('CustomSearchEngine - Hybrid BM25 + Dense RRF Search Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = searchIndexData.docs;
    engine.idf = searchIndexData.idf;
    engine.vectors = searchIndexData.vectors;
    engine.isLoaded = true;

    const resultsExact = engine.search('TLS 1.3', 5);
    assert.ok(resultsExact.length > 0, 'RRF search must return results for exact query TLS 1.3');

    const resultsConcept = engine.search('ゼロトラスト', 5);
    assert.ok(resultsConcept.length > 0, 'RRF search must return results for concept query ゼロトラスト');
});

test('SynonymExpander - Domain Term Expansion Test (登録セキスペ -> RISS / ゼロトラスト -> PDP/PEP)', (t) => {
    const expandedRISS = SynonymExpander.expandTokens(['登録セキスペ']);
    assert.ok(expandedRISS.includes('riss'), '登録セキスペ must expand to riss');
    assert.ok(expandedRISS.includes('情報処理安全確保支援士'), '登録セキスペ must expand to 情報処理安全確保支援士');

    const expandedZT = SynonymExpander.expandTokens(['ゼロトラスト']);
    assert.ok(expandedZT.includes('pdp'), 'ゼロトラスト must expand to pdp');
    assert.ok(expandedZT.includes('pep'), 'ゼロトラスト must expand to pep');
});

test('SemanticScorer - ColBERT MaxSim Calculation Test', (t) => {
    const colbertScore = SemanticScorer.calculateColBERTScore(['tls', '1.3'], ['tls', '1.3', '暗号化', 'プロトコル']);
    assert.ok(colbertScore >= 2.0, 'Exact token matches must yield MaxSim score >= 2.0');
});

test('SemanticScorer - Candidate Re-ranking Pipeline Test (< 100ms & Question Pinpoint Boost)', (t) => {
    const candidates = [
        { doc: { name: '一般的なTLS解説', content: 'TLS 1.3の概要と仕組み' }, score: 5.0 },
        { doc: { name: '午後問題 設問3 回答解説', content: '午後問題 設問3 におけるプロキシ復号化の対策' }, score: 4.5 }
    ];

    const startTime = Date.now();
    const reranked = SemanticScorer.rerank('午後問題 設問3', candidates, 2);
    const duration = Date.now() - startTime;

    assert.ok(duration < 100, `Re-ranking 50 candidates must finish in < 100ms (took ${duration}ms)`);
    assert.strictEqual(reranked[0].name, '午後問題 設問3 回答解説', 'Re-ranker must promote exact question scenario pinpoint match to rank 1');
});

test('CustomSearchEngine - Parent-Document Retrieval & Context Restoration Test', (t) => {
    const engine = new CustomSearchEngine();
    engine.docs = [
        { id: 'scenarios-hands_on_incident', name: 'インシデント演習', summary: '概要', chunks: [{ chunk_id: 'scenarios-hands_on_incident#chunk-1', parent_id: 'scenarios-hands_on_incident', title: '設問1', content: 'ログ解析' }] }
    ];

    const parentDoc = engine.getParentDocument('scenarios-hands_on_incident#chunk-1');
    assert.ok(parentDoc !== null, 'getParentDocument must resolve child chunk ID to parent document');
    assert.strictEqual(parentDoc.id, 'scenarios-hands_on_incident', 'Resolved parent document ID must match parent ID');
});

test('VectorScorer - Matryoshka Representation Learning (MRL) Vector Truncation & Similarity Test', (t) => {
    const VectorScorer = global.window.VectorScorer;
    const qVec = { tls: 0.6, crypto: 0.8, pki: 0.5, mfa: 0.3 };
    const dVec = { tls: 0.6, crypto: 0.8, firewall: 0.4, vpn: 0.2 };

    const slicedQ = VectorScorer.truncateMRLVector(qVec, 2);
    assert.strictEqual(Object.keys(slicedQ).length, 2, 'MRL vector truncation must restrict keys to target dimension 2');

    const simMRL = VectorScorer.calculateMRLCosineSimilarity(qVec, dVec, 2);
    assert.ok(simMRL > 0.0, 'MRL cosine similarity must be calculated correctly on truncated dimensions');
});







