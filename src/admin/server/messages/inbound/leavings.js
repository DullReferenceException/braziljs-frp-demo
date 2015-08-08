import inboundMessages from './all';

export default inboundMessages
  .filter(e => e.message.type === 'leave');
