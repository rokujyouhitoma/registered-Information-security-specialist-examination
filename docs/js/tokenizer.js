/**
 * @fileoverview トークナイザーモジュール (Tokenizer Module)
 * SA/IR 連携によるプロトタイプ汚染防御およびクリーン・トークナイズ構造
 */

class Tokenizer {
    /**
     * キーのプロトタイプ汚染安全性を判定する
     * @param {string} key
     * @return {boolean}
     */
    static isSafeKey(key) {
        return Boolean(key) && key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    }

    /**
     * テキストを正規化し、単語および文字Bigramへ分割する
     * @param {string} text 入力テキスト
     * @return {!Array<string>} トークン配列
     */
    static tokenize(text) {
        if (!text || typeof text !== 'string') return [];
        const clean = text.toLowerCase()
            .replace(/[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+/g, ' ')
            .trim();
        if (!clean) return [];

        const words = clean.split(/\s+/).filter(w => w.length > 0 && Tokenizer.isSafeKey(w));
        const noSpace = clean.replace(/\s+/g, '');
        const bigrams = [];
        for (let i = 0; i < noSpace.length - 1; i++) {
            const bg = noSpace.substring(i, i + 2);
            if (Tokenizer.isSafeKey(bg)) {
                bigrams.push(bg);
            }
        }

        // プロトタイプ汚染を防ぐ Map オブジェクトによる安全なユニーク化
        const tokenMap = new Map();
        words.forEach(w => {
            if (Tokenizer.isSafeKey(w)) {
                tokenMap.set(w, true);
            }
        });
        bigrams.forEach(b => {
            if (Tokenizer.isSafeKey(b)) {
                tokenMap.set(b, true);
            }
        });

        return Array.from(tokenMap.keys());
    }
}

if (typeof globalThis !== 'undefined') {
    globalThis.Tokenizer = Tokenizer;
}
if (typeof window !== 'undefined') {
    window.Tokenizer = Tokenizer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tokenizer;
}
