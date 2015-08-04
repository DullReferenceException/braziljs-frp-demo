import kefir from 'kefir';
import transform from '../../../utils/transform';

const sockets = kefir
  .repeat(() => kefir.stream(emitter => {
    const socket = new WebSocket('ws://' + location.host + '/');
    socket.onopen = () => emitter.emit(socket);
    socket.onerror = err => emitter.error(err);
    socket.onclose = () => emitter.end();
    return () => socket.close();
  }))
  .toProperty();

export default sockets;
