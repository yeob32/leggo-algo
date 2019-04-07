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
    console.log( 'this.props > ', this.props );
    console.log( 'getSession', getSession() );
    console.log( 'this.props !!!!> ', this.props );
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
  getSession: data => dispatch( getSession() ),
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( App );
