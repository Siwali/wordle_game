import type { Feedback } from '../types/index.js'

/**
 * UIComponents - Helper functions for creating DOM elements
 *
 * This module provides pure functions for creating DOM elements.
 * All functions return DOM elements that can be composed together.
 */

/**
 * Create the header element with title and level display
 */
export function createHeader(level: number): HTMLElement {
  const header = document.createElement('div')
  header.className = 'header'

  const title = document.createElement('h1')
  title.textContent = 'WORDLE'
  header.appendChild(title)

  const levelDisplay = document.createElement('div')
  levelDisplay.className = 'level-display'
  levelDisplay.textContent = `Level ${level}`
  header.appendChild(levelDisplay)

  return header
}

/**
 * Create the reset button element
 */
export function createResetButton(onClick: () => void): HTMLElement {
  const button = document.createElement('button')
  button.className = 'btn reset-button'
  button.textContent = 'Start New Game'
  button.type = 'button'
  button.addEventListener('click', onClick)
  return button
}

/**
 * Create the restart button element
 */
export function createRestartButton(onClick: () => void): HTMLElement {
  const button = document.createElement('button')
  button.className = 'btn restart-button'
  button.textContent = 'Restart Round'
  button.type = 'button'
  button.addEventListener('click', onClick)
  return button
}

/**
 * Create the message element for displaying game state messages
 */
export function createMessage(message: string, status: string): HTMLElement {
  const messageDiv = document.createElement('div')
  messageDiv.className = 'message'

  if (message) {
    messageDiv.textContent = message
    if (status === 'error') {
      messageDiv.classList.add('error')
    } else if (status === 'won') {
      messageDiv.classList.add('win')
    } else if (status === 'lost') {
      messageDiv.classList.add('lose')
    }
  }

  return messageDiv
}

/**
 * Create the game board element
 */
export function createBoard(): HTMLElement {
  const board = document.createElement('div')
  board.className = 'board'
  return board
}

/**
 * Create a row element
 */
export function createRow(): HTMLElement {
  const row = document.createElement('div')
  row.className = 'row'
  return row
}

/**
 * Create a tile element with optional letter and status
 */
export function createTile(letter?: string, status?: 'correct' | 'present' | 'absent' | 'filled'): HTMLElement {
  const tile = document.createElement('div')
  tile.className = 'tile'

  if (letter !== undefined) {
    tile.textContent = letter
  }

  if (status !== undefined) {
    tile.classList.add(status)
  }

  return tile
}

/**
 * Create a row with guess feedback
 */
export function createGuessRow(guess: string, feedback: Feedback[]): HTMLElement {
  const row = createRow()

  console.log('[UIComponents] createGuessRow called with:', {
    guess,
    feedbackArray: feedback.map(f => `${f.letter}:${f.status}`).join(', ')
  })

  for (let i = 0; i < guess.length; i++) {
    console.log(`[UIComponents] Creating tile ${i}:`, {
      letterFromGuess: guess[i],
      letterFromFeedback: feedback[i].letter,
      status: feedback[i].status
    })
    const tile = createTile(guess[i], feedback[i].status)
    row.appendChild(tile)
  }

  return row
}

/**
 * Create a row for current input
 */
export function createInputRow(currentInput: string, targetWordLength: number): HTMLElement {
  const row = createRow()

  for (let j = 0; j < targetWordLength; j++) {
    const tile = createTile()

    if (j < currentInput.length) {
      tile.textContent = currentInput[j]
      tile.classList.add('filled')
    }

    row.appendChild(tile)
  }

  return row
}

/**
 * Create an empty row
 */
export function createEmptyRow(targetWordLength: number): HTMLElement {
  const row = createRow()

  for (let j = 0; j < targetWordLength; j++) {
    row.appendChild(createTile())
  }

  return row
}
