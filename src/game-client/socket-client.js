import createSocketClient from '../common/utils/web-socket-client';
import joins from './messages/outbound/join';
import clicks from './messages/outbound/click';

const socketClient = createSocketClient({ url: 'ws://' + location.host + '/' });
socketClient.messages.outbound.plug(joins);
socketClient.messages.outbound.plug(clicks);

export default socketClient
