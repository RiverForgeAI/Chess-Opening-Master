import repertoire from '../data/openings.json';

export const tenMoveLines = Object.fromEntries(
  repertoire.map(({ id, moves }) => [id, moves['10']])
);

export const supportedDepths = Object.fromEntries(
  Object.keys(tenMoveLines).map((id) => [id, [5, 10]])
);

export function movesForDepth(opening, depth) {
  if (depth === 5) return opening.moves;
  if (depth === 10 && tenMoveLines[opening.id]?.length === 19) return tenMoveLines[opening.id];
  return null;
}
