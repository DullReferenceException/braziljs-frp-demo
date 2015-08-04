import kefir from 'kefir';
import sockets from './sockets';
import '../../../utils/kefir-extensions';

const outboundMessages = kefir.pool();

outboundMessages
  .combineLatest(sockets)
  .onValue(value => {
    let [msg, socket] = value;
    socket.send(JSON.stringify(msg));
  });

export default outboundMessages;
