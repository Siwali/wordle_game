# Architecture — Progressive Wordle Game

> This is the **single source of truth** for system architecture.
> Update this document when the structure changes or components are added.

---

## High-Level System Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         Game Layer                           │
│  ┌───────────────────┐         ┌─────────────────────────┐  │
│  │   User Interface  │◄────────┤   Game State Manager    │  │
│  │   (Display/Input) │         │   (Orchestrator)        │  │
│  └───────────────────┘         └───────────┬─────────────┘  │
│                                              │               │
└──────────────────────────────────────────────┼───────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Logic Layer                            │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│  │ Word Validator│  │  Feedback   │  │   Level Generator  │ │
│  │              │  │  Calculator │  │                    │ │
│  └──────────────┘  └─────────────┘  └────────────────────┘ │
│                                                               │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│  │ Progression  │  │   Word      │  │   Persistence      │ │
│  │  Tracker     │  │   Bank      │  │   Layer            │ │
│  └──────────────┘  └─────────────┘  └────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Architectural Principles

### Modular Design
- **Single Responsibility**: Each module has one clear purpose
- **Loose Coupling**: Modules interact through well-defined interfaces
- **High Cohesion**: Related functionality stays together
- **Testability**: Each module can be tested independently

### Data Flow
- **Unidirectional where possible**: UI → State Manager → Logic Modules
- **State as source of truth**: Game state determines what's displayed
- **Event-driven**: Actions trigger state changes, which trigger UI updates

### Separation of Concerns
- **UI Layer**: Handles display and input only (no game logic)
- **Logic Layer**: Core game rules (no display code)
- **Data Layer**: Persistence and word storage (pure data access)

---

## Major Components

### 1. Game State Manager (Orchestrator)

**Responsibility**: Coordinates all game systems

**What it does**:
- Holds the current game state (level, guesses, target word, etc.)
- Accepts player input from UI
- Delegates to logic modules for validation and feedback
- Updates state based on game logic results
- Triggers UI updates when state changes
- Manages game flow (win/retry/next level)

**Key interfaces**:
- `submitGuess(guess: string): GameState`
- `startLevel(level: number): void`
- `resetLevel(): void`
- `getCurrentState(): GameState`

**Dependencies**: All logic modules

---

### 2. Word Validator Module

**Responsibility**: Validate player guesses

**What it does**:
- Checks if a word is in the dictionary
- Validates word length matches level requirements
- Returns validation result with clear error messages

**Key interfaces**:
- `validateWord(word: string, targetLength: number): ValidationResult`
- `isInDictionary(word: string): boolean`

**Dependencies**: Word Bank

**Pure function**: No side effects, given same inputs returns same output

---

### 3. Feedback Calculator Module

**Responsibility**: Calculate Wordle-style feedback

**What it does**:
- Compares guess word to target word letter by letter
- Determines feedback for each letter:
  - Correct position (green)
  - Wrong position (yellow)
  - Not in word (gray)
- Handles duplicate letters correctly
- Returns structured feedback data

**Key interfaces**:
- `calculateFeedback(guess: string, target: string): Feedback[]`
- `Feedback` type: `{ letter: string, status: 'correct' | 'present' | 'absent' }`

**Dependencies**: None

**Pure function**: No side effects

---

### 4. Level Generator Module

**Responsibility**: Generate level configurations

**What it does**:
- Determines target word for current level
- Sets word length based on level difficulty
- Determines number of allowed guesses
- Returns complete level configuration

**Key interfaces**:
- `generateLevel(levelNumber: number): LevelConfig`
- `LevelConfig` type: `{ targetWord: string, wordLength: number, maxGuesses: number }`

**Dependencies**: Word Bank, Progression Tracker (for difficulty scaling)

---

### 5. Progression Tracker Module

**Responsibility**: Track player advancement

**What it does**:
- Stores current level number
- Updates level on successful completion
- Handles retry logic (no progress reset)
- Determines difficulty parameters based on level

**Key interfaces**:
- `getCurrentLevel(): number`
- `advanceToNextLevel(): void`
- `getDifficultyForLevel(level: number): DifficultyConfig`
- `DifficultyConfig` type: `{ wordLength: number, maxGuesses: number }`

**Dependencies**: None (or Persistence for saving)

---

### 6. Word Bank / Dictionary Module

**Responsibility**: Store and provide valid words

**What it does**:
- Stores dictionary of valid words
- Filters words by length
- Provides random word selection
- Loads words from file or embedded data

**Key interfaces**:
- `getRandomWord(length: number): string`
- `isValidWord(word: string): boolean`
- `loadWords(source: string | string[]): void`
- `getWordsOfLength(length: number): string[]`

**Dependencies**: File system or embedded data

---

### 7. Persistence Layer

**Responsibility**: Save and load game progress

**What it does**:
- Saves current level to storage
- Loads saved progress on startup
- Handles missing save data (returns defaults)
- Abstracts storage mechanism (local storage, file, database)

**Key interfaces**:
- `saveProgress(level: number): void`
- `loadProgress(): number`
- `clearProgress(): void`

**Dependencies**: Storage mechanism (browser localStorage, filesystem, etc.)

---

### 8. User Interface Components

**Responsibility**: Display game state and accept input

**Components** (may be split across multiple files):

#### Game Display
- Shows current level
- Displays word length (empty letter slots)
- Shows remaining guesses
- Displays previous guesses with feedback

#### Input Handler
- Accepts keyboard or on-screen input
- Validates input format
- Submits guess to Game State Manager
- Shows input errors

#### Message Display
- Win messages
- Retry prompts
- Level transitions
- Error messages

**Dependencies**: Game State Manager (read-only, except for input submission)

---

## Data Structures

### GameState
```typescript
{
  currentLevel: number
  targetWord: string
  wordLength: number
  maxGuesses: number
  guessesUsed: number
  guessHistory: Guess[]
  gameStatus: 'playing' | 'won' | 'lost'
}

// Guess represents a single attempt
type Guess = {
  word: string
  feedback: Feedback[]
  timestamp: number
}

// Feedback represents letter-by-letter results
type Feedback = {
  letter: string
  status: 'correct' | 'present' | 'absent'
}
```

### LevelConfig
```typescript
{
  levelNumber: number
  targetWord: string
  wordLength: number
  maxGuesses: number
}
```

---

## Module Independence

**Each module should be independently testable:**

- Word Validator can test validation without UI
- Feedback Calculator can test feedback logic without game state
- Level Generator can test level generation without persistence
- UI components can mock game state for display testing

---

## Extension Points

**Places where the system can grow:**

1. **New difficulty modes** - Extend Level Generator
2. **New feedback styles** - Extend Feedback Calculator
3. **New persistence backends** - Implement Persistence interface
4. **New UI frameworks** - Reimplement UI without touching logic
5. **New word sources** - Extend Word Bank (API, different dictionaries)

---

## Version History

- **v1.0** (2026-01-15) - Initial architecture designed based on project principles
