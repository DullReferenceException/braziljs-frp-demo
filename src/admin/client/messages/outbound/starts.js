import kefir from 'kefir';
import dispatcher from '../../dispatcher';

export default kefir
  .fromEvents(dispatcher, 'start')
  .map(e => ({ type: 'start' }));
