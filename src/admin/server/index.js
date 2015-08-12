import webServer from './web-server';
import { messages } from './socket-server';
import initialStates from './messages/outbound/initial-states';
import stateBroadcasts from './messages/outbound/state-broadcasts';

messages.outbound.plug(initialStates);
messages.outbound.plug(stateBroadcasts);

webServer.onValue(() => console.log('Admin listening on http://localhost:8081/'));
