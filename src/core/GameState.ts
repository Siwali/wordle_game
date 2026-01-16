import type { GameState, GameStatus, GuessEntry, Feedback } from '../types/index.js'

/**
 * GameState - Immutable state management
 *
 * This module provides factory functions for creating and updating game state.
 * All functions return new state objects (immutability) for easier testing and reasoning.
 */

/**
 * Create an initial game state
 *
 * @returns A fresh game state ready for a new round
 */
export function createInitialState(): GameState {
  return {
    guesses: [],
    currentInput: '',
    status: 'playing',
    message: ''
  }
}

/**
 * Update the current input string
 *
 * @param state - The current game state
 * @param input - The new input string
 * @returns A new game state with updated input
 */
export function updateInput(state: GameState, input: string): GameState {
  return {
    ...state,
    currentInput: input
  }
}

/**
 * Add a guess with pre-calculated feedback to the guesses array and clear current input
 *
 * @param state - The current game state
 * @param word - The guessed word
 * @param feedback - Pre-calculated feedback for the guess
 * @returns A new game state with the guess added
 */
export function addGuess(state: GameState, word: string, feedback: Feedback[]): GameState {
  const entry: GuessEntry = { word, feedback }
  return {
    ...state,
    guesses: [...state.guesses, entry],
    currentInput: '',
    message: ''
  }
}

/**
 * Set the game status
 *
 * @param state - The current game state
 * @param status - The new status
 * @returns A new game state with updated status
 */
export function setStatus(state: GameState, status: GameStatus): GameState {
  return {
    ...state,
    status
  }
}

/**
 * Set the message (e.g., for errors or win/lose messages)
 *
 * @param state - The current game state
 * @param message - The message to display
 * @returns A new game state with updated message
 */
export function setMessage(state: GameState, message: string): GameState {
  return {
    ...state,
    message
  }
}

/**
 * Clear the message
 *
 * @param state - The current game state
 * @returns A new game state with message cleared
 */
export function clearMessage(state: GameState): GameState {
  return {
    ...state,
    message: ''
  }
}
