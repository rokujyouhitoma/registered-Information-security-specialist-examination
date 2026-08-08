#!/usr/bin/env python3
"""
scripts/audit_search_ragas.py

RAGAS (Retrieval Augmented Generation Assessment) / ARES 互換の検索精度定量評価パイプライン。
過去問・グラウンドトゥルースデータセット (src/data/ground_truth.json) に対する
Context Precision (正解論文網羅精度) および Context Recall (全正解検出率) を自動計測・監査する。
"""

import os
import sys
import json
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
GT_PATH = os.path.join(BASE_DIR, "src", "data", "ground_truth.json")
SEARCH_INDEX_PATH = os.path.join(BASE_DIR, "site", "search_index.json")

def load_json(path):
    if not os.path.exists(path):
        print(f"❌ エラー: ファイルが存在しません: {path}")
        sys.exit(1)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def run_simulated_search(query, index_data, top_k=1):
    """
    Python 簡易ハイブリッド検索シミュレータ (BM25 + 概念・URLマッチング)
    """
    docs = index_data.get("docs", [])
    query_tokens = [q.lower().strip() for q in re.split(r'[\s()/_\-\u3000]+', query) if q.strip()]
    
    scored_docs = []
    for doc in docs:
        name = doc.get('name', '').lower()
        summary = doc.get('summary', '').lower()
        content = doc.get('content', '').lower()
        url = doc.get('url', '').lower()
        text = f"{name} {summary} {content} {url}"
        
        matches = sum(1 for token in query_tokens if token in text or token in url)
        if matches > 0:
            score = matches * 2.0
            for token in query_tokens:
                if token in url:
                    score += 10.0
                if token in name:
                    score += 5.0
            scored_docs.append({
                "url": doc.get("url", ""),
                "name": doc.get("name", ""),
                "score": score
            })
            
    scored_docs.sort(key=lambda x: x["score"], reverse=True)
    return scored_docs[:top_k]

def evaluate_ragas_metrics():
    print("=== RAGAS / ARES 基準 検索精度定量評価パイプラインを開始します ===")
    gt_data = load_json(GT_PATH)
    index_data = load_json(SEARCH_INDEX_PATH)
    
    test_cases = gt_data.get("test_cases", [])
    if not test_cases:
        print("❌ エラー: グラウンドトゥルースデータセットが空です。")
        sys.exit(1)
        
    total_precision = 0.0
    total_recall = 0.0
    evaluated_count = len(test_cases)
    
    print(f"\n📊 全 {evaluated_count} 件の過去問グラウンドトゥルーステストケースを評価中...\n")
    
    for tc in test_cases:
        tc_id = tc.get("id")
        query = tc.get("query")
        expected_ids = tc.get("expected_doc_ids", [])
        
        results = run_simulated_search(query, index_data, top_k=len(expected_ids))
        retrieved_urls = [r["url"] for r in results]
        
        hits = 0
        matched_hits = []
        for eid in expected_ids:
            if any(eid in url for url in retrieved_urls):
                hits += 1
                matched_hits.append(eid)

        precision = hits / float(len(results)) if results else 0.0
        recall = hits / float(len(expected_ids)) if expected_ids else 0.0
        
        total_precision += precision
        total_recall += recall
        
        print(f"[{tc_id}] Query: 『{query}』")
        print(f"  ・Context Precision: {precision:.4f}")
        print(f"  ・Context Recall:    {recall:.4f}")
        print(f"  ・Hit Docs:         {matched_hits} / Expected: {expected_ids}")
        
    avg_precision = total_precision / evaluated_count
    avg_recall = total_recall / evaluated_count
    f1_score = (2 * avg_precision * avg_recall / (avg_precision + avg_recall)) if (avg_precision + avg_recall) > 0 else 0.0
    
    print("\n" + "="*50)
    print("📈 RAGAS 定量評価最終レポート")
    print("="*50)
    print(f"・Mean Context Precision: {avg_precision:.4f} (目標値: >= 0.85)")
    print(f"・Mean Context Recall:    {avg_recall:.4f}")
    print(f"・Harmonic F1 Score:       {f1_score:.4f}")
    print("="*50 + "\n")
    
    if avg_precision >= 0.85:
        print("🎉 [RAGAS監査合格] 検索精度目標 (Context Precision >= 0.85) を達成しました！")
        sys.exit(0)
    else:
        print(f"❌ [RAGAS監査不合格] Context Precision ({avg_precision:.4f}) が目標値 0.85 を下回っています。")
        sys.exit(1)

if __name__ == "__main__":
    evaluate_ragas_metrics()
