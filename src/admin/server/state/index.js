import kefir from 'kefir';
import statuses from './status';
import scores from './scores';
import roster from './roster';

export default kefir.combine([statuses, scores, roster], (statusInfo, scores, players) => ({
  status: statusInfo.status,
  countdown: statusInfo.countdown,
  players: players
    .map(p => ({
      id: p.id,
      name: p.name,
      team: p.team,
      score: scores.players[p.id] || 0
    })),
  teamScores: scores.teams
}));
