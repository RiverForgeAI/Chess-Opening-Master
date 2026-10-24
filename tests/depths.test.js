import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { openings } from '../src/openings.js';
import { tenMoveLines, supportedDepths, movesForDepth } from '../src/openingDepths.js';
import { teachingFor } from '../src/teaching.js';

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

    it('provides complete, non-undefined teaching text at every supported depth', () => {
      for (const depth of [5, 10]) {
        const moves = movesForDepth(opening, depth);
        for (let moveIndex = 0; moveIndex < depth; moveIndex += 1) {
          for (const profile of ['dad', 'son', 'daughter']) {
            const lesson = teachingFor(opening, moves, moveIndex, profile);
            expect(lesson.explanation.trim()).not.toBe('');
            expect(lesson.explanation).not.toMatch(/undefined|null/i);
            expect(lesson.simple.trim()).not.toBe('');
            expect(lesson.simple).not.toMatch(/undefined|null/i);
            expect(lesson.why.trim()).not.toBe('');
            expect(lesson.affected.trim()).not.toBe('');
            expect(lesson.plan.trim()).not.toBe('');
            expect(lesson.move).toBeTruthy();
          }
        }
      }
    });
  });
}
