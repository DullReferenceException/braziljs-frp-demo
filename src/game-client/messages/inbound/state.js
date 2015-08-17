import inboundMessages from './all';

export default inboundMessages
  .filter(msg => msg.type === 'state')
  .map(msg => msg.state);
