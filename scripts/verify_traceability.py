#!/usr/bin/env python3
"""
トレーサビリティおよび相対パス自動検証スクリプト (verify_traceability.py)
Issue 040 に準拠し、アクティブドキュメントのリンク・相対パスルール・ファイル存在性を自動検証する。
"""

import os
import re
import sys

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TARGET_DIRS = ['docs', 'issues', 'references', 'site']

def verify_markdown_files():
    errors = []
    file_count = 0
    link_count = 0

    markdown_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

    for target_dir in TARGET_DIRS:
        target_path_abs = os.path.join(WORKSPACE_ROOT, target_dir)
        if not os.path.exists(target_path_abs):
            continue

        for root, _, files in os.walk(target_path_abs):
            # 過去の閉鎖済みフォルダ等を除外
            if 'issues/closed' in root or any(ignored in root for ignored in ['.git', 'node_modules', '.agents/skills']):
                continue

            for file in files:
                if not file.endswith('.md'):
                    continue

                file_count += 1
                file_path = os.path.join(root, file)
                rel_file_path = os.path.relpath(file_path, WORKSPACE_ROOT)

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                except Exception as e:
                    errors.append(f"❌ 読み込み失敗: {rel_file_path} ({e})")
                    continue

                for idx, line in enumerate(lines, 1):
                    # 1. 絶対パス誤用チェック (file:/// の検出、説明文内の例外を除く)
                    if "file:///" in line and "verify_traceability.py" not in line and "040-" not in line and "implementation_plan" not in line:
                        errors.append(f"❌ [Line {idx}] {rel_file_path}: 'file:///' 絶対パス混入を検出")

                    # 2. 相対リンク実在チェック
                    for match in markdown_pattern.finditer(line):
                        link_text = match.group(1)
                        link_target = match.group(2)
                        link_count += 1

                        # 外部URLやアンカーのみのリンクはスキップ
                        if link_target.startswith(('http://', 'https://', 'mailto:', '#')):
                            continue

                        # クエリパラメータ・アンカーの除去
                        target_path_clean = link_target.split('#')[0].split('?')[0]
                        if not target_path_clean:
                            continue

                        # ターゲット絶対パスの計算
                        target_abs_path = os.path.normpath(os.path.join(os.path.dirname(file_path), target_path_clean))

                        if not os.path.exists(target_abs_path):
                            errors.append(f"❌ [Line {idx}] {rel_file_path}: 参照ファイルが存在しません -> {target_path_clean}")

    print(f"🔍 スキャン完了: 調査ファイル数={file_count}, 検証リンク数={link_count}")

    if errors:
        print(f"❌ 検証失敗: {len(errors)} 件のエラーを検出しました。")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("✅ アクティブドキュメントのすべてのトレーサビリティおよび相対パス検証を正常通過しました！")
        sys.exit(0)

if __name__ == '__main__':
    verify_markdown_files()
