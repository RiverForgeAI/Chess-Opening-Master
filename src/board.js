const symbols = { wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟' };
const files = 'abcdefgh';

export function destinationMarkers(chess, from, recommendedMove = null) {
  return chess.moves({ square: from, verbose: true }).map((move) => ({
    square: move.to,
    capture: Boolean(chess.get(move.to)),
    recommended: recommendedMove?.from === from && recommendedMove.to === move.to
  }));
}

export function recommendedMoveForMode(mode, move) {
  return mode === 'learn' ? move : null;
}

export function selectionAction(chess, selected, square) {
  const piece = chess.get(square);
  if (selected === square) return { type: 'clear' };
  if (piece?.color === 'w') return { type: 'select', square };
  if (selected && chess.moves({ square: selected, verbose: true }).some((move) => move.to === square)) {
    return { type: 'move', from: selected, to: square };
  }
  return selected ? { type: 'clear' } : { type: 'none' };
}

export class ChessBoard {
  constructor(root, chess, onMove, recommendedMove = null, onSelectionChange = () => {}, canSelect = () => true) {
    this.root = root;
    this.chess = chess;
    this.onMove = onMove;
    this.recommendedMove = recommendedMove;
    this.onSelectionChange = onSelectionChange;
    this.canSelect = canSelect;
    this.selected = null;
    this.lastMove = null;
    this.overlay = null;
  }

  render() {
    const board = this.chess.board();
    this.root.innerHTML = `<div class="board-shell"><div class="board-grid" role="grid" aria-label="Chessboard"></div><div class="board-overlay" aria-hidden="true"></div></div>`;
    const grid = this.root.querySelector('.board-grid');
    const destinations = this.selected ? destinationMarkers(this.chess, this.selected, this.recommendedMove) : [];
    board.forEach((rank, rankIndex) => rank.forEach((piece, fileIndex) => {
      const square = `${files[fileIndex]}${8 - rankIndex}`;
      const cell = document.createElement('button');
      const recommendedPiece = this.recommendedMove?.from === square;
      cell.className = `square ${(rankIndex + fileIndex) % 2 ? 'dark' : 'light'}${this.selected === square ? ' selected' : ''}${this.lastMove && (this.lastMove.from === square || this.lastMove.to === square) ? ' last' : ''}${recommendedPiece ? ' recommended-piece' : ''}`;
      cell.dataset.square = square;
      cell.setAttribute('role', 'gridcell');
      const destination = destinations.find((move) => move.square === square);
      cell.setAttribute('aria-label', `${square}${piece ? ` ${piece.color === 'w' ? 'white' : 'black'} ${piece.type}` : ''}${recommendedPiece ? ', recommended piece' : ''}${destination ? `, legal move${destination.recommended ? ', recommended repertoire move' : ''}` : ''}`);
      if (fileIndex === 0) cell.insertAdjacentHTML('beforeend', `<span class="coordinate rank">${8 - rankIndex}</span>`);
      if (rankIndex === 7) cell.insertAdjacentHTML('beforeend', `<span class="coordinate file">${files[fileIndex]}</span>`);
      if (piece) cell.insertAdjacentHTML('beforeend', `<span class="piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}">${symbols[piece.color + piece.type.toUpperCase()]}</span>`);
      if (destination) {
        cell.classList.add(destination.capture ? 'capture' : 'legal');
        if (destination.recommended) cell.classList.add('recommended');
      }
      if (this.recommendedMove?.to === square) cell.classList.add('recommended-target');
      cell.addEventListener('click', () => this.select(square));
      grid.appendChild(cell);
    }));
    this.renderOverlay();
  }

  select(square) {
    if (!this.canSelect()) return;
    const action = selectionAction(this.chess, this.selected, square);
    if (action.type === 'none') return;
    if (action.type === 'move') {
      const result = this.onMove(action.from, action.to);
      if (result !== 'same') this.selected = null;
      this.render();
      return;
    }
    this.selected = action.type === 'select' ? action.square : null;
    this.onSelectionChange(this.selected);
    this.render();
  }

  setOverlay(from, to, label, highlights = []) {
    this.overlay = { from, to, label, highlights };
    this.renderOverlay();
  }

  clearOverlay() { this.overlay = null; this.renderOverlay(); }

  renderOverlay() {
    const overlay = this.root.querySelector('.board-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    this.root.querySelectorAll('.teaching-square').forEach((square) => square.classList.remove('teaching-square'));
    const point = (square) => {
      const file = files.indexOf(square[0]);
      const rank = 8 - Number(square[1]);
      return { x: file * 12.5 + 6.25, y: rank * 12.5 + 6.25 };
    };
    for (const highlight of this.overlay?.highlights ?? []) {
      const square = this.root.querySelector(`[data-square="${highlight.square}"]`);
      square?.classList.add('teaching-square');
    }
    if (!this.overlay) return;
    const start = point(this.overlay.from), end = point(this.overlay.to);
    overlay.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs><line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" marker-end="url(#arrow)" /></svg><span class="annotation-label">${this.overlay.label}</span>`;
  }

  setLastMove(move) { this.lastMove = move; }
}
