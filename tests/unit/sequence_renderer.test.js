import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Node.js 環境でブラウザ用 JS モジュールを評価
const sequenceRendererScript = fs.readFileSync(path.resolve('src/js/sequence_renderer.js'), 'utf-8');

global.window = {};
eval(sequenceRendererScript);

const SequenceDiagramRenderer = global.window.SequenceDiagramRenderer;

test('SequenceDiagramRenderer - Lexer Tokenization Test', (t) => {
    const sampleDsl = `sequenceDiagram
    autonumber
    actor A as 攻撃者
    participant B as サーバー
    A->>B: 攻撃パケット`;

    const tokens = SequenceDiagramRenderer.Lexer.tokenize(sampleDsl);
    assert.ok(tokens.length > 0);
    assert.strictEqual(tokens[0].type, 'KEYWORD_SD');
    assert.strictEqual(tokens[1].type, 'KEYWORD_AUTONUMBER');
    assert.strictEqual(tokens[2].type, 'KEYWORD_DECL');
    assert.strictEqual(tokens[2].value, 'actor');
});

test('SequenceDiagramRenderer - Parser AST Building Test', (t) => {
    const sampleDsl = `sequenceDiagram
    autonumber
    actor Attacker as 攻撃者 (外部)
    participant FW as 境界FW
    Attacker->>FW: SYN パケット送信`;

    const tokens = SequenceDiagramRenderer.Lexer.tokenize(sampleDsl);
    const ast = SequenceDiagramRenderer.Parser.parse(tokens);

    assert.strictEqual(ast.autonumber, true);
    assert.strictEqual(ast.participants.length, 2);
    assert.strictEqual(ast.participants[0].id, 'Attacker');
    assert.strictEqual(ast.participants[0].label, '攻撃者 (外部)');
    assert.strictEqual(ast.participants[0].type, 'actor');
    assert.strictEqual(ast.messages.length, 1);
    assert.strictEqual(ast.messages[0].step, 1);
    assert.strictEqual(ast.messages[0].text, 'SYN パケット送信');
});

test('SequenceDiagramRenderer - Native SVG Output Test', (t) => {
    const sampleDsl = `sequenceDiagram
    autonumber
    actor Attacker as 攻撃者 (外部)
    participant FW as 境界FW / VPN機器
    participant C2 as 外部C2サーバー
    participant DC as Active Directory Domain Controller
    participant FS as 社内ファイルサーバー

    Attacker->>FW: 未パッチ脆弱性 (RCE) 攻撃パケット送信
    FW->>C2: 逆接続 (Reverse Shell / UDP 8443)
    Attacker->>DC: Pass-the-Hash による管理者権限奪取 (Event ID 4624 Type 3)
    Attacker->>FS: 機密データの圧縮・暗号化・DLP回避送信`;

    const svgHtml = SequenceDiagramRenderer.render(sampleDsl);
    assert.ok(svgHtml.includes('<svg class="sequence-diagram"'));
    assert.ok(svgHtml.includes('👤 攻撃者 (外部)'));
    assert.ok(svgHtml.includes('境界FW / VPN機器'));
    assert.ok(svgHtml.includes('(1) 未パッチ脆弱性 (RCE) 攻撃パケット送信'));
    assert.ok(svgHtml.includes('marker-end="url(#seq-arrow-solid-js)"'));
});
