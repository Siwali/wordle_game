/**
 * WordBank - Manages the word dictionary and word selection
 *
 * This class is responsible for:
 * - Storing the word list
 * - Selecting random words
 * - Validating words against the dictionary
 * - Getting words of specific lengths for different difficulty levels
 */

export class WordBank {
  private words: string[]

  constructor(words: string[]) {
    this.words = words.map(w => w.toUpperCase())
  }

  /**
   * Get a completely random word from the word bank
   */
  getRandomWord(): string {
    return this.words[Math.floor(Math.random() * this.words.length)]
  }

  /**
   * Get a random word of specific length based on level
   * Level 1-5: 4 letters
   * Level 6-10: 5 letters
   * Level 11+: 6 letters
   */
  getWordForLevel(level: number): string {
    const wordLength = this.getWordLengthForLevel(level)
    const wordsOfLength = this.words.filter(w => w.length === wordLength)
    return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)]
  }

  /**
   * Get all words of a specific length
   */
  getWordsOfLength(length: number): string[] {
    return this.words.filter(w => w.length === length)
  }

  /**
   * Validate that a word exists in the dictionary
   */
  isValidWord(word: string): boolean {
    return this.words.includes(word.toUpperCase())
  }

  /**
   * Determine word length based on level
   * @private
   */
  private getWordLengthForLevel(level: number): number {
    if (level <= 5) return 4
    if (level <= 10) return 5
    return 6
  }
}
