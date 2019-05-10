/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlayerList from './PlayerList';
import Stack from './Stack';
import MainStructure from '../components/structure/MainStructure';
import StatusInterface from '../components/StatusInterface';
import ControllPanel from '../components/ControllPanel';

import socketUtil, { initSocket } from '../utils/socketUtil';
import { saveSession, initSession, updateSession } from '../store/session/actions';
import { updateStatus } from '../store/game/actions';

import { message, Row, Col } from 'antd';

class PlayGround extends Component {
  componentDidMount() {
    this.checkSession();
    initSocket( 'http://localhost:3001' );

    socketUtil().emit( 'get-game-status-result' );
    socketUtil().on( 'get-game-status-result', data => {
      this.props.updateGameStatus( data );
      this.props.updateSession( data.item );
    } );

    socketUtil().on( 'start', data => {
      this.props.updateGameStatus( data );
    } );

    socketUtil().on( 'join-result', data => {
      this.props.updateGameStatus( data.item );
      this.props.updateSession( data );
      message.info( data.message );
    } );

    socketUtil().on( 'exit-result', data => {
      this.props.initSession();
      this.props.updateGameStatus( data.item );
      this.props.updateSession( data.item );

      message.warning( data.message );
    } );

    socketUtil().on( 'disconnect-result', data => {
      this.props.updateGameStatus( data );

      message.warn( 'aㅜ지 !!!' );
    } );
  }

  componentWillUnmount() {
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
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
          <button type="button" onClick={this.initTest} value="teststet" />
          <Row style={{ margin: '10px 0 10px 0' }}>
            <Col>
              <StatusInterface session={sessionReducer} pileCards={pileCards} members={members} />
            </Col>
          </Row>
          <Row style={{ margin: '10px 0 10px 0' }}>
            <Col>
              <ControllPanel />
            </Col>
          </Row>
          <Row style={{ margin: '10px 0 10px 0' }}>
            <PlayerList members={members} pileCards={pileCards} />
          </Row>
          <Row style={{ margin: '10px 0 10px 0' }}>
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
