import React from 'react';

export default class JoinedStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="join-status">
        Joined{' '}
        <span style={{ backgroundColor: this.props.team }}>&nbsp;{this.props.team}&nbsp;</span>
        {' '}team as{' '}
        { this.props.name }
      </div>
    );
  }
}
