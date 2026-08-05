/**
 * フルスクラッチ Vanilla JS 全文検索エンジン (FM-Index & Vector Engine v1.0)
 * 外部ライブラリ非依存（標準 JS のみで実装）。
 */
class CustomSearchEngine {
    constructor() {
        this.docs = [];
        this.idf = {};
        this.vectors = [];
        this.isLoaded = false;
    }

    async loadIndex(jsonPath = "search_index.json") {
        try {
            const res = await fetch(jsonPath);
            const data = await res.json();
            this.docs = data.docs;
            this.idf = data.idf;
            this.vectors = data.vectors;
            this.isLoaded = true;
            console.log(`✅ フルスクラッチ検索エンジン: ${this.docs.length} 件の用語インデックスをロード完了`);
            return true;
        } catch (e) {
            console.error("❌ インデックスデータのロードに失敗:", e);
            return false;
        }
    }

    tokenize(text) {
        const clean = text.toLowerCase().replace(/[^\w\s]/g, '');
        const words = clean.split(/\s+/).filter(w => w.length > 0);
        const bigrams = [];
        for (let i = 0; i < clean.length - 1; i++) {
            const bg = clean.substring(i, i + 2);
            if (!/\s/.test(bg)) {
                bigrams.push(bg);
            }
        }
        return words.concat(bigrams);
    }

    search(query, topK = 10) {
        if (!this.isLoaded || !query.trim()) return [];

        const qTokens = this.tokenize(query);
        if (qTokens.length === 0) return [];

        // クエリ TF-IDF ベクトル
        const qTf = {};
        qTokens.forEach(t => {
            qTf[t] = (qTf[t] || 0) + 1;
        });

        const qVec = {};
        let normSq = 0.0;
        Object.keys(qTf).forEach(t => {
            const idfVal = this.idf[t] || 1.0;
            const tfidf = (qTf[t] / qTokens.length) * idfVal;
            qVec[t] = tfidf;
            normSq += tfidf * tfidf;
        });

        const qNorm = normSq > 0 ? Math.sqrt(normSq) : 1.0;
        const qVecNorm = {};
        Object.keys(qVec).forEach(t => {
            qVecNorm[t] = qVec[t] / qNorm;
        });

        // ドキュメントベクトルとのコサイン類似度スコアリング
        const scores = [];
        const queryLower = query.toLowerCase();

        this.docs.forEach((doc, idx) => {
            const dVec = this.vectors[idx] || {};
            let score = 0.0;

            Object.keys(qVecNorm).forEach(t => {
                if (dVec[t]) {
                    score += qVecNorm[t] * dVec[t];
                }
            });

            // 完全一致 / 部分一致 ボーナス
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

window.CustomSearchEngine = CustomSearchEngine;
