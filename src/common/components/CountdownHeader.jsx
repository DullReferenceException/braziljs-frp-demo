import React from 'react';
import Countdown from './Countdown.jsx';

export default class CountdownHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="countdown">
        <div className="status">{ this.props.status }</div>
        <div className="seconds">
          <Countdown prefix timestamp={ this.props.timestamp }/>
        </div>
      </div>
    );
  }
}
