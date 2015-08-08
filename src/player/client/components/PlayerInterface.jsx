import React from 'react';
import EventHandler from '../../../common/utils/event-handler';
import { messages } from '../socket-client';
import '../../../common/utils/kefir-extensions';

export default class UserInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.start = new EventHandler();
    this.changeName = new EventHandler();
  }

  componentDidMount() {
    this.start
      .stream()
      .onValue(e => e.preventDefault())
      .map(() => ({
        type: 'join',
        name: this.state.name
      }))
      .plugInto(messages.outbound);

    this.changeName
      .stream()
      .onValue(e => this.setState({ name: e.target.value }));
  }

  render() {
    return (
      <div>
        <h1>Click Wars!</h1>
        {
          this.props.name
            ? this.renderGame()
            : this.renderJoinForm()
        }
      </div>
    );
  }

  renderJoinForm() {
    return (
      <form onSubmit={this.start}>
        <label>Your name</label>
        <input type="text" size="20" value={this.state.name} onInput={this.changeName}/>
        <input type="submit" value="Join"/>
      </form>
    );
  }

  renderGame() {
    return (
      <div>
        <dl>
          <dt>Joined as</dt>
          <dd>{ this.props.name }</dd>

          <dt>Team</dt>
          <dd>{ this.props.team }</dd>
        </dl>
        {
            (this.props.gameStatus === 'waiting' )  ? this.renderWaitingState()
          : (this.props.gameStatus === 'starting')  ? this.renderStartingState()
          : (this.props.gameStatus === 'started' )  ? this.renderStartedState()
                                                    : this.renderStoppedState()
        }
      </div>
    );
  }

  renderStoppedState() {
    return <div>Sorry, the game is not running at this time.</div>
  }

  renderWaitingState() {
    return <div>Waiting for players to join...</div>
  }

  renderStartingState() {
    return <div>Starting in {this.props.countdown} seconds...</div>
  }

  renderStartedState() {
    return <div>Started!</div>
  }
}
