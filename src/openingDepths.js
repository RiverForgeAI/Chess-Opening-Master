export const tenMoveLines = {
  italian: ['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d3','d6','O-O','O-O','Re1','a6','Bb3','Ba7','Nbd2','Re8','h3'],
  'ruy-lopez': ['e4','e5','Nf3','Nc6','Bb5','a6','Ba4','Nf6','O-O','Be7','Re1','b5','Bb3','d6','c3','O-O','d4','Bg4','h3'],
  scotch: ['e4','e5','Nf3','Nc6','d4','exd4','Nxd4','Nf6','Nc3','Bb4','Nxc6','bxc6','Bd3','d5','exd5','cxd5','O-O','O-O','Bg5'],
  'queens-gambit': ['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3','O-O','Nf3','h6','Bh4','b6','cxd5','exd5','Bd3','Bb7','O-O'],
  london: ['d4','d5','Nf3','Nf6','Bf4','e6','e3','Bd6','Bd3','O-O','O-O','b6','c4','Bb7','Nc3','Nbd7','Rc1','c5','Qe2'],
  vienna: ['e4','e5','Nc3','Nf6','f4','d5','Nf3','Nc6','Bb5','dxe4','Nxe4','Bd6','Nxf6+','Qxf6','Qe2','O-O','d3','Bg4','c3'],
  english: ['c4','e5','Nc3','Nf6','g3','d5','Bg2','Be6','Nf3','Nc6','O-O','Qd7','d3','O-O-O','Bg5','Be7','Bxf6','Bxf6','Rb1'],
  'king-indian-attack': ['Nf3','d5','g3','Nf6','Bg2','e6','O-O','Be7','d3','O-O','Nbd2','c5','e4','Nc6','Re1','b5','Nf1','Bb7','c3']
};

export const supportedDepths = Object.fromEntries(
  Object.keys(tenMoveLines).map((id) => [id, [5, 10]])
);

export function movesForDepth(opening, depth) {
  if (depth === 5) return opening.moves;
  if (depth === 10 && tenMoveLines[opening.id]?.length === 19) return tenMoveLines[opening.id];
  return null;
}
