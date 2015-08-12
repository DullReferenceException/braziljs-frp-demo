import kefir from 'kefir';
import { allClients } from '../../socket-server';
import state from '../../state';

export default kefir
  .combine([state.throttle(100)], [allClients])
  .map(([state, clients]) => clients.map(client => ({
    client: client,
    message: {
      type: 'state',
      state: state
    }
  })))
  .flatten();
