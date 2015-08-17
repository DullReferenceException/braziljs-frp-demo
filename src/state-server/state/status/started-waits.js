import kefir from 'kefir';
import inits from './started-server';
import unsuccessfulWaits from './unsuccessful-waits';
import { timerSources, completedTimers } from './timers';

const finishedRounds = completedTimers('started');
const startedWaits = kefir
  .merge([inits, unsuccessfulWaits, finishedRounds])
  .map(e => ({ status: 'waiting', countdown: Date.now() + 30000 }));
timerSources.plug(startedWaits);

export default startedWaits;