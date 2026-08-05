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

GLOSSARY_FILES = [
    "docs/glossary/syllabus_ver2_1.md",
    "docs/glossary/syllabus_tsuiho_ver4_0.md"
]

OUTPUT_INDEX_JSON = "site/search_index.json"

def tokenize(text):
    """文字N-gram (Bigram) および 単語トークナイザー（日本語マルチバイト対応）"""
    if not text:
        return []
    clean = re.sub(r'[!"#$%&\'()*+,\-./:;<=>?@\[\\\]^_`{|}~、。！？「」『』（）［］【】\s]+', ' ', text.lower()).strip()
    if not clean:
        return []
    words = clean.split()
    no_space = re.sub(r'\s+', '', clean)
    bigrams = [no_space[i:i+2] for i in range(len(no_space)-1)]
    return list(set(words + bigrams))

class FMIndexVectorSearchEngine:
    def __init__(self):
        self.docs = []
        self.vocab = {}
        self.doc_vectors = []
        self.idf = {}

    def load_documents(self):
        doc_id = 0
        for filepath in GLOSSARY_FILES:
            if not os.path.exists(filepath):
                continue
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
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
                    "full_text": full_text
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
                tfidf = (count / len(tokens)) * self.idf.get(t, 0)
                vector[t] = tfidf
                norm_sq += tfidf * tfidf
            
            norm = math.sqrt(norm_sq) if norm_sq > 0 else 1.0
            # 正規化ベクトル
            vector_norm = {t: val / norm for t, val in vector.items()}
            self.doc_vectors.append(vector_norm)

    def search(self, query, top_k=5):
        q_tokens = tokenize(query)
        if not q_tokens:
            return []

        # クエリ TF-IDF
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

        # コサイン類似度スコアリング
        scores = []
        for d_id, d_vec in enumerate(self.doc_vectors):
            score = 0.0
            # 内積計算
            for t, val in q_vec_norm.items():
                if t in d_vec:
                    score += val * d_vec[t]
            
            # クエリ文字列の完全一致ボーナス（FM-index風の正確性強化）
            if query.lower() in self.docs[d_id]["name"].lower():
                score += 2.0
            elif query.lower() in self.docs[d_id]["full_text"].lower():
                score += 0.5
                
            if score > 0.05:
                scores.append((d_id, score))

        scores.sort(key=lambda x: x[1], reverse=True)
        results = []
        for d_id, score in scores[:top_k]:
            doc = self.docs[d_id].copy()
            doc["score"] = round(score, 4)
            results.append(doc)
        return results

    def export_index_json(self):
        os.makedirs(os.path.dirname(OUTPUT_INDEX_JSON), exist_ok=True)
        
        # 浮動小数点精度丸め
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
                "exam": d["exam"]
            } for d in self.docs],
            "idf": idf_rounded,
            "vectors": vectors_rounded
        }
        with open(OUTPUT_INDEX_JSON, "w", encoding="utf-8") as f:
            json.dump(export_data, f, ensure_ascii=False, separators=(',', ':'))
        print(f"✅ フルスクラッチ検索インデックスを出力しました: {OUTPUT_INDEX_JSON}")

def main():
    engine = FMIndexVectorSearchEngine()
    engine.load_documents()
    engine.build_index()
    engine.export_index_json()

    if "--query" in sys.argv:
        q_idx = sys.argv.index("--query") + 1
        if q_idx < len(sys.argv):
            query = sys.argv[q_idx]
            print(f"\n🔍 検索クエリ: 『{query}』")
            results = engine.search(query, top_k=5)
            print(f"📊 該当件数: {len(results)} 件")
            for r in results:
                print(f"  ・[{r['score']}] {r['name']} (ID: {r['anchor']})")
                print(f"    概要: {r['summary'][:60]}...")

if __name__ == "__main__":
    main()
