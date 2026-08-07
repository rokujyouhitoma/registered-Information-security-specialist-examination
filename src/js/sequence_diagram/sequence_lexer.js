/**
 * @fileoverview シーケンス図 字句解析モジュール (SequenceLexer)
 * パッケージ: src/js/sequence_diagram/sequence_lexer.js
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

import { SequenceToken } from './sequence_models.js';

export class SequenceLexer {
    static _matchDeclaration(line, lineIdx) {
        const declMatch = line.match(/^(actor|participant)\s+([a-zA-Z0-9_$]+)(?:\s+as\s+(.+))?$/);
        if (!declMatch) return null;
        const tokens = [
            new SequenceToken('KEYWORD_DECL', declMatch[1], lineIdx),
            new SequenceToken('IDENTIFIER', declMatch[2], lineIdx)
        ];
        if (declMatch[3]) {
            tokens.push(new SequenceToken('KEYWORD_AS', 'as', lineIdx));
            tokens.push(new SequenceToken('STRING', declMatch[3].trim(), lineIdx));
        }
        return tokens;
    }

    static _matchMessage(line, lineIdx) {
        const msgMatch = line.match(/^([a-zA-Z0-9_$]+)\s*(->>|-->>|->|-->|-x|--x)\s*([a-zA-Z0-9_$]+)\s*:\s*(.+)$/);
        if (!msgMatch) return null;
        return [
            new SequenceToken('IDENTIFIER', msgMatch[1], lineIdx),
            new SequenceToken('ARROW', msgMatch[2], lineIdx),
            new SequenceToken('IDENTIFIER', msgMatch[3], lineIdx),
            new SequenceToken('COLON', ':', lineIdx),
            new SequenceToken('STRING', msgMatch[4].trim(), lineIdx)
        ];
    }

    static tokenize(sourceText) {
        const tokens = [];
        const lines = (sourceText || '').trim().split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line.startsWith('%%')) continue;

            if (line === 'sequenceDiagram') {
                tokens.push(new SequenceToken('KEYWORD_SD', 'sequenceDiagram', i + 1));
                continue;
            }
            if (line === 'autonumber') {
                tokens.push(new SequenceToken('KEYWORD_AUTONUMBER', 'autonumber', i + 1));
                continue;
            }

            const declTokens = SequenceLexer._matchDeclaration(line, i + 1);
            if (declTokens) {
                tokens.push(...declTokens);
                continue;
            }

            const msgTokens = SequenceLexer._matchMessage(line, i + 1);
            if (msgTokens) {
                tokens.push(...msgTokens);
                continue;
            }
        }
        return tokens;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SequenceLexer };
}
