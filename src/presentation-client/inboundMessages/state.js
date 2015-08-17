import inboundMessages from './all';

export default inboundMessages
  .filter(m => m.type === 'state')
  .map(m => m.state);
