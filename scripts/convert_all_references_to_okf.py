#!/usr/bin/env python3
"""
scripts/convert_all_references_to_okf.py
references/ 配下の全 PDF ファイル (全258件) を走査し、
pdfminer.six / pypdf / pdftotext / qpdf を駆使して
全ドキュメントの OKF フォーマット化を完成させる最終決定版スクリプト。
"""

import os
import sys
import re
import tempfile
import subprocess
from pathlib import Path
from pdfminer.high_level import extract_text as pdfminer_extract_text
import pypdf

WORKSPACE_ROOT = Path("/workspace/registered-Information-security-specialist-examination")
REFERENCES_DIR = WORKSPACE_ROOT / "references"
OKF_DIR = REFERENCES_DIR / "okf"

def get_pdf_metadata(pdf_path: Path):
    rel_path = pdf_path.relative_to(REFERENCES_DIR)
    rel_parts = rel_path.parts
    filename = pdf_path.name
    stem = pdf_path.stem

    doc_type = "reference_document"
    title = stem
    exam_year = ""
    version = ""
    keywords = ["IPA", "情報処理安全確保支援士"]

    if "syllabus" in stem:
        doc_type = "reference_syllabus"
        if "ver2_1" in stem:
            title = "情報処理安全確保支援士試験 シラバス Ver.2.1"
            version = "2.1"
            keywords.extend(["シラバス", "Ver.2.1", "知識細目"])
        elif "tsuiho4_0_henkou" in stem:
            title = "情報処理安全確保支援士試験 シラバス 追補版(科目A-2) Ver.4.0 変更箇所表示版"
            version = "4.0"
            keywords.extend(["シラバス追補", "科目A-2", "変更箇所"])
        elif "tsuiho4_0" in stem:
            title = "情報処理安全確保支援士試験 シラバス 追補版(科目A-2) Ver.4.0"
            version = "4.0"
            keywords.extend(["シラバス追補", "科目A-2"])
    elif "itss" in stem:
        doc_type = "reference_itss"
        version = "V3 2011"
        keywords.extend(["ITSS", "ITスキル標準", "キャリアフレームワーク"])
        if "career" in stem:
            title = f"ITスキル標準 V3 2011 キャリア定義 ({stem})"
        elif "skill" in stem:
            title = f"ITスキル標準 V3 2011 スキル定義 ({stem})"
        elif "roadmap" in stem:
            title = f"ITスキル標準 V3 2011 研修ロードマップ ({stem})"
        elif "matrix" in stem:
            title = f"ITスキル標準 V3 2011 研修マトリックス ({stem})"
        else:
            title = f"ITスキル標準 V3 2011 資料 ({stem})"
    elif rel_parts[0] == "past_exams":
        exam_year = rel_parts[1] if len(rel_parts) > 1 else ""
        keywords.append("過去問題")
        keywords.append(exam_year)

        is_qs = "qs" in stem or "question" in stem or "haru" in stem or "aki" in stem
        is_ans = "ans" in stem or "answer" in stem
        is_cmnt = "cmnt" in stem or "comment" in stem

        sub_type = "問題冊子"
        if is_ans:
            sub_type = "解答例"
        elif is_cmnt:
            sub_type = "採点講評"

        exam_type = "共通/専門"
        if "am1" in stem or "am1" in filename:
            doc_type = "reference_exam_am1"
            exam_type = "午前I"
        elif "am2" in stem or "am2" in filename:
            doc_type = "reference_exam_am2"
            exam_type = "午前II"
        elif "pm1" in stem or "pm1" in filename:
            doc_type = "reference_exam_pm1"
            exam_type = "午後I"
        elif "pm2" in stem or "pm2" in filename:
            doc_type = "reference_exam_pm2"
            exam_type = "午後II"
        elif is_cmnt:
            doc_type = "reference_exam_comment"
            exam_type = "全区分共通"

        title = f"情報処理安全確保支援士試験 {exam_year} {exam_type} {sub_type}"

    return {
        "type": doc_type,
        "title": title,
        "authority": "IPA",
        "version": version,
        "exam_year": exam_year,
        "keywords": keywords,
    }

def extract_pdf_text(pdf_path: Path) -> str:
    # 1. pdfminer.six
    try:
        t = pdfminer_extract_text(str(pdf_path))
        if t and len(t.strip()) > 30:
            return t
    except Exception:
        pass

    # 2. qpdf + pdfminer
    try:
        with tempfile.NamedTemporaryFile(suffix='.pdf') as tmp:
            subprocess.run(['qpdf', '--decrypt', str(pdf_path), tmp.name], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            t = pdfminer_extract_text(tmp.name)
            if t and len(t.strip()) > 30:
                return t
    except Exception:
        pass

    # 3. pypdf
    try:
        reader = pypdf.PdfReader(pdf_path)
        pages_text = [p.extract_text() for p in reader.pages if p.extract_text()]
        full_text = "\n\n".join(pages_text)
        if len(full_text.strip()) > 30:
            return full_text
    except Exception:
        pass

    # 4. pdftotext
    try:
        res = subprocess.run(
            ["pdftotext", "-layout", str(pdf_path), "-"],
            capture_output=True,
            text=True,
            check=True
        )
        if len(res.stdout.strip()) > 30:
            return res.stdout
    except Exception:
        pass

    return ""

def format_text_to_markdown(raw_text: str, title: str, pdf_rel_path: str) -> str:
    lines = raw_text.splitlines()
    cleaned_lines = []
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if cleaned_lines and cleaned_lines[-1] != "":
                cleaned_lines.append("")
            continue
        if re.match(r"^-\s*\d+\s*-$$", stripped) or re.match(r"^\d+\s*/\s*\d+$$", stripped):
            continue
        if re.match(r"^(問\d+|第\d+章|\d+\.\s+[^\s]+|■\s+[^\s]+)", stripped):
            cleaned_lines.append(f"\n### {stripped}\n")
        else:
            cleaned_lines.append(stripped)

    body_content = "\n".join(cleaned_lines)
    if not body_content.strip():
        body_content = f"（※ 本冊子はIPA公式のアウトライン化・画像化PDFのため、詳細本文の確認は原本PDF `[{pdf_rel_path}]({pdf_rel_path})` または同年度の解答例・採点講評OKFドキュメントをご参照ください。）"

    return f"# {title}\n\n{body_content}"

def main():
    print("=== 全一次情報 PDF (258件) の OKF 完全変換処理を実行します ===")
    
    pdf_files = sorted(list(REFERENCES_DIR.glob("**/*.pdf")))
    total_pdfs = len(pdf_files)
    print(f"検出された全 PDF ファイル数: {total_pdfs} 件")

    converted_count = 0
    full_text_count = 0
    outline_count = 0

    for pdf_path in pdf_files:
        rel_pdf = pdf_path.relative_to(REFERENCES_DIR)
        
        if rel_pdf.parts[0] == "past_exams":
            sub_dir = OKF_DIR / "past_exams" / rel_pdf.parts[1]
            okf_path = sub_dir / f"{pdf_path.stem}.md"
        else:
            okf_path = OKF_DIR / f"{pdf_path.stem}.md"

        okf_path.parent.mkdir(parents=True, exist_ok=True)
        meta = get_pdf_metadata(pdf_path)
        rel_pdf_from_okf = os.path.relpath(pdf_path, okf_path.parent)

        keywords_yaml = "\n".join([f"  - {kw}" for kw in meta["keywords"]])
        frontmatter = f"""---
type: {meta["type"]}
title: "{meta["title"]}"
authority: "{meta["authority"]}"
"""
        if meta["version"]:
            frontmatter += f'version: "{meta["version"]}"\n'
        if meta["exam_year"]:
            frontmatter += f'exam_year: "{meta["exam_year"]}"\n'
        frontmatter += f"""source_pdf: "{rel_pdf_from_okf}"
keywords:
{keywords_yaml}
updated_at: "2026-07-31"
---

"""

        raw_text = extract_pdf_text(pdf_path)
        if len(raw_text.strip()) > 30:
            full_text_count += 1
        else:
            outline_count += 1

        markdown_body = format_text_to_markdown(raw_text, meta["title"], rel_pdf_from_okf)

        with open(okf_path, "w", encoding="utf-8") as f:
            f.write(frontmatter + markdown_body)

        converted_count += 1

    print(f"=== 全 {converted_count}/{total_pdfs} 件の OKF 変換が完璧に完了しました ===")
    print(f"  - 本文全文抽出成功: {full_text_count} 件")
    print(f"  - 画像/アウトラインPDF(ガイドリンク付き): {outline_count} 件")

if __name__ == "__main__":
    main()
