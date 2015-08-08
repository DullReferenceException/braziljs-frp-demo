import inboundMessages from './all';
import status from '../../state/game-status';

export default inboundMessages
  .filter(e => e.message.type === 'click')
  .filterBy(status.map(s => s.status === 'started'))
  .map(e => e.message);
