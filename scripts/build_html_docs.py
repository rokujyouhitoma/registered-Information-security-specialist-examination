#!/usr/bin/env python3
"""
scripts/build_html_docs.py

docs/ 配下のすべての Markdown (.md) ドキュメントを再帰的にパースし、
外部ライブラリ非依存（フルスクラッチ）でスタイリッシュな HTML ファイルとして
site/ 配下に出力するビルドスクリプト。
"""

import os
import sys
import re
import html
import shutil

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "content"))
SITE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "site"))
SRC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | 情報セキュリティスペシャリスト試験</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="manifest" href="{rel_root}manifest.json">
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

        /* ── LAYOUT ── */
        .layout-header {{
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(10, 14, 26, 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            padding: 0.75rem 2rem;
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
            font-weight: 700;
            font-size: 1.1rem;
        }}
        .header-brand-icon {{
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
            color: #fff;
        }}

        .header-nav {{
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }}
        .nav-btn {{
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.2s;
        }}
        .nav-btn:hover {{ color: var(--text-primary); }}

        .container {{
            max-width: 900px;
            margin: 0 auto;
            padding: 2.5rem 1.5rem 5rem;
        }}

        /* ── TYPOGRAPHY ── */
        .doc-content h1 {{
            font-size: 2.2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #fff 30%, var(--text-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.3;
        }}

        .doc-content h2 {{
            font-size: 1.5rem;
            font-weight: 700;
            margin: 2.5rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border);
            color: #e2e8f0;
        }}

        .doc-content h3 {{
            font-size: 1.2rem;
            font-weight: 600;
            margin: 1.75rem 0 0.75rem;
            color: #cbd5e1;
        }}

        .doc-content p {{
            margin-bottom: 1.25rem;
            color: var(--text-secondary);
            font-size: 1rem;
        }}

        .doc-content ul, .doc-content ol {{
            margin: 1rem 0 1.5rem 1.5rem;
            color: var(--text-secondary);
        }}
        .doc-content li {{
            margin-bottom: 0.5rem;
        }}

        .doc-content a {{
            color: var(--accent);
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
            color: var(--text-primary);
            border-bottom: 1px solid var(--border);
        }}

        .doc-content td {{
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            color: var(--text-secondary);
        }}

        .doc-content tr:last-child td {{
            border-bottom: none;
        }}

        .doc-content tr:hover td {{
            background: rgba(255,255,255,0.02);
        }}

        /* ── FOOTER ── */
        .layout-footer {{
            border-top: 1px solid var(--border);
            padding: 2rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-top: auto;
        }}
    </style>
</head>
<body>

    <header class="layout-header">
        <a href="{rel_root}index.html" class="header-brand">
            <div class="header-brand-icon">SC</div>
            <span>情報処理安全確保支援士試験 総合学習</span>
        </a>
        <nav class="header-nav">
            <a href="{rel_root}index.html" class="nav-btn">🏠 トップ</a>
            <a href="{rel_root}search.html" class="nav-btn">🔍 全文検索</a>
            <a href="{rel_root}quiz.html" class="nav-btn">🧠 クイズ演習</a>
            <a href="{rel_root}exam_cheatsheet.html" class="nav-btn">⚡ 虎の巻</a>
            <a href="{rel_root}syllabus.html" class="nav-btn">📖 シラバス</a>
            <a href="{rel_root}glossary.html" class="nav-btn">📚 用語辞書</a>
        </nav>
    </header>

    <main class="container">
        <article class="doc-content" id="spa-view-container">
            {content}
        </article>
    </main>

    <footer class="layout-footer">
        Registered Information Security Specialist Examination Knowledge Portal &copy; 2026
    </footer>

    <!-- SPA Core Framework & App Module -->
    <script src="{rel_root}js/frameworks/event.js"></script>
    <script src="{rel_root}js/frameworks/publisher.js"></script>
    <script src="{rel_root}js/frameworks/router.js"></script>
    <script src="{rel_root}js/frameworks/scene.js"></script>
    <!-- Search Engine Dependencies (must load before fm_index_engine.js) -->
    <script src="{rel_root}js/security_validator.js"></script>
    <script src="{rel_root}js/tokenizer.js"></script>
    <script src="{rel_root}js/vector_scorer.js"></script>
    <script src="{rel_root}js/synonym_expander.js"></script>
    <script src="{rel_root}js/semantic_scorer.js"></script>
    <script src="{rel_root}js/string_compression.js"></script>
    <script src="{rel_root}js/fm_index_engine.js"></script>
    <script src="{rel_root}js/spa_app.js"></script>

    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {{
            window.addEventListener('load', () => {{
                navigator.serviceWorker.register('{rel_root}sw.js')
                    .then(reg => console.log('SW Registered:', reg.scope))
                    .catch(err => console.error('SW Registration Failed:', err));
            }});
        }}
    </script>
</body>
</html>
"""

def parse_inline(text):
    """インライン要素（リンク, 太字, コード, 画像）のパース"""
    # エスケープ防止のため個別タグ化前に処理
    # 画像 ! [alt] (url)
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<img src="\2" alt="\1" style="max-width:100%; border-radius:8px; margin:1rem 0;">', text)
    # リンク [text](url)
    def link_repl(m):
        link_text = m.group(1)
        url = m.group(2)
        if url.endswith('.md'):
            url = url[:-3] + '.html'
        return f'<a href="{url}">{link_text}</a>'
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link_repl, text)
    # 太字 **text**
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # インラインコード `code`
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text


def render_table(table_lines):
    """Markdown 表形式データを HTML <table> に変換"""
    if not table_lines or len(table_lines) < 2:
        return ""

    headers_raw = table_lines[0].strip('|').split('|')
    header_cells = [h.strip() for h in headers_raw]

    # セパレータ行 (2行目) はスキップ
    body_rows_raw = table_lines[2:]
    body_rows = []
    for line in body_rows_raw:
        cells_raw = line.strip('|').split('|')
        cells = [c.strip() for c in cells_raw]
        body_rows.append(cells)

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


def copy_static_assets():
    """src/ 配下の JS モジュールおよび静的アセット (sw.js, manifest.json) を site/ に同期コピー"""
    os.makedirs(SITE_DIR, exist_ok=True)

    # 1. src/assets -> site/
    assets_dir = os.path.join(SRC_DIR, "assets")
    if os.path.exists(assets_dir):
        for item in os.listdir(assets_dir):
            s_path = os.path.join(assets_dir, item)
            d_path = os.path.join(SITE_DIR, item)
            if os.path.isfile(s_path):
                shutil.copy2(s_path, d_path)
                print(f"  📦 [アセットコピー] {item} -> site/{item}")

    # 2. src/js -> site/js
    js_src_dir = os.path.join(SRC_DIR, "js")
    js_dest_dir = os.path.join(SITE_DIR, "js")
    if os.path.exists(js_src_dir):
        shutil.copytree(js_src_dir, js_dest_dir, dirs_exist_ok=True)
        print(f"  📦 [JSツリーコピー] js/ -> site/js/")

    # 3. src/data -> site/data
    data_src_dir = os.path.join(SRC_DIR, "data")
    data_dest_dir = os.path.join(SITE_DIR, "data")
    if os.path.exists(data_src_dir):
        shutil.copytree(data_src_dir, data_dest_dir, dirs_exist_ok=True)
        print(f"  📦 [データツリーコピー] data/ -> site/data/")


from sequence_diagram_parser import parse_and_render_sequence_diagram

def markdown_to_html(md_text):
    """簡易 Markdown パーサー (自作 Sequence Diagram SVG レンダラー統合)"""
    lines = md_text.split('\n')
    html_out = []

    in_code_block = False
    code_block_lines = []
    code_block_lang = ""

    in_table = False
    table_lines = []

    in_list = False
    list_type = 'ul'
    in_raw_block = False

    for line in lines:
        # ── コードブロックの処理 ──
        if line.strip().startswith('```'):
            if in_code_block:
                code_raw = '\n'.join(code_block_lines)
                if code_block_lang == 'mermaid' or 'sequenceDiagram' in code_raw:
                    # 自作 Lexer -> Parser -> AST -> Renderer による Native SVG 描画
                    svg_html = parse_and_render_sequence_diagram(code_raw)
                    html_out.append(svg_html)
                else:
                    code_content = html.escape(code_raw)
                    html_out.append(f'<pre><code>{code_content}</code></pre>')
                code_block_lines = []
                code_block_lang = ""
                in_code_block = False
            else:
                if in_list:
                    html_out.append(f'</{list_type}>')
                    in_list = False
                in_code_block = True
                code_block_lang = line.strip()[3:].strip().lower()
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

        # ── HTML タグ行 (script, style, div など) または Scriptブロック内部はそのまま出力 ──
        stripped_line = line.strip()
        if stripped_line.startswith('<script') or stripped_line.startswith('<style'):
            in_raw_block = True
            html_out.append(line)
            continue
        if stripped_line.startswith('</script>') or stripped_line.startswith('</style>'):
            in_raw_block = False
            html_out.append(line)
            continue
        if in_raw_block:
            html_out.append(line)
            continue
        if stripped_line.startswith('<') and not re.match(r'^<https?://', stripped_line):
            html_out.append(line)
            continue

        # ── 通常のパラグラフ ──
        p_text = parse_inline(line)
        html_out.append(f'<p>{p_text}</p>')

    # 収束処理
    if in_table and table_lines:
        html_out.append(render_table(table_lines))
    if in_list:
        html_out.append(f'</{list_type}>')

    return '\n'.join(html_out)


def build_docs():
    """docs/ 配下のすべての md ファイルを site/ に HTML としてビルド"""
    count = 0
    print("🛠️ src/ 配下の静的アセット・JSモジュールを site/ に同期中...")
    copy_static_assets()

    print("\n🛠️ 全 docs/ ドキュメントを網羅する検索インデックス (search_index.json) をビルド中...")
    try:
        sys.path.insert(0, os.path.dirname(__file__))
        import fm_index_search
        fm_index_search.build_search_index()
    except Exception as e:
        print(f"⚠️ [警告] 検索インデックスの構築中にエラーが発生しました: {e}")

    print("\n🛠️ docs/ 配下の Markdown ドキュメントを HTML に変換中...")

    for root, dirs, files in os.walk(DOCS_DIR):
        for f in files:
            if not f.endswith('.md'):
                continue

            md_path = os.path.join(root, f)
            rel_path = os.path.relpath(md_path, DOCS_DIR)

            # docs/index.md は site/index.html (トップポータル) および docs_index.html 両方に書き出し
            if rel_path == 'index.md':
                html_rel_path = 'index.html'
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

            # 相対パスの修正 (js/ や data/ への参照を rel_root 基準に統一)
            rendered_body = re.sub(r"fetch\(['\"](?:\.\.\/)*data\/([^'\"]+)['\"]\)", rf"fetch('{rel_root}data/\1')", rendered_body)
            rendered_body = rendered_body.replace('src="js/', f'src="{rel_root}js/')
            rendered_body = rendered_body.replace("fetch('data/", f"fetch('{rel_root}data/")
            rendered_body = rendered_body.replace('fetch("data/', f'fetch("{rel_root}data/')
            rendered_body = rendered_body.replace("fetch('search_index.json'", f"fetch('{rel_root}search_index.json'")
            rendered_body = rendered_body.replace('fetch("search_index.json"', f'fetch("{rel_root}search_index.json"')

            full_html = HTML_TEMPLATE.format(
                title=html.escape(doc_title),
                content=rendered_body,
                rel_root=rel_root
            )

            with open(dest_html_path, 'w', encoding='utf-8') as out_f:
                out_f.write(full_html)

            # index.md の場合は互換用 docs_index.html にも同時書き出し
            if rel_path == 'index.md':
                docs_idx_dest = os.path.join(SITE_DIR, 'docs_index.html')
                with open(docs_idx_dest, 'w', encoding='utf-8') as out_f2:
                    out_f2.write(full_html)

            count += 1
            print(f"  ✅ [生成] site/{html_rel_path}")

            # 💡 特別対応: ルートレベルの単体 md ファイル (search.md, quiz.md 等) は GitHub Pages の /<name>/ ディレクトリ型ルーティング対応のため site/<name>/index.html も同時生成
            if rel_path.count(os.sep) == 0 and rel_path.endswith('.md') and rel_path != 'index.md':
                page_name = os.path.splitext(rel_path)[0]
                dir_dest_path = os.path.join(SITE_DIR, page_name, 'index.html')
                os.makedirs(os.path.dirname(dir_dest_path), exist_ok=True)
                dir_rel_root = '../'
                dir_rendered_body = re.sub(r"fetch\(['\"](?:\.\.\/)*data\/([^'\"]+)['\"]\)", rf"fetch('{dir_rel_root}data/\1')", markdown_to_html(md_text))
                dir_rendered_body = dir_rendered_body.replace('src="js/', f'src="{dir_rel_root}js/')
                dir_rendered_body = dir_rendered_body.replace("fetch('data/", f"fetch('{dir_rel_root}data/")
                dir_rendered_body = dir_rendered_body.replace('fetch("data/', f'fetch("{dir_rel_root}data/')
                dir_rendered_body = dir_rendered_body.replace("fetch('search_index.json'", f"fetch('{dir_rel_root}search_index.json'")
                dir_rendered_body = dir_rendered_body.replace('fetch("search_index.json"', f'fetch("{dir_rel_root}search_index.json"')

                dir_full_html = HTML_TEMPLATE.format(
                    title=html.escape(doc_title),
                    content=dir_rendered_body,
                    rel_root=dir_rel_root
                )
                with open(dir_dest_path, 'w', encoding='utf-8') as dir_f:
                    dir_f.write(dir_full_html)
                
                # quiz や search 等のディレクトリ直下にも data/ および js/ をミラーコピー
                page_dir = os.path.join(SITE_DIR, page_name)
                js_src_dir = os.path.join(SRC_DIR, "js")
                data_src_dir = os.path.join(SRC_DIR, "data")
                if os.path.exists(js_src_dir):
                    shutil.copytree(js_src_dir, os.path.join(page_dir, "js"), dirs_exist_ok=True)
                if os.path.exists(data_src_dir):
                    shutil.copytree(data_src_dir, os.path.join(page_dir, "data"), dirs_exist_ok=True)

                print(f"  ✅ [生成] site/{page_name}/index.html (GitHub Pages ディレクトリ型ルーティング・データミラー対応)")

    # search_index.json が存在する場合は site/search/search_index.json にもミラー複製
    index_src = os.path.join(SITE_DIR, 'search_index.json')
    index_dest = os.path.join(SITE_DIR, 'search', 'search_index.json')
    if os.path.exists(index_src):
        os.makedirs(os.path.dirname(index_dest), exist_ok=True)
        shutil.copy2(index_src, index_dest)
        print("  📦 [インデックスコピー] site/search_index.json -> site/search/search_index.json")

    print(f"\n🎉 計 {count} 件のドキュメントを site/ 配下に正常出力しました！")


if __name__ == '__main__':
    build_docs()
