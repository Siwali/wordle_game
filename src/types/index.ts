/**
 * Core type definitions for the Progressive Wordle Game
 *
 * This file contains all shared types used across the application.
 * Types are organized by domain: game state, feedback, difficulty, and events.
 */

/**
 * Possible states for a single letter in Wordle feedback
 */
export type LetterStatus = 'correct' | 'present' | 'absent'

/**
 * Feedback for a single letter in a guess
 */
export type Feedback = {
  letter: string
  status: LetterStatus
}

/**
 * Overall game status
 */
export type GameStatus = 'playing' | 'won' | 'lost'

/**
 * A single guess with its pre-calculated feedback
 * Feedback is calculated once at submission and never changes
 */
export type GuessEntry = {
  word: string
  feedback: Feedback[]
}

/**
 * Complete game state
 * This is the single source of truth for the current game state
 */
export type GameState = {
  guesses: GuessEntry[]  // Changed from string[] to GuessEntry[]
  currentInput: string
  status: GameStatus
  message: string
}

/**
 * Difficulty settings for a given level
 */
export type DifficultySettings = {
  wordLength: number
  maxGuesses: number
}

/**
 * Normalized user input event
 * All user input (keyboard, virtual keyboard, etc.) is converted to GameEvent
 */
export type GameEvent =
  | { type: 'letter'; letter: string }
  | { type: 'backspace' }
  | { type: 'submit' }
  | { type: 'reset' }  // Reset game to level 1
  | { type: 'restart' }  // Restart current round

/**
 * Complete state needed for rendering
 * This is what the UI layer receives from the game engine
 */
export type RenderState = {
  level: number
  targetWordLength: number
  targetWord: string  // Included for game over message
  maxGuesses: number
  gameState: GameState
  // Note: No longer includes feedback - it's now in gameState.guesses[].feedback
}
