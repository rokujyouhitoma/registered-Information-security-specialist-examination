/**
 * @fileoverview シーケンス図パッケージ エントリーポイント (index.js)
 * パッケージ: src/js/sequence_diagram/index.js
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

import { SequenceToken, SequenceParticipant, SequenceMessage, SequenceAST } from './sequence_models.js';
import { SequenceLexer } from './sequence_lexer.js';
import { SequenceParser } from './sequence_parser.js';
import { SequenceSVGCalculatedRenderer } from './sequence_svg_renderer.js';

export class SequenceDiagramFacade {
    static render(dslText) {
        const tokens = SequenceLexer.tokenize(dslText);
        const ast = SequenceParser.parse(tokens);
        return SequenceSVGCalculatedRenderer.render(ast);
    }
}

export const SequencePackage = {
    SequenceToken,
    SequenceParticipant,
    SequenceMessage,
    SequenceAST,
    SequenceLexer,
    SequenceParser,
    SequenceSVGCalculatedRenderer,
    SequenceDiagramFacade,
    render: SequenceDiagramFacade.render
};

export {
    SequenceToken,
    SequenceParticipant,
    SequenceMessage,
    SequenceAST,
    SequenceLexer,
    SequenceParser,
    SequenceSVGCalculatedRenderer
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SequencePackage;
}
if (typeof window !== 'undefined') {
    window.SequenceDiagramPackage = SequencePackage;
}

export default SequencePackage;
