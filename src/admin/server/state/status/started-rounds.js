import { timerSources, completedTimers } from './timers';

const finishedCountdowns = completedTimers('starting');
const startedRounds = finishedCountdowns.map(() => ({ status: 'started', countdown: Date.now() + 30000 }));
timerSources.plug(startedRounds);

export default startedRounds;
