/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { connect } from 'react-redux';

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
    initSocket( 'http://localhost:3001' );

    socketUtil().emit( 'member-list' );
    socketUtil().on( 'member-list', data => {
      this.props.updateGameStatus( { members: data } );
      this.props.updateSession( data );
    } );

    socketUtil().on( 'start', data => {
      this.props.updateGameStatus( data );
    } );

    socketUtil().on( 'join-message', result => {
      message.info( result.message );
    } );

    socketUtil().on( 'init', data => {
      this.props.updateGameStatus( { ...data } );
      this.props.initSession();
    } );

    socketUtil().on( 'exit', result => {
      this.props.initSession();
      message.warning( result.message );
    } );
  }

  componentWillUnmount() {
    socketUtil().emit( 'disconnect-user' );
  }

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

  render() {
    const sessionReducer = this.getSessionReducer();
    const gameReducer = this.getGameReducer();

    const { pileCards, members } = gameReducer;

    return (
      <MainStructure>
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
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

export default connect(
  state => state,
  mapDispatchToProps,
)( PlayGround );
