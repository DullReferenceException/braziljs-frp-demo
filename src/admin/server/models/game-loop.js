import kefir from 'kefir';
import timeout from '../../../common/utils/timeout';
import statusEvents, { statusEventPool } from '../state/game-status';
import players from '../state/players';
import '../../../common/utils/kefir-extensions';

const timers = {
  waiting: 30000,
  starting: 5000,
  started: 30000
};

const transitions = {
  stopped: () => 'waiting',
  waiting: players => (players.some(p => p.team === 'Red') && players.some(p => p.team === 'Blue'))
    ? 'starting'
    : 'waiting',
  starting: () => 'started',
  started: () => 'waiting'
};

export default {
  start() {
    Object
      .keys(transitions)
      .forEach(from => {
        statusEventPool.plug(
          statusEvents
            .filter(e => e.status === from)
            .flatMap(e => timeout(e.countdown ? e.countdown - Date.now() : 0))
            .combineLatest(players)
            .map(([_, players]) => transitions[from](players))
            .map(status => ({ status: status, countdown: Date.now() + timers[status] }))
        );
      });
  }
}
