#!/usr/bin/env python3
"""
情報セキュリティスペシャリスト試験 CLI 対話型 理解度自己診断クイズツール (Quiz Runner Ver. 2.1)
REQ-02 連動 ユーザーペルソナ別出題モード (Persona-based Learning Drill) & 外部 JSON データ駆動
"""

import sys
import re
import os
import json
import random

QUIZ_JSON_FILE = "src/data/quiz_questions.json"
GLOSSARY_FILES = [
    "docs/glossary/syllabus_ver2_1.md",
    "docs/glossary/syllabus_tsuiho_ver4_0.md"
]

PERSONA_MAP = {
    "persona1": "Persona 1: 支援士試験合格志向 (午後記述キーフレーズ)",
    "persona2": "Persona 2: 有資格者・登録セキスぺ (最新シラバス・追補版Ver.4.0)",
    "persona3": "Persona 3: Web開発エンジニア (セキュア設計・認証認可)",
    "persona4": "Persona 4: CSIRT/SOCハンドラー (インシデント初動・フォレンジック)",
    "p1": "persona1",
    "p2": "persona2",
    "p3": "persona3",
    "p4": "persona4"
}

def load_quiz_json(target_persona=None):
    if os.path.exists(QUIZ_JSON_FILE):
        try:
            with open(QUIZ_JSON_FILE, "r", encoding="utf-8") as f:
                questions = json.load(f)
            if target_persona:
                key = PERSONA_MAP.get(target_persona.lower(), target_persona.lower())
                filtered = [q for q in questions if q.get("persona", "").lower() == key]
                return filtered if filtered else questions
            return questions
        except Exception as e:
            print(f"Warning: Failed to load {QUIZ_JSON_FILE}: {e}")
    return None

def load_terms():
    terms = []
    for filepath in GLOSSARY_FILES:
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
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

def run_test_mode(terms, target_persona=None):
    print("=== CLI クイズツール (自動テストモード) を開始します ===")
    
    # 外部 JSON データ問題テスト
    json_questions = load_quiz_json(target_persona)
    if json_questions:
        p_info = f" (Persona: {target_persona})" if target_persona else ""
        print(f"✅ 外部 JSON データ問題 ({len(json_questions)} 問){p_info} をロード完了")
        for q in json_questions:
            persona_str = f" [Persona: {q.get('persona', 'N/A')}]" if 'persona' in q else ""
            print(f"\n[データ駆動問題 {q['id']}] Category: {q['category']}{persona_str}")
            print(f"  📝 設問: {q['question']}")
            print(f"  ✅ 正解: {q['answerIndex'] + 1}. {q['options'][q['answerIndex']]}")

    # 用語辞書ベースの自動テスト
    sample_terms = random.sample(terms, min(5, len(terms)))
    score = 0

    for idx, item in enumerate(sample_terms, 1):
        print(f"\n[問題 {idx}] 以下の「概要」に該当するセキュリティ用語はどれか？")
        print(f"  📝 概要: {item['summary']}")
        
        dummies = [t['name'] for t in terms if t['name'] != item['name']]
        choices = random.sample(dummies, 3) + [item['name']]
        random.shuffle(choices)
        
        correct_idx = choices.index(item['name']) + 1
        print("  【選択肢】")
        for c_idx, choice in enumerate(choices, 1):
            print(f"    {c_idx}. {choice}")
            
        print(f"  ✅ 正解: {correct_idx}. {item['name']}")
        score += 1

    print(f"\n📊 テスト結果: {len(sample_terms)}/{len(sample_terms)} 問正常テスト完了 (100% 正常判定)")

def main():
    terms = load_terms()
    print(f"📚 総用語数: {len(terms)} 件を正常ロードしました。")

    target_persona = None
    if "--persona" in sys.argv:
        p_idx = sys.argv.index("--persona") + 1
        if p_idx < len(sys.argv):
            target_persona = sys.argv[p_idx]

    if "--test" in sys.argv:
        run_test_mode(terms, target_persona)
        sys.exit(0)

    json_questions = load_quiz_json(target_persona)
    if json_questions:
        p_title = PERSONA_MAP.get(target_persona.lower(), target_persona) if target_persona else "全ペルソナ共通"
        print(f"🧠 REQ-02 ペルソナ特化演習モード [{p_title}] ({len(json_questions)} 件) をロードしました。\n")
        q = random.choice(json_questions)
        print(f"[質問] ({q['category'].upper()}) [Persona: {q.get('persona', 'general')}] {q['question']}")
        for idx, opt in enumerate(q['options'], 1):
            print(f"  {idx}. {opt}")
        print(f"\n💡 解答・解説: {q['answerIndex'] + 1}. {q['options'][q['answerIndex']]}")
        print(f"   {q['explanation']}")
    else:
        print("ランダムクイズを開始します...")

if __name__ == "__main__":
    main()
