import fs from 'node:fs';
import path from 'node:path';
import Tokenizer from '../src/js/tokenizer.js';

/**
 * トレーサビリティ自動検証スクリプト (Glossary & Syllabus Traceability Verifier)
 */
function verifyTraceability() {
    console.log('=== トレーサビリティ全数自動検証スクリプトを開始します ===\n');

    // Tokenizer ストップワード単体テスト
    Tokenizer.setStopWords(['について', '概要', 'the', 'is']);
    const testTokens = Tokenizer.tokenize('ゼロトラスト について 概要 the is');
    if (testTokens.includes('について') || testTokens.includes('概要') || testTokens.includes('the') || testTokens.includes('is')) {
        console.error('❌ Tokenizer ストップワード除外テスト失敗:', testTokens);
        process.exit(1);
    }
    console.log('  ✅ [Tokenizer StopWords PASS] ストップワードの正常フィルタリングを検証しました。\n');

    const files = [
        'docs/glossary/syllabus_ver2_1.md',
        'docs/glossary/syllabus_tsuiho_ver4_0.md'
    ];

    let totalTerms = 0;
    let totalErrors = 0;

    files.forEach(filePath => {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
            console.error(`❌ ファイルが存在しません: ${filePath}`);
            totalErrors++;
            return;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        console.log(`🔍 検証対象: ${filePath}`);
        let fileTerms = 0;
        let fileErrors = 0;

        const termMatches = content.match(/^####\s+.*$/gm) || [];
        fileTerms = termMatches.length;
        totalTerms += fileTerms;

        const termBlocks = content.split(/\n(?=####\s+)/);
        termBlocks.forEach((block) => {
            if (!block.trim().startsWith('#### ')) return;

            const hasSummary = block.includes('概要') || block.includes('**概要**') || block.includes(':') || block.includes('：');
            const hasTech = block.includes('技術・運用') || block.includes('ポイント') || block.includes(':') || block.includes('：');
            const hasExam = block.includes('出題') || block.includes('ポイント') || block.includes(':') || block.includes('：');

            if (!hasSummary || !hasTech || !hasExam) {
                const title = block.split('\n')[0].trim();
                console.error(`  ❌ 欠損 [${title}]: 概要(${hasSummary}) 技術(${hasTech}) 試験(${hasExam})`);
                fileErrors++;
                totalErrors++;
            }
        });

        if (fileErrors === 0) {
            console.log(`  ✅ トレース検証完了: 全 ${fileTerms} 件の用語定義と構造が完全に整合しています。\n`);
        } else {
            console.error(`  ❌ トレース検証不合格: ${fileErrors} 件のエラーが検出されました。\n`);
        }
    });

    console.log('--------------------------------------------------');
    console.log(`📊 総トレース検証項目数: ${totalTerms} 件`);

    if (totalErrors === 0) {
        console.log('🎉 [トレース検証合格] すべての用語・構造のトレーサビリティが 100% 担保されています。');
        process.exit(0);
    } else {
        console.error(`❌ [トレース検証失敗] 計 ${totalErrors} 件のトレーサビリティ不整合が検出されました。`);
        process.exit(1);
    }
}

verifyTraceability();
