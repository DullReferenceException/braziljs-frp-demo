import kefir from 'kefir';
import transform from '../../utils/dynamicValue';

const sockets = kefir
  .repeat(() => kefir
    .stream(emitter => {
      setTimeout(() => {
        const socket = new WebSocket('ws://' + location.host + '/');
        socket.onopen = () => emitter.emit(socket);
        socket.onerror = err => emitter.error(err);
        socket.onclose = () => emitter.end();
        return () => socket.close();
      }, 1000);
    })
    .endOnError()
  )
  .toProperty();

export default sockets;
