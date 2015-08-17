import kefir from 'kefir';
import roster from './roster';
import status from './status';
import starts from './status/started-countdowns';
import clicks from '../messages/inbound/clicks';
import dynamicValue from '../../common/utils/dynamic-value';

function getInitValue() {
  return {
    players: {},
    teams: { Red: 0, Blue: 0 }
  };
}

const isRoundStarted = status.map(s => s.status === 'started');
const validClicks = clicks.filterBy(isRoundStarted);
const playerClicks = kefir
  .combine([validClicks], [roster])
  .map(([click, players]) => players.filter(p => p.id === click.player)[0])
  .filter();

export default dynamicValue(getInitValue(),
  starts, curr => getInitValue(),
  playerClicks, (accum, player) => {
    accum.players[player.id] = (accum.players[player.id] || 0) + 1;
    accum.teams[player.team]++;
    return accum;
  }
);
