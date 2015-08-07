import kefir from 'kefir';
import { Server as SocketServer } from 'ws';
import webServer from '../web-server';

export default webServer
  .map(webServer => new SocketServer({ server: webServer }))
  .flatMap(socketServer => kefir.fromEvents(socketServer, 'connection'));
