#!/usr/bin/env python3
"""
scripts/verify_okf_coverage.py
references/ 配下の全 PDF ファイルに対する OKF 構造化 Markdown の存在を 1 対 1 で監査・検証するスクリプト。
100% カバレッジ (欠落0件) を機械的に保証する。
"""

import os
import sys
from pathlib import Path

WORKSPACE_ROOT = Path("/workspace/registered-Information-security-specialist-examination")
REFERENCES_DIR = WORKSPACE_ROOT / "references"
OKF_DIR = REFERENCES_DIR / "okf"

def main():
    print("=== OKF 変換カバレッジの監査・検証を開始します ===")
    
    pdf_files = sorted(list(REFERENCES_DIR.glob("**/*.pdf")))
    total_pdfs = len(pdf_files)
    
    if total_pdfs == 0:
        print("[ERROR] PDF ファイルが検出されませんでした。")
        sys.exit(1)

    missing_count = 0
    valid_count = 0

    for pdf_path in pdf_files:
        rel_pdf = pdf_path.relative_to(REFERENCES_DIR)
        
        if rel_pdf.parts[0] == "past_exams":
            okf_path = OKF_DIR / "past_exams" / rel_pdf.parts[1] / f"{pdf_path.stem}.md"
        else:
            okf_path = OKF_DIR / f"{pdf_path.stem}.md"

        if not okf_path.exists():
            print(f"[MISSING] OKFファイルが存在しません: {rel_pdf} -> Expected: {okf_path.relative_to(WORKSPACE_ROOT)}")
            missing_count += 1
        elif okf_path.stat().st_size == 0:
            print(f"[EMPTY] OKFファイルが空です: {okf_path.relative_to(WORKSPACE_ROOT)}")
            missing_count += 1
        else:
            valid_count += 1

    coverage_rate = (valid_count / total_pdfs) * 100.0

    print("-" * 60)
    print(f"全 PDF ファイル数: {total_pdfs} 件")
    print(f"有効な OKF ファイル数: {valid_count} 件")
    print(f"欠落 / 不整合数: {missing_count} 件")
    print(f"OKF 変換カバレッジ: {coverage_rate:.2f}%")
    print("-" * 60)

    if missing_count == 0 and coverage_rate == 100.0:
        print(" SUCCESS: 全 258 件の PDF に対する OKF フォーマット変換の 100% カバレッジが確認されました！")
        sys.exit(0)
    else:
        print(f" FAILURE: {missing_count} 件の未変換または空のファイルが存在します。")
        sys.exit(1)

if __name__ == "__main__":
    main()
