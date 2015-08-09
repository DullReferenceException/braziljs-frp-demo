import React from 'react';
import Scoreboard from '../../../common/components/Scoreboard.jsx';
import Winner from '../../../common/components/Winner.jsx';
import Countdown from '../../../common/components/Countdown.jsx';
import dispatcher from '../dispatcher';
import '../../../common/utils/kefir-extensions';

export default class AdminInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 20
    };
  }

  get changeSeconds() {
    return e => this.setState({seconds: parseInt(e.target.value, 10)});
  }

  get start() {
    return e => {
      e.preventDefault();
      dispatcher.emit('start', {});
    }
  }

  render() {
    return this.props.status ? this['render_' + this.props.status]() : <div/>;
  }

  render_stopped() {
    return (
      <section id="content">
        <form id="start-parameters" onSubmit={this.start}>
          <h2>Game Settings</h2>

          <label>Seconds</label>
          <input type="numeric" value={this.state.seconds} onChange={this.changeSeconds}/>
          <input type="submit" value="Start"/>
        </form>
      </section>
    );
  }

  render_waiting() {
    var red = this.props.teams[0].score;
    var blue = this.props.teams[1].score;
    return (
      <div>
        <Countdown status="Waiting for more players..." timestamp={this.props.countdown}/>
        <div id="content">
          <Winner red={red} blue={blue}/>
          <Scoreboard red={red} blue={blue}/>
        </div>
      </div>
    );
  }

  render_starting() {
    return <Countdown status="Starting..." timestamp={this.props.countdown}/>;
  }

  render_started() {
    var red = this.props.teams[0].score;
    var blue = this.props.teams[1].score;
    return (
      <div>
        <Countdown status="Time remaining:" timestamp={this.props.countdown}/>
        <div id="content">
          <Scoreboard red={red} blue={blue}/>
        </div>
      </div>
    );
  }
}
