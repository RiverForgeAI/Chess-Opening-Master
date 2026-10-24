# Chess Opening Master

A browser-based chess opening trainer for Dad, Son, and Daughter profiles. It teaches eight popular opening sequences with exactly five White moves, predefined Black replies, visual guidance, strict repertoire restart rules, and profile-specific progress stored locally in the browser.

## Features

- Premium Dad, Son, and Kitty Chess Academy profile selection
- Original SVG kitten mascot states and child-friendly Kitty Academy coaching
- Italian Game, Ruy Lopez, Scotch Game, Queen's Gambit, London System, Vienna Game, English Opening, and King's Indian Attack
- Learn, Practice, and Mastery modes
- Legal move validation through chess.js
- Automatic predefined Black replies
- Strict restart after a legal repertoire deviation
- Responsive SVG board overlays and child-friendly themes
- Versioned, browser-local progress and mastery tracking

## Technology

- HTML5, CSS3, and JavaScript ES modules
- Vite for development and GitHub Pages builds
- chess.js 1.4.0 for rules and move validation
- Vitest for unit and state tests

## Install and preview

```bash
npm install
npm run dev
```

Vite prints the local preview URL. Codespaces may expose the port automatically; open the forwarded HTTP port in your browser.

For the production build:

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

Tests cover opening notation and legality, five- and ten-move lines, Black replies, final-move completion, illegal moves, profile storage, teaching annotations, and mastery rules. Fifteen- and twenty-move options remain visible but disabled until complete curated sequences are available.

## Opening data

Opening records live in `src/openings.js`. Ten-move continuations live in `src/openingDepths.js`. Every supported `moves` array alternates SAN moves for White and Black. In a ten-move line, the exercise has ten White SAN entries and nine Black replies at odd indexes:

```js
moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3']
```

Every new line must be replayed successfully with chess.js. Flexible systems such as the London System and King's Indian Attack include representative-line language in their UI explanation. The data shape may support deeper arrays in a future phase, but only verified five-move lines are exposed today.

## Architecture

- `src/openings.js`: opening library and teaching copy
- `src/training.js`: repertoire and attempt state
- `src/board.js`: board rendering, selection, legal destinations, and overlays
- `src/storage.js`: versioned browser persistence and progress calculations
- `src/profiles.js`: family profile metadata
- `src/main.js`: screen flow and browser interactions
- `src/styles.css`: responsive profile themes

`TrainingSession` uses chess.js for board state and checks a user's SAN against the repertoire. Its `depth` controls the final White move without changing existing move-one-to-nine behavior in ten-move lines. A legal deviation leaves the explanation visible until the player acknowledges it, then resets the session to move 1.

`teaching.js` generates profile-specific lessons for the current replayed position. The training screen expands these lessons inside the coaching panel; it does not replace or cover the chessboard. It identifies the recommended SAN, source and destination squares, strategic purpose, affected pieces or squares, opening plan, common misconceptions, and board annotations. Orange highlights describe squares after the proposed move. No engine evaluation is used.

Validate added lines from the start position. A ten-move array must contain 19 SAN entries: ten White moves and nine Black replies. Run `npm test`, which validates both the first five moves and supported continuations. Illegal moves are rejected without changing position.

Black replies are selected from the opening's alternating SAN array. The UI briefly locks input, plays one predefined reply after a delay, and only then unlocks White's next turn. No chess engine is used.

## Training modes

- Learn shows or highlights the recommended move and teaching explanation.
- Practice allows hints and marks assisted attempts.
- Mastery hides move assistance and requires three consecutive unassisted perfect completions.

An assisted Mastery attempt resets that opening's current perfect-run streak and cannot earn mastery progress.

## Progress and storage

Progress is stored separately under versioned keys for each profile in browser localStorage. Keys use the opening ID and depth, such as `italian:5` or `italian:10`, so depth-specific attempts and mastery never overwrite one another. Existing schema 1 records are migrated to schema 2 while retaining legacy five-move progress.

Progress remains on the current browser and device; private browsing or clearing browser data may remove it, and progress does not sync between devices.

## GitHub Pages

Vite is configured with a relative base path. Build the site with `npm run build`, then publish the contents of `dist/` to GitHub Pages. No deployment or remote publishing is performed automatically.

## Known limitations

- This is a local-device Phase 1 application; accounts, cloud sync, Python, and Supabase are not included.
- Stockfish and full game play are not included; Black is limited to curated repertoire replies.
- Board interaction currently uses tap selection and tap destination.
- Only five- and ten-move depths are implemented. Fifteen- and twenty-move options are intentionally disabled.
- Additional sequence depth should be added only after chess.js validates every new move and meaningful teaching data exists for every move.
- Visual browser screenshots were not captured in this environment; automated tests and the production build have been run.
