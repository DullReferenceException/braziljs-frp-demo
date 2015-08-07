import kefir from 'kefir';
import connections from './connections';

export default connections.flatMap(socket => kefir
  .fromEvents(socket, 'close')
  .map(() => socket));
