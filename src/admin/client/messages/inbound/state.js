import inboundMessages from './index';

const state = inboundMessages
  .filter(m => m.type === 'state')
  .map(m => m.state);

export default state;
