import React from 'react';
import kefir from 'kefir';
import AdminInterface from './AdminInterface.jsx';
import animationFrames from '../../../common/utils/animation-frames';
import state from '../state';

export default class AdminState extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    kefir
      .combine([animationFrames], [state])
      .onValue(([frame, state]) => this.setState(state));
  }

  render() {
    return <AdminInterface {...this.state}/>
  }
}
