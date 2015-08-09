import kefir from 'kefir';
import { Server as SocketServer } from 'ws';
import dynamicValue from './dynamic-value';

export default function createServer(webServer) {

  const socketServer = webServer.map(webServer => new SocketServer({ server: webServer }));

  const connections = socketServer
    .flatMap(socketServer => kefir.fromEvents(socketServer, 'connection'));

  const disconnections = connections
    .flatMap(socket => kefir.fromEvents(socket, 'close').map(() => socket));

  const allClients = dynamicValue([],
    connections, (clients, client) => clients.concat(client),
    disconnections, (clients, client) => clients.filter(c => c !== client));

  const inboundMessages = connections.flatMap(socket => kefir
    .fromEvents(socket, 'message')
    .map(msg => ({ client: socket, message: JSON.parse(msg) })));

  const outboundMessages = kefir.pool();

  outboundMessages
    .onValue(msg => kefir
      .fromNodeCallback(cb => {
        msg.message.timestamp = Date.now();
        msg.client.send(JSON.stringify(msg.message), cb)
      })
      .onError(err => msg.client.close())
  );

  return {
    connections: connections,
    disconnections: disconnections,
    allClients: allClients,
    messages: {
      inbound: inboundMessages,
      outbound: outboundMessages
    }
  };
}
