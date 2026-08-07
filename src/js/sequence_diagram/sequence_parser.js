/**
 * @fileoverview シーケンス図 構文解析モジュール (SequenceParser)
 * パッケージ: src/js/sequence_diagram/sequence_parser.js
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

import { SequenceAST, SequenceMessage } from './sequence_models.js';

export class SequenceParser {
    static _parseDeclaration(tokens, idx, ast) {
        const pType = tokens[idx].value;
        let nextIdx = idx + 1;
        if (nextIdx < tokens.length && tokens[nextIdx].type === 'IDENTIFIER') {
            const pId = tokens[nextIdx].value;
            nextIdx++;
            let label = pId;
            if (nextIdx < tokens.length && tokens[nextIdx].type === 'KEYWORD_AS') {
                nextIdx++;
                if (nextIdx < tokens.length && tokens[nextIdx].type === 'STRING') {
                    label = tokens[nextIdx].value;
                    nextIdx++;
                }
            }
            ast.addParticipant(pId, label, pType);
        }
        return nextIdx;
    }

    static _parseMessage(tokens, idx, ast, stepState) {
        const fromId = tokens[idx].value;
        let nextIdx = idx + 1;
        if (nextIdx < tokens.length && tokens[nextIdx].type === 'ARROW') {
            const arrow = tokens[nextIdx].value;
            nextIdx++;
            if (nextIdx < tokens.length && tokens[nextIdx].type === 'IDENTIFIER') {
                const toId = tokens[nextIdx].value;
                nextIdx++;
                let msgText = '';
                if (nextIdx < tokens.length && tokens[nextIdx].type === 'COLON') {
                    nextIdx++;
                    if (nextIdx < tokens.length && tokens[nextIdx].type === 'STRING') {
                        msgText = tokens[nextIdx].value;
                        nextIdx++;
                    }
                }
                ast.addParticipant(fromId);
                ast.addParticipant(toId);
                ast.messages.push(new SequenceMessage(stepState.counter++, fromId, toId, arrow, msgText));
                return nextIdx;
            }
        }
        return idx + 1;
    }

    static parse(tokens) {
        const ast = new SequenceAST();
        const stepState = { counter: 1 };
        let idx = 0;
        const len = tokens.length;

        while (idx < len) {
            const tok = tokens[idx];
            if (tok.type === 'KEYWORD_AUTONUMBER') {
                ast.autonumber = true;
                idx++;
                continue;
            }
            if (tok.type === 'KEYWORD_DECL') {
                idx = SequenceParser._parseDeclaration(tokens, idx, ast);
                continue;
            }
            if (tok.type === 'IDENTIFIER') {
                idx = SequenceParser._parseMessage(tokens, idx, ast, stepState);
                continue;
            }
            idx++;
        }
        return ast;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SequenceParser };
}
