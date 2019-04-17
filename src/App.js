import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';

import { getSession, saveSession } from './store/session/actions';

class App extends Component {
  componentDidMount() {
    saveSession( { id: 'testId', name: 'testName' } );
  }

  testSession = () => {
    saveSession( { id: 'testId', name: 'testName' } );
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
