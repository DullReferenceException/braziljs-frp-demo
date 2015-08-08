import kefir from 'kefir';
import dynamicValue from '../../../common/utils/dynamic-value';
import connections from './connections';
import disconnections from './disconnections';

export default dynamicValue([],
  connections, (clients, client) => clients.concat(client),
  disconnections, (clients, client) => clients.filter(c => c !== client));
