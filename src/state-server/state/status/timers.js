import kefir from 'kefir';
import waitUntil from '../../../common/utils/wait-until';

export const timerSources = kefir.pool();

export function completedTimers(type) {
  return timerSources
    .filter(e => e.status === type)
    .flatMap(e => waitUntil(e.countdown));
}
