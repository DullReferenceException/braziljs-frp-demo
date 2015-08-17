import { messages as stateServerMessages } from './state-socket-client';

export default stateServerMessages
  .inbound
  .filter(m => m.type === 'state')
  .map(({ state }) => {
    let teamData = {
      Red: { playerCount: 0, score: state.teamScores.Red },
      Blue: { playerCount: 0, score: state.teamScores.Blue }
    };
    let playersById = {};
    let topPlayer = null;
    state.players.forEach(p => {
      playersById[p.id] = p;
      const team = teamData[p.team];
      team.playerCount++;
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
  .onValue(/* Eagerly consume */ () => { })
  .toProperty();
