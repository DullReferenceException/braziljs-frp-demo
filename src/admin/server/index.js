import Promise from 'bluebird';
import { Server as WebSocketServer } from 'ws';
import WebServer from './WebServer';
import SocketServer from './WebSocketServer';
import * as events from './streams/events';

Object.keys(events).forEach(k => events[k].log(k));

class AdminServer {
  constructor() {
    this.webServer = new WebServer();
    this.socketServer = new SocketServer(this.webServer.server);
  }

  start() {
    return this.webServer
      .start()
      .then(() => this.socketServer.start());
  }
}

export default new AdminServer();
