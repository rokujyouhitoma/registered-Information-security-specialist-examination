/**
 * @fileoverview コサイン類似度・スコア計算モジュール (Vector Scorer Module)
 */

class VectorScorer {
    /**
     * クエリベクトルとドキュメントベクトルのコサイン類似度を計算する
     * @param {!Object<string, number>} qVecNorm 正規化クエリベクトル
     * @param {!Object<string, number>} dVec 正規化ドキュメントベクトル
     * @return {number} コサイン類似度スコア
     */
    static calculateCosineSimilarity(qVecNorm, dVec) {
        let score = 0.0;
        Object.keys(qVecNorm).forEach(t => {
            if (dVec[t]) {
                score += qVecNorm[t] * dVec[t];
            }
        });
        return score;
    }
}

if (typeof globalThis !== 'undefined') {
    globalThis.VectorScorer = VectorScorer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VectorScorer;
}
