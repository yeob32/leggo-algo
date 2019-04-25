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

import { saveSession } from '../store/session/actions';

// test
import { Button } from 'antd'

initSocket( 'http://localhost:3001' );

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
    socketUtil().emit( 'member-list' );
    socketUtil().on( 'member-list', data => {
      this.setState( { members: data } );
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
    socketUtil().emit( 'start' );
    socketUtil().on( 'start', data => {
      this.setState( {
        ...data
      } )
    } )
    console.log( 'start ' );
  };

  join = () => {
    const { id, name } = this.props.session;

    socketUtil().emit( 'join', id, name );
    socketUtil().on( 'user-list', data => {
      this.setState( { members: data } );
    } );
  };

  init = () => {
    this.props.saveSession( { id: 'kim' , name: 'kim' } )
  }

  render() {
    const { session } = this.props;
    const { deal, pileCards, members } = this.state;
    const { init, start, join } = this;

    return (
      <MainStructure>
        <div style={{ width: "90%", maxWidth: "1400px", margin: "0 auto" }}>
          <StatusInterface session={session} pileCards={pileCards} members={members} />

          <Button onClick={init}>init</Button>
          <br />
          <ControllPanel
            deal={deal}
            start={start}
            join={join}
          />

          <br />

          <PlayerList userList={members} pileCards={pileCards} />

          <br />

          <Stack pileCards={pileCards} />
        </div>
      </MainStructure>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
} );

export default connect( state => state, mapDispatchToProps )( PlayGround );
