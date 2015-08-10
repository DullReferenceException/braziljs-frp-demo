import inboundMessages from './all';

export default inboundMessages
  .filter(e => e.message.type === 'click')
  .map(e => e.message);
