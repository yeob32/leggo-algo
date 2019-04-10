import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';

import { getSession, saveSession } from './store/session/actions';

class App extends Component {
  componentDidMount() {
    saveSession( { id: 'testId', name: 'testName' } );

    const socket = socketIOClient( 'http://localhost:3001' );
    // setInterval( () => socket.emit( 'chat message', 'dgngkqkqk!!!!' ), 1000 );
    socket.emit( 'join', 'testId', 'testName' );

    socket.on( 'user-list', data => {
      console.log( 'data > ', data );
    } );

    console.log( 'this.props > ', this.props );
    console.log( 'getSession', getSession() );
    console.log( 'this.props !!!!> ', this.props );
  }

  testSession = () => {
    saveSession( { id: 'testId', name: 'testName' } );
    console.log( 'this.props > ', this.props );
    console.log( 'this > ', this );
  };

  render() {
    return (
      <MainStructure>
        {JSON.stringify( this.props.user )}
        <button type="button" onClick={() => this.testSession()}>
          test
        </button>
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
  saveSession: data => dispatch( saveSession( data ) ),
} );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( App );
