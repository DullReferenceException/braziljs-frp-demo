import successfulWaits from './successful-waits';
import { timerSources, completedTimers } from './timers';

const startedCountdowns = successfulWaits.map(() => ({ status: 'starting', countdown: Date.now() + 5000 }));
timerSources.plug(startedCountdowns);

export default startedCountdowns;
