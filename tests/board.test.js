import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { destinationMarkers, recommendedMoveForMode, selectionAction } from '../src/board.js';

describe('legal destination markers', () => {
  it('shows both e3 and recommended e4 as legal from e2', () => {
    const chess = new Chess();
    const markers = destinationMarkers(chess, 'e2', { from: 'e2', to: 'e4' });
    expect(markers.map(({ square }) => square)).toEqual(['e3', 'e4']);
    expect(markers.filter(({ recommended }) => recommended).map(({ square }) => square)).toEqual(['e4']);
  });

  describe('board selection transitions', () => {
    it('selects and deselects a White piece', () => {
      const chess = new Chess();
      expect(selectionAction(chess, null, 'e2')).toEqual({ type: 'select', square: 'e2' });
      expect(selectionAction(chess, 'e2', 'e2')).toEqual({ type: 'clear' });
    });

    it('switches directly between White pieces', () => {
      const chess = new Chess();
      expect(selectionAction(chess, 'e2', 'd2')).toEqual({ type: 'select', square: 'd2' });
    });

    it('clears selection on an empty square that is not a legal destination', () => {
      const chess = new Chess();
      expect(selectionAction(chess, 'e2', 'a3')).toEqual({ type: 'clear' });
    });

    it('allows selecting a piece with no legal moves and replacing that selection', () => {
      const chess = new Chess('7k/8/8/8/8/P7/P7/K7 w - - 0 1');
      expect(chess.moves({ square: 'a2' })).toEqual([]);
      expect(selectionAction(chess, null, 'a2')).toEqual({ type: 'select', square: 'a2' });
      expect(selectionAction(chess, 'a2', 'a1')).toEqual({ type: 'select', square: 'a1' });
    });

    it('returns a move only when the destination is legal, including after switching pieces', () => {
      const chess = new Chess();
      const selection = selectionAction(chess, 'e2', 'd2');
      expect(selection).toEqual({ type: 'select', square: 'd2' });
      expect(selectionAction(chess, selection.square, 'd3')).toEqual({ type: 'move', from: 'd2', to: 'd3' });
      expect(chess.move({ from: 'd2', to: 'd3' }).san).toBe('d3');
    });
  });

  it('does not reveal a recommended move outside Learn mode', () => {
    const chess = new Chess();
    const markers = destinationMarkers(chess, 'e2');
    expect(markers.map(({ square }) => square)).toEqual(['e3', 'e4']);
    expect(markers.every(({ recommended }) => !recommended)).toBe(true);
  });

  it('provides repertoire markers only in Learn mode', () => {
    const move = { from: 'e2', to: 'e4' };
    expect(recommendedMoveForMode('learn', move)).toEqual(move);
    expect(recommendedMoveForMode('practice', move)).toBeNull();
    expect(recommendedMoveForMode('mastery', move)).toBeNull();
  });
});
