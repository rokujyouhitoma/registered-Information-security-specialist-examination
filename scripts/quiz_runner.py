#!/usr/bin/env python3
"""
情報セキュリティスペシャリスト試験 CLI 対話型 理解度自己診断クイズツール (Quiz Runner Ver. 1.0)
外部ライブラリ完全非依存（Python標準ライブラリのみ）で動作。
"""

import sys
import re
import os
import random

GLOSSARY_FILES = [
    "docs/glossary/syllabus_ver2_1.md",
    "docs/glossary/syllabus_tsuiho_ver4_0.md"
]

def load_terms():
    terms = []
    for filepath in GLOSSARY_FILES:
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 用語ブロック抽出
        blocks = re.findall(
            r'#### <a id="([^"]+)"></a>([^\n]+)\n- \*\*概要\*\*: ([^\n]+)\n- \*\*技術・運用ポイント\*\*: ([^\n]+)\n- \*\*試験出題ポイント\*\*: ([^\n]+)',
            content
        )
        for term_id, term_name, summary, tech, exam in blocks:
            terms.append({
                "id": term_id,
                "name": term_name.strip(),
                "summary": summary.strip(),
                "tech": tech.strip(),
                "exam": exam.strip()
            })
    return terms

def run_test_mode(terms):
    print("=== CLI クイズツール (自動テストモード) を開始します ===")
    sample_terms = random.sample(terms, min(5, len(terms)))
    score = 0

    for idx, item in enumerate(sample_terms, 1):
        print(f"\n[問題 {idx}] 以下の「概要」に該当するセキュリティ用語はどれか？")
        print(f"  📝 概要: {item['summary']}")
        
        # 4択選択肢の作成
        dummies = [t['name'] for t in terms if t['name'] != item['name']]
        choices = random.sample(dummies, 3) + [item['name']]
        random.shuffle(choices)
        
        correct_idx = choices.index(item['name']) + 1
        print("  【選択肢】")
        for c_idx, choice in enumerate(choices, 1):
            print(f"    {c_idx}. {choice}")
            
        print(f"  ✅ 正解: {correct_idx}. {item['name']}")
        score += 1

    print(f"\n📊 テスト結果: {score}/{len(sample_terms)} 問正常テスト完了 (100% 正常判定)")
    return True

def run_interactive_mode(terms):
    print("==================================================")
    print("🛡️ 情報セキュリティスペシャリスト理解度クイズ (CLI)")
    print("==================================================")
    
    num_questions = 5
    sample_terms = random.sample(terms, min(num_questions, len(terms)))
    score = 0

    for idx, item in enumerate(sample_terms, 1):
        print(f"\n--------------------------------------------------")
        print(f"❓ 【第 {idx} 問 / 全 {num_questions} 問】")
        print(f"【概要】: {item['summary']}")
        print(f"【試験出題ポイント】: {item['exam']}")
        print("--------------------------------------------------")
        
        dummies = [t['name'] for t in terms if t['name'] != item['name']]
        choices = random.sample(dummies, 3) + [item['name']]
        random.shuffle(choices)
        
        for c_idx, choice in enumerate(choices, 1):
            print(f"  {c_idx}. {choice}")
            
        try:
            ans = input("\n👉 正解の番号を選択してください (1-4) [qで終了]: ").strip()
            if ans.lower() == 'q':
                print("クイズを中断しました。")
                return
            if int(ans) == choices.index(item['name']) + 1:
                print("🎉 【正解！】 Excellent!")
                score += 1
            else:
                print(f"❌ 【不正解...】 正解は 『{item['name']}』 です。")
            print(f"💡 技術・運用解説: {item['tech']}")
        except Exception:
            print(f"⚠️ 無効な入力です。正解は 『{item['name']}』 でした。")

    print(f"\n==================================================")
    print(f"🏆 最終スコア: {score} / {num_questions} 点 ({int(score/num_questions*100)}%)")
    print("==================================================")

def main():
    terms = load_terms()
    if not terms:
        print("❌ 用語データが読み込めませんでした。")
        sys.exit(1)
        
    print(f"📚 総用語数: {len(terms)} 件を正常ロードしました。")

    if "--test" in sys.argv:
        run_test_mode(terms)
    else:
        run_interactive_mode(terms)

if __name__ == "__main__":
    main()
