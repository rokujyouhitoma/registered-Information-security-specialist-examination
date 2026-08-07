/**
 * @fileoverview コサイン類似度・スコア計算モジュール (Vector Scorer Module)
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
