import inboundMessages from './inboundMessages';

const state = inboundMessages
  .filter(m => m.type === 'state')
  .map(m => m.state);

export default state;
