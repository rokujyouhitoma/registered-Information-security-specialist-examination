/**
 * @fileoverview 外部公開ファサードエントリーポイント (src/js/sequence_renderer.js)
 * src/js/sequence_diagram/ パッケージモジュール群の一元バインディング
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

import SequencePackage from './sequence_diagram/index.js';

const SequenceDiagramModule = {
    Token: SequencePackage.SequenceToken,
    Participant: SequencePackage.SequenceParticipant,
    Message: SequencePackage.SequenceMessage,
    AST: SequencePackage.SequenceAST,
    Lexer: SequencePackage.SequenceLexer,
    Parser: SequencePackage.SequenceParser,
    Renderer: SequencePackage.SequenceSVGCalculatedRenderer,
    Facade: SequencePackage.SequenceDiagramFacade,
    render: SequencePackage.render
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SequenceDiagramModule;
}
if (typeof window !== 'undefined') {
    window.SequenceDiagramRenderer = SequenceDiagramModule;
}

export default SequenceDiagramModule;
