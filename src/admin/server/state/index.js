import kefir from 'kefir';
import isStarted from './is-started';
import players from './players';

export default kefir
  .combine([isStarted, players], (isStarted, players) => {
    return {
      isStarted: isStarted,
      players: players
    }
  })
  .toProperty();
