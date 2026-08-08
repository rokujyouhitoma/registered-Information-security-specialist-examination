/**
 * @fileoverview トークナイザーモジュール (Tokenizer Module)
 * SA/IR 連携によるプロトタイプ汚染防御およびクリーン・トークナイズ構造
 */

class Tokenizer {
    /**
     * ストップワード一覧を設定する
     * @param {!Array<string>} list
     */
    static setStopWords(list) {
        if (Array.isArray(list)) {
            Tokenizer._stopWords = new Set(list.map(w => String(w).toLowerCase()));
        }
    }

    /**
     * 単語がストップワードか判定する
     * @param {string} word
     * @return {boolean}
     */
    static isStopWord(word) {
        if (!word || !Tokenizer._stopWords) return false;
        return Tokenizer._stopWords.has(String(word).toLowerCase());
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
     * テキストを正規化し、単語および文字Bigramへ分割する（ストップワード除外対応）
     * @param {string} text 入力テキスト
     * @return {!Array<string>} トークン配列
     */
    static tokenize(text) {
        if (!text || typeof text !== 'string') return [];
        const clean = text.toLowerCase()
            .replace(/[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+/g, ' ')
            .trim();
        if (!clean) return [];

        const words = clean.split(/\s+/).filter(w => w.length > 0 && Tokenizer.isSafeKey(w) && !Tokenizer.isStopWord(w));
        const noSpace = clean.replace(/\s+/g, '');
        const bigrams = [];
        for (let i = 0; i < noSpace.length - 1; i++) {
            const bg = noSpace.substring(i, i + 2);
            if (Tokenizer.isSafeKey(bg) && !Tokenizer.isStopWord(bg)) {
                bigrams.push(bg);
            }
        }

        // プロトタイプ汚染を防ぐ Map オブジェクトによる安全なユニーク化
        const tokenMap = new Map();
        words.forEach(w => {
            if (Tokenizer.isSafeKey(w) && !Tokenizer.isStopWord(w)) {
                tokenMap.set(w, true);
            }
        });
        bigrams.forEach(b => {
            if (Tokenizer.isSafeKey(b) && !Tokenizer.isStopWord(b)) {
                tokenMap.set(b, true);
            }
        });

        return Array.from(tokenMap.keys());
    }
}

/** @type {!Set<string>} */
Tokenizer._stopWords = new Set();

if (typeof globalThis !== 'undefined') {
    globalThis.Tokenizer = Tokenizer;
}
if (typeof window !== 'undefined') {
    window.Tokenizer = Tokenizer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tokenizer;
}
