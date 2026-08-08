# [FEAT/IR] IR・RAG 強化 Phase 4: Parent-Document Retrieval（階層的 Chunking）および Markdown/Layout-Aware 解析構造化インデックス化 (ID: 131)

## メタデータ

- **ID**: 131
- **種別**: Feature / IR / Chunking
- **優先度**: Medium
- **ステータス**: Closed
- **担当スペシャリスト**: PA (`principal-architect`) & SA (`systems-architect`)
- **ターゲットブランチ**: `feat/131-ir-rag-phase4-parent-document-hierarchical-chunking`
- **完了日**: 2026-08-08

---

## 1. 概要 / Summary

試験過去問や IPA セキュリティドキュメントが持つ「大問 ＞ 設問 ＞ 選択肢 / 図表」という構造をパースし、検索インデックス生成時に「小チャンク（検索用スニペット）」と「親チャンク（大問文脈全体）」を紐づけて保持する Parent-Document Retrieval 機構を構築しました。
あわせて、ネットワーク構成図のキャプション、コンフィグ（SHOW CONFIG）、表構造を認知した Layout-Aware インデックス化を導入しました。

---

## 2. トレーサビリティ / Traceability

- 関連ドキュメント: [SYS-01 システム基本設計書](../project-docs/architecture/SYS-01-system_high_level_design.md), [ARCH-01 UI/UX & レイアウト設計書](../project-docs/architecture/ARCH-01-docs_architecture_and_layout_design.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files

1. **`scripts/build_content_json.py`**:
   - `# / ## / ###` 見出し、Markdown 表構造 (`| ... |`)、およびコードブロック (` ``` `) を抽出し、`chunks` 配列と `parent_id` 階層リンクを自動付与する Layout-Aware 解析ロジックを実装。
2. **`src/js/fm_index_engine.js`**:
   - `CustomSearchEngine.getParentDocument(targetId)` メソッドを追加し、子チャンク ID から親ドキュメント文脈の全復元を可能にしました。また、`search()` 検索結果に `parent_id` を保持。
3. **`tests/unit/search_engine.test.js`**:
   - `getParentDocument` 子チャンク ID 解除・親文脈復元テストを追加。

---

## 4. 完了条件 / Success Criteria (DoD)

- [x] ドキュメントが親・子チャンクの階層データとして `content_store.json` に構造化出力されること。
- [x] 小チャンク検索でヒットした場合に親ドキュメントのコンテキストが正常復元できること。
- [x] 単体テストおよび `make build` に合格すること。
