import './styles.css';
import './enhancements.css';
import './refinement.css';
import { Chess } from 'chess.js';
import { openings, openingById } from './openings.js';
import { profiles } from './profiles.js';
import { ChessBoard, recommendedMoveForMode } from './board.js';
import { TrainingSession } from './training.js';
import { LessonDisclosure } from './lesson-disclosure.js';
import { loadProgress, recordCompletion, recordMistake, loadTheme } from './storage.js';
import { movesForDepth, supportedDepths } from './openingDepths.js';
import { teachingFor } from './teaching.js';

const app = document.querySelector('#app');
let state = { profile: null, view: 'welcome', opening: null, mode: null, depth: 5, session: null, board: null, chess: new Chess(), busy: false, assisted: false, teachingOpen: false, lessonDisclosure: new LessonDisclosure() };

const html = (value) => value ?? '';
const selectedExpected = () => state.session?.expectedMove;
function expectedSquare(san) {
  try {
    const test = new Chess();
    for (let index = 0; index < state.session.whiteMove * 2; index += 1) {
      const move = test.move(state.session.sequence[index]);
      if (!move) return null;
    }
    const move = test.move(san);
    return move ? { from: move.from, to: move.to } : null;
  } catch { return null; }
}
function profileName(id = state.profile) { return profiles[id]?.title ?? ''; }
function openingName() { return state.opening?.name ?? ''; }

function header() {
  return `<header class="topbar"><button class="brand" data-action="library">Chess Opening Master</button>${state.profile ? `<div class="top-actions"><span class="profile-chip">${profileName()}</span><button class="text-button" data-action="progress">Progress</button><button class="text-button" data-action="profile">Change profile</button></div>` : ''}</header>`;
}

function welcome() {
  document.body.dataset.theme = 'welcome';
  app.innerHTML = `<main class="welcome page-shell">${header()}<section class="welcome-hero"><div class="hero-copy"><p class="eyebrow">A family chess learning studio</p><h1>Chess Opening Master</h1><p class="subtitle">Learn the moves. Understand the strategy. Master your openings.</p><div class="hero-path"><span>Understand</span><span>Practise</span><span>Remember</span><span>Master</span></div></div><div class="hero-board" aria-hidden="true"><span>♜</span><span>♞</span><span>♝</span><span>♛</span><span>♚</span><span>♝</span><span>♞</span><span>♜</span></div></section><p class="profile-heading">Choose your chess player</p><section class="profile-grid welcome-profiles" aria-label="Family profiles">${Object.values(profiles).map(p => profileCard(p.id)).join('')}</section><p class="storage-note">Progress is saved in this browser only and is not synced between devices.</p></main>`;
}

function profileCard(id, featured = false) {
  const profile = profiles[id];
  const mascot = id === 'daughter' ? kittenSvg('welcome') : `<div class="profile-avatar ${id}" aria-hidden="true"><span>${id === 'dad' ? '♔' : '♞'}</span><b>${id === 'dad' ? 'EX' : 'XP'}</b></div>`;
  const copy = id === 'dad'
    ? { family: 'Dad — Executive Chess', subtitle: 'Strategic. Polished. Precise.', action: 'Play as Dad' }
    : id === 'son'
      ? { family: 'Son — Champion Chess', subtitle: 'Train smarter. Play stronger.', action: 'Play as Son' }
      : { family: 'Daughter — Kitty Chess Academy', subtitle: 'A magical chess adventure with your kitten coach.', action: 'Play as Daughter' };
  return `<button class="profile-card ${featured ? 'featured' : ''} ${id}" data-profile="${id}">${mascot}<div class="profile-copy"><strong><small>${copy.family.split(' — ')[0]}</small>${copy.family.split(' — ')[1]}</strong><span>${copy.subtitle}</span><em>${copy.action}</em></div></button>`;
}

function library() {
  document.body.dataset.theme = state.profile;
  const progress = loadProgress(state.profile);
  app.innerHTML = `<main class="page-shell">${header()}<section class="library-heading"><div><p class="eyebrow">Opening library</p><h1>Choose an opening</h1></div><div class="mode-summary">5 White moves · All profiles</div></section><div class="opening-grid">${openings.map(opening => {
    const record = progress.openings[`${opening.id}:10`] ?? progress.openings[`${opening.id}:5`];
    return `<article class="opening-card"><div class="card-top"><span class="difficulty">${opening.difficulty}</span>${record?.mastery ? '<span class="mastered">Mastered</span>' : ''}</div><h2>${opening.name}</h2><p>${opening.description}</p><div class="objective"><span>Objective</span>${opening.objective}</div><button class="primary" data-opening="${opening.id}">Start training</button></article>`;
  }).join('')}</div></main>`;
}

function modes() {
  document.body.dataset.theme = state.profile;
  const depths = [5,10,15,20];
  app.innerHTML = `<main class="page-shell">${header()}<section class="mode-layout"><aside class="opening-intro"><button class="back" data-action="library">← Opening library</button><p class="eyebrow">${html(state.opening.difficulty)}</p><h1>${openingName()}</h1><p>${state.opening.description}</p><div class="objective"><span>Strategy</span>${state.opening.objective}</div>${state.opening.representativeVariation ? `<p class="note">${state.opening.representativeVariation}.</p>` : ''}</aside><section><p class="eyebrow">Training mode</p><h2>How do you want to practise?</h2><div class="mode-grid"><button class="mode-card" data-mode="learn"><strong>Learn</strong><span>See the guided move and understand why it works.</span></button><button class="mode-card" data-mode="practice"><strong>Practice</strong><span>Recall the moves, with hints available.</span></button><button class="mode-card" data-mode="mastery"><strong>Mastery</strong><span>No help. Complete three perfect runs in a row.</span></button></div><section class="depth-picker" aria-labelledby="depth-title"><div><p class="eyebrow">Training depth</p><h3 id="depth-title">How many moves will you master?</h3></div><div class="depth-options">${depths.map(depth => { const available = supportedDepths[state.opening.id]?.includes(depth); return `<button class="depth-option ${state.depth === depth && available ? 'selected' : ''}" data-depth="${depth}" ${available ? '' : 'disabled'}><strong>${depth}</strong><span>${depth === 5 ? 'Beginner' : depth === 10 ? 'Developing' : depth === 15 ? 'Advanced' : 'Extended'}</span><small>${available ? 'Available' : 'Not yet available'}</small></button>`; }).join('')}</div></section></section></section></main>`;
}

function kittenSvg(stateName = 'welcome') {
  const mouths = { welcome: '⌣', thinking: '·ᴗ·', celebrating: 'ᴗ', comforting: '⌢', explaining: 'ᴗ' };
  return `<svg class="kitten-svg state-${stateName}" viewBox="0 0 220 190" role="img" aria-label="Adorable ${stateName} kitten mascot"><g class="ears"><path d="M48 64 35 17 85 43Z"/><path d="m172 64 13-47-50 26Z"/></g><g class="body"><ellipse cx="110" cy="105" rx="70" ry="62"/><ellipse cx="110" cy="78" rx="58" ry="48"/><path class="chest" d="M75 145q35 22 70 0-5 32-35 32t-35-32"/></g><g class="face"><ellipse class="eye" cx="82" cy="96" rx="11" ry="15"/><ellipse class="eye" cx="138" cy="96" rx="11" ry="15"/><path class="nose" d="m103 112 7-4 7 4-7 7Z"/><path class="mouth" d="M110 119q-10 12-20-1M110 119q10 12 20-1"/><path class="whiskers" d="M66 116H28M67 129l-35 8M154 116h38M153 129l35 8"/></g><g class="paws"><ellipse cx="62" cy="161" rx="17" ry="12"/><ellipse cx="158" cy="161" rx="17" ry="12"/><path d="M58 157v8M66 157v8M154 157v8M162 157v8"/></g><circle class="spark" cx="181" cy="62" r="4"/><path class="star" d="m184 28 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z"/></svg>`;
}

function explanationFor(moveIndex) {
  if (state.profile === 'daughter') {
    const simple = ['Put your pawn in the middle and make room for your pieces.', 'Bring a piece toward the busy centre.', 'Develop your bishop to a useful square.', 'Make your centre strong and ready.', 'Keep your king safe and finish the opening.'];
    return simple[moveIndex];
  }
  if (state.profile === 'son') return state.opening.movesDetail[moveIndex];
  return state.opening.movesDetail[moveIndex] + ` This supports the central and developmental plan.`;
}

function training() {
  document.body.dataset.theme = state.profile;
  const sequence = movesForDepth(state.opening, state.depth);
  state.session = state.session ?? new TrainingSession(state.opening, state.mode, state.chess, state.depth, sequence);
  app.innerHTML = `<main class="training-page page-shell">${header()}<div class="training-layout"><section class="board-area"><div class="board-toolbar"><button class="back" data-action="modes">← Modes</button><span>${state.mode[0].toUpperCase()+state.mode.slice(1)} · ${state.depth} moves · Move <strong id="move-count">${Math.min(state.session.whiteMove + 1, state.depth)}</strong> of ${state.depth}</span></div><div id="board" class="board"></div></section><aside class="coach-panel"><p class="eyebrow">${state.opening.name}</p>${state.profile === 'daughter' ? '<div class="tiny-kitten">•ᴗ•</div>' : ''}<h1 id="coach-title">Your move, White</h1><div class="progress-dots">${Array.from({length: state.depth}, (_, i) => `<span class="${i < state.session.whiteMove ? 'done' : i === state.session.whiteMove ? 'current' : ''}"></span>`).join('')}</div><p id="feedback">${state.mode === 'learn' ? explanationFor(state.session.whiteMove) : 'Find the next move from memory.'}</p><div class="coach-actions"><button class="secondary" data-action="hint">Hint</button><button class="secondary" id="why-button" data-action="why" aria-expanded="${state.teachingOpen}">Show me why</button><button class="text-button danger" data-action="restart">Restart</button></div><section id="teaching-panel" class="inline-teaching ${state.teachingOpen ? 'expanded' : ''}" aria-live="polite"></section><div class="legend"><span><i class="green"></i>Recommended</span><span><i class="orange"></i>Important square</span></div></aside></div></main>`;
  state.board = new ChessBoard(
    document.querySelector('#board'),
    state.chess,
    handleMove,
    recommendedMoveForMode(state.mode, expectedSquare(state.session.expectedMove)),
    handleSelectionChange,
    () => !state.busy
  );
  state.board.render();
}

function clearTeachingPanel() {
  state.teachingOpen = false;
  const panel = document.querySelector('#teaching-panel');
  panel?.classList.remove('expanded');
  if (panel) panel.innerHTML = '';
  document.querySelector('#why-button')?.setAttribute('aria-expanded', 'false');
}

function clearMoveFeedback() {
  const feedback = document.querySelector('#feedback');
  if (feedback) feedback.textContent = state.mode === 'learn'
    ? explanationFor(state.session.whiteMove)
    : 'Find the next move from memory.';
}

function handleSelectionChange(selectedSquare) {
  clearMoveFeedback();
  state.board?.clearOverlay();
  if (state.lessonDisclosure.shouldAutomaticallyOpen(
    state.mode,
    selectedSquare,
    expectedSquare(state.session.expectedMove),
    state.session.whiteMove
  )) {
    showTeaching();
  }
}

function handleMove(from, to) {
  if (state.busy || state.session.finished) return 'same';
  const piece = state.chess.get(from);
  if (!piece || piece.color !== 'w') return 'same';
  const result = state.session.playWhite(from, to);
  if (result.type === 'illegal') {
    document.querySelector('#feedback').textContent = 'That move is not legal. Try another move.';
    return 'same';
  }
  if (result.type === 'deviation') {
    state.busy = true;
    recordMistake(state.profile, state.opening.id, state.session.whiteMove + 1, state.depth);
    state.chess.reset();
    state.board.chess = state.chess;
    showDeviation(result.attempted, result.expected);
    return true;
  }
  if (result.type === 'blocked') return 'same';
  clearTeachingPanel();
  state.board.clearOverlay();
  state.board.setLastMove(result.move);
  if (result.type === 'complete') {
    complete();
    return true;
  }
  document.querySelector('#feedback').textContent = state.profile === 'daughter' ? 'Purrfect choice! Black is thinking…' : 'Correct. Black is replying now.';
  state.busy = true;
  setTimeout(() => {
    const reply = state.session.playBlack();
    state.board.setLastMove(reply);
    state.busy = false;
    if (state.board) training();
  }, 650);
  return true;
}

function showDeviation(attempted, expected) {
  const squares = expectedSquare(expected);
  if (squares) state.board.setOverlay(squares.from, squares.to, 'Recommended');
  app.querySelector('.training-page')?.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="deviation-title"><p class="eyebrow">Let's review that move</p><h2 id="deviation-title">You played ${attempted}</h2>  <p>Your move <strong>${attempted}</strong> is legal, but this repertoire recommends <strong>${expected}</strong>. ${explanationFor(state.session.whiteMove)}</p><p class="gentle">A different legal move can still be good chess; it simply is not this repertoire move. Read the idea, then return to move 1.</p><button class="primary" data-action="deviation-restart">Try Again From Start</button></section></div>`);
}

function complete() {
  recordCompletion(state.profile, state.opening.id, state.mode, state.session.assisted, state.depth);
  document.body.dataset.theme = state.profile;
  app.innerHTML = `<main class="completion page-shell">${header()}<section class="completion-card">${state.profile === 'daughter' ? '<div class="golden-paw">★</div>' : ''}<p class="eyebrow">Opening complete</p><h1>${state.profile === 'daughter' ? 'Meowvellous!' : 'Well played.'}</h1><p>You completed ${state.depth} White moves in ${openingName()}.</p><div class="completion-actions"><button class="primary" data-action="retry">Retry</button><button class="secondary" data-action="modes">Change mode</button><button class="secondary" data-action="library">Another opening</button></div></section></main>`;
}

function progress() {
  const data = loadProgress(state.profile);
  const records = Object.entries(data.openings);
  app.innerHTML = `<main class="page-shell">${header()}<section class="progress-heading"><p class="eyebrow">${profileName()}</p><h1>Progress</h1></section><div class="stats-grid"><div><span>Total completions</span><strong>${records.reduce((n, [,r]) => n + r.completions, 0)}</strong></div><div><span>Mastered openings</span><strong>${records.filter(([,r]) => r.mastery).length}</strong></div><div><span>Perfect mastery runs</span><strong>${records.reduce((n,[,r]) => n + r.perfectCompletions, 0)}</strong></div></div><div class="progress-list">${openings.map(o => { const depths = supportedDepths[o.id] ?? [5]; const summaries = depths.map(depth => { const record = data.openings[`${o.id}:${depth}`]; return `<span>${depth} moves: ${record?.mastery ? 'Mastered' : `${record?.streak ?? 0}/3 perfect runs`}</span>`; }).join(''); return `<article><div><strong>${o.name}</strong><span>${summaries || 'Not started'}</span></div></article>`; }).join('')}</div></main>`;
}

function startOpening(id) {
  state.opening = openingById(id);
  state.view = 'modes';
  state.session = null;
  state.teachingOpen = false;
  state.lessonDisclosure.reset(0);
  modes();
}
function showTeaching() {
  const lesson = teachingFor(state.opening, state.session.sequence, state.session.whiteMove, state.profile);
  state.session.requestHint();
  if (lesson.move && state.mode === 'learn') state.board?.setOverlay(lesson.move.from, lesson.move.to, `${lesson.san} — recommended`, lesson.highlights);
  const highlights = lesson.highlights.map((item) => `<li><span class="annotation-dot orange"></span><strong>${item.square}</strong> — important square after the move</li>`).join('');
  const panel = document.querySelector('#teaching-panel');
  if (!panel) return;
  state.teachingOpen = true;
  panel.classList.add('expanded');
  document.querySelector('#why-button')?.setAttribute('aria-expanded', 'true');
  panel.innerHTML = `<button class="teaching-close" data-action="close-why" aria-label="Close explanation">Close ×</button>${state.profile === 'daughter' ? kittenSvg('explaining') : ''}<div class="teaching-copy"><p class="eyebrow">Show me why · ${lesson.san}</p><h2 id="why-title">${lesson.san}</h2><div class="teaching-card"><span>Move</span><strong>${lesson.move?.from} → ${lesson.move?.to}</strong></div><div class="teaching-card"><span>Main reason</span><p>${lesson.why}</p></div><div class="teaching-card"><span>What changes</span><p>${lesson.affected}</p></div><div class="teaching-card"><span>What comes next</span><p>${lesson.plan}</p></div><div class="teaching-card"><span>Visual guidance</span><ul>${highlights}</ul><p class="annotation-note">Highlights describe the position after ${lesson.san}; future plans are not current attacks.</p></div><p class="misconception"><strong>Keep in mind:</strong> ${lesson.misconception}</p></div>`;
}

function startMode(mode) {
  state.mode = mode; state.chess = new Chess(); state.session = null; state.busy = false; state.assisted = false;
  state.teachingOpen = false;
  state.lessonDisclosure.reset(0);
  if (!movesForDepth(state.opening, state.depth)) { state.depth = 5; }
  training();
}

document.addEventListener('click', (event) => {
  const profile = event.target.closest('[data-profile]'); if (profile) { state.profile = profile.dataset.profile; state.view = 'library'; library(); return; }
  const opening = event.target.closest('[data-opening]'); if (opening) { startOpening(opening.dataset.opening); return; }
  const mode = event.target.closest('[data-mode]'); if (mode) { startMode(mode.dataset.mode); return; }
  const depth = event.target.closest('[data-depth]'); if (depth && !depth.disabled && movesForDepth(state.opening, Number(depth.dataset.depth))) { state.depth = Number(depth.dataset.depth); state.session = null; modes(); return; }
  const actionTarget = event.target.closest('[data-action]'); if (!actionTarget) return;
  switch (actionTarget.dataset.action) {
    case 'profile': state.profile = null; state.session = null; state.teachingOpen = false; state.lessonDisclosure.reset(0); welcome(); break;
    case 'library': state.session = null; state.teachingOpen = false; state.lessonDisclosure.reset(0); library(); break;
    case 'progress': progress(); break;
    case 'modes': modes(); break;
    case 'restart': state.chess.reset(); state.session.restart(); state.busy = false; state.lessonDisclosure.reset(0); state.teachingOpen = false; training(); break;
    case 'deviation-restart': state.busy = false; state.chess.reset(); state.session.restart(); state.lessonDisclosure.reset(0); state.teachingOpen = false; training(); break;
    case 'retry': startMode(state.mode); break;
    case 'hint':
      state.session.requestHint();
      if (state.mode === 'mastery') document.querySelector('#feedback').textContent = 'Help requested: this attempt will not count as a perfect run.';
      else { document.querySelector('#feedback').textContent = `Hint: look for ${state.session.expectedMove}.`; state.session.assisted = true; }
      break;
    case 'why': showTeaching(); break;
    case 'close-why': {
      clearTeachingPanel();
      state.board?.clearOverlay();
      break;
    }
  }
});

welcome();
