import kefir from 'kefir';
import dispatcher from '../../dispatcher';

export default kefir
  .fromEvents(dispatcher, 'click')
  .map(e => ({ type: 'click' }));
