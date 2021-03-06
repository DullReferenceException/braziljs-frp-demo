import React from 'react';
import Scoreboard from '../../common/components/Scoreboard.jsx';
import Winner from '../../common/components/Winner.jsx';
import Countdown from '../../common/components/Countdown.jsx';
import CountdownHeader from '../../common/components/CountdownHeader.jsx';
import MVP from '../../common/components/MVP.jsx';

export default class AdminInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.status ? this['render_' + this.props.status]() : <div/>;
  }

  render_stopped() {
    return <section id="content"/>;
  }

  render_waiting() {
    var red = this.props.teamScores.Red;
    var blue = this.props.teamScores.Blue;
    return (
      <div>
        <CountdownHeader status="Waiting for more players..." timestamp={this.props.countdown}/>
        {
          (red || blue)
            ? <div id="content">
                <Winner red={red} blue={blue}/>
                <MVP player={this.props.topPlayer}/>
                <Scoreboard red={red} blue={blue}/>
              </div>
            : <div/>
        }
        <div id="player-count">
          { this.props.numPlayers + ' ' }
          player{ this.props.numPlayers === 1 ? ' ' : 's ' }
          joined
        </div>
      </div>
    );
  }

  render_starting() {
    return (
      <div>
        <CountdownHeader status="Starting..." timestamp={this.props.countdown}/>
        <div id="content">
          <div className="big-countdown">
            <Countdown timestamp={this.props.countdown}/>
          </div>
        </div>
      </div>
    );
  }

  render_started() {
    var red = this.props.teamScores.Red;
    var blue = this.props.teamScores.Blue;
    return (
      <div>
        <CountdownHeader status="Time remaining:" timestamp={this.props.countdown}/>
        <div id="content">
          <Scoreboard red={red} blue={blue}/>
        </div>
      </div>
    );
  }
}
