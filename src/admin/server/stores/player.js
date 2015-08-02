import { Observable, BehaviorSubject } from 'rx';
import teams from './team';
import events from '../events';

var suffixedName = /^(.*?)(\d+)$/;

function Player(name, client) {
  console.log('Creating player ' + name);

  const team = events
    .ofType('team.join')
    .pluck('team')
    .publishValue(null);

  const score = new BehaviorSubject(0);

  events
    .ofType('score.inc')
    .withLatestFrom(score, (evt, score) => score + 1)
    .subscribe(score);

  events
    .ofType('score.reset')
    .map(() => 0)
    .subscribe(score);

  return Observable
    .combineLatest(team, score, (team, score) => {
      return {
        name: name,
        client: client,
        team: team,
        score: score
      }
    })
    .publishValue();
}

function getUniqueName(name, players) {
  console.log('Got name ' + name);
  var playerNames = players.map(p => p.name);
  console.log('Current player names: ' + JSON.stringify(playerNames));
  while (playerNames.indexOf(name) >= 0) {
    name = incrementName(name);
  }
  console.log('Came up with name ' + name);
  return name;
}

function incrementName(name) {
  var nameMatch = suffixedName.exec(name);
  if (nameMatch) {
    return nameMatch[1] + (parseInt(nameMatch[2], 10) + 1);
  } else {
    return name + '1';
  }
}

const players = new BehaviorSubject([]);

players.forEach(p => 'Got new players: ' + p);

const playersState = players
  .tap(() => console.log('Got value from players'))
  .flatMap(p => p)
  .concat()
  .tap(res => console.log('playersState changing to ' + res))
  .publishValue([]);

events
  .ofType('client.join')
  .withLatestFrom(playersState, (evt, players) => {
    var newPlayer = new Player(getUniqueName(evt.name, players), evt.client);
    console.log(newPlayer);
    return newPlayer;
  })
  .tap(p => console.log('Created player: ' + p))
  .subscribe(events.ofType('player.add'));

events
  .ofType('player.add')
  .withLatestFrom(players, (player, players) => players.concat(player))
  .subscribe(players);

events
  .ofType('player.add')
  .withLatestFrom(teams, (player, teams) => {
    var emptiestTeam = teams.reduce((curr, team) => {
      return (curr && curr.players.size > team.players.size) ? curr : team;
    });
    return {
      player: player.name,
      team: emptiestTeam.name,
      client: player.client
    };
  })
  .subscribe(events.ofType('team.join'));

export default playersState;
