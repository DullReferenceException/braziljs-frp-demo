import kefir from 'kefir';
import { connections } from '../../socket-server';
import state from '../../state';

export default kefir
  .combine([connections], [state])
  .map(([client, state]) => ({
    client: client,
    message: {
      type: 'state',
      state: state
    }
  }));
