import type { RenderState, Feedback } from '../types/index.js'
import * as UI from './UIComponents.js'
import { createKeyboard } from './KeyboardUI.js'
import { createModal, type ModalState } from './Modal.js'

/**
 * GameRenderer - Renders game state to the DOM
 *
 * This class is responsible for all DOM manipulation and rendering.
 * It receives a RenderState and updates the DOM to match.
 *
 * The renderer is pure - it doesn't contain any game logic,
 * only rendering logic.
 */
export class GameRenderer {
  private modalState: ModalState | null = null

  constructor(
    private container: HTMLElement,
    private onEvent: (event: import('../types/index.js').GameEvent) => void
  ) {}

  /**
   * Show a modal dialog
   */
  showModal(
    title: string,
    message: string,
    onConfirm: () => void
  ): void {
    this.modalState = {
      visible: true,
      title,
      message,
      onConfirm
    }
    this.renderModal()
  }

  /**
   * Hide the modal dialog
   */
  hideModal(): void {
    this.modalState = null
    this.renderModal()
  }

  /**
   * Render the modal (if visible)
   * @private
   */
  private renderModal(): void {
    // Remove existing modal
    const existingModal = this.container.querySelector('.modal-overlay')
    if (existingModal) {
      existingModal.remove()
    }

    // Create new modal if visible
    if (this.modalState) {
      const modal = createModal(this.modalState)
      this.container.appendChild(modal)
    }
  }

  /**
   * Render the complete game state to the DOM
   */
  render(state: RenderState): void {
    // Clear existing content
    this.container.innerHTML = ''

    // Create and append header with both buttons
    const header = UI.createHeader(state.level)

    // Create button container
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'button-container'

    const restartButton = UI.createRestartButton(() => {
      this.onEvent({ type: 'restart' })
    })
    const resetButton = UI.createResetButton(() => {
      this.onEvent({ type: 'reset' })
    })

    buttonContainer.appendChild(restartButton)
    buttonContainer.appendChild(resetButton)
    header.appendChild(buttonContainer)

    this.container.appendChild(header)

    // Create and append message area
    const messageDiv = this.createMessageElement(state.gameState, state.targetWord)
    this.container.appendChild(messageDiv)

    // Create and append board
    const board = UI.createBoard()
    this.renderBoard(board, state)
    this.container.appendChild(board)

    // Create and append keyboard
    const keyboard = createKeyboard(state.gameState.guesses, (event) => {
      this.onEvent(event)
    })
    this.container.appendChild(keyboard)
  }

  /**
   * Clear the container
   */
  clear(): void {
    this.container.innerHTML = ''
  }

  /**
   * Create the message element based on game state
   * @private
   */
  private createMessageElement(gameState: RenderState['gameState'], targetWord: string): HTMLElement {
    const messageDiv = document.createElement('div')
    messageDiv.className = 'message'

    // Only show error messages inline (no win/lose messages)
    if (gameState.message) {
      messageDiv.textContent = gameState.message
      messageDiv.classList.add('error')
    }
    // Win/lose states are now handled by modals, not inline messages

    return messageDiv
  }

  /**
   * Render all rows to the board
   * @private
   */
  private renderBoard(board: HTMLElement, state: RenderState): void {
    // Render guess rows
    for (let i = 0; i < state.maxGuesses; i++) {
      const row = this.createRow(i, state)
      board.appendChild(row)
    }
  }

  /**
   * Create a single row based on its position
   * @private
   */
  private createRow(rowIndex: number, state: RenderState): HTMLElement {
    const { gameState, targetWordLength } = state

    if (rowIndex < gameState.guesses.length) {
      // This row has a guess - show it with pre-calculated feedback
      const entry = gameState.guesses[rowIndex]

      console.log('[GameRenderer] createRow entry:', {
        word: entry.word,
        feedback: entry.feedback.map(f => `${f.letter}:${f.status}`).join(', ')
      })

      return UI.createGuessRow(entry.word, entry.feedback)
    } else if (rowIndex === gameState.guesses.length) {
      // This is the current input row
      return UI.createInputRow(gameState.currentInput, targetWordLength)
    } else {
      // Empty row
      return UI.createEmptyRow(targetWordLength)
    }
  }
}
