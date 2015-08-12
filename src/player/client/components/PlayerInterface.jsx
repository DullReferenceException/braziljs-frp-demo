import React from 'react';
import Scoreboard from '../../../common/components/Scoreboard.jsx';
import Winner from '../../../common/components/Winner.jsx';
import MVP from './../../../common/components/MVP.jsx';
import Countdown from '../../../common/components/Countdown.jsx';
import CountdownHeader from '../../../common/components/CountdownHeader.jsx';
import JoinStatus from './JoinedStatus.jsx';
import JoinForm from './JoinForm.jsx';
import dispatcher from '../dispatcher';

export default class PlayerInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(nextProps.name || this.props.name);
  }

  get click() {
    return e => {
      e.preventDefault();
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
    return <JoinForm/>;
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
        {
          (redScore || blueScore)
          ? <div id="content">
              <Winner red={redScore} blue={blueScore}/>
              <MVP player={this.props.topPlayer}/>
              <Scoreboard red={redScore} blue={blueScore}/>
            </div>
          : <div/>
        }
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
            onTouchEnd={('ontouchstart' in window) ? this.click : (() => {})}
            onClick={(!('ontouchstart' in window)) ? this.click : (() => {})}
          >
            Click
          </button>
        </div>
      </div>
    );
  }
}
