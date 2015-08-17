import kefir from 'kefir';
import dispatcher from '../../dispatcher';

export default kefir
  .fromEvents(dispatcher, 'join')
  .map(e => ({ type: 'join', name: e.name }));
