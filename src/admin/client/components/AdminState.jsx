import React from 'react';
import AdminInterface from './AdminInterface.jsx';
import state from '../state';

export default class AdminState extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    state.onValue(s => this.setState(s));
  }

  render() {
    return <AdminInterface {...this.state}/>
  }
}
