import React, { FunctionComponent, useState, useEffect } from 'react';

import cardData from './static/cards';

import PlayerList from './PlayerList.tsx';
import Stack from './Stack.tsx';

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

const PlayGround = () => {
  const [ users, setUsers ] = useState( [] ); // 세션정보 따로 뺴야됨, 사용자 들어옴 => 시작 => 카드분배 => 순서대로 ~
  const [ cards, setCards ] = useState( cardData );
  const [ discardHoleder, setDiscardHoleder ] = useState( [] );
  const [ pileCards, setPileCards ] = useState( cardData );
  const [ dealYn, setDealYn ] = useState( false );
  const [ gameStatus, setGameStatus ] = useState( 'ready' );

  const maxUserCount = 4;

  useEffect( () => {
    document.title = `Leggg Algo`;
    console.log( 'userEffect >>>> ' );
  } );

  const setUserData = () => {
    return {
      id: users.length + 1,
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

  const isCrowded = () => {
    const userCount = users.length;
    return userCount >= maxUserCount;
  };

  const additionUser = () => {
    if ( isCrowded() ) {
      return;
    }

    if ( dealYn ) {
      return;
    }

    const userData = users.concat( setUserData() );

    setUsers( userData );
  };

  const subtraction = () => {
    // users.filter()
  };

  const getRandomCards = ( maxCardCount, drawCardTemp, drawCardList ) => {
    const randomCard = pileCards[Math.floor( Math.random() * pileCards.length ) + 1 - 1];
    if ( drawCardTemp.length < maxCardCount ) {
      if ( !drawCardTemp.includes( randomCard ) && !drawCardList.includes( randomCard ) ) {
        drawCardTemp.push( randomCard );
      }

      getRandomCards( maxCardCount, drawCardTemp, drawCardList );
    }

    return drawCardTemp;
  };

  const dealCard = () => {
    const maxCardCount = isCrowded() ? 3 : 4;
    if ( users.length === 0 ) {
      return;
    }

    if ( dealYn ) {
      return;
    }

    setDealYn( true );

    let drawCardList = [];
    const updateUser = users.map( user => {
      const tempDrawCards = getRandomCards( maxCardCount, [], drawCardList );
      drawCardList = drawCardList.concat( tempDrawCards );

      return {
        ...user,
        deck: user.deck.concat( tempDrawCards ),
      };
    } );

    setDiscardHoleder( drawCardList );
    setPileCards( pileCards.filter( card => !drawCardList.includes( card ) ) );

    setUsers( updateUser );
  };

  const shuffle = () => {};

  return (
    <div>
      <p>남은 카드 개수 : {pileCards.length}</p>
      <p>순서 : {pileCards.length}</p>

      <button type="button" onClick={() => additionUser()}>
        사용자 추가
      </button>
      <button type="button" onClick={() => dealCard()}>
        카드 분배
      </button>

      <br />
      <br />
      <PlayerList userList={users} pileCards={pileCards} />

      <br />

      <div>
        <Stack pileCards={pileCards} />
      </div>
    </div>
  );
};

export default PlayGround;
