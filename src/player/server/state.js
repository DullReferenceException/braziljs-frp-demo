import { teams as initialTeamState } from '../common/initial-state';
import { messages as stateServerMessages } from './state-socket-client';

export default stateServerMessages
  .inbound
  .filter(m => m.type === 'state')
  .map(m => m.state)
  .map(state => {
    let teamData = {
      Red: { playerCount: 0, score: 0 },
      Blue: { playerCount: 0, score: 0 }
    };
    let playersById = {};
    let topPlayer = null;
    state.players.forEach(p => {
      playersById[p.id] = p;
      const team = teamData[p.team];
      team.playerCount++;
      team.score += p.score;
      topPlayer = (topPlayer && topPlayer.score > p.score) ? topPlayer : p;
    });
    return {
      players: playersById,
      teams: teamData,
      status: state.status,
      countdown: state.countdown,
      topPlayer: topPlayer
    };
  })
  .toProperty(() => ({
    players: {},
    teams: initialTeamState
  }));
