import stateMessages from './messages/inbound/state';

const state = stateMessages
  .map(state => {
    let teams = {
      Red: { name: 'Red', score: 0, players: [] },
      Blue: { name: 'Blue', score: 0, players: [] }
    };

    state.players.forEach(player => {
      let team = teams[player.team];
      team.players.push(player);
      team.score += player.score;
    });

    return {
      isStarted: state.isStarted,
      teams: [teams.Red, teams.Blue]
    }
  });

export default state;
