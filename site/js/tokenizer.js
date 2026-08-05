/**
 * @fileoverview トークナイザーモジュール (Tokenizer Module)
 */

class Tokenizer {
    /**
     * テキストを正規化し、単語および文字Bigramへ分割する
     * @param {string} text 入力テキスト
     * @return {!Array<string>} トークン配列
     */
    static tokenize(text) {
        if (!text) return [];
        const clean = text.toLowerCase()
            .replace(/[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+/g, ' ')
            .trim();
        if (!clean) return [];

        const words = clean.split(/\s+/).filter(w => w.length > 0);
        const noSpace = clean.replace(/\s+/g, '');
        const bigrams = [];
        for (let i = 0; i < noSpace.length - 1; i++) {
            bigrams.push(noSpace.substring(i, i + 2));
        }
        return Array.from(new Set([...words, ...bigrams]));
    }
}

if (typeof globalThis !== 'undefined') {
    globalThis.Tokenizer = Tokenizer;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tokenizer;
}
