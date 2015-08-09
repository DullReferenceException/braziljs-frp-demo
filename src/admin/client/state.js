import kefir from 'kefir';
import stateMessages from './messages/inbound/state';
import { timeDrift } from './socket-client';

const state = kefir
  .combine([stateMessages], [timeDrift])
  .map(([state, drift]) => {
    let teams = {
      Red: { name: 'Red', score: 0, players: [] },
      Blue: { name: 'Blue', score: 0, players: [] }
    };
    let topPlayer = null;

    state.players.forEach(player => {
      let team = teams[player.team];
      team.players.push(player);
      team.score += player.score;
      topPlayer = (topPlayer && topPlayer.score > player.score) ? topPlayer : player;
    });

    return {
      status: state.status,
      countdown: state.countdown - drift,
      teams: [teams.Red, teams.Blue],
      topPlayer: topPlayer
    }
  })
  .toProperty(() => ({ status: 'stopped', teams: [] }));

export default state;
