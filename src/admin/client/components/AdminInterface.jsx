import React from 'react';
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
    return (
      <div>
        <h2>Next game in {this.state.seconds} seconds...</h2>

        <h3># Players Joined</h3>
        <dl>
          {
            this.props.teams.map(t => [
              <dt>Team { t.name }</dt>,
              <dd>{ t.players.length }</dd>
            ])
          }
        </dl>
      </div>
    );
  }

  render_starting() {
    return <h2>Starting in {this.props.countdown} seconds...</h2>;
  }

  render_started() {
    return (
      <div>
        <h2>Go!</h2>
        <dl>
          {
            this.props.teams.map(t => [
              <dt>{ t.name }</dt>,
              <dd>{ t.score }</dd>
            ])
          }
        </dl>
      </div>
    );
  }
}
