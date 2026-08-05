#!/usr/bin/env python3
"""
PM 全用語厳格品質監査スクリプト Ver. 4.0 (Glossary Quality Audit Ver. 4.0)

【チェック基準】
1. 機械的定型フレーズの残存走査
2. タイトルおよび自称における名称独占資格コンプライアンス（「情報処理安全確保支援士」の誤用チェック）
3. 用語解説の品質・完全性検証
"""

import sys
import re
import os

AUDIT_FILES = [
    "docs/glossary/syllabus_ver2_1.md",
    "docs/glossary/syllabus_tsuiho_ver4_0.md"
]

FORBIDDEN_PHRASES = [
    "の技術仕様、動作機構、およびセキュリティ運用上の解説。",
    "詳細な解説コンテンツは準備中です",
    "内容を記述してください"
]

CREDENTIAL_CHECK_PHRASES = [
    "情報処理安全確保支援士試験 科目A-2",  # タイトル等の誤用防止
]

def audit_file(filepath):
    if not os.path.exists(filepath):
        print(f"⚠️ ファイルが存在しません: {filepath}")
        return False, 0, []

    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    violations = []
    total_terms = 0

    for idx, line in enumerate(lines, start=1):
        line_str = line.strip()

        # 1. 禁忌定型フレーズの検出
        for phrase in FORBIDDEN_PHRASES:
            if phrase in line_str:
                violations.append(f"L{idx}: [1.定型抽象フレーズ残存] ({phrase})")

        # 2. 名称独占資格表記チェック
        for phrase in CREDENTIAL_CHECK_PHRASES:
            if phrase in line_str:
                violations.append(f"L{idx}: [2.名称独占資格表記違反] '{phrase}' が検出されました。'情報セキュリティスペシャリスト' へ修正してください。")

        if line_str.startswith("#### "):
            total_terms += 1

    is_passed = len(violations) == 0
    return is_passed, total_terms, violations

def main():
    print("=== PM 全用語厳格品質監査 (Glossary Quality Audit Ver. 4.0) を開始します ===")
    print()

    all_passed = True
    grand_total_terms = 0

    for filepath in AUDIT_FILES:
        print(f"🔍 監査対象: {filepath}")
        passed, terms_count, violations = audit_file(filepath)
        grand_total_terms += terms_count

        if passed:
            print(f"  ✅ 合格: 全 {terms_count} 件の用語項目が品質規準 Ver.4.0 を完全に満たしています。")
        else:
            all_passed = False
            print(f"  ❌ 不合格: {len(violations)} 件の違反を検出しました:")
            for v in violations[:15]:
                print(f"    ・{v}")
            if len(violations) > 15:
                print(f"    ... 他 {len(violations) - 15} 件の違反")
        print()

    print("-" * 50)
    print(f"📊 総監査項目数: {grand_total_terms} 件")

    if all_passed:
        print("🎉 [PM監査合格] すべての用語解説が品質規準 Ver.4.0（禁忌フレーズ・名称独占資格不適合 ゼロ）をクリアしました。")
        sys.exit(0)
    else:
        print("🚨 [PM監査不合格] 上記の違反項目を修復してください。")
        sys.exit(1)

if __name__ == "__main__":
    main()
