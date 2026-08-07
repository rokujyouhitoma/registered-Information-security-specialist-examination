/**
 * @fileoverview 全文検索エンジンコアモジュール (Custom Search Engine Core)
 * SA/IR 連携による BM25 スコアリング、シノニムクエリ拡張(A)、密概念セマンティック検索(B)、転置インデックス (Inverted Index) およびプロトタイプ汚染防御
 */

class CustomSearchEngine {
    constructor() {
        /** @type {!Array<!Object>} */
        this.docs = [];
        /** @type {!Object<string, number>} */
        this.idf = Object.create(null);
        /** @type {!Array<!Object<string, number>>} */
        this.vectors = [];
        /** @type {!Object<string, !Array<number>>} */
        this.invertedIndex = Object.create(null);
        /** @type {number} */
        this.avgdl = 50.0;
        /** @type {boolean} */
        this.isLoaded = false;
    }

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
     * インデックス JSON データをロードし、転置インデックスを動的構築する
     * @param {string=} jsonPath JSONファイルへのパス
     * @return {!Promise<boolean>} ロード成功判定
     */
    async loadIndex(jsonPath = "search_index.json") {
        try {
            const cacheBustPath = jsonPath + (jsonPath.includes('?') ? '&' : '?') + 'v=' + Date.now();
            const res = await fetch(cacheBustPath, { cache: 'no-cache' });
            const data = await res.json();
            this.docs = data.docs || [];
            
            // 安全な IDF ディクショナリの構築
            this.idf = Object.create(null);
            if (data.idf) {
                Object.keys(data.idf).forEach(k => {
                    if (CustomSearchEngine.isSafeKey(k)) {
                        this.idf[k] = data.idf[k];
                    }
                });
            }
            this.vectors = data.vectors || [];
            this.avgdl = data.avgdl || this._calculateAvgdl();

            // 転置インデックス (Inverted Index) の自動構築
            this._buildInvertedIndex();

            this.isLoaded = true;
            return true;
        } catch (e) {
            console.error("❌ インデックスロード失敗:", e);
            return false;
        }
    }

    /**
     * ベクトルデータから転置インデックス (Inverted Index) を動的構築
     * @private
     */
    _buildInvertedIndex() {
        this.invertedIndex = Object.create(null);
        if (!this.vectors) return;

        if (Array.isArray(this.vectors)) {
            this.vectors.forEach((v, docIdx) => {
                if (!v) return;
                Object.keys(v).forEach(token => {
                    if (CustomSearchEngine.isSafeKey(token)) {
                        if (!Object.prototype.hasOwnProperty.call(this.invertedIndex, token)) {
                            this.invertedIndex[token] = [];
                        }
                        this.invertedIndex[token].push(docIdx);
                    }
                });
            });
        } else if (typeof this.vectors === 'object') {
            Object.keys(this.vectors).forEach(docIdxKey => {
                const v = this.vectors[docIdxKey];
                const docIdx = parseInt(docIdxKey, 10);
                if (!v) return;
                Object.keys(v).forEach(token => {
                    if (CustomSearchEngine.isSafeKey(token)) {
                        if (!Object.prototype.hasOwnProperty.call(this.invertedIndex, token)) {
                            this.invertedIndex[token] = [];
                        }
                        this.invertedIndex[token].push(docIdx);
                    }
                });
            });
        }
    }

    /**
     * ドキュメントの平均長さを計算
     * @private
     * @return {number}
     */
    _calculateAvgdl() {
        if (!this.vectors || this.vectors.length === 0) return 50.0;
        let totalLen = 0;
        this.vectors.forEach(v => {
            totalLen += Object.keys(v).length;
        });
        return (totalLen / this.vectors.length) || 50.0;
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
     * 転置インデックス・シノニム拡張(A)・密概念セマンティック(B)のハイブリッド全文検索を実行
     * @param {string} query 検索クエリ
     * @param {number=} topK 取得上位件数
     * @return {!Array<!Object>} スコアリング結果配列
     */
    search(query, topK = 10) {
        if (!this.isLoaded || !query || typeof query !== 'string' || !query.trim()) return [];

        const rawTokens = this.tokenize(query);
        if (rawTokens.length === 0) return [];

        // アプローチ A: シノニムクエリ拡張
        const expandedTokens = (typeof SynonymExpander !== 'undefined')
            ? SynonymExpander.expandTokens(rawTokens)
            : rawTokens;

        if (!this.invertedIndex || Object.keys(this.invertedIndex).length === 0) {
            this._buildInvertedIndex();
        }

        const candidateDocIds = Object.create(null);
        expandedTokens.forEach(t => {
            if (CustomSearchEngine.isSafeKey(t) && Object.prototype.hasOwnProperty.call(this.invertedIndex, t)) {
                const docIds = this.invertedIndex[t] || [];
                docIds.forEach(id => { candidateDocIds[id] = true; });
            }
        });

        // クエリ文字列のタイトル・概要直接ヒットを候補に確実追加 (漏れゼロ保証)
        const queryLower = query.toLowerCase().trim();
        const queryWords = queryLower.split(/[\s()/_\-\u3000]+/).filter(w => w.length > 0);
        if (this.docs) {
            this.docs.forEach((doc, idx) => {
                const nameLower = (doc.name || '').toLowerCase();
                const summaryLower = (doc.summary || '').toLowerCase();
                if (nameLower.includes(queryLower) || summaryLower.includes(queryLower)) {
                    candidateDocIds[idx] = true;
                }
            });
        }

        // 候補ドキュメントが0件の場合、全文書を対象（フォールバック）
        let targetIds = Object.keys(candidateDocIds).map(Number);
        if (targetIds.length === 0 && this.docs) {
            targetIds = this.docs.map((_, i) => i);
        }

        const k1 = 1.2;
        const b = 0.75;
        const avgdl = this.avgdl > 0 ? this.avgdl : 50.0;

        const scores = [];

        targetIds.forEach(idx => {
            const doc = this.docs[idx];
            if (!doc) return;

            const dVec = (this.vectors && typeof this.vectors === 'object') ? (this.vectors[idx] || {}) : {};
            const docLen = Object.keys(dVec).length || 1;
            let bm25Score = 0.0;

            expandedTokens.forEach(t => {
                if (CustomSearchEngine.isSafeKey(t) && Object.prototype.hasOwnProperty.call(dVec, t)) {
                    const idfVal = (this.idf && Object.prototype.hasOwnProperty.call(this.idf, t)) ? (this.idf[t] || 1.0) : 1.0;
                    const tf = dVec[t] || 0.0;
                    const numerator = tf * (k1 + 1);
                    const denominator = tf + k1 * (1 - b + b * (docLen / avgdl));
                    bm25Score += idfVal * (numerator / denominator);
                }
            });

            // コサイン類似度の補助計算
            const qVecNorm = Object.create(null);
            expandedTokens.forEach(t => {
                if (CustomSearchEngine.isSafeKey(t)) {
                    qVecNorm[t] = 1.0 / Math.sqrt(expandedTokens.length);
                }
            });
            const cosineSim = VectorScorer.calculateCosineSimilarity(qVecNorm, dVec);

            // アプローチ B: 密概念セマンティック類似度計算
            const docFullText = (doc.name || '') + ' ' + (doc.summary || '') + ' ' + (doc.content || '') + ' ' + (doc.tech || '') + ' ' + (doc.exam || '');
            const semanticScore = (typeof SemanticScorer !== 'undefined')
                ? SemanticScorer.calculateSemanticScore(rawTokens, docFullText)
                : 0.0;

            let finalScore = bm25Score + (cosineSim * 0.5) + semanticScore;

            // フィールド一致・単語完全一致の優先ブースト (Exact Match Priority)
            const docNameLower = (doc.name || '').toLowerCase();
            const docNameWords = docNameLower.split(/[\s()/_\-\u3000\s,./:;!?+=\"'\[\]{}|\\`~^#&]+/).filter(w => w.length > 0);
            const docSummaryLower = (doc.summary || '').toLowerCase();

            if (docNameLower === queryLower) {
                finalScore += 100.0;
            } else if (docNameLower.includes(queryLower)) {
                finalScore += 50.0;
            } else if (docSummaryLower.includes(queryLower)) {
                finalScore += 20.0;
            } else if (queryWords.some(qw => docNameWords.includes(qw))) {
                finalScore += 10.0;
            } else if (docFullText.toLowerCase().includes(queryLower)) {
                finalScore += 5.0;
            }

            if (finalScore > 0.01) {
                scores.push({ doc, score: finalScore });
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
