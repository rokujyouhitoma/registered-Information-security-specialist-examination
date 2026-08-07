#!/usr/bin/env python3
"""
scripts/sequence_diagram_parser.py

外部依存ゼロの自作シーケンス図 (Sequence Diagram) Lexer/Parser/AST/Renderer ライブラリ (ADR-02 準拠)
Mermaid 互換 DSL 形式のシーケンス図テキストを解析し、レスポンシブな標準 SVG XML を生成する。

アーキテクチャ:
  1. SequenceLexer   : DSL ソース文字列のトークン化
  2. SequenceParser  : 文法解析および AST ノードツリー構築
  3. SequenceAST     : 参加者・設定・メッセージステップのデータ構造モデル
  4. SequenceRenderer: SVG XML グラフィックス自動算出＆生成
"""

import html
import re

# ── 1. LEXER (字句解析器) ──

class Token:
    def __init__(self, type_, value, line=0):
        self.type = type_
        self.value = value
        self.line = line

    def __repr__(self):
        return f"Token({self.type}, {repr(self.value)})"

class SequenceLexer:
    """シーケンス図 DSL トークナイザー"""

    @staticmethod
    def tokenize(source_text):
        tokens = []
        lines = source_text.strip().split('\n')

        for line_idx, raw_line in enumerate(lines, 1):
            line = raw_line.strip()
            if not line or line.startswith('%%'):  # 空行またはコメント
                continue

            if line == 'sequenceDiagram':
                tokens.append(Token('KEYWORD_SD', 'sequenceDiagram', line_idx))
                continue
            if line == 'autonumber':
                tokens.append(Token('KEYWORD_AUTONUMBER', 'autonumber', line_idx))
                continue

            # actor / participant 宣言のパース
            decl_match = re.match(r'^(actor|participant)\s+([a-zA-Z0-9_$]+)(?:\s+as\s+(.+))?$', line)
            if decl_match:
                kind, p_id, alias = decl_match.groups()
                tokens.append(Token('KEYWORD_DECL', kind, line_idx))
                tokens.append(Token('IDENTIFIER', p_id, line_idx))
                if alias:
                    tokens.append(Token('KEYWORD_AS', 'as', line_idx))
                    tokens.append(Token('STRING', alias.strip(), line_idx))
                tokens.append(Token('NEWLINE', '\n', line_idx))
                continue

            # メッセージ矢印ステートメントのパース (例: Attacker->>FW: 未パッチ脆弱性...)
            msg_match = re.match(r'^([a-zA-Z0-9_$]+)\s*(->>|-->>|->|-->|-x|--x)\s*([a-zA-Z0-9_$]+)\s*:\s*(.+)$', line)
            if msg_match:
                from_id, arrow, to_id, msg_text = msg_match.groups()
                tokens.append(Token('IDENTIFIER', from_id, line_idx))
                tokens.append(Token('ARROW', arrow, line_idx))
                tokens.append(Token('IDENTIFIER', to_id, line_idx))
                tokens.append(Token('COLON', ':', line_idx))
                tokens.append(Token('STRING', msg_text.strip(), line_idx))
                tokens.append(Token('NEWLINE', '\n', line_idx))
                continue

        return tokens


# ── 2. AST (抽象構文木データモデル) ──

class ParticipantNode:
    def __init__(self, id_, label=None, type_='participant'):
        self.id = id_
        self.label = label or id_
        self.type = type_

class MessageStatement:
    def __init__(self, step, from_id, to_id, arrow, text):
        self.step = step
        self.from_id = from_id
        self.to_id = to_id
        self.arrow = arrow
        self.text = text

class SequenceAST:
    def __init__(self):
        self.autonumber = False
        self.participants = []
        self.participant_map = {}
        self.messages = []

    def add_participant(self, id_, label=None, type_='participant'):
        if id_ not in self.participant_map:
            node = ParticipantNode(id_, label, type_)
            self.participants.append(node)
            self.participant_map[id_] = node
        elif label:
            self.participant_map[id_].label = label
            if type_ != 'participant':
                self.participant_map[id_].type = type_


# ── 3. PARSER (構文解析器) ──

class SequenceParser:
    """トークン列から AST を構築する構文解析器"""

    @staticmethod
    def parse(tokens):
        ast = SequenceAST()
        step_counter = 1
        idx = 0
        n = len(tokens)

        while idx < n:
            tok = tokens[idx]

            if tok.type == 'KEYWORD_AUTONUMBER':
                ast.autonumber = True
                idx += 1
                continue

            if tok.type == 'KEYWORD_DECL':
                p_type = tok.value
                idx += 1
                if idx < n and tokens[idx].type == 'IDENTIFIER':
                    p_id = tokens[idx].value
                    idx += 1
                    label = p_id
                    if idx < n and tokens[idx].type == 'KEYWORD_AS':
                        idx += 1
                        if idx < n and tokens[idx].type == 'STRING':
                            label = tokens[idx].value
                            idx += 1
                    ast.add_participant(p_id, label, p_type)
                continue

            if tok.type == 'IDENTIFIER':
                from_id = tok.value
                idx += 1
                if idx < n and tokens[idx].type == 'ARROW':
                    arrow = tokens[idx].value
                    idx += 1
                    if idx < n and tokens[idx].type == 'IDENTIFIER':
                        to_id = tokens[idx].value
                        idx += 1
                        msg_text = ""
                        if idx < n and tokens[idx].type == 'COLON':
                            idx += 1
                            if idx < n and tokens[idx].type == 'STRING':
                                msg_text = tokens[idx].value
                                idx += 1

                        ast.add_participant(from_id)
                        ast.add_participant(to_id)
                        msg = MessageStatement(step_counter, from_id, to_id, arrow, msg_text)
                        ast.messages.append(msg)
                        step_counter += 1
                        continue
            idx += 1

        return ast


# ── 4. RENDERER (SVG レンダラー) ──

class SequenceRenderer:
    """AST からレスポンシブ SVG XML をレイアウト計算・レンダリングする"""

    # レイアウト定数
    COL_WIDTH = 200
    ROW_HEIGHT = 70
    PADDING_X = 60
    HEADER_Y = 60
    ACTOR_WIDTH = 150
    ACTOR_HEIGHT = 42

    @staticmethod
    def _get_participant_x_map(participants):
        """アクターごとの X 座標マップを算出"""
        x_map = {}
        for i, p in enumerate(participants):
            x_map[p.id] = SequenceRenderer.PADDING_X + (i * SequenceRenderer.COL_WIDTH) + (SequenceRenderer.COL_WIDTH // 2)
        return x_map

    @staticmethod
    def _render_svg_defs():
        """SVG 矢印マーカー定義"""
        return '''<defs>
            <marker id="seq-arrow-solid" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
            <marker id="seq-arrow-dashed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a5b4fc" />
            </marker>
            <linearGradient id="seq-node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="seq-actor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#312e81" />
                <stop offset="100%" stop-color="#1e1b4b" />
            </linearGradient>
        </defs>'''

    @staticmethod
    def _render_participant_box(p, x, y):
        """参加者ノードボックスの描画"""
        w = SequenceRenderer.ACTOR_WIDTH
        h = SequenceRenderer.ACTOR_HEIGHT
        box_x = x - w // 2
        box_y = y - h // 2
        grad = "url(#seq-actor-grad)" if p.type == 'actor' else "url(#seq-node-grad)"
        stroke = "#818cf8" if p.type == 'actor' else "#3b82f6"
        icon_str = "👤 " if p.type == 'actor' else ""
        escaped_label = html.escape(icon_str + p.label)

        return f'''<g class="seq-participant-node">
            <rect x="{box_x}" y="{box_y}" width="{w}" height="{h}" rx="8" ry="8" fill="{grad}" stroke="{stroke}" stroke-width="1.5" />
            <text x="{x}" y="{y + 5}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#f8fafc" text-anchor="middle">{escaped_label}</text>
        </g>'''

    @staticmethod
    def _render_message_step(msg, autonumber, x1, x2, y):
        """メッセージ矢印とステップバッジの描画"""
        is_dashed = '--' in msg.arrow
        dash_attr = 'stroke-dasharray="5,5"' if is_dashed else ''
        marker = 'url(#seq-arrow-dashed)' if is_dashed else 'url(#seq-arrow-solid)'
        stroke_color = "#a5b4fc" if is_dashed else "#6366f1"

        # バッジおよびステップテキスト
        step_prefix = f"({msg.step}) " if autonumber else ""
        escaped_text = html.escape(step_prefix + msg.text)
        mid_x = (x1 + x2) // 2

        # 矢印線の終端微調整
        line_x2 = x2 - 8 if x2 > x1 else x2 + 8

        svg_parts = []
        # テキストラベル
        svg_parts.append(f'<text x="{mid_x}" y="{y - 10}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#cbd5e1" text-anchor="middle">{escaped_text}</text>')
        # 矢印直線
        svg_parts.append(f'<line x1="{x1}" y1="{y}" x2="{line_x2}" y2="{y}" stroke="{stroke_color}" stroke-width="2" {dash_attr} marker-end="{marker}" />')
        return '\n'.join(svg_parts)

    @staticmethod
    def render(ast):
        """AST から全 SVG 文字列を組み立てる"""
        if not ast.participants:
            return '<div class="sequence-error">空のシーケンス図です</div>'

        num_participants = len(ast.participants)
        num_messages = len(ast.messages)

        total_width = SequenceRenderer.PADDING_X * 2 + num_participants * SequenceRenderer.COL_WIDTH
        total_height = SequenceRenderer.HEADER_Y * 2 + (num_messages + 1) * SequenceRenderer.ROW_HEIGHT

        x_map = SequenceRenderer._get_participant_x_map(ast.participants)
        svg_elements = [SequenceRenderer._render_svg_defs()]

        # 1. ライフライン（縦線）の描画
        top_y = SequenceRenderer.HEADER_Y
        bottom_y = total_height - SequenceRenderer.HEADER_Y
        for p in ast.participants:
            x = x_map[p.id]
            svg_elements.append(f'<line x1="{x}" y1="{top_y}" x2="{x}" y2="{bottom_y}" stroke="#334155" stroke-width="1.5" stroke-dasharray="4,4" />')

        # 2. メッセージステップの描画
        for idx, msg in enumerate(ast.messages):
            x1 = x_map.get(msg.from_id, SequenceRenderer.PADDING_X)
            x2 = x_map.get(msg.to_id, SequenceRenderer.PADDING_X)
            y = top_y + (idx + 1) * SequenceRenderer.ROW_HEIGHT
            svg_elements.append(SequenceRenderer._render_message_step(msg, ast.autonumber, x1, x2, y))

        # 3. 上部および下部アクターノードボックスの描画
        for p in ast.participants:
            x = x_map[p.id]
            svg_elements.append(SequenceRenderer._render_participant_box(p, x, top_y))
            svg_elements.append(SequenceRenderer._render_participant_box(p, x, bottom_y))

        inner_svg = '\n'.join(svg_elements)
        return f'''<div class="sequence-diagram-wrapper" style="overflow-x: auto; margin: 1.5rem 0; text-align: center;">
    <svg class="sequence-diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_width} {total_height}" style="max-width: 100%; height: auto; background: #0f172a; border-radius: 12px; padding: 10px; border: 1px solid #1e293b; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
        {inner_svg}
    </svg>
</div>'''


def parse_and_render_sequence_diagram(dsl_text):
    """シーケンス図 DSL テキストをパースして SVG HTML を返す一元化関数"""
    tokens = SequenceLexer.tokenize(dsl_text)
    ast = SequenceParser.parse(tokens)
    return SequenceRenderer.render(ast)

if __name__ == "__main__":
    sample = """sequenceDiagram
    autonumber
    actor Attacker as 攻撃者 (外部)
    participant FW as 境界FW / VPN機器
    participant C2 as 外部C2サーバー
    participant DC as Active Directory Domain Controller
    participant FS as 社内ファイルサーバー

    Attacker->>FW: 未パッチ脆弱性 (RCE) 攻撃パケット送信
    FW->>C2: 逆接続 (Reverse Shell / UDP 8443)
    Attacker->>DC: Pass-the-Hash による管理者権限奪取 (Event ID 4624 Type 3)
    Attacker->>FS: 機密データの圧縮・暗号化・DLP回避送信"""
    print(parse_and_render_sequence_diagram(sample))
