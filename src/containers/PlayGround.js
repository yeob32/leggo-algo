/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import cardData from '../static/cards';

import PlayerList from './PlayerList';
import Stack from './Stack';
import UserCount from '../components/UserCount';

import { Button } from 'antd';

import socketUtil, { init } from '../utils/socketUtil';

/**
 * build => 카드 선택해서 내카드 덱에 삽입
 * deck => 사용자 카드
 * action
 * filter
 * shuffle
 * discardHoleder => drawCard
 *
 * 화면 구조
 * 사용자 보유 카드 노출
 * 세션에사 턴 조회
 * 해당 유저 명령 실행 =>
 * 1. 사용자 영역에 카드 모양 클릭해서 가이드 모양의 숫자 선택지를 맞춤
 * 2. 틀렸으면 턴
 * 3. 맞췄으면 1번으로 돌아감, 두번째부터는 hold 가능
 * 스코어 계산
 *
 * antd
 * drawer => history log
 *
 */

init( 'http://localhost:3001' );

const maxUserCount = 4;
class PlayGround extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      member: [],
      cards: cardData,
      discardHoleder: [],
      pileCards: cardData,
      dealYn: false,
      gameStatus: 'ready',
    };
  }

  setUserData = () => {
    return {
      id: this.state.member.length + 1,
      name: '',
      score: 0,
      deck: [],
      enter: true,
      order: null,
      super: {
        check: false, // true면 턴
        hold: false, // true면 턴
      },
      turn: false,
    };
  };

  isCrowded = () => {
    const userCount = this.state.member.length;
    return userCount >= maxUserCount;
  };

  getRandomCards = ( maxCardCount, drawCardTemp, drawCardList ) => {
    const { pileCards } = this.state;

    const randomCard = pileCards[Math.floor( Math.random() * pileCards.length ) + 1 - 1];
    if ( drawCardTemp.length < maxCardCount ) {
      if ( !drawCardTemp.includes( randomCard ) && !drawCardList.includes( randomCard ) ) {
        drawCardTemp.push( randomCard );
      }

      this.getRandomCards( maxCardCount, drawCardTemp, drawCardList );
    }

    return drawCardTemp;
  };

  dealCard = () => {
    const { member, dealYn, pileCards } = this.state;

    const maxCardCount = this.isCrowded() ? 3 : 4;
    if ( member.length === 0 ) {
      return;
    }

    if ( dealYn ) {
      return;
    }

    let drawCardList = [];
    const updateUser = member.map( user => {
      const tempDrawCards = this.getRandomCards( maxCardCount, [], drawCardList );
      drawCardList = drawCardList.concat( tempDrawCards );

      return {
        ...user,
        deck: user.deck.concat( tempDrawCards ),
      };
    } );

    this.setState( {
      dealYn: true,
      discardHoleder: drawCardList,
      pileCards: pileCards.filter( card => !drawCardList.includes( card ) ),
      member: updateUser,
    } );
  };

  shuffle = () => {};

  join = () => {
    socketUtil().emit( 'join', 'testId', 'testName' ); // => redux getSession
    socketUtil().on( 'user-list', data => {
      this.setState( { member: data } );
    } );
  };

  render() {
    const { pileCards, member } = this.state;

    const { additionUser, dealCard, join } = this;

    return (
      <div>
        <p>남은 카드 개수 : {pileCards.length}</p>
        <p>순서 : {pileCards.length}</p>
        <UserCount />

        <Button type="" onClick={() => additionUser()}>
          사용자 추가
        </Button>

        <Button type="" onClick={() => dealCard()}>
          Start
        </Button>
        <Button type="primary" onClick={() => join()}>
          Join
        </Button>

        <br />
        <br />
        <PlayerList userList={member} pileCards={pileCards} />

        <br />

        <div>
          <Stack pileCards={pileCards} />
        </div>
      </div>
    );
  }
}

export default PlayGround;
