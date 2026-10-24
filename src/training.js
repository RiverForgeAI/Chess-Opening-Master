export class TrainingSession {
  constructor(opening, mode = 'learn', chess, depth = 5, moves = null) {
    this.opening = opening;
    this.mode = mode;
    this.chess = chess;
    this.depth = depth;
    this.sequence = moves ?? opening.moves;
    this.whiteMove = 0;
    this.assisted = false;
    this.finished = false;
    this.failed = false;
    this.mistakes = 0;
    this.blackTimer = null;
  }

  get whiteMoves() { return this.sequence.filter((_, index) => index % 2 === 0).slice(0, this.depth); }
  get expectedMove() { return this.whiteMoves[this.whiteMove] ?? null; }

  playWhite(from, to, promotion = 'q') {
    if (this.finished || this.failed || this.chess.turn() !== 'w') return { type: 'blocked' };
    let move;
    try { move = this.chess.move({ from, to, promotion }); }
    catch { return { type: 'illegal' }; }
    if (!move) return { type: 'illegal' };

    const expected = this.expectedMove;
    if (move.san !== expected && move.lan && move.lan !== expected) {
      this.chess.undo();
      this.failed = true;
      this.mistakes += 1;
      return { type: 'deviation', attempted: move.san, expected };
    }

    const completedMove = this.whiteMove;
    this.whiteMove += 1;
    if (this.whiteMove === this.depth) {
      this.finished = true;
      return { type: 'complete', move, moveNumber: completedMove + 1, perfect: !this.assisted && this.mode === 'mastery' ? true : false };
    }

    return { type: 'correct', move, moveNumber: completedMove + 1 };
  }

  playBlack() {
    if (this.finished) return null;
    const replyIndex = this.whiteMove * 2 - 1;
    const san = this.sequence[replyIndex];
    const legal = this.chess.moves({ verbose: true }).find((move) => move.san === san);
    if (!legal) throw new Error(`Invalid Black reply: ${this.opening.id} ${san}`);
    return this.chess.move({ from: legal.from, to: legal.to, promotion: 'q' });
  }

  requestHint() { this.assisted = this.mode !== 'learn'; }
  restart() {
    this.chess.reset();
    this.whiteMove = 0;
    this.assisted = false;
    this.finished = false;
    this.failed = false;
  }
}
