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

    socketUtil().on( 'start', data => {
      this.props.updateGameStatus( data );
    } );

    socketUtil().on( 'join-result', data => {
      // this.props.updateGameStatus( data.item );
      this.props.updateSession( data.item ); // socket.on => 자기만 응답 받는걸로 바꾸자,  updateGameStatus 이거는 공통으로 따로뺴야됨
      // message.info( data.message );
    } );

    socketUtil().on( 'exit-result', data => {
      this.props.initSession();
      // this.props.updateGameStatus( data.item );
      // this.props.updateSession( data.item );

      // message.warning( data.message );
    } );

    socketUtil().on( 'disconnect-result', data => {
      this.props.updateGameStatus( data );

      message.warn( 'aㅜ지 !!!' );
    } );
  }

  componentWillUnmount() {
    console.log( 'do componentWillUnmount' );
    socketUtil().emit( 'exit', this.props.sessionReducer.id );
    socketUtil().emit( 'disconnect', this.props.sessionReducer.id );
  }

  detectDisconnectBeforeUnload = () => {
    alert( 'detectDisconnectBeforeUnload' );
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
            <PlayerList gameStatus={gameReducer} />
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
