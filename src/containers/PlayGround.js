/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlayerList from './PlayerList';
import Stack from './Stack';
import ControllPanel from './ControllPanel';

import './PlayGround.css';

import MainStructure from '../components/structure/MainStructure';
import StatusInterface from '../components/StatusInterface';

import socketUtil, { initSocket } from '../utils/socketUtil';
import { saveSession, initSession, updateSession } from '../store/session/actions';
import { updateStatus } from '../store/game/actions';

import { message, Row, Col } from 'antd';

class PlayGround extends Component {
  componentDidMount() {
    this.checkSession();
    this.setupBeforeUnloadListener();

    initSocket( 'http://localhost:3001' );

    socketUtil().emit( 'game-status' );
    socketUtil().on( 'game-status', data => {
      if ( data ) {
        this.props.updateGameStatus( data.item );

        if ( data.message ) {
          message.warning( data.message );
        }
      }
    } );

    socketUtil().on( 'update-session', data => {
      const { item, pm } = data;

      if ( item ) {
        this.props.updateSession( item );
        if ( pm ) {
          message.info( pm );
        }
      }
    } );

    socketUtil().on( 'exit-result', data => {
      this.props.initSession();
    } );
  }

  componentWillUnmount() {
    socketUtil().emit( 'disconnect' );
    socketUtil().emit( 'destroy-session', this.props.sessionReducer );
  }

  detectDisconnectBeforeUnload = () => {
    socketUtil().emit( 'disconnect' );
    socketUtil().emit( 'destroy-session', this.props.sessionReducer );
  };

  setupBeforeUnloadListener = () => {
    window.addEventListener( 'beforeunload', ev => {
      ev.preventDefault();
      return this.detectDisconnectBeforeUnload();
    } );
  };

  checkSession = () => {
    const sessionReducer = this.props.sessionReducer;
    if ( !sessionReducer || !sessionReducer.id ) {
      this.props.history.push( '/' );
    }
  };

  render() {
    const sessionReducer = this.props.sessionReducer;
    const gameReducer = this.props.gameReducer;

    const { pileCards, members } = gameReducer;

    return (
      <MainStructure>
        <div>
          <Row className="playground-row">
            <Col>
              <StatusInterface
                session={sessionReducer}
                pileCards={pileCards}
                members={members}
              />
            </Col>
          </Row>
          <Row className="playground-row">
            <Col>
              <ControllPanel />
            </Col>
          </Row>
          <Row className="playground-row">
            <PlayerList
              gameStatus={gameReducer}
              session={sessionReducer}
            />
          </Row>
          <Row className="playground-row">
            <Stack pileCards={pileCards} />
          </Row>
        </div>
      </MainStructure>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
  initSession: () => dispatch( initSession() ),
  updateGameStatus: data => dispatch( updateStatus( data ) ),
  updateSession: data => dispatch( updateSession( data ) ),
} );

export default withRouter(
  connect(
    state => state,
    mapDispatchToProps,
  )( PlayGround ),
);
