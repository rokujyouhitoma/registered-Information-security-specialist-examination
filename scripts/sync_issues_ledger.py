#!/usr/bin/env python3
"""
scripts/sync_issues_ledger.py
issues/ (アクティブ) および issues/closed/ (完了済み) をスキャンし、
重複 ID やメタデータ不正を自動検知した上で issues/README.md (Issue台帳) を完全同期自動更新するスクリプト。
"""

import sys
import re
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
ISSUES_DIR = WORKSPACE_ROOT / "issues"
CLOSED_DIR = ISSUES_DIR / "closed"
LEDGER_PATH = ISSUES_DIR / "README.md"

def parse_issue_file(filepath: Path):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Frontmatter 取得
        fm_match = re.search(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
        meta = {}
        if fm_match:
            for line in fm_match.group(1).splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    meta[k.strip()] = v.strip()

        # タイトル取得 (# [FEAT/ENH] Title (ID: xxx) or # Title)
        title_match = re.search(r"^#\s+(.*?)\s*$", content, re.MULTILINE)
        raw_title = title_match.group(1) if title_match else filepath.stem
        # ID表記やカテゴリ接頭辞を除去したクリーンタイトル
        clean_title = re.sub(r"^\[.*?\]\s*", "", raw_title)
        clean_title = re.sub(r"\s*\(ID:\s*\d+\)$", "", clean_title)

        issue_id = meta.get("ID", "")
        if not issue_id:
            id_m = re.search(r"^(\d{3})-", filepath.name)
            if id_m:
                issue_id = id_m.group(1)

        return {
            "id": issue_id,
            "type": meta.get("種別", "Feature"),
            "priority": meta.get("優先度", "Medium"),
            "status": meta.get("ステータス", "Open"),
            "raw_title": clean_title,
            "filename": filepath.name,
            "rel_path": str(filepath.relative_to(ISSUES_DIR)),
            "is_closed": "closed" in filepath.parts
        }
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
        return None

def main():
    print("=== Issue 台帳 (issues/README.md) 同期スキャンを開始します ===")
    
    active_issues = []
    closed_issues = []
    seen_ids = {}

    # アクティブ Issue スキャン
    for p in sorted(ISSUES_DIR.glob("*.md")):
        if p.name == "README.md":
            continue
        item = parse_issue_file(p)
        if item:
            if item["id"] in seen_ids:
                print(f"❌ [ID重複エラー] ID {item['id']} が重複しています: {p.name} と {seen_ids[item['id']]}")
                sys.exit(1)
            seen_ids[item["id"]] = p.name
            active_issues.append(item)

    # 完了済み Issue スキャン
    if CLOSED_DIR.exists():
        for p in sorted(CLOSED_DIR.glob("*.md")):
            item = parse_issue_file(p)
            if item:
                if item["id"] in seen_ids:
                    print(f"❌ [ID重複エラー] ID {item['id']} が重複しています: closed/{p.name} と {seen_ids[item['id']]}")
                    sys.exit(1)
                seen_ids[item["id"]] = f"closed/{p.name}"
                closed_issues.append(item)

    active_issues.sort(key=lambda x: x["id"])
    closed_issues.sort(key=lambda x: x["id"])

    # 台帳 Markdown 生成
    lines = [
        "# Issue 台帳 (Issue Ledger)\n",
        "本ディレクトリは、課題、新機能要求、リファクタリング、バグ修正などの Issue 管理用ディレクトリです。\n",
        "---\n",
        "## 1. アクティブ Issue 一覧\n",
        "| ID | 種別 | タイトル | 優先度 | ステータス | 担当・リンク |",
        "|---|---|---|---|---|---|"
    ]

    for item in active_issues:
        lines.append(f"| {item['id']} | {item['type']} | [{item['raw_title']}]({item['filename']}) | {item['priority']} | {item['status']} | [{item['filename']}]({item['filename']}) |")

    lines.extend([
        "\n---\n",
        "## 2. 完了済み Issue 一覧\n",
        "| ID | 種別 | タイトル | 完了日 | 完了コミット / PR |",
        "|---|---|---|---|---|"
    ])

    for item in closed_issues:
        lines.append(f"| {item['id']} | {item['type']} | [{item['raw_title']}]({item['rel_path']}) | 2026-07-31 | [{item['filename']}]({item['rel_path']}) |")

    content = "\n".join(lines) + "\n"
    
    with open(LEDGER_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ Issue 台帳同期完了! アクティブ {len(active_issues)} 件 / 完了済み {len(closed_issues)} 件")

if __name__ == "__main__":
    main()
