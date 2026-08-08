/**
 * @fileoverview セマンティック概念スコアラー (Semantic Concept Scorer Module)
 * IR 提案 (アプローチ B) による密概念ベクトル類似度計算
 * データ駆動設計原則 (Data-Driven Design) に準拠
 */

class SemanticScorer {
    /**
     * 外部から概念設定データ (カテゴリ一覧およびキーワードマップ) をロード・設定する
     * @param {{categories: (?Array<string>|undefined), keywords: (?Object<string, !Array<string>>|undefined)}} config
     */
    static setConceptConfig(config) {
        if (config && typeof config === 'object') {
            if (Array.isArray(config.categories)) {
                SemanticScorer._categories = config.categories;
            }
            if (config.keywords && typeof config.keywords === 'object') {
                SemanticScorer._keywordsMap = config.keywords;
            }
        }
    }

    /**
     * キーのプロトタイプ汚染安全性を判定する (SecurityValidator へのプロキシ)
     * @param {string} key
     * @return {boolean}
     */
    static isSafeKey(key) {
        return (typeof SecurityValidator !== 'undefined')
            ? SecurityValidator.isSafeKey(key)
            : Boolean(key) && key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    }

    /**
     * 設定済みの主要セキュリティ概念カテゴリマッピングを取得
     * @return {!Array<string>}
     */
    static getConceptCategories() {
        return SemanticScorer._categories || [];
    }

    /**
     * 設定済みのキーワードマップを取得
     * @return {!Object<string, !Array<string>>}
     */
    static getKeywordsMap() {
        return SemanticScorer._keywordsMap || {};
    }

    /**
     * @private
     * 概念ベクトルの初期化ヘルパー
     * @param {!Array<string>} categories
     * @return {!Object<string, number>}
     */
    static _initConceptVector(categories) {
        const vec = Object.create(null);
        categories.forEach(cat => {
            if (SemanticScorer.isSafeKey(cat)) {
                vec[cat] = 0.0;
            }
        });
        return vec;
    }

    /**
     * @private
     * 単一トークンに対するカテゴリ出現度加算ヘルパー
     * @param {string} token
     * @param {!Array<string>} categories
     * @param {!Object<string, !Array<string>>} keywordsMap
     * @param {!Object<string, number>} vec
     */
    static _accumulateTokenCategories(token, categories, keywordsMap, vec) {
        if (!SemanticScorer.isSafeKey(token)) return;
        const lower = token.toLowerCase();
        categories.forEach(cat => {
            if (SemanticScorer.isSafeKey(cat) && Object.prototype.hasOwnProperty.call(keywordsMap, cat)) {
                const kwList = keywordsMap[cat];
                if (Array.isArray(kwList) && kwList.some(k => lower.includes(k))) {
                    vec[cat] = (vec[cat] || 0.0) + 1.0;
                }
            }
        });
    }

    /**
     * @private
     * ベクトルの L2 ノルム正規化ヘルパー
     * @param {!Object<string, number>} vec
     */
    static _normalizeConceptVector(vec) {
        let normSq = 0.0;
        Object.keys(vec).forEach(k => {
            if (SemanticScorer.isSafeKey(k)) {
                normSq += (vec[k] || 0.0) * (vec[k] || 0.0);
            }
        });
        const norm = Math.sqrt(normSq);
        if (norm > 0) {
            Object.keys(vec).forEach(k => {
                if (SemanticScorer.isSafeKey(k)) {
                    vec[k] = (vec[k] || 0.0) / norm;
                }
            });
        }
    }

    /**
     * トークン群から概念ベクトルを動的生成する
     * @param {!Array<string>} tokens
     * @return {!Object<string, number>}
     */
    static extractConceptVector(tokens) {
        const categories = SemanticScorer.getConceptCategories();
        const keywordsMap = SemanticScorer.getKeywordsMap();
        const vec = SemanticScorer._initConceptVector(categories);

        if (!tokens || !Array.isArray(tokens)) return vec;

        tokens.forEach(t => {
            SemanticScorer._accumulateTokenCategories(t, categories, keywordsMap, vec);
        });

        SemanticScorer._normalizeConceptVector(vec);
        return vec;
    }

    /**
     * クエリ概念ベクトルとドキュメントテキストのセマンティックボーナススコアを計算する
     * @param {!Array<string>} queryTokens
     * @param {string} docText
     * @return {number}
     */
    static calculateSemanticScore(queryTokens, docText) {
        if (!queryTokens || !docText) return 0.0;
        const qVec = SemanticScorer.extractConceptVector(queryTokens);
        const dVec = SemanticScorer.extractConceptVector([docText]);

        let score = 0.0;
        Object.keys(qVec).forEach(k => {
            if (SemanticScorer.isSafeKey(k) && Object.prototype.hasOwnProperty.call(dVec, k)) {
                score += (qVec[k] || 0.0) * (dVec[k] || 0.0);
            }
        });

        return score * 2.5; // セマンティックブースト係数
    }

    /**
     * @private
     * トークンペア間の類似度計算ヘルパー (ColBERT Late Interaction 用)
     * @param {string} qLower
     * @param {string} dLower
     * @param {!Object<string, !Array<string>>} keywordsMap
     * @return {number}
     */
    static _calculateTokenPairSim(qLower, dLower, keywordsMap) {
        if (qLower === dLower) return 1.0;
        if (qLower.includes(dLower) || dLower.includes(qLower)) return 0.8;

        let sim = 0.0;
        const keys = Object.keys(keywordsMap);
        for (let i = 0; i < keys.length; i++) {
            const cat = keys[i];
            if (SemanticScorer.isSafeKey(cat)) {
                const list = keywordsMap[cat];
                if (Array.isArray(list) && list.includes(qLower) && list.includes(dLower)) {
                    sim = Math.max(sim, 0.6);
                }
            }
        }
        return sim;
    }

    /**
     * ColBERT (Contextualized Late Interaction over BERT) アルゴリズムに基づく
     * クエリートークン vs ドキュメントトークンの MaxSim (最大トークン類似度和) スコアを計算する
     * @param {!Array<string>} queryTokens
     * @param {!Array<string>} docTokens
     * @return {number}
     */
    static calculateColBERTScore(queryTokens, docTokens) {
        if (!Array.isArray(queryTokens) || queryTokens.length === 0 || !Array.isArray(docTokens) || docTokens.length === 0) {
            return 0.0;
        }

        const keywordsMap = SemanticScorer.getKeywordsMap();
        let totalMaxSim = 0.0;

        for (let i = 0; i < queryTokens.length; i++) {
            const q = queryTokens[i];
            if (!SemanticScorer.isSafeKey(q)) continue;
            const qLower = q.toLowerCase();
            let maxSim = 0.0;

            for (let j = 0; j < docTokens.length; j++) {
                const d = docTokens[j];
                if (!SemanticScorer.isSafeKey(d)) continue;
                const dLower = d.toLowerCase();
                const sim = SemanticScorer._calculateTokenPairSim(qLower, dLower, keywordsMap);
                if (sim > maxSim) {
                    maxSim = sim;
                }
            }

            totalMaxSim += maxSim;
        }

        return totalMaxSim;
    }

    /**
     * @private
     * 長文シナリオの特定の問い(例: 設問3, 設問2)に対するブースト算出ヘルパー
     * @param {string} queryLower
     * @param {string} textLower
     * @return {number}
     */
    static _calculateQuestionMatchBoost(queryLower, textLower) {
        if (queryLower.includes('設問') || queryLower.includes('問')) {
            if (textLower.includes(queryLower)) {
                return 3.0;
            }
        }
        return 0.0;
    }

    /**
     * @private
     * 単一候補ドキュメントに対する ColBERT スコア計算ヘルパー
     * @param {string} queryLower
     * @param {!Array<string>} queryTokens
     * @param {!Object} item
     * @return {{doc: !Object, score: number}}
     */
    static _scoreRerankCandidate(queryLower, queryTokens, item) {
        const doc = item.doc || item;
        const text = (doc.name || '') + ' ' + (doc.summary || '') + ' ' + (doc.content || '') + ' ' + (doc.tech || '') + ' ' + (doc.exam || '');
        const docTokens = (typeof Tokenizer !== 'undefined') ? Tokenizer.tokenize(text) : text.split(/\s+/);
        const colbertScore = SemanticScorer.calculateColBERTScore(queryTokens, docTokens);
        const questionMatchBoost = SemanticScorer._calculateQuestionMatchBoost(queryLower, text.toLowerCase());

        const baseScore = typeof item.score === 'number' ? item.score : 0.0;
        const finalScore = baseScore + colbertScore * 1.5 + questionMatchBoost;
        return { doc, score: finalScore };
    }

    /**
     * 第 2 段階 Cross-Encoder / ColBERT Late Interaction Re-ranking 処理パイプライン
     * 候補 50 件から最適合ドキュメント上位 topK 件を精密再ランク付けする
     * @param {string} query
     * @param {!Array<!Object>} candidates
     * @param {number} topK
     * @return {!Array<!Object>}
     */
    static rerank(query, candidates, topK) {
        if (!Array.isArray(candidates) || candidates.length === 0) return [];
        const k = topK || 10;
        const queryLower = (query || '').toLowerCase();
        const queryTokens = (typeof Tokenizer !== 'undefined') ? Tokenizer.tokenize(queryLower) : queryLower.split(/\s+/);

        const scored = candidates.map(item => SemanticScorer._scoreRerankCandidate(queryLower, queryTokens, item));
        scored.sort((a, b) => b.score - a.score);

        return scored.slice(0, k).map(s => s.doc);
    }
}

/**
 * @private
 * @type {?Array<string>}
 */
SemanticScorer._categories = null;

/**
 * @private
 * @type {?Object<string, !Array<string>>}
 */
SemanticScorer._keywordsMap = null;

if (typeof globalThis !== 'undefined') globalThis.SemanticScorer = SemanticScorer;
if (typeof window !== 'undefined') window.SemanticScorer = SemanticScorer;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SemanticScorer;
}
