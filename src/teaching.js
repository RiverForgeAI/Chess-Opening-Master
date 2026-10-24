import { Chess } from 'chess.js';

const pieceNames = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' };
const highlightMap = {
  e4: ['d5', 'f5'], d4: ['c5', 'e5'], c4: ['d5', 'b5'], Nf3: ['e5', 'g5'],
  Nc3: ['d5', 'e4'], Bc4: ['f7'], Bb5: ['e8'], Bb3: ['f7'], Bf4: ['c7'],
  Bg2: ['d5'], g3: ['d6'], f4: ['e5'], d3: ['c4'], 'O-O': ['g1']
};

export function teachingFor(opening, moves, moveIndex, profile = 'dad') {
  const detail = opening.movesDetail?.[moveIndex];
  if (typeof detail !== 'string' || !detail.trim()) {
    throw new Error(`Missing teaching text for ${opening.id} White move ${moveIndex + 1}`);
  }
  const simple = opening.simpleDetail?.[moveIndex];
  if (typeof simple !== 'string' || !simple.trim()) {
    throw new Error(`Missing simple teaching text for ${opening.id} White move ${moveIndex + 1}`);
  }

  const chess = new Chess();
  for (let index = 0; index < moveIndex * 2; index += 1) chess.move(moves[index]);
  const san = moves[moveIndex * 2];
  const probe = new Chess(chess.fen());
  const move = probe.move(san);
  const plan = `Longer-term aim: ${opening.objective}.`;
  const explanation = profile === 'daughter'
    ? simple
    : profile === 'son'
      ? `${detail} This directly supports ${opening.objective.toLowerCase()}.`
      : `${detail} ${plan}`;
  const affected = `The ${pieceNames[move.piece]} moves from ${move.from} to ${move.to}; its new square changes the piece activity in this position.`;
  return {
    san,
    idea: detail.split(/[.;]/, 1)[0],
    why: detail,
    affected,
    plan,
    misconception: 'This is a useful move in this line, not a forced tactic or the only playable choice.',
    simple,
    explanation,
    highlights: highlightSquares(san),
    move: { from: move.from, to: move.to },
    legend: [{ color: 'green', label: 'Recommended move' }, { color: 'orange', label: 'Important square' }]
  };
}

function highlightSquares(san) {
  return (highlightMap[san] ?? []).map((square) => ({ square, color: 'orange' }));
}
