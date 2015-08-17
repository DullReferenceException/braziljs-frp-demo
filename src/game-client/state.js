import kefir from 'kefir';
import stateMessages from './messages/inbound/state';
import { timeDrift } from './socket-client.js';
import initialState from '../common/initial-state';

export default kefir
  .combine([stateMessages], [timeDrift])
  .map(([state, drift]) => {
    state.countdown = state.countdown - drift;
    return state;
  });
