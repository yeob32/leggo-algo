import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';

import { getSession } from './store/session/actions';

class App extends Component {
  // public componentDidMount = () => {
  //   const socket = socketIOClient('http://localhost:3001');
  //   setInterval(() => socket.emit('chat message', 'dgngkqkqk!!!!'), 1000);
  //   socket.on('chat message', (data: string) => {
  //     console.log('data > ', data);
  //   });
  // };

  componentDidMount() {
    const user11 = getSession( 1 );

    console.log( 'user > ', this.props.user );
  }

  render() {
    return (
      <MainStructure>
        <LoginForm />
      </MainStructure>
    );
  }
}

const mapStateToProps = state => ( {
  user: state.session,
} );

const mapDispatchToProps = dispatch => ( {
  getSession: id => dispatch( getSession( id ) ),
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( App );
