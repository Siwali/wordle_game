import type { DifficultySettings } from '../types/index.js'

/**
 * DifficultyConfig - Manages difficulty scaling based on level
 *
 * This class determines the difficulty settings (word length and max guesses)
 * for any given level.
 *
 * Difficulty progression:
 * - Levels 1-5: 4-letter words, 6 guesses
 * - Levels 6-10: 5-letter words, 6 guesses
 * - Levels 11+: 6-letter words, 5 guesses
 */

export class DifficultyConfig {
  /**
   * Get difficulty settings for a specific level
   */
  getSettingsForLevel(level: number): DifficultySettings {
    if (level <= 5) {
      return { wordLength: 4, maxGuesses: 6 }
    } else if (level <= 10) {
      return { wordLength: 5, maxGuesses: 6 }
    } else {
      return { wordLength: 6, maxGuesses: 5 }
    }
  }

  /**
   * Get the word length for a specific level
   */
  getWordLength(level: number): number {
    return this.getSettingsForLevel(level).wordLength
  }

  /**
   * Get the max guesses for a specific level
   */
  getMaxGuesses(level: number): number {
    return this.getSettingsForLevel(level).maxGuesses
  }
}
