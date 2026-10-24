import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { LessonDisclosure } from '../src/lesson-disclosure.js';
import { TrainingSession } from '../src/training.js';
import { openingById } from '../src/openings.js';
import fs from 'node:fs';

describe('automatic Learn coaching', () => {
  it('opens only when the expected piece is selected in Learn mode', () => {
    const disclosure = new LessonDisclosure();
    const expected = { from: 'e2', to: 'e4' };
    expect(disclosure.shouldAutomaticallyOpen('learn', 'd2', expected, 0)).toBe(false);
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', expected, 0)).toBe(true);
  });

  it('does not reopen after dismissal for the same move, but resets for the next move', () => {
    const disclosure = new LessonDisclosure();
    const first = { from: 'e2', to: 'e4' };
    const next = { from: 'g1', to: 'f3' };
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', first, 0)).toBe(true);
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', first, 0)).toBe(false);
    expect(disclosure.shouldAutomaticallyOpen('learn', 'g1', next, 1)).toBe(true);
  });

  it('does not automatically open explanations in Practice or Mastery', () => {
    const expected = { from: 'e2', to: 'e4' };
    for (const mode of ['practice', 'mastery']) {
      expect(new LessonDisclosure().shouldAutomaticallyOpen(mode, 'e2', expected, 0)).toBe(false);
    }
  });

  it('manual dismissal leaves the board position unchanged', () => {
    const chess = new Chess();
    const initialPosition = chess.fen();
    const disclosure = new LessonDisclosure();
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', { from: 'e2', to: 'e4' }, 0)).toBe(true);
    expect(chess.fen()).toBe(initialPosition);
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', { from: 'e2', to: 'e4' }, 0)).toBe(false);
    expect(chess.fen()).toBe(initialPosition);
  });

  it('advances the move normally and prepares the next lesson after Black replies', () => {
    const chess = new Chess();
    const session = new TrainingSession(openingById('italian'), 'learn', chess);
    const disclosure = new LessonDisclosure();
    expect(disclosure.shouldAutomaticallyOpen('learn', 'e2', { from: 'e2', to: 'e4' }, session.whiteMove)).toBe(true);
    expect(session.playWhite('e2', 'e4').type).toBe('correct');
    expect(session.playBlack().san).toBe('e5');
    expect(disclosure.shouldAutomaticallyOpen('learn', 'g1', { from: 'g1', to: 'f3' }, session.whiteMove)).toBe(true);
    expect(session.whiteMove).toBe(1);
  });

  it('can reopen the panel manually and treats revealed explanations as assistance only outside Learn', () => {
    const session = new TrainingSession(openingById('italian'), 'practice', new Chess());
    const disclosure = new LessonDisclosure();
    expect(disclosure.shouldAutomaticallyOpen('practice', 'e2', { from: 'e2', to: 'e4' }, 0)).toBe(false);
    session.requestHint();
    expect(session.assisted).toBe(true);

    const learn = new TrainingSession(openingById('italian'), 'learn', new Chess());
    learn.requestHint();
    expect(learn.assisted).toBe(false);
  });

  it('uses inline explanations and clears overlays when manually dismissed', () => {
    const source = fs.readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
    expect(source).toContain('case \'why\': showTeaching(); break;');
    expect(source).toContain('case \'close-why\': {');
    expect(source).toMatch(/case 'close-why': \{[\s\S]*?clearTeachingPanel\(\);[\s\S]*?state\.board\?\.clearOverlay\(\);/);
    expect(source).toContain('state.session.requestHint()');
    expect(source).toContain('recommendedMoveForMode(state.mode');
  });
});
