import { beforeEach, describe, expect, it } from 'vitest';
import { loadProgress, recordCompletion, recordMistake } from '../src/storage.js';

const values = new Map();
globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)) };

describe('profile progress', () => {
  beforeEach(() => values.clear());
  it('keeps profiles separate', () => {
    recordCompletion('dad', 'italian', 'learn', false);
    expect(loadProgress('dad').openings['italian:5'].completions).toBe(1);
    expect(loadProgress('daughter').openings['italian:5']).toBeUndefined();
  });
  it('requires three perfect mastery runs', () => {
    for (let run = 0; run < 3; run += 1) recordCompletion('son', 'italian', 'mastery', false);
    expect(loadProgress('son').openings['italian:5'].mastery).toBe(true);
    recordMistake('son', 'italian', 3);
    expect(loadProgress('son').openings['italian:5'].streak).toBe(0);
  });
  it('does not count an assisted mastery attempt as perfect', () => {
    recordCompletion('daughter', 'italian', 'mastery', true);
    const record = loadProgress('daughter').openings['italian:5'];
    expect(record.perfectCompletions).toBe(0);
    expect(record.assistedAttempts).toBe(1);
    expect(record.streak).toBe(0);
  });
  it('tracks five and ten moves independently', () => {
    recordCompletion('dad', 'italian', 'mastery', false, 5);
    recordCompletion('dad', 'italian', 'mastery', false, 10);
    expect(loadProgress('dad').openings['italian:5'].completions).toBe(1);
    expect(loadProgress('dad').openings['italian:10'].completions).toBe(1);
  });
});
