/* eslint-disable no-unreachable */
const Game = require( './index' );

const maxUserCount = 4;

const createMember = ( id, name ) => ( {
  id,
  name,
  deck: [],
  score: 0,
  enter: false,
  order: null,
  auth: {
    host: false,
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
} );

const initMember = ( id, name ) => {
  const memberData = createMember( id, name );
  const memberCount = Game.members.length;
  if ( memberCount === 0 ) {
    memberData.auth.host = true;
  }

  memberData.order = memberCount;
  memberData.enter = true;

  Game.members.push( memberData );
};

const start = () => {
  dealCard(); // 카드 분배
  orderStack(); // 순서 설정
};

const action = type => {
  switch ( type ) {
    case 'selectPileCard':
      break;
    case 'selectDeck':
      break;
    default:
  }

  orderStack();
};

const setMember = id => {};

const getMemberList = () => {
  return Game.members;
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
  const count = Game.pileCards.length; //
  let order = 0;

  const turnOver = () => {
    order += 1;
    if ( order > Game.members.length - 1 ) {
      order = 0;
    }
  };

  if ( count > 0 ) {
    Game.members[order].turn = true;

    // const currentOrderUser = Game.members[order];
    // currentOrderUser.turn = true;

    console.log(
      'order > %s , currentOrderUser > %s, restCount > %s ',
      order,
      Game.members[order],
      count,
    );

    // currentOrderUser.turn = true;
    // Game.members[order] = currentOrderUser;

    turnOver();

    // currentOrderUser.turn = true;

    // Game.members = currentMembers.map( member => {
    //   if ( member.id === currentOrderUser.id ) {
    //     currentOrderUser.turn = true;
    //     return currentOrderUser;
    //   }

    //   return member;
    // } );
  }
};

const init = () => {
  Game.state = 'ready';
  Game.deal = 'false';
  Game.cards = require( './cardData' ).cards;
  Game.discardHolder = 'ready';
  Game.pileCards = require( './cardData' ).cards;
  Game.members = [];
};

module.exports = {
  createMember,
  initMember,
  start,
  getMemberList,
  disconnect,
  init,
  exit,
};
