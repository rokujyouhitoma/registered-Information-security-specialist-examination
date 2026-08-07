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
     * @private
     * 単一ドキュメントベクトルのトークンを転置インデックスに追加する
     * @param {number} docIdx
     * @param {!Object<string, number>} v
     */
    _indexVectorTokens(docIdx, v) {
        if (!v) return;
        Object.keys(v).forEach(token => {
            if (CustomSearchEngine.isSafeKey(token)) {
                if (!Object.prototype.hasOwnProperty.call(this.invertedIndex, token)) {
                    this.invertedIndex[token] = [];
                }
                this.invertedIndex[token].push(docIdx);
            }
        });
    }

    /**
     * 転置インデックスを構築
     * @private
     */
    _buildInvertedIndex() {
        this.invertedIndex = Object.create(null);
        if (!this.vectors) return;

        if (Array.isArray(this.vectors)) {
            this.vectors.forEach((v, docIdx) => this._indexVectorTokens(docIdx, v));
        } else if (typeof this.vectors === 'object') {
            Object.keys(this.vectors).forEach(docIdxKey => {
                this._indexVectorTokens(parseInt(docIdxKey, 10), this.vectors[docIdxKey]);
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
     * @private
     * タイトル・概要に直接クエリがマッチするドキュメント候補の収集ヘルパー
     * @param {string} query
     * @param {!Object<number, boolean>} candidateDocIds
     */
    _collectTitleSummaryCandidateDocIds(query, candidateDocIds) {
        if (!this.docs) return;
        const queryLower = query.toLowerCase().trim();
        this.docs.forEach((doc, idx) => {
            const nameLower = (doc.name || '').toLowerCase();
            const summaryLower = (doc.summary || '').toLowerCase();
            if (nameLower.includes(queryLower) || summaryLower.includes(queryLower)) {
                candidateDocIds[idx] = true;
            }
        });
    }

    /**
     * @private
     * 検索候補ドキュメント ID 収集ヘルパー
     * @param {!Array<string>} expandedTokens
     * @param {string} query
     * @return {!Array<number>}
     */
    _collectCandidateDocIds(expandedTokens, query) {
        const candidateDocIds = Object.create(null);
        expandedTokens.forEach(t => {
            if (CustomSearchEngine.isSafeKey(t) && Object.prototype.hasOwnProperty.call(this.invertedIndex, t)) {
                const docIds = this.invertedIndex[t] || [];
                docIds.forEach(id => { candidateDocIds[id] = true; });
            }
        });

        this._collectTitleSummaryCandidateDocIds(query, candidateDocIds);

        let targetIds = Object.keys(candidateDocIds).map(Number);
        if (targetIds.length === 0 && this.docs) {
            targetIds = this.docs.map((_, i) => i);
        }
        return targetIds;
    }

    /**
     * @private
     * 単一ドキュメントの BM25 スコア計算ヘルパー
     * @param {!Array<string>} expandedTokens
     * @param {!Object<string, number>} dVec
     * @param {number} avgdl
     * @return {number}
     */
    _calculateDocBm25Score(expandedTokens, dVec, avgdl) {
        const k1 = 1.2;
        const b = 0.75;
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
        return bm25Score;
    }

    /**
     * @private
     * クエリベクトル生成ヘルパー
     * @param {!Array<string>} expandedTokens
     * @return {!Object<string, number>}
     */
    _buildQueryVector(expandedTokens) {
        const qVecNorm = Object.create(null);
        expandedTokens.forEach(t => {
            if (CustomSearchEngine.isSafeKey(t)) {
                qVecNorm[t] = 1.0 / Math.sqrt(expandedTokens.length);
            }
        });
        return qVecNorm;
    }

    /**
     * @private
     * タイトル・概要・用語の完全/部分一致優先ブースト計算ヘルパー
     * @param {!Object} doc
     * @param {string} queryLower
     * @param {!Array<string>} queryWords
     * @param {string} docFullText
     * @return {number}
     */
    _calculateExactMatchBoost(doc, queryLower, queryWords, docFullText) {
        const docNameLower = (doc.name || '').toLowerCase();
        const docNameWords = docNameLower.split(/[\s()/_\-\u3000\s,./:;!?+=\"'\[\]{}|\\`~^#&]+/).filter(w => w.length > 0);
        const docSummaryLower = (doc.summary || '').toLowerCase();

        if (docNameLower === queryLower) return 100.0;
        if (docNameLower.includes(queryLower)) return 50.0;
        if (docSummaryLower.includes(queryLower)) return 20.0;
        if (queryWords.some(qw => docNameWords.includes(qw))) return 10.0;
        if (docFullText.toLowerCase().includes(queryLower)) return 5.0;
        return 0.0;
    }

    /**
     * @private
     * 単一ドキュメントに対する総合ハイブリッドスコア計算ヘルパー
     * @param {!Object} doc
     * @param {number} idx
     * @param {!Array<string>} expandedTokens
     * @param {!Array<string>} rawTokens
     * @param {string} queryLower
     * @param {!Array<string>} queryWords
     * @param {number} avgdl
     * @return {number}
     */
    _scoreSingleDoc(doc, idx, expandedTokens, rawTokens, queryLower, queryWords, avgdl) {
        const dVec = (this.vectors && typeof this.vectors === 'object') ? (this.vectors[idx] || {}) : {};
        const bm25Score = this._calculateDocBm25Score(expandedTokens, dVec, avgdl);

        const qVecNorm = this._buildQueryVector(expandedTokens);
        const cosineSim = VectorScorer.calculateCosineSimilarity(qVecNorm, dVec);

        const docFullText = (doc.name || '') + ' ' + (doc.summary || '') + ' ' + (doc.content || '') + ' ' + (doc.tech || '') + ' ' + (doc.exam || '');
        const semanticScore = (typeof SemanticScorer !== 'undefined')
            ? SemanticScorer.calculateSemanticScore(rawTokens, docFullText)
            : 0.0;

        const boost = this._calculateExactMatchBoost(doc, queryLower, queryWords, docFullText);
        return bm25Score + (cosineSim * 0.5) + semanticScore + boost;
    }

    /**
     * @private
     * 検索実行可能性・クエリ入力検証ヘルパー
     * @param {string} query
     * @return {boolean}
     */
    _isValidSearchQuery(query) {
        return Boolean(this.isLoaded && query && typeof query === 'string' && query.trim());
    }

    /**
     * @private
     * トークン拡張の安全呼出しプロキシ
     * @param {!Array<string>} rawTokens
     * @return {!Array<string>}
     */
    _expandTokens(rawTokens) {
        if (typeof SynonymExpander !== 'undefined') {
            return SynonymExpander.expandTokens(rawTokens);
        }
        return rawTokens;
    }

    /**
     * 転置インデックス・シノニム拡張(A)・密概念セマンティック(B)のハイブリッド全文検索を実行
     * @param {string} query 検索クエリ
     * @param {number=} topK 取得上位件数
     * @return {!Array<!Object>} スコアリング結果配列
     */
    search(query, topK = 10) {
        if (!this._isValidSearchQuery(query)) return [];

        const rawTokens = this.tokenize(query);
        if (rawTokens.length === 0) return [];

        const expandedTokens = this._expandTokens(rawTokens);
        if (!this.invertedIndex) {
            this._buildInvertedIndex();
        }

        const targetIds = this._collectCandidateDocIds(expandedTokens, query);
        const queryLower = query.toLowerCase().trim();
        const queryWords = queryLower.split(/[\s()/_\-\u3000]+/).filter(w => w.length > 0);
        const avgdl = this.avgdl > 0 ? this.avgdl : 50.0;

        const scores = [];
        targetIds.forEach(idx => {
            const doc = this.docs ? this.docs[idx] : null;
            if (!doc) return;
            const finalScore = this._scoreSingleDoc(doc, idx, expandedTokens, rawTokens, queryLower, queryWords, avgdl);
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
