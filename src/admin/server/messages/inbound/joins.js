import inboundMessages from './index';

export default inboundMessages
  .filter(e => e.message.type === 'join');
