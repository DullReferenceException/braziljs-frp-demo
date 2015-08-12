import kefir from 'kefir';
import uuid from 'uuid';
import webServer from './web-server';
import { connections } from './player-socket-server';
import PlayerAgent from './player-agent';

connections
  .map(socket => new PlayerAgent(socket))
  .flatMap(agent => kefir.fromEvents(agent.socket, 'close').map(() => agent))
  .onValue(agent => agent.dispose());

webServer.onValue(() => console.log('Player interface listening at http://localhost:8080/'));
