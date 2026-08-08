#!/usr/bin/env python3
"""
scripts/build_content_json.py

docs/ 配下のすべての Markdown (.md) ドキュメントをパースし、
Parent-Document Retrieval (階層的 Chunking) および Layout-Aware 解析に対応した
SPA 用の構造化コンテンツ JSON データ (content_store.json) を自動生成するビルドスクリプト。
"""

import os
import sys
import re
import json
import html
from pathlib import Path

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(BASE_DIR, "src", "content")
SRC_DATA_DIR = os.path.join(BASE_DIR, "src", "data")
SITE_DATA_DIR = os.path.join(BASE_DIR, "site", "data")

def extract_chunks(body_md, doc_id):
    """
    Markdown/Layout-Aware 解析により、ドキュメントを見出し(#/##/###)、
    コードブロック(```)、および表構造(|...|)の階層的子チャンク(chunks)に分解抽出する。
    """
    chunks = []
    lines = body_md.splitlines()
    current_section_title = "概要"
    current_lines = []
    chunk_index = 0

    def add_chunk(title, content_lines, chunk_type="section"):
        nonlocal chunk_index
        text = "\n".join(content_lines).strip()
        if text:
            chunk_index += 1
            chunks.append({
                "chunk_id": f"{doc_id}#chunk-{chunk_index}",
                "parent_id": doc_id,
                "title": title,
                "type": chunk_type,
                "content": text
            })

    in_code_block = False
    code_lines = []
    in_table = False
    table_lines = []

    for line in lines:
        if line.strip().startswith("```"):
            if in_code_block:
                code_lines.append(line)
                add_chunk(f"{current_section_title} (コンフィグ/コード例)", code_lines, "code")
                code_lines = []
                in_code_block = False
            else:
                if current_lines:
                    add_chunk(current_section_title, current_lines, "section")
                    current_lines = []
                in_code_block = True
                code_lines.append(line)
            continue

        if in_code_block:
            code_lines.append(line)
            continue

        if line.strip().startswith("|") and line.strip().endswith("|"):
            if not in_table:
                if current_lines:
                    add_chunk(current_section_title, current_lines, "section")
                    current_lines = []
                in_table = True
            table_lines.append(line)
            continue
        elif in_table:
            add_chunk(f"{current_section_title} (表構造データ)", table_lines, "table")
            table_lines = []
            in_table = False

        if line.startswith("#"):
            if current_lines:
                add_chunk(current_section_title, current_lines, "section")
                current_lines = []
            heading_match = re.match(r'^#+\s+(.+)$', line)
            if heading_match:
                current_section_title = heading_match.group(1).strip()
        else:
            current_lines.append(line)

    if current_lines:
        add_chunk(current_section_title, current_lines, "section")
    if code_lines:
        add_chunk(f"{current_section_title} (コンフィグ/コード例)", code_lines, "code")
    if table_lines:
        add_chunk(f"{current_section_title} (表構造データ)", table_lines, "table")

    return chunks

def extract_frontmatter_and_content(md_text, doc_id):
    title = ""
    last_updated = ""
    author = ""
    body = md_text

    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            body = parts[2]
            title_match = re.search(r'^title:\s*["\']?(.*?)["\']?$', fm_text, re.MULTILINE)
            if title_match:
                title = title_match.group(1).strip()
            date_match = re.search(r'^last_updated:\s*["\']?(.*?)["\']?$', fm_text, re.MULTILINE)
            if date_match:
                last_updated = date_match.group(1).strip()
            author_match = re.search(r'^author:\s*["\']?(.*?)["\']?$', fm_text, re.MULTILINE)
            if author_match:
                author = author_match.group(1).strip()

    if not title:
        h1_match = re.search(r'^#\s+(.+)$', body, re.MULTILINE)
        if h1_match:
            title = h1_match.group(1).strip()
        else:
            title = "無題ドキュメント"

    snippet = re.sub(r'#+|\*|`|>|<!--[\s\S]*?-->', '', body)
    snippet = re.sub(r'\s+', ' ', snippet).strip()[:200]

    chunks = extract_chunks(body, doc_id)

    return {
        "title": title,
        "last_updated": last_updated,
        "author": author,
        "snippet": snippet,
        "body_md": body.strip(),
        "chunks": chunks
    }

def main():
    print("🛠️ SPA用コンテンツ JSON ストア (content_store.json) を出力中...")
    os.makedirs(SRC_DATA_DIR, exist_ok=True)
    os.makedirs(SITE_DATA_DIR, exist_ok=True)

    documents = []
    
    for root, dirs, files in os.walk(DOCS_DIR):
        for file in sorted(files):
            if file.endswith(".md"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, DOCS_DIR)
                
                route_path = rel_path[:-3] # remove .md
                if route_path == "index":
                    route_path = ""
                elif route_path.endswith("/index"):
                    route_path = route_path[:-6]

                with open(full_path, "r", encoding="utf-8") as f:
                    md_text = f.read()

                doc_id = route_path.replace("/", "-") if route_path else "home"
                parsed = extract_frontmatter_and_content(md_text, doc_id)
                documents.append({
                    "id": doc_id,
                    "route": "/" + route_path,
                    "rel_path": rel_path,
                    "title": parsed["title"],
                    "last_updated": parsed["last_updated"],
                    "author": parsed["author"],
                    "snippet": parsed["snippet"],
                    "body_md": parsed["body_md"],
                    "chunks": parsed["chunks"]
                })

    out_data = {
        "generated_at": "2026-08-08",
        "total_documents": len(documents),
        "documents": documents
    }

    src_json_path = os.path.join(SRC_DATA_DIR, "content_store.json")
    site_json_path = os.path.join(SITE_DATA_DIR, "content_store.json")

    with open(src_json_path, "w", encoding="utf-8") as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)

    with open(site_json_path, "w", encoding="utf-8") as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)

    print(f"✅ 計 {len(documents)} 件のドキュメント (親・子階層Chunk構造付与) を content_store.json に正常書き出し完了しました！")

if __name__ == "__main__":
    main()
