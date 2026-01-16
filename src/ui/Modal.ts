/**
 * Modal - Creates modal dialog components
 *
 * This module creates modal overlay dialogs for important game events.
 * Used for win/lose confirmations while keeping errors as inline labels.
 */

export type ModalState = {
  visible: boolean
  title: string
  message: string
  onConfirm: () => void
}

/**
 * Create a modal dialog element
 * @param state - The modal state including title, message, and callback
 * @returns HTMLElement - The modal overlay element
 */
export function createModal(state: ModalState): HTMLElement {
  // Create overlay
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'

  // Create modal container
  const modal = document.createElement('div')
  modal.className = 'modal'

  // Create title
  const title = document.createElement('h2')
  title.className = 'modal-title'
  title.textContent = state.title
  modal.appendChild(title)

  // Create message
  const message = document.createElement('p')
  message.className = 'modal-message'
  message.textContent = state.message
  modal.appendChild(message)

  // Create actions container
  const actions = document.createElement('div')
  actions.className = 'modal-actions'
  modal.appendChild(actions)

  // Create OK button
  const okButton = document.createElement('button')
  okButton.className = 'modal-button'
  okButton.textContent = 'OK'
  okButton.type = 'button'
  okButton.addEventListener('click', () => {
    state.onConfirm()
  })
  actions.appendChild(okButton)

  // Add keyboard support (Enter key)
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      state.onConfirm()
      document.removeEventListener('keydown', handleKeyPress)
    }
  }
  document.addEventListener('keydown', handleKeyPress)

  // Clean up event listener when modal is removed
  overlay.addEventListener('DOMNodeRemoved', () => {
    document.removeEventListener('keydown', handleKeyPress)
  })

  overlay.appendChild(modal)
  return overlay
}
