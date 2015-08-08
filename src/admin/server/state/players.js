import kefir from 'kefir';
import server from '../server';
import joinRequests from '../messages/inbound/joinings';
import leaveRequests from '../messages/inbound/leavings';
import Player from '../models/player';
import dynamicValue from '../../../common/utils/dynamic-value';

const namePattern = /^(.*?)(\d+)$/;

function getUniqueName(name, players) {
  while (players.some(p => p.name === name)) {
    let match = namePattern.exec(name);
    name = match
      ? match[1] + (parseInt(match[2], 10) + 1)
      : name + '1';
  }
  return name;
}

const disconnections = server.disconnections;

const players = dynamicValue([],
  joinRequests, (players, req) => {
    const message = req.message;
    const name = getUniqueName(message.name, players);
    const teamCounts = players.reduce(
      (counts, p) => { counts[p.team]++; return counts },
      { Red: 0, Blue: 0 });
    const team = teamCounts.Red <= teamCounts.Blue ? 'Red' : 'Blue';
    const newPlayer = new Player(req.client, message.id, name, team);
    return players.concat(newPlayer);
  },
  leaveRequests, (players, req) => players.filter(p => p.id !== req.player),
  disconnections, (players, socket) => players.filter(p => p.client !== socket)
);

const playerState = players
  .flatMapLatest(players => players.length
    ? kefir.combine(players.map(p => p.stream))
    : kefir.constant([]))
  .toProperty(() => []);

export default playerState;
