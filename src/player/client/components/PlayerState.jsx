import React from 'react';
import kefir from 'kefir';
import animationFrames from '../../../common/utils/animation-frames';
import stateChanges from '../state';
import PlayerInterface from './PlayerInterface.jsx';

export default class PlayerState extends React.Component {
  componentDidMount() {
    kefir
      .combine([animationFrames], [stateChanges])
      .filter(([frame, state]) => !!state.name)
      .onValue(([frame, state]) => this.setState(state));
  }

  render() {
    return <PlayerInterface {...this.state}/>;
  }
}
