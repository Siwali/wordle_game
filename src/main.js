import { GameManager } from './GameManager.js';
import { WordBank } from './data/WordBank.js';
import words from './data/words.json';
// Initialize the game when DOM is ready
function init() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App container not found!');
        return;
    }
    // Create WordBank with word list
    const wordBank = new WordBank(words);
    // Create and start the game with modular architecture
    const game = new GameManager(wordBank, app);
    game.start();
    console.log('Wordle initialized with', words.length, 'words!');
    console.log('Each refresh gives a new random word.');
}
// Start the app
init();
