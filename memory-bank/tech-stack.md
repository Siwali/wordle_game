# Tech Stack — Progressive Wordle Game

> This is the **single source of truth** for technology decisions.
> Update this document whenever choices are made or changed.

---

## Status: DECISIONS FINALIZED

**✅ All core technology decisions have been made.**
See decision log below for rationale.

---

## Chosen Language

**Status**: ✅ DECIDED - TypeScript with JavaScript

### Decision: TypeScript with JavaScript

**Date**: 2026-01-15

**Choice**: TypeScript for type safety, compiles to JavaScript

**Reasoning**:
- Web-native - perfect fit for browser platform
- Type safety catches bugs early in complex game state
- Great ecosystem with Vite for fast development
- Easy to share and deploy (just send a URL)
- Can add React later if needed, but vanilla JS keeps MVP simple

**Alternatives Rejected**:
- Python - Great for logic, but web UI would require additional framework (Flask/Streamlit). Better suited for CLI version.
- Rust - Overkill for a simple word game. Steeper learning curve, longer development time.
- Go - Less common for web games, smaller ecosystem for game development.

**Revisit Conditions**:
- If performance becomes an issue (unlikely for a word game)
- If we decide to build a desktop/mobile native app instead

---

## Libraries / Frameworks

**Status**: ✅ DECIDED

### Decision: Vite + Vanilla TypeScript

**Date**: 2026-01-15

**Choice**: Vite for dev server/build, Vanilla TypeScript (no UI framework)

**Reasoning**:
- **Vite**: Lightning-fast HMR, simple build config, modern standard
- **Vanilla TypeScript**: No framework overhead, keeps MVP simple
- **Plain CSS**: Sufficient for this game, avoids build complexity
- **Direct DOM manipulation**: Fast enough for this simple game

**Framework Stack**:
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Plain CSS
- **State Management**: Custom (GameStateManager class)
- **No UI Framework**: Vanilla JS with direct DOM manipulation

**Alternatives Rejected**:
- React/Vue - Unnecessary complexity for a simple word game UI
- Tailwind - Additional build step, plain CSS is sufficient
- Redux/Zustand - Overkill for this level of state management

**Revisit Conditions**:
- If UI becomes complex enough that framework would reduce complexity
- If we add complex animations or state-driven visualizations

---

## Tools

**Status**: ✅ DECIDED

### Decision: Standard JavaScript/TypeScript Tooling

**Date**: 2026-01-15

**Choice**: npm for packages, ESLint for linting, Vitest for testing

**Tool Stack**:
- **Package Manager**: npm (included with Node.js)
- **Version Control**: Git
- **Build Tool**: Vite (includes dev server, bundling)
- **Linting**: ESLint with TypeScript plugin
- **Testing**: Vitest (Vite-native, fast)
- **Language Server**: TypeScript Language Server

**Dev Commands**:
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
```

**Alternatives Rejected**:
- pnpm/yarn - npm is sufficient, no need for additional complexity
- Jest - Vitest is faster and Vite-native

---

## Platform Target

**Status**: ✅ DECIDED - Web Browser

### Decision: Web Browser

**Date**: 2026-01-15

**Choice**: Web browser (any modern browser)

**Reasoning**:
- **Universal access**: No installation required
- **Easy deployment**: GitHub Pages, Netlify, Vercel - free hosting
- **Natural sharing**: Just send a URL
- **Largest audience**: Everyone has a browser
- **Responsive**: Can work on mobile with proper CSS

**Target Browsers**:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

**Deployment**: GitHub Pages (free, simple)

**Alternatives Rejected**:
- CLI - Limited appeal, less visual, harder to share
- Desktop App - Distribution complexity, OS-specific builds
- Mobile-First Web - More complex responsive design needed

**Revisit Conditions**:
- If we want native mobile app store distribution (unlikely for MVP)

---

## Reasons for Choices (To Be Filled)

**When decisions are made, document:**

1. **What** was chosen
2. **Why** it was chosen (trade-offs considered)
3. **What alternatives were rejected**
4. **What might cause us to change this decision later**

### Template for Future Decisions

```
## [Decision Name]

**Choice**: [What we chose]

**Date**: [When decided]

**Reasoning**:
- [Reason 1]
- [Reason 2]

**Alternatives Considered**:
- [Alternative 1] - Rejected because...
- [Alternative 2] - Rejected because...

**Revisit Conditions**:
- [Condition that would make us reconsider]
```

---

## Summary of Final Technology Stack

| Category | Choice | Rationale |
|----------|--------|-----------|
| **Platform** | Web Browser | Universal access, easy deployment |
| **Language** | TypeScript | Type safety, web-native |
| **Build Tool** | Vite | Fast dev server, simple build |
| **UI Framework** | Vanilla JS | Keep MVP simple, avoid over-engineering |
| **Styling** | Plain CSS | Sufficient for this game |
| **State Management** | Custom (GameStateManager) | Simple enough to build ourselves |
| **Package Manager** | npm | Standard for JS/TS |
| **Testing** | Vitest | Vite-native, fast |
| **Linting** | ESLint | Standard for JS/TS |
| **Persistence** | localStorage | Built-in, sufficient for MVP |
| **Deployment** | GitHub Pages | Free, simple |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-15 | Platform: Web Browser | Universal access, easy deployment, natural sharing |
| 2026-01-15 | Language: TypeScript | Type safety for complex game state, web-native |
| 2026-01-15 | Framework: Vanilla JS + Vite | Keep MVP simple, avoid over-engineering |
| 2026-01-15 | Persistence: localStorage | Built-in, sufficient for MVP (just store level) |
| 2026-01-15 | Deployment: GitHub Pages | Free, simple, works great for static sites |

---

## Next Steps

✅ Phase 0 complete: Technology decisions made

1. **Create project structure** - Initialize package.json, tsconfig.json, folder structure
2. **Build Phase 1** - Implement core game logic modules
3. **Update architecture.md** - Reflect actual file structure created
