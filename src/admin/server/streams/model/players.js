import kefir from 'kefir';
import teams from './teams';
import transform from '../../../../utils/transform';
import {
  inboundMessages,
  addedPlayers,
  removedPlayers,
  teamJoinings,
  clicks,
  resets
} from '../events';

function Player(name, client) {

  const team = teamJoinings
    .map(e => e.team)
    .toProperty(() => null);

  const score = transform(0,
    clicks.filter(e => e.player === name), score => score + 1,
    resets, () => 0);

  return kefir
    .combine([team, score], (team, score) => {
      return {
        name: name,
        client: client,
        team: team,
        score: score
      }
    })
    .toProperty();
}

const players = transform([],
  addedPlayers, (players, player) => players.concat(player),
  removedPlayers, (players, player) => players.filter(p => p !== player)
);

const playersState = players
  .flatMap(ps => kefir.combine(ps))
  .map(players => players.map(p => ({
    name: p.name,
    team: p.team,
    score: p.score
  })))
  .toProperty(() => [])
  .log('Latest players');

const namePattern = /^(.*?)(\d+)$/;

inboundMessages
  .filter(e => e.message.type === 'join')
  .combineLatest(playersState, (e, players) => {
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

export default playersState;
