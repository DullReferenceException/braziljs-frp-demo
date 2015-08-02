import { Observable, BehaviorSubject } from 'rx';
import events from '../events';
import teams from './team';
import players from './player';

const isStarted = Observable
  .merge(
    events.ofType('admin.start').map(() => true),
    events.ofType('game.stop').map(() => false))
  .publishValue(false);

events
  .ofType('admin.start')
  .flatMap(() => Observable.interval(20000))
  .multicast(events.ofType('game.stop'));

const gameState = Observable
  .combineLatest(isStarted, players, teams, (isStarted, players, teams) => {
    return {
      isStarted: isStarted,
      players: players,
      teams: teams
    }
  });

export default gameState;
