import kefir from 'kefir';
import { gameStarts, gameStops } from '../events';
import teams from './teams';
import players from './players';
import transform from '../../../../utils/transform'
import '../../../../utils/kefir-extensions';

gameStarts
  .flatMap(e => kefir.later((e.seconds || 20) * 1000, {}))
  .plugInto(gameStops);

const isStarted = kefir
  .merge([
    gameStarts.map(() => true),
    gameStops.map(() => false)
  ])
  .toProperty(() => false);

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
