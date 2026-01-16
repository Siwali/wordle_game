import type { GameStatus } from '../types/index.js'

/**
 * GameRules - Pure game rule validation functions
 *
 * This module contains all game rule validation logic.
 * All functions are pure (no side effects) for easy testing.
 */

/**
 * Check if the guess matches the target word (win condition)
 *
 * @param guess - The guessed word
 * @param targetWord - The target word
 * @returns true if the guess is correct
 */
export function checkWin(guess: string, targetWord: string): boolean {
  return guess.toUpperCase() === targetWord
}

/**
 * Check if the player has used all guesses (lose condition)
 *
 * @param guessesCount - Number of guesses made so far
 * @param maxGuesses - Maximum allowed guesses
 * @returns true if the player has lost
 */
export function checkLose(guessesCount: number, maxGuesses: number): boolean {
  return guessesCount >= maxGuesses
}

/**
 * Check if a guess is ready to submit (correct length)
 *
 * @param input - The current input string
 * @param targetLength - The required word length
 * @returns true if the input is ready for submission
 */
export function isValidGuessLength(input: string, targetLength: number): boolean {
  return input.length === targetLength
}

/**
 * Check if a character is a valid letter input
 *
 * @param char - The character to check
 * @returns true if the character is A-Z
 */
export function isLetterInput(char: string): boolean {
  return /^[A-Z]$/.test(char)
}
