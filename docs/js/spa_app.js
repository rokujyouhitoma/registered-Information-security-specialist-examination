/**
 * SPA Application Entry Point
 * Integrates Router, SceneDirector, Publisher, and SecurityValidator
 */
"use strict";

class SPAApp {
    constructor() {
        /**
         * @public
         * @type {!Router}
         */
        this.router = new Router("welcome");

        /**
         * @public
         * @type {!SceneDirector}
         */
        this.director = new SceneDirector();

        /**
         * @public
         * @type {!Publisher}
         */
        this.publisher = new Publisher(new AppEventTarget());

        /**
         * @public
         * @type {?Object}
         */
        this.contentStore = null;
    }

    /**
     * Initialize SPA app
     * @return {!Promise<void>}
     */
    async init() {
        try {
            const resp = await fetch("data/content_store.json");
            const data = await resp.json();
            this.contentStore = /** @type {!Object} */ (data);
        } catch (e) {
            console.warn("Failed to load content_store.json:", e);
        }

        this.setupRoutes();
        this.router.listen();
    }

    /**
     * Setup Hash routes
     */
    setupRoutes() {
        this.router.register("", () => this.renderHome());
        this.router.register("welcome", () => this.renderHome());
        this.router.register("search", (params) => this.renderSearch(params));
        this.router.register("quiz", () => this.renderQuiz());
        this.router.register("glossary", () => this.renderGlossary());
        this.router.register("cheatsheet", () => this.renderCheatsheet());
    }

    /**
     * Render Home View
     */
    renderHome() {
        const view = document.getElementById("spa-view-container");
        if (view) {
            view.innerHTML = `<div style="max-width: 800px; margin: 2rem 0; padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(99, 102, 241, 0.4); border-radius: 16px;">
                <h2 style="color: #818cf8; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span>🏠 情報処理安全確保支援士 SPA ポータル</span>
                    <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); padding: 0.15rem 0.5rem; border-radius: 10px;">Phase 1 Ready</span>
                </h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">再ロードなしの高速無縫子（シームレス）ナビゲーションが起動しました。全 27+ ドキュメントのデータ駆動表示に対応しています。</p>
            </div>`;
        }
    }

    /**
     * Render Search View
     * @param {?Object} params
     */
    renderSearch(params) {
        const view = document.getElementById("spa-view-container");
        if (view) {
            view.innerHTML = `<div style="max-width: 800px; margin: 2rem 0; padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 16px;">
                <h2 style="color: #34d399;">🔍 全文検索 (SPA Mode)</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">高速ハイブリッド検索エンジンと連携したリアルタイムビューです。</p>
            </div>`;
        }
    }

    /**
     * Render Quiz View
     */
    renderQuiz() {
        const view = document.getElementById("spa-view-container");
        if (view) {
            view.innerHTML = `<div style="max-width: 800px; margin: 2rem 0; padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(253, 224, 71, 0.4); border-radius: 16px;">
                <h2 style="color: #fde047;">📚 演習クイズ (SPA Mode)</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">データ駆動型 4 択演習クイズです。</p>
            </div>`;
        }
    }

    /**
     * Render Glossary View
     */
    renderGlossary() {
        const view = document.getElementById("spa-view-container");
        if (view) {
            view.innerHTML = `<div style="max-width: 800px; margin: 2rem 0; padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(244, 114, 182, 0.4); border-radius: 16px;">
                <h2 style="color: #f472b6;">🔤 用語辞書 (SPA Mode)</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">IPA シラバス Ver.2.1 必須用語解説データベースです。</p>
            </div>`;
        }
    }

    /**
     * Render Cheatsheet View
     */
    renderCheatsheet() {
        const view = document.getElementById("spa-view-container");
        if (view) {
            view.innerHTML = `<div style="max-width: 800px; margin: 2rem 0; padding: 1.5rem; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(165, 180, 252, 0.4); border-radius: 16px;">
                <h2 style="color: #a5b4fc;">⚡ 虎の巻 (SPA Mode)</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">科目 B 30〜50 字記述キーフレーズ集です。</p>
            </div>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window['spaApp'] = new SPAApp();
    /** @type {!SPAApp} */ (window['spaApp']).init();
});
