import type { Feedback } from '../types/index.js'

/**
 * Calculate Wordle-style feedback for a guess
 *
 * This function implements the core Wordle feedback algorithm:
 * - First pass: Mark letters in correct positions (green/correct)
 * - Second pass: Mark letters present but in wrong positions (yellow/present)
 * - Letters not in word: gray/absent
 *
 * Handles duplicates correctly by marking exact matches first,
 * then checking remaining letters against remaining target positions.
 *
 * @param guess - The guessed word
 * @param targetWord - The target word to guess
 * @returns Array of feedback for each letter in the guess
 */
export function calculateFeedback(guess: string, targetWord: string): Feedback[] {
  const guessUpper = guess.toUpperCase()
  const target = targetWord

  // Create working copies for mutation tracking
  const targetLetters = target.split('')
  const originalGuessLetters = guessUpper.split('')

  // Initialize feedback array with all letters in guess order (default 'absent')
  // Uses originalGuessLetters to capture letter values before any mutations
  const feedback: Feedback[] = originalGuessLetters.map(letter => ({ letter, status: 'absent' as const }))

  // First pass: mark correct positions (green)
  for (let i = 0; i < originalGuessLetters.length; i++) {
    if (originalGuessLetters[i] === targetLetters[i]) {
      feedback[i] = { letter: originalGuessLetters[i], status: 'correct' }
      targetLetters[i] = '' // Mark as used
      originalGuessLetters[i] = '' // Mark as processed
    }
  }

  // Second pass: mark present letters (yellow)
  for (let i = 0; i < originalGuessLetters.length; i++) {
    if (originalGuessLetters[i] === '') continue // Already marked as correct

    const targetIndex = targetLetters.indexOf(originalGuessLetters[i])
    if (targetIndex !== -1) {
      feedback[i] = { letter: originalGuessLetters[i], status: 'present' }
      targetLetters[targetIndex] = '' // Mark as used
    }
  }

  console.log('[FeedbackCalculator] Output:', {
    guess,
    targetWord,
    feedback: feedback.map(f => `${f.letter}:${f.status}`).join(', ')
  })

  return feedback
}
