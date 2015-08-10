import server from './server';
import gameLoop from './models/game-loop';
import initialStates from './messages/outbound/initial-states';
import stateBroadcasts from './messages/outbound/state-broadcasts';

server.messages.outbound.plug(initialStates);
server.messages.outbound.plug(stateBroadcasts);

gameLoop.start();
