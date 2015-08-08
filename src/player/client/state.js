import kefir from 'kefir';
import stateMessages from './messages/inbound/state';
import initialState from '../common/initial-state';

export default stateMessages.toProperty(() => initialState);
