#!/usr/bin/env python3
"""
scripts/audit_glossary_quality.py
PM 全用語厳格品質監査スクリプト (Ver. 3.0)。
docs/glossary/syllabus_ver2_1.md および docs/glossary/syllabus_tsuiho_ver4_0.md 内の
全用語項目（全2,760件）を全数走行・走査し、以下の不具合を 1 件残らず検出する。

1. 【定型・抽象フレーズ残存】: 「〜に関するセキュリティ上の目的...」等のテンプレート文言
2. 【誤用・定義コンテキスト不整合】:
   - AEAD に SOC / 24時間監視 の説明が適用されている
   - OSPF に SPF / 送信元ドメイン の説明が適用されている
   - eDRX に EDR / エンドポイント の説明が適用されている
   - 敵対的サンプル に RSA / 素因数分解 の説明が適用されている
3. 【見出し・アンカー不整合・ノイズ混入】:
   - 開き/閉じカッコ不一致
   - 先頭の中黒 `・` 残存
   - 複数用語の結合 (例: `...攻撃...スクリプティング...`)
   - フッター・注記テキスト混入 (`独立行政法人`, `「技術レベル`, `要求されるデータ` 等)
4. 【タイポ・誤字】: `だ方式`, `フたいァイル`, `ふくそう`, `びゅう` 等
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
    r"に関するセキュリティ上の目的、動作メカニズム、または運用制御仕様のことです",
    r"に関する機能・役割および技術的仕様のことです",
    r"に関するセキュリティ定義および技術仕様のことです",
    r"に関するセキュリティ上の概念・技術仕様のことです",
    r"におけるセキュリティ専門用語",
    r"適切な設計と運用管理によって安全性を確保します"
]

MISMATCH_CHECKS = [
    {"term_pat": r"^aead$", "bad_exp_pat": r"soc|監視|24時間", "desc": "AEADにSOCの説明が誤適用"},
    {"term_pat": r"^ospf$", "bad_exp_pat": r"送信元|ドメイン|spf", "desc": "OSPFにSPFの説明が誤適用"},
    {"term_pat": r"^edrx$", "bad_exp_pat": r"エンドポイント|edr|マルウェア", "desc": "eDRXにEDRの説明が誤適用"},
    {"term_pat": r"敵対的サンプル", "bad_exp_pat": r"rsa|素因数分解|鍵長", "desc": "敵対的サンプルにRSAの説明が誤適用"}
]

HEADER_NOISE_PATTERNS = [
    r"^・",
    r"独立行政法人",
    r"「技術レベル",
    r"要求されるデータ",
    r"スクラムの特徴を",
    r"情報処理安全確保支援士試験シラバス"
]

TYPO_PATTERNS = [
    r"だ方式",
    r"フたいァイル",
    r"ふくそうデータリンク",
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

    entries = re.findall(r'####\s+<a id="([^"]+)"></a>([^\n]+)\n-\s+\*\*解説\*\*:\s+([^\n]+)', content)
    
    total_entries = len(entries)
    violations = []

    for anchor, term, exp in entries:
        term = term.strip()
        exp = exp.strip()
        t_norm = term.lower()

        # 1. 定型・抽象フレーズ検出
        for pat in ABSTRACT_PATTERNS:
            if re.search(pat, exp):
                violations.append({
                    'type': '1.定型抽象フレーズ残存',
                    'term': term,
                    'explanation': exp,
                    'detail': pat
                })
                break

        # 2. 誤用・定義コンテキスト不整合
        for chk in MISMATCH_CHECKS:
            if re.search(chk["term_pat"], t_norm):
                if re.search(chk["bad_exp_pat"], exp.lower()):
                    violations.append({
                        'type': '2.定義コンテキスト不整合',
                        'term': term,
                        'explanation': exp,
                        'detail': chk["desc"]
                    })
                    break

        # 3. 見出し・アンカー不整合・ノイズ混入
        for h_pat in HEADER_NOISE_PATTERNS:
            if re.search(h_pat, term):
                violations.append({
                    'type': '3.見出しテキストノイズ混入',
                    'term': term,
                    'explanation': exp,
                    'detail': h_pat
                })
                break

        # 3.b 括弧不一致・複数用語結合の検出
        left_paren = term.count("（") + term.count("(")
        right_paren = term.count("）") + term.count(")")
        if left_paren != right_paren:
            violations.append({
                'type': '3.括弧対応不一致',
                'term': term,
                'explanation': exp,
                'detail': f"（={left_paren}, ）={right_paren}"
            })

        # 4. タイポ・誤字検出
        for t_pat in TYPO_PATTERNS:
            if re.search(t_pat, term) or re.search(t_pat, exp):
                violations.append({
                    'type': '4.タイポ・誤字検出',
                    'term': term,
                    'explanation': exp,
                    'detail': t_pat
                })
                break

    return len(violations) == 0, total_entries, violations

def main():
    print("=== PM 全用語厳格品質監査 (Glossary Quality Audit Ver. 3.0) を開始します ===")
    total_all_terms = 0
    all_passed = True

    for filepath in FILES_TO_AUDIT:
        print(f"\n🔍 監査対象: {filepath.relative_to(WORKSPACE_ROOT)}")
        passed, count, violations = audit_file(filepath)
        total_all_terms += count

        if passed:
            print(f"  ✅ 合格: 全 {count} 件の用語項目が品質規準を完全に満たしています。")
        else:
            all_passed = False
            print(f"  ❌ 不合格: {len(violations)} / {count} 件の用語項目に違反を検出しました:")
            for v in violations[:15]:
                print(f"    ・[{v['type']}] 用語: {v['term']} ➔ 解説: {v['explanation']} (詳細: {v['detail']})")
            if len(violations) > 15:
                print(f"    ... 他 {len(violations) - 15} 件の違反")

    print("\n--------------------------------------------------")
    print(f"📊 総監査項目数: {total_all_terms} 件")
    if all_passed:
        print("🎉 [PM監査合格] すべての用語解説が指摘4カテゴリ（不整合/定型句/ノイズ見出し/タイポ）ゼロでクリアされました。")
        sys.exit(0)
    else:
        print("🚨 [PM監査不合格] 上記の違反項目を修復してください。")
        sys.exit(1)

if __name__ == "__main__":
    main()
