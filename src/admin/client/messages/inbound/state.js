import { messages } from '../../socket-client';

export default messages
  .inbound
  .filter(m => m.type === 'state')
  .map(m => m.state);
