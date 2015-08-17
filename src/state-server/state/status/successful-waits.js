import { completedTimers } from './timers';
import haveCompetitors from './have-competitors';

export default completedTimers('waiting').filterBy(haveCompetitors);
