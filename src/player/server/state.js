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
    state.players.forEach(p => {
      playersById[p.id] = p;
      const team = teamData[p.team];
      team.playerCount++;
      team.score += p.score;
    });
    return {
      players: playersById,
      teams: teamData,
      status: state.status,
      countdown: state.countdown
    };
  })
  .toProperty(() => ({
    players: {},
    teams: initialTeamState
  }));
