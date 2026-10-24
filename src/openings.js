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
