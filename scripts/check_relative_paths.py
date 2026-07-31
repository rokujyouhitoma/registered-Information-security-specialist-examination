#!/usr/bin/env python3
"""
scripts/check_relative_paths.py
リポジトリ全体 (docs/, project-docs/, issues/, references/ 等) の .md ファイルをスキャンし、
実効リンクとして混入した file:/// や /workspace/ などの絶対パスを自動検知して判定するスクリプト。
（※ 説明文中のインラインコード `file:///...` は除外対象とし、実効ハイパーリンク `[text](file://...)` を厳格検知）
"""

import sys
import re
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

# 実効的な絶対パスリンクの検出パターン (インラインコード `file://...` を除く)
ABSOLUTE_LINK_PATTERNS = [
    (re.compile(r'\]\(\s*file:///'), 'Markdown リンク内の file:/// 絶対パス'),
    (re.compile(r'\]\(\s*/workspace/'), 'Markdown リンク内の /workspace/ 絶対パス'),
    (re.compile(r'\]\(\s*/root/'), 'Markdown リンク内の /root/ 絶対パス')
]

SCAN_DIRS = ["docs", "project-docs", "issues", "references"]

def scan_file(filepath: Path):
    violations = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for idx, line in enumerate(f, 1):
                for pattern, desc in ABSOLUTE_LINK_PATTERNS:
                    if pattern.search(line):
                        violations.append((idx, desc, line.strip()))
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return violations

def main():
    print("=== リポジトリ全体の相対パス表記チェックを実行します ===")
    total_files = 0
    total_violations = 0

    for scan_dir_name in SCAN_DIRS:
        scan_dir = WORKSPACE_ROOT / scan_dir_name
        if not scan_dir.exists():
            continue
        
        for md_file in scan_dir.glob("**/*.md"):
            total_files += 1
            file_violations = scan_file(md_file)
            if file_violations:
                rel_path = md_file.relative_to(WORKSPACE_ROOT)
                print(f"\n❌ [絶対パスリンク違反検出] {rel_path}:")
                for line_no, desc, line_content in file_violations:
                    print(f"   Line {line_no} ({desc}): {line_content[:100]}")
                total_violations += len(file_violations)

    print("\n--------------------------------------------------")
    print(f"スキャン対象 Markdown ファイル総数: {total_files} 件")
    
    if total_violations > 0:
        print(f"❌ 計 {total_violations} 件の絶対パスリンク違反が検出されました。相対パスに修正してください。")
        sys.exit(1)
    else:
        print("✅ すべての Markdown ファイルで実効絶対パスリンクが排除され、相対パス表記ルールが守られています。")
        sys.exit(0)

if __name__ == "__main__":
    main()
