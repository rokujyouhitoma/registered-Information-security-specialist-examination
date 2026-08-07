#!/usr/bin/env python3
"""
scripts/verify_cyclomatic_complexity.py

循環的複雑度 (Cyclomatic Complexity) 自動検証スクリプト (ADR-02 準拠)
`src/js/` 配下のすべての JavaScript 関数のサイクロマティック複雑度 V(G) を静的解析し、
閾値 (10) を超える複雑な関数を検知・アサーションアサインする。
"""

import os
import re
import sys
import glob

MAX_COMPLEXITY_THRESHOLD = 10
SRC_JS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "js"))

# 構造上やむを得ず閾値を超過することを許容する関数リスト（ADR-02 で明記）
ALLOWED_EXCEPTIONS = {
    # 例: "CustomSearchEngine.search": 12 
}

def calculate_complexity(code_block):
    """
    関数本体コードのサイクロマティック複雑度 V(G) を算出
    基本値: 1
    分岐要素: if, else if, for, while, case, catch, &&, ||, ?
    """
    # コメントや文字列リテラルの簡易除去（誤判定防止）
    clean_code = re.sub(r'//.*', '', code_block)
    clean_code = re.sub(r'/\*[\s\S]*?\*/', '', clean_code)
    clean_code = re.sub(r"'[^']*'", "''", clean_code)
    clean_code = re.sub(r'"[^"]*"', '""', clean_code)
    clean_code = re.sub(r'`[^`]*`', '""', clean_code)

    complexity = 1
    # 判定キーワードの数をカウント
    decision_patterns = [
        r'\bif\b',
        r'\belse\s+if\b',
        r'\bfor\b',
        r'\bwhile\b',
        r'\bcase\b',
        r'\bcatch\b',
        r'&&',
        r'\|\|',
        r'\?'
    ]

    for pattern in decision_patterns:
        matches = re.findall(pattern, clean_code)
        complexity += len(matches)

    return complexity

def extract_functions(filepath):
    """JS ファイルから関数名とコードブロックを抽出"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    functions = []

    # クラス定義、関数宣言、アロー関数、メソッドの正規表現パターン
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        # 関数のシグネチャパターン (static foo(...), foo(...), function foo(...))
        fn_match = re.search(r'(?:static\s+)?(?:async\s+)?([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*\{', line)
        if fn_match:
            fn_name = fn_match.group(1)
            if fn_name not in ['if', 'for', 'while', 'switch', 'catch']:
                # ブラケット開閉カウントによる関数領域の抽出
                start_line = i
                brace_count = line.count('{') - line.count('}')
                fn_lines = [line]
                i += 1
                while i < len(lines) and brace_count > 0:
                    l = lines[i]
                    brace_count += l.count('{') - l.count('}')
                    fn_lines.append(l)
                    i += 1
                
                fn_code = '\n'.join(fn_lines)
                functions.append({
                    "name": f"{filename} :: {fn_name}",
                    "short_name": fn_name,
                    "code": fn_code,
                    "line": start_line + 1
                })
                continue
        i += 1

    return functions

def main():
    print("=== 📊 循環的複雑度 (Cyclomatic Complexity) 自動検証を開始します (ADR-02 準拠) ===\n")
    print(f"🎯 目標最大複雑度閾値: {MAX_COMPLEXITY_THRESHOLD}")

    if not os.path.exists(SRC_JS_DIR):
        print(f"❌ エラー: {SRC_JS_DIR} が存在しません。")
        sys.exit(1)

    total_functions = 0
    complexity_errors = 0

    target_files = sorted(glob.glob(os.path.join(SRC_JS_DIR, "**/*.js"), recursive=True))

    for filepath in target_files:
        rel_path = os.path.relpath(filepath, SRC_JS_DIR)
        funcs = extract_functions(filepath)
        total_functions += len(funcs)
        
        for fn in funcs:
            comp = calculate_complexity(fn['code'])
            status_symbol = "✅"
            
            if comp > MAX_COMPLEXITY_THRESHOLD:
                if fn['name'] in ALLOWED_EXCEPTIONS:
                    status_symbol = "⚠️ [例外承認済]"
                    print(f"  {status_symbol} {rel_path} :: {fn['name']} (L{fn['line']}) - V(G) = {comp} <= 例外枠上限 {ALLOWED_EXCEPTIONS[fn['name']]}")
                else:
                    status_symbol = "❌ [閾値超過]"
                    complexity_errors += 1
                    print(f"  {status_symbol} {rel_path} :: {fn['name']} (L{fn['line']}) - V(G) = {comp} > 閾値 {MAX_COMPLEXITY_THRESHOLD}")
            else:
                print(f"  {status_symbol} {rel_path} :: {fn['name']} (L{fn['line']}) - V(G) = {comp}")

    print("\n--------------------------------------------------")
    print(f"📊 検証対象関数総数: {total_functions} 件")

    if complexity_errors > 0:
        print(f"\n❌ [QA検証失敗] 計 {complexity_errors} 件の関数で循環的複雑度が閾値 ({MAX_COMPLEXITY_THRESHOLD}) を超過しています。")
        print("💡 単一責任原則 (SRP) に従い、関数分割またはヘルパー抽出のリファクタリングを行ってください。")
        sys.exit(1)
    else:
        print(f"🎉 [合格] すべての関数の循環的複雑度が ADR-02 規定値 ({MAX_COMPLEXITY_THRESHOLD} 以下) をクリアしています！")
        sys.exit(0)

if __name__ == "__main__":
    main()
