/**
 * KeyboardHandler - Translates keyboard events into GameEvents
 *
 * This class listens to keyboard events and converts them into
 * normalized GameEvent objects that the game engine can process.
 *
 * This abstraction allows other input sources (virtual keyboard, etc.)
 * to create the same GameEvent objects.
 */
export class KeyboardHandler {
    constructor(onEvent) {
        this.onEvent = onEvent;
    }
    /**
     * Start listening to keyboard events
     */
    start() {
        this.eventListener = (e) => this.handleKeyPress(e);
        document.addEventListener('keydown', this.eventListener);
    }
    /**
     * Stop listening to keyboard events
     */
    stop() {
        if (this.eventListener) {
            document.removeEventListener('keydown', this.eventListener);
            this.eventListener = undefined;
        }
    }
    /**
     * Handle keyboard press and convert to GameEvent
     * @private
     */
    handleKeyPress(event) {
        const key = event.key.toUpperCase();
        // Handle letter input
        if (/^[A-Z]$/.test(key)) {
            this.onEvent({ type: 'letter', letter: key });
        }
        // Handle backspace
        else if (key === 'BACKSPACE') {
            this.onEvent({ type: 'backspace' });
        }
        // Handle enter - submit guess
        else if (key === 'ENTER') {
            this.onEvent({ type: 'submit' });
        }
    }
}
