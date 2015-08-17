import dynamicValue from '../../common/utils/dynamic-value';
import joinings from '../messages/inbound/joinings';
import leavings from '../messages/inbound/leavings';
import { disconnections } from '../socket-server';

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

const roster = dynamicValue([],
  joinings, (players, req) => {
    const message = req.message;
    const name = getUniqueName(message.name, players);
    const teamCounts = players.reduce(
      (counts, p) => { counts[p.team]++; return counts },
      { Red: 0, Blue: 0 });
    const team = teamCounts.Red <= teamCounts.Blue ? 'Red' : 'Blue';
    return players.concat({ client: req.client, id: message.id, name: name, team: team });
  },
  leavings, (players, req) => players.filter(p => p.id !== req.player),
  disconnections, (players, socket) => players.filter(p => p.client !== socket)
);

export default roster;
