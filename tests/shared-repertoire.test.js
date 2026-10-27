import { describe, expect, it } from 'vitest';
import repertoire from '../data/openings.json';
import { openings } from '../src/openings.js';
import { tenMoveLines } from '../src/openingDepths.js';

describe('shared opening repertoire', () => {
  it('keeps the frontend openings and both move depths in sync with shared data', () => {
    expect(openings).toHaveLength(repertoire.length);

    for (const [index, source] of repertoire.entries()) {
      expect(openings[index]).toMatchObject({
        id: source.id,
        name: source.name,
        moves: source.moves['5']
      });
      expect(tenMoveLines[source.id]).toEqual(source.moves['10']);
    }
  });
});
