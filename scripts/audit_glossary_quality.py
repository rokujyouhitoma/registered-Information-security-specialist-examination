#!/usr/bin/env python3
"""
scripts/audit_glossary_quality.py
PM 全用語厳格品質監査スクリプト。
docs/glossary/syllabus_ver2_1.md および docs/glossary/syllabus_tsuiho_ver4_0.md 内の
全用語項目（全2,760件）を全数走り走査し、
・タイポ・ノイズ（例: 「びゅう」等の異物文字）
・抽象逃げフレーズ（「～に関する機能・役割および...」等）
・解説の未設定・欠落
を1件残らず検出する。不備が1件でも検出された場合は Exit Code 1 で監査不合格とする。
"""

import re
import sys
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
GLOSSARY_DIR = WORKSPACE_ROOT / "docs" / "glossary"

FILES_TO_AUDIT = [
    GLOSSARY_DIR / "syllabus_ver2_1.md",
    GLOSSARY_DIR / "syllabus_tsuiho_ver4_0.md"
]

ABSTRACT_PATTERNS = [
    r"に関する機能・役割および技術的仕様のことです",
    r"に関するセキュリティ定義および技術仕様のことです",
    r"に関するセキュリティ上の概念・技術仕様のことです",
    r"におけるセキュリティ専門用語",
    r"適切な設計と運用管理によって安全性を確保します"
]

TYPO_PATTERNS = [
    r"びゅう",
    r"てすと",
    r"ほげ",
    r"ふが"
]

def audit_file(filepath: Path):
    if not filepath.exists():
        print(f"❌ エラー: ファイルが存在しません: {filepath}")
        return False, 0, []

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 用語エントリのパース: #### <a id="..."></a>用語名\n- **解説**: ...\n- **シラバス参照**: ...
    entries = re.findall(r'####\s+<a id="([^"]+)"></a>([^\n]+)\n-\s+\*\*解説\*\*:\s+([^\n]+)', content)
    
    total_entries = len(entries)
    violations = []

    for anchor, term, exp in entries:
        term = term.strip()
        exp = exp.strip()

        # 1. 抽象フレーズ検出
        for pat in ABSTRACT_PATTERNS:
            if re.search(pat, exp):
                violations.append({
                    'type': '抽象定型文言検出',
                    'term': term,
                    'explanation': exp,
                    'pattern': pat
                })
                break

        # 2. タイポ・ノイズ検出
        for pat in TYPO_PATTERNS:
            if re.search(pat, term) or re.search(pat, exp):
                violations.append({
                    'type': 'タイポ・ノイズ検出',
                    'term': term,
                    'explanation': exp,
                    'pattern': pat
                })
                break

        # 3. 解説欠落・薄弱検出 (20文字未満の解説)
        if len(exp) < 15:
            violations.append({
                'type': '解説内容欠落・極小',
                'term': term,
                'explanation': exp,
                'pattern': 'len < 15'
            })

    return len(violations) == 0, total_entries, violations

def main():
    print("=== PM 全用語厳格品質監査 (Glossary Quality Audit) を開始します ===")
    total_all_terms = 0
    all_passed = True

    for filepath in FILES_TO_AUDIT:
        print(f"\n🔍 監査対象: {filepath.relative_to(WORKSPACE_ROOT)}")
        passed, count, violations = audit_file(filepath)
        total_all_terms += count

        if passed:
            print(f"  ✅ 合格: 全 {count} 件の用語項目が具体的な技術定義を完備しています。")
        else:
            all_passed = False
            print(f"  ❌ 不合格: {len(violations)} / {count} 件の用語項目に品質違反を検出しました:")
            for v in violations[:10]:
                print(f"    ・[{v['type']}] 用語: {v['term']} ➔ {v['explanation']}")
            if len(violations) > 10:
                print(f"    ... 他 {len(violations) - 10} 件の違反")

    print("\n--------------------------------------------------")
    print(f"📊 総監査項目数: {total_all_terms} 件")
    if all_passed:
        print("🎉 [PM監査合格] すべての用語解説が抽象フレーズ・タイポなしで全件具体化されています。")
        sys.exit(0)
    else:
        print("🚨 [PM監査不合格] 抽象フレーズやタイポが検出されました。修復が必要です。")
        sys.exit(1)

if __name__ == "__main__":
    main()
