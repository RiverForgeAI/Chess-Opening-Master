# Chess Opening Master accuracy audit

**Reviewed:** 2026-10-24  
**Starting revision:** `0a37db2`

## Scope and result

All eight openings were checked at both supported training depths: five and ten White moves. The supplied SAN sequences were replayed from the standard position with `chess.js`; all moves were legal. The lines remain unchanged. Each fits its named opening family and represents a playable developing plan, but several ten-move continuations are illustrative repertoire choices, not claims to be the only or best theoretical line.

The eight accessible Chess.com opening guides listed below were used to cross-check opening identities, defining ideas, and representative early move orders. They do **not** independently establish every move in each longer line. No engine evaluation or exhaustive theory comparison was performed. The Lichess Masters Explorer endpoint could not be fetched in this audit (HTTP 401), so exact master-game frequency and the precise longer continuations remain unverified by an independent game database.

## Lines and findings

Notation is standard SAN. Each five-move line ends after White's fifth move; each ten-move line ends after White's tenth move.

### Italian Game

- **5 White moves:** `1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d3`
- **10 White moves:** `1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Re1 a6 8.Bb3 Ba7 9.Nbd2 Re8 10.h3`
- **Finding/correction:** This is a quiet Giuoco Piano / Giuoco Pianissimo setup. The opening description now reflects the quiet central plan rather than promising a fast kingside attack. The explanation for **8.Bb3** now says that it is a voluntary bishop reposition after ...a6: the a-pawn attacks b5, not the bishop on c4. Bb3 preserves the bishop's diagonal toward f7; it is not a forced retreat.
- **Cross-check:** [Chess.com Italian Game guide](https://www.chess.com/openings/Italian-Game) identifies the Italian after 1.e4 e5 2.Nf3 Nc6 3.Bc4 and describes the Giuoco Pianissimo as a d3 setup, including the c3/Nf6/d3 move order.
- **Not independently verified:** The source does not give this exact ten-move continuation or specifically explain 8.Bb3 after ...a6. That explanation is checked against the board position and piece/pawn geometry, not an external annotated game.

### Ruy Lopez (Spanish Opening)

- **5 White moves:** `1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O`
- **10 White moves:** `1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.d4 Bg4 10.h3`
- **Finding/correction:** The name and indirect pressure on e5 through the c6-knight are accurate. Teaching now distinguishes the bishop's retreat from a capture and explains c3/d4 and h3 in their actual positions.
- **Cross-check:** [Chess.com Ruy Lopez guide](https://www.chess.com/openings/Ruy-Lopez-Opening) gives the same opening start and main-line move order through 5.O-O, and describes ...Be7 as a Closed Variation setup.
- **Not independently verified:** The exact continuation after 5.O-O, including the later ...Bg4/h3 sequence.

### Scotch Game

- **5 White moves:** `1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3`
- **10 White moves:** `1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 Bb4 6.Nxc6 bxc6 7.Bd3 d5 8.exd5 cxd5 9.O-O O-O 10.Bg5`
- **Finding/correction:** The Scotch is correctly named by its defining 3.d4 central challenge. The explanations now identify the central exchanges, the c-pawn recapture, and the pressure Bg5 places on the f6-knight; the previous generic description of Nc3 as merely another defender was inadequate.
- **Cross-check:** [Chess.com Scotch Game guide](https://www.chess.com/openings/Scotch-Game) confirms the opening start and the 4.Nxd4 Nf6 structure.
- **Not independently verified:** The exact 5...Bb4 continuation and the remainder of this ten-move line.

### Queen's Gambit

- **5 White moves:** `1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3`
- **10 White moves:** `1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 h6 7.Bh4 b6 8.cxd5 exd5 9.Bd3 Bb7 10.O-O`
- **Finding/correction:** This is the Queen's Gambit Declined, not the Accepted. The opening description now avoids implying that White usually gives up a pawn permanently: c4 challenges d5, and Black cannot safely hold the extra pawn without concessions. Explanations now distinguish Bg5 pressure from a pin to the king while ...Be7 blocks the diagonal.
- **Cross-check:** [Chess.com Queen's Gambit guide](https://www.chess.com/openings/Queens-Gambit) confirms 1.d4 d5 2.c4, explains ...e6 as the Queen's Gambit Declined, and notes that the gambited pawn generally cannot be retained safely.
- **Not independently verified:** The precise ten-move QGD continuation, especially the ...b6/Bb7 setup.

### London System

- **5 White moves:** `1.d4 d5 2.Nf3 Nf6 3.Bf4 e6 4.e3 Bd6 5.Bd3`
- **10 White moves:** `1.d4 d5 2.Nf3 Nf6 3.Bf4 e6 4.e3 Bd6 5.Bd3 O-O 6.O-O b6 7.c4 Bb7 8.Nc3 Nbd7 9.Rc1 c5 10.Qe2`
- **Finding/correction:** This is a representative London setup, not the only move order. The teaching now identifies Bf4 outside the e-pawn chain, the central c4 challenge, and Rc1 as a rook behind the c-pawn; it no longer calls the c-file open.
- **Cross-check:** [Chess.com London System guide](https://www.chess.com/openings/London-System) confirms the Bf4-before-e3 defining setup and describes 2.Bf4 as more accurate than 2.Nf3 in its current theory discussion. This repertoire's 2.Nf3 move order is still a recognized London setup, but is not presented as the most accurate move order.
- **Not independently verified:** The exact Bd6/Bd3 ten-move line.

### Vienna Game

- **5 White moves:** `1.e4 e5 2.Nc3 Nf6 3.f4 d5 4.Nf3 Nc6 5.Bb5`
- **10 White moves:** `1.e4 e5 2.Nc3 Nf6 3.f4 d5 4.Nf3 Nc6 5.Bb5 dxe4 6.Nxe4 Bd6 7.Nxf6+ Qxf6 8.Qe2 O-O 9.d3 Bg4 10.c3`
- **Finding/correction:** The Vienna is correctly identified by 2.Nc3; this is a sharp Vienna/Falkbeer central-counterstrike line, not a generic quiet Vienna setup. Teaching now describes the f-pawn offer, the central recapture, and the check on 7.Nxf6+.
- **Cross-check:** [Chess.com Vienna Game guide](https://www.chess.com/openings/Vienna-Game) confirms 1.e4 e5 2.Nc3 and identifies 3...Nf6 as the Falkbeer Variation and 3.f4 as the Vienna Gambit idea.
- **Not independently verified:** The exact 3...d5 continuation through 10.c3.

### English Opening

- **5 White moves:** `1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.Bg2 Be6 5.Nf3`
- **10 White moves:** `1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.Bg2 Be6 5.Nf3 Nc6 6.O-O Qd7 7.d3 O-O-O 8.Bg5 Be7 9.Bxf6 Bxf6 10.Rb1`
- **Finding/correction:** The English name is accurate; this is one representative, transpositional English line. The teaching now explains the fianchetto, the bishop-for-knight exchange, and the rook's support for queenside expansion without implying that every English game follows this setup.
- **Cross-check:** [Chess.com English Opening guide](https://www.chess.com/openings/English-Opening) confirms 1.c4 as the flank-opening start, the ...e5 reversed-Sicilian family, and the English's transpositional nature.
- **Not independently verified:** The exact Be6/Qd7/queenside-castling continuation.

### King's Indian Attack

- **5 White moves:** `1.Nf3 d5 2.g3 Nf6 3.Bg2 e6 4.O-O Be7 5.d3`
- **10 White moves:** `1.Nf3 d5 2.g3 Nf6 3.Bg2 e6 4.O-O Be7 5.d3 O-O 6.Nbd2 c5 7.e4 Nc6 8.Re1 b5 9.Nf1 Bb7 10.c3`
- **Finding/correction:** This is a representative King's Indian Attack move order. Teaching now explains that 1.Nf3 alone does not define the KIA, then connects g3/Bg2, castling, d3, and the later e4 break to the actual setup.
- **Cross-check:** [Chess.com King's Indian Attack guide](https://www.chess.com/openings/Kings-Indian-Attack) identifies 1.Nf3 d5 2.g3 as a specific KIA move order and describes the d3/g3/e4 setup and kingside fianchetto.
- **Not independently verified:** The exact ten-move continuation, particularly the ...b5/...Bb7 queenside setup.

## Teaching-text and `undefined` bug

The feedback path previously used five-element arrays for both family-specific guidance and the daughter's generic text. At ten-move depth, moving on to White's sixth move indexed past those arrays, producing a visible `undefined`. The shared teaching function now uses ten position-specific White-move explanations for every opening and profile; it fails explicitly if a lesson is missing instead of returning empty or success-shaped fallback text. The Show Me Why panel and inline feedback now use the same teaching source.

The explanations were revised where the old copy was misleading or too generic, notably Italian 8.Bb3, the Queen's Gambit pawn offer, London Rc1, the Scotch exchanges, and the Vienna's central counterstrike. Sequences themselves were not changed.

## Verification performed

- `chess.js` legality checks: all eight five-move lines and all eight ten-move lines replay legally from the standard position.
- Unit tests: `npm test` — **62 passed**.
- Browser tests (Playwright): `npm test` — **2 passed**, including a 10-move Italian Learn run through the sixth White-move explanation and a check for `undefined`/`null`.
- Production build: `npm run build` — **passed**.
- `git diff --check` — **passed**.

Exact theoretical status beyond the cited opening definitions and move-order examples remains the principal limitation: these are legal, coherent representative lines, but this audit did not prove engine-best play or independently verify each full ten-move continuation against a published master game.
