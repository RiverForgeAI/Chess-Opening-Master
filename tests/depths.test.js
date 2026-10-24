import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { openings } from '../src/openings.js';
import { tenMoveLines, supportedDepths, movesForDepth } from '../src/openingDepths.js';
import { TeachingFor } from '../src/teaching.js';

for (const opening of openings) {
  describe(`${opening.name} depths`, () => {
    it('keeps five moves legal and offers a legal ten-move extension', () => {
      const chess5 = new Chess();
      for (const san of opening.moves) expect(chess5.move(san)).toBeTruthy();
      expect(opening.moves.filter((_, index) => index % 2 === 0)).toHaveLength(5);

      const chess10 = new Chess();
      const moves = movesForDepth(opening, 10);
      expect(moves).toHaveLength(19);
      for (const san of moves) expect(chess10.move(san)).toBeTruthy();
      expect(moves.filter((_, index) => index % 2 === 0)).toHaveLength(10);
      expect(supportedDepths[opening.id]).toEqual([5, 10]);
    });
  });
}
