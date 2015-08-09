import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var remaining = this.props.timestamp - Date.now();
    var seconds = Math.max(Math.ceil(remaining / 1000), 0);
    var opacity = seconds ? (remaining % 1000) / 1000 : 1.0;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return (
      <div className="countdown">
        <div className="status">{ this.props.status }</div>
        <div className="seconds" style={{ opacity: opacity }}>:{ seconds }</div>
      </div>
    );
  }
}
