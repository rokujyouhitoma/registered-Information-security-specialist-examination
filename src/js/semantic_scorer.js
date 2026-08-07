/**
 * @fileoverview セマンティック概念スコアラー (Semantic Concept Scorer Module)
 * IR 提案 (アプローチ B) による密概念ベクトル類似度計算
 */

class SemanticScorer {
    /**
     * キーのプロトタイプ汚染安全性を判定する
     * @param {string} key
     * @return {boolean}
     */
    static isSafeKey(key) {
        return Boolean(key) && key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    }

    /**
     * 主要セキュリティ概念カテゴリマッピング
     */
    static getConceptCategories() {
        return ['network', 'crypto', 'web_sec', 'cloud', 'governance', 'incident'];
    }

    /**
     * トークン群から概念ベクトルを動的生成する
     * @param {!Array<string>} tokens
     * @return {!Object<string, number>}
     */
    static extractConceptVector(tokens) {
        const vec = Object.create(null);
        vec.network = 0.0;
        vec.crypto = 0.0;
        vec.web_sec = 0.0;
        vec.cloud = 0.0;
        vec.governance = 0.0;
        vec.incident = 0.0;

        if (!tokens || !Array.isArray(tokens)) return vec;

        const networkKeywords = ['ルーター', 'vpn', 'ipsec', 'ヤマハ', 'rtx', 'スイッチ', 'ファイアウォール', '通信', 'nw', 'ネットワーク'];
        const cryptoKeywords = ['暗号', 'tls', 'pki', '証明書', '鍵', 'rsa', 'aes', 'ハッシュ'];
        const webKeywords = ['xss', 'sqli', 'csrf', 'web', 'http', 'サニタイズ', 'cookie', 'csp'];
        const cloudKeywords = ['aws', 'クラウド', 's3', 'iam', 'saas', 'paas', 'iaas'];

        tokens.forEach(t => {
            if (SemanticScorer.isSafeKey(t)) {
                const lower = t.toLowerCase();
                if (networkKeywords.some(k => lower.includes(k))) vec.network += 1.0;
                if (cryptoKeywords.some(k => lower.includes(k))) vec.crypto += 1.0;
                if (webKeywords.some(k => lower.includes(k))) vec.web_sec += 1.0;
                if (cloudKeywords.some(k => lower.includes(k))) vec.cloud += 1.0;
            }
        });

        // ノルム正規化
        let norm = 0.0;
        Object.keys(vec).forEach(k => {
            if (SemanticScorer.isSafeKey(k)) {
                norm += (vec[k] || 0.0) * (vec[k] || 0.0);
            }
        });
        norm = Math.sqrt(norm);

        if (norm > 0) {
            Object.keys(vec).forEach(k => {
                if (SemanticScorer.isSafeKey(k)) {
                    vec[k] = (vec[k] || 0.0) / norm;
                }
            });
        }

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

if (typeof globalThis !== 'undefined') globalThis.SemanticScorer = SemanticScorer;
if (typeof window !== 'undefined') window.SemanticScorer = SemanticScorer;
if (typeof module !== 'undefined' && module.exports) module.exports = SemanticScorer;
