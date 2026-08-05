/**
 * @fileoverview 全文検索エンジンコアモジュール (Custom Search Engine Core)
 */

class CustomSearchEngine {
    constructor() {
        /** @type {!Array<!Object>} */
        this.docs = [];
        /** @type {!Object<string, number>} */
        this.idf = {};
        /** @type {!Array<!Object<string, number>>} */
        this.vectors = [];
        /** @type {boolean} */
        this.isLoaded = false;
    }

    /**
     * インデックス JSON データをロードする
     * @param {string=} jsonPath JSONファイルへのパス
     * @return {!Promise<boolean>} ロード成功判定
     */
    async loadIndex(jsonPath = "search_index.json") {
        try {
            const cacheBustPath = jsonPath + (jsonPath.includes('?') ? '&' : '?') + 'v=' + Date.now();
            const res = await fetch(cacheBustPath, { cache: 'no-cache' });
            const data = await res.json();
            this.docs = data.docs;
            this.idf = data.idf;
            this.vectors = data.vectors;
            this.isLoaded = true;
            return true;
        } catch (e) {
            console.error("❌ インデックスロード失敗:", e);
            return false;
        }
    }

    /**
     * トークナイズ処理のプロキシ
     * @param {string} text
     * @return {!Array<string>}
     */
    tokenize(text) {
        return Tokenizer.tokenize(text);
    }

    /**
     * 全文検索を実行する
     * @param {string} query 検索クエリ
     * @param {number=} topK 取得上位件数
     * @return {!Array<!Object>} スコアリング結果配列
     */
    search(query, topK = 10) {
        if (!this.isLoaded || !query.trim()) return [];

        const qTokens = this.tokenize(query);
        if (qTokens.length === 0) return [];

        const qTf = {};
        qTokens.forEach(t => {
            qTf[t] = (qTf[t] || 0) + 1;
        });

        const qVec = {};
        let normSq = 0.0;
        Object.keys(qTf).forEach(t => {
            if (Object.prototype.hasOwnProperty.call(this.idf, t)) {
                const idfVal = this.idf[t] || 1.0;
                const tfidf = (qTf[t] / qTokens.length) * idfVal;
                qVec[t] = tfidf;
                normSq += tfidf * tfidf;
            }
        });

        const qNorm = normSq > 0 ? Math.sqrt(normSq) : 1.0;
        const qVecNorm = {};
        Object.keys(qVec).forEach(t => {
            qVecNorm[t] = qVec[t] / qNorm;
        });

        const scores = [];
        const queryLower = query.toLowerCase();

        this.docs.forEach((doc, idx) => {
            const dVec = this.vectors[idx] || {};
            let score = VectorScorer.calculateCosineSimilarity(qVecNorm, dVec);

            const docNameLower = doc.name.toLowerCase();
            const docSummaryLower = doc.summary.toLowerCase();

            if (docNameLower.includes(queryLower)) {
                score += 2.0;
            } else if (docSummaryLower.includes(queryLower)) {
                score += 0.5;
            }

            if (score > 0.05) {
                scores.push({ doc, score });
            }
        });

        scores.sort((a, b) => b.score - a.score);
        return scores.slice(0, topK).map(item => ({
            ...item.doc,
            score: item.score.toFixed(4)
        }));
    }
}

if (typeof window !== 'undefined') {
    window.CustomSearchEngine = CustomSearchEngine;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomSearchEngine;
}
