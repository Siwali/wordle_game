import { GameEngine } from './core/GameEngine.js';
import { GameRenderer } from './ui/GameRenderer.js';
import { KeyboardHandler } from './ui/KeyboardHandler.js';
import { LevelRepository } from './data/LevelRepository.js';
import { DifficultyConfig } from './data/DifficultyConfig.js';
/**
 * GameManager - Orchestrates all game components
 *
 * This class is the composition root that wires together:
 * - GameEngine (pure game logic)
 * - GameRenderer (UI rendering)
 * - KeyboardHandler (input handling)
 *
 * Responsibilities:
 * - Create and initialize all components
 * - Subscribe engine state changes to renderer
 * - Handle auto-advance and retry logic
 * - Start the keyboard handler
 *
 * This is a thin glue layer - no game logic here.
 */
export class GameManager {
    constructor(wordBank, appElement) {
        // Create data layer
        const levelRepository = new LevelRepository();
        const difficultyConfig = new DifficultyConfig();
        // Create game engine
        this.engine = new GameEngine(wordBank, levelRepository, difficultyConfig);
        // Create renderer (pass event handler for button interactions)
        this.renderer = new GameRenderer(appElement, (event) => this.engine.handleInput(event));
        // Create keyboard handler
        this.keyboard = new KeyboardHandler((event) => {
            this.engine.handleInput(event);
        });
        // Subscribe to engine state changes for rendering
        this.engine.onStateChange((state) => {
            this.handleStateChange(state);
        });
        // Initial render
        this.renderer.render(this.engine.getRenderState());
    }
    /**
     * Start the game
     */
    start() {
        this.keyboard.start();
    }
    /**
     * Stop the game
     */
    stop() {
        this.keyboard.stop();
    }
    /**
     * Handle state changes from the engine
     * Triggers rendering and handles modals for win/lose events
     * @private
     */
    handleStateChange(state) {
        // Render the new state (shows inline messages for errors)
        this.renderer.render(this.engine.getRenderState());
        // Handle win - show modal instead of auto-advance
        if (state.status === 'won') {
            const nextLevel = this.engine.getCurrentLevel() + 1;
            this.renderer.showModal('🎉 Level Up!', `You advanced to Level ${nextLevel}`, () => {
                this.renderer.hideModal();
                this.engine.advanceToNextLevel();
            });
        }
        // Handle lose - show modal instead of auto-retry
        else if (state.status === 'lost') {
            const targetWord = this.engine.getCurrentTargetWord();
            this.renderer.showModal('❌ Game Over', `The word was ${targetWord}`, () => {
                this.renderer.hideModal();
                this.engine.startNewRound();
            });
        }
    }
}
