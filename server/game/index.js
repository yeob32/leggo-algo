const cardData = require( './cardData' ).cards;

const game = {
  status: 'ready',
  deal: false,
  cards: cardData,
  discardHolder: [], //
  pileCards: cardData, // 남은 카드
  members: [],
  order: 0,
};

module.exports = game;
