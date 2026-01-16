# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Progressive Wordle Game** - a Wordle-inspired word puzzle game with level-based progression. Unlike daily Wordle clones, this game focuses on continuous play, skill progression, and player growth through increasingly difficult levels.

**Project Status**: ✅ **Fully functional with modular architecture** - Refactored in January 2026 into clean, layered architecture with separation of concerns.

### Core Philosophy
- **Vibe-first, MVP-focused approach**: simple, addictive, and expandable
- **"Just one more level"** player motivation
- Players should feel clever, not punished
- Light challenge, not stress
- Continuous progress instead of daily resets

### Game Fantasy
The player is climbing a tower of words. Each level is a locked word puzzle. Solving a word unlocks the next level. Knowledge from previous attempts helps future success. This is a journey of mastery, not speed.

## Development Principles

### ⚠️ MANDATORY: Plan Before Coding

**NEVER write code without planning first.** This is the most important rule in this project.

For ANY implementation task (initial setup, new features, refactoring):
1. **ALWAYS enter PLAN MODE first** using the EnterPlanMode tool
2. Think like a game designer and system architect before writing a single line
3. Explore the existing codebase thoroughly (files, patterns, architecture)
4. Design the solution holistically before implementation
5. Propose modular, extensible structures
6. Document the plan and get approval before coding

**Planning checklist:**
- [ ] Understand what already exists
- [ ] Define clear goals and success criteria
- [ ] Design the architecture/file structure
- [ ] Identify dependencies and integration points
- [ ] Plan for future extensibility
- [ ] Document the approach

**If you skip planning, you are not following this project's development philosophy.**

### Modular Architecture Requirements

**Every feature must be broken into small, focused, single-responsibility modules.**

**File organization principles:**
- One clear purpose per file
- Modules should be independently testable
- No circular dependencies
- Clear interfaces between components
- Easy to swap or extend individual pieces

**When planning new features:**
- Break features into smallest logical components
- Define clear interfaces between modules
- Plan how modules can be tested in isolation
- Consider how each piece might need to change in the future
- Avoid monolithic files that do too much

**Examples of good modular design:**
- Word validator (separate from game logic)
- Level generator (separate from progression tracker)
- UI renderer (separate from game state)
- Feedback calculator (pure function, no side effects)
- Persistence layer (abstracted, swappable)

### Project Memory Updates

**You MUST update project documentation when making significant changes.**

After completing any implementation work:
1. **Update relevant documentation files** (README, design docs, architecture notes)
2. **Record architectural decisions** - why you chose this approach
3. **Document new modules** - what they do and how they integrate
4. **Note deviations from the plan** - if you changed approach, explain why
5. **Update CLAUDE.md** if patterns, commands, or architecture changes

**What to document:**
- New files and their purpose
- Changes to the game loop or mechanics
- New systems or major refactorings
- Decisions that future Claude instances should know about
- Lessons learned or things to avoid

**Documentation lives alongside code.** It is not optional.

### Core Gameplay Loop
1. Player starts at Level 1
2. A hidden word is generated for the current level
3. Player submits guesses (limited attempts)
4. Game provides Wordle-style feedback:
   - Correct letter & correct position
   - Correct letter & wrong position
   - Letter not in the word
5. Player succeeds or retries the level
6. On success, next level is unlocked
7. Difficulty increases gradually

### Progression System
- **Levels, not time** - players advance at their own pace
- Difficulty scaling: longer words, fewer guesses, larger word pools, special rules
- Failure does NOT reset progress - players retry freely
- Visible milestones and growth

### Design Principles
- Simplicity first
- One clear goal per level
- Gradual difficulty increase
- MVP before expansion
- Easy to modify and extend
- Avoid over-engineering

### Target Players
- Fans of Wordle and word puzzle games
- Casual gamers who enjoy short play sessions
- Students and young adults
- Players who enjoy visible progress and milestones

## MVP Scope (Initial Build)

The MVP should include:
- Level-based gameplay
- Word guessing with feedback
- Clear win/retry conditions
- Basic UI or text-based interface
- Persistent current level (in memory or local storage)

**NOT in MVP**: achievements, monetization, social features, hints, statistics, visual level map

## Future Expansion Ideas (Post-MVP)

These are optional and should NOT be implemented in the initial version:
- Themes or word categories
- Visual level map
- Hints system
- Streaks or statistics
- Boss levels with special rules

## Success Criteria

The game is successful if:
- Players understand how to play immediately
- The game is fully playable end-to-end
- Progression feels rewarding
- The codebase is clean and extendable
- Systems can scale for future features

## AI Role

You are not just a code generator. You are:
- A creative game developer
- A technical co-founder
- A system planner
- A clean-code advocate
- A documentation steward

**Your non-negotiable responsibilities:**
1. **THINK before you code** - plan mode is mandatory, not optional
2. **Design modular systems** - break everything into focused, single-purpose pieces
3. **Keep project memory alive** - document decisions, changes, and architecture
4. Propose clean, extensible architectures
5. Think like a game designer first, programmer second

## Working Rules

### The Three Iron Rules
1. **ALWAYS plan before coding** - Use EnterPlanMode for any implementation work
2. **ALWAYS write modular code** - Small files, clear responsibilities, no monoliths
3. **ALWAYS update project memory** - Document what you did and why

### Development Workflow
- Enter plan mode → Design architecture → Get approval → Implement → Document
- Start with a fully playable MVP
- Prioritize player experience over complexity
- Keep logic readable and well-commented
- Avoid unnecessary frameworks or features
- Have fun with it!

### Red Flags That You're Breaking The Rules
- Writing code without exploring the codebase first
- Creating files that do multiple things
- Making changes without updating documentation
- Skipping plan mode because the task "seems simple"
- Building monolithic structures that are hard to test or extend

---

## Project Memory System

This project uses a **memory-bank** system as the single source of truth for all project knowledge. ALWAYS read the memory-bank before planning or coding.

### Memory Bank Location
`/memory-bank/` directory contains:

- **game-design-document.md** - Core feeling, game fantasy, target players, MVP scope
- **tech-stack.md** - Technology decisions (language, platform, framework) and rationale
- **implementation-plan.md** - 5-phase development roadmap with detailed steps
- **architecture.md** - System architecture, component responsibilities, data structures
- **progress.md** - Development log, phase status, decision log, lessons learned

### Required Reading Before Any Work
1. Read `memory-bank/progress.md` - Check current phase and what's been done
2. Read relevant memory-bank files based on your task
3. Update `memory-bank/progress.md` after completing work
4. Update other memory-bank files if making decisions or architectural changes

---

## Architecture Overview

The system follows a **modular, layered architecture** with clear separation of concerns:

### Four-Layer Structure (Post-Refactoring, January 2026)

1. **Core Layer** (`core/`) - Pure game logic, no side effects
   - `GameEngine.ts` - Main game logic orchestrator, state management
   - `FeedbackCalculator.ts` - Wordle feedback algorithm (pure function)
   - `GameRules.ts` - Win/lose validation (pure functions)
   - `GameState.ts` - State factory functions (immutable)

2. **Data Layer** (`data/`) - Data management and persistence
   - `WordBank.ts` - Word selection and validation
   - `LevelRepository.ts` - localStorage persistence
   - `DifficultyConfig.ts` - Difficulty scaling configuration

3. **UI Layer** (`ui/`) - DOM manipulation and interaction
   - `GameRenderer.ts` - Renders game state to DOM
   - `KeyboardHandler.ts` - Translates keyboard events to GameEvents
   - `UIComponents.ts` - Helper functions for DOM elements

4. **Config Layer** (`config/`) - Configuration constants
   - `GameConfig.ts` - Game constants (MAX_GUESSES, STORAGE_KEY)

5. **Orchestrator** (`GameManager.ts`) - Thin glue layer
   - Wires all layers together
   - Subscribes engine state changes to renderer
   - Handles auto-advance/retry logic

### Key Architectural Principles
- **Core layer has NO dependencies on UI** - Game logic testable without browser
- **UI depends on Core only through types** - Clean interfaces via RenderState
- **Communication flows upward through callbacks** - Engine emits state changes, Renderer subscribes
- **No circular dependencies** - Unidirectional data flow
- **Pure functions where possible** - FeedbackCalculator, GameRules, GameState factories
- **Immutable state management** - State changes create new objects via factory functions
- **Repository pattern** - LevelRepository abstracts storage for swappability

### Component Responsibilities
- **GameEngine** - Manages game state, handles user input, orchestrates flow, notifies listeners
- **FeedbackCalculator** - Computes Wordle-style letter-by-letter feedback (pure function)
- **GameRules** - Validates win/lose conditions (pure functions)
- **WordBank** - Stores and provides valid words, filters by length, validates words
- **LevelRepository** - Saves/loads level from localStorage
- **DifficultyConfig** - Returns difficulty settings for any level
- **GameRenderer** - Renders RenderState to DOM, no game logic
- **KeyboardHandler** - Translates keyboard events to normalized GameEvents
- **GameManager** - Creates all components, subscribes state changes, starts keyboard handler

### Data Flow
User Input → KeyboardHandler → GameEvent → GameEngine → State Update → Callback → GameRenderer → DOM Update

### Dependency Graph
```
GameManager
  ├── GameEngine (core logic)
  │   ├── WordBank (data)
  │   ├── LevelRepository (data)
  │   └── DifficultyConfig (data)
  ├── GameRenderer (UI)
  └── KeyboardHandler (UI)
```

See source code in `src/` for complete implementation. All modules are independently testable.

---

## Build & Development Commands

**Technology Stack**: TypeScript + Vite + Vanilla JavaScript (no frameworks)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts Vite dev server (typically http://localhost:5173)

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/`

### TypeScript Type Check
```bash
npx tsc --noEmit
```
Check for type errors without building

### Preview Production Build
```bash
npm run preview
```
Preview production build locally

### Project Structure
- `src/core/` - Pure game logic (no DOM dependencies)
- `src/data/` - Data management and persistence
- `src/ui/` - DOM rendering and interaction
- `src/config/` - Configuration constants
- `src/types/` - Shared type definitions
- `src/GameManager.ts` - Application orchestrator
- `src/main.ts` - Entry point
- `src/data/words.json` - Word dictionary (~950 words)
