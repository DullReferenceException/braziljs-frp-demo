import kefir from 'kefir';
import starts from '../messages/inbound/starts';

const stops = starts
  .flatMap(msg => kefir.later((msg.seconds || 20) * 1000, {}));

export default kefir
  .merge([
    starts.map(() => true),
    stops.map(() => false)
  ])
  .toProperty(() => false);
