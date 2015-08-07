import kefir from 'kefir';
import dynamicValue from '../../../utils/dynamicValue';
import connections from './connections';
import disconnections from './disconnections';

export default dynamicValue([],
  connections, (clients, client) => clients.concat(client),
  disconnections, (clients, client) => clients.filter(c => c !== client));
