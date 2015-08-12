import kefir from 'kefir';
import waits from './started-waits';
import countdowns from './started-countdowns';
import starts from './started-rounds';

export default kefir.merge([waits, countdowns, starts]);
