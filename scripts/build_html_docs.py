#!/usr/bin/env python3
"""
scripts/build_html_docs.py

docs/ 配下のすべての Markdown (.md) ドキュメントを再帰的にパースし、
外部ライブラリ非依存（フルスクラッチ）でスタイリッシュな HTML ファイルとして
site/ 配下に出力するビルドスクリプト。
"""

import os
import re
import html

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs"))
SITE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "site"))

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | 情報セキュリティスペシャリスト試験</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-primary: #0a0e1a;
            --bg-card: rgba(255,255,255,0.04);
            --border: rgba(255,255,255,0.08);
            --accent: #6366f1;
            --accent-2: #8b5cf6;
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --code-bg: rgba(0,0,0,0.4);
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: 'Inter', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            line-height: 1.7;
        }}

        /* ── HEADER ── */
        header {{
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--border);
            backdrop-filter: blur(12px);
            background: rgba(10,14,26,0.85);
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}

        .header-brand {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            color: var(--text-primary);
        }}
        .header-icon {{
            width: 34px; height: 34px;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1rem;
        }}
        .header-title {{ font-weight: 700; font-size: 0.95rem; }}

        .header-nav {{
            display: flex;
            align-items: center;
            gap: 1rem;
        }}
        .nav-btn {{
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            border: 1px solid var(--border);
            transition: all 0.2s;
        }}
        .nav-btn:hover {{
            color: var(--text-primary);
            border-color: var(--accent);
            background: rgba(99,102,241,0.1);
        }}

        /* ── MAIN CONTENT ── */
        .container {{
            max-width: 960px;
            margin: 0 auto;
            padding: 2.5rem 1.5rem 5rem;
        }}

        .doc-content h1 {{
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border);
            background: linear-gradient(135deg, #e0e7ff, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }}

        .doc-content h2 {{
            font-size: 1.5rem;
            font-weight: 700;
            margin: 2rem 0 1rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            color: #c7d2fe;
        }}

        .doc-content h3 {{
            font-size: 1.2rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem;
            color: #e0e7ff;
        }}

        .doc-content h4 {{
            font-size: 1.05rem;
            font-weight: 600;
            margin: 1.25rem 0 0.5rem;
            color: var(--text-primary);
        }}

        .doc-content p {{
            margin-bottom: 1rem;
            color: var(--text-primary);
        }}

        .doc-content ul, .doc-content ol {{
            margin: 0.5rem 0 1.25rem 1.5rem;
        }}

        .doc-content li {{
            margin-bottom: 0.4rem;
        }}

        .doc-content a {{
            color: #818cf8;
            text-decoration: none;
            transition: color 0.2s;
        }}
        .doc-content a:hover {{
            color: #a5b4fc;
            text-decoration: underline;
        }}

        .doc-content blockquote {{
            border-left: 3px solid var(--accent);
            padding: 0.75rem 1.25rem;
            margin: 1rem 0;
            background: rgba(99,102,241,0.05);
            border-radius: 0 8px 8px 0;
            color: var(--text-secondary);
        }}

        .doc-content code {{
            font-family: 'JetBrains Mono', monospace;
            background: var(--code-bg);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.88em;
            color: #f472b6;
            border: 1px solid rgba(255,255,255,0.06);
        }}

        .doc-content pre {{
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 1.25rem;
            overflow-x: auto;
            margin: 1.25rem 0;
        }}
        .doc-content pre code {{
            background: none;
            padding: 0;
            border: none;
            color: #e2e8f0;
            font-size: 0.9em;
        }}

        /* ── TABLE STYLES ── */
        .table-wrapper {{
            overflow-x: auto;
            margin: 1.5rem 0;
            border-radius: 10px;
            border: 1px solid var(--border);
        }}

        .doc-content table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            text-align: left;
        }}

        .doc-content th {{
            background: rgba(255,255,255,0.06);
            padding: 0.75rem 1rem;
            font-weight: 600;
            color: #e0e7ff;
            border-bottom: 1px solid var(--border);
        }}

        .doc-content td {{
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.04);
        }}

        .doc-content tr:last-child td {{
            border-bottom: none;
        }}

        .doc-content tr:hover td {{
            background: rgba(255,255,255,0.02);
        }}

        .doc-content hr {{
            border: none;
            height: 1px;
            background: var(--border);
            margin: 2rem 0;
        }}

        /* ── FOOTER ── */
        footer {{
            border-top: 1px solid var(--border);
            padding: 2rem;
            text-align: center;
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 4rem;
        }}
        footer a {{ color: var(--accent); text-decoration: none; }}
    </style>
</head>
<body>

<header>
    <a href="{rel_root}index.html" class="header-brand">
        <div class="header-icon">🛡️</div>
        <div class="header-title">SC 試験 学習ポータル</div>
    </a>
    <div class="header-nav">
        <a href="{rel_root}index.html" class="nav-btn">🏠 トップ</a>
        <a href="{rel_root}search.html" class="nav-btn">🔍 全文検索</a>
    </div>
</header>

<div class="container">
    <article class="doc-content">
{content}
    </article>
</div>

<footer>
    <p>情報セキュリティスペシャリスト試験 総合学習プラットフォーム · IPA シラバス Ver.2.1 ＆ 補足 Ver.4.0 準拠</p>
</footer>

</body>
</html>
"""


def parse_inline(text):
    """インライン要素 (太字, 斜体, コード, リンク) の変換"""
    # エスケープ前のHTMLアンカー処理
    # 画像
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<img src="\2" alt="\1" style="max-width:100%;">', text)

    # リンク: .md パスを .html パスに自動変換
    def link_repl(match):
        label = match.group(1)
        url = match.group(2)
        # .md 拡張子リンクを .html へ置換
        if url.endswith('.md'):
            url = url[:-3] + '.html'
        elif '.md#' in url:
            url = url.replace('.md#', '.html#')
        return f'<a href="{url}">{label}</a>'

    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link_repl, text)

    # HTMLアンカータグ (<a id="..."></a>) の安全化と維持
    text = re.sub(r'<a id="([^"]+)">(.*?)</a>', r'<span id="\1">\2</span>', text)

    # インラインコード `code`
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)

    # 太字 **text**
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)

    # 斜体 *text*
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)

    return text


def markdown_to_html(md_text):
    """フルスクラッチ簡易Markdown -> HTML変換コンバーター"""
    lines = md_text.split('\n')
    html_out = []

    in_code_block = False
    code_block_lines = []

    in_table = False
    table_lines = []

    in_list = False
    list_type = 'ul'

    for line in lines:
        # ── コードブロックの処理 ──
        if line.strip().startswith('```'):
            if in_code_block:
                code_content = html.escape('\n'.join(code_block_lines))
                html_out.append(f'<pre><code>{code_content}</code></pre>')
                code_block_lines = []
                in_code_block = False
            else:
                if in_list:
                    html_out.append(f'</{list_type}>')
                    in_list = False
                in_code_block = True
            continue

        if in_code_block:
            code_block_lines.append(line)
            continue

        # ── テーブル処理 ──
        if line.strip().startswith('|') and line.strip().endswith('|'):
            if not in_table:
                if in_list:
                    html_out.append(f'</{list_type}>')
                    in_list = False
                in_table = True
                table_lines = []
            table_lines.append(line.strip())
            continue
        elif in_table:
            # テーブル終了・出力
            in_table = False
            html_out.append(render_table(table_lines))
            table_lines = []

        # ── 空行処理 ──
        if not line.strip():
            if in_list:
                html_out.append(f'</{list_type}>')
                in_list = False
            continue

        # ── ヘッダー処理 ──
        if line.startswith('#'):
            if in_list:
                html_out.append(f'</{list_type}>')
                in_list = False

            m = re.match(r'^(#{1,6})\s+(.*)$', line)
            if m:
                level = len(m.group(1))
                h_text = parse_inline(m.group(2))
                # ID アンカーの自動生成
                clean_id = re.sub(r'<[^>]+>', '', h_text).strip().lower()
                clean_id = re.sub(r'[^\w\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff-]+', '-', clean_id)
                html_out.append(f'<h{level} id="{clean_id}">{h_text}</h{level}>')
                continue

        # ── 水平線 ──
        if re.match(r'^(---|\*\*\*|___)\s*$', line.strip()):
            if in_list:
                html_out.append(f'</{list_type}>')
                in_list = False
            html_out.append('<hr>')
            continue

        # ── 引用 (Blockquote) ──
        if line.startswith('> '):
            if in_list:
                html_out.append(f'</{list_type}>')
                in_list = False
            bq_text = parse_inline(line[2:])
            html_out.append(f'<blockquote><p>{bq_text}</p></blockquote>')
            continue

        # ── リスト (UL / OL) ──
        ul_match = re.match(r'^[\s]*[-*+]\s+(.*)$', line)
        ol_match = re.match(r'^[\s]*\d+\.\s+(.*)$', line)

        if ul_match or ol_match:
            item_text = parse_inline(ul_match.group(1) if ul_match else ol_match.group(1))
            current_type = 'ul' if ul_match else 'ol'

            if not in_list:
                in_list = True
                list_type = current_type
                html_out.append(f'<{list_type}>')
            elif list_type != current_type:
                html_out.append(f'</{list_type}>')
                list_type = current_type
                html_out.append(f'<{list_type}>')

            html_out.append(f'<li>{item_text}</li>')
            continue

        if in_list:
            html_out.append(f'</{list_type}>')
            in_list = False

        # ── 通常のパラグラフ ──
        p_text = parse_inline(line)
        html_out.append(f'<p>{p_text}</p>')

    # 収束処理
    if in_table and table_lines:
        html_out.append(render_table(table_lines))
    if in_list:
        html_out.append(f'</{list_type}>')

    return '\n'.join(html_out)


def render_table(table_lines):
    """テーブル行配列 -> <table> HTML"""
    if not table_lines:
        return ''

    rows = []
    for line in table_lines:
        cells = [c.strip() for c in line.strip('|').split('|')]
        rows.append(cells)

    if len(rows) < 2:
        return ''

    header_cells = rows[0]
    # セパレータ行 (--- | ---) をスキップ
    body_rows = [r for r in rows[1:] if not all(re.match(r'^:?-+:?$', c) for c in r)]

    out = ['<div class="table-wrapper"><table><thead><tr>']
    for hc in header_cells:
        out.append(f'<th>{parse_inline(hc)}</th>')
    out.append('</tr></thead><tbody>')

    for r in body_rows:
        out.append('<tr>')
        for cell in r:
            out.append(f'<td>{parse_inline(cell)}</td>')
        out.append('</tr>')

    out.append('</tbody></table></div>')
    return ''.join(out)


def build_docs():
    """docs/ 配下のすべての md ファイルを site/ に HTML としてビルド"""
    count = 0
    print("🛠️ docs/ 配下の Markdown ドキュメントを HTML に変換中...")

    for root, dirs, files in os.walk(DOCS_DIR):
        for f in files:
            if not f.endswith('.md'):
                continue

            md_path = os.path.join(root, f)
            rel_path = os.path.relpath(md_path, DOCS_DIR)

            # docs/index.md は site/index.html (トップポータル) と重複しないよう docs_index.html にマッピング
            if rel_path == 'index.md':
                html_rel_path = 'docs_index.html'
            else:
                html_rel_path = os.path.splitext(rel_path)[0] + '.html'
            dest_html_path = os.path.join(SITE_DIR, html_rel_path)

            os.makedirs(os.path.dirname(dest_html_path), exist_ok=True)

            # 相対ルート深さの計算 (ヘッダーナビゲーション用)
            depth = len(os.path.dirname(html_rel_path).split(os.sep)) if os.path.dirname(html_rel_path) else 0
            rel_root = '../' * depth if depth > 0 else './'

            with open(md_path, 'r', encoding='utf-8') as file:
                md_text = file.read()

            # タイトル抽出 (最初の h1 見出し、無ければファイル名)
            h1_match = re.search(r'^#\s+(.+)$', md_text, re.MULTILINE)
            doc_title = h1_match.group(1).strip() if h1_match else os.path.splitext(f)[0]

            # HTMLコンテンツに変換
            rendered_body = markdown_to_html(md_text)

            full_html = HTML_TEMPLATE.format(
                title=html.escape(doc_title),
                content=rendered_body,
                rel_root=rel_root
            )

            with open(dest_html_path, 'w', encoding='utf-8') as out_f:
                out_f.write(full_html)

            count += 1
            print(f"  ✅ [生成] site/{html_rel_path}")

    print(f"\n🎉 計 {count} 件のドキュメントを site/ 配下に正常出力しました！")


if __name__ == '__main__':
    build_docs()
