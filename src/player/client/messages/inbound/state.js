import { messages } from '../../socket-client';

export default messages
  .inbound
  .filter(msg => msg.type === 'state')
  .map(msg => msg.state);
