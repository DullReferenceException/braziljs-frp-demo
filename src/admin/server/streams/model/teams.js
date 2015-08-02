import { Set } from 'immutable';
import kefir from 'kefir';
import transform from '../../../../utils/transform';
import '../../../../utils/kefir-extensions';

import {
  outboundMessages,
  addedPlayers,
  teamJoinings,
  teamLeavings,
  clicks,
  resets
} from '../events';

function Team(name) {

  const players = transform(new Set(),
    teamJoinings.filter(evt => evt.team === name), (ps, e) => ps.add(e.player),
    teamLeavings.filter(evt => evt.team === name), (ps, e) => ps.delete(e.player));

  const score = transform(0,
    clicks
      .combineLatest(players, (e, players) => players.contains(e.player))
      .filter(),
    score => score + 1,

    resets, score => 0
  );

  teamJoinings
    .map(evt => ({
      client: evt.client,
      message: {
        type: 'joined',
        name: evt.player,
        team: evt.team
      }
    }))
    .plugInto(outboundMessages);

  return kefir
    .combine([players, score], (players, score) => {
      return {
        name: name,
        score: score,
        players: players
      };
    })
    .toProperty()
}

const teams = kefir
  .combine([new Team('Red'), new Team('Blue')])
  .toProperty();

addedPlayers
  .flatMap(p => p.take(1))
  .combineLatest(teams, (player, teams) => {
    console.log('Team sizes: ' + teams.map(t => t.players.size));
    const emptiestTeam = teams
      .reduce((curr, team) => (curr && curr.players.size <= team.players.size) ? curr : team);
    return {
      player: player.name,
      team: emptiestTeam.name,
      client: player.client
    };
  })
  .plugInto(teamJoinings);

export default teams;
