import kefir from 'kefir';
import stateMessages from './messages/inbound/state';
import { timeDrift } from './socket-client';

const state = kefir
  .combine([stateMessages], [timeDrift])
  .map(([state, drift]) => {
    let topPlayer = state.players
      .reduce((a, b) => (a && a.score > b.score) ? a : b, null);
    return {
      status: state.status,
      numPlayers: state.players.length,
      countdown: state.countdown - drift,
      teamScores: state.teamScores,
      topPlayer: topPlayer
    }
  });

export default state;
