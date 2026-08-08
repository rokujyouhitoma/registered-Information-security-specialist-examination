# ⚡ 試験直前対策 虎の巻：科目B記述キーフレーズ集 & 最終チェックリスト

本ドキュメントは、**IPA 情報処理安全確保支援士試験 (SC) 科目 B (記述式)** の合格に必要な解法テクニック、分野別キーフレーズ、および最終チェックリストをまとめた直前対策ガイドです。[REQ-02 ユーザー定義書](../../docs/requirements/REQ-02-user_personas_and_scenarios.md) の **Persona 1 (合格志向受験者)** および **Persona 2 (有資格者・登録セキスぺ)** の学習ニーズに直接対応しています。

---

## ⚡ 1. 科目B 記述直前キーフレーズ集 (30〜50字 採点基準適合)

IPA 公式採点基準に準拠し、本試験の記述指定文字数（指定文字数の 80%〜100%）に完全適合する 30〜50 文字の模範解答テンプレート構文集です。

<!-- ⭐ 直前総復習ワンタップブックマークコンポーネント -->
<div id="cheatsheet-bookmark-widget" style="max-width: 850px; margin: 1.5rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(234, 179, 8, 0.4); border-radius: 16px; padding: 1.25rem 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div>
            <h3 style="color: #f8fafc; font-size: 1.1rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>⭐ 試験直前ワンタップブックマーク</span>
                <span style="font-size: 0.75rem; background: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.4); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">Persona 4 Support</span>
            </h3>
            <p style="color: #94a3b8; font-size: 0.82rem; margin: 0.25rem 0 0 0;">苦手なキーフレーズの星印をクリックして保存し、試験会場でワンタップ抽出復習が可能です。</p>
        </div>
        <button id="toggle-bookmark-filter-btn" onclick="toggleBookmarkFilter()" style="background: rgba(234, 179, 8, 0.15); color: #fde047; border: 1px solid #eab308; border-radius: 10px; padding: 0.5rem 1.1rem; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: all 0.2s;">
            ⭐ ブックマークのみ表示 (OFF)
        </button>
    </div>
</div>

<script>
let bookmarkOnly = false;
let bookmarkedIds = new Set(JSON.parse(localStorage.getItem('cheatsheet_bookmarks') || '[]'));

function toggleBookmark(id) {
    if (bookmarkedIds.has(id)) {
        bookmarkedIds.delete(id);
    } else {
        bookmarkedIds.add(id);
    }
    localStorage.setItem('cheatsheet_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    updateBookmarkStyles();
}

function toggleBookmarkFilter() {
    bookmarkOnly = !bookmarkOnly;
    const btn = document.getElementById('toggle-bookmark-filter-btn');
    if (btn) {
        btn.innerText = bookmarkOnly ? '⭐ 全項目表示に戻す' : '⭐ ブックマークのみ表示 (OFF)';
        btn.style.background = bookmarkOnly ? '#eab308' : 'rgba(234, 179, 8, 0.15)';
        btn.style.color = bookmarkOnly ? '#0f172a' : '#fde047';
    }
    updateBookmarkFilterVisibility();
}

function updateBookmarkStyles() {
    document.querySelectorAll('.bookmark-star-btn').forEach(btn => {
        const id = btn.getAttribute('data-id');
        if (bookmarkedIds.has(id)) {
            btn.innerHTML = '⭐ Saved';
            btn.style.color = '#fde047';
            btn.style.background = 'rgba(234, 179, 8, 0.25)';
            btn.style.borderColor = '#eab308';
        } else {
            btn.innerHTML = '☆ Bookmark';
            btn.style.color = '#94a3b8';
            btn.style.background = 'rgba(255, 255, 255, 0.05)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    updateBookmarkFilterVisibility();
}

function updateBookmarkFilterVisibility() {
    document.querySelectorAll('.cheatsheet-item').forEach(item => {
        const id = item.getAttribute('data-id');
        if (bookmarkOnly) {
            item.style.display = bookmarkedIds.has(id) ? 'block' : 'none';
        } else {
            item.style.display = 'block';
        }
    });
}

// SPA 対応: DOMContentLoaded は SPA 動的注入後には再発火しない。
// readyState が 'loading' でなければ即時実行する。
(document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', updateBookmarkStyles)
    : (updateBookmarkStyles)());
</script>

### 1.1 🔐 暗号・認証・アクセス制御
<div class="cheatsheet-item" data-id="item-rsa" style="margin-bottom: 1rem;">
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <strong>・静的 RSA 鍵交換廃止の理由</strong> <span style="font-size: 0.75rem; background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.1rem 0.4rem; border-radius: 6px;">[48字 / 45-50字制限適合]</span>
    <button class="bookmark-star-btn" data-id="item-rsa" onclick="toggleBookmark('item-rsa')" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 0.15rem 0.5rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; font-weight: 700;">☆ Bookmark</button>
  </div>
  <blockquote style="margin-top: 0.4rem; margin-bottom: 0.5rem;">「過去の通信パケットが盗聴された場合、将来秘密鍵が漏洩した際に過去の暗号通信が解読されるのを防ぐため。」</blockquote>
</div>

<div class="cheatsheet-item" data-id="item-sqli" style="margin-bottom: 1rem;">
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <strong>・バインド機構 (SQLi 防御) の目的</strong> <span style="font-size: 0.75rem; background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.1rem 0.4rem; border-radius: 6px;">[46字 / 40-50字制限適合]</span>
    <button class="bookmark-star-btn" data-id="item-sqli" onclick="toggleBookmark('item-sqli')" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 0.15rem 0.5rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; font-weight: 700;">☆ Bookmark</button>
  </div>
  <blockquote style="margin-top: 0.4rem; margin-bottom: 0.5rem;">「ユーザー入力値が SQL 構文として解釈されるのを防ぎ、データリテラルとして安全に分離・処理するため。」</blockquote>
</div>

<div class="cheatsheet-item" data-id="item-pkce" style="margin-bottom: 1rem;">
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <strong>・OAuth 2.0 PKCE 導入の目的</strong> <span style="font-size: 0.75rem; background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.1rem 0.4rem; border-radius: 6px;">[44字 / 40-50字制限適合]</span>
    <button class="bookmark-star-btn" data-id="item-pkce" onclick="toggleBookmark('item-pkce')" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 0.15rem 0.5rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; font-weight: 700;">☆ Bookmark</button>
  </div>
  <blockquote style="margin-top: 0.4rem; margin-bottom: 0.5rem;">「認可コード横取り攻撃を防ぎ、パブリッククライアントにおけるアクセストークン奪取を防止するため。」</blockquote>
</div>

### 1.2 🌐 ネットワーク & 通信境界
<div class="cheatsheet-item" data-id="item-dmarc" style="margin-bottom: 1rem;">
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <strong>・送信ドメイン認証 (SPF/DKIM/DMARC) の役割</strong> <span style="font-size: 0.75rem; background: rgba(99,102,241,0.2); color: #a5b4fc; padding: 0.1rem 0.4rem; border-radius: 6px;">[47字 / 40-50字制限適合]</span>
    <button class="bookmark-star-btn" data-id="item-dmarc" onclick="toggleBookmark('item-dmarc')" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 0.15rem 0.5rem; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; font-weight: 700;">☆ Bookmark</button>
  </div>
  <blockquote style="margin-top: 0.4rem; margin-bottom: 0.5rem;">「送信元ドメインの偽装を検知し、デジタル署名によりメール本文の改ざんの有無を検証・ブロックするため。」</blockquote>
</div>
- **プロキシログの送信元個体識別不可の理由** `[44字 / 40-50字制限適合]`:
  > 「プロキシサーバーで送信元 IP アドレスが変換され、内部端末の固有 IP アドレスが隠蔽されるため。」

### 1.3 ☁️ クラウド・IAM・ゼロトラスト
- **ゼロトラストにおける連続認証の目的** `[48字 / 45-50字制限適合]`:
  > 「ネットワークの境界内外に関わらず、すべてのアクセス要求に対して継続的な認証と最小権限の認可を行うため。」

### 1.4 🚨 インシデント対応 & ログ解析
- **マルウェア検知時の一次隔離アクション** `[46字 / 40-50字制限適合]`:
  > 「二次被害の拡大を防ぐため、該当端末を LAN および Wi-Fi ネットワークから物理的・論理的に切り離す。」

### 1.5 📜 ガバナンス・リスク管理・法規
- **情報セキュリティ監査の独立性確保** `[42字 / 40-50字制限適合]`:
  > 「被監査部門からの影響や利害関係を排除し、客観的かつ公平な立場から検証・判定を行うため。」

---

## 🗓️ 2. 直前 1 週間合格チェックリスト (Final Checklist)

- [ ] 科目 B 記述解答で「理由」を問われた際、末尾を「〜のため。」で統一できているか？
- [ ] 「目的」を問われた際、末尾を「〜を防ぐため。」「〜を確保するため。」で統一できているか？
- [ ] 問題文中に存在する固有名称（サーバー名、プロトコル名、ログ項目名）を正確に引用しているか？
- [ ] 文字数が指定の 80% 〜 100%（例: 40字指定で 32字〜40字）に収まっているか？
- [ ] [総合検索](search.md) や [対話型クイズ](quiz.md) で直前の用語・問題セルフチェックを完了したか？

---

## 関連ドキュメント

- [REQ-02 ユーザーペルソナ・シナリオ詳細定義書](../../docs/requirements/REQ-02-user_personas_and_scenarios.md)
- [対話型クイズポータル](quiz.md)
- [全用語集インデックス](glossary.md)
