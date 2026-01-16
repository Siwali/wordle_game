import { calculateFeedback } from './FeedbackCalculator.js';
import { checkWin, checkLose } from './GameRules.js';
import { createInitialState, updateInput, addGuess, setStatus, setMessage, clearMessage } from './GameState.js';
/**
 * GameEngine - Core game logic orchestrator
 *
 * This class manages all game state and logic without any UI concerns.
 * It uses a callback pattern to notify listeners of state changes.
 *
 * Responsibilities:
 * - Manage game state (immutable)
 * - Handle user input (via GameEvent)
 * - Control game flow (win/lose/advance)
 * - Notify listeners of state changes
 *
 * The engine is pure - no DOM, no rendering, no UI concerns.
 */
export class GameEngine {
    constructor(wordBank, levelRepository, difficultyConfig) {
        this.wordBank = wordBank;
        this.levelRepository = levelRepository;
        this.difficultyConfig = difficultyConfig;
        this.stateChangeCallbacks = [];
        // Initialize level from repository
        this.level = this.levelRepository.loadLevel();
        // Initialize difficulty for current level
        const difficulty = this.difficultyConfig.getSettingsForLevel(this.level);
        this.maxGuesses = difficulty.maxGuesses;
        // Select target word for current level
        this.targetWord = this.wordBank.getWordForLevel(this.level);
        // Initialize game state
        this.state = createInitialState();
    }
    /**
     * Get the current game state (read-only)
     */
    getCurrentState() {
        return this.state;
    }
    /**
     * Get the current level number
     */
    getCurrentLevel() {
        return this.level;
    }
    /**
     * Get the current target word (for testing/debugging)
     */
    getCurrentTargetWord() {
        return this.targetWord;
    }
    /**
     * Get the maximum allowed guesses
     */
    getMaxGuesses() {
        return this.maxGuesses;
    }
    /**
     * Get complete render state (for UI layer)
     */
    getRenderState() {
        // Feedback is now pre-calculated and stored in gameState.guesses[].feedback
        // No need to recalculate - just return the state as-is
        return {
            level: this.level,
            targetWordLength: this.targetWord.length,
            targetWord: this.targetWord, // Include for game over message
            maxGuesses: this.maxGuesses,
            gameState: this.state
        };
    }
    /**
     * Register a callback to be notified of state changes
     * Multiple callbacks can be registered
     */
    onStateChange(callback) {
        this.stateChangeCallbacks.push(callback);
    }
    /**
     * Handle user input via normalized GameEvent
     */
    handleInput(event) {
        // Allow reset and restart events even when game is not 'playing'
        if (event.type !== 'reset' && event.type !== 'restart' && this.state.status !== 'playing')
            return;
        switch (event.type) {
            case 'letter':
                this.handleLetter(event.letter);
                break;
            case 'backspace':
                this.handleBackspace();
                break;
            case 'submit':
                this.handleSubmit();
                break;
            case 'reset':
                this.handleReset();
                break;
            case 'restart':
                this.handleRestart();
                break;
        }
    }
    /**
     * Start a new round with the same level (retry)
     */
    startNewRound() {
        const difficulty = this.difficultyConfig.getSettingsForLevel(this.level);
        this.targetWord = this.wordBank.getWordForLevel(this.level);
        this.maxGuesses = difficulty.maxGuesses;
        this.state = createInitialState();
        this.notifyStateChange();
    }
    /**
     * Advance to the next level and start a new round
     */
    advanceToNextLevel() {
        this.level++;
        this.levelRepository.saveLevel(this.level);
        this.startNewRound();
    }
    /**
     * Calculate feedback for a guess
     * Exposed for testing and rendering
     */
    calculateFeedbackForGuess(guess) {
        return calculateFeedback(guess, this.targetWord);
    }
    /**
     * Handle letter input
     * @private
     */
    handleLetter(letter) {
        if (this.state.currentInput.length < this.targetWord.length) {
            this.state = updateInput(this.state, this.state.currentInput + letter);
            this.notifyStateChange();
        }
    }
    /**
     * Handle backspace
     * @private
     */
    handleBackspace() {
        if (this.state.currentInput.length > 0) {
            this.state = updateInput(this.state, this.state.currentInput.slice(0, -1));
            this.notifyStateChange();
        }
    }
    /**
     * Handle guess submission
     * @private
     */
    handleSubmit() {
        const guess = this.state.currentInput;
        // Validate input is complete
        if (guess.length !== this.targetWord.length) {
            return; // Not complete, ignore
        }
        // Validate word exists in dictionary
        if (!this.wordBank.isValidWord(guess)) {
            this.state = setMessage(this.state, 'Not in word list');
            this.notifyStateChange();
            return;
        }
        // Calculate feedback ONCE at submission time
        const feedback = calculateFeedback(guess, this.targetWord);
        // Clear message and accept the guess with pre-calculated feedback
        this.state = clearMessage(this.state);
        this.state = addGuess(this.state, guess, feedback);
        console.log('[GameEngine] addGuess result:', {
            word: guess,
            feedback: feedback.map(f => `${f.letter}:${f.status}`).join(', ')
        });
        // Check win/lose conditions
        if (checkWin(guess, this.targetWord)) {
            this.state = setStatus(this.state, 'won');
            this.notifyStateChange();
        }
        else if (checkLose(this.state.guesses.length, this.maxGuesses)) {
            this.state = setStatus(this.state, 'lost');
            this.notifyStateChange();
        }
        else {
            this.notifyStateChange();
        }
    }
    /**
     * Handle reset - reset game to level 1
     * @private
     */
    handleReset() {
        // 1. Reset level to 1
        this.level = 1;
        // 2. Clear persisted level
        this.levelRepository.clearLevel();
        // 3. Reinitialize target word and difficulty
        const difficulty = this.difficultyConfig.getSettingsForLevel(this.level);
        this.targetWord = this.wordBank.getWordForLevel(this.level);
        this.maxGuesses = difficulty.maxGuesses;
        // 4. Reset game state
        this.state = createInitialState();
        // 5. Notify listeners
        this.notifyStateChange();
    }
    /**
     * Handle restart - restart the current round
     * @private
     */
    handleRestart() {
        // Simply call the existing startNewRound method!
        this.startNewRound();
    }
    /**
     * Notify all registered callbacks of state change
     * @private
     */
    notifyStateChange() {
        for (const callback of this.stateChangeCallbacks) {
            callback(this.state);
        }
    }
}
