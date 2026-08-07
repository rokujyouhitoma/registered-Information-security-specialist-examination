/**
 * @fileoverview シーケンス図 SVG 計算・描画モジュール (SequenceSVGCalculatedRenderer)
 * パッケージ: src/js/sequence_diagram/sequence_svg_renderer.js
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

export class SequenceSVGCalculatedRenderer {
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
        const C = SequenceSVGCalculatedRenderer.constants;
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
        const C = SequenceSVGCalculatedRenderer.constants;
        const boxX = x - C.ACTOR_WIDTH / 2;
        const boxY = y - C.ACTOR_HEIGHT / 2;
        const isActor = p.type === 'actor';
        const grad = isActor ? 'url(#seq-actor-grad-js)' : 'url(#seq-node-grad-js)';
        const stroke = isActor ? '#818cf8' : '#3b82f6';
        const iconStr = isActor ? '👤 ' : '';
        const label = SequenceSVGCalculatedRenderer.escapeHtml(iconStr + p.label);

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
        const text = SequenceSVGCalculatedRenderer.escapeHtml(stepPrefix + msg.text);
        const midX = (x1 + x2) / 2;
        const lineX2 = x2 > x1 ? x2 - 8 : x2 + 8;

        return `<text x="${midX}" y="${y - 10}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#cbd5e1" text-anchor="middle">${text}</text>
        <line x1="${x1}" y1="${y}" x2="${lineX2}" y2="${y}" stroke="${strokeColor}" stroke-width="2" ${dashAttr} marker-end="${marker}" />`;
    }

    static render(ast) {
        if (!ast || !ast.participants || ast.participants.length === 0) {
            return '<div class="sequence-error">空のシーケンス図です</div>';
        }

        const C = SequenceSVGCalculatedRenderer.constants;
        const nPart = ast.participants.length;
        const nMsg = ast.messages.length;
        const totalWidth = C.PADDING_X * 2 + nPart * C.COL_WIDTH;
        const totalHeight = C.HEADER_Y * 2 + (nMsg + 1) * C.ROW_HEIGHT;
        const xMap = SequenceSVGCalculatedRenderer.getXMap(ast.participants);
        const elements = [SequenceSVGCalculatedRenderer.renderDefs()];

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
            elements.push(SequenceSVGCalculatedRenderer.renderMessageStep(msg, ast.autonumber, x1, x2, y));
        });

        // 3. 上下ノードボックス
        ast.participants.forEach(p => {
            const x = xMap[p.id];
            elements.push(SequenceSVGCalculatedRenderer.renderParticipantBox(p, x, topY));
            elements.push(SequenceSVGCalculatedRenderer.renderParticipantBox(p, x, bottomY));
        });

        const innerSvg = elements.join('\n');
        return `<div class="sequence-diagram-wrapper" style="overflow-x: auto; margin: 1.5rem 0; text-align: center;">
    <svg class="sequence-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" style="max-width: 100%; height: auto; background: #0f172a; border-radius: 12px; padding: 10px; border: 1px solid #1e293b; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
        ${innerSvg}
    </svg>
</div>`;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SequenceSVGCalculatedRenderer };
}
