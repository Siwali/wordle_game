# Game Design Document — Progressive Wordle Game

> This is the **single source of truth** for game design decisions.
> Update this document whenever design choices are made or changed.

---

## Core Feeling

- **Clever, not pressured** - Players feel smart when they figure out patterns
- **Calm but engaging** - Relaxing atmosphere, not stressful
- **"Just one more level" motivation** - Compulsive forward momentum
- **Satisfaction from learning and improvement** - Growth feels rewarding

**Design imperative**: Players should feel rewarded for thinking, not punished for failing.

---

## Game Fantasy

The player is climbing a **tower of words**.

Each level is a locked word puzzle.
Solving a word unlocks the next level.
Knowledge from previous attempts helps future success.

This is a **journey of mastery**, not speed.

**Key metaphor**: Vertical progression, not horizontal (daily reset)

---

## Target Players

- **Primary**: Fans of Wordle and word puzzle games
- **Secondary**: Casual gamers who enjoy short play sessions
- **Tertiary**: Students and young adults
- **Quaternary**: Players who enjoy visible progress and milestones

**Player psychographic**: Wants continuous play, skill progression, visible growth

---

## Player Experience

### Immediate Understanding
- Players should understand how to play within seconds
- No tutorial required - intuitive from first interaction

### Emotional Arc Per Level
1. **Curiosity** - What's the hidden word?
2. **Engagement** - Trying patterns, applying logic
3. **Tension** - Running out of guesses
4. **Satisfaction** - Solving it (or learning for next try)
5. **Anticipation** - Moving to next level

### Progression Feeling
- Always moving forward
- Failure is learning, not punishment
- Each level feels like a small victory
- Growth is visible and tangible

---

## Project Goals

### MVP Must-Haves
1. Level-based gameplay (continuous, not daily)
2. Word guessing with Wordle-style feedback
3. Clear win/retry conditions
4. Basic UI or text-based interface
5. Persistent current level (in memory or local storage)

### Post-MVP (Future - Not Now)
- Themes or word categories
- Visual level map
- Hints system
- Streaks or statistics
- Boss levels with special rules

### Anti-Goals (What This Is NOT)
- NOT a daily-reset game
- NOT a competitive multiplayer game
- NOT a monetized product (yet)
- NOT a complex RPG with inventory/story

---

## Core Gameplay Mechanics

### The Puzzle
- **Hidden word per level** - One target word
- **Fixed word length per level** - Starts simple, scales later
- **Limited number of guesses** - Creates tension
- **Wordle-style feedback**:
  - Correct letter + correct position (exact match)
  - Correct letter + wrong position (partial match)
  - Letter not in the word (elimination)

### The Loop
1. Player starts at Level 1
2. A word is generated for the current level
3. Player submits guesses
4. Game provides visual feedback for each guess
5. Player succeeds or retries the level
6. On success, next level is unlocked
7. Difficulty increases gradually

---

## Progression System

Progression is based on **levels**, not time.

### Difficulty Scaling Options
- Longer words
- Fewer guesses allowed
- Larger word pool (more obscure words)
- Special rules at higher levels

### Key Design Decision
**Failure does NOT reset progress.**
Players can retry levels freely.
This keeps the experience positive, not punishing.

---

## Design Principles

1. **Simplicity first** - Easy to learn, hard to master
2. **One clear goal per level** - No confusion about what to do
3. **Gradual difficulty increase** - Challenge grows with player skill
4. **MVP before expansion** - Build core first, decorate later
5. **Easy to modify and extend** - Codebase is a garden, not a fortress
6. **Avoid over-engineering** - Solve today's problems, not tomorrow's hypotheticals

---

## Why This Game Should Exist

Most Wordle-style games are time-locked (daily puzzles).
This creates a specific problem: players want to keep playing, but can't.

This game focuses on:
- **Continuous play** - No artificial limits
- **Skill progression** - Player grows over time
- **Player growth** - Visible improvement through levels

It turns a daily puzzle into a **long-term journey**.

---

## Success Criteria

The game is successful if:

- [ ] Players understand how to play immediately
- [ ] The game is fully playable end-to-end
- [ ] Progression feels rewarding
- [ ] The codebase is clean and extendable
- [ ] Systems can scale for future features

---

## Version History

- **v1.0** (2026-01-15) - Initial design document created from existing project documentation
