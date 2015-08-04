import React from 'react';
import EventHandler from '../../../utils/EventHandler';
import outboundMessages from '../streams/outboundMessages';
import state from '../streams/state';
import '../../../utils/kefir-extensions';

export default class AdminInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 20,
      isStarting: false,
      model: {
        isStarted: false,
        teams: []
      }
    };

    state.onValue(m => this.setState({ model: m }));

    this.changeSeconds = new EventHandler();
    this.start = new EventHandler();

    this.changeSeconds
      .stream()
      .onValue(e => this.setState({ seconds: parseInt(e.target.value, 10) }));

    this.start
      .stream()
      .onValue(e => e.preventDefault())
      .map(() => ({ type: 'start', seconds: this.state.seconds }))
      .plugInto(outboundMessages);
  }

  render() {
    return (
      <div id="main">
        <h1>Click Wars</h1>

        {
          !this.state.model.isStarted
            ? <form id="start-parameters" onSubmit={this.start}>
                <label>Seconds</label>
                <input type="numeric" value={this.state.seconds} onChange={this.changeSeconds}/>
                <input type="submit" value="Start"/>
              </form>
            : <div>Started!</div>
        }

        <h2>Players</h2>

        <dl>
          {
            this.state.model.teams.map(t => [
              <dt>Team { t.name }</dt>,
              <dd>{ t.players.length }</dd>
            ])
          }
        </dl>
      </div>
    );
  }
}
