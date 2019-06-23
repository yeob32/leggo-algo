/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable */
const Game = require( './index' );
const cardData = require( './cardData' ).cards;

const maxUserCount = 4;

const initGameStatus = () => {
  Game.status = 'ready';
  Game.deal = false;
  Game.cards = cardData;
  Game.discardHolder = []; //
  Game.pileCards = cardData; // 남은 카드
  Game.members = [];
  Game.order = 0;
};

const createMember = ( id, name ) => ( {
  id,
  name,
  deck: [],
  score: 0,
  enter: false,
  order: null,
  host: false,
  auth: {
    random: false, // 랜덤 카드 선택
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
  temp: {},
  jokerBag: {},
} );

const initMember = ( id, name ) => {
  const memberData = createMember( id, name );
  const memberCount = Game.members.length;
  if ( memberCount === 0 ) {
    memberData.host = true;
  }

  memberData.order = memberCount;
  memberData.enter = true;

  Game.members.push( memberData );
};

const start = () => {
  // orderStack() 이벤트 실행 시 카운트다운하려고...........
  // dealCard(); // 카드 분배
  // shuffle(); // 카드 섞기
  // orderStack(); // 순서 설정
};

const shuffle = () => {
  let temp = {};

  Game.pileCards.forEach( ( card, index ) => {
    const random = Math.floor( Math.random() * ( index + 1 ) );

    temp = card;
    Game.pileCards[index] = Game.pileCards[random];
    Game.pileCards[random] = temp;
  } );
};

const sortDeck = id => {
  if ( id ) {
    const playerDecks = Game.members.find( member => member.id === id ).deck;

    sorting( playerDecks );
  } else {
    Game.members.forEach( member => {
      sorting( member.deck );
    } );
  }
};

function sorting( deckList ) {
  let temp;

  console.log( 'start deck > ', deckList.map( deck => deck.value ) );

  // { type: 'black', id: 'black_12', name: '-', value: '12', joker: true },
  // TODO 오름차순 정렬 -> 중복 시 색깔 정렬
  for ( let i = 0; i < deckList.length; i++ ) {
    for ( let j = 1; j < deckList.length; j++ ) {
      temp = deckList[j - 1];

      const tempValue = parseInt( temp.value, 10 );
      const nextValue = parseInt( deckList[j].value, 10 );

      if ( temp.joker ) {
        console.log( 'this is joker' );
        // deckList[j - 1] = deckList[j];
        // deckList[j] = temp;

        continue;
      }

      if ( deckList[j].joker ) {
        if ( deckList.length - 1 !== j ) {
          deckList[j - 1] = deckList[j + 1];
          deckList[j + 1] = temp;
        }

        continue;
      }

      if ( tempValue > nextValue ) {
        deckList[j - 1] = deckList[j];
        deckList[j] = temp;

        continue;
      }

      if ( tempValue === nextValue ) {
        if ( temp.type === 'white' ) {
          deckList[j - 1] = deckList[j];
          deckList[j] = temp;

          // eslint-disable-next-line no-continue
          continue;
        }
      }
    }
  }
}

const getMemberList = () => {
  return Game.members;
};

const checkAleadyJoinMember = session => {
  return Game.members.filter( member => member.id === session.id ).length === 0;
};

const findJoinMember = session => {
  return Game.members.find( member => member.id === session.id );
};

const randomCardAction = ( id, cardId ) => {
  const pileCard = cardId ? Game.pileCards.find( ps => ps.id === cardId ) : Game.pileCards[0];

  Game.members.forEach( member => {
    if ( member.id === id ) {
      member.deck.push( pileCard );
      member.temp = pileCard;
    }
  } );

  Game.discardHolder.push( pileCard );
  Game.pileCards = Game.pileCards.filter( card => card.id !== pileCard.id );

  return pileCard;
};

const updateTurnAction = ( id, data ) => {
  Game.members.forEach( member => {
    if ( member.id === id ) {
      member.turn = data;
    }
  } );
};

const updateAuthAction = ( id, data ) => {
  Game.members.forEach( member => {
    if ( member.id === id ) {
      member.auth = Object.assign( {}, member.auth, data );
    }
  } );
};

const updateDeckAction = ( targetId, cardId ) => {
  Game.members.forEach( member => {
    if ( member.id === targetId ) {
      member.deck.forEach( d => {
        if ( d.id === cardId ) {
          d.flip = true;
        }
      } );
    }
  } );
};

const tempToPile = id => {
  Game.members.forEach( member => {
    if ( member.id === id ) {
      member.deck.forEach( d => {
        if ( d.id === member.temp.id ) {
          d.flip = true;
        }
      } );
    }
  } );
};

const exit = id => {
  Game.members = Game.members.filter( member => member.id !== id );
};

const disconnect = id => {
  Game.members = Game.members.filter( member => member.id !== id );
};

const dealCard = () => {
  const { deal, members, pileCards } = Game;

  const maxCardCount = isCrowded() ? 3 : 4;
  if ( members.length === 0 ) {
    return;
  }

  if ( deal ) {
    return;
  }

  let drawCardList = [];

  const updateUser = members.map( user => {
    const tempDrawCards = getRandomCards( maxCardCount, [], drawCardList );
    drawCardList = drawCardList.concat( tempDrawCards );

    return {
      ...user,
      deck: user.deck.concat( tempDrawCards ),
    };
  } );

  Game.deal = true;
  Game.discardHolder = drawCardList;
  Game.pileCards = pileCards.filter( card => !drawCardList.includes( card ) );
  Game.members = updateUser;
};

const getRandomCards = ( maxCardCount, drawCardTemp, drawCardList ) => {
  const { pileCards } = Game;

  const randomCard = pileCards[Math.floor( Math.random() * pileCards.length ) + 1 - 1];
  if ( drawCardTemp.length < maxCardCount ) {
    if ( !drawCardTemp.includes( randomCard ) && !drawCardList.includes( randomCard ) ) {
      drawCardTemp.push( randomCard );
    }

    getRandomCards( maxCardCount, drawCardTemp, drawCardList );
  }

  return drawCardTemp;
};

const isCrowded = () => {
  const userCount = Game.members.length;
  return userCount >= maxUserCount;
};

const orderStack = () => {
  const count = Game.pileCards.length;
  let order = Game.order;

  if ( count > 0 ) {
    Game.members[Game.order].turn = true;
    Game.members[Game.order].auth = {
      random: false,
      check: false,
      hold: false,
    };

    Game.order += 1;
    if ( Game.order > Game.members.length - 1 ) {
      Game.order = 0;
    }
  } else {
    // 게임 종료
  }
};

module.exports = {
  createMember,
  initMember,
  start,
  getMemberList,
  disconnect,
  exit,
  checkAleadyJoinMember,
  findJoinMember,
  randomCardAction,
  updateAuthAction,
  updateDeckAction,
  updateTurnAction,
  orderStack,
  initGameStatus,
  tempToPile,
  dealCard,
  shuffle,
  sortDeck,
};
