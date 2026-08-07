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
