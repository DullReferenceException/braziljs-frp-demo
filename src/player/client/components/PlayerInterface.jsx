import React from 'react';
import Scoreboard from '../../../common/components/Scoreboard.jsx';
import Winner from '../../../common/components/Winner.jsx';
import MVP from './../../../common/components/MVP.jsx';
import Countdown from '../../../common/components/Countdown.jsx';
import CountdownHeader from '../../../common/components/CountdownHeader.jsx';
import JoinStatus from './JoinedStatus.jsx';
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
    return this.props.name
      ? this.renderGame()
      : this.renderJoinForm();
  }

  renderJoinForm() {
    return (
      <div id="content">
        <form onSubmit={this.join}>
          <label>Your name</label>
          <input type="text" size="20" value={this.state.name} onInput={this.changeName}/>
          <input type="submit" value="Join"/>
        </form>
      </div>
    );
  }

  renderGame() {
    return (
      <div>
        {
          (this.props.gameStatus === 'waiting' )  ? this.renderWaitingState()
            : (this.props.gameStatus === 'starting')  ? this.renderStartingState()
            : (this.props.gameStatus === 'started' )  ? this.renderStartedState()
            : this.renderStoppedState()
        }
        <JoinStatus name={this.props.name} team={this.props.team}/>
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
        <CountdownHeader status="Waiting for more players..." timestamp={this.props.countdown}/>
        <div id="content">
          <Winner red={redScore} blue={blueScore}/>
          <MVP player={this.props.topPlayer}/>
          <Scoreboard red={redScore} blue={blueScore}/>
        </div>
      </div>
    );
  }

  renderStartingState() {
    return (
      <div>
        <CountdownHeader status="Get ready!" timestamp={this.props.countdown}/>
        <div id="content">
          <div className="big-countdown">
            <Countdown timestamp={this.props.countdown}/>
          </div>
        </div>
      </div>
    );
  }

  renderStartedState() {
    return (
      <div>
        <CountdownHeader status="Get to clicking!" timestamp={this.props.countdown}/>
        <div id="content">
          <Scoreboard
            red={this.props.teams.Red.score}
            blue={this.props.teams.Blue.score}/>

          <button
            className={this.props.team}
            onMouseDown={this.click}>
            Click
          </button>
        </div>
      </div>
    );
  }
}
