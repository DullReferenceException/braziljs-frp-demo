import WebSocket from 'ws';
import createSocketClient from '../../common/utils/web-socket-client';

export default createSocketClient({
  url: 'ws://localhost:8081/',
  impl: WebSocket
});
