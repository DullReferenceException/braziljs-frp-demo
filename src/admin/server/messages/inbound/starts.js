import messages from './index';

export default messages
  .filter(e => e.message.type === 'start')
  .map(e => e.message);
