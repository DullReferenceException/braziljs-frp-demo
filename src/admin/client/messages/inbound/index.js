import kefir from 'kefir';
import sockets from './../../sockets';

const inboundMessages = sockets
  .flatMapLatest(s => kefir.stream(emitter => s.onmessage = emitter.emit))
  .map(e => JSON.parse(e.data));

export default inboundMessages;
