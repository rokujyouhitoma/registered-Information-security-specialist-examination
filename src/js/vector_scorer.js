/**
 * @fileoverview コサイン類似度・スコア計算モジュール (Vector Scorer Module)
 * Matryoshka Representation Learning (MRL) 適応型低次元ベクトル圧縮対応
 * JSDoc 厳格型定義および UMD 万能モジュール構造
 */

class VectorScorer {
    /**
     * プロトタイプ汚染防御用のキー安全性検証 (SecurityValidator へのプロキシ)
     * @param {string} key
     * @return {boolean}
     */
    static isSafeKey(key) {
        return (typeof SecurityValidator !== 'undefined')
            ? SecurityValidator.isSafeKey(key)
            : Boolean(key) && key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    }

    /**
     * クエリベクトルとドキュメントベクトルのコサイン類似度を計算する
     * @param {!Object<string, number>} qVecNorm 正規化済みクエリベクトルマップ
     * @param {!Object<string, number>} dVec ドキュメントベクトルマップ
     * @return {number} コサイン類似度スコア (0.0 ～ 1.0)
     */
    static calculateCosineSimilarity(qVecNorm, dVec) {
        if (!qVecNorm || !dVec) return 0.0;
        let score = 0.0;
        Object.keys(qVecNorm).forEach(t => {
            if (VectorScorer.isSafeKey(t) && Object.prototype.hasOwnProperty.call(dVec, t)) {
                const qVal = qVecNorm[t] || 0.0;
                const dVal = dVec[t] || 0.0;
                score += qVal * dVal;
            }
        });
        return score;
    }

    /**
     * Reciprocal Rank Fusion (RRF) スコアを計算する
     * @param {number} rankBM25 1-indexed BM25 順位 (見つからない場合は 0)
     * @param {number} rankDense 1-indexed Dense ベクトル順位 (見つからない場合は 0)
     * @param {number=} k スムーシング定数 (デフォルト: 60)
     * @return {number} RRF 統合スコア
     */
    static calculateRRFScore(rankBM25, rankDense, k = 60) {
        const r1 = (typeof rankBM25 === 'number' && rankBM25 > 0) ? (1.0 / (k + rankBM25)) : 0.0;
        const r2 = (typeof rankDense === 'number' && rankDense > 0) ? (1.0 / (k + rankDense)) : 0.0;
        return r1 + r2;
    }

    /**
     * Matryoshka Representation Learning (MRL) 適応型低次元ベクトル切出し・L2再正規化ヘルパー
     * @param {!Object<string, number>} vec ベクトルマップ
     * @param {number=} targetDim 切り出し次元数 (例: 64, 128, 256)
     * @return {!Object<string, number>} トランケート再正規化済み MRL ベクトル
     */
    static truncateMRLVector(vec, targetDim = 64) {
        if (!vec || typeof vec !== 'object') return {};
        const keys = Object.keys(vec).filter(k => VectorScorer.isSafeKey(k)).slice(0, targetDim);
        const sliced = Object.create(null);
        let normSq = 0.0;

        keys.forEach(k => {
            const val = vec[k] || 0.0;
            sliced[k] = val;
            normSq += val * val;
        });

        const norm = Math.sqrt(normSq);
        if (norm > 0) {
            keys.forEach(k => {
                sliced[k] /= norm;
            });
        }

        return sliced;
    }

    /**
     * Matryoshka Representation Learning (MRL) 低次元コサイン類似度を動的計算する
     * @param {!Object<string, number>} qVec クエリベクトル
     * @param {!Object<string, number>} dVec ドキュメントベクトル
     * @param {number=} targetDim 切り出し次元数
     * @return {number} 低次元 MRL 類似度スコア
     */
    static calculateMRLCosineSimilarity(qVec, dVec, targetDim = 64) {
        const qMRL = VectorScorer.truncateMRLVector(qVec, targetDim);
        const dMRL = VectorScorer.truncateMRLVector(dVec, targetDim);
        return VectorScorer.calculateCosineSimilarity(qMRL, dMRL);
    }
}

if (typeof globalThis !== 'undefined') {
    globalThis.VectorScorer = VectorScorer;
}
if (typeof window !== 'undefined') {
    window.VectorScorer = VectorScorer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VectorScorer;
}
