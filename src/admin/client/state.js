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
      status: state.status,
      countdown: state.countdown,
      teams: [teams.Red, teams.Blue]
    }
  })
  .toProperty(() => ({ status: 'stopped', teams: [] }));

export default state;
