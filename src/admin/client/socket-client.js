import createSocketClient from '../../common/utils/web-socket-client';
import starts from './messages/outbound/starts';

const socketClient = createSocketClient({ url: 'ws://' + location.host + '/' });
socketClient.messages.outbound.plug(starts);

export default socketClient
