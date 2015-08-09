import React from 'react';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="scores">
        <h3>Score</h3>
        <div className="score red">{ this.props.red }</div>
        <div className="score blue">{ this.props.blue }</div>
      </div>
    );
  }
}
