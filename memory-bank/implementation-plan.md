# Implementation Plan — Progressive Wordle Game

> This is the **single source of truth** for development roadmap.
> Update this document as phases are completed or plans change.

---

## Technology Stack (Finalized)

**Platform**: Web Browser
**Language**: TypeScript (compiles to JavaScript)
**Build Tool**: Vite
**UI Framework**: Vanilla JavaScript (no framework)
**Styling**: Plain CSS
**State Management**: Custom (GameStateManager class)
**Persistence**: localStorage
**Deployment**: GitHub Pages

---

## Development Phases (High-Level)

### Phase 0: Foundation Setup ✅
- ✅ Technology decisions made (TypeScript + Vite + Vanilla JS)
- ⏳ Create project structure and configuration files
- ⏳ Set up development environment

### Phase 1: Core Game Logic
- Word validation system
- Feedback calculation (Wordle-style)
- Level generation
- Progression tracking
- Word bank/dictionary

### Phase 2: Game State Manager
- Central state management
- Coordination of logic modules
- Win/loss condition handling

### Phase 3: User Interface
- Game display component
- Input handler component
- Message display component

### Phase 4: Integration
- Wire all components together
- Persistence layer
- Complete game loop

### Phase 5: Polish & Testing
- Testing all game flows
- Bug fixes and UX improvements
- Documentation updates

---

## File Structure

```
src/
├── main.ts                    # Bootstrap application
├── styles.css                 # All styling
│
├── core/
│   ├── GameStateManager.ts    # Orchestrator (holds state)
│   └── types.ts               # Shared TypeScript interfaces
│
├── logic/
│   ├── WordValidator.ts       # Validate words
│   ├── FeedbackCalculator.ts  # Compute Wordle feedback
│   ├── LevelGenerator.ts      # Generate level configs
│   └── ProgressionTracker.ts  # Track level advancement
│
├── ui/
│   ├── GameDisplay.ts         # Render game state
│   ├── InputHandler.ts        # Handle user input
│   └── MessageDisplay.ts      # Show win/retry messages
│
└── data/
    ├── words.json             # Embedded word list (~2000 words)
    ├── WordBank.ts            # Dictionary management
    └── Persistence.ts         # localStorage wrapper
```

---

## Detailed Build Plan

### Phase 0: Foundation Setup (In Progress)

**Goal**: Ready-to-code project structure

**Completed**:
- [x] Technology decisions made
- [x] Architecture designed

**Remaining**:
- [ ] Initialize `package.json` with dependencies
- [ ] Create `tsconfig.json` for TypeScript
- [ ] Create `vite.config.ts` for Vite
- [ ] Create folder structure: `src/core`, `src/logic`, `src/ui`, `src/data`
- [ ] Create `src/types.ts` with all interfaces
- [ ] Create `index.html` entry point
- [ ] Create `src/styles.css` basic styles
- [ ] Create `src/main.ts` placeholder
- [ ] Verify: `npm run dev` starts development server

**Files to create**:
1. `package.json`
2. `tsconfig.json`
3. `vite.config.ts`
4. `index.html`
5. `src/styles.css`
6. `src/types.ts`
7. `src/main.ts`

**Dev Commands**:
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
```

---

### Phase 1: Core Game Logic (Pending)

**Goal**: Testable game logic with pure functions

#### Module 1: types.ts
```typescript
// src/core/types.ts
type GameState = {
  currentLevel: number
  targetWord: string
  wordLength: number
  maxGuesses: number
  guessesUsed: number
  guessHistory: Guess[]
  gameStatus: 'playing' | 'won' | 'lost'
}

type Guess = {
  word: string
  feedback: Feedback[]
}

type Feedback = {
  letter: string
  status: 'correct' | 'present' | 'absent'
}

type LevelConfig = {
  levelNumber: number
  targetWord: string
  wordLength: number
  maxGuesses: number
}

type DifficultyConfig = {
  wordLength: number
  maxGuesses: number
}

type ValidationResult = {
  valid: boolean
  reason?: string
}
```

#### Module 2: WordBank.ts
```typescript
// src/data/WordBank.ts
class WordBank {
  private words: string[]
  constructor(words: string[])
  getRandomWord(length: number): string
  isValidWord(word: string): boolean
  getWordsOfLength(length: number): string[]
}
```
- Load from `words.json` (organized by length)
- Filter by length efficiently
- Return random word

#### Module 3: WordValidator.ts
```typescript
// src/logic/WordValidator.ts
function validateWord(
  word: string,
  targetLength: number,
  wordBank: WordBank
): ValidationResult
```
- Check word exists in dictionary
- Check length matches requirement
- Return validation result with reason if invalid

#### Module 4: FeedbackCalculator.ts
```typescript
// src/logic/FeedbackCalculator.ts
function calculateFeedback(guess: string, target: string): Feedback[]
```
- Compare each letter position
- Handle duplicates correctly (critical!)
- Return array of feedback objects
- Pure function, no side effects

#### Module 5: ProgressionTracker.ts
```typescript
// src/logic/ProgressionTracker.ts
function getDifficultyForLevel(level: number): DifficultyConfig
```
- Levels 1-5: 4 letters, 6 guesses
- Levels 6-10: 5 letters, 6 guesses
- Levels 11+: 6 letters, 5 guesses
- Pure function

#### Module 6: LevelGenerator.ts
```typescript
// src/logic/LevelGenerator.ts
function generateLevel(levelNumber: number, wordBank: WordBank): LevelConfig
```
- Get difficulty from ProgressionTracker
- Get random word from WordBank
- Return complete level config

**Deliverable**: All logic modules testable in isolation

---

### Phase 2: Game State Manager (Pending)

**Goal**: Central state management and coordination

**File**: `src/core/GameStateManager.ts`

```typescript
class GameStateManager {
  private state: GameState
  private wordBank: WordBank

  constructor(wordBank: WordBank)

  // Core methods
  startLevel(levelNumber: number): void
  submitGuess(guess: string): GameState
  getCurrentState(): GameState
  resetLevel(): void
  advanceToNextLevel(): void

  // Private helpers
  private initializeState(levelConfig: LevelConfig): void
  private calculateFeedback(guess: string): Feedback[]
  private checkWinCondition(guess: string): boolean
  private checkLossCondition(): boolean
}
```

**Responsibilities**:
- Initialize game state for a level
- Accept guess input
- Delegate to logic modules
- Update internal state
- Return new state for UI to render
- Manage win/loss conditions

**Deliverable**: GameStateManager can be tested via console

---

### Phase 3: User Interface (Pending)

**Goal**: Display game and accept input

#### Component 1: GameDisplay.ts
```typescript
// src/ui/GameDisplay.ts
class GameDisplay {
  private container: HTMLElement

  constructor(container: HTMLElement)
  render(state: GameState): void

  // Private helpers
  private renderLevelInfo(state: GameState): void
  private renderGuessHistory(state: GameState): void
  private renderRemainingGuesses(state: GameState): void
  private createLetterTile(letter: string, status: string): HTMLElement
}
```
- Update DOM based on game state
- Show current level, word length
- Display previous guesses with color-coded feedback
- Show remaining guesses as empty slots

#### Component 2: InputHandler.ts
```typescript
// src/ui/InputHandler.ts
class InputHandler {
  onGuess(callback: (guess: string) => void): void
  destroy(): void

  // Private helpers
  private handleKeyPress(e: KeyboardEvent): void
  private isValidInput(key: string): boolean
}
```
- Listen for physical keyboard
- Submit guess when Enter pressed
- Handle backspace
- Validate input (letters only)

#### Component 3: MessageDisplay.ts
```typescript
// src/ui/MessageDisplay.ts
class MessageDisplay {
  private container: HTMLElement

  constructor(container: HTMLElement)
  showMessage(message: string, type: 'win' | 'retry' | 'info'): void
  clearMessage(): void
  onNextLevel(callback: () => void): void
}
```
- Overlay messages for level complete
- Retry prompt on failure
- "Continue" button for next level

**Styling** (in `styles.css`):
- Grid-based letter display
- Color coding: 🟩 #6aaa64, 🟨 #c9b458, ⬛ #787c7e
- Responsive, centered layout
- Clean, minimalist Wordle-inspired design

**Deliverable**: Visual game playable in browser

---

### Phase 4: Integration (Pending)

**Goal**: Complete playable game loop

#### Main Bootstrap: main.ts
```typescript
// src/main.ts
import { WordBank } from './data/WordBank'
import { GameStateManager } from './core/GameStateManager'
import { GameDisplay } from './ui/GameDisplay'
import { InputHandler } from './ui/InputHandler'
import { MessageDisplay } from './ui/MessageDisplay'
import { Persistence } from './data/Persistence'
import wordList from './data/words.json'

// Initialize components
const wordBank = new WordBank(wordList)
const gameStateManager = new GameStateManager(wordBank)
const gameContainer = document.getElementById('game')!
const messageContainer = document.getElementById('message')!

const gameDisplay = new GameDisplay(gameContainer)
const inputHandler = new InputHandler()
const messageDisplay = new MessageDisplay(messageContainer)

// Load saved progress
const savedLevel = Persistence.loadProgress()
gameStateManager.startLevel(savedLevel)
gameDisplay.render(gameStateManager.getCurrentState())

// Wire input
inputHandler.onGuess((guess) => {
  const newState = gameStateManager.submitGuess(guess)
  gameDisplay.render(newState)

  if (newState.gameStatus === 'won') {
    Persistence.saveProgress(newState.currentLevel + 1)
    messageDisplay.showMessage('Level Complete! 🎉', 'win')
    messageDisplay.onNextLevel(() => {
      gameStateManager.advanceToNextLevel()
      messageDisplay.clearMessage()
      gameDisplay.render(gameStateManager.getCurrentState())
    })
  } else if (newState.gameStatus === 'lost') {
    messageDisplay.showMessage('Try again!', 'retry')
    messageDisplay.onNextLevel(() => {
      gameStateManager.resetLevel()
      messageDisplay.clearMessage()
      gameDisplay.render(gameStateManager.getCurrentState())
    })
  }
})
```

#### Persistence Layer: Persistence.ts
```typescript
// src/data/Persistence.ts
class Persistence {
  private static readonly STORAGE_KEY = 'wordle-game-level'

  static saveProgress(level: number): void {
    localStorage.setItem(this.STORAGE_KEY, level.toString())
  }

  static loadProgress(): number {
    const saved = localStorage.getItem(this.STORAGE_KEY)
    return saved ? parseInt(saved, 10) : 1
  }

  static clearProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}
```

**Deliverable**: Fully playable game with progression

---

### Phase 5: Polish & Testing (Pending)

**Testing Checklist**:
- [ ] Win condition: Correct word advances to next level
- [ ] Loss condition: Running out of guesses allows retry
- [ ] Feedback accuracy: Test duplicate letters, all wrong, all correct
- [ ] Progression: Level 1 → Level 2 → Level 3 works
- [ ] Persistence: Refresh page maintains level
- [ ] Invalid input: Non-dictionary words rejected
- [ ] UI responsiveness: Looks good on desktop and mobile
- [ ] Edge cases: Empty dictionary, network issues

**UX Refinements** (if time permits):
- Keyboard shortcut (Enter/Space) to continue to next level
- Visual shake animation on invalid word
- Smooth color transitions for feedback
- "How to Play" instructions on first load

**Deliverable**: Polished, tested MVP

---

## Data Structures Summary

### GameState
```typescript
{
  currentLevel: number        // Current level number
  targetWord: string          // The word to guess (hidden)
  wordLength: number          // Length of target word
  maxGuesses: number          // Maximum allowed guesses
  guessesUsed: number         // How many guesses made
  guessHistory: Guess[]       // All previous guesses with feedback
  gameStatus: 'playing' | 'won' | 'lost'
}
```

### Guess
```typescript
{
  word: string                // The guessed word
  feedback: Feedback[]        // Letter-by-letter feedback
}
```

### Feedback
```typescript
{
  letter: string              // The letter
  status: 'correct' | 'present' | 'absent'
}
```

---

## Difficulty Scaling

| Level Range | Word Length | Max Guesses |
|-------------|-------------|-------------|
| 1-5 | 4 letters | 6 guesses |
| 6-10 | 5 letters | 6 guesses |
| 11+ | 6 letters | 5 guesses |

---

## Build Principles

- **Modular first** - Each component is independent and swappable
- **Pure functions** - Logic modules have no side effects
- **Test as you go** - Don't wait until the end
- **Simple before complex** - Basic implementation first
- **Document decisions** - Keep memory-bank updated

---

## Current Status

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 0: Foundation Setup | ⏳ In Progress | 50% - Tech decisions complete, files not created |
| Phase 1: Core Game Logic | Pending | 0% |
| Phase 2: Game State Manager | Pending | 0% |
| Phase 3: User Interface | Pending | 0% |
| Phase 4: Integration | Pending | 0% |
| Phase 5: Polish & Testing | Pending | 0% |

---

## Version History

- **v2.0** (2026-01-15) - Updated with approved technology stack and detailed implementation plan
- **v1.0** (2026-01-15) - Initial implementation plan created
