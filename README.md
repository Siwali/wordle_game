# Wordle Game

A Progressive Wordle-style game built with **TypeScript** and **Vite**, featuring
level progression, difficulty scaling, persistent progress, restart/reset controls,
and a clean layered architecture.

This project was designed with **separation of concerns**, **immutability**, and
**testability** in mind.

## Live Demo

This project is deployed using Netlify with a standard Vite build setup.

👉 Live demo: https://clinquant-flan-5363b1.netlify.app/

---

## Vibe Coding Practice Project

This project was created as a **Vibe Coding practice**.

Instead of following a rigid blueprint from the start, the game was built through
iterative development and continuous feedback loops:

- Start with a minimal playable version
- Add features step by step
- Refactor aggressively when problems appeared
- Fix real bugs by addressing architectural root causes
- Let the final structure emerge naturally over time

The current architecture is the result of multiple iterations, refactors, and
design decisions made while keeping the game fully playable at every stage.

---

## Features

- Classic Wordle gameplay (correct / present / absent feedback)
- **Progressive levels** with increasing difficulty
- Dynamic word length:
  - Levels 1–5: 4 letters
  - Levels 6–10: 5 letters
  - Levels 11+: 6 letters (fewer guesses)
- **Level persistence** using `localStorage`
- Restart current round (same level)
- Start a brand new game (reset to level 1)
- Physical keyboard + on-screen virtual keyboard
- Modal alerts for:
  - Level up
  - Game over
- Inline error messages for invalid words (non-blocking)
- Fully refactored **modular architecture**
- Clean, responsive UI inspired by Wordle
