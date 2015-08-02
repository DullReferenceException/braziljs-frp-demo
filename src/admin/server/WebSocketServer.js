import Promise from 'bluebird';
import { Observable } from 'rx';
import { Server } from 'ws';
import events from './events';
import gameState from './stores/game';
import clients from './stores/client';

export default class WebSocketServer {
  constructor(httpServer) {
    this._httpServer = httpServer;
  }

  start() {
    var server = new Server({ server: this._httpServer });

    Observable
      .fromEvent(server, 'connection')
      .subscribe(events.ofType('client.connect'));

    gameState
      .throttleWithTimeout(100)
      .map(state => {
        return {
          message: {
            type: 'state',
            state: state
          }
        }
      })
      .multicast(events.ofType('server.message'));
  }
}
