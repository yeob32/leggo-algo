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

    socketUtil().emit( 'get-member-list' );
    socketUtil().on( 'get-member-list-result', data => {
      this.props.updateGameStatus( { members: data } );
      this.props.updateSession( data );
    } );

    socketUtil().on( 'start', data => {
      this.props.updateGameStatus( data );
    } );

    socketUtil().on( 'join-result', data => {
      this.props.updateGameStatus( { members: data.item } );
      this.props.updateSession( data );
      message.info( data.message );
    } );

    socketUtil().on( 'init', data => {
      this.props.updateGameStatus( { ...data } );
      this.props.initSession();
    } );

    socketUtil().on( 'exit-result', data => {
      this.props.initSession();
      this.props.updateGameStatus( { members: data.item } );
      this.props.updateSession( data );

      message.warning( data.message );
    } );

    socketUtil().on( 'disconnect-result', data => {
      console.log( 'this is disconnect-result' );
      this.props.updateGameStatus( { members: data } );

      message.warning( 'aㅜ지 !!!' );
    } );
  }

  componentWillUnmount() {
    console.log( 'componentWillUnmount' );
    socketUtil().emit( 'exit', this.props.sessionReducer.id );
    socketUtil().emit( 'disconnect', this.props.sessionReducer.id );
  }

  checkSession = () => {
    const sessionReducer = this.getSessionReducer();
    if ( !sessionReducer || !sessionReducer.id ) {
      this.props.history.push( '/' );
    }
  };

  getGameReducer = () => {
    return this.props.gameReducer;
  };

  getSessionReducer = () => {
    return this.props.sessionReducer;
  };

  updateSession = members => {
    if ( !members || members.length === 0 ) {
      return;
    }

    this.props.dispatch( { type: 'session/UPDATE', data: members } );
  };

  saveCurrentSession = () => {
    const { members } = this.getGameReducer();
    const { id } = this.getSessionReducer();

    const currentUser = members.find( mem => mem.id === id );

    this.props.saveSession( currentUser );
  };

  initTest = () => {
    socketUtil().emit( 'init' );
  };

  render() {
    const sessionReducer = this.getSessionReducer();
    const gameReducer = this.getGameReducer();

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
