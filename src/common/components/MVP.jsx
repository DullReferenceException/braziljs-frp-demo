import React from 'react';

export default class MVP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.player
      ? <div id="top-player">
          MVP:{' '}
          { this.props.player.name },{' '}
          { this.props.player.score + ' '}
          points
        </div>
      : <div/>;
  }
}
