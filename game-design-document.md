# Game Design Document — Progressive Wordle Game

## 1. Game Idea

A Wordle-inspired word puzzle game with **level-based progression**.

Instead of a daily reset, players advance through levels by solving word puzzles.
Each level represents growth in skill, logic, and pattern recognition.

The game is designed to be simple, addictive, and expandable.

---

## 2. Core Feeling

- Clever, not pressured  
- Calm but engaging  
- “Just one more level” motivation  
- Satisfaction from learning and improvement  

Players should feel rewarded for thinking, not punished for failing.

---

## 3. Game Fantasy

The player is climbing a tower of words.

Each level is a locked word puzzle.
Solving a word unlocks the next level.
Knowledge from previous attempts helps future success.

This is a journey of mastery, not speed.

---

## 4. Target Players

- Fans of Wordle and word puzzle games  
- Casual gamers who enjoy short play sessions  
- Students and young adults  
- Players who enjoy visible progress and milestones  

---

## 5. Core Gameplay Mechanics

- Hidden word per level  
- Fixed word length per level (scales later)  
- Limited number of guesses  
- Wordle-style feedback:
  - Correct letter & correct position  
  - Correct letter & wrong position  
  - Letter not in the word  

---

## 6. Core Loop

1. Player starts at Level 1  
2. A word is generated for the current level  
3. Player submits guesses  
4. Game provides visual feedback for each guess  
5. Player succeeds or retries the level  
6. On success, next level is unlocked  
7. Difficulty increases gradually  

---

## 7. Progression System

Progression is based on **levels**, not time.

Possible difficulty scaling:
- Longer words  
- Fewer guesses  
- Larger word pool  
- Special rules at higher levels  

Failure does not reset progress.
Players can retry levels freely.

---

## 8. MVP Scope (Initial Version)

The MVP should include:

- Level-based gameplay  
- Word guessing with feedback  
- Clear win / retry conditions  
- Basic UI or text-based interface  
- Persistent current level (in memory or local storage)  

No achievements, monetization, or social features in MVP.

---

## 9. Why This Game Should Exist

Most Wordle-style games are time-locked (daily puzzles).

This game focuses on:
- Continuous play  
- Skill progression  
- Player growth over time  

It turns a daily puzzle into a **long-term experience**.

---

## 10. Design Principles

- Simplicity first  
- One clear goal per level  
- Gradual difficulty increase  
- MVP before expansion  
- Easy to modify and extend  

---

## 11. Future Expansion Ideas (Not MVP)

- Themes or word categories  
- Visual level map  
- Hints system  
- Streaks or statistics  
- Boss levels with special rules  

These ideas are optional and not required for the first build.

---

## 12. Success Criteria

The game is successful if:

- Players understand how to play immediately  
- The game is fully playable end-to-end  
- Progression feels rewarding  
- The codebase is clean and extendable  

---

## 13. Final Note

This document is not final.

It is the **first memory of the game** —
a foundation for iteration, creativity, and growth.
