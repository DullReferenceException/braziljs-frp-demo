import inboundMessages from './index';
import isStarted from '../../state/is-started';

export default inboundMessages
  .filter(e => e.message.type === 'click')
  .filterBy(isStarted)
  .map(e => e.message);
