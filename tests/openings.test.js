import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { openings } from '../src/openings.js';

for (const opening of openings) {
  describe(opening.name, () => {
    it('contains exactly five White moves and a valid chess.js line', () => {
      expect(opening.moves.filter((_, index) => index % 2 === 0)).toHaveLength(5);
      const chess = new Chess();
      for (const san of opening.moves) expect(chess.move(san)).toBeTruthy();
    });
  });
}
