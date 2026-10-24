import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { TrainingSession } from '../src/training.js';
import { openingById } from '../src/openings.js';
import { selectionAction } from '../src/board.js';

function squareMove(chess, san) {
  const candidate = chess.moves({ verbose: true }).find((move) => move.san === san);
  return [candidate.from, candidate.to];
}

describe('TrainingSession', () => {
  it('rejects illegal moves without changing the position', () => {
    const chess = new Chess();
    const session = new TrainingSession(openingById('italian'), 'learn', chess);
    const fen = chess.fen();
    const result = session.playWhite('e1', 'e2');
    expect(result.type).toBe('illegal');
    expect(chess.fen()).toBe(fen);
  });

  it('allows recovery after an illegal move attempt in every mode without assistance', () => {
    for (const mode of ['learn', 'practice', 'mastery']) {
      const chess = new Chess();
      const session = new TrainingSession(openingById('italian'), mode, chess);
      const fen = chess.fen();
      expect(session.playWhite('e1', 'e2').type).toBe('illegal');
      expect(chess.fen()).toBe(fen);
      expect(session.assisted).toBe(false);
      expect(session.playWhite('e2', 'e4').type).toBe('correct');
    }
  });

  it('does not count selection or deselection as assistance in any mode', () => {
    for (const mode of ['learn', 'practice', 'mastery']) {
      const chess = new Chess();
      const session = new TrainingSession(openingById('italian'), mode, chess);
      const fen = chess.fen();
      const selected = selectionAction(chess, null, 'e2');
      expect(selected).toEqual({ type: 'select', square: 'e2' });
      expect(selectionAction(chess, selected.square, 'e2')).toEqual({ type: 'clear' });
      expect(session.assisted).toBe(false);
      expect(session.whiteMove).toBe(0);
      expect(session.mistakes).toBe(0);
      expect(chess.fen()).toBe(fen);
    }
  });

  it('treats legal e3 as an off-repertoire deviation, not an illegal move', () => {
    const chess = new Chess();
    const session = new TrainingSession(openingById('italian'), 'learn', chess);
    const fen = chess.fen();
    const result = session.playWhite('e2', 'e3');
    expect(result).toEqual({ type: 'deviation', attempted: 'e3', expected: 'e4' });
    expect(session.failed).toBe(true);
    expect(chess.fen()).toBe(fen);
  });

  it('finishes immediately after the fifth White move', () => {
    const chess = new Chess();
    const opening = openingById('italian');
    const session = new TrainingSession(opening, 'mastery', chess);
    const whiteMoves = opening.moves.filter((_, index) => index % 2 === 0);
    for (let index = 0; index < whiteMoves.length; index += 1) {
      const [from, to] = squareMove(chess, whiteMoves[index]);
      const result = session.playWhite(from, to);
      expect(result.type).toBe(index === 4 ? 'complete' : 'correct');
      if (index < 4) session.playBlack();
    }
    expect(session.finished).toBe(true);
  });

  it('marks practice and mastery assistance and resets a perfect streak', () => {
    const chess = new Chess();
    const session = new TrainingSession(openingById('italian'), 'practice', chess);
    session.requestHint();
    expect(session.assisted).toBe(true);
    session.restart();
    session.mode = 'mastery';
    session.requestHint();
    expect(session.assisted).toBe(true);
    session.assisted = true;
    session.requestHint();
  });
});
