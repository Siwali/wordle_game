import type { GuessEntry, GameEvent, LetterStatus } from '../types/index.js'

/**
 * KeyboardUI - Creates and manages the on-screen keyboard
 *
 * This module is responsible only for:
 * - Rendering the QWERTY keyboard layout
 * - Deriving letter status from guesses
 * - Emitting GameEvents on key clicks
 */

// Keyboard layout configuration
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

/**
 * Derive letter status map from all guesses
 * Returns a Map where key=letter, value=strongest status found
 *
 * Priority: correct > present > absent > undefined
 */
function deriveLetterStatus(guesses: GuessEntry[]): Map<string, LetterStatus> {
  const statusMap = new Map<string, LetterStatus>()

  for (const guess of guesses) {
    for (const feedback of guess.feedback) {
      const letter = feedback.letter
      const status = feedback.status

      // Only upgrade status (never downgrade)
      const currentStatus = statusMap.get(letter)
      if (!currentStatus || shouldUpgradeStatus(currentStatus, status)) {
        statusMap.set(letter, status)
      }
    }
  }

  return statusMap
}

/**
 * Determine if new status should replace current status
 * Priority: correct > present > absent
 */
function shouldUpgradeStatus(current: LetterStatus, newStatus: LetterStatus): boolean {
  if (current === 'correct') return false  // Already highest
  if (current === 'present') return newStatus === 'correct'
  if (current === 'absent') return newStatus === 'correct' || newStatus === 'present'
  return true
}

/**
 * Get status class name for a letter
 */
function getStatusClassName(letter: string, statusMap: Map<string, LetterStatus>): string {
  const status = statusMap.get(letter)
  return status ? status : ''  // Returns '', 'correct', 'present', or 'absent'
}

/**
 * Create the keyboard element
 * @param guesses - Array of completed guesses with feedback
 * @param onEvent - Callback to emit GameEvents
 * @returns HTMLElement - The keyboard container
 */
export function createKeyboard(
  guesses: GuessEntry[],
  onEvent: (event: GameEvent) => void
): HTMLElement {
  // Derive current letter status from all guesses
  const statusMap = deriveLetterStatus(guesses)

  // Create keyboard container
  const keyboard = document.createElement('div')
  keyboard.className = 'keyboard'

  // Create each row
  for (const row of KEYBOARD_ROWS) {
    const rowElement = createKeyboardRow(row, statusMap, onEvent)
    keyboard.appendChild(rowElement)
  }

  return keyboard
}

/**
 * Create a single keyboard row
 */
function createKeyboardRow(
  keys: string[],
  statusMap: Map<string, LetterStatus>,
  onEvent: (event: GameEvent) => void
): HTMLElement {
  const row = document.createElement('div')
  row.className = 'keyboard-row'

  for (const key of keys) {
    const keyElement = createKey(key, statusMap, onEvent)
    row.appendChild(keyElement)
  }

  return row
}

/**
 * Create a single key element
 */
function createKey(
  key: string,
  statusMap: Map<string, LetterStatus>,
  onEvent: (event: GameEvent) => void
): HTMLElement {
  const button = document.createElement('button')
  button.className = 'key'

  // Add status class if letter has known status
  if (key.length === 1) {  // Only letters, not ENTER/BACKSPACE
    const statusClass = getStatusClassName(key, statusMap)
    if (statusClass) {
      button.classList.add(statusClass)
    }
  }

  // Set key display text
  if (key === 'BACKSPACE') {
    button.textContent = '⌫'
    button.setAttribute('aria-label', 'Backspace')
  } else {
    button.textContent = key
  }

  // Handle click events
  button.addEventListener('click', () => {
    if (key === 'ENTER') {
      onEvent({ type: 'submit' })
    } else if (key === 'BACKSPACE') {
      onEvent({ type: 'backspace' })
    } else {
      onEvent({ type: 'letter', letter: key })
    }
  })

  return button
}
