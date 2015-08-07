import kefir from 'kefir';
import connections from './../../web-sockets/connections';

export default connections.flatMap(socket => kefir
  .fromEvents(socket, 'message')
  .map(msg => ({ client: socket, message: JSON.parse(msg) })));
