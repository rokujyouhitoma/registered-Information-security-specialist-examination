/**
 * FrontCodingCompressor - IR (情報検索) & SA (システムアーキテクト) 共同設計
 * 文字列配列の共通接頭辞を前形差分圧縮 (Front Coding) するアルゴリズムモジュール
 */
class FrontCodingCompressor {
    /**
     * ソート済み文字列配列を Front Coding 圧縮する
     * @param {!Array<string>} strings - ソート済みの文字列配列
     * @return {{compressed: !Array<{prefixLen: number, suffix: string}>, originalSize: number, compressedSize: number, ratio: number}}
     */
    static compress(strings) {
        if (!Array.isArray(strings) || strings.length === 0) {
            return { compressed: [], originalSize: 0, compressedSize: 0, ratio: 0 };
        }

        const sorted = [...strings].sort();
        const compressed = [];
        let originalSize = 0;
        let compressedSize = 0;
        let prev = "";

        for (let i = 0; i < sorted.length; i++) {
            const current = String(sorted[i]);
            originalSize += new TextEncoder().encode(current).length;

            let prefixLen = 0;
            const minLen = Math.min(prev.length, current.length);
            while (prefixLen < minLen && prev.charAt(prefixLen) === current.charAt(prefixLen)) {
                prefixLen++;
            }

            const suffix = current.substring(prefixLen);
            compressed.push({ prefixLen, suffix });
            
            // prefixLen (1 byte) + suffix バイト長
            compressedSize += 1 + new TextEncoder().encode(suffix).length;
            prev = current;
        }

        const ratio = originalSize > 0 ? Number(((1 - (compressedSize / originalSize)) * 100).toFixed(2)) : 0;

        return {
            compressed,
            originalSize,
            compressedSize,
            ratio
        };
    }

    /**
     * Front Coding 圧縮データを元の文字列配列に展開 (復元) する
     * @param {!Array<{prefixLen: number, suffix: string}>} compressed 
     * @return {!Array<string>} 復元された文字列配列
     */
    static decompress(compressed) {
        if (!Array.isArray(compressed) || compressed.length === 0) {
            return [];
        }

        const decompressed = [];
        let prev = "";

        for (let i = 0; i < compressed.length; i++) {
            const item = compressed[i];
            if (!item || typeof item.prefixLen !== 'number' || typeof item.suffix !== 'string') {
                continue;
            }
            const prefixLen = item.prefixLen;
            const suffix = item.suffix;
            const prefix = prev.substring(0, prefixLen);
            const current = prefix + suffix;
            decompressed.push(current);
            prev = current;
        }

        return decompressed;
    }
}

if (typeof window !== 'undefined') {
    window.FrontCodingCompressor = FrontCodingCompressor;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrontCodingCompressor;
}
