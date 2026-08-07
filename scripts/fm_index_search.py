#!/usr/bin/env python3
"""
フルスクラッチ FM-index & ベクター全文検索エンジン (FM-Index & Vector Search Engine v1.0)
外部ライブラリ非依存（Python標準ライブラリ `math`, `re`, `json` のみ）。
"""

import sys
import re
import os
import json
import math

DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs"))
OUTPUT_INDEX_JSON = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "site", "search_index.json"))

STOPWORDS_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "stopwords.json"))
_STOP_WORDS = set()
if os.path.exists(STOPWORDS_FILE):
    try:
        with open(STOPWORDS_FILE, "r", encoding="utf-8") as f:
            _STOP_WORDS = set(w.lower() for w in json.load(f))
    except Exception:
        pass

def tokenize(text):
    """文字N-gram (Bigram) および 単語トークナイザー（日本語マルチバイト対応・ストップワード除外）"""
    if not text:
        return []
    clean = re.sub(r'[!"#$%&\'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+', ' ', text.lower()).strip()
    if not clean:
        return []
    words = [w for w in clean.split() if w not in _STOP_WORDS]
    no_space = re.sub(r'\s+', '', clean)
    bigrams = [no_space[i:i+2] for i in range(len(no_space)-1) if no_space[i:i+2] not in _STOP_WORDS]
    return list(set(words + bigrams))

class FMIndexVectorSearchEngine:
    def __init__(self):
        self.docs = []
        self.vocab = {}
        self.doc_vectors = []
        self.idf = {}

    def load_documents(self):
        self.docs = []
        doc_id = 0

        for root, dirs, files in os.walk(DOCS_DIR):
            for f in files:
                if not f.endswith('.md'):
                    continue

                filepath = os.path.join(root, f)
                rel_path = os.path.relpath(filepath, DOCS_DIR)

                # HTML 相対パスの算出 (build_html_docs.py のルールと一致)
                if rel_path == 'index.md':
                    html_rel_path = 'docs_index.html'
                else:
                    html_rel_path = os.path.splitext(rel_path)[0] + '.html'
                
                # パス区切り文字の正規化 (POSIX スタイル)
                html_rel_path = html_rel_path.replace(os.sep, '/')

                with open(filepath, "r", encoding="utf-8") as file_obj:
                    content = file_obj.read()

                # A. 大容量シラバス・用語集ファイルは内部の `#### <a id="..."></a>` ブロック単位で分割・精緻抽出
                if rel_path in ['glossary/syllabus_ver2_1.md', 'glossary/syllabus_tsuiho_ver4_0.md']:
                    blocks = re.findall(
                        r'#### <a id="([^"]+)"></a>([^\n]+)\n- \*\*概要\*\*: ([^\n]+)\n- \*\*技術・運用ポイント\*\*: ([^\n]+)\n- \*\*試験出題ポイント\*\*: ([^\n]+)',
                        content
                    )
                    for anchor, name, summary, tech, exam in blocks:
                        full_text = f"{name} {summary} {tech} {exam}"
                        self.docs.append({
                            "id": doc_id,
                            "anchor": anchor,
                            "name": name.strip(),
                            "summary": summary.strip(),
                            "tech": tech.strip(),
                            "exam": exam.strip(),
                            "url": f"{html_rel_path}#{anchor}",
                            "full_text": full_text
                        })
                        doc_id += 1
                    continue

                # B. その他の全 Markdown ドキュメント (単体用語、演習問題、ガイドライン、シナリオ等)
                # タイトル抽出 (最初の H1 見出し、無ければファイル名)
                h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                title = h1_match.group(1).strip() if h1_match else os.path.splitext(f)[0]

                # 概要抽出 (最初の本文パラグラフ)
                body_clean = re.sub(r'#+\s+[^\n]+', '', content)
                body_clean = re.sub(r'<[^>]+>', '', body_clean)
                body_clean = re.sub(r'[\r\n]+', ' ', body_clean).strip()
                summary = body_clean[:180] + '...' if len(body_clean) > 180 else body_clean

                self.docs.append({
                    "id": doc_id,
                    "anchor": os.path.splitext(f)[0],
                    "name": title,
                    "summary": summary,
                    "tech": "",
                    "exam": "",
                    "url": html_rel_path,
                    "full_text": f"{title} {body_clean}"
                })
                doc_id += 1

    def build_index(self):
        N = len(self.docs)
        if N == 0:
            return

        # 1. TF-IDF 計算
        doc_tokens = [tokenize(d["full_text"]) for d in self.docs]
        df = {}
        for tokens in doc_tokens:
            unique_tokens = set(tokens)
            for token in unique_tokens:
                df[token] = df.get(token, 0) + 1

        self.idf = {token: math.log((N + 1) / (count + 1)) + 1.0 for token, count in df.items()}

        for tokens in doc_tokens:
            tf = {}
            for t in tokens:
                tf[t] = tf.get(t, 0) + 1
            
            vector = {}
            norm_sq = 0.0
            for t, count in tf.items():
                tfidf = (count / (len(tokens) or 1)) * self.idf.get(t, 0)
                vector[t] = tfidf
                norm_sq += tfidf * tfidf
            
            norm = math.sqrt(norm_sq) if norm_sq > 0 else 1.0
            vector_norm = {t: val / norm for t, val in vector.items()}
            self.doc_vectors.append(vector_norm)

    def search(self, query, top_k=5):
        q_tokens = tokenize(query)
        if not q_tokens:
            return []

        q_tf = {}
        for t in q_tokens:
            q_tf[t] = q_tf.get(t, 0) + 1
        
        q_vec = {}
        norm_sq = 0.0
        for t, count in q_tf.items():
            tfidf = (count / len(q_tokens)) * self.idf.get(t, 0)
            q_vec[t] = tfidf
            norm_sq += tfidf * tfidf
        
        q_norm = math.sqrt(norm_sq) if norm_sq > 0 else 1.0
        q_vec_norm = {t: val / q_norm for t, val in q_vec.items()}

        scores = []
        q_lower = query.lower()
        for d_id, d_vec in enumerate(self.doc_vectors):
            score = 0.0
            for t, val in q_vec_norm.items():
                if t in d_vec:
                    score += val * d_vec[t]
            
            doc_name = self.docs[d_id]["name"].lower()
            doc_full = self.docs[d_id]["full_text"].lower()

            if q_lower == doc_name:
                score += 10.0
            elif q_lower in doc_name:
                score += 5.0
            elif q_lower in doc_full:
                score += 1.5
                
            if score > 0.01:
                scores.append((d_id, score))

        scores.sort(key=lambda x: x[1], reverse=True)
        results = []
        for d_id, score in scores[:top_k]:
            doc = self.docs[d_id].copy()
            doc["score"] = round(score, 4)
            results.append(doc)
        return results

    def export_index_json(self, output_path=None):
        out_file = output_path or OUTPUT_INDEX_JSON
        os.makedirs(os.path.dirname(out_file), exist_ok=True)
        
        idf_rounded = {k: round(v, 4) for k, v in self.idf.items()}
        vectors_rounded = [
            {k: round(v, 4) for k, v in vec.items()}
            for vec in self.doc_vectors
        ]

        export_data = {
            "docs": [{
                "id": d["id"],
                "anchor": d["anchor"],
                "name": d["name"],
                "summary": d["summary"],
                "tech": d["tech"],
                "exam": d["exam"],
                "url": d["url"]
            } for d in self.docs],
            "idf": idf_rounded,
            "vectors": vectors_rounded
        }
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(export_data, f, ensure_ascii=False, separators=(',', ':'))
        print(f"✅ 全 docs/ ドキュメント網羅型検索インデックスを出力しました ({len(self.docs)} 件): {out_file}")


def build_search_index(output_path=None):
    """ビルドスクリプト連動用のインデックス自動構築エントリーポイント"""
    engine = FMIndexVectorSearchEngine()
    engine.load_documents()
    engine.build_index()
    engine.export_index_json(output_path)
    return engine


def main():
    engine = build_search_index()

    if "--query" in sys.argv:
        q_idx = sys.argv.index("--query") + 1
        if q_idx < len(sys.argv):
            query = sys.argv[q_idx]
            print(f"\n🔍 検索クエリ: 『{query}』")
            results = engine.search(query, top_k=5)
            print(f"📊 該当件数: {len(results)} 件")
            for r in results:
                print(f"  ・[{r['score']}] {r['name']} (URL: {r['url']})")
                print(f"    概要: {r['summary'][:60]}...")

if __name__ == "__main__":
    main()
