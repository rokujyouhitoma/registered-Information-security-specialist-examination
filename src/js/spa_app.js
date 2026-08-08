/**
 * SPA Application Entry Point
 * Integrates Router, SceneDirector, Publisher, SecurityValidator, and Seamless Link Interception
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

        /**
         * @private
         * @type {!Map<string, !Object>}
         */
        this.docMap = new Map();

        /**
         * Relative root path prefix
         * @public
         * @type {string}
         */
        this.relRoot = "./";
    }

    /**
     * Initialize SPA app
     * @return {!Promise<void>}
     */
    async init() {
        // Detect relative root depth from script tag
        const scripts = document.querySelectorAll("script[src*='spa_app.js']");
        if (scripts.length > 0) {
            const src = scripts[0].getAttribute("src") || "";
            if (src.includes("js/spa_app.js")) {
                this.relRoot = src.split("js/spa_app.js")[0] || "./";
            }
        }

        try {
            const resp = await fetch(this.relRoot + "data/content_store.json");
            if (resp.ok) {
                const data = /** @type {?Object} */ (await resp.json());
                this.contentStore = data;
                if (data && Array.isArray(data['documents'])) {
                    /** @type {!Array<!Object>} */ (data['documents']).forEach(doc => {
                        this.docMap.set(String(doc['id']), doc);
                        if (doc['rel_path']) {
                            const cleanPath = String(doc['rel_path']).replace(/\.md$/, ".html");
                            this.docMap.set(cleanPath, doc);
                            this.docMap.set("./" + cleanPath, doc);
                        }
                    });
                }
            }
        } catch (e) {
            console.warn("SPAApp: Failed to load content_store.json:", e);
        }

        this.setupRoutes();
        this.setupLinkInterception();
        this.router.listen();
    }

    /**
     * Global Link Click Interceptor for Seamless SPA Navigation
     */
    setupLinkInterception() {
        document.body.addEventListener("click", (e) => {
            const target = /** @type {?HTMLElement} */ (e.target);
            if (!target) return;
            const anchor = target.closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
                return; // External or non-http links
            }

            let cleanUrl = href;
            let hashPart = "";
            if (cleanUrl.includes("#")) {
                const parts = cleanUrl.split("#");
                cleanUrl = parts[0];
                hashPart = parts[1];
            }

            if (!cleanUrl && hashPart) {
                // Anchor navigation on same page
                return;
            }

            if (cleanUrl.endsWith(".html") || cleanUrl === "" || cleanUrl === "./" || cleanUrl === "index.html") {
                e.preventDefault();

                let routeName = cleanUrl.replace(/^\.\//, "").replace(/\.html$/, "");
                if (routeName === "" || routeName === "index") routeName = "welcome";

                const navHash = "#/" + routeName + (hashPart ? `?anchor=${hashPart}` : "");
                window.location.hash = navHash;
                this.loadPageContent(routeName, cleanUrl, hashPart);
            }
        });
    }

    /**
     * Setup Client-side Hash routes
     */
    setupRoutes() {
        this.router.register("", () => this.loadPageContent("welcome", "index.html"));
        this.router.register("welcome", () => this.loadPageContent("welcome", "index.html"));
        this.router.register("index", () => this.loadPageContent("welcome", "index.html"));
        this.router.register("search", (params) => this.loadPageContent("search", "search.html", params ? params.anchor : ""));
        this.router.register("quiz", () => this.loadPageContent("quiz", "quiz.html"));
        this.router.register("glossary", () => this.loadPageContent("glossary", "glossary.html"));
        this.router.register("cheatsheet", () => this.loadPageContent("cheatsheet", "exam_cheatsheet.html"));
        this.router.register("syllabus", () => this.loadPageContent("syllabus", "syllabus.html"));
    }

    /**
     * Resolve target fetch URL
     * @private
     * @param {string} rawUrl
     * @return {string}
     */
    _resolveFetchUrl(rawUrl) {
        let targetUrl = rawUrl || "index.html";
        if (targetUrl === "welcome" || targetUrl === "") targetUrl = "index.html";
        if (!targetUrl.endsWith(".html")) {
            targetUrl += ".html";
        }
        return this.relRoot + targetUrl.replace(/^\.\//, "");
    }

    /**
     * Render fetched HTML text or fallback
     * @private
     * @param {string} text
     * @param {string} routeName
     * @param {!HTMLElement} container
     */
    _renderFetchedHtml(text, routeName, container) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const newArticle = /** @type {?HTMLElement} */ (doc.querySelector(".doc-content"));
        if (newArticle) {
            container.innerHTML = newArticle.innerHTML;
            this.executeEmbeddedScripts(container);
        } else {
            this.renderFallbackFromStore(routeName, container);
        }
    }

    /**
     * Handle anchor scrolling after render
     * @private
     * @param {string=} anchorId
     */
    _handleAnchorScroll(anchorId) {
        if (anchorId) {
            const el = document.getElementById(anchorId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * Dynamic Page Content Loading & Render Pipeline
     * @param {string} routeName
     * @param {string} rawUrl
     * @param {string=} anchorId
     */
    async loadPageContent(routeName, rawUrl, anchorId) {
        const rawContainer = document.getElementById("spa-view-container");
        if (!rawContainer) return;
        const container = /** @type {!HTMLElement} */ (rawContainer);

        container.style.opacity = "0.4";
        container.style.transition = "opacity 0.15s ease-in-out";

        try {
            const fetchUrl = this._resolveFetchUrl(rawUrl);
            const resp = await fetch(fetchUrl);
            if (resp.ok) {
                const text = await resp.text();
                this._renderFetchedHtml(text, routeName, container);
            } else {
                this.renderFallbackFromStore(routeName, container);
            }
        } catch (e) {
            console.warn("SPAApp: Failed to fetch page content, rendering store fallback:", e);
            this.renderFallbackFromStore(routeName, container);
        }

        container.style.opacity = "1.0";
        this._handleAnchorScroll(anchorId);
        this.updateNavHighlight(routeName);
    }

    /**
     * Re-execute embedded scripts inside dynamically inserted HTML
     * @param {!HTMLElement} container
     */
    executeEmbeddedScripts(container) {
        const scripts = container.querySelectorAll("script");
        const loadedScripts = Array.from(document.querySelectorAll("script")).map(sc => {
            const src = sc.getAttribute("src") || "";
            return src.split("/").pop();
        }).filter(Boolean);

        scripts.forEach(s => {
            const srcAttr = s.getAttribute("src");
            if (srcAttr) {
                const filename = srcAttr.split("/").pop();
                if (filename && loadedScripts.includes(filename)) {
                    return;
                }
                const newScript = document.createElement("script");
                newScript.src = srcAttr;
                if (document.body) {
                    document.body.appendChild(newScript);
                }
            } else {
                let code = s.textContent.trim();
                if (!code) return;

                // Replace top-level let and const declarations with var
                // to prevent SyntaxError: Identifier 'xxx' has already been declared
                // when re-evaluating inline scripts during SPA route changes.
                code = code.replace(/^(\s*)(let|const)\s+([a-zA-Z0-9_$]+)/gm, "$1var $3");

                try {
                    const newScript = document.createElement("script");
                    newScript.textContent = code;
                    if (document.body) {
                        document.body.appendChild(newScript).parentNode.removeChild(newScript);
                    }
                } catch (err) {
                    console.warn("SPAApp: Inline script execution warning:", err);
                }
            }
        });
    }

    /**
     * Fallback rendering using content_store.json
     * @param {string} routeName
     * @param {!HTMLElement} container
     */
    renderFallbackFromStore(routeName, container) {
        const doc = this.docMap.get(routeName);
        if (doc) {
            const docId = String(doc['id'] || '');
            const docTitle = String(doc['title'] || '');
            const docSnippet = String(doc['snippet'] || '');
            const docBody = String(doc['body_md'] || '');
            container.innerHTML = `<h1 id="${docId}">${docTitle}</h1><p style="color:#94a3b8;">${docSnippet}</p><pre style="white-space:pre-wrap; background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px;"><code>${docBody}</code></pre>`;
        } else {
            container.innerHTML = `<div style="padding:2rem; text-align:center;"><h2>404 - ページが見つかりません</h2><p style="color:#94a3b8;">指定されたドキュメント/ビューは存在しないか、読み込みに失敗しました。</p></div>`;
        }
    }

    /**
     * Update top navigation bar button highlights
     * @param {string} routeName
     */
    updateNavHighlight(routeName) {
        document.querySelectorAll(".nav-btn").forEach(btn => {
            const href = btn.getAttribute("href") || "";
            if (href.includes(routeName) || (routeName === "welcome" && href.includes("index"))) {
                /** @type {!HTMLElement} */ (btn).style.color = "#818cf8";
                /** @type {!HTMLElement} */ (btn).style.fontWeight = "700";
            } else {
                /** @type {!HTMLElement} */ (btn).style.color = "var(--text-secondary)";
                /** @type {!HTMLElement} */ (btn).style.fontWeight = "500";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window['spaApp'] = new SPAApp();
    /** @type {!SPAApp} */ (window['spaApp']).init();
});
