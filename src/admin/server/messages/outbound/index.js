import kefir from 'kefir';
import initialStates from './initial-states';
import stateBroadcasts from './state-broadcasts';

export default kefir.merge([
  initialStates,
  stateBroadcasts
]);
