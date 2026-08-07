/**
 * @fileoverview シノニム辞書・クエリ拡張モジュール (Synonym Query Expansion Module)
 * IR 提案 (アプローチ A) によるベンダー名・略語から技術概念への展開
 * データ駆動設計原則 (Data-Driven Design) に準拠
 */

class SynonymExpander {
    /**
     * 外部シノニム辞書データをロード・設定する
     * @param {Object<string, !Array<string>>} map
     */
    static setSynonymMap(map) {
        if (map && typeof map === 'object') {
            SynonymExpander._synonymMap = map;
        }
    }

    /**
     * 現在設定されているシノニムマップを取得する
     * @return {!Object<string, !Array<string>>}
     */
    static getSynonymMap() {
        return SynonymExpander._synonymMap || {};
    }

    /**
     * トークン配列を受け取り、シノニムマップに基づいて拡張トークン配列を返す
     * @param {!Array<string>} tokens
     * @return {!Array<string>}
     */
    static expandTokens(tokens) {
        if (!Array.isArray(tokens) || tokens.length === 0) {
            return [];
        }

        const map = SynonymExpander.getSynonymMap();
        const expandedSet = new Set(tokens);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const lowerToken = String(token || '').toLowerCase();
            const synonyms = map[lowerToken];
            if (Array.isArray(synonyms)) {
                for (let j = 0; j < synonyms.length; j++) {
                    expandedSet.add(synonyms[j]);
                }
            }
        }

        return Array.from(expandedSet);
    }
}

/**
 * @private
 * @type {Object<string, !Array<string>>|null}
 */
SynonymExpander._synonymMap = null;

if (typeof globalThis !== 'undefined') globalThis.SynonymExpander = SynonymExpander;
if (typeof window !== 'undefined') window.SynonymExpander = SynonymExpander;
if (typeof module !== 'undefined' && module.exports) module.exports = SynonymExpander;
