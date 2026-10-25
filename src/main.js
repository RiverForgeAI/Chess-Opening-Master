import './styles.css';
import './strategy.css';
import './enhancements.css';
import './refinement.css';
import './board-ux.css';
import { Chess } from 'chess.js';
import { openings, openingById, openingStrategy } from './openings.js';
import { profiles } from './profiles.js';
import { ChessBoard, recommendedMoveForMode } from './board.js';
import { TrainingSession } from './training.js';
import { LessonDisclosure } from './lesson-disclosure.js';
import { loadProgress, recordCompletion, recordMistake, loadTheme } from './storage.js';
import { movesForDepth, supportedDepths } from './openingDepths.js';
import { teachingFor } from './teaching.js';
import { strategyAnalysisFor } from './strategy-analysis.js';

const app = document.querySelector('#app');
let state = { profile: null, view: 'welcome', opening: null, mode: null, depth: 5, strategyDepth: 5, strategySection: 0, session: null, board: null, chess: new Chess(), busy: false, assisted: false, teachingOpen: false, lessonDisclosure: new LessonDisclosure() };
let strategySectionObserver = null;
let strategyNavResizeObserver = null;
let strategyLayoutResizeHandler = null;

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

function updateStrategyScrollLayout() {
  const strategyPage = app.querySelector('.strategy-page');
  const strategyNav = app.querySelector('.strategy-nav');
  const lastHeading = app.querySelector('#strategy-section-H h3');
  if (!strategyPage || !strategyNav || !lastHeading) return;

  const navStyle = getComputedStyle(strategyNav);
  const offset = navStyle.position === 'sticky'
    ? strategyNav.getBoundingClientRect().height + (Number.parseFloat(navStyle.top) || 0) + 20
    : 20;
  strategyPage.style.setProperty('--strategy-heading-scroll-offset', `${offset}px`);

  if (!lastHeading.getClientRects().length) return;
  const scrollMargin = Number.parseFloat(getComputedStyle(lastHeading).scrollMarginTop) || 0;
  const targetScrollY = lastHeading.getBoundingClientRect().top + window.scrollY - scrollMargin;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const additionalSpace = Math.max(0, targetScrollY - maxScrollY);
  if (additionalSpace > 0) {
    const currentPadding = Number.parseFloat(getComputedStyle(strategyPage).paddingBottom) || 0;
    strategyPage.style.paddingBottom = `${currentPadding + additionalSpace}px`;
  }
}

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
    return `<article class="opening-card"><div class="card-top"><span class="difficulty">${opening.difficulty}</span>${record?.mastery ? '<span class="mastered">Mastered</span>' : ''}</div><h2>${opening.name}</h2><p>${opening.description}</p><div class="objective"><span>Objective</span>${opening.objective}</div><div class="opening-actions"><button class="secondary" data-action="strategy" data-strategy-opening="${opening.id}">Learn the Strategy</button><button class="primary" data-action="training" data-opening="${opening.id}">Start Training</button></div></article>`;
  }).join('')}</div></main>`;
}

function strategyLesson() {
  const opening = state.opening;
  const lesson = openingStrategy(opening, state.strategyDepth);
  const moves = movesForDepth(opening, state.strategyDepth) ?? opening.moves;
  const analysis = strategyAnalysisFor(opening, state.strategyDepth, moves);
  const chess = new Chess(analysis.boardPosition);
  const playedBlackMoves = moves.filter((_, index) => index % 2 === 1).join(' ');
  const sections = [
    { key: 'A', title: 'The Big Picture', text: lesson.bigPicture },
    { key: 'B', title: 'Ideal Piece Development', text: `<p>${analysis.development}</p><p><strong>Position after White’s ${state.strategyDepth}th move:</strong> the board shows this exact repertoire position. Pieces still at home are candidates for improvement, not automatic moves.</p>` },
    { key: 'C', title: 'Centre and Pawn Structure', text: `<p>${analysis.centreText}</p>` },
    { key: 'D', title: 'Key Strategic Plans', text: analysis.plans.map((plan) => `<article class="strategy-plan"><h4>${plan.name}</h4><p><strong>Purpose:</strong> ${plan.purpose}</p><p><strong>Pieces:</strong> ${plan.pieces}</p><p><strong>Conditions:</strong> ${plan.conditions}</p><p><strong>Drawbacks:</strong> ${plan.drawbacks}</p></article>`).join('') },
    { key: 'E', title: 'Black\'s Ideas and Counterplay', text: `<p><strong>Black moves in the displayed trained line:</strong> ${playedBlackMoves}.</p><p><strong>Black’s setup and ideas at this depth:</strong> ${analysis.blackText}</p><p class="strategy-summary">These are strategic plans to recognise, not extra playable lines added to the trainer. Black can choose other moves in a real game.</p>` },
    { key: 'F', title: 'Common Mistakes and Tactical Motifs', text: lesson.mistakes.map((mistake) => `<article class="strategy-plan"><h4>${mistake.title}</h4><p><strong>Why it is risky:</strong> ${mistake.risk}</p><p><strong>What to consider instead:</strong> ${mistake.remedy}</p></article>`).join('') },
    { key: 'G', title: 'Transition to the Middlegame', text: `<p>${analysis.next}</p><h4>Next 2–3 priorities</h4><ol class="strategy-priorities">${analysis.priorities.map((priority) => `<li>${priority}</li>`).join('')}</ol><p><strong>Typical transition:</strong> ${analysis.transitionText}</p><p class="strategy-summary">${lesson.transition.summary}</p>` },
    { key: 'H', title: 'Key Takeaways', text: `<ul class="strategy-bullets">${lesson.takeaways.principles.map((principle) => `<li>${principle}</li>`).join('')}</ul><p><strong>Questions to ask:</strong> ${lesson.takeaways.questions.join(' • ')}</p><p class="strategy-summary">${lesson.takeaways.summary}</p>` }
  ];
  strategySectionObserver?.disconnect();
  strategyNavResizeObserver?.disconnect();
  if (strategyLayoutResizeHandler) window.removeEventListener('resize', strategyLayoutResizeHandler);
  const selectedSection = Math.min(state.strategySection, sections.length - 1);
  app.innerHTML = `<main class="page-shell strategy-page">${header()}<section class="strategy-shell"><div class="strategy-intro"><button class="back" data-action="library">← Opening library</button><p class="eyebrow">Learn the Strategy</p><h1>${opening.name}</h1><p>${opening.description}</p></div><div class="strategy-actions"><button class="secondary" data-action="library">Return to Opening Library</button><button class="primary" data-action="training" data-opening="${opening.id}">Start Training</button></div><div class="strategy-layout"><aside class="strategy-reference-column" aria-label="Reference chess position"><div class="strategy-depth-picker"><span class="eyebrow">Reference position</span><div class="depth-options compact">${[5, 10].map((depth) => `<button class="depth-option ${state.strategyDepth === depth ? 'selected' : ''}" data-strategy-depth="${depth}" aria-pressed="${state.strategyDepth === depth}">${depth}-Move plan</button>`).join('')}</div></div><div class="strategy-board-heading"><strong>${opening.name}</strong><span>${state.strategyDepth}-move reference · after White’s ${state.strategyDepth}th move</span></div><div id="strategy-board" class="board"></div><aside class="strategy-focus"><p class="eyebrow" id="strategy-current-section">Section ${sections[selectedSection].key} — ${sections[selectedSection].title}</p><h2>${analysis.focusTitle}</h2><p>${analysis.focus}</p><p class="strategy-position-note">The board shows the exact repertoire position at this reference depth.</p>${state.profile === 'daughter' ? kittenSvg('explaining') : ''}</aside></aside><div class="strategy-lesson-column"><nav class="strategy-nav" aria-label="Strategy sections">${sections.map((section, index) => `<button type="button" class="strategy-nav-step ${index === selectedSection ? 'selected' : ''}${index < selectedSection ? 'completed' : ''}" data-strategy-section="${index}" aria-controls="strategy-section-${section.key}" aria-current="${index === selectedSection ? 'step' : 'false'}"><span aria-hidden="true">${section.key}</span><b>${section.title}</b></button>`).join('')}</nav><div class="strategy-sections">${sections.map((section, index) => `<section class="strategy-section${index === selectedSection ? ' selected' : ''}" id="strategy-section-${section.key}" aria-labelledby="strategy-heading-${section.key}"><h3 id="strategy-heading-${section.key}">Section ${section.key} — ${section.title}</h3>${section.text}<div class="strategy-step-controls"><button type="button" class="secondary" data-strategy-section="${Math.max(0, index - 1)}" ${index === 0 ? 'disabled' : ''}>Previous section</button><span>Section ${index + 1} of ${sections.length}</span><button type="button" class="secondary" data-strategy-section="${Math.min(sections.length - 1, index + 1)}" ${index === sections.length - 1 ? 'disabled' : ''}>Next section</button></div></section>`).join('')}</div></div></div></section></main>`;
  state.board = new ChessBoard(document.querySelector('#strategy-board'), chess, () => 'same', null, () => {}, () => false);
  state.board.render();
  const strategyNav = app.querySelector('.strategy-nav');
  updateStrategyScrollLayout();
  strategyNavResizeObserver = new ResizeObserver(updateStrategyScrollLayout);
  strategyNavResizeObserver.observe(strategyNav);
  strategyLayoutResizeHandler = updateStrategyScrollLayout;
  window.addEventListener('resize', strategyLayoutResizeHandler);
  const lessonSections = [...app.querySelectorAll('.strategy-section')];
  strategySectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setStrategySection(Number(visible.target.dataset.sectionIndex));
  }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.5] });
  lessonSections.forEach((section, index) => {
    section.dataset.sectionIndex = index;
    strategySectionObserver.observe(section);
  });
}

function setStrategySection(index, scroll = false) {
  const sections = [...app.querySelectorAll('.strategy-section')];
  if (index < 0 || index >= sections.length) return;
  state.strategySection = index;
  sections.forEach((section, sectionIndex) => section.classList.toggle('selected', sectionIndex === index));
  app.querySelectorAll('.strategy-nav-step').forEach((button) => {
    const buttonIndex = Number(button.dataset.strategySection);
    button.classList.toggle('selected', buttonIndex === index);
    button.classList.toggle('completed', buttonIndex < index);
    button.setAttribute('aria-current', buttonIndex === index ? 'step' : 'false');
  });
  const section = sections[index];
  const heading = section.querySelector('h3');
  const focus = app.querySelector('#strategy-current-section');
  if (heading && focus) focus.textContent = heading.textContent;
  if (scroll && heading) {
    updateStrategyScrollLayout();
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    heading.scrollIntoView({ behavior, block: 'start' });
  }
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
  return teachingFor(state.opening, state.session.sequence, moveIndex, state.profile).explanation;
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

function openStrategy(id) {
  state.opening = openingById(id);
  state.view = 'strategy';
  state.mode = null;
  state.session = null;
  state.strategyDepth = 5;
  state.strategySection = 0;
  state.teachingOpen = false;
  state.lessonDisclosure.reset(0);
  strategyLesson();
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
  const strategyDepth = event.target.closest('[data-strategy-depth]'); if (strategyDepth) { state.strategyDepth = Number(strategyDepth.dataset.strategyDepth); if (state.view === 'strategy') strategyLesson(); return; }
  const strategySection = event.target.closest('[data-strategy-section]'); if (strategySection) { setStrategySection(Number(strategySection.dataset.strategySection), true); return; }
  const opening = event.target.closest('[data-opening]'); if (opening) { if (opening.dataset.action === 'training' || opening.closest('[data-action="training"]')) { startOpening(opening.dataset.opening); return; } if (opening.closest('[data-action="strategy"]')) { openStrategy(opening.dataset.opening); return; } startOpening(opening.dataset.opening); return; }
  const mode = event.target.closest('[data-mode]'); if (mode) { startMode(mode.dataset.mode); return; }
  const depth = event.target.closest('[data-depth]'); if (depth && !depth.disabled && movesForDepth(state.opening, Number(depth.dataset.depth))) { state.depth = Number(depth.dataset.depth); state.session = null; modes(); return; }
  const actionTarget = event.target.closest('[data-action]'); if (!actionTarget) return;
  switch (actionTarget.dataset.action) {
    case 'profile': state.profile = null; state.session = null; state.teachingOpen = false; state.lessonDisclosure.reset(0); welcome(); break;
    case 'library': state.session = null; state.teachingOpen = false; state.lessonDisclosure.reset(0); library(); break;
    case 'progress': progress(); break;
    case 'modes': modes(); break;
    case 'training': startOpening(actionTarget.dataset.opening); break;
    case 'strategy': openStrategy(actionTarget.dataset.strategyOpening ?? actionTarget.dataset.opening); break;
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
