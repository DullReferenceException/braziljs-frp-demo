import React from 'react';
import dispatcher from '../dispatcher';

export default class JoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get join() {
    return e => {
      e.preventDefault();
      dispatcher.emit('join', { name: this.state.name });
    }
  }

  get changeName() {
    return e => this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div id="content">
        <form onSubmit={this.join}>
          <label>Your name</label>
          <input key="name-input" type="text" size="20" value={this.state.name} onChange={this.changeName}/>
          <input type="submit" value="Join"/>
        </form>
      </div>
    );
  }
}
