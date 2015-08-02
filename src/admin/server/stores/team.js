import { Set } from 'immutable';
import { Observable, BehaviorSubject } from 'rx';
import events from '../events';

function Team(name) {

  const players = new BehaviorSubject(new Set());
  const score = new BehaviorSubject(0);

  events
    .ofType('team.join')
    .filter(evt => evt.team === name)
    .pluck('player')
    .combineLatest(players, (player, players) => players.add(player))
    .multicast(players);


  events
    .ofType('team.join')
    .map(evt => {
      return {
        client: evt.client,
        message: {
          type: 'joined',
          name: evt.player,
          team: evt.team
        }
      }
    })
    .multicast(events.ofType('server.message'));

  events
    .ofType('team.leave')
    .filter(evt => evt.team === name)
    .pluck('player')
    .combineLatest(players, (player, players) => players.delete(player))
    .multicast(players);

  events
    .ofType('score.inc')
    .pluck('player')
    .filter(player => players.getValue().contains(player))
    .combineLatest(score, (evt, score) => score + 1)
    .multicast(score);

  events
    .ofType('score.reset')
    .map(evt => 0)
    .multicast(score);

  return Observable
    .combineLatest(players, score, (players, score) => {
      return {
        name: name,
        score: score,
        players: players
      };
    })
}

const redTeam = new Team('Red');
const blueTeam = new Team('Blue');

const teams = Observable.combineLatest(redTeam, blueTeam, (red, blue) => [red, blue]);

export default teams;
