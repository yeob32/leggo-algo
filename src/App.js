import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';

import { saveSession } from './store/session/actions';

import axios from 'axios';

class App extends Component {
  render() {
    return (
      <MainStructure>
        <LoginForm
          key="loginForm"
          test="test"
        />
      </MainStructure>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
} );

export default connect(
  state => state,
  mapDispatchToProps,
)( App );
