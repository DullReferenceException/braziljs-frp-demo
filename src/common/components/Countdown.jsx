import React from 'react';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var remaining = this.props.timestamp - Date.now();
    var seconds = Math.max(Math.ceil(remaining / 1000), 0);
    var opacity = seconds ? (remaining % 1000) / 1000 : 1.0;
    requestAnimationFrame(() => this.forceUpdate());
    return <span style={{ opacity: opacity }}>&nbsp;{seconds}&nbsp;</span>;
  }
}
