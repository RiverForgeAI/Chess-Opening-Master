import { Chess } from 'chess.js';

const pieces = { pawns: ['e-pawn'], knight: ['king knight', 'queen knight'], bishop: ['light-squared bishop'], rook: ['king rook'] };

export function teachingFor(opening, moves, moveIndex, profile = 'dad') {
  const chess = new Chess();
  for (let index = 0; index < moveIndex * 2; index += 1) chess.move(moves[index]);
  const san = moves[moveIndex * 2];
  const probe = new Chess(chess.fen());
  const move = probe.move(san);
  const strategy = specificLesson(opening, moveIndex, san) ?? defaultLesson(opening, moveIndex, san);
  const dad = `${strategy.idea} ${strategy.plan}`;
  const son = `${strategy.idea} This directly supports ${strategy.plan.toLowerCase()}`;
  const daughter = strategy.simple;
  const explanation = profile === 'daughter' ? daughter : profile === 'son' ? son : dad;
  const highlights = highlightSquares(san, move?.to);
  return { san, idea: strategy.idea, why: strategy.why, affected: strategy.affected, plan: strategy.plan, misconception: strategy.misconception, simple: strategy.simple, explanation, highlights,
    move: move ? { from: move.from, to: move.to } : null, legend: [{ color: 'green', label: 'Recommended move' }, { color: 'orange', label: 'Important square' }] };
}

function highlightSquares(san, destination) {
  const map = { e4: ['d5','f5'], d4: ['c5','e5'], c4: ['d5','b5'], Nf3: ['e5','g5'], Nc3: ['d5','e4'], Bc4: ['f7'], Bb5: ['e8'], Bf4: ['c7'], Bg2: ['d5'], 'g3': ['d6'], f4: ['e5'], d3: ['c4'], 'O-O': ['g1'] };
  return (map[san] ?? (destination ? [destination] : [])).map((square) => ({ square, color: san === destination || san === 'O-O' ? 'orange' : 'orange' }));
}

function specificLesson(opening, index, san) {
  if (opening.id === 'italian' && index === 0) return {
    idea: 'Claim central space.', why: 'White advances the e-pawn to e4, gaining central influence and creating room for the bishop and queen.', affected: 'The pawn on e4 gains influence toward d5 and f5, while e1 to e-file development paths become available.', plan: 'Support Nf3 and Bc4 development, then build a central and kingside attack only when it is safely coordinated.', misconception: 'e4 claims space; it does not permanently attack d5 or f5 as targets for an immediate tactic.', simple: 'Your pawn hops to e4 and helps control the busy middle, making room for your bishop and queen!'
  };
  if (opening.id === 'italian' && index === 1) return {
    idea: 'Develop toward the centre.', why: 'Nf3 develops the king knight while also preparing to support the centre.', affected: 'The f3 knight influences central squares, especially e5 and d4, and opens the connection between king and rook.', plan: 'Develop Bc4 and prepare the central d4 advance in the later Giuoco Piano setup.', misconception: 'This is active development, not a direct capture of Black’s central pawn.', simple: 'Your knight jumps from g1 to f3 so it is closer to the centre and helps protect your position!'
  };
  if (opening.id === 'italian' && index === 2) return {
    idea: 'Activate the light-squared bishop.', why: 'Bc4 places the bishop on a long diagonal aimed toward the kingside, especially the vulnerable f7 square.', affected: 'The bishop controls the c4-f7 diagonal, while the c1-bishop-f2 lines begin to connect.', plan: 'Develop naturally, castle when safe, and support the central pawn structure.', misconception: 'The bishop may put useful pressure on f7, but its development does not mean f7 is already lost.', simple: 'Your bishop goes to c4 and watches along a long purple path toward Black’s kingside!'
  };
  if (opening.id === 'italian' && index === 3 && san === 'c3') return {
    idea: 'Prepare the d4 central advance.', why: 'White plays c3 to prepare the coming d4 pawn advance. That advance challenges Black’s e5 pawn and gains space in the centre.', affected: 'The c3 pawn supports d4 and gives White a stable base for the central push; Black’s e5 pawn becomes the forward object of challenge.', plan: 'After development and care around Black’s reactions, White aims to play d4, then use the open centre for active pieces.', misconception: 'c3 is useful preparation for the centre, not an immediate threat to e5. The d-pawn can advance only when the position supports it.', simple: 'Your pawn moves to c3. It helps you prepare to push the d-pawn to d4, so you can challenge Black’s pawns in the middle!'
  };
  if (opening.id === 'italian' && index === 4) return {
    idea: 'Support central occupation.', why: 'd3 reinforces the e4 pawn and completes a quiet, solid Italian setup when an immediate d4 advance is not appropriate.', affected: 'The d3 pawn controls e4 and c4 support while defining a stable pawn triangle with c2 and e4.', plan: 'Develop the queenside, keep the king safe, and determine later when c4 or a central break is useful.', misconception: 'd3 chooses a quieter plan; it is not the same as playing d4 immediately.', simple: 'Your pawn goes to d3 to support the centre and build a safe, cosy plan for later moves!'
  };
  return null;
}

function defaultLesson(opening, index, san) {
  const ideas = [
    { idea: 'Claim useful central space.', why: 'The pawn immediately creates influence in the centre and gains room for the opening pieces.', affected: 'The central pawn and the adjoining development paths.', plan: 'Opening the centre while developing quickly.', misconception: 'A central pawn move is a claim on territory, not a guarantee that the pawn is safe without support.', simple: 'This pawn steps into the busy middle and makes space for your other pieces!' },
    { idea: 'Challenge the centre again with a knight.', why: 'The knight develops toward the centre and begins to coordinate the kingside pieces.', affected: 'The king knight and the central e5 or d5 squares.', plan: 'Fast, coordinated development toward the centre.', misconception: 'Developing a knight is not just a move near the king; its active central square matters.', simple: 'Your knight hops toward the middle where it can guard more squares!' },
    { idea: 'Activate the bishop on its useful diagonal.', why: 'This bishop gains scope along a central diagonal while preparing connection with the rest of the development plan.', affected: 'The bishop, its long diagonal, and the corresponding centre pressure.', plan: 'Completing a coordinated piece setup.', misconception: 'A bishop is strongest when its diagonal is useful; simply moving it does not improve its activity automatically.', simple: 'Your bishop takes a long path to watch important squares!' },
    { idea: 'Support or challenge the central structure.', why: 'The move reinforces the intended pawn formation and creates defined targets for the following pieces.', affected: 'The centre, supporting pawns, and the developed minor pieces.', plan: 'A stable centre that can support kingside development.', misconception: 'Pawn moves are commits: White should not assume every pawn capture is needed in every variation.', simple: 'This move helps your centre stand strong and keep working together!' },
    { idea: 'Complete safe early development.', why: 'This move improves piece safety and connects the centre to the final safe king position.', affected: 'The king, the key supporting piece, and centre coordination.', plan: 'Converting development into a safe, playable middle game.', misconception: 'Castling, development, and centre control are related goals, but they should be evaluated together.', simple: 'We finish early setup by keeping the king safe or helping the pieces connect!' }
  ];
  return ideas[Math.min(index, ideas.length - 1)];
}
