import inboundMessages from './all';

export default inboundMessages
  .filter(m => m.message.type === 'state')
  .map(m => m.message);
