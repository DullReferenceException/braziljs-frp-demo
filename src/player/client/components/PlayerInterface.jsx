import React from 'react';
import Scoreboard from '../../../common/components/Scoreboard.jsx';
import Winner from '../../../common/components/Winner.jsx';
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
      dispatcher.emit('click', {});
    }
  }

  get disableDoubleTap() {
    return e => e.preventDefault();
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
    var redScore = this.props.teams.Red.score;
    var blueScore = this.props.teams.Blue.score;
    return (
      <div>
        <Winner red={redScore} blue={blueScore}/>
        <Scoreboard red={redScore} blue={blueScore}/>

        <p>Next game in {this.props.countdown} seconds...</p>
      </div>
    );
  }

  renderStartingState() {
    return <h2>Starting in {this.props.countdown} seconds...</h2>
  }

  renderStartedState() {
    return (
      <div>
        <h2>Started!</h2>

        <Scoreboard
          red={this.props.teams.Red.score}
          blue={this.props.teams.Blue.score}/>

        <button
          className={this.props.team}
          onMouseDown={this.click}>
          Click
        </button>
      </div>
    );
  }
}
