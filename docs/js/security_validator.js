/**
 * @fileoverview セキュリティ・プロトタイプ汚染検証モジュール (Security Validator Module)
 * システムアーキテクト (SA) 指針に基づく高凝集セキュリティコンポーネント
 */

class SecurityValidator {
    /**
     * オブジェクトのキーがプロトタイプ汚染攻撃に対して安全か検証する
     * @param {string} key 検証対象キー
     * @return {boolean} 安全なキーであれば true
     */
    static isSafeKey(key) {
        return Boolean(key) && key !== '__proto__' && key !== 'prototype' && key !== 'constructor';
    }

    /**
     * オブジェクトプロパティ安全アクセサ
     * @param {!Object} obj 対象オブジェクト
     * @param {string} key アクセスキー
     * @return {boolean} プロパティが存在し安全か
     */
    static hasSafeProperty(obj, key) {
        if (!obj || typeof obj !== 'object' || !SecurityValidator.isSafeKey(key)) {
            return false;
        }
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
}

if (typeof globalThis !== 'undefined') {
    globalThis.SecurityValidator = SecurityValidator;
}
if (typeof window !== 'undefined') {
    window.SecurityValidator = SecurityValidator;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityValidator;
}
