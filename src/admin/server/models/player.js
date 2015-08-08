import gameStarts from '../messages/inbound/starts';
import clicks from '../messages/inbound/clicks';
import dynamicValue from '../../../common/utils/dynamic-value';

export default class Player{
  constructor(client, id, name, team) {
    this.client = client;
    this.id = id;
    this.name = name;
    this.team = team;

    const score = dynamicValue(0,
      gameStarts, () => 0,
      clicks.filter(e => e.player === id), score => score + 1);

    this.stream = score
      .map(score => {
        return {
          id: id,
          name: name,
          team: team,
          score: score
        }
      })
      .toProperty();
  }
}
