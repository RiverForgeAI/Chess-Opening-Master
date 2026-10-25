export const openings = [
  {
    id: 'italian', name: 'Italian Game', difficulty: 'Beginner',
    description: 'Develop smoothly, then choose a quiet central plan or a later kingside attack.',
    objective: 'Central control and rapid development',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d3'],
    explanation: 'A classic opening that develops both knights and bishops toward active squares.',
    movesDetail: [
      'e4 stakes a claim in the centre and opens lines for the dark-squared bishop and queen.',
      'Nf3 develops toward the centre and attacks e5, increasing pressure on Black’s central pawn.',
      'Bc4 develops the bishop onto the diagonal toward f7, a useful target but not a forced tactic.',
      'c3 prepares the planned d4 central break and supports the d-pawn; it challenges e5 only after d4 is played.',
      'd3 reinforces e4 and chooses a quieter Giuoco Pianissimo structure instead of pushing d4 at once.',
      'Castling gets the king safe and brings the h1-rook into play on the f-file.',
      'Re1 places a rook behind e4, adding support to the central pawn and preparing flexible play.',
      'After ...a6, Bb3 is a voluntary bishop reposition: ...a6 does not attack the bishop on c4. The bishop keeps its diagonal toward f7.',
      'Nbd2 develops the queenside knight, supports e4, and helps prepare a later central advance.',
      'h3 gives the king’s side room and asks a bishop that might come to g4 to make a decision.'
    ],
    simpleDetail: [
      'Your e-pawn steps into the middle and makes room for your pieces.',
      'Your knight hops to f3 and puts pressure on Black’s middle pawn.',
      'Your bishop looks down a path toward Black’s king-side.',
      'Your c-pawn helps prepare a d-pawn push into the middle.',
      'Your d-pawn helps guard e4 and keeps the middle steady.',
      'Your king tucks away safely while a rook joins the game.',
      'Your rook lines up behind your middle pawn.',
      'Your bishop steps back to b3; ...a6 did not attack it.',
      'Your other knight joins in and helps support the middle.',
      'Your h-pawn makes space near your king and asks about a bishop.'
    ],
    blackDetail: ['Black answers in the centre.', 'Black develops a knight.', 'Black mirrors development.', 'Black develops the knight.', 'This line leaves the position to develop.']
  },
  {
    id: 'ruy-lopez', name: 'Ruy Lopez (Spanish Opening)', difficulty: 'Intermediate',
    description: 'Pressure Black’s e5 pawn from the safe and active b5 square.',
    objective: 'Pressure e5 and develop smoothly',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','Bb5','a6','Ba4','Nf6','O-O'],
    explanation: 'One of chess’s richest openings, combining development with lasting pressure.',
    movesDetail: [
      'e4 claims central space and opens development for the bishop and queen.',
      'Nf3 develops while attacking e5; Black’s knight on c6 currently helps defend that pawn.',
      'Bb5 starts the Ruy Lopez: it pressures the c6-knight, an important defender of e5.',
      'After ...a6, Ba4 keeps the bishop and its pressure on the c6-knight rather than exchanging it.',
      'Castling secures the king and connects the rook with the centre.',
      'Re1 adds support behind e4 and prepares White to maintain central tension.',
      'Bb3 is a standard bishop retreat that preserves the bishop and its diagonal toward f7.',
      'c3 supports a possible d4 advance and gives the d-pawn a strong central partner.',
      'd4 challenges Black’s central e5-pawn directly while White is developed and castled.',
      'After ...Bg4, h3 challenges the bishop and reduces its pressure on the f3-knight.'
    ],
    simpleDetail: [
      'Your e-pawn steps into the middle and makes room for your pieces.',
      'Your knight hops to f3 and watches Black’s middle pawn.',
      'Your bishop moves to b5 and puts pressure on a guarding knight.',
      'Your bishop steps to a4 to keep watching that knight.',
      'Your king gets safe and your rook joins the game.',
      'Your rook lines up behind your e-pawn.',
      'Your bishop steps back to b3 and keeps its long diagonal.',
      'Your c-pawn helps prepare a d-pawn push.',
      'Your d-pawn challenges Black’s pawn in the middle.',
      'Your h-pawn asks the bishop to move away.'
    ],
    blackDetail: ['Black meets in the centre.', 'Black defends the knight.', 'Black challenges the bishop.', 'Black develops.', 'The reply prepares flexible development.']
  },
  {
    id: 'scotch', name: 'Scotch Game', difficulty: 'Intermediate',
    description: 'Open the centre early and create an active development race.',
    objective: 'Open lines and active piece play',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','d4','exd4','Nxd4','Nf6','Nc3'],
    explanation: 'White challenges Black in the centre immediately.',
    movesDetail: [
      'e4 occupies the centre and opens lines for White’s bishops and queen.',
      'Nf3 develops and attacks e5, adding pressure to Black’s central pawn.',
      'd4 is the Scotch’s defining central break, immediately challenging e5.',
      'Nxd4 recaptures the pawn with a developed piece and restores material balance.',
      'Nc3 develops another knight and increases control of central squares.',
      'Nxc6 exchanges the knight for Black’s c6-knight and damages Black’s pawn structure after ...bxc6.',
      'Bd3 develops the bishop toward the kingside and supports the e4-pawn.',
      'exd5 removes Black’s central d-pawn; after ...cxd5, Black’s c-pawn recaptures and occupies d5.',
      'Castling secures the king and connects a rook with the centre.',
      'Bg5 develops with pressure on the f6-knight, which is currently in front of Black’s queen.'
    ],
    simpleDetail: [
      'Your e-pawn steps into the middle and makes room for your pieces.',
      'Your knight hops to f3 and puts pressure on Black’s middle pawn.',
      'Your d-pawn challenges Black’s middle right away.',
      'Your knight captures the pawn and takes its place in the middle.',
      'Your other knight joins the fight for the middle.',
      'Your knight trades for Black’s guarding knight.',
      'Your bishop moves to d3 and helps watch e4.',
      'Your e-pawn captures Black’s middle pawn.',
      'Your king gets safe and your rook joins the game.',
      'Your bishop watches Black’s knight in front of the queen.'
    ],
    blackDetail: ['Black mirrors the central pawn.', 'Black defends e5.', 'Black exchanges central pawns.', 'Black develops actively.', 'Black prepares the fifth move sequence.']
  },
  {
    id: 'queens-gambit', name: "Queen's Gambit", difficulty: 'Intermediate',
    description: 'Challenge d5 with c4 and build central pressure; the offered pawn is usually recoverable.',
    objective: 'Control the centre and develop harmoniously',
    representative: true,
    moves: ['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3'],
    explanation: 'The c4 offer challenges d5; it is not usually a lasting pawn sacrifice because Black cannot safely hold the extra pawn.',
    movesDetail: [
      'd4 occupies the centre and opens lines for the c1-bishop and queen.',
      'c4 challenges d5 and is the Queen’s Gambit offer; Black cannot safely hold the pawn without concessions.',
      'Nc3 develops and supports the d5/e4 central squares.',
      'Bg5 develops the bishop and pressures the f6-knight; with ...Be7 behind it, this is pressure rather than a pin to the king.',
      'e3 reinforces d4 and opens the f1-bishop’s diagonal.',
      'Nf3 completes kingside minor-piece development and supports the centre.',
      'Bh4 keeps the bishop after ...h6 and retains pressure on the f6-knight.',
      'cxd5 exchanges White’s c-pawn for Black’s d-pawn; ...exd5 then gives Black a pawn on d5.',
      'Bd3 develops toward the kingside and aims along the diagonal at h7.',
      'Castling secures the king and completes White’s early development.'
    ],
    simpleDetail: [
      'Your d-pawn steps into the middle and makes room for your pieces.',
      'Your c-pawn challenges Black’s d-pawn from the side.',
      'Your knight develops and helps watch the middle.',
      'Your bishop watches Black’s knight, but it is not a king pin.',
      'Your e-pawn helps guard d4 and opens a path for your bishop.',
      'Your knight joins in and helps protect the middle.',
      'Your bishop keeps watching the knight after Black’s h-pawn moves.',
      'Your c-pawn trades for Black’s d-pawn.',
      'Your bishop points toward Black’s king-side.',
      'Your king gets safe and your rook joins the game.'
    ],
    blackDetail: ['Black challenges the centre.', 'Black chooses a sound closed structure.', 'Black develops.', 'Black protects the king.', 'The position continues peacefully.']
  },
  {
    id: 'london', name: 'London System', difficulty: 'Beginner',
    description: 'Build a dependable pawn structure around an early Bf4.',
    objective: 'Reliable development and kingside safety',
    representativeVariation: 'One representative London System variation',
    moves: ['d4','d5','Nf3','Nf6','Bf4','e6','e3','Bd6','Bd3'],
    explanation: 'This chosen line is one representative London System variation, not the only correct London move order.',
    movesDetail: [
      'd4 occupies the centre and opens lines for White’s bishops and queen.',
      'Nf3 develops toward the centre and supports d4.',
      'Bf4 develops the bishop outside the e-pawn chain, the defining London setup.',
      'e3 supports d4 and opens the f1-bishop’s diagonal.',
      'Bd3 develops toward the kingside; Black’s ...Bd6 contests the bishop’s diagonal, so this is a flexible setup rather than a forced attack.',
      'Castling secures the king and connects a rook with the centre.',
      'c4 challenges Black’s d5-pawn and adds central pressure.',
      'Nc3 develops the remaining knight and supports central squares.',
      'Rc1 places the rook behind the c-pawn, supporting it and potential future pressure on the c-file.',
      'Qe2 supports the e3-pawn and makes room for the d1-rook to coordinate.'
    ],
    simpleDetail: [
      'Your d-pawn steps into the middle and makes room for your pieces.',
      'Your knight develops and helps protect d4.',
      'Your bishop steps outside the pawn line to watch the middle.',
      'Your e-pawn helps support d4 and opens a path for your bishop.',
      'Your bishop develops toward the king-side.',
      'Your king gets safe and your rook joins the game.',
      'Your c-pawn challenges Black’s d-pawn.',
      'Your other knight develops and helps watch the middle.',
      'Your rook lines up behind your c-pawn to support it.',
      'Your queen helps support e3 and lets your rook coordinate.'
    ],
    blackDetail: ['Black answers in the centre.', 'Black develops actively.', 'Black supports the pawn chain.', 'Black develops the bishop.', 'Black allows the representative line.']
  },
  {
    id: 'vienna', name: 'Vienna Game', difficulty: 'Intermediate',
    description: 'Play an active f-pawn while developing the kingside.',
    objective: 'Flexible central pressure and attacking chances',
    representative: true,
    moves: ['e4','e5','Nc3','Nf6','f4','d5','Nf3','Nc6','Bb5'],
    explanation: 'The Vienna can lead to active kingside play and sharp central action.',
    movesDetail: [
      'e4 claims the centre and opens lines for White’s bishops and queen.',
      'Nc3 develops the queen knight and supports e4.',
      'f4 is the Vienna Gambit idea: it challenges the centre and offers the f-pawn for activity.',
      'Nf3 develops and supports e5 and d4; Black has countered in the centre with ...d5.',
      'Bb5 develops the bishop and adds pressure to the c6-knight.',
      'Nxe4 recaptures the pawn on e4 with a developed knight.',
      'Nxf6+ removes Black’s f6-knight with check; ...Qxf6 recaptures and brings the queen into play.',
      'Qe2 develops the queen off its starting square and supports the central pieces.',
      'd3 reinforces the centre and opens the c1-bishop’s diagonal.',
      'c3 supports a possible d4 advance and gives the centre a stable base.'
    ],
    simpleDetail: [
      'Your e-pawn steps into the middle and makes room for your pieces.',
      'Your knight develops and helps protect e4.',
      'Your f-pawn challenges Black’s pawns in the middle.',
      'Your knight develops and helps watch the middle.',
      'Your bishop moves to b5 and puts pressure on a guarding knight.',
      'Your knight captures the pawn in the middle.',
      'Your knight captures Black’s knight with check.',
      'Your queen moves out to help your pieces work together.',
      'Your d-pawn helps steady the middle.',
      'Your c-pawn helps prepare a d-pawn push.'
    ],
    blackDetail: ['Black answers centrally.', 'Black develops.', 'Black challenges f4.', 'Black develops.', 'The line enters a central battle.']
  },
  {
    id: 'english', name: 'English Opening', difficulty: 'Intermediate',
    description: 'Prepare the centre from the flank with a flexible setup.',
    objective: 'Space, control of d4, and flexible development',
    representativeVariation: 'One representative English Opening variation',
    moves: ['c4','e5','Nc3','Nf6','g3','d5','Bg2','Be6','Nf3'],
    explanation: 'A flexible flank opening; this sequence is one representative English variation.',
    movesDetail: [
      'c4 controls d5 from the flank and leaves White’s central pawns flexible.',
      'Nc3 develops and supports central squares while maintaining the English setup.',
      'g3 prepares to fianchetto the bishop and increase control of the long diagonal.',
      'Bg2 completes the fianchetto and puts the bishop on the long diagonal toward the centre.',
      'Nf3 develops and supports central squares.',
      'O-O secures the king and connects a rook with the centre.',
      'd3 supports e4 and opens the c1-bishop’s diagonal.',
      'Bg5 develops the bishop and pressures the f6-knight.',
      'Bxf6 exchanges that bishop for the f6-knight; ...Bxf6 recaptures with Black’s bishop.',
      'Rb1 places the rook behind the b-pawn, supporting queenside expansion.'
    ],
    simpleDetail: [
      'Your c-pawn controls a useful middle square from the side.',
      'Your knight develops and helps watch the middle.',
      'Your g-pawn gets ready for the bishop to move out wide.',
      'Your bishop takes the long diagonal to watch the middle.',
      'Your other knight develops and helps protect central squares.',
      'Your king gets safe and your rook joins the game.',
      'Your d-pawn supports e4 and opens a path for your bishop.',
      'Your bishop watches Black’s knight.',
      'Your bishop trades for Black’s knight, then the bishop takes back.',
      'Your rook moves behind the b-pawn to help it advance.'
    ],
    blackDetail: ['Black claims e5.', 'Black develops.', 'Black challenges the centre.', 'Black develops the bishop.', 'Black closes the representative line.']
  },
  {
    id: 'king-indian-attack', name: "King's Indian Attack", difficulty: 'Intermediate',
    description: 'Build a flexible kingside setup that can meet many defences.',
    objective: 'Flexible development and kingside space',
    representativeVariation: 'One representative King’s Indian Attack move order',
    moves: ['Nf3','d5','g3','Nf6','Bg2','e6','O-O','Be7','d3'],
    explanation: 'This is one representative move order; the King’s Indian Attack can transpose from several systems.',
    movesDetail: [
      'Nf3 develops toward the centre and keeps White’s setup flexible; this move alone does not define the KIA.',
      'g3 prepares a kingside fianchetto while Black occupies the centre with ...d5.',
      'Bg2 completes the fianchetto and adds long-diagonal pressure on the centre.',
      'Castling secures the king and connects a rook with the centre.',
      'd3 builds the characteristic solid KIA pawn structure and prepares e4.',
      'Nbd2 develops the queenside knight and supports the planned e4 advance.',
      'e4 claims central space, supported by d3 and the developed pieces.',
      'Re1 supports e4 from behind and helps coordinate the central pieces.',
      'Nf1 reroutes the knight toward useful kingside squares such as g3 or e3.',
      'c3 supports d4 and gives White a stable base for future central play.'
    ],
    simpleDetail: [
      'Your knight develops and helps watch the middle.',
      'Your g-pawn gets ready for the bishop to move out wide.',
      'Your bishop takes the long diagonal to watch the middle.',
      'Your king gets safe and your rook joins the game.',
      'Your d-pawn helps build a steady middle and prepares e4.',
      'Your other knight develops and helps support e4.',
      'Your e-pawn takes space in the middle.',
      'Your rook lines up behind your e-pawn to support it.',
      'Your knight takes a new route toward your king-side.',
      'Your c-pawn helps prepare a d-pawn push.'
    ],
    blackDetail: ['Black challenges the centre.', 'Black develops.', 'Black supports development.', 'Black develops the bishop.', 'Black closes this representative line.']
  }
];

export const openingById = (id) => openings.find((opening) => opening.id === id);

export function openingStrategy(opening, depth = 5) {
  const theme = {
    italian: {
      focusTitle: 'Quiet central pressure',
      focusText: 'White aims to build a stable centre and prepare a later d4 or kingside plan without rushing the game.',
      bigPicture: 'The Italian Game is one of the most flexible and instructive openings. White develops quickly, challenges the centre, and aims for a calm structure with good piece activity. It suits players who want clear ideas and a long-term strategic plan instead of relying on a forced tactical shot.',
      development: 'The usual plan is to bring the knights out toward central squares, develop the bishops, and then look for a steady central break. The bishop on c4 and the knight on f3 are often linked, and White can invite Black to show how the position will unfold before committing to a direct break.',
      centre: 'The e4 pawn provides the main central claim, while c3 prepares the powerful d4 push. Black will often challenge the centre with ...e5 or ...d5 and White must decide whether to mobilise the centre immediately or keep the position more flexible.',
      plans: [
        { name: 'Prepare d4', purpose: 'Open the centre and challenge the d5/e5 structure.', pieces: 'd-pawn, bishops, knight on f3.', conditions: 'Works when White has developed enough pieces and Black has not yet created equal counterplay.', drawbacks: 'A premature push can give Black time to attack the centre and develop with tempo.' },
        { name: 'Target the f7 square', purpose: 'Create pressure along the long diagonal and on the king-side.', pieces: 'Bishop on c4 and queen/rooks.', conditions: 'Best when Black has not fully organised the centre or castled early.', drawbacks: 'If Black is ready, the bishop can be chased or the attack can fizzle against the right setup.' },
        { name: 'Play a quiet kingside build', purpose: 'Choose a stable setup and then attack later.', pieces: 'Knight, rook, bishop, and central pawns.', conditions: 'Useful when Black wants a slow, positional struggle or when White prefers to keep the position under control.', drawbacks: 'The lack of direct tension can allow Black to equalise before White launches a plan.' }
      ],
      blackIdeas: 'Black is usually trying to challenge White’s centre, develop harmoniously, and create counterplay on the queenside or in the central tension. White should notice if Black is pressing the c7 square, threatening a d5 break, or trying to force the issue around the king-side.',
      mistakes: [
        { title: 'Pushing too early', risk: 'A premature advance can leave White behind in development and give Black the initiative.', remedy: 'Make sure the centre is supported by pieces before the break is launched.' },
        { title: 'Ignoring the bishop on c4', risk: 'The bishop can become a long-term pressure piece if White keeps it active.', remedy: 'Notice the weakness on f7 and the pressure to the king-side.' },
        { title: 'Misreading Black’s counterplay', risk: 'Black may answer the centre with a pawn break or a timely development decision.', remedy: 'Check whether Black has the right move order before committing to a single plan.' }
      ],
      transition: {
        whatNext: 'After the opening, White usually asks whether to keep the centre stable or prepare a pawn break. The right plan depends on how Black responds, which pieces are developed, and whether the central tension remains flexible.',
        summary: 'This is a balanced, positionally rich opening that rewards calm development and accurate timing.'
      },
      takeaways: {
        principles: ['Develop before committing to a deep pawn break.', 'Keep the centre flexible and coordinated.', 'Watch the long diagonal and f7 pressure.'],
        questions: ['What is Black threatening in the centre?', 'Which piece is behind in development?', 'Am I ready to break the centre, or should I keep the tension?'],
        summary: 'The Italian Game is a calm strategic opening: build the centre, coordinate the pieces, and only then choose when to strike.'
      }
    },
    'ruy-lopez': {
      focusTitle: 'Enduring pressure on e5',
      focusText: 'White uses the bishop on b5 or a4 to pin and pressure the knight and central pawn, while building a strong central structure behind it.',
      bigPicture: 'The Ruy Lopez is a classical opening of long-term pressure. White develops a bishop to a powerful active square and aims to challenge the c6-knight and the pawn on e5 without simply exchanging material. It is ideal for players who enjoy strategic tension and deep planning.',
      development: 'White often develops the queen-side knight, shortens the route for the kingside pieces, and looks for a flexible plan. The bishop on b5 or a4 can create pressure while White keeps the centre stable and waits for the right moment to play c3 and d4.',
      centre: 'The central pawn on e5 is a key target, and the c6-knight often supports it. White tries to use the bishop to create pressure along the c6-f3 or b5-a4 route, then prepare c3 and d4 at the moment when the position is ready. Black will often respond with calm development and counterplay in the centre.',
      plans: [
        { name: 'Build central tension', purpose: 'Limit Black’s counterplay and keep the centre under pressure.', pieces: 'c-pawn, d-pawn, bishop, and central pieces.', conditions: 'Most effective when White has already developed safely and can accept a flexible structure.', drawbacks: 'If White runs ahead without a concrete plan, Black can absorb the pressure and create activity.' },
        { name: 'Pressure the c6-knight', purpose: 'Challenge Black’s coordination and encourage a favourable central battle.', pieces: 'Bishop on b5 and knight on f3.', conditions: 'Works when the bishop can remain active and White has enough time to attack the central weakness.', drawbacks: 'The bishop can be chased or the threat can lose force if Black rearranges pieces in time.' },
        { name: 'Expand on the queenside', purpose: 'Create pressure and room for a later break.', pieces: 'Rook, knight, and central pawns.', conditions: 'Useful when White wants to use space and influence on both sides of the board.', drawbacks: 'This can be slow if the centre is not ready or if Black attacks the king-side early.' }
      ],
      blackIdeas: 'Black often wants to challenge the central tension, develop a balanced set, and prepare a counterstrike. White should respect Black’s possibility of a pawn break or a central exchange rather than assuming the bishop pressure alone is decisive.',
      mistakes: [
        { title: 'Overvaluing the pin', risk: 'A bishop on b5 may not be winning by itself if Black can simply develop and relieve the pressure.', remedy: 'Look for the plan behind the pressure instead of only the threat on a piece.' },
        { title: 'Premature central break', risk: 'White may play d4 without enough support and provide Black a timely central challenge.', remedy: 'Check the surrounding piece placement and Black’s condition before forcing the break.' },
        { title: 'Ignoring kingside harmony', risk: 'The position can become lopsided if White only considers the bishop pressure and ignores the king-side.', remedy: 'Coordinate the king-side assets and keep the king safe before the attack.' }
      ],
      transition: {
        whatNext: 'The Ruy Lopez often becomes a strategic duel over the central pawn structure. White should ask whether the pressure is enough to justify a break, or whether the stronger move is to keep the tension and improve the pieces.',
        summary: 'The opening rewards patience, piece coordination, and a willingness to use pressure rather than force a tactical solution.'
      },
      takeaways: {
        principles: ['Pressure the centre without losing your own structure.', 'Prepare a central break only when the pieces are ready.', 'Keep the bishop active and the king safe.'],
        questions: ['What is Black doing with the centre?', 'Is White’s bishop pressure actually forcing something?', 'Which piece needs to improve before a tactical or positional break?'],
        summary: 'The Ruy Lopez is a deep strategic opening: pressure and patience are often more important than immediate force.'
      }
    },
    scotch: {
      focusTitle: 'Open the centre early',
      focusText: 'White immediately challenges Black’s central structure and then uses active pieces and open lines to create long-term attacking chances.',
      bigPicture: 'The Scotch Game is an energetic opening for players who want quick development and a direct contest in the middle. White commits to the central challenge early, forcing Black to react and often revealing strong open-file play and active piece activity.',
      development: 'The key idea is to develop quickly while the centre is open, then use the extra central control to improve the pieces. Knights and bishops get active rapidly, and White can often create initiative because the position is open and tactical themes appear quickly.',
      centre: 'The d4 move is the opening’s main strategic statement: it challenges Black’s central pawn and opens the c1 bishop and the queen’s lines. White is often ready to trade central pawns if it means improved development and more action on the board.',
      plans: [
        { name: 'Challenge the centre', purpose: 'Force Black to answer immediately and create long-term pressure.', pieces: 'd-pawn, knight, queen, bishop.', conditions: 'Best when White has enough time to develop before Black creates a more serious imbalance.', drawbacks: 'The centre can become a battleground, and White may be left with open lines without the right coordination.' },
        { name: 'Use active pieces', purpose: 'Exploit the open files and development advantage.', pieces: 'Knights, bishops, and rooks.', conditions: 'Works especially well when open lines and central activity make mobility more valuable than a pawn structure.', drawbacks: 'If the centre is not controlled, Black may find a tactical or strategic equaliser.' },
        { name: 'Generate central play', purpose: 'Rearrange pieces and create threats on both sides.', pieces: 'Black-squared bishop and central knight.', conditions: 'Useful when White has development and can pressure central weaknesses.', drawbacks: 'Open positions often favour the player who finds the better tactical idea.' }
      ],
      blackIdeas: 'Black usually tries to regain central balance, challenge White’s active pieces, or open the position in a way that makes White’s plan more concrete. White must recognise when Black is simply equalising and when Black is preparing a tactical reaction.',
      mistakes: [
        { title: 'Thinking the opening is only tactics', risk: 'The Scotch can become a strategic struggle if the centre and development are not cared for.', remedy: 'Use active pieces to support the centre rather than chasing tactics too early.' },
        { title: 'Ignoring the imbalance', risk: 'A pawn trade may leave one side with more activity or a weaker structure.', remedy: 'Ask whether the resulting structure or dynamic helps White more than it hurts.' },
        { title: 'Neglecting king safety', risk: 'Open positions can teem with tactical tricks if the king is left in the middle.', remedy: 'Castle early and make sure the central and kingside pieces are coordinated.' }
      ],
      transition: {
        whatNext: 'White must decide whether the active position favours early tactical play or a more positional improvement of pieces. The right real-game plan depends on Black’s response and whether White has enough development to exploit the centre.',
        summary: 'The Scotch is a direct, energetic opening: open the middle, use the initiative, and stay ready for tactical complications.'
      },
      takeaways: {
        principles: ['Open the centre when you are ready to use it.', 'Develop quickly and coordinate the pieces.', 'Use open lines to create a dynamic advantage.'],
        questions: ['Is my centre already supported by pieces?', 'Which open file or central square is most dangerous?', 'Can I keep the initiative without neglecting king safety?'],
        summary: 'The Scotch is about active, direct development and a willingness to engage in the central fight early.'
      }
    },
    'queens-gambit': {
      focusTitle: 'Challenge d5 with control and patience',
      focusText: 'White invites Black to accept a central challenge, then builds a stable position with strong central pressure and a flexible long-term plan.',
      bigPicture: 'The Queen’s Gambit is a central opening that asks Black to decide whether to accept a pawn or refuse it. White is not usually trying to win material; the idea is to challenge Black’s centre and create long-term strategic pressure while the position remains stable and coordinated.',
      development: 'White develops harmoniously, often putting pressure on Black’s central d5 pawn without letting the early offer turn into a trap. The bishop and knights support a future central break while the queen is often kept flexible until the right strategic moment.',
      centre: 'The c-pawn and d-pawn create a central tension that can become a long-term strategic battle. White often wants to use the central space and the value of the bishop pair or flexibility in the position rather than simply holding the extra pawn.',
      plans: [
        { name: 'Build a central squeeze', purpose: 'Use pressure on key central squares and reduce Black’s mobility.', pieces: 'Central pawns, bishop, knight, rooks.', conditions: 'Works well when White has developed the pieces and Black has not broken the centre.', drawbacks: 'If White can’t keep the pressure, Black may use the extra space to equalise.' },
        { name: 'Prepare the central break', purpose: 'Use the c- and d-pawns to challenge the centre and open lines.', pieces: 'Central pawns and pieces supporting them.', conditions: 'Typically ideal when the centre is stable and White has enough development to support the break.', drawbacks: 'A break before the pieces are ready can weaken White’s structure or leave the king exposed.' },
        { name: 'Use the bishop pair or long diagonal', purpose: 'Create pressure down a long diagonal or on the queen-side.', pieces: 'Bishops and supporting pieces.', conditions: 'Most effective when Black’s movement is restricted and White can act without friction.', drawbacks: 'Long-term pressure is not always concrete; it requires exact timing.' }
      ],
      blackIdeas: 'Black usually aims to hold the centre, coordinate the pieces, and decide whether the extra pawn is worth the concession. White must respect the possibility that Black’s counterplay or central expansion will turn the position against an over-eager attack.',
      mistakes: [
        { title: 'Assuming the gambit is permanent', risk: 'The extra pawn is often not worth the strategic concessions if White cannot absorb the pressure.', remedy: 'Ask whether the plan is sound beyond the immediate material balance.' },
        { title: 'Ignoring Black’s centre', risk: 'The position can become uncomfortable if White ignores how Black reacts in the centre.', remedy: 'Break or challenge only when the pieces are ready.' },
        { title: 'Forgetting king safety', risk: 'The centre can open lines that endanger the king if White is too aggressive early.', remedy: 'Castle and organise the king-side before launching a deep plan.' }
      ],
      transition: {
        whatNext: 'The Queen’s Gambit often transitions into a strategic battle where White compares the central pressure with the long-term value of the pawn and the quality of the position. The best continuation depends on Black’s setup and the readiness of the pieces.',
        summary: 'This opening rewards calm central pressure, careful timing, and a clear strategic plan in a stable structure.'
      },
      takeaways: {
        principles: ['Challenge the centre with purpose, not impulse.', 'Keep development harmonious before committing to a break.', 'Understand the returning pawn before chasing tactical chances.'],
        questions: ['What is Black trying to do with the centre?', 'Is the extra pawn worth the structural concessions?', 'Which piece needs to improve before the break?'],
        summary: 'The Queen’s Gambit is a classic strategic opening: pressure the centre, use flexibility, and play for the better long-term structure.'
      }
    },
    london: {
      focusTitle: 'Build a solid setup and then break',
      focusText: 'White keeps the structure calm, develops the minor pieces, and then uses the c4 or central break to create pressure when the time is right.',
      bigPicture: 'The London System is a reliable, practical opening that emphasises harmony and control rather than early risk. White develops the light-squared bishop to f4, keeps the centre stable, and then waits for the right moment to challenge the d5 pawn or expand the queenside.',
      development: 'The opening values natural development, good king safety, and a flexible pawn structure. White often aims for a strong central foundation and then has the option to improve pieces, build pressure, or prepare a central challenge depending on Black’s answers.',
      centre: 'The key strategic theme is how to handle the d5 central pawn and the value of the c-pawn. White can often create pressure by advancing c2-c4 or by repositioning pieces to challenge the centre while remaining in a practical and safe setup.',
      plans: [
        { name: 'Prepare c4', purpose: 'Challenge d5 and create space.', pieces: 'c-pawn, knight, bishop, queen.', conditions: 'Best when White has the pieces in place and the position is ready for a central change.', drawbacks: 'The break can be premature if Black is already active or if the centre isn’t stable.' },
        { name: 'Improve the bishop pair', purpose: 'Create a healthy position and activity without giving Black too much.', pieces: 'Bishops, rooks, and central pieces.', conditions: 'Useful at all phases when Black’s development is slow or flexible.', drawbacks: 'Over-improvement may allow Black to use the moment to challenge the centre.' },
        { name: 'Slowly improve the kingside', purpose: 'Create a strong strategic setup and prepare for later action.', pieces: 'Knights, rooks, and king-side pieces.', conditions: 'Works well in practical games where the position is closed or balanced.', drawbacks: 'The strategy can become passive if White does not look for the right challenge.' }
      ],
      blackIdeas: 'Black often aims to challenge the central structure and create active piece play. White should recognise the importance of a well-timed centre break and avoid simply playing piece moves without a clear plan.',
      mistakes: [
        { title: 'Passive development', risk: 'The London can become inert if White never creates a central break.', remedy: 'Improve the pieces and then look for the right moment to challenge the pawn structure.' },
        { title: 'Overvaluing the structure', risk: 'A quiet setup can become a strategic trap if White does not use the space advantage.', remedy: 'Balance flexibility with concrete plans for the centre.' },
        { title: 'Ignoring Black’s counterplay', risk: 'The centre may be challenged before White is ready.', remedy: 'Assess Black’s active squares before forcing a plan.' }
      ],
      transition: {
        whatNext: 'The London often continues into a strategic middlegame where the central tension and piece placement decide the best plan. White usually asks whether the position is ready for a break or if the better plan is still to improve the pieces.',
        summary: 'The London is a practical and dependable opening that rewards patience, good coordination, and the right strategic break.'
      },
      takeaways: {
        principles: ['Build a strong and stable centre.', 'Improve the pieces before testing the break.', 'Use a central challenge only when the timing is good.'],
        questions: ['What is my best central break?', 'Where is Black’s counterplay coming from?', 'Which piece needs to improve before I act?'],
        summary: 'The London is a flexible, practical opening: don’t rush the position, but don’t let it become passive either.'
      }
    },
    vienna: {
      focusTitle: 'Play for central activity',
      focusText: 'White creates active central positions and tactical chances by advancing the f-pawn and attacking the centre with rapid development.',
      bigPicture: 'The Vienna Game is a sharp, tactical opening that aims to challenge the centre and create active piece play. White is often trying to build a strong initiative from flexible central control rather than simply complete a quiet setup.',
      development: 'The key idea is rapid development and central pressure, especially around the e4 and d5 squares. White often aims to create tactical threats while keeping the position active and difficult for Black to solve.',
      centre: 'The centre is contested quickly, and the c-pawn or f-pawn can become a strategic symbol of White’s activity. White must be careful not to let tactical ideas become a trap; the central battle needs both accuracy and coordination.',
      plans: [
        { name: 'Open the centre', purpose: 'Create rapid activity and tactical complications.', pieces: 'f-pawn, central pieces, queen, rooks.', conditions: 'Most effective when White can coordinate and force the centre to open.', drawbacks: 'The position can become dangerous if White lacks support or king safety.' },
        { name: 'Use the knight and bishop pressure', purpose: 'Create threats on the king-side or central squares.', pieces: 'Bishop and knight, queen, and rooks.', conditions: 'Works when White’s development is quick and Black is not ready to rebalance.', drawbacks: 'No tactical theme is safe if White does not understand the position after the first exchange.' },
        { name: 'Exploit the open lines', purpose: 'Turn central pressure into concrete activity.', pieces: 'Rooks, bishops, queen, and central pawns.', conditions: 'Useful when the central tension leads to open lines or pinned pieces.', drawbacks: 'Open positions can make the king vulnerable or leave White without a safe plan.' }
      ],
      blackIdeas: 'Black usually wants to close the centre, recapture central pawns, or create a stable structure. White should remain aware that tactical threats can become strategic problems if Black reacts correctly and defends the central ideas.',
      mistakes: [
        { title: 'Trusting a tactical idea too early', risk: 'A sharp idea may be unsound if the position is not fully prepared.', remedy: 'Check whether the central advances and king safety support the tactical plan.' },
        { title: 'Ignoring the central imbalance', risk: 'If White does not understand the central position, tactics can backfire badly.', remedy: 'Ask how Black will react before assuming the attack has a built-in win.' },
        { title: 'Leaving the king vulnerable', risk: 'Open positions can punish a delayed castling or poor coordination.', remedy: 'Keep the king safe and avoid tactical greed.' }
      ],
      transition: {
        whatNext: 'The Vienna often turns into a tactical middlegame where White wants to use activity, but Black may aim to equalise or punish the overextended centre. The correct move depends on whether White has enough support and whether the central plan still makes sense.',
        summary: 'The Vienna offers open play and dynamic tactical chances, but only if White keeps the pieces coordinated and the king safe.'
      },
      takeaways: {
        principles: ['Use central imbalance to create activity, not just chaos.', 'Keep the king safe in sharp positions.', 'Ask whether the tactic is real before you trust it.'],
        questions: ['Is the central tension leading to a real tactical idea?', 'Where is Black’s best counterplay?', 'Can I keep my king safe while attacking?'],
        summary: 'The Vienna Game is a sharp and dynamic opening: active warfare is good, but accurate coordination matters more than forcing a tactical shot.'
      }
    },
    english: {
      focusTitle: 'Flexible flank pressure',
      focusText: 'White builds from the flank, prepares central influence, and creates a flexible long-term plan without committing too early to a fixed structure.',
      bigPicture: 'The English Opening is a flexible, strategic family that begins with a flank move and develops a setup that can later transpose into many structures. It suits players who like flexibility, subtle pressure, and a game that can change shape depending on Black’s choices.',
      development: 'The opening often uses a fianchetto setup with the bishop on g2, a flexible centre, and a later break or queenside expansion. White can choose between control of the centre, flexible pawn moves, and a more balanced long-term plan.',
      centre: 'The English is not only about moving the c-pawn; it is about using the flank move to prepare central influence with pieces and flexibility. White often keeps the centre flexible and then decides whether a d3 or e4 break is best depending on the position.',
      plans: [
        { name: 'Prepare the fianchetto', purpose: 'Create long-range pressure and a stable structure.', pieces: 'g-pawn, bishop, and central support.', conditions: 'Ideal when White wants a flexible setup and flexible central control.', drawbacks: 'The bishop may be less active if the centre becomes too rigid.' },
        { name: 'Choose the right central break', purpose: 'Make the centre more active when the setup is ready.', pieces: 'd-pawn, e-pawn, central pieces.', conditions: 'Most effective when the position is stable and White is ready to commit to a structure.', drawbacks: 'A premature break often gives Black a chance to use the extra space.' },
        { name: 'Expand on the queenside', purpose: 'Use space and piece activity to create long-term pressure.', pieces: 'Rook, knight, queen, and central pawns.', conditions: 'Works when the flank expansion is supported by a stable central setup.', drawbacks: 'The pressure may be slow if Black is already attacking the central target.' }
      ],
      blackIdeas: 'Black often tries to challenge White’s central flexibility and create a more direct tactical or strategic battle. White must ensure the flank setup is not an excuse for passivity and that the central and kingside pieces remain active.',
      mistakes: [
        { title: 'Waiting too long', risk: 'A flexible setup can become a passive one if White never chooses a plan.', remedy: 'Ask what structure the position wants and whether a central or queenside break is ready.' },
        { title: 'Ignoring the centre', risk: 'The English can become distorted if White builds on the flank without understanding the central structure.', remedy: 'Use the flank move to prepare the right central challenge, not replace it.' },
        { title: 'Overcomplicating the setup', risk: 'The opening’s flexibility is a strength, but it can become a weakness if the plan is unclear.', remedy: 'Keep the position coherent and give each piece a clear role.' }
      ],
      transition: {
        whatNext: 'The English often arrives at a middlegame where the real question is whether White should expand on the flank or commit to a central break. The best plan depends on how Black reacts and which central concessions follow.',
        summary: 'The English is a flexible strategic opening: bide time, build a strong setup, and then choose the right central or flank plan.'
      },
      takeaways: {
        principles: ['Keep the structure flexible and the pieces coordinated.', 'Use the flank move to prepare the central or queenside plan.', 'Choose a break only when the position is ready.'],
        questions: ['Which plan suits this structure best?', 'Where does Black have active counterplay?', 'Am I using the flank move to create options or merely delaying the decision?'],
        summary: 'The English is a strategic opening of flexibility and patience, rewarding a clear plan over a rushed tactical motif.'
      }
    },
    'king-indian-attack': {
      focusTitle: 'Build a stable kingside setup',
      focusText: 'White creates a flexible kingside structure, develops harmoniously, and then chooses between a central break or a more direct kingside strategy.',
      bigPicture: 'The King’s Indian Attack is a flexible opening that creates a strong kingside structure and useful central tension without committing to a large central pawn break early. It is well suited to players who value harmony, timing, and a solid setup that can become active when the moment is right.',
      development: 'White often develops the knight to f3, fianchettos the bishop on g2, and aims to build a reliable pawn structure around the central squares. The position can later become active with d3, e4, and a central break when White is ready to convert the setup into pressure.',
      centre: 'The central structure is usually stable and flexible. White does not need to carve out a large opening immediately; instead, the key is to prepare the right break and ensure the pieces are all ready to work together.',
      plans: [
        { name: 'Prepare e4', purpose: 'Challenge the centre and create more space for the active pieces.', pieces: 'e-pawn, bishops, knights, and central support.', conditions: 'Most useful when the centre is stable and the pieces are coordinated.', drawbacks: 'The break can be premature if the centre is still unready.' },
        { name: 'Use the kingside pressure', purpose: 'Create a long-term attack and build tension on the king-side.', pieces: 'Bishop, queen, rooks, and central knots.', conditions: 'Works best when Black is not ready to answer the kingside threats.', drawbacks: 'The attack may be slow or too indirect without clear support.' },
        { name: 'Expand with a queenside plan', purpose: 'Create pressure with a flank plan as the centre becomes more stable.', pieces: 'Queenside pieces and rook activity.', conditions: 'Useful when White can prepare a slower strategic build with less immediate risk.', drawbacks: 'The plan may be too slow against a more aggressive player.' }
      ],
      blackIdeas: 'Black often tries to challenge the central space and ensure that the kingside setup does not become too active too early. White must look for the best moment to create pressure rather than simply assuming the structure alone is enough.',
      mistakes: [
        { title: 'Forgetting the bishop on g2', risk: 'The bishop can become a key strategic piece if White ignores it.', remedy: 'Keep the bishop active and use the fianchetto to support the centre and later kingside plans.' },
        { title: 'Rushing the e4 break', risk: 'If the centre is not ready, the break can open the position too soon.', remedy: 'Wait until the pieces are coordinated and Black’s response is understood.' },
        { title: 'Neglecting a counterattack', risk: 'Black may use kingside or central counterplay if White is too slow.', remedy: 'Always ask what Black is threatening before making the strategic choice.' }
      ],
      transition: {
        whatNext: 'The King’s Indian Attack usually evolves into a position where White must decide whether to move the central pawns or continue building a flexible structure. The right move depends on Black’s setup, the readiness of the pieces, and the potential for kingside or central activity.',
        summary: 'This opening values harmony, patience, and strong strategic timing rather than a single forced tactical concept.'
      },
      takeaways: {
        principles: ['Build the structure before forcing a break.', 'Coordinate the kingside and central pieces.', 'Use the right moment to create pressure, not the first moment.'],
        questions: ['What is Black threatening right now?', 'Is the position ready for e4 or should White improve first?', 'Which piece is still underdeveloped or out of harmony?'],
        summary: 'The King’s Indian Attack is a flexible strategic opening: create a stable structure, coordinate the pieces, and choose the break at the right time.'
      }
    }
  };

  const data = theme[opening.id] ?? {
    focusTitle: 'Strong strategic foundations',
    focusText: `${opening.name} rewards careful planning, flexible development, and a clear understanding of the position before committing to a major break.`,
    bigPicture: `This repertoire teaches players to understand the broader strategic ideas behind ${opening.name}. White wants to build harmony, control key squares, and use the right plan at the right time instead of chasing a single tactical idea.`,
    development: 'White aims to develop smoothly and coordinate the pieces so that the central structure and long-term plans support each other. The key is to build a position where the pieces are active and where the plans are coherent rather than forced.',
    centre: 'The centre is important because it influences the route of the pieces and helps define the best strategic plans. White tries to support the central squares, but the opening continues to reward flexibility if Black is ready to challenge that setup.',
    plans: [
      { name: 'Prepare the central strategic break', purpose: 'Challenge the central claims and improve the position.', pieces: 'Central pawns and support pieces.', conditions: 'Best when the pieces are fully coordinated and ready to convert the tension.', drawbacks: 'A break can backfire if it comes too early or if the coordination is incomplete.' },
      { name: 'Improve the active piece', purpose: 'Increase pressure and find a more harmonious setup.', pieces: 'The piece that can create the most activity or attack.', conditions: 'Useful whenever White can improve the piece without weakening the centre.', drawbacks: 'A minor improvement may fail if the plan is not coordinated with the rest of the position.' },
      { name: 'Build the right long-term plan', purpose: 'Use the opening’s strategic idea to prepare a middlegame plan.', pieces: 'All pieces working toward a shared goal.', conditions: 'Works as long as White keeps the position flexible and understands the threats.', drawbacks: 'A vague plan can become passive or reactive.' }
    ],
    blackIdeas: 'Black will usually look for counterplay in the centre, a pressure point, or a tactical resource. White must stay alert and avoid assuming that the opening has already decided the strategic battle.',
    mistakes: [
      { title: 'Forcing the wrong plan', risk: 'A plan can lose its value if it is launched without enough support.', remedy: 'Look for the conditions that make the idea sound.' },
      { title: 'Neglecting the centre', risk: 'White can lose the initiative if the central tension is ignored.', remedy: 'Keep the centre under control while developing the pieces.' },
      { title: 'Ignoring the developing counterplay', risk: 'Black may already be preparing a practical response.', remedy: 'Notice threats before committing to a big strategic plan.' }
    ],
    transition: {
      whatNext: 'The key is to understand which plans are already in place, which pieces are ready to act, and which tactical ideas remain realistic. The right middlegame plan depends on Black’s answer and the quality of the resulting position.',
      summary: `${opening.name} teaches a clear strategic theme: build a coherent setup, then choose the right break or plan when the moment is ready.`
    },
    takeaways: {
      principles: ['Develop and coordinate before forcing a break.', 'Respect the centre and its supporting pieces.', 'Choose the right idea for the actual position.'],
      questions: ['What is my opponent threatening?', 'Which of my pieces is behind?', 'Is my planned break ready, or am I rushing it?'],
      summary: `${opening.name} rewards understanding, coordination, and a clear strategic plan rather than a single memorised move.`
    }
  };

  return {
    ...data,
    depthText: depth === 10 ? 'At ten-move depth, the position can show how the strategic ideas have already started to crystallise and what needs to be watched next.' : 'At five-move depth, the opening often still feels flexible, with White preparing the central break or a more permanent strategic setup.',
    depthNote: depth === 10 ? 'Tenth move: review the long-term strategic position' : 'Fifth move: review the opening’s key strategic aims',
    variationLabel: depth === 10 ? 'Ten-move position' : 'Five-move position'
  };
}
