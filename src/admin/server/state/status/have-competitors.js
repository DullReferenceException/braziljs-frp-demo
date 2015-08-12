import roster from '../roster';

export default roster.map(players =>
  players.some(p => p.team === 'Red')
  && players.some(p => p.team === 'Blue'));
