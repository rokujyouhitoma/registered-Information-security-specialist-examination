/**
 * @fileoverview 外部依存ゼロの自作シーケンス図 (Sequence Diagram) レンダラーライブラリ
 * クラス設計 SA × コンパイラ SA × レンダリング SA 合同設計 (High Cohesion & Low Coupling)
 * ADR-02 準拠 (全関数 サイクロマティック複雑度 V(G) <= 10)
 */

// ── 1. TOKEN & AST DATA STRUCTURES (データモデル) ──

class SequenceToken {
    constructor(type, value, line = 0) {
        this.type = type;
        this.value = value;
        this.line = line;
    }
}

class SequenceParticipant {
    constructor(id, label = None, type = 'participant') {
        this.id = id;
        this.label = label || id;
        this.type = type;
    }
}

class SequenceMessage {
    constructor(step, fromId, toId, arrow, text) {
        this.step = step;
        this.fromId = fromId;
        this.toId = toId;
        this.arrow = arrow;
        this.text = text;
    }
}

class SequenceAST {
    constructor() {
        this.autonumber = false;
        this.participants = [];
        this.participantMap = Object.create(null);
        this.messages = [];
    }

    addParticipant(id, label, type) {
        if (!this.participantMap[id]) {
            const node = new SequenceParticipant(id, label, type);
            this.participants.push(node);
            this.participantMap[id] = node;
        } else if (label) {
            this.participantMap[id].label = label;
            if (type && type !== 'participant') {
                this.participantMap[id].type = type;
            }
        }
    }
}


// ── 2. LEXER (字句解析器 - 高凝集トークン分離) ──

class SequenceLexer {
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


// ── 3. PARSER (構文解析器 - 文法パース & AST 構築) ──

class SequenceParser {
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


// ── 4. RENDERER (SVG レンダリングエンジン - 低結合・純粋関数) ──

class SequenceRenderer {
    static get constants() {
        return {
            COL_WIDTH: 200,
            ROW_HEIGHT: 70,
            PADDING_X: 60,
            HEADER_Y: 60,
            ACTOR_WIDTH: 150,
            ACTOR_HEIGHT: 42
        };
    }

    static escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    static getXMap(participants) {
        const xMap = Object.create(null);
        const C = SequenceRenderer.constants;
        participants.forEach((p, i) => {
            xMap[p.id] = C.PADDING_X + (i * C.COL_WIDTH) + (C.COL_WIDTH / 2);
        });
        return xMap;
    }

    static renderDefs() {
        return `<defs>
            <marker id="seq-arrow-solid-js" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
            <marker id="seq-arrow-dashed-js" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a5b4fc" />
            </marker>
            <linearGradient id="seq-node-grad-js" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="seq-actor-grad-js" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#312e81" />
                <stop offset="100%" stop-color="#1e1b4b" />
            </linearGradient>
        </defs>`;
    }

    static renderParticipantBox(p, x, y) {
        const C = SequenceRenderer.constants;
        const boxX = x - C.ACTOR_WIDTH / 2;
        const boxY = y - C.ACTOR_HEIGHT / 2;
        const isActor = p.type === 'actor';
        const grad = isActor ? 'url(#seq-actor-grad-js)' : 'url(#seq-node-grad-js)';
        const stroke = isActor ? '#818cf8' : '#3b82f6';
        const iconStr = isActor ? '👤 ' : '';
        const label = SequenceRenderer.escapeHtml(iconStr + p.label);

        return `<g class="seq-participant-node">
            <rect x="${boxX}" y="${boxY}" width="${C.ACTOR_WIDTH}" height="${C.ACTOR_HEIGHT}" rx="8" ry="8" fill="${grad}" stroke="${stroke}" stroke-width="1.5" />
            <text x="${x}" y="${y + 5}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#f8fafc" text-anchor="middle">${label}</text>
        </g>`;
    }

    static renderMessageStep(msg, autonumber, x1, x2, y) {
        const isDashed = msg.arrow.includes('--');
        const dashAttr = isDashed ? 'stroke-dasharray="5,5"' : '';
        const marker = isDashed ? 'url(#seq-arrow-dashed-js)' : 'url(#seq-arrow-solid-js)';
        const strokeColor = isDashed ? '#a5b4fc' : '#6366f1';
        const stepPrefix = autonumber ? `(${msg.step}) ` : '';
        const text = SequenceRenderer.escapeHtml(stepPrefix + msg.text);
        const midX = (x1 + x2) / 2;
        const lineX2 = x2 > x1 ? x2 - 8 : x2 + 8;

        return `<text x="${midX}" y="${y - 10}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#cbd5e1" text-anchor="middle">${text}</text>
        <line x1="${x1}" y1="${y}" x2="${lineX2}" y2="${y}" stroke="${strokeColor}" stroke-width="2" ${dashAttr} marker-end="${marker}" />`;
    }

    static render(ast) {
        if (!ast || !ast.participants || ast.participants.length === 0) {
            return '<div class="sequence-error">空のシーケンス図です</div>';
        }

        const C = SequenceRenderer.constants;
        const nPart = ast.participants.length;
        const nMsg = ast.messages.length;
        const totalWidth = C.PADDING_X * 2 + nPart * C.COL_WIDTH;
        const totalHeight = C.HEADER_Y * 2 + (nMsg + 1) * C.ROW_HEIGHT;
        const xMap = SequenceRenderer.getXMap(ast.participants);
        const elements = [SequenceRenderer.renderDefs()];

        const topY = C.HEADER_Y;
        const bottomY = totalHeight - C.HEADER_Y;

        // 1. ライフライン縦線
        ast.participants.forEach(p => {
            const x = xMap[p.id];
            elements.push(`<line x1="${x}" y1="${topY}" x2="${x}" y2="${bottomY}" stroke="#334155" stroke-width="1.5" stroke-dasharray="4,4" />`);
        });

        // 2. メッセージステップ
        ast.messages.forEach((msg, idx) => {
            const x1 = xMap[msg.fromId] || C.PADDING_X;
            const x2 = xMap[msg.toId] || C.PADDING_X;
            const y = topY + (idx + 1) * C.ROW_HEIGHT;
            elements.push(SequenceRenderer.renderMessageStep(msg, ast.autonumber, x1, x2, y));
        });

        // 3. 上下ノードボックス
        ast.participants.forEach(p => {
            const x = xMap[p.id];
            elements.push(SequenceRenderer.renderParticipantBox(p, x, topY));
            elements.push(SequenceRenderer.renderParticipantBox(p, x, bottomY));
        });

        const innerSvg = elements.join('\n');
        return `<div class="sequence-diagram-wrapper" style="overflow-x: auto; margin: 1.5rem 0; text-align: center;">
    <svg class="sequence-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" style="max-width: 100%; height: auto; background: #0f172a; border-radius: 12px; padding: 10px; border: 1px solid #1e293b; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
        ${innerSvg}
    </svg>
</div>`;
    }
}


// ── 5. FACADE (ファサード統合調停インターフェース) ──

class SequenceDiagramFacade {
    static render(dslText) {
        const tokens = SequenceLexer.tokenize(dslText);
        const ast = SequenceParser.parse(tokens);
        return SequenceRenderer.render(ast);
    }
}

const SequenceDiagramModule = {
    Token: SequenceToken,
    Participant: SequenceParticipant,
    Message: SequenceMessage,
    AST: SequenceAST,
    Lexer: SequenceLexer,
    Parser: SequenceParser,
    Renderer: SequenceRenderer,
    Facade: SequenceDiagramFacade,
    render: SequenceDiagramFacade.render
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SequenceDiagramModule;
}
if (typeof window !== 'undefined') {
    window.SequenceDiagramRenderer = SequenceDiagramModule;
}
