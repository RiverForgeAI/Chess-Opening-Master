import { describe, expect, it } from 'vitest';
import { openings } from '../src/openings.js';
import { movesForDepth } from '../src/openingDepths.js';
import { strategyAnalysisFor } from '../src/strategy-analysis.js';

describe('strategy reference positions', () => {
  for (const opening of openings) {
    it(`${opening.name} has distinct, position-specific 5- and 10-move analysis`, () => {
      const five = strategyAnalysisFor(opening, 5, movesForDepth(opening, 5));
      const ten = strategyAnalysisFor(opening, 10, movesForDepth(opening, 10));

      for (const field of ['focus', 'centre', 'black', 'immediate', 'future', 'break', 'next', 'transition']) {
        expect(five[field], `${field} should change by depth`).not.toBe(ten[field]);
      }
      expect(five.boardPosition).not.toBe(ten.boardPosition);
      expect(five.development).toContain('After White’s 5th move');
      expect(ten.development).toContain('After White’s 10th move');
      expect(five.priorities).toHaveLength(3);
      expect(ten.priorities).toHaveLength(3);
    });
  }

  it('describes the actual developed and undeveloped pieces in the Italian five-move position', () => {
    const italian = openings.find((opening) => opening.id === 'italian');
    const analysis = strategyAnalysisFor(italian, 5, movesForDepth(italian, 5));

    expect(analysis.development).toContain('knight on f3');
    expect(analysis.development).toContain('bishop on c4');
    expect(analysis.development).toContain('bishop on c1');
    expect(analysis.development).toContain('king remains on e1');
  });
});
