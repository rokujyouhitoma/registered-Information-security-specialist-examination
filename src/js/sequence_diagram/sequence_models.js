/**
 * @fileoverview シーケンス図データモデル群 (Token, Participant, Message, AST)
 * パッケージ: src/js/sequence_diagram/sequence_models.js
 * ADR-02 準拠 (サイクロマティック複雑度 V(G) <= 10)
 */

export class SequenceToken {
    constructor(type, value, line = 0) {
        this.type = type;
        this.value = value;
        this.line = line;
    }
}

export class SequenceParticipant {
    constructor(id, label = null, type = 'participant') {
        this.id = id;
        this.label = label || id;
        this.type = type;
    }
}

export class SequenceMessage {
    constructor(step, fromId, toId, arrow, text) {
        this.step = step;
        this.fromId = fromId;
        this.toId = toId;
        this.arrow = arrow;
        this.text = text;
    }
}

export class SequenceAST {
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SequenceToken,
        SequenceParticipant,
        SequenceMessage,
        SequenceAST
    };
}
