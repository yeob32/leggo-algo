import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

import MainStructure from './components/structure/MainStructure';

import { connect } from 'react-redux';

import { saveSession } from './store/session/actions';

class App extends Component {
  componentDidMount() {
    saveSession( { id: 'testId', name: 'testName' } );
  }

  testSession = () => {
    this.props.saveSession( { id: 'testId', name: 'testName' } )
  };

  render() {
    return (
      <MainStructure>
        {JSON.stringify( this.props.session )}
        <button type="button" onClick={this.testSession}>
          test
        </button>
        <LoginForm />
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
