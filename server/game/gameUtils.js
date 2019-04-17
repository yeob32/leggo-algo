const Game = require( './index' );

const maxUserCount = 4;

export const createMember = ( id, name ) => ( {
  id,
  name,
  deck: [],
  score: 0,
  enter: false,
  order: null,
  super: {
    host: false,
    check: false, // true면 턴
    hold: false, // true면 턴
  },
  turn: false,
} );

export const initMember = ( id, name ) => {
  const memberData = createMember( id, name );
  if ( Game.members.length === 0 ) {
    memberData.super.host = true;
  }

  Game.members.push( memberData );
};

export const start = () => {
  dealCard(); // 카드 분배
  // 순서 설정
};

export const getMemberList = () => {
  return Game.members;
};

export const disconnect = id => {
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
