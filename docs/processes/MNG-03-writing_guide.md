# ドキュメント執筆ガイドライン (Writing Guide)

`docs/` に追加する学習コンテンツを整理・統一するための書き方ガイドです。

---

## ✍️ 執筆ルール

### 1. 記事メタデータ標準仕様 (YAML Frontmatter)
`docs/` に作成するすべての学習コンテンツ記事は、先頭に以下の Frontmatter を付与してください。

```yaml
---
title: "記事の正式タイトル"
syllabus_code: "3-1" # シラバス小項目番号 (例: 3-1, A2-01)
exam_type:
  - "A-2" # 科目A-2 (四肢択一)
  - "B"   # 科目B (午後記述)
difficulty: "Advanced" # Basic / Intermediate / Advanced
tags:
  - "暗号方式"
  - "午後記述頻出"
last_updated: "2026-07-31"
author: "Information Security Specialist Agent"
---
```

### 2. 構成の明確化
- 見出しレベル（`#`, `##`, `###`）を順序立てて利用する。
- テンプレート記事 [docs/template_article.md](../docs/template_article.md) を参照して構成を統一する。

   - 要点には箇条書き・表・Mermaid図を活用する。

2. **用語の統一**:
   - IPA公式シラバスおよび試験用語に準拠する（例: 「共通鍵暗号」「暗号利用モード (GCM)」「送信元認証」など）。

3. **出典の明記**:
   - 一次情報（IPA、NIST、RFC等）を参照した場合は、[references/](../references/README.md) または該当節の末尾に出典URLを明記する。

4. **記述式対策キーワードの強調**:
   - 午後記述試験で問われやすいキーワードや模範解答フレーズは、強調表記 (`**` や引用ブロック `>`) で際立たせる。

5. **相対パス強制ルール**:
   - リポジトリ内のすべてのハイパーリンク・画像埋め込みは相対パスを使用し、環境依存の絶対パス（`file:///workspace/...`, `file:///root/...`, `/workspace/...`）を絶対に使用しないでください。
   - GitHub Pages, Git ローカルリポジトリ, IDE（VSCode等）等の異なる閲覧環境でもリンク切れが発生しないようにするためです。
   
   #### ❌ NG 例（使用禁止）
   - `[シラバス](file:///workspace/registered-information-security-specialist-examination/references/syllabus.pdf)` (ローカル絶対パス)
   - `[シラバス](/workspace/registered-information-security-specialist-examination/references/syllabus.pdf)` (ルート絶対パス)
   - `<a href="file:///root/.gemini/...">` (環境固有パス)

   #### ⭕ OK 例（推奨）
   - `[シラバス](../references/syllabus.pdf)` (1階層上のディレクトリ参照)
   - `[用語集](glossary.md)` (同階層の参照)
   - `[詳細](../docs/syllabus_detail.md#L10-L20)` (アンカー指定を含む相対パス)

   > [!NOTE]
   > 規約の説明文など、インラインコード内（` `file:///...` `）で絶対パスの例を挙げることは許可されますが、`[text](url)` や `<a href="url">` などの実効ハイパーリンク・画像タグ内での使用は厳禁です。

---

## 5. 品質保証・レビューゲート (Quality Gate)

すべての学習ドキュメントは、PR提出前に [quality_assurance_checklist.md](quality_assurance_checklist.md) に基づく自己チェックを行い、以下の品質ゲートをパスする必要があります。

1. **IPA公式用語適合**: 表記揺れがないこと。
2. **一次情報明確化**: 参照文献が明記されていること。
3. **記述対策キーワード強調**: 30〜40字の模範解答用フレーズが提示されていること。
4. **推奨暗号標準**: 非推奨暗号の安全利用扱いがないこと。
5. **相対パス適合**: 絶対パス混入が0件であること (`python3 scripts/check_relative_paths.py`)。

