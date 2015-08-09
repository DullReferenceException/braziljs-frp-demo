import React from 'react';
import Scoreboard from '../../../common/components/Scoreboard.jsx';
import Winner from '../../../common/components/Winner.jsx';
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
    return (
      <div id="main">
        <h1>Click Wars</h1>
        { this.props.status && this['render_' + this.props.status]() }
      </div>
    );
  }

  render_stopped() {
    return (
      <form id="start-parameters" onSubmit={this.start}>
        <h2>Game Settings</h2>

        <label>Seconds</label>
        <input type="numeric" value={this.state.seconds} onChange={this.changeSeconds}/>
        <input type="submit" value="Start"/>
      </form>
    );
  }

  render_waiting() {
    var red = this.props.teams[0].score;
    var blue = this.props.teams[1].score;
    return (
      <div>
        <Winner red={red} blue={blue}/>
        <Scoreboard red={red} blue={blue}/>

        <p>Next game in {this.props.countdown} seconds...</p>
      </div>
    );
  }

  render_starting() {
    return <h2>Starting in {this.props.countdown} seconds...</h2>;
  }

  render_started() {
    var red = this.props.teams[0].score;
    var blue = this.props.teams[1].score;
    return (
      <div>
        <Scoreboard red={red} blue={blue}/>
      </div>
    );
  }
}
