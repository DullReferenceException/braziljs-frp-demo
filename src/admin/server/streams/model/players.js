import kefir from 'kefir';
import teams from './teams';
import transform from '../../../../utils/transform';
import {
  disconnections,
  inboundMessages,
  addedPlayers,
  removedPlayers,
  teamJoinings,
  clicks,
  resets
} from '../events';

function Player(name, client) {

  const team = teamJoinings
    .filter(e => e.player === name)
    .map(e => e.team)
    .toProperty(() => null);

  const score = transform(0,
    clicks.filter(e => e.player === name), score => score + 1,
    resets, () => 0);

  const playerStream = kefir
    .combine([team, score], (team, score) => {
      return {
        name: name,
        client: client,
        team: team,
        score: score
      }
    })
    .toProperty();

  disconnections
    .filter(d => d === client)
    .map(() => playerStream)
    .plugInto(removedPlayers);

  return playerStream;
}

const playerStreams = transform([],
  addedPlayers, (players, player) => players.concat(player),
  removedPlayers, (players, player) => players.filter(p => p !== player)
);

const players = playerStreams
  .flatMap(ps => kefir.combine(ps))
  .map(players => players.map(p => ({
    name: p.name,
    team: p.team,
    score: p.score
  })))
  .toProperty(() => [])
  .log('all players state');

const namePattern = /^(.*?)(\d+)$/;

inboundMessages
  .filter(e => e.message.type === 'join')
  .combineLatest(players, (e, players) => {
    let name = e.message.name;
    while (players.some(p => p.name === name)) {
      let match = namePattern.exec(name);
      name = match
        ? match[1] + (parseInt(match[2], 10) + 1)
        : name + '1';
    }
    return new Player(name, e.client)
  })
  .plugInto(addedPlayers);

export default players;
