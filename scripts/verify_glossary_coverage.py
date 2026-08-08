#!/usr/bin/env python3
"""
scripts/verify_glossary_coverage.py
シラバス Ver.2.1 (syllabus_detail.md) および 追補版 Ver.4.0 (syllabus_tsuiho_detail.md) 内の
すべての「用語例・キーワード」が漏れなくハイパーリンク化され、用語辞書へ 100% 登録されているかを検証する監査スクリプト。
"""

import sys
import re
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = WORKSPACE_ROOT / "src" / "content"

SYLLABUS_DETAIL = DOCS_DIR / "syllabus_detail.md"
TSUIHO_DETAIL = DOCS_DIR / "syllabus_tsuiho_detail.md"

def verify_file_coverage(filepath: Path, doc_name: str):
    print(f"--- [{doc_name}] の用語カバレッジ監査を開始します ---")
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    total_terms = 0
    linked_terms = 0
    unlinked_terms = []

    for idx, line in enumerate(lines, 1):
        if "用語例・キーワード" in line:
            # 次の行に存在する用語リストを検査
            if idx < len(lines):
                next_line = lines[idx]
                if "`" in next_line:
                    items = [item.strip() for item in next_line.split(',') if item.strip()]
                    for item in items:
                        total_terms += 1
                        # [`term`](glossary/...) 形式になっているか検査
                        if re.search(r'\[`[^`]+`\]\(glossary/[^\)]+\)', item):
                            linked_terms += 1
                        else:
                            unlinked_terms.append((idx + 1, item))

    print(f"スキャン総用語数: {total_terms} 件")
    print(f"ハイパーリンク化済み用語数: {linked_terms} 件")
    
    if total_terms == 0:
        print(f"❌ [{doc_name}] 用語例の検出数が 0 件です。フォーマットを確認してください。")
        return False

    coverage = (linked_terms / total_terms) * 100.0
    print(f"カバレッジ率: {coverage:.2f}% ({linked_terms}/{total_terms})")

    if unlinked_terms:
        print(f"❌ 計 {len(unlinked_terms)} 件の未ハイパーリンク化用語が検出されました:")
        for line_no, term in unlinked_terms[:10]:
            print(f"   Line {line_no}: {term}")
        return False
    else:
        print(f"✅ [{doc_name}] すべての用語例が 100% 漏れなく用語辞書へハイパーリンク化されています。")
        return True

def main():
    print("=== シラバス全用語例 100% 網羅性・カバレッジ監査を実行します ===")
    
    res1 = verify_file_coverage(SYLLABUS_DETAIL, "シラバス Ver.2.1")
    print()
    res2 = verify_file_coverage(TSUIHO_DETAIL, "科目A-2 追補版 Ver.4.0")

    print("\n--------------------------------------------------")
    if res1 and res2:
        print("🎉 [合格] すべてのシラバス文書において、全用語例の 100% 登録・ハイパーリンク化が保証されました。")
        sys.exit(0)
    else:
        print("❌ [不合格] 未リンク・未登録の用語が存在します。修正してください。")
        sys.exit(1)

if __name__ == "__main__":
    main()
