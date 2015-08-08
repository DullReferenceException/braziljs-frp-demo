import React from 'react';
import dispatcher from '../dispatcher';

export default class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get join() {
    return e => {
      e.preventDefault();
      dispatcher.emit('join', { name: this.state.name });
    }
  }

  get changeName() {
    return e => this.setState({ name: e.target.value });
  }

  get click() {
    return e => {
      e.preventDefault();
      dispatcher.emit('click', {});
    }
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
      <form onSubmit={this.join}>
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
    return <h2>Sorry, the game is not running at this time.</h2>
  }

  renderWaitingState() {
    return <h2>Waiting for players to join. Game starts in {this.props.countdown} seconds...</h2>
  }

  renderStartingState() {
    return <h2>Starting in {this.props.countdown} seconds...</h2>
  }

  renderStartedState() {
    return (
      <div>
        <h2>Started!</h2>
        <button className={this.props.team} onClick={this.click}>Click</button>

        <dl>
          <dt style={{ color: 'red' }}>Red</dt>
          <dd>{this.props.teams.Red.score}</dd>
          <dt style={{ color: 'blue' }}>Blue</dt>
          <dd>{this.props.teams.Blue.score}</dd>
        </dl>
      </div>
    );
  }
}
