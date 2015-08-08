import kefir from 'kefir';
import sockets from './../../sockets';
import '../../../../common/utils/kefir-extensions';

const outboundMessages = kefir.pool();

outboundMessages
  .combineLatest(sockets)
  .onValue(([msg, socket]) => socket.send(JSON.stringify(msg)));

export default outboundMessages;
