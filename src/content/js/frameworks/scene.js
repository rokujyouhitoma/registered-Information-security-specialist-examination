/**
 * Generic Scene Transition Framework
 */
"use strict";

/**
 * Base Scene Class
 */
class Scene {
    /**
     * Enter the scene.
     * @param {*=} data Optional context data passed to the scene.
     */
    enter(data) {
        throw new Error("enter() must be implemented");
    }

    /**
     * Exit the scene.
     */
    exit() {
        throw new Error("exit() must be implemented");
    }
}

/**
 * SceneDirector manages the transitions between scenes
 */
class SceneDirector {
    constructor() {
        /**
         * Registered Scenes
         * @private
         * @type {!Object<string, !Scene>}
         */
        this.scenes = {};

        /**
         * Current Active Scene Name
         * @public
         * @type {?string}
         */
        this.currentSceneName = null;

        /**
         * Transition Guard Flag
         * @public
         * @type {boolean}
         */
        this.isTransitioning = false;
    }

    /**
     * Register a scene.
     * @param {string} sceneName
     * @param {!Scene} sceneInstance
     */
    register(sceneName, sceneInstance) {
        this.scenes[sceneName] = sceneInstance;
    }

    /**
     * Transition to the specified scene.
     * @param {string} sceneName Name of the target scene.
     * @param {*=} data Data payload to pass to the scene enter lifecycle.
     */
    transitionTo(sceneName, data) {
        if (this.isTransitioning) {
            return;
        }

        const nextScene = this.scenes[sceneName];
        if (!nextScene) {
            throw new Error(`Scene not found: ${sceneName}`);
        }

        this.isTransitioning = true;

        try {
            if (this.currentSceneName) {
                const currentScene = this.scenes[this.currentSceneName];
                currentScene.exit();
            }

            this.currentSceneName = sceneName;
            nextScene.enter(data);
        } finally {
            this.isTransitioning = false;
        }
    }
}
