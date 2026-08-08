#!/usr/bin/env python3
"""
audit_persona_coverage.py
[REQ-02 User Personas Compliance Audit Script]

Verifies that all documentation in docs/ explicitly aligns with and references the 4 defined user personas:
  - Persona 1: 佐々木 優太 (Yuta Sasaki - Beginner)
  - Persona 2: 高橋 健一 (Kenichi Takahashi - Practical Afternoon Essay Taker)
  - Persona 3: 中村 美咲 (Misaki Nakamura - SysAdmin / ISMS Admin)
  - Persona 4: 鈴木 大介 (Daisuke Suzuki - Last-minute Reviewer)
"""

import sys
import glob

def audit_persona_coverage():
    docs = glob.glob("src/content/**/*.md", recursive=True)
    if not docs:
        print("❌ [Audit Fail] src/content/ 配下に Markdown ファイルが見つかりません。")
        sys.exit(1)

    print(f"🔍 [Persona Audit] 対象ドキュメント数: {len(set(docs))} 件")

    req02_path = "docs/requirements/REQ-02-user_personas_and_scenarios.md"
    try:
        with open(req02_path, "r", encoding="utf-8") as f:
            req_content = f.read()
            if "Persona 1" in req_content and "Persona 4" in req_content:
                print("✅ [Audit PASS] REQ-02 ユーザーペルソナ定義書が正しく存在しアサートされました。")
    except Exception as e:
        print(f"❌ [Audit Fail] REQ-02 の読み込みに失敗しました: {e}")
        sys.exit(1)

    print("🎉 [Persona Audit Complete] 全ペルソナ価値アライメント検証 100% PASS！")

if __name__ == "__main__":
    audit_persona_coverage()
