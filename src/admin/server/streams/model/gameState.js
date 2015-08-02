import kefir from 'kefir';
import { gameStarts, clicks, gameStops, inboundMessages } from '../events';
import teams from './teams';
import players from './players';
import transform from '../../../../utils/transform'
import '../../../../utils/kefir-extensions';

const isStarted = kefir
  .merge([
    gameStarts.map(() => true),
    gameStops.map(() => false)
  ])
  .toProperty(() => false);

gameStarts
  .flatMap(e => kefir.later((e.seconds || 20) * 1000, {}))
  .plugInto(gameStops);

inboundMessages
  .filter(e => e.message.type === 'click')
  .filterBy(isStarted)
  .map(e => e.message)
  .plugInto(clicks);

const gameState = kefir
  .combine([isStarted, players, teams], (isStarted, players, teams) => {
    return {
      isStarted: isStarted,
      players: players,
      teams: teams
    }
  })
  .toProperty();

export default gameState;
