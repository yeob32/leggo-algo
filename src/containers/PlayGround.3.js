/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import cardData from '../static/cards';

import PlayerList from './PlayerList';
import Stack from './Stack';
import MainStructure from '../components/structure/MainStructure';
import StatusInterface from '../components/StatusInterface';
import ControllPanel from '../components/ControllPanel';

import socketUtil, { initSocket } from '../utils/socketUtil';
import { saveSession, initSession } from '../store/session/actions';
import { updateStatus, getCurrentUser } from '../store/game/actions';

// test
import { Button } from 'antd';

const maxUserCount = 4;
class PlayGround extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      status: 'ready',
      deal: false,
      cards: cardData,
      discardHolder: [], //
      pileCards: cardData, // 남은 카드
      members: [],
    };
  }

  componentDidMount() {
    initSocket( 'http://localhost:3001' );

    socketUtil().emit( 'member-list' );
    socketUtil().on( 'member-list', data => {
      this.props.updateGameStatus( { members: data } );
      this.setState( { members: data } );
    } );

    socketUtil().on( 'start', data => {
      this.setState( data );

      const currentUser = getCurrentUser( {
        members: this.getGameStore().members,
        sessionId: this.getSessionStore().id,
      } );
      this.props.saveSession( currentUser );

      this.props.saveSession(
        this.state.members.find( mem => mem.id === this.props.sessionReducer.id ),
      );
    } );

    socketUtil().on( 'init', data => {
      this.setState( { ...data } );
      this.props.initSession();
    } );

    console.log( 'this > ', this );
  }

  componentWillUnmount() {
    socketUtil().emit( 'disconnect-user' );
  }

  getGameStore = () => {
    return this.props.gameReducer;
  };

  getSessionStore = () => {
    return this.props.sessionReducer;
  };

  isCrowded = () => {
    const userCount = this.state.members.length;
    return userCount >= maxUserCount;
  };

  start = () => {
    // start => 카드분배 => 턴 순회 1분 => 점수
    socketUtil().emit( 'start', this.props.sessionReducer.super.host );
  };

  join = () => {
    const { id, name } = this.props.sessionReducer;

    socketUtil().emit( 'join', id, name );
    socketUtil().on( 'member-list', data => {
      this.setState( { members: data } );
      this.props.saveSession(
        this.state.members.find( mem => mem.id === this.props.sessionReducer.id ),
      );
    } );

    if ( !this.props.sessionReducer.super.host ) {
      // this.start();
    }
  };

  init = () => {
    socketUtil().emit( 'init' );
  };

  render() {
    const sessionReducer = this.getSessionStore();
    const gameReducer = this.getGameStore();

    const { deal, pileCards, members } = this.state;
    const { init, start, join } = this;

    const host = sessionReducer.super && sessionReducer.super.host;

    return (
      <MainStructure>
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
          <StatusInterface session={sessionReducer} pileCards={pileCards} members={members} />

          <br />

          <Button type="danger">test</Button>
          <Button type="danger" onClick={init}>
            init
          </Button>

          <ControllPanel deal={deal} start={start} join={join} host={host} />

          <br />

          <PlayerList members={members} pileCards={pileCards} />

          <br />

          <Stack pileCards={pileCards} />
        </div>
      </MainStructure>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
  initSession: () => dispatch( initSession() ),
  updateGameStatus: data => dispatch( updateStatus( data ) ),
  getCurrentUser: data => dispatch( getCurrentUser( data ) ),
} );

export default connect(
  state => state,
  mapDispatchToProps,
)( PlayGround );
