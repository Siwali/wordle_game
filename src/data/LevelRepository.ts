import { STORAGE_KEY } from '../config/GameConfig.js'

/**
 * LevelRepository - Handles level persistence using localStorage
 *
 * This class encapsulates all localStorage operations for level persistence.
 * Using a repository pattern makes it easy to swap storage mechanisms in the future.
 */

export class LevelRepository {
  /**
   * Save the current level to localStorage
   */
  saveLevel(level: number): void {
    localStorage.setItem(STORAGE_KEY, level.toString())
  }

  /**
   * Load the current level from localStorage
   * Returns 1 if no saved level exists (default to starting level)
   */
  loadLevel(): number {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? parseInt(saved, 10) : 1
  }

  /**
   * Clear the saved level from storage
   * Useful for testing or resetting progress
   */
  clearLevel(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}
