/**
 * @fileoverview シノニム辞書・クエリ拡張モジュール (Synonym Query Expansion Module)
 * IR 提案 (アプローチ A) によるベンダー名・略語から技術概念への展開
 */

class SynonymExpander {
    static getSynonymMap() {
        return {
            'ヤマハ': ['ヤマハ', 'yamaha', 'ルーター', 'rtx', 'vpn', 'ipsec', '拠点間接続', '境界防御'],
            'yamaha': ['ヤマハ', 'yamaha', 'ルーター', 'rtx', 'vpn', 'ipsec', '拠点間接続', '境界防御'],
            'シスコ': ['シスコ', 'cisco', 'catalyst', 'スイッチ', 'ルーター', '802.1x', 'ios'],
            'cisco': ['シスコ', 'cisco', 'catalyst', 'スイッチ', 'ルーター', '802.1x', 'ios'],
            'パロアルト': ['パロアルト', 'paloalto', '次世代fw', 'ngfw', 'pan-os', 'app-id'],
            'paloalto': ['パロアルト', 'paloalto', '次世代fw', 'ngfw', 'pan-os', 'app-id'],
            'フォーティネット': ['フォーティネット', 'fortinet', 'fortigate', 'utm', 'waf'],
            'fortinet': ['フォーティネット', 'fortinet', 'fortigate', 'utm', 'waf'],
            'aws': ['aws', 'クラウド', 's3', 'iam', '責任共有モデル', 'vpc'],
            'mfa': ['mfa', '多要素認証', 'totp', 'fido2', 'バイオメトリクス'],
            'pki': ['pki', '公開鍵基盤', '電子証明書', 'ca', '認証局', 'x.509'],
            'xss': ['xss', 'クロスサイトスクリプティング', 'csp', 'エスケープ', 'サニタイズ'],
            'sqli': ['sqli', 'sqlインジェクション', 'プレースホルダ', 'バインド機構']
        };
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
            if (map[lower]) {
                map[lower].forEach(syn => expandedSet.add(syn));
            }
        });

        return Array.from(expandedSet);
    }
}

if (typeof globalThis !== 'undefined') globalThis.SynonymExpander = SynonymExpander;
if (typeof window !== 'undefined') window.SynonymExpander = SynonymExpander;
if (typeof module !== 'undefined' && module.exports) module.exports = SynonymExpander;
