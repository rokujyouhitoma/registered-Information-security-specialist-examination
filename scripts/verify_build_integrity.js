#!/usr/bin/env node
/**
 * scripts/verify_build_integrity.js
 * 
 * QA 全自動再発防止検証スクリプト (ES Module 準拠)
 * 1. site/ 配下の全 HTML ファイルで、HTML タグ属性 (style=, onfocus= 等) の <p> タグ生露出を検知・検証
 * 2. site/ 及び各機能サブディレクトリ (quiz/, search/ 等) における静的アセット (data/*.json, js/*.js) の 100% 配備検証
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_DIR = path.resolve(__dirname, '..', 'site');

console.log('=== 🛡️ QA 全自動ビルド完全性・アセット配備アサーションを開始します ===\n');

if (!fs.existsSync(SITE_DIR)) {
    console.error('❌ エラー: site/ ディレクトリが存在しません。先に npm run build を実行してください。');
    process.exit(1);
}

let totalHtmlFiles = 0;
let rawAttributeErrors = 0;

// 1. 全 HTML ファイルの構文健全性走査
function scanDirectoryForHtml(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectoryForHtml(fullPath);
        } else if (item.endsWith('.html')) {
            totalHtmlFiles++;
            const content = fs.readFileSync(fullPath, 'utf-8');

            // <p> タグの中に style= や onfocus= などのタグ属性が生露出していないか正規表現で検査
            const rawAttrMatches = content.match(/<p>[^<]*(style=|onfocus=|onblur=|onclick=|class=|placeholder=)[^<]*<\/p>/gi);
            if (rawAttrMatches) {
                rawAttributeErrors++;
                console.error(`❌ [HTML構文汚損検知] ${path.relative(SITE_DIR, fullPath)}:`);
                rawAttrMatches.forEach(m => console.error(`   - 浮き出た壊れたタグ断片: ${m}`));
            }
        }
    }
}

scanDirectoryForHtml(SITE_DIR);

console.log(`📊 走査対象 HTML ドキュメント数: ${totalHtmlFiles} 件`);
if (rawAttributeErrors > 0) {
    console.error(`\n❌ [QA検証失敗] 計 ${rawAttributeErrors} 件の HTML ファイルで Markdown パース破損・生属性露出を検知しました。`);
    process.exit(1);
} else {
    console.log('  ✅ [合格] 全 HTML ファイルにおいてタグ属性の生露出・構文破損は 0 件です。');
}

// 2. 静的アセット配備網羅アサーション (404 根絶チェック)
console.log('\n🔍 [アセット存在証明チェック] ディレクトリ別データ・JS配信状態をチェック中...');

const requiredDirs = [
    { dir: '', name: 'ルート (site/)' },
    { dir: 'quiz', name: '演習クイズ (site/quiz/)' },
    { dir: 'search', name: '総合検索 (site/search/)' }
];

const requiredDataFiles = [
    'quiz_questions.json',
    'synonyms.json',
    'concept_config.json',
    'stopwords.json'
];

const requiredJsFiles = [
    'security_validator.js',
    'tokenizer.js',
    'vector_scorer.js',
    'fm_index_engine.js'
];

let assetMissingErrors = 0;

for (const reqDir of requiredDirs) {
    const baseDirPath = path.join(SITE_DIR, reqDir.dir);
    if (!fs.existsSync(baseDirPath)) {
        console.error(`❌ [アセット欠落] ディレクトリが見つかりません: ${reqDir.name}`);
        assetMissingErrors++;
        continue;
    }

    // data/ ファイルチェック
    for (const f of requiredDataFiles) {
        const filePath = path.join(baseDirPath, 'data', f);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ [データ404リスク] ${reqDir.name} 内に data/${f} が存在しません。`);
            assetMissingErrors++;
        }
    }

    // js/ ファイルチェック
    for (const f of requiredJsFiles) {
        const filePath = path.join(baseDirPath, 'js', f);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ [JS 404リスク] ${reqDir.name} 内に js/${f} が存在しません。`);
            assetMissingErrors++;
        }
    }
}

// search_index.json ルート & search ディレクトリ複製チェック
if (!fs.existsSync(path.join(SITE_DIR, 'search_index.json'))) {
    console.error('❌ [検索インデックス404] site/search_index.json が存在しません。');
    assetMissingErrors++;
}
if (!fs.existsSync(path.join(SITE_DIR, 'search', 'search_index.json'))) {
    console.error('❌ [検索インデックス404] site/search/search_index.json が存在しません。');
    assetMissingErrors++;
}

// 3. Service Worker プリキャッシュアセットの 100% 配備検証
console.log('\n⚡ [PWA SW プリキャッシュ検証] sw.js で指定された全アセットの実在状態をチェック中...');
const swPath = path.join(__dirname, '..', 'src', 'assets', 'sw.js');
if (fs.existsSync(swPath)) {
    const swContent = fs.readFileSync(swPath, 'utf-8');
    const match = swContent.match(/const PRECACHE_ASSETS = \[\s*([\s\S]*?)\s*\];/);
    if (match) {
        const rawList = match[1];
        const assets = rawList.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        for (const asset of assets) {
            let targetPath = path.join(SITE_DIR, asset);
            if (asset === './' || asset === '.') {
                targetPath = SITE_DIR;
            }
            if (!fs.existsSync(targetPath)) {
                console.error(`❌ [SW プリキャッシュ404] sw.js 内のプリキャッシュ対象 '${asset}' が site/ 配下に存在しません。`);
                assetMissingErrors++;
            }
        }
    }
}

// 4. 全文検索インデックス主要キーワード実在・ヒット精度アサーション
console.log('\n🔍 [全文検索インデックスアサーション] 主要キーワード(ゼロトラスト, PKI, TLS 1.3等)の検索ヒット精度を検証中...');
const searchIndexPath = path.join(SITE_DIR, 'search_index.json');
if (fs.existsSync(searchIndexPath)) {
    const searchIndexContent = JSON.parse(fs.readFileSync(searchIndexPath, 'utf-8'));
    const docs = searchIndexContent.docs || [];
    
    // 主要キーワードの検査
    const testKeywords = ['ゼロトラスト', 'PKI', 'TLS 1.3', 'OAuth', 'DMARC'];
    for (const kw of testKeywords) {
        const hits = docs.filter(d => {
            const name = (d.name || '').toLowerCase();
            const summary = (d.summary || '').toLowerCase();
            const url = (d.url || '').toLowerCase();
            const kwLower = kw.toLowerCase();
            return name.includes(kwLower) || summary.includes(kwLower) || url.includes(kwLower);
        });

        if (hits.length === 0) {
            console.error(`❌ [検索精度エラー] キーワード '${kw}' に一致するドキュメントが search_index.json 内に 0 件です。`);
            assetMissingErrors++;
        } else {
            console.log(`  ・[ヒット合格] 『${kw}』 -> ${hits.length} 件検出 (例: ${hits[0].name} [URL: ${hits[0].url}])`);
        }
    }

    // 検索インデックス内 URL の完全性・実在性・アンカー構文正常性アサーション
    let checkedUrlCount = 0;
    for (const doc of docs) {
        const rawUrl = doc.url || '';
        if (rawUrl.includes('.html#') && rawUrl.endsWith('.html')) {
            console.error(`❌ [検索リンク404構文エラー] 不正な二重拡張子リンクを検知: ${rawUrl}`);
            assetMissingErrors++;
        }
        
        let baseUrl = rawUrl.split('#')[0];
        if (baseUrl.startsWith('./')) baseUrl = baseUrl.substring(2);
        const targetHtmlPath = path.join(SITE_DIR, baseUrl);
        if (!fs.existsSync(targetHtmlPath)) {
            console.error(`❌ [検索リンク実在404エラー] 検索インデックスの参照先 HTML が存在しません: ${rawUrl} -> ${targetHtmlPath}`);
            assetMissingErrors++;
        }
        checkedUrlCount++;
    }
    console.log(`  ✅ [検索リンク404アサーション合格] 計 ${checkedUrlCount} 件の検索対象 URL がすべて実在し、構文に問題がないことを検証しました。`);
}

if (assetMissingErrors > 0) {
    console.error(`\n❌ [QAアセット検証失敗] 計 ${assetMissingErrors} 件の配置・検索アサーションエラーを検出しました。`);
    process.exit(1);
} else {
    console.log('  ✅ [合格] 全機能ディレクトリ、sw.js プリキャッシュ、および全文検索インデックス精度が 100% 配備・検証されています。');
}

console.log('\n🎉 [QA検証完了] すべての再発防止品質アサーションに 100% 合格しました！');
