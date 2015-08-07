import kefir from 'kefir';
import state from '../../state';
import allClients from '../../web-sockets/all-clients';

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
