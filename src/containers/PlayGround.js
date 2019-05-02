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
      this.setState( { members: data } );
    } );

    socketUtil().on( 'start', data => {
      this.setState( data );

      this.props.saveSession( this.state.members.find( mem => mem.id === this.props.session.id ) );
    } );

    socketUtil().on( 'init', data => {
      console.log( 'init !!!!!!!!!' );
      this.setState( { ...data } );
      this.props.initSession();
    } );
  }

  componentWillUnmount() {
    socketUtil().emit( 'disconnect-user' );
  }

  isCrowded = () => {
    const userCount = this.state.members.length;
    return userCount >= maxUserCount;
  };

  start = () => {
    // start => 카드분배 => 턴 순회 1분 => 점수
    socketUtil().emit( 'start', this.props.session.super.host );
  };

  join = () => {
    const { id, name } = this.props.session;

    socketUtil().emit( 'join', id, name );
    socketUtil().on( 'member-list', data => {
      this.setState( { members: data } );
      this.props.saveSession( this.state.members.find( mem => mem.id === this.props.session.id ) );
    } );

    if ( !this.props.session.super.host ) {
      // this.start();
    }
  };

  init = () => {
    console.log( 'front - inint' );
    socketUtil().emit( 'init' );
  };

  render() {
    const { session } = this.props;
    const { deal, pileCards, members } = this.state;
    const { init, start, join } = this;

    const host = session.super && session.super.host;

    return (
      <MainStructure>
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
          <StatusInterface session={session} pileCards={pileCards} members={members} />

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
  initSession: data => dispatch( initSession() ),
} );

export default connect(
  state => state,
  mapDispatchToProps,
)( PlayGround );
