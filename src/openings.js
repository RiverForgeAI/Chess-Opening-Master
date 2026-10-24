export const openings = [
  {
    id: 'italian', name: 'Italian Game', difficulty: 'Beginner',
    description: 'Develop quickly and aim for a fast attack on the kingside.',
    objective: 'Central control and rapid development',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d3'],
    explanation: 'A classic opening that develops both knights and bishops toward active squares.',
    movesDetail: ['Claim the centre.', 'Develop the king knight.', 'Develop the dark-squared bishop.', 'Prepare the centre safely.', 'Support a later central advance.'],
    blackDetail: ['Black answers in the centre.', 'Black develops a knight.', 'Black mirrors development.', 'Black develops the knight.', 'This line leaves the position to develop.']
  },
  {
    id: 'ruy-lopez', name: 'Ruy Lopez (Spanish Opening)', difficulty: 'Intermediate',
    description: 'Pressure Black’s e5 pawn from the safe and active b5 square.',
    objective: 'Pressure e5 and develop smoothly',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','Bb5','a6','Ba4','Nf6','O-O'],
    explanation: 'One of chess’s richest openings, combining development with lasting pressure.',
    movesDetail: ['Claim the centre.', 'Develop with tempo against e5.', 'Put long-term pressure on the knight.', 'Ask the bishop to retreat.', 'Keep the king safe.'],
    blackDetail: ['Black meets in the centre.', 'Black defends the knight.', 'Black challenges the bishop.', 'Black develops.', 'The reply prepares flexible development.']
  },
  {
    id: 'scotch', name: 'Scotch Game', difficulty: 'Intermediate',
    description: 'Open the centre early and create an active development race.',
    objective: 'Open lines and active piece play',
    representative: true,
    moves: ['e4','e5','Nf3','Nc6','d4','exd4','Nxd4','Nf6','Nc3'],
    explanation: 'White challenges Black in the centre immediately.',
    movesDetail: ['Occupy the centre.', 'Develop the knight naturally.', 'Challenge Black’s pawn structure.', 'Recapture with the knight.', 'Develop another defender toward the centre.'],
    blackDetail: ['Black mirrors the central pawn.', 'Black defends e5.', 'Black exchanges central pawns.', 'Black develops actively.', 'Black prepares the fifth move sequence.']
  },
  {
    id: 'queens-gambit', name: "Queen's Gambit", difficulty: 'Intermediate',
    description: 'Offer a flank pawn to gain a strong centre and open lines.',
    objective: 'Control the centre and develop harmoniously',
    representative: true,
    moves: ['d4','d5','c4','e6','Nc3','Nf6','Bg5','Be7','e3'],
    explanation: 'The pawn offer is designed to redirect pressure toward the centre.',
    movesDetail: ['Claim the d-file centre.', 'Challenge Black in the centre.', 'Develop with central pressure.', 'Add another central defender.', 'Complete a flexible central structure.'],
    blackDetail: ['Black challenges the centre.', 'Black chooses a sound closed structure.', 'Black develops.', 'Black protects the king.', 'The position continues peacefully.']
  },
  {
    id: 'london', name: 'London System', difficulty: 'Beginner',
    description: 'Build a dependable pawn structure around an early Bf4.',
    objective: 'Reliable development and kingside safety',
    representativeVariation: 'One representative London System variation',
    moves: ['d4','d5','Nf3','Nf6','Bf4','e6','e3','Bd6','Bd3'],
    explanation: 'This chosen line is one representative London System variation, not the only correct London move order.',
    movesDetail: ['Occupy the centre.', 'Develop while supporting the centre.', 'Place the light bishop early.', 'Secure the pawn structure.', 'Complete harmonious development.'],
    blackDetail: ['Black answers in the centre.', 'Black develops actively.', 'Black supports the pawn chain.', 'Black develops the bishop.', 'Black allows the representative line.']
  },
  {
    id: 'vienna', name: 'Vienna Game', difficulty: 'Intermediate',
    description: 'Play an active f-pawn while developing the kingside.',
    objective: 'Flexible central pressure and attacking chances',
    representative: true,
    moves: ['e4','e5','Nc3','Nf6','f4','d5','Nf3','Nc6','Bb5'],
    explanation: 'The Vienna can lead to active kingside play and sharp central action.',
    movesDetail: ['Claim the centre.', 'Develop the queen knight.', 'Challenge the centre with the f-pawn.', 'Develop safely toward the centre.', 'Complete coordination with the bishop.'],
    blackDetail: ['Black answers centrally.', 'Black develops.', 'Black challenges f4.', 'Black develops.', 'The line enters a central battle.']
  },
  {
    id: 'english', name: 'English Opening', difficulty: 'Intermediate',
    description: 'Prepare the centre from the flank with a flexible setup.',
    objective: 'Space, control of d4, and flexible development',
    representativeVariation: 'One representative English Opening variation',
    moves: ['c4','e5','Nc3','Nf6','g3','d5','Bg2','Be6','Nf3'],
    explanation: 'A flexible flank opening; this sequence is one representative English variation.',
    movesDetail: ['Control d5 from the flank.', 'Develop the queen knight.', 'Fianchetto for diagonal control.', 'Complete the bishop connection.', 'Develop the final knight.'],
    blackDetail: ['Black claims e5.', 'Black develops.', 'Black challenges the centre.', 'Black develops the bishop.', 'Black closes the representative line.']
  },
  {
    id: 'king-indian-attack', name: "King's Indian Attack", difficulty: 'Intermediate',
    description: 'Build a flexible kingside setup that can meet many defences.',
    objective: 'Flexible development and kingside space',
    representativeVariation: 'One representative King’s Indian Attack move order',
    moves: ['Nf3','d5','g3','Nf6','Bg2','e6','O-O','Be7','d3'],
    explanation: 'This is one representative move order; the King’s Indian Attack can transpose from several systems.',
    movesDetail: ['Develop toward the centre.', 'Prepare the kingside fianchetto.', 'Fianchetto the bishop.', 'Castle the king to safety.', 'Create a solid central foundation.'],
    blackDetail: ['Black challenges the centre.', 'Black develops.', 'Black supports development.', 'Black develops the bishop.', 'Black closes this representative line.']
  }
];

export const openingById = (id) => openings.find((opening) => opening.id === id);
