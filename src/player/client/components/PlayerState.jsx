import React from 'react';
import kefir from 'kefir';
import animationFrames from '../../../common/utils/animation-frames';
import state from '../state';
import PlayerInterface from './PlayerInterface.jsx';

export default class PlayerState extends React.Component {
  componentDidMount() {
    kefir
      .combine([animationFrames], [state])
      .onValue(([frame, state]) => this.setState(state));
  }

  render() {
    return <PlayerInterface {...this.state}/>;
  }
}
