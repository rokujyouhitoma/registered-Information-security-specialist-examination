/**
 * @fileoverview シノニム辞書・クエリ拡張モジュール (Synonym Query Expansion Module)
 * IR 提案 (アプローチ A) によるベンダー名・略語から技術概念への展開
 * データ駆動設計原則 (Data-Driven Design) に準拠
 */

class SynonymExpander {
    /**
     * @private
     * @type {Object<string, Array<string>>|null}
     */
    static _synonymMap = null;

    /**
     * 外部シノニム辞書データをロード・設定する
     * @param {Object<string, Array<string>>} map
     */
    static setSynonymMap(map) {
        if (map && typeof map === 'object') {
            SynonymExpander._synonymMap = map;
        }
    }

    /**
     * 現在設定されているシノニムマップを取得する
     * @return {Object<string, Array<string>>}
     */
    static getSynonymMap() {
        return SynonymExpander._synonymMap || {};
    }

    /**
     * 入力クエリトークン配列をシノニムマップで拡張する
     * @param {!Array<string>} tokens
     * @return {!Array<string>} 拡張されたトークン配列
     */
    static expandTokens(tokens) {
        if (!tokens || !Array.isArray(tokens)) return [];
        const map = SynonymExpander.getSynonymMap();
        const expandedSet = new Set(tokens);

        tokens.forEach(t => {
            const lower = t.toLowerCase();
            if (map[lower] && Array.isArray(map[lower])) {
                map[lower].forEach(syn => expandedSet.add(syn));
            }
        });

        return Array.from(expandedSet);
    }
}

if (typeof globalThis !== 'undefined') globalThis.SynonymExpander = SynonymExpander;
if (typeof window !== 'undefined') window.SynonymExpander = SynonymExpander;
if (typeof module !== 'undefined' && module.exports) module.exports = SynonymExpander;
