import Promise from 'bluebird';
import kefir from 'kefir';
import { Server } from 'ws';
import gameState from './streams/model/gameState';
import clients from './streams/model/clients';
import { connections, outboundMessages } from './streams/events';

export default class WebSocketServer {
  constructor(httpServer) {
    this._httpServer = httpServer;
  }

  start() {
    var server = new Server({ server: this._httpServer });

    kefir.fromEvents(server, 'connection').plugInto(connections);

    gameState
      .throttle(100)
      .map(state => ({
        client: null,
        message: {
          type: 'state',
          state: state
        }
      }))
      .plugInto(outboundMessages);
  }
}
