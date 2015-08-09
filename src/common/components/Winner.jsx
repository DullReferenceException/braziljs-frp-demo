import React from 'react';

export default class Winner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var winner =
      (this.props.red === this.props.blue)
        ? 'Tie'
      : (this.props.red < this.props.blue)
        ? 'Blue'
        : 'Red';
    return (
      <div className="winner">
        Winner: <span className={'winner ' + winner}>{winner}</span>
      </div>
    );
  }
}
