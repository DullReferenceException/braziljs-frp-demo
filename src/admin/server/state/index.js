import kefir from 'kefir';
import statuses from './game-status';
import players from './players';

export default kefir
  .combine([statuses, players], (statusInfo, players) => {
    return {
      status: statusInfo.status,
      countdown: statusInfo.countdown,
      players: players
    }
  })
  .toProperty();
