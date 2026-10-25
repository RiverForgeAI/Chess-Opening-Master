import { Chess } from 'chess.js';

const positions = {
  italian: {
    5: {
      focusTitle: 'Build before the central break',
      focus: 'The fifth move settles on a compact centre: c3 supports a future d4, while d3 protects e4 and keeps the position closed for now.',
      centre: 'White has pawns on e4, c3 and d3; Black still has the central e5 pawn and has not moved the d-pawn. The centre is stable, not open. A later d4 is the main break, but only after White has enough pieces behind it and has checked Black’s ...d5 or ...d6 setup.',
      black: 'Black has developed both knights and the f8-bishop to c5, but the king is still on e8 and the c8-bishop and queen-side rook have not joined. The ...Nf6 move contests e4 and increases pressure on the centre.',
      immediate: 'Keep e4 supported and complete development; the c1-bishop and b1-knight are still at home.',
      future: 'After king safety, consider Re1 and a coordinated d4, or keep the quieter d3 structure and improve the pieces first.',
      break: 'd4 is a future break, not an automatic next move: check whether Black can answer ...d5 with useful development or a central exchange.',
      priorities: ['Finish development and make the king safe.', 'Keep e4 adequately supported.', 'Reassess d4 only after seeing Black’s central setup.'],
      next: 'The immediate job is development, not an attack: bring out the c1-bishop and b1-knight, then decide whether a supported d4 opens the centre favourably. Black has not castled yet, so the position can still change quickly.',
      transition: 'The line aims toward a Giuoco Pianissimo structure: a closed or semi-closed centre, manoeuvring, and a later central or kingside plan.'
    },
    10: {
      focusTitle: 'Turn the quiet setup into pressure',
      focus: 'White has castled, placed a rook on e1, and developed the b1-knight to d2. The position is safer and more coordinated than at move five, but the c1-bishop is still undeveloped.',
      centre: 'White’s c3, d3 and e4 pawns still form a compact chain against Black’s e5/d6 centre. The position has not opened: d4 remains a possible break, but White should first account for the pieces defending e5 and the central ...d5 counterplay.',
      black: 'Black has castled and completed ...Re8, with ...a6 and ...Ba7 preserving the bishop on the long diagonal. The f6- and c6-knights support the centre; ...Re8 also contests the e-file. White’s h3 asks about a future ...Bg4 but does not force Black to resolve it.',
      immediate: 'Improve or develop the c1-bishop, keep the e-file coordinated, and judge whether the centre is ready for d4.',
      future: 'A supported d4 can transform the game into an open-centre struggle; if Black keeps the centre stable, White can manoeuvre the d2-knight and build a kingside space plan.',
      break: 'd4 is still the central break, but Black is now castled and has ...Re8 behind e5. Calculate the resulting exchanges and keep the e4-pawn protected.',
      priorities: ['Give the c1-bishop a useful route.', 'Compare d4 with continued manoeuvring.', 'Watch Black’s ...d5 and e-file pressure before opening the centre.'],
      next: 'White has achieved king safety, a rook on e1, and a second knight on d2. The clearest unfinished task is the c1-bishop. Decide whether to improve it before d4; Black’s castled king and rook on e8 mean central exchanges now have more concrete consequences.',
      transition: 'The line is poised between a slow Pianissimo manoeuvring game and a central opening with d4; either can arise depending on Black’s next setup.'
    }
  },
  'ruy-lopez': {
    5: {
      focusTitle: 'Keep the bishop and the tension',
      focus: 'White has castled while the bishop has retreated to a4, preserving pressure on the c6-knight rather than exchanging it.',
      centre: 'White’s e4 pawn faces Black’s e5 pawn; c3 and d4 have not yet been played, so the centre remains tense and relatively open. The c6-knight helps defend e5. A future c3/d4 build is possible, but first White should complete development and check Black’s central break.',
      black: 'Black has played ...a6 and ...Nf6: the a-pawn challenged the bishop, which kept its diagonal from a4, while the f6-knight attacks e4 and adds pressure to the centre. Black’s king is still uncastled in this snapshot.',
      immediate: 'Develop the c1-bishop and connect the rooks; maintain support for e4.',
      future: 'Consider c3 followed by d4 if the central tension remains favourable, while retaining the a4-bishop’s pressure.',
      break: 'The d4 break needs support: check the e4 pawn, the f6-knight’s attack, and whether Black can meet it with a central exchange.',
      priorities: ['Complete the remaining minor-piece development.', 'Keep e4 defended against ...Nxe4 ideas.', 'Choose a c3/d4 structure only after Black’s reply.'],
      next: 'White has king safety and the Ruy Lopez bishop pair intact, but the c1-bishop and queen-side knight are still home. Develop them and keep e4 secure before building c3/d4. Black’s king has not castled, so avoid assuming the position is settled.',
      transition: 'The position usually moves toward a Spanish central tension: White builds behind e4 and presses the c6-knight without forcing an early exchange.'
    },
    10: {
      focusTitle: 'A prepared centre against a complete setup',
      focus: 'White has Re1, c3 and d4 in place, with the king castled and the bishop safely on b3. The central plan is now concrete, not merely a future idea.',
      centre: 'White’s d4 and e4 pawns challenge Black’s e5/d6 centre; c3 supports the d-pawn. The centre has been opened by the d4 advance, so piece activity and e4 support matter more than preserving a closed structure.',
      black: 'Black has castled, pushed ...b5, and developed ...Bg4 from c8. The e7-bishop and f6-knight support the central shell; ...Bg4 puts pressure on the f3-knight, while the queenside pawn space can support further expansion.',
      immediate: 'Resolve the pressure on the f3-knight thoughtfully and keep the d4/e4 centre coordinated.',
      future: 'Use the open central files to improve the rooks; the bishop pair and a later c4 or central exchange may define the middlegame.',
      break: 'The d4 break has already been played. Any next pawn change should be judged by its effect on e4 and the open d-/e-files, rather than pushing another pawn automatically.',
      priorities: ['Address ...Bg4 and the pressure on Nf3.', 'Keep the central pawns mutually supported.', 'Use Re1 and the open files without allowing ...b4 or central counterplay to gain tempo.'],
      next: 'White has achieved the prepared d4 break and castled, but the f3-knight is under ...Bg4 pressure and Black has gained queenside space with ...b5. First decide whether to challenge the bishop or reinforce the centre; then improve the rooks on the opened files.',
      transition: 'The line leads to a central Spanish middlegame with open-file play, lasting pressure on e5, and counterplay on both wings.'
    }
  },
  scotch: {
    5: {
      focusTitle: 'Use the open centre, not just the space',
      focus: 'The central exchange has already happened: White’s knight recaptured on d4 and both knights now occupy active central squares.',
      centre: 'White has e4, while the original d-pawn was exchanged for Black’s e-pawn. The d4 knight and c3 knight control central squares; Black’s d-pawn remains on d7 and e-pawn is gone. The centre is open enough that development and king safety take priority over another pawn break.',
      black: 'Black has both knights developed to c6 and f6, but the bishops and king remain undeveloped. The f6-knight challenges the d4-knight, so Black is contesting White’s activity rather than simply defending passively.',
      immediate: 'Protect or reposition the d4-knight as needed and develop the bishops while the centre is open.',
      future: 'Complete development and use the central squares for active pieces; consider a later e5 or exchange only when it gains time or improves the structure.',
      break: 'There is no urgent pawn break to force: White’s d-pawn has been exchanged, and premature flank advances would distract from development.',
      priorities: ['Check the pressure on the d4-knight.', 'Develop the bishops and prepare castling.', 'Use the open centre to gain tempi, not to launch unsupported pawns.'],
      next: 'White has traded central pawns and placed two knights actively, but both bishops and the king still need attention. Meet Black’s ...Nf6 pressure on d4, develop, then castle. The opening’s promise is rapid piece activity in an open position.',
      transition: 'The Scotch typically becomes an open-piece middlegame where central squares, development tempi, and tactical awareness matter.'
    },
    10: {
      focusTitle: 'Reassess the structure after the exchanges',
      focus: 'White has castled and developed both bishops, but one knight was exchanged on c6. Black’s b-pawn recaptured, leaving a changed c-pawn structure.',
      centre: 'White’s e-pawn and the d3-bishop support central influence; Black now has pawns on c6 and d5 after ...bxc6 and ...cxd5. The centre is not the original open Scotch structure anymore: d5 is an advanced black pawn and White should target it or restrict it before choosing another break.',
      black: 'Black has castled and has bishops on b4 and c8 plus a knight on f6. The c6/d5 pawns give Black a central foothold, while White’s c3-knight remains the only knight. The b4-bishop can be challenged, but its pressure is not automatically decisive.',
      immediate: 'Assess the d5 pawn and the bishop on b4; keep the d3-bishop and c3-knight coordinated.',
      future: 'A quiet Re1 or c3 setup can improve coordination; exchanges around d5 may create an isolated or backward pawn structure depending on Black’s recapture.',
      break: 'The original d-pawn is gone. Any future pawn break must come from the remaining e- or c-pawns and should account for the advanced d5 pawn.',
      priorities: ['Decide whether to challenge the b4-bishop or improve a piece.', 'Put pressure on d5 without weakening e4.', 'Use the open e-file after keeping the king safe.'],
      next: 'The immediate target is Black’s d5 foothold, not a generic central push. White is castled and developed, but has only one knight; decide whether to question the b4-bishop first, then coordinate the remaining knight and rooks against d5. A later exchange can produce a structurally different, more positional middlegame.',
      transition: 'The game has shifted from the opening’s initial open centre toward a structure-and-piece struggle around d5 and the c-file.'
    }
  },
  'queens-gambit': {
    5: {
      focusTitle: 'Maintain central tension in the Declined',
      focus: 'White has offered c4 and built a classical d4/c4 centre; Black declined the pawn and developed ...e6, ...Nf6 and ...Be7.',
      centre: 'White’s d4 and c4 pawns challenge Black’s d5/e6 chain. White’s c-pawn is not a lasting sacrifice in this line. The centre is still locked in tension; e3 supports d4 and opens the c1-bishop’s route only partially because that bishop is already on g5.',
      black: 'Black has the king’s knight on f6 and the bishop on e7; the b8-knight and c8-bishop remain undeveloped. ...Be7 has stepped between Bg5 and the king, so White’s bishop pressure on Nf6 is not a king pin.',
      immediate: 'Complete kingside development and castle; keep the d4 pawn supported.',
      future: 'Consider Nf3 and a later cxd5 exchange if it improves the structure or releases the c-file; otherwise preserve the tension.',
      break: 'No immediate pawn break is required. cxd5 is an exchange decision, not a direct advance; assess the resulting d-pawn structure first.',
      priorities: ['Develop the g1-knight and secure the king.', 'Keep d4 defended against central pressure.', 'Decide whether to maintain or exchange the c4/d5 tension.'],
      next: 'White’s centre is established, but the g1-knight, king and f1-bishop are not yet developed or safe. Finish development before exchanging on d5. Black has a compact but incomplete QGD setup, so the central tension can still be shaped.',
      transition: 'The position points toward a Queen’s Gambit Declined middlegame: central tension, piece development, and a later choice to exchange or preserve the pawn structure.'
    },
    10: {
      focusTitle: 'The tension has resolved into a d5 target',
      focus: 'White has castled with both knights developed and the bishop pair active; Black has recaptured ...exd5, leaving a black pawn on d5 against White’s d4 pawn.',
      centre: 'The c-pawn has traded for Black’s d-pawn, and the e-pawn recaptured onto d5. White’s d4 pawn now faces Black’s d5 pawn directly; this is a fixed central structure, not the original c4/d5 tension. The c-file is open for White’s rook only after it is brought there.',
      black: 'Black has castled, played ...b6 and developed the c8-bishop to b7. The e7-bishop and f6-knight are active around the centre; the b8-knight is still at home. Black’s structure is compact, with ...d5 as a central anchor.',
      immediate: 'Coordinate the d3-bishop and f3-knight against d5, and use the open c-file only when the rook can occupy it safely.',
      future: 'A queenside minority-style plan or a kingside piece build may arise, but first improve the rook and decide whether d5 can be pressured without conceding e4.',
      break: 'The c-pawn is gone and d4/d5 are fixed. White’s next central change is a piece-supported challenge to d5, not an automatic c-pawn push.',
      priorities: ['Keep pressure on d5 and avoid a loose e4 square.', 'Improve the a1-rook onto a useful file.', 'Compare a central piece build with a queenside plan.'],
      next: 'White has completed development and castled, but the c-pawn exchange created a fixed d4-versus-d5 structure. Improve the a1-rook, then test d5 with pieces before deciding on a kingside or queenside plan. Black’s ...b6/...Bb7 setup is aimed at long-diagonal activity.',
      transition: 'The line enters a classical QGD middlegame with a fixed central pair, pressure on d5, and long-term manoeuvring.'
    }
  },
  london: {
    5: {
      focusTitle: 'Finish the London shell first',
      focus: 'The bishop is already on d3 and the other bishop on f4, while the g1-knight and king remain undeveloped.',
      centre: 'White has a d4/e3 structure against Black’s d5/e6. The c-pawn is still on c2 and can later challenge d5 with c4. Black’s ...Bd6 offers a bishop trade; White’s Bd3 preserves the bishop but does not itself create a central break.',
      black: 'Black has developed ...Nf6 and ...Bd6, with the king still uncastled and the c8-bishop and b8-knight at home. The bishop on d6 contests White’s f4-bishop and can encourage an exchange.',
      immediate: 'Develop the g1-knight and castle; decide whether keeping the f4-bishop is worth preserving.',
      future: 'Once safe, prepare c4 to challenge d5 or continue with a restrained setup if Black keeps the centre closed.',
      break: 'c4 is a future central challenge, not a move to play before development; it also changes the d4 support structure.',
      priorities: ['Develop Nf3 and secure the king.', 'Choose whether to exchange or retain the f4-bishop.', 'Prepare c4 only when Black’s centre and pieces permit it.'],
      next: 'The characteristic bishops are placed, but the g1-knight, king and rooks are not coordinated. Develop and castle before deciding on c4. Black’s ...Bd6 is a direct challenge to the f4-bishop, so decide whether preserving that bishop serves the position.',
      transition: 'This can become a restrained London structure or a more open central game after c4; the bishop decision influences the character.'
    },
    10: {
      focusTitle: 'The London has become an active c-file setup',
      focus: 'White has castled, placed knights on f3 and c3, and played c4. Rc1 supports the c-pawn, while Qe2 connects the pieces behind the centre.',
      centre: 'White’s d4/e3/c4 pawns challenge Black’s d5/e6/c5 structure. The c4 advance has already tested d5; Black’s ...c5 counterbreak has added tension rather than leaving an open c-file. White must count the pawns and pieces before exchanging.',
      black: 'Black has castled, developed the c8-bishop to b7 and the b8-knight to d7, and answered with ...c5. The c5 pawn directly challenges White’s d4/c4 base; the long-diagonal bishop on b7 increases pressure on the centre.',
      immediate: 'Respond to ...c5’s pressure on d4 and keep the c4 pawn defended; Qe2 is a flexible support move, not a forced attack.',
      future: 'If the centre stabilises, the c-file can support queenside piece activity; otherwise exchanges may open lines for both sides.',
      break: 'Black has already played the main ...c5 challenge. White should assess dxc5 or maintaining tension only in the actual position; neither is automatically best.',
      priorities: ['Measure the pressure from ...c5 and ...Bb7.', 'Keep d4 supported before opening the centre.', 'Use Rc1 only with a clear c-file target.'],
      next: 'The board is no longer just a standard setup: Black has castled and challenged with ...c5, while White has c4 and Rc1. First calculate the central tension around d4/c4; then decide whether the c-file will open for White or Black. The bishops and knights are developed, so the plan is now structural.',
      transition: 'The opening is transitioning toward a symmetrical central struggle, often defined by c-file access and the fate of the d4 pawn.'
    }
  },
  vienna: {
    5: {
      focusTitle: 'Meet the central counterstrike',
      focus: 'White has advanced f4 and developed both knights plus the bishop to b5, but the king is still in the centre.',
      centre: 'White’s e4/f4 pawns claim space while Black’s e5/d5 pawns challenge it. The d5 advance is already a direct counterstrike, so the centre is volatile. The next priority is to make the pieces support the position rather than automatically pushing another pawn.',
      black: 'Black has developed both knights and played ...d5, confronting White’s centre immediately. The bishops and king remain at home, but the central tension can open lines quickly.',
      immediate: 'Develop the remaining bishop and decide whether the centre should be exchanged or maintained; prepare king safety.',
      future: 'After the central tension is resolved, use the f-file and active pieces if the king is safe; do not assume the f-pawn advance guarantees an attack.',
      break: 'The central break has already occurred with ...d5. Any further e- or f-pawn advance needs a concrete calculation of the exchanges and king exposure.',
      priorities: ['Understand the d5 challenge and central exchanges.', 'Complete development and arrange castling.', 'Keep f4 supported while avoiding unsupported tactical claims.'],
      next: 'Black has challenged the centre before White castled. Work out what happens to the e4/f4 pawns, develop the c1-bishop, and secure the king. The line leads to dynamic central play, but activity is useful only if White can coordinate the pieces.',
      transition: 'The position aims for an open, tactical Vienna middlegame, with central lines and king safety more important than a memorised attack.'
    },
    10: {
      focusTitle: 'A queen-led centre after exchanges',
      focus: 'White’s knight has captured on f6 and Black’s queen recaptured; White has played Qe2, d3 and c3, but has not castled.',
      centre: 'The e-pawn has been captured by ...dxe4 and White’s c3-knight recaptured on e4 before trading itself for the f6-knight. White’s remaining central pawns are d3 and f4; Black has e5 and d5. The position is materially and structurally different from move five, with the queen on f6 and open development still unfinished.',
      black: 'Black has castled and placed the queen on f6 after Qxf6; ...Bg4 develops the c8-bishop with pressure. Black’s c6-knight and d6-bishop remain active, while White’s king is still on e1.',
      immediate: 'Prioritise king safety and finish development; watch the queen on f6 and bishop on g4 rather than starting a flank attack.',
      future: 'Once castled, White can use d3/c3 to stabilise and then choose whether to challenge e5 or build activity on the open lines.',
      break: 'The initial central clash is already resolved; c3 supports d4 later, but White should not advance before the king and pieces are coordinated.',
      priorities: ['Castle and complete development.', 'Check the pressure from ...Bg4 and the queen on f6.', 'Only then decide whether d4 can challenge the centre safely.'],
      next: 'The tactical exchanges have left White uncastled with a queen on e2 and Black already castled, so king safety is the practical priority. Develop the c1-bishop, castle when appropriate, and inspect ...Bg4 before planning d4. The next phase may be a central manoeuvring game, not necessarily an attack.',
      transition: 'The sharp opening has settled into an imbalanced middlegame: White has a compact d3/c3 base, Black has a queen on f6 and active development.'
    }
  },
  english: {
    5: {
      focusTitle: 'The fianchetto is ready; the centre is not fixed',
      focus: 'White has completed the g3/Bg2 fianchetto and developed Nf3, while Black has occupied the centre with ...e5 and ...d5.',
      centre: 'White’s c4 pawn pressures d5 from the flank; e2 and d2 remain unmoved, so White has not yet committed to a central pawn structure. Black’s e5/d5 pawns currently occupy space. White should choose d3/e4 or another setup based on whether Black can maintain the centre.',
      black: 'Black has developed Nf6 and the c8-bishop to e6, and played ...d5, directly challenging the English’s flank control. The other knight and king remain at home, so the centre is contested before either side has completed development.',
      immediate: 'Develop Nf3 and keep the g2-bishop’s diagonal useful; choose a central structure without allowing Black to consolidate d5 unchallenged.',
      future: 'A d3/e4 setup or a direct central exchange can arise; queenside expansion is only useful if the centre stays stable.',
      break: 'White has not committed to d3 or e4 yet. Choose one when the central exchange and the bishop’s diagonal are understood; don’t treat flank control as central control by itself.',
      priorities: ['Decide how to challenge Black’s d5/e5 centre.', 'Complete development and keep the fianchetto bishop active.', 'Choose a coherent pawn setup before expanding on the wing.'],
      next: 'Black has already occupied the centre with ...d5 while White has only c4 and the fianchetto setup. Decide whether to stabilise with d3 or challenge the centre more directly, then develop and castle. The key is to ensure the g2-bishop remains relevant to the chosen structure.',
      transition: 'The line can transpose into a reversed-Sicilian-type central structure, with the fianchetto bishop influencing the central contest.'
    },
    10: {
      focusTitle: 'Queenside castling changes the strategic race',
      focus: 'White has castled short, played d3, exchanged the c1-bishop for Nf6, and placed the a1-rook on b1. Black has castled long.',
      centre: 'White’s c4/d3 pawns face Black’s d5/e5 centre; e2 remains unadvanced. With opposite-side castling, the centre’s stability now determines whether either flank can safely advance. The b-file rook signals queenside activity, but the central pawns still restrain both sides.',
      black: 'Black has played ...Qd7 and ...O-O-O, with a rook on d8 and bishop activity on e7/f6. The kings are on opposite wings, so Black’s queenside pieces and central control can support a kingside pawn race.',
      immediate: 'Keep the centre stable and coordinate the rook on b1 with the c-pawn; evaluate the exposed king locations before flank advances.',
      future: 'White may build queenside pressure against the long-castled king, while Black can seek kingside activity. Both plans require the centre not to open against the advancing side.',
      break: 'The d-pawn is on d3 and e-pawn remains on e2; a later e4 or d4 changes the central race. Prepare it with pieces and check that opening the centre does not expose White’s king.',
      priorities: ['Assess opposite-side king safety and likely pawn races.', 'Keep c4 and d3 supported while improving the b1-rook.', 'Choose e4 or d4 only after checking Black’s central control.'],
      next: 'Opposite-side castling is the key new fact: White’s king is on g1, Black’s on c8, and the b1-rook can support queenside play. Before pushing flank pawns, assess whether the centre can open and whether Black can attack White’s king first. White’s c1-bishop was traded, so the g2-bishop is the remaining long-range bishop.',
      transition: 'The line is heading toward a dynamic opposite-wing middlegame, but the central structure decides which side can safely launch a pawn storm.'
    }
  },
  'king-indian-attack': {
    5: {
      focusTitle: 'Complete the setup before choosing a break',
      focus: 'White has fianchettoed, castled and played d3; the characteristic e4 break is prepared but not yet played.',
      centre: 'White’s d3 pawn faces Black’s d5/e6 structure. White’s e-pawn remains on e2 and can later challenge the centre with e4. Black’s centre is stable and currently occupies more space, so White must prepare the break with pieces rather than push automatically.',
      black: 'Black has developed Nf6 and Be7 and has played ...d5, confronting White’s d3 setup. The king is still on e8 in this five-move snapshot; the later ...c5 and ...b5 counterplay belongs to the longer repertoire position.',
      immediate: 'Develop the b1-knight and decide how to meet ...c5; protect the fianchetto bishop’s central influence.',
      future: 'Prepare e4 with support, then evaluate whether the centre can close or open in White’s favour; a kingside manoeuvre is a later possibility.',
      break: 'e4 is the defining future break, but the d3 pawn and undeveloped queen-side knight must support it. Black’s ...d5 and ...c5 make timing especially important.',
      priorities: ['Develop the b1-knight and coordinate it with e4.', 'Monitor Black’s central and queenside counterplay.', 'Advance e4 only when the resulting centre is supportable.'],
      next: 'White has king safety and the fianchetto, but the b1-knight is still home and e4 is only a plan. Develop that knight, watch Black’s centre, and then decide whether e4 gains space or releases Black’s central pieces. The line aims for a flexible KIA structure, not a forced kingside attack.',
      transition: 'The position is a classic KIA staging point: stable d3/e2 structure now, with e4 and kingside manoeuvring available later.'
    },
    10: {
      focusTitle: 'The central break is in place; Black is expanding',
      focus: 'White has played e4, Re1 and Nf1, then supported the centre with c3. Black has castled, played ...c5 and expanded with ...b5.',
      centre: 'White now has pawns on c3, d3 and e4 against Black’s c5/d5/e6 structure. The e4 break has already claimed space; White’s next task is to maintain it or choose a supported exchange, not repeat the same break idea. Black’s c5 and b5 create active counterplay.',
      black: 'Black has castled and developed Nc6 and Bb7, with ...c5 and ...b5 challenging the centre and queenside. The bishop on b7 looks through the long diagonal toward the centre; White’s e4 pawn is the key contact point.',
      immediate: 'Keep e4 defended, improve the knight from f1 toward a useful square, and account for ...b4 or further central pressure.',
      future: 'A kingside knight manoeuvre or a later central exchange may follow; the g2-bishop and rook on e1 support the central and kingside options.',
      break: 'The e4 break is already achieved. Any further d4 advance must be judged against Black’s ...c5 and queenside space; it is not automatically safe just because White has played c3.',
      priorities: ['Protect the e4 pawn and assess Black’s ...c5 pressure.', 'Find a useful route for the f1-knight.', 'Choose between maintaining the centre and a calculated d4 change.'],
      next: 'White has completed the KIA central break but Black has castled and established ...c5/...b5 with a bishop on b7. Keep e4 secure, improve the f1-knight, and calculate whether d4 opens the centre favorably or releases Black’s pieces. White’s remaining plan is manoeuvring around e4, not blindly adding more central pawns.',
      transition: 'The line moves toward a closed or semi-closed KIA middlegame with kingside manoeuvring against Black’s queenside space and central counterplay.'
    }
  }
};

const pieceNames = { n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' };
const homeSquares = {
  n: new Set(['b1', 'g1']),
  b: new Set(['c1', 'f1'])
};

function piecesOf(chess, color, type) {
  return chess.board().flatMap((rank, rankIndex) => rank.flatMap((piece, fileIndex) => (
    piece?.color === color && piece.type === type ? [`${'abcdefgh'[fileIndex]}${8 - rankIndex}`] : []
  )));
}

function describePieceLayout(chess) {
  const active = [];
  const atHome = [];
  for (const type of ['n', 'b']) {
    const name = type === 'n' ? 'knight' : 'bishop';
    const squares = piecesOf(chess, 'w', type);
    const moved = squares.filter((square) => !homeSquares[type].has(square));
    const home = squares.filter((square) => homeSquares[type].has(square));
    if (moved.length) active.push(`${name}${moved.length > 1 ? 's' : ''} on ${moved.join(' and ')}`);
    if (home.length) atHome.push(`${name}${home.length > 1 ? 's' : ''} on ${home.join(' and ')}`);
  }

  const kingSquare = piecesOf(chess, 'w', 'k')[0];
  const rookSquares = piecesOf(chess, 'w', 'r');
  const queenSquare = piecesOf(chess, 'w', 'q')[0];
  const kingStatus = ['g1', 'c1'].includes(kingSquare)
    ? `King on ${kingSquare} is castled`
    : `king remains on ${kingSquare}`;
  const rookStatus = `rooks on ${rookSquares.join(' and ')}`;
  const queenStatus = queenSquare === 'd1' ? 'queen remains on d1' : `queen is on ${queenSquare}`;
  return {
    active: active.length ? active.join('; ') : 'no minor piece has left its starting square',
    atHome: atHome.length ? atHome.join('; ') : 'both minor-piece pairs have left their starting squares',
    kingAndRooks: `${kingStatus}; ${rookStatus}; ${queenStatus}`
  };
}

export function strategyAnalysisFor(opening, depth, moves) {
  const data = positions[opening.id]?.[depth];
  if (!data) throw new Error(`Missing ${depth}-move strategy analysis for ${opening.id}`);

  const chess = new Chess();
  for (const san of moves) {
    if (!chess.move(san)) throw new Error(`Invalid ${opening.id} strategy move: ${san}`);
  }
  const layout = describePieceLayout(chess);
  return {
    ...data,
    development: `After White’s ${depth}th move, ${layout.active}. Still at their starting squares: ${layout.atHome}. ${layout.kingAndRooks}. ${data.immediate}`,
    plans: [
      { name: 'Immediate priorities', purpose: data.immediate, pieces: layout.active, conditions: 'These are the practical tasks in the displayed position.', drawbacks: 'Do not force a plan if Black’s next move changes the position.' },
      { name: 'Future manoeuvre', purpose: data.future, pieces: layout.active, conditions: 'This becomes relevant after the immediate development and threat checks.', drawbacks: 'A manoeuvre can be too slow if the centre or king is under pressure.' },
      { name: 'Pawn-break timing', purpose: data.break, pieces: 'Central pawns and the pieces supporting them.', conditions: 'Check the actual pawn contact and Black’s replies before committing.', drawbacks: 'An early break can open lines for Black or weaken a key pawn.' }
    ],
    centreText: data.centre,
    blackText: data.black,
    priorities: data.priorities,
    next: data.next,
    transitionText: data.transition,
    boardPosition: chess.fen()
  };
}
