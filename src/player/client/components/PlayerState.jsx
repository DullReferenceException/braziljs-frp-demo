import React from 'react';
import stateChanges from '../state';
import PlayerInterface from './PlayerInterface.jsx';

export default class PlayerState extends React.Component {
  componentDidMount() {
    stateChanges.onValue(s => this.setState(s));
  }

  render() {
    return <PlayerInterface {...this.state}/>;
  }
}
