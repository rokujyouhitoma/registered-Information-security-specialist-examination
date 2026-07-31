---
ID: 013
種別: Feature
優先度: High
ステータス: Closed
---

# [FEAT/ENH] 全用語・略語を一元管理する用語辞書 (docs/glossary.md) の構築 (ID: 013)

## 1. 概要 / Summary
IPA公式シラバス（Ver.2.1 および 科目A-2追補版）に登場するすべての専門用語・略語（GCM, AEAD, SOAR, STIX, TAXII, SCRM, SBOM等）を一元検索・閲覧でき、該当シラバス項目への相互リンクを持つ総合用語辞書 `docs/glossary.md` を作成する。

---

## 2. トレーサビリティ / Traceability
- 関連資料: 
  - [project-docs/management_improvement_plan.md](../project-docs/management_improvement_plan.md) (項目9)
  - [docs/syllabus_detail.md](../docs/syllabus_detail.md)
  - [docs/syllabus_tsuiho_detail.md](../docs/syllabus_tsuiho_detail.md)

---

## 3. 影響範囲と関連ファイル / Scope and Affected Files
- [x] [docs/glossary.md](../docs/glossary.md)
- [x] [docs/syllabus.md](../docs/syllabus.md)
- [x] [docs/index.md](../docs/index.md)

---

## 4. 実装方針 / Implementation Plan
Target Branch: `feat/013-unified-glossary-dict-construction`

1. **シラバス全用語例の抽出解析**:
   - `docs/syllabus_detail.md` (Ver.2.1) および `docs/syllabus_tsuiho_detail.md` (追補版) の「用語例」セクションから主要な用語・略語を全抽出。

2. **総合用語辞書 `docs/glossary.md` の作成**:
   - **構成**:
     - `# 情報処理安全確保支援士試験 総合用語辞書 (Glossary)`
     - アルファベット（A〜Z）および 50 音順の見出しインデックス
   - **エントリーフォーマット**:
     ```markdown
     ### GCM (Galois/Counter Mode)
     - **概要**: 共通鍵暗号の暗号利用モードの一種。暗号化と改ざん検知メッセージ認証コード(MAC)の生成を同時に行う認証付き暗号 (AEAD) 方式。
     - **関連シラバス項目**: [3-1 暗号技術](syllabus_detail.md#3-1-暗号技術)
     ```

3. **目次追加**:
   - `docs/index.md` および `docs/syllabus.md` に用語辞書へのナビゲーションリンクを追加。

---

## 5. 完了条件 / Success Criteria (DoD)
- [ ] `docs/glossary.md` が作成され、主要な専門用語・略語がシラバス参照リンク付きで登録されること
- [ ] 目次ドキュメントから `docs/glossary.md` へのハイパーリンクが機能すること
- [x] 相対パスで正しくシラバス各項目へ相互移動できること
