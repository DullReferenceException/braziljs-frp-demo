import kefir from 'kefir';

export default function createSocketClient({ url, impl }) {

  const WebSocketClient = impl || WebSocket;

  const sockets = kefir
    .repeat(() => kefir
      .stream(emitter => {
        setTimeout(() => {
          const socket = new WebSocketClient(url);
          socket.onopen = () => emitter.emit(socket);
          socket.onerror = err => emitter.error(err);
          socket.onclose = () => emitter.end();
          return () => socket.close();
        }, 1000);
      })
      .endOnError()
    )
    .toProperty();

  const inboundMessages = sockets
    .flatMapLatest(s => kefir.stream(emitter => s.onmessage = emitter.emit))
    .map(e => JSON.parse(e.data));

  const outboundMessages = kefir.pool();

  kefir
    .combine([outboundMessages], [sockets])
    .onValue(([msg, socket]) => {
      socket.send(JSON.stringify(msg));
    });

  return {
    messages: {
      inbound: inboundMessages,
      outbound: outboundMessages
    }
  };
}
