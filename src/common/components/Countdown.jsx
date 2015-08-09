import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var remaining = this.props.timestamp - Date.now();
    var seconds = Math.max(Math.ceil(remaining / 1000), 0);
    var opacity = seconds ? (remaining % 1000) / 1000 : 1.0;
    if (this.props.prefix) {
      seconds = (seconds < 10 ? ':0' : ':') + seconds;
    }
    return (
      <span  style={{ opacity: opacity }}>{ seconds }</span>
    );
  }
}
